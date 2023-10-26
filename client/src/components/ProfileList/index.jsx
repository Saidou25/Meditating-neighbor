import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { QUERY_REQUESTS } from "../../utils/queries";
import { ADD_REQUEST } from "../../utils/mutations";
import { FaEllipsisH } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import Auth from "../../utils/auth";
import useMyContacts from "../../Hooks/UseMyContacts";
import useMyRequests from "../../Hooks/UseMyRequests";
import useUsersInfo from "../../Hooks/UseUsersInfo";
import Navbar from "../Navbar";
import Footer from "../Footer";
import profileIcon from "../../assets/images/profileicon.png";
// import Spinner from "../Spinner";
import "./index.css";

const ProfileList = (props) => {
  const [ongoingRequest, setOngoingRequest] = useState(false);
  const [friends, setFriends] = useState(false);
  const [friendsSince, setFriendsSince] = useState("");
  const [modalClose, setModalClose] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // importing data from queries from hooks
  const { me, myContacts } = useMyContacts();
  const { incomingRequests, outgoingRequests } = useMyRequests();
  const { users } = useUsersInfo();

  // getting user's profiles from props depending on if there locations is within a 50 miles radius
  const seventyFiveMiles = props.seventyFiveMiles;
  const overSeventyFiveMiles = props.overSeventyFiveMiles;

  const myLocation = me.location;
  const myProfile = me.profile;
  const myAvatar = me.avatar;

  // updating cache with new contact request
  const [addRequest] = useMutation(ADD_REQUEST, {
    update(cache, { data: { addRequest } }) {
      try {
        const { requests } = cache.readQuery({ query: QUERY_REQUESTS });
        cache.writeQuery({
          query: QUERY_REQUESTS,
          data: {
            requests: [...requests, addRequest],
          },
        });

        console.log("success updating cache with add request");
      } catch (e) {
        console.error(e);
      }
    },
  });
  // adding contact request to MongoDb database using graphql addRequest mutation
  const contact = async () => {
    if (!myAvatar || !myLocation || !myProfile) {
      setErrorMessage(
        "You need to setup your profile, save your location and add a profile picture before requesting contacts."
      );
      return;
    }
    try {
      const { data } = await addRequest({
        variables: {
          email: me.email,
          myName: me.username,
          destinationName: user.username,
          avatarUrl: avatarUrl,
        },
      });
      if (data) {
        console.log("success sending contact request");
      }
    } catch (e) {
      console.error(e);
    }
  };
  const hasData = () => {
    if (!myAvatar || !myLocation || !myProfile) {
      setModalClose("");
    } else {
      setModalClose("modal");
    }
  };

  useEffect(() => {
    if (username && users) {
      const selectedUser = users.filter((user) => user.username === username);
      setUser(selectedUser[0]);
    }
  }, [username, users]);
  // ----------------------------------------------------------------
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
  // finding out if the selected user thru the modal is already a friend or not so we can setup the button with
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

  if (!Auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid neighbors bg-primary" style={{ minHeight: "100vh"}}>
        {seventyFiveMiles.length ? (
          <h3 className="locations-list-title text-white py-5">
            Within a 50 miles radius
          </h3>
        ) : (
          <></>
        )}
        <div className="row card-row">
          {seventyFiveMiles &&
            seventyFiveMiles.map((distanceObj) => (
              <div
                key={distanceObj.id}
                className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 card-column"
              >
                <div className="card card-locations bg-primary">
                  <div className="card-body">
                    <div className="icon-container">
                      <button
                        className="btn btn-profile "
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        onClick={() => {
                          setAvatarUrl(distanceObj.avatarUrl);
                          setUsername(distanceObj.username);
                          isRequest(distanceObj);
                          areWeFriends(distanceObj);
                          hasData();
                        }}
                      >
                        <FaEllipsisH className="icon" />
                      </button>
                    </div>
                    <div className="row profiles-row">
                      <div className="col-12 profiles-column">
                        <img
                          className="container-pic mb-4"
                          src={
                            !distanceObj.avatarUrl
                              ? profileIcon
                              : distanceObj.avatarUrl
                          }
                          alt="profile icon"
                        />
                      </div>
                      <div className="col-12 profiles-column">
                        <p className="location text-light">
                          {distanceObj.username}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {overSeventyFiveMiles.length ? (
          <h3 className="locations-list-title text-white py-5">
            Over a 50 miles radius
          </h3>
        ) : (
          <></>
        )}
        <div className="row card-row">
          {overSeventyFiveMiles &&
            overSeventyFiveMiles.map((distanceObj) => (
              <div
                key={distanceObj.id}
                className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 card-column"
              >
                <div
                  key={distanceObj.id}
                  className="card card-locations bg-primary"
                >
                  <div className="card-body">
                    <div className="icon-container">
                      <button
                        className="btn btn-profile "
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        onClick={() => {
                          setAvatarUrl(distanceObj.avatarUrl);
                          setUsername(distanceObj.username);
                          isRequest(distanceObj);
                          areWeFriends(distanceObj);
                          hasData(distanceObj);
                        }}
                      >
                        <FaEllipsisH className="icon" />
                      </button>
                    </div>
                    <div className="row profiles-row">
                      <div className="col-12 profiles-column">
                        {!distanceObj.avatarUrl ? (
                          <img
                            className="container-pic mb-4"
                            src={profileIcon}
                            alt="profile icon"
                          />
                        ) : (
                          <img
                            className="container-pic mb-4"
                            src={distanceObj.avatarUrl}
                            alt="profile icon"
                          />
                        )}
                      </div>
                      <div className="col-12 profiles-column">
                        <p className="location text-light">
                          {distanceObj.username}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <>
                <div className="modal-header">
                  {user.profile?.firstname && user.profile?.lastname ? (
                    <h3 className="modal-title fs-5" id="staticBackdropLabel">
                      {user.profile.firstname} {user.profile.lastname}
                    </h3>
                  ) : (
                    <h3 className="modal-title fs-5" id="staticBackdropLabel">
                      {user.username}
                    </h3>
                  )}

                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      setAvatarUrl("");
                      setUsername("");
                      setOngoingRequest(false);
                      setFriends(false);
                      setErrorMessage("");
                    }}
                  ></button>
                </div>
                <div className="modal-body list-body">
                  <div className="row">
                    <div className="col-6">
                      <img
                        className="container-pic mb-4"
                        src={
                          user.avatar?.avatarUrl
                            ? user.avatar?.avatarUrl
                            : profileIcon
                        }
                        alt="profile icon"
                        style={{ width: 150, height: 150 }}
                      />
                    </div>
                    <div className="col-6">
                      {" "}
                      <div className="location">
                        {user.profile?.teacher ? (
                          <>
                            <p>{user.profile.teacher}(TMI)</p>
                            <p>
                              Has been meditating for {user.profile.years} years
                            </p>
                          </>
                        ) : (
                          <></>
                        )}
                        {user.location ? (
                          <p>
                            Lives in {user.location?.city},{" "}
                            {user.location?.state}, {user.location?.country}
                          </p>
                        ) : (
                          <></>
                        )}
                        {!user.location && !user.profile && (
                          <>{user.username} has no profile set yet</>
                        )}
                        {friends === true ? <p>email: {user.email}</p> : <></>}
                      </div>
                    </div>
                  </div>
                  {errorMessage && (
                    <p className="error-message bg-danger text-light p-2 m-2">
                      {errorMessage}
                    </p>
                  )}
                </div>
              </>
              {friendsSince && friends === true ? (
                <div className="profile-friends p-3">
                  {" "}
                  <p className="friends-profile m-0">
                    Friends since: {friendsSince}{" "}
                  </p>
                </div>
              ) : (
                <></>
              )}
              <div className="modal-footer">
                <div className="row row-modal-footer">
                  <div className="col-6 col-close-button">
                    <button
                      type="button"
                      className="btn btn-secondary close-btn"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        setAvatarUrl("");
                        setUsername("");
                        setOngoingRequest(false);
                        setFriends(false);
                        setErrorMessage("");
                      }}
                    >
                      Close
                    </button>
                  </div>
                  {friends === false && ongoingRequest === true && (
                    <button type="button" className="col-6 btn btn-primary">
                      pending
                    </button>
                  )}
                  {friends === true && (
                    <button type="button" className="col-6 btn btn-primary">
                      friend
                    </button>
                  )}
                  {friends === false && ongoingRequest === false && (
                    <button
                      type="button"
                      className="col-6 btn btn-primary friendship-request"
                      onClick={contact}
                      data-bs-dismiss={modalClose}
                    >
                      request friendship
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-footer bg-primary">
        <Footer />
      </div>
    </>
  );
};
export default ProfileList;
