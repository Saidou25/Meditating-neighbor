import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USERS, QUERY_CONTACTS } from "../../utils/queries";
import { FaEllipsisH } from "react-icons/fa";
import { FaEnvelope, FaIdBadge, FaHome } from "react-icons/fa";
import Notifications from "../Notifications";
import Navbar from "../Navbar";
import Footer from "../Footer";
import profileIcon from "../../assets/images/profileicon.png";
import "./index.css";

const Contacts = () => {
  const [myContactsProfiles, setMyContactsProfiles] = useState([]);
  const [user, setUser] = useState("");
  const [friendsDate, setFriendsDate] = useState(false);

  const { data: meData } = useQuery(QUERY_ME);
  const { data: usersData } = useQuery(QUERY_USERS);
  const { data: contactsData } = useQuery(QUERY_CONTACTS);

  useEffect(() => {
    if (usersData && contactsData && meData) {
      const me = meData?.me || [];
      const users = usersData?.users || [];
      const contacts = me?.contacts || [];
      const allMyContactsProfiles = [];

      for (let contact of contacts) {
        const contactsProfiles = users.filter(
          (user) => user._id === contact.friendId
        );
        allMyContactsProfiles.push(contactsProfiles[0]);
        setMyContactsProfiles(allMyContactsProfiles);
        setFriendsDate(contact.todaysDate);
      }
    }
  }, [usersData, contactsData, meData]);

  return (
    <>
      <Navbar />
      <div className="container-fluid contacts bg-primary">
        <div>
          <Notifications />
        </div>
        {myContactsProfiles.length ? (
          <>
            <h3 className="contact-title text-light pt-5">Your contacts</h3>
            <div className="row card-row">
              {myContactsProfiles &&
                myContactsProfiles.map((user) => (
                  <div
                    key={user._id}
                    className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4"
                  >
                    <div className="card-body">
                      <div className="icon-container">
                        <button
                          className="btn btn-profile "
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          onClick={() => {
                            setUser(user);
                          }}
                        >
                          <FaEllipsisH className="icon" />
                        </button>
                      </div>
                      <div className="row profiles-row">
                        <div className="col-12 profiles-column">
                          {!user.avatar?.avatarUrl ? (
                            <img
                              className="container-pic mb-4"
                              src={profileIcon}
                              alt="profile icon"
                            />
                          ) : (
                            <img
                              className="container-pic mb-4"
                              src={user.avatar.avatarUrl}
                              alt="profile icon"
                            />
                          )}
                        </div>
                        <div className="col-12 profiles-column">
                          <p className="location text-light">{user.username}</p>
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
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content contact-content">
                  <div className="modal-header">
                    <h3
                      className="modal-title fs-5 text-primary"
                      id="staticBackdropLabel"
                    >
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
                    <div className="contact-avatar m-4">
                      <img
                        className="contact-pic"
                        src={
                          user.avatar?.avatarUrl
                            ? user.avatar.avatarUrl
                            : profileIcon
                        }
                        alt="profile icon"
                      />
                    </div>
                    {user.profile?.story ? (
                      <>
                        <div className="about-contact px-3">
                        {/* <div className="p-items text-primary mt-5"> */}
                        <h4 className="p-items text-primary mb-3">About</h4>
                          {/* <p className="p-info-story text-primary px-3 mb-4">{user.profile.story}</p> */}
                          <p>{user.profile.story}</p>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* <div className="p-info-contacts text-primary px-3 mb-4"> */}
                    <div className="p-info text-primary px-3 mb-4">
                      <h4 className="info-teacher text-primary mt-5 mb-4">Info</h4>{" "}
                      {/* <h4>Info</h4>{" "} */}
                      {user.profile ? (
                        <>
                          <p>Teacher(TMI)</p>
                          <p>
                            Has been meditating for {user.profile.years} years
                          </p>
                          <p>Currently working on stage {user.profile.stage}</p>
                        </>
                      ) : (
                        <></>
                      )}
                      <p className="p-fas mt-5">
                        <FaIdBadge /> {user.username}
                      </p>
                      <p>
                        <FaEnvelope /> {user.email}
                      </p>
                      {user.location ? (
                        <p>
                          <FaHome /> {user.location.city},{" "}
                          {user.location?.state}, {user.location.country}
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <div className="row contact-footer">
                      <div className="col-8 friends-since m-0">
                        <p>Friends since: {friendsDate}</p>
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
