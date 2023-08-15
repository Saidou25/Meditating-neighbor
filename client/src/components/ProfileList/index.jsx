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
  // const [addRequest] = useMutation(ADD_REQUEST);

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

  const [pendingRequest, setPendingRequest] = useState(false);
  const dothis = (distanceObj) => {
    for (let request of me.requests) {
      if (request.destinationName === distanceObj.username);
      setPendingRequest(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid neighbors bg-primary">
        <h3 className="locations-list-title text-white py-5">
          {seventyFiveMiles.length ? <>Within a 75 miles radius</> : <></>}
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
                          dothis(distanceObj);
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
          Over a 75 miles radius
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
                          setUsername(distanceObj);
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
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
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
                        <p>teacher(TMI)</p>
                        <p>meditating since: 2010</p>
                        <p>frequency: 7hrs/week</p>
                        <p>
                          leaves in {user.location?.city},{" "}
                          {user.location?.state}, {user.location?.country}
                        </p>
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
                      }}
                    >
                      Close
                    </button>
                  </div>
                  {pendingRequest === true ? (
                    // <div className="col-6">
                    <button type="button" className="col-6 btn btn-primary">
                      pending
                    </button>
                  ) : (
                    // </div>
                    // <div className="col-6">
                    <button
                      type="button"
                      className="col-6 btn btn-primary"
                      onClick={contact}
                    >
                      request friendship
                    </button>
                    // </div>
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
