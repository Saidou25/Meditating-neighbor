import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { DELETE_CONTACT } from "../../utils/mutations";
import { QUERY_ME, QUERY_USERS, QUERY_CONTACTS } from "../../utils/queries";
import { FaEnvelope, FaIdBadge, FaHome, FaEllipsisH } from "react-icons/fa";
import Notifications from "../Notifications";
import Navbar from "../Navbar";
import Footer from "../Footer";
import profileIcon from "../../assets/images/profileicon.png";
import "./index.css";

const Contacts = () => {
  const [myContactsProfiles, setMyContactsProfiles] = useState([]);
  const [user, setUser] = useState("");
  const [friendsDate, setFriendsDate] = useState(false);
  const [contactId, setContactId] = useState("");
  const [friendIsDeletedMessage, setFriendIsDeletedMessage] = useState("");

  const { data: meData } = useQuery(QUERY_ME);
  const { data: usersData } = useQuery(QUERY_USERS);

  const [deleteContact] = useMutation(
    DELETE_CONTACT,
    {
      variables: { id: contactId },
      update(cache, { data: { deleteContact } }) {
        try {
          const { contacts } = cache.readQuery({ query: QUERY_CONTACTS });
          cache.writeQuery({
            query: QUERY_CONTACTS,
            data: {
              requests: contacts.filter(
                (contact) => contact._id !== deleteContact._id
              ),
            },
          });

          console.log("success updating cache with delete contact");
        } catch (e) {
          console.error(e);
        }
      },
    }
  );

  const removeContact = async () => {
    try {
      const { data } = await deleteContact({
        variables: { id: contactId },
      });
      if (data) {
        console.log("success deleting contact", data);
        setFriendIsDeletedMessage("");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (usersData && meData) {
      const me = meData?.me || [];
      const users = usersData?.users || [];
      const contacts = me?.contacts || [];
      const allMyContactsProfiles = [];

      for (let contact of contacts) {
        const contactProfile = users.filter(
          (user) => user._id === contact.friendId
        );
        if (!contactProfile.length) {
          setContactId(contact._id);
          console.log("this id has no user", contactId);
          console.log(contact.friendUsername);
          setFriendIsDeletedMessage(
            `${contact.friendUsername} has deleted his account`
          );
        } else {
          allMyContactsProfiles.push(contactProfile[0]);
          setMyContactsProfiles(allMyContactsProfiles);
          setFriendsDate(contact.todaysDate);
          console.log("contact id has a user", contactId);
          console.log(contact.friendUsername);
        }
      }
    }
  }, [usersData, meData, contactId]);

  return (
    <>
      <Navbar />
      <div className="container-fluid contacts bg-primary">
        <Notifications />
        {friendIsDeletedMessage ? (
          <>
            <p>{friendIsDeletedMessage}</p>
            <button
              className="btn btn-friendIsDeletedMessage"
              onClick={removeContact}
            >
              ok
            </button>
          </>
        ) : (
          <></>
        )}
        {myContactsProfiles.length ? (
          <>
            <h3 className="contact-title text-light">Your contacts</h3>
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
                          data-bs-target="#exampleModal"
                          onClick={() => {
                            setUser(user);
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
                              user.avatar?.avatarUrl
                                ? user.avatar?.avatarUrl
                                : profileIcon
                            }
                            alt="profile avatar"
                          />
                        </div>
                        <div className="col-12 profiles-column">
                          <p className="location my-4 text-light">
                            {user.username}
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
                        {user.profile.firstname} {user.profile.lastname}
                      </h3>
                    ) : (
                      <h3>{user.username}</h3>
                    )}
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body contact-body px-5">
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
                    <div className="row">
                      <div className="col-12">
                        {user.profile?.story ? (
                          <>
                            <h4 className="about-title mt-5 mb-4">About</h4>{" "}
                            <p className="p-story mt-5 mb-4">
                              {user.profile.story}
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
                          {user.profile ? (
                            <div className="p-about mt-5 mb-4">
                              <p>Teacher(TMI)</p>
                              <p>
                                Has been meditating for {user.profile.years}{" "}
                                years
                              </p>
                              <p>
                                Currently working on stage {user.profile.stage}
                              </p>
                            </div>
                          ) : (
                            <></>
                          )}
                          <div className="p-about mt-5 mb-4">
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
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <div className="row contact-footer">
                      <div className="col-8 friends-since m-0">
                        <p className="friends-since text-primary">
                          Friends since: {friendsDate}
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
