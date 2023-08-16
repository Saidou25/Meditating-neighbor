import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USERS, QUERY_ME } from "../../utils/queries";
import { ADD_REQUEST } from "../../utils/mutations";
import Navbar from "../Navbar";
import Footer from "../Footer";
import profileIcon from "../../assets/images/profileicon.png";
import { FaEllipsisH } from "react-icons/fa";
import "./index.css";

const ProfileList = (props) => {
  const seventyFiveMiles = props.seventyFiveMiles;
  const overSeventyFiveMiles = props.overSeventyFiveMiles;
  const { data: meData } = useQuery(QUERY_ME);
  const me = meData?.me || [];

  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("");

  const [user, setUser] = useState("");
  const { data: usersData } = useQuery(QUERY_USERS);

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
    console.log(
      `${me.username} requests contact with ${user.username}. ${me.username} 's email is ${me.email} `
    );
    try {
      const { data } = await addRequest({
        variables: {
          email: me.email,
          myName: me.username,
          destinationName: user.username,
        },
      });
      if (data) {
        console.log("success sending contact request");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (usersData && username) {
      const users = usersData?.users || [];
      const selectedUser = users.filter((user) => user.username === username);

      setUser(selectedUser[0]);
    }
  }, [usersData, username]);

  const [outgoingRequest, setOutgoingRequest] = useState(false);
  // console.log("outgoing request", outgoingRequest);
  const outgoing = (distanceObj) => {
    const myOutRequest = me.requests.filter(
      (request) => request.destinationName === distanceObj.user.username
    );

    if (myOutRequest.length) {
      setOutgoingRequest(true);
    }
  };
  const [incomingRequest, setIncomingRequest] = useState(false);
  // console.log("incoming request", incomingRequest);
  const incoming = (distanceObj) => {
    for (let request of distanceObj.user.requests) {
      if (request.destinationName === me.username);
      setIncomingRequest(true);
    }
  };
  const [incomingResponse, setIncomingResponse] = useState(false);
  const isResponding = (distanceObj) => {
    for (let response of distanceObj.user.responses) {
      if (response.fromName === distanceObj.username) {
        setIncomingResponse(true);
      }
    }
  };
  const [outgoingResponse, setOutgoingResponse] = useState(false);
  // console.log("outgoingResponse", outgoingResponse);
  const respondingToOther = (distanceObj) => {
    // console.log("distance object", distanceObj);
    // for (let response of distanceObj.user.responses) {
    //   if (response.fromName === distanceObj.username) {
    //     setOutgoingResponse(true);
    //   }
    // }
  };
  const [friends, setFriends] = useState(false);
  const [ok, setOk] = useState(false);
  const areWeFriends = (distanceObj) => {
    for (let contact of distanceObj.user.contacts) {
      if (contact.friendId === me._id) {
        setFriends(true);
        setOk(true);
      }
    }
    for (let contact of me.contacts) {
      if (contact.friendId === user._id) {
        setOk(false);
      }
    }
  };

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
              <div key={distanceObj.id} className="col-3 card-column">
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
                          isResponding(distanceObj);
                          respondingToOther(distanceObj);
                          areWeFriends(distanceObj);
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
              <div key={distanceObj.id} className="col-3 card-column">
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
                          isResponding(distanceObj);
                          respondingToOther(distanceObj);
                          areWeFriends(distanceObj);
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
                            // style={{ width: 150, height: 150 }}
                          />
                        ) : (
                          <img
                            className="container-pic mb-4"
                            src={distanceObj.avatarUrl}
                            alt="profile icon"
                            // style={{ width: 150, height: 150 }}
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
                  {/* <button
                    className="btn bg-primary text-light"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={() => {
                      setAvatarUrl(distanceObj.avatarUrl);
                      setUsername(distanceObj.username);
                    }}
                  >
                    view profile
                  </button> */}
                </div>
              </div>
            ))}
        </div>

        <div
          className="modal fade"
          id="staticBackdrop"
          // data-bs-backdrop="static"
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
                  {/* <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button> */}
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
                        <p>teacher(TMI)</p>
                        <p>meditating since: 2010</p>
                        <p>frequency: 7hrs/week</p>
                        <p>
                          leaves in {user.location?.city},{" "}
                          {user.location?.state}, {user.location?.country}
                        </p>
                        {friends === true ? <p>email: {user.email}</p> : <></>}
                      </div>
                    </div>
                  </div>
                </div>
              </>
              <div className="modal-footer">
                <div className="row row-modal-footer">
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        setAvatarUrl("");
                        setUsername("");
                        setOutgoingRequest(false);
                        setIncomingRequest(false);
                        respondingToOther(false);
                        setIncomingResponse(false);
                        setFriends(false);
                        setOk(false);
                      }}
                    >
                      Close
                    </button>
                    {/* outgoingRequest === false &&
                    incomingRequest === false &&
                    incomingResponse === false */}
                  </div>
                  {friends === false &&
                    (outgoingRequest === true ||
                      incomingRequest === true ||
                      incomingResponse === true ||
                      outgoingResponse === true) && (
                      // <div className="col-6">
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
                        className="col-6 btn btn-primary"
                        onClick={contact}
                      >
                        request friendship
                      </button>
                    )}
                </div>
                {ok === true ? (
                  <p>
                    Don't forget to ok from your notification so your email is
                    also available to others.
                  </p>
                ) : (
                  <></>
                )}
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
