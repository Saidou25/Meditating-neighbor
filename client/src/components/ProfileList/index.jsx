import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USERS, QUERY_ME, QUERY_PROFILES, QUERY_AVATARS, QUERY_LOCATIONS } from "../../utils/queries";
import { ADD_REQUEST } from "../../utils/mutations";
import { FaEllipsisH } from "react-icons/fa";
import Navbar from "../Navbar";
import Footer from "../Footer";
import profileIcon from "../../assets/images/profileicon.png";
import Spinner from "../Spinner";
import "./index.css";

const ProfileList = (props) => {
  const seventyFiveMiles = props.seventyFiveMiles;
  const overSeventyFiveMiles = props.overSeventyFiveMiles;
  const { data: meData, meDataLoading } = useQuery(QUERY_ME);
  const me = meData?.me || [];

  const [modalClose, setModalClose] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("");
  const [doSetUpMessage, setDoSetUpMessage] = useState("");

  const [user, setUser] = useState("");
  const { data: usersData, usersDataLoading } = useQuery(QUERY_USERS);

  const { data: profilesData } = useQuery(QUERY_PROFILES);
  const profiles = profilesData?.profiles || [];
  const userProfile = profiles.filter((profile) => profile.username === me.username);
  const myProfile = userProfile[0];

  const { data: avatarsData, avatarsDataLoadint } = useQuery(QUERY_AVATARS);
  const avatars = avatarsData?.avatars || [];
  const userAvatar = avatars.filter((avatar) => avatar.username === me.username);
  const myAvatar = userAvatar[0];

  const { data: locationsData, locationDataLoading } = useQuery(QUERY_LOCATIONS);
  const locations = locationsData?.locations || [];
  const userLocation = locations.filter((location) => location.username === me.username);
  const myLocation = userLocation[0];
  // Updating the cache with newly created contact
  const [addRequest] = useMutation(ADD_REQUEST, {
    update(cache, { data: { addRequest } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: {
            me: { ...me, requests: [...me.requests, addRequest] },
          },
        });

        console.log("success updating cache with add contact");
      } catch (e) {
        console.error(e);
      }
    },
  });

  const contact = async () => {
    if (modalClose === "") {
      setDoSetUpMessage(
        "You need to setup your avatar, profile and add your location before making any contact request..."
      );
      return;
    }
    try {
      const { data } = await addRequest({
        variables: {
          email: me.email,
          myName: me.username,
          destinationName: user.username,
          avatarUrl: avatarUrl
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
    if (
      !myAvatar ||
      !myLocation ||
      !myProfile
    ) {
      console.log("no data");
      setModalClose("");
      
    } else {
      setModalClose("modal");
     console.log("has data");
    }
  }

  useEffect(() => {
    if (usersData && username) {
      const users = usersData?.users || [];
      const selectedUser = users.filter((user) => user.username === username);

      setUser(selectedUser[0]);
    }
  }, [usersData, username]);
  // ----------------------------------------------------------------
  const [outgoingRequest, setOutgoingRequest] = useState(false);
  const outgoing = (distanceObj) => {
    const myOutRequest = me.requests.filter(
      (request) => request.destinationName === distanceObj.user.username
    );

    if (myOutRequest.length) {
      setOutgoingRequest(true);
    }
  };
  const [incomingRequest, setIncomingRequest] = useState(false);
  const incoming = (distanceObj) => {
    for (let request of distanceObj.user.requests) {
      if (request.destinationName === me.username);
      setIncomingRequest(true);
    }
  };

  const [incomingResponse, setIncomingResponse] = useState(false);
  const incomingResp = (distanceObj) => {
    for (let response of distanceObj.user.responses) {
      if (response.toName === me.username) {
        setIncomingResponse(true);
      }
    }
  };
  const [outgoingResponse, setOutgoingResponse] = useState(false);
  const outgoingResp = (distanceObj) => {
    for (let response of me.responses) {
      if (response.toName === distanceObj.user.username) {
        setOutgoingResponse(true);
      }
    }
  };
  const [friends, setFriends] = useState(false);
  const [otherFriend, setOtherFriend] = useState(false);
  const [otherFriendDate, setOtherFriendDate] = useState(false);
  const areWeFriends = (distanceObj) => {
    for (let contact of distanceObj.user.contacts) {
      if (contact.friendId === me._id) {
        console.log("contact", contact.todaysDate);
        setFriends(true);
      }
    }
    for (let contact of me.contacts) {
      if (contact.friendId === distanceObj.user._id) {
        console.log(" other contact", contact);
        setOtherFriendDate(contact.todaysDate);
        setOtherFriend(true);
      }
    }
  };
 

  if (meDataLoading || usersDataLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid neighbors bg-primary">
        <h3 className="locations-list-title text-white py-5">
          {seventyFiveMiles.length ? <>Within a 50 miles radius</> : <></>}
        </h3>
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
                          outgoing(distanceObj);
                          incoming(distanceObj);
                          incomingResp(distanceObj);
                          outgoingResp(distanceObj);
                          areWeFriends(distanceObj);
                          hasData()
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
        <h3 className="locations-list-title text-white py-5">
          Over a 50 miles radius
        </h3>
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
                          outgoing(distanceObj);
                          incoming(distanceObj);
                          incomingResp(distanceObj);
                          outgoingResp(distanceObj);
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
                  <h3 className="modal-title fs-5" id="staticBackdropLabel">
                    {user.username}
                  </h3>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      setAvatarUrl("");
                      setUsername("");
                      setOutgoingRequest(false);
                      setIncomingRequest(false);
                      setOutgoingResponse(false);
                      setIncomingResponse(false);
                      setFriends(false);
                      setOtherFriend(false);
                      // setModalClose("");
                      setDoSetUpMessage("");
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-6">
                      {" "}
                      {user.avatar?.avatarUrl ? (
                        <img
                          className="container-pic mb-4"
                          src={avatarUrl}
                          alt="profile icon"
                          style={{ width: 150, height: 150 }}
                        />
                      ) : (
                        <img
                          className="container-pic mb-4"
                          src={profileIcon}
                          alt="profile icon"
                          style={{ width: 150, height: 150 }}
                        />
                      )}
                    </div>
                    <div className="col-6">
                      {" "}
                      <div className="location">
                        {user.profile?.teacher ? (
                          <>
                            <p>{user.profile.teacher}(TMI)</p>
                            <p>
                              has been meditating for {user.profile.years} years
                            </p>
                          </>
                        ) : (
                          <></>
                        )}
                        {user.location ? (
                          <p>
                            leaves in {user.location?.city},{" "}
                            {user.location?.state}, {user.location?.country}
                          </p>
                        ) : (
                          <></>
                        )}
                        {!user.location && !user.profile && (
                          <>{user.username} has no profile set yet</>
                        )}
                        {incomingResponse === true ? (
                          <p>email: {user.email}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
              {otherFriend === true ? (
                <div className="profile-friends p-3">
                  {" "}
                  <p className="friends-profile m-0">
                    Friends since: {otherFriendDate}{" "}
                  </p>
                </div>
              ) : (
                <></>
              )}
              {friends === true && otherFriend === false ? (
                <div className="orange-div m-3">
                  <p className="orange p-3 bg-warning text-primary">
                    Don't forget to ok {user.username} from your notification so
                    your email is also viewable to {user.username}.
                  </p>
                </div>
              ) : (
                <></>
              )}

              {((incomingRequest === true || outgoingResponse === true) &&
                friends === true &&
                otherFriend === false) ||
              (friends === false && otherFriend === true) ? (
                <div className="orange-div m-3">
                  <p className="orange p-3 bg-warning text-primary">
                    Your contact is now viewable to {user.username}. Once{" "}
                    {user.username} has ok on it's side {user.username}' contact
                    will be viewable to you.
                  </p>
                </div>
              ) : (
                <></>
              )}
              {doSetUpMessage ? <p>{doSetUpMessage}</p> : <></>}
              <div className="modal-footer">
                <div className="row row-modal-footer">
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        // setModalClose("");
                        setAvatarUrl("");
                        setUsername("");
                        setOutgoingRequest(false);
                        setIncomingRequest(false);
                        setOutgoingResponse(false);
                        setIncomingResponse(false);
                        setFriends(false);
                        setOtherFriend(false);
                        setOtherFriendDate(false);
                        setDoSetUpMessage("");
                      }}
                    >
                      Close
                    </button>
                  </div>
                  {friends === false &&
                    (outgoingRequest === true ||
                      incomingRequest === true ||
                      incomingResponse === true ||
                      outgoingResponse === true) && (
                      <button type="button" className="col-6 btn btn-primary">
                        pending
                      </button>
                    )}
                  {friends === true && (
                    <button type="button" className="col-6 btn btn-primary">
                      friend
                    </button>
                  )}
                  {friends === false &&
                    outgoingRequest === false &&
                    incomingRequest === false &&
                    outgoingResponse === false &&
                    incomingResponse === false && (

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
