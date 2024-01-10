import React from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { UserContext } from "../../utils/userContext";
import useMyContacts from "../../Hooks/UseMyContacts";
import useMyRequests from "../../Hooks/UseMyRequests";
import Auth from "../../utils/auth";
import DeleteModal from "./DeleteModal";
import Avatar from "./ProfileCard/CardBody/Avatar";
import Footer from "../../components/Footer";
import ProfileCard from "../Profile/ProfileCard";
import CardHeader from "./ProfileCard/CardHeader";
import CardFooter from "./ProfileCard/CardFooter";
import CardBody from "./ProfileCard/CardBody";
import Navbar from "../../components/Navbar";
// import Spinner from "../Spinner";
import "./index.css";

const Profile = () => {

  // import hooks to have data ready to go for profile display. This avoids doing and writing 6 queries in this page
  const { myContacts } = useMyContacts();
  const { myRequestsIds } = useMyRequests();

  const { data: meData } = useQuery(QUERY_ME);
  const me = meData?.me || [];

  // building a list of all user's contacts ids to be passed as props to delete modal for deleting user's account
  const myContactsIds = [];
  if (myContacts) {
    for (let contact of myContacts) {
      myContactsIds.push(contact._id);
    }
  }

  if (!Auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className="profile-nav">
        <Navbar />
      </div>
      <div
        className="container-fluid profile bg-primary"
        style={{ borderColor: "primary" }}
      >
        {(!me.profile || !me.avatar?.avatarUrl || !me.location) && (
          <p className="profile-warning text-light">
            Once you have successfully created your profile, uploaded your
            profile picture and saved your location from within the "locate"
            page, your profile will be visible to everyone.
          </p>
        )}
        <UserContext.Provider value={me}>
          <ProfileCard>
            <CardHeader />
            <CardBody>
              <Avatar />
            </CardBody>
            <CardFooter />
          </ProfileCard>
          <DeleteModal
            myContactsIds={myContactsIds}
            myRequestsIds={myRequestsIds}
          />
        </UserContext.Provider>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
