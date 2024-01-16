import React from "react";
import { Navigate } from "react-router-dom";
// import { UserProvider } from "../../utils/userContext";
import Auth from "../../utils/auth";
import useMyContacts from "../../Hooks/UseMyContacts";
import useMyRequests from "../../Hooks/UseMyRequests";
import DeleteModal from "./DeleteModal";
import Avatar from "./ProfileCard/CardBody/Avatar";
import Footer from "../../components/Footer";
import ProfileText from "./ProfileText";
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
      <main
        className="container-fluid profile bg-primary"
        style={{ borderColor: "primary" }}
      >
        {/* <UserProvider> */}
          <ProfileText />
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
        {/* </UserProvider> */}
      </main>
      <Footer />
    </>
  );
};

export default Profile;
