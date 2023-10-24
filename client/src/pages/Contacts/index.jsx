import React, { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import Auth from "../../utils/auth";
import useMyContacts from "../../Hooks/UseMyContacts";
import Notifications from "../../components/Notifications";
import ModalReuse from "../../components/ModalReuse";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import profileIcon from "../../assets/images/profileicon.png";
import "./index.css";

const Contacts = () => {
  const [data, setData] = useState({ userInfo: "", date: "" });
  const [showModal, setShowModal] = useState(false);

  // importing profiles of users within my contacts from hooks.
  const { myContactsProfiles } = useMyContacts();
  // console.log('my contacts profiles', myContactsProfiles)

  if (!Auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <div
        className="container-fluid contacts bg-primary pb-5"
        style={{ minHeight: "100vh" }}
      >
        <Notifications />
        {myContactsProfiles.length ? (
          <>
            <h3 className="contact-title text-light">Your contacts</h3>
            <div className="row card-row">
              {myContactsProfiles &&
                myContactsProfiles.map((myContactProfile) => (
                  <div
                    key={myContactProfile.friend._id}
                    className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4"
                  >
                    <div className="card-body">
                      <div className="icon-container">
                        <button
                          className="btn btn-profile "
                          onClick={() => {
                            setData({
                              userInfo: myContactProfile.friend,
                              date: myContactProfile.date,
                            });
                            setShowModal(true);
                          }}
                        >
                          <FaEllipsisH className="icon" />
                        </button>
                      </div>
                      <div className="row profiles-row">
                        <div className="col-12 profiles-column">
                          <img
                            className="contact-picture"
                            // multiple ternary operator: if no avatar then default profileIcon, if i am soneone's contact or someone is my contact then avatarUrl or friendAvatarUrl is displayed
                            src={
                              myContactProfile.friend.avatar?.avatarUrl
                                ? myContactProfile.friend.avatar.avatarUrl
                                : profileIcon
                            }
                            alt="profile avatar"
                          />
                        </div>
                        <div className="col-12 profiles-column">
                          <p className="location my-4 text-light">
                            <>{myContactProfile.friend.username}</>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <></>
          )}
          {showModal && (
            <ModalReuse hideModal={setShowModal} data={data} />
          )}
      </div>
      <Footer />
    </>
  );
};
export default Contacts;
