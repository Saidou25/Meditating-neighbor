import React, { useState } from "react";
import { FaEnvelope, FaIdBadge, FaHome, FaEllipsisH } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import Auth from "../../utils/auth";
import useMyContacts from "../../utils/UseMyContacts";
import useUsersInfo from "../../utils/UseUsersInfo";
import Notifications from "../Notifications";
import Navbar from "../Navbar";
import Footer from "../Footer";
import profileIcon from "../../assets/images/profileicon.png";
import "./index.css";

const Contacts = () => {
  const [user, setUser] = useState({ userInfo: "", date: "" });
  const { users } = useUsersInfo();
  const { me, myContacts } = useMyContacts();
 
  const findUser = (myContact) => {
    users.filter((user) => {
      if (
        user.username === myContact.friendUsername &&
        myContact.username === me.username
      ) {
        console.log(user, myContact.todaysDate);
        setUser({ userInfo: user, date: myContact.todaysDate });
      } else if (
        user.username === myContact.username &&
        myContact.friendUsername === me.username
      ) {
        console.log(user, myContact.todaysDate);
        setUser({ userInfo: user, date: myContact.todaysDate });
      }
    });
  };

  if (!Auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid contacts bg-primary">
        <Notifications />
        {myContacts.length ? (
          <>
            <h3 className="contact-title text-light">Your contacts</h3>
            <div className="row card-row">
              {myContacts &&
                myContacts.map((myContact) => (
                  <div
                    key={myContact._id}
                    className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4"
                  >
                    <div className="card-body">
                      <div className="icon-container">
                        <button
                          className="btn btn-profile "
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => {
                            findUser(myContact);
                          }}
                        >
                          <FaEllipsisH className="icon" />
                        </button>
                      </div>
                      <div className="row profiles-row">
                        <div className="col-12 profiles-column">
                          <img
                            className="contact-pic"
                            // multiple ternary operator: if no avatar then default profileIcon, if i am soneone's contact or someone is my contact then avatarUrl or friendAvatarUrl is displayed
                            src={
                              myContact.avatarUrl || myContact.friendAvatarUrl
                                ? myContact.username === me.username
                                  ? myContact.friendAvatarUrl
                                  : myContact.avatarUrl
                                : profileIcon
                            }
                            alt="profile avatar"
                          />
                        </div>
                        <div className="col-12 profiles-column">
                          <p className="location my-4 text-light">
                            {myContact.username !== me.username ? (
                              <>{myContact.username}</>
                            ) : (
                              <>{myContact.friendUsername}</>
                            )}
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
                    {user.userInfo.profile?.firstname &&
                    user.userInfo.profile?.lastname ? (
                      <h3
                        className="modal-title text-black"
                        id="exampleModalLabel"
                      >
                        {user.userInfo.profile?.firstname}{" "}
                        {user.userInfo.profile?.lastname}
                      </h3>
                    ) : (
                      <h3>{user.userInfo?.username}</h3>
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
                          user.userInfo?.avatar?.avatarUrl
                            ? user.userInfo?.avatar.avatarUrl
                            : profileIcon
                        }
                        alt="profile icon"
                      />
                    </div>
                    <div className="row contact-profile-modal">
                      <div className="col-12">
                        {user.userInfo.profile?.story ? (
                          <>
                            <h4 className="about-title mt-5 mb-4">About</h4>{" "}
                            <p className="p-story-profile-contact mt-5 mb-4">
                              {user.userInfo.profile.story}
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
                          {user.userInfo?.profile ? (
                            <div className="p-about mt-5 mb-4">
                              <p>{user.userInfo.profile.teacher}</p>
                              <p>
                                Has been meditating for{" "}
                                {user.userInfo.profile.years} years
                              </p>
                              <p>
                                Currently working on stage{" "}
                                {user.userInfo.profile.stage}
                              </p>
                            </div>
                          ) : (
                            <></>
                          )}
                          <div className="p-about mt-5 mb-4">
                            <p>
                              <FaIdBadge /> {user.userInfo?.username}
                            </p>
                            <p>
                              <FaEnvelope /> {user.userInfo?.email}
                            </p>
                            <p>
                              <FaHome /> {user.userInfo.location?.city},{" "}
                              {user.userInfo.location?.state},{" "}
                              {user.userInfo.location?.country}
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
