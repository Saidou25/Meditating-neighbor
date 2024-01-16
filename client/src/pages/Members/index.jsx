import React, { useState, useEffect } from "react";
import { QUERY_USERS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { Navigate } from "react-router-dom";
// import { v4 } from "uuid";
import { getDistance } from "../../utils/getDistance";
import Auth from "../../utils/auth";
// import useMyInfo from "../../Hooks/UseMyInfo";
import { useUser } from "../../contexts/userContext";
import Footer from "../../components/Footer";
import ProfileList from "./ProfileList";
import Navbar from "../../components/Navbar";
import useNewContactRequest from "../../Hooks/UseNewContactRequest";
import useMyRequests from "../../Hooks/UseMyRequests";
import useMyContacts from "../../Hooks/UseMyContacts";
import MembersSumaryModal from "./MembersSumaryModal";
import DistanceCard from "./DistanceCard";
import "./index.css";

const Neighbors = () => {
  const [contactRequestData, setContactRequestData] = useState({
    myName: "",
    email: "",
    destinationName: "",
    avatarUrl: "",
  });

  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("");
  const [ongoingRequest, setOngoingRequest] = useState(false);
  const [friends, setFriends] = useState(false);
  const [friendsSince, setFriendsSince] = useState("");
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [modalClose, setModalClose] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { incomingRequests, outgoingRequests } = useMyRequests();
  const { me } = useUser();
  const { myContacts } = useMyContacts();
  const { addNewContactRequestMessage, addNewContactRequestError } =
    useNewContactRequest(contactRequestData);

  const { data: usersData, usersError } = useQuery(QUERY_USERS);
  let noUserYet = "true";

  // finding out is there is an ongoing request from loggedin user or to loggedin user. If there are they are pushed in
  // incomingAndOutgoingRequests which is then used to set ongoingRequests so the "request contact button can be set to "pending".
  const isRequest = (distanceObj) => {
    let incomingAndOutgoingRequests = [];
    for (let outgoinRequest of outgoingRequests) {
      if (
        outgoinRequest.myName === me.username &&
        outgoinRequest.destinationName === distanceObj.user.username
      ) {
        incomingAndOutgoingRequests.push(outgoinRequest);
      }
    }
    for (let incomingRequest of incomingRequests) {
      if (
        incomingRequest.destinationName === me.username &&
        incomingRequest.myName === distanceObj.user.username
      ) {
        incomingAndOutgoingRequests.push(incomingRequest);
      }
    }
    if (incomingAndOutgoingRequests.length) {
      setOngoingRequest(true);
    }
  };

  //  finding out if the selected user thru the modal is already a friend or not so we can setup the button with
  // the appropriate text "friends";
  const areWeFriends = (distanceObj) => {
    for (let contact of myContacts) {
      if (
        (contact.username === me.username &&
          contact.friendUsername === distanceObj.user.username) ||
        (contact.username === distanceObj.user.username &&
          contact.friendUsername === me.username)
      ) {
        setFriends(true);
        setFriendsSince(contact.todaysDate);
      }
    }
  };
  const hasData = () => {
    if (!me.avatar?.avatarUrl || !me.location || !me.profile) {
      setModalClose("");
    } else {
      setModalClose("modal");
    }
  };

  const contact = async () => {
    setLoading(true);
    setErrorMessage("");
    if (!me.avatar?.avatarUrl || !me.location || !me.profile) {
      setLoading(false);
      setErrorMessage(
        "You need to setup your profile, save your location and add a profile picture before requesting contacts."
      );
      return;
    }

    setContactRequestData({
      ...contactRequestData,
      email: me.email,
      myName: me.username,
      destinationName: user.username,
      avatarUrl: avatarUrl,
    });
  };

  const distanceCardFunc = (distanceObj) => {
    setSuccessMessage("");
    setErrorMessage("");
    setLoading(false);

    if (!distanceObj.username) {
      return;
    } else {
      setAvatarUrl(distanceObj.avatarUrl);
      setUsername(distanceObj.username);
      isRequest(distanceObj);
      areWeFriends(distanceObj);
      hasData();
    }
  };

  const resetModalData = () => {
    setLoading(false);
    setContactRequestData({
      myName: "",
      email: "",
      destinationName: "",
      avatarUrl: "",
    });
    setAvatarUrl("");
    setUsername("");
    distanceCardFunc("");
    setOngoingRequest(false);
    setFriends(false);
    setErrorMessage("");
  };

  useEffect(() => {
    if (username && users) {
      const selectedUser = users.filter((user) => user.username === username);
      setUser(selectedUser[0]);
    }
  }, [username, users]);

  useEffect(() => {
    if (usersData) {
      const allUsersInfo = usersData?.users || [];
      setUsers(allUsersInfo);
    }
  }, [usersData]);

  useEffect(() => {
    if (addNewContactRequestMessage) {
      setSuccessMessage(addNewContactRequestMessage);
      setLoading(false);
      setContactRequestData({
        email: "",
        myName: "",
        destinationName: "",
        avatarUrl: "",
      });
      setModalClose("modal");
    }
  }, [addNewContactRequestMessage]);

  useEffect(() => {
    if (addNewContactRequestError) {
      setModalClose("");
      setLoading(false);
      setErrorMessage(addNewContactRequestError);
      return;
    }
  }, [addNewContactRequestError]);

  if (usersError) {
    return <>{usersError.toString()}</>;
  }
  if (noUserYet === "false") {
    <h1>No user yet</h1>;
  }
  if (!Auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <div className="members-nav">
        <Navbar />
      </div>

      <ProfileList>
        <DistanceCard
          // Using "getDistance" function from utils to find users within or over a fifty miles radius.
          distanceObj={me && users && getDistance(me, users).seventyFiveMiles}
          distanceCardFunc={distanceCardFunc}
        >
          <MembersSumaryModal
            user={user}
            ongoingRequest={ongoingRequest}
            friends={friends}
            friendsSince={friendsSince}
            modalClose={modalClose}
            successMessage={successMessage}
            errorMessage={errorMessage}
            loading={loading}
            contact={contact}
            resetModalData={resetModalData}
          />
        </DistanceCard>
        <DistanceCard
          // Using imported "getDistance" function from utils to find users within or over a fifty miles radius.
          distanceObj={
            me && users.length && getDistance(me, users).overSeventyFiveMiles
          }
          distanceCardFunc={distanceCardFunc}
        >
          <MembersSumaryModal
            user={user}
            ongoingRequest={ongoingRequest}
            friends={friends}
            friendsSince={friendsSince}
            modalClose={modalClose}
            errorMessage={errorMessage}
            successMessage={successMessage}
            loading={loading}
            contact={contact}
            resetModalData={resetModalData}
          />
        </DistanceCard>
      </ProfileList>
      <Footer />
    </>
  );
};
export default Neighbors;
