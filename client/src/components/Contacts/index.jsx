import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USERS, QUERY_CONTACTS } from "../../utils/queries";
import Navbar from "../Navbar";
import Footer from "../Footer";
import profileIcon from "../../assets/images/profileicon.png";
import "./index.css";

const Contacts = () => {
  const [myContactsProfiles, setMyContactsProfiles] = useState([]);

  const { data: meData } = useQuery(QUERY_ME);
  const { data } = useQuery(QUERY_USERS);
  const { data: contactsData } = useQuery(QUERY_CONTACTS);
  
  useEffect(() => {
    if (data && contactsData && meData) {
      const me = meData?.me || [];
      const users = data?.users || [];
      const contacts = me?.contacts || [];
      const allMyContactsProfiles = [];
      for (let contact of contacts) {
        const contactsProfiles = users.filter(
          (user) => user._id === contact.friendId
        );
        allMyContactsProfiles.push(contactsProfiles[0]);
        console.log(allMyContactsProfiles);
        setMyContactsProfiles(allMyContactsProfiles);
      }
    }
  }, [data, contactsData, meData]);

  return (
    <>
      <Navbar />
      <div className="container-fluid contacts bg-primary">
        {myContactsProfiles.length ? (
          <h3 className="contact-title text-light">Your contacts</h3>
        ) : (
          <></>
        )}
        {myContactsProfiles.length &&
          myContactsProfiles.map((user) => (
            <div key={user._id} className="row">
              <div className="col-2 d-flex justify-content-center mt-3 mb-3">
                <img
                  className="response-avatar"
                  src={
                    user.avatar.avatarUrl ? user.avatar.avatarUrl : profileIcon
                  }
                  alt="profile avatar"
                />
              </div>
              <div className="col-6 d-flex align-items-center mt-3 mb-3">
                <p className="contact-p text-light m-0">
                  You are now friend with {user.username}
                </p>
              </div>
              <div className="col-4"></div>
            </div>
          ))}
      </div>
      <Footer />
    </>
  );
};
export default Contacts;
