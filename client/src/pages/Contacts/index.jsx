import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Auth from "../../utils/auth";
import useMyContacts from "../../Hooks/UseMyContacts";
import Notifications from "./Notifications";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useMyRequests from "../../Hooks/UseMyRequests";
import MyContacts from "./MyContacts";
import NotificationsDisplay from "./Notifications/NotificationsDisplay";
import "./index.css";

const Contacts = () => {
  const [requestingUsersProfiles, setRequestingUsersProfiles] = useState([]);
  const [requestedUsersProfiles, setRequestedUsersProfiles] = useState([]);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  // importing profiles of users within my contacts from hooks.
  const { myContactsProfiles } = useMyContacts();
  const { usersIncomingRequestProfiles, myOutgoingRequestUserProfiles } =
    useMyRequests();

  const acceptRequest = (user) => {
    setUser(user);
  };

  const cancelRequest = (user) => {
    setUser({ ...user, type: user.type });
  };

  const handleLoading = (loadingDeleteRequest) => {
    setLoading(loadingDeleteRequest);
  };

  // making sure we have all data needed uppon page load and that these datas stay monitored during user's operations in this page
  useEffect(() => {
    if (usersIncomingRequestProfiles.length) {
      setRequestingUsersProfiles(usersIncomingRequestProfiles);
    } else {
      setRequestingUsersProfiles([]);
    }
  }, [usersIncomingRequestProfiles]);

  // making sure we have all data needed uppon page load and that these datas stay monitored during user's operations in this page
  useEffect(() => {
    if (myOutgoingRequestUserProfiles.length) {
      setRequestedUsersProfiles(myOutgoingRequestUserProfiles);
    } else {
      setRequestedUsersProfiles([]);
    }
  }, [myOutgoingRequestUserProfiles]);

  if (!Auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid contacts-container bg-primary">
        <Notifications user={user} handleLoading={handleLoading}>
          <NotificationsDisplay
            data={requestingUsersProfiles}
            type="requestingUser"
            acceptRequest={acceptRequest}
            cancelRequest={cancelRequest}
            loading={loading}
          />
          <NotificationsDisplay
            data={requestedUsersProfiles}
            type="meRequesting"
            cancelRequest={cancelRequest}
            loading={loading}
          />
        </Notifications>
        <MyContacts myContactsProfiles={myContactsProfiles} />
      </div>
      <Footer />
    </>
  );
};
export default Contacts;
