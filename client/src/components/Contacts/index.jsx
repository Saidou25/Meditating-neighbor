import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";
import { FaEnvelope, FaIdBadge, FaHome, FaEllipsisH } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import Auth from "../../utils/auth";
import useHooks from "../../utils/UseHooks";
import Notifications from "../Notifications";
import Navbar from "../Navbar";
import Footer from "../Footer";
import profileIcon from "../../assets/images/profileicon.png";
import "./index.css";

const Contacts = () => {
  const [myContactsProfiles, setMyContactsProfiles] = useState([]);
  const [user, setUser] = useState("");
  const { me, myContacts } = useHooks();
  const { data: usersData } = useQuery(QUERY_USERS);

  useEffect(() => {
    if (usersData && me && myContacts) {
      const users = usersData?.users || [];
      let friendNames = [];
      let allMyContactsProfiles = [];

      for (let contact of myContacts) {
        if (contact.username === me.username) {
          let friendObj = {
            name: contact.friendUsername,
            date: contact.todaysDate,
          };
          friendNames.push(friendObj);
        }
        if (contact.friendUsername === me.username) {
          let friendObj = {
            name: contact.username,
            date: contact.todaysDate,
          };
          friendNames.push(friendObj);
        }
      }
      for (let friendName of friendNames) {
        const friendProfile = users.filter(
          (user) => user.username === friendName.name
        );
        if (friendNames) {
          const friendProfileWithDate = {
            friendUser: friendProfile[0],
            date: friendName.date,
          };
          allMyContactsProfiles.push(friendProfileWithDate);
          setMyContactsProfiles(allMyContactsProfiles);
        }
      }
    }
  }, [usersData, me, myContacts]);

  if (!Auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid contacts bg-primary">
        <Notifications />
        {myContactsProfiles.length ? (
          <>
            <h3 className="contact-title text-light">Your contacts</h3>
            <div className="row card-row">
              {myContactsProfiles &&
                myContactsProfiles.map((friendProfileWithDate) => (
                  <div
                    key={friendProfileWithDate.friendUser._id}
                    className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4"
                  >
                    <div className="card-body">
                      <div className="icon-container">
                        <button
                          className="btn btn-profile "
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => {
                            setUser(friendProfileWithDate);
                          }}
                        >
                          <FaEllipsisH className="icon" />
                        </button>
                      </div>
                      <div className="row profiles-row">
                        <div className="col-12 profiles-column">
                          <img
                            className="contact-pic"
                            src={
                              friendProfileWithDate.friendUser.avatar?.avatarUrl
                                ? friendProfileWithDate.friendUser.avatar
                                    ?.avatarUrl
                                : profileIcon
                            }
                            alt="profile avatar"
                          />
                        </div>
                        <div className="col-12 profiles-column">
                          <p className="location my-4 text-light">
                            {friendProfileWithDate.friendUser.username}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div
              className="modal fade"
              id="exampleModal"
              // data-bs-backdrop="static"
              // data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    {user.profile?.firstname && user.profile?.lastname ? (
                      <h3
                        className="modal-title text-black"
                        id="exampleModalLabel"
                      >
                        {user.profile?.firstname} {user.profile?.lastname}
                      </h3>
                    ) : (
                      <h3>{user.friendUser?.username}</h3>
                    )}
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body contact-body">
                    <div className="contact-avatar m-4">
                      <img
                        className="contact-pic"
                        src={
                          user.friendUser?.avatar?.avatarUrl
                            ? user.friendUser?.avatar.avatarUrl
                            : profileIcon
                        }
                        alt="profile icon"
                      />
                    </div>
                    <div className="row contact-profile-modal">
                      <div className="col-12">
                        {user.friendUser?.profile.story ? (
                          <>
                            <h4 className="about-title mt-5 mb-4">About</h4>{" "}
                            <p className="p-story-profile-contact mt-5 mb-4">
                              {user.friendUser.profile.story}
                            </p>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col-12">
                        <div className="p-info text-primary mb-4">
                          <h4 className="info-teacher text-primary mt-5 mb-4">
                            Info
                          </h4>{" "}
                          {user.friendUser?.profile ? (
                            <div className="p-about mt-5 mb-4">
                              <p>{user.friendUser.profile.teacher}</p>
                              <p>
                                Has been meditating for{" "}
                                {user.friendUser.profile.years} years
                              </p>
                              <p>
                                Currently working on stage{" "}
                                {user.friendUser.profile.stage}
                              </p>
                            </div>
                          ) : (
                            <></>
                          )}
                          <div className="p-about mt-5 mb-4">
                            <p>
                              <FaIdBadge /> {user.friendUser?.username}
                            </p>
                            <p>
                              <FaEnvelope /> {user.friendUser?.email}
                            </p>
                            <p>
                              <FaHome /> {user.friendUser?.location.city},{" "}
                              {user.friendUser?.location?.state},{" "}
                              {user.friendUser?.location.country}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <div className="row contact-footer">
                      <div className="col-8 friends-since m-0">
                        <p className="friends-since text-primary">
                          Friends since: {user.date}
                        </p>
                      </div>
                      <div className="col-4 contact-close">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <Footer />
    </>
  );
};
export default Contacts;
