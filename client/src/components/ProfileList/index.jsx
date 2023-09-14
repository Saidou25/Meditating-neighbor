import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  QUERY_USERS,
  QUERY_ME,
  QUERY_PROFILES,
  QUERY_AVATARS,
  QUERY_LOCATIONS,
  QUERY_REQUESTS,
  QUERY_CONTACTS,
} from "../../utils/queries";
import { ADD_REQUEST } from "../../utils/mutations";
import { FaEllipsisH } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import Auth from "../../utils/auth";
import Navbar from "../Navbar";
import Footer from "../Footer";
import profileIcon from "../../assets/images/profileicon.png";
import Spinner from "../Spinner";
import "./index.css";

const ProfileList = (props) => {
  const [outgoingRequest, setOutgoingRequest] = useState(false);
  const [incomingRequest, setIncomingRequest] = useState(false);
  const [friends, setFriends] = useState(false);
  const [friendsSince, setFriendsSince] = useState("");
  const [modalClose, setModalClose] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const seventyFiveMiles = props.seventyFiveMiles;
  const overSeventyFiveMiles = props.overSeventyFiveMiles;

  const { data: meData, meDataLoading } = useQuery(QUERY_ME);
  const me = meData?.me || [];
  const { data: usersData, usersDataLoading } = useQuery(QUERY_USERS);

  const { data: profilesData } = useQuery(QUERY_PROFILES);
  const profiles = profilesData?.profiles || [];
  const userProfile = profiles.filter(
    (profile) => profile.username === me.username
  );
  const myProfile = userProfile[0];

  const { data: avatarsData, avatarsDataLoading } = useQuery(QUERY_AVATARS);
  const avatars = avatarsData?.avatars || [];
  const userAvatar = avatars.filter(
    (avatar) => avatar.username === me.username
  );
  const myAvatar = userAvatar[0];

  const { data: locationsData, locationDataLoading } =
    useQuery(QUERY_LOCATIONS);
  const locations = locationsData?.locations || [];
  const userLocation = locations.filter(
    (location) => location.username === me.username
  );
  const myLocation = userLocation[0];

  const { data: requestsData, requestsDataLoading } = useQuery(QUERY_REQUESTS);
  const requests = requestsData?.requests || [];

  const { data: contactsData, contactsDataLoading } = useQuery(QUERY_CONTACTS);
  const contacts = contactsData?.contacts || [];
  // Updating the cache with newly created contact
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

  const contact = async () => {
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
      // console.log("no data");
      setModalClose("");
    } else {
      setModalClose("modal");
      // console.log("has data");
    }
  };

  useEffect(() => {
    if (usersData && username) {
      const users = usersData?.users || [];
      const selectedUser = users.filter((user) => user.username === username);
      setUser(selectedUser[0]);
    }
  }, [usersData, username]);
  // ----------------------------------------------------------------

  const outgoing = (distanceObj) => {
    for (let request of requests) {
      if (
        request.myName === me.username &&
        request.destinationName === distanceObj.user.username
      ) {
        setOutgoingRequest(true);
      }
    }
  };
  const incoming = (distanceObj) => {
    for (let request of requests) {
      if (
        request.destinationName === me.username &&
        request.myName === distanceObj.user.username
      ) {
        setIncomingRequest(true);
      }
    }
  };

  const areWeFriends = (distanceObj) => {
    for (let contact of contacts) {
      // console.log("contacts", contacts);
      // console.log(distanceObj.user.username);
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

  if (
    meDataLoading ||
    usersDataLoading ||
    avatarsDataLoading ||
    locationDataLoading ||
    requestsDataLoading ||
    contactsDataLoading
  ) {
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
                          areWeFriends(distanceObj);
                          hasData();
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
                      setOutgoingRequest(false);
                      setIncomingRequest(false);
                      setFriends(false);
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
                            Leaves in {user.location?.city},{" "}
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
                        setOutgoingRequest(false);
                        setIncomingRequest(false);
                        setFriends(false);
                      }}
                    >
                      Close
                    </button>
                  </div>
                  {friends === false &&
                    (outgoingRequest === true || incomingRequest === true) && (
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
                    incomingRequest === false && (
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
