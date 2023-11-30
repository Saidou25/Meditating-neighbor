import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ProfileFormReuse from "../../../components/ProfileFormReuse";
import Auth from "../../../utils/auth";
import useAddProfile from "../../../Hooks/UseAddProfile";
import useMyInfoHook from "../../../Hooks/UseMyInfo";
import Success from "../../../components/Success";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import "./index.css";

const ProfileForm = () => {
  const [profileHookData, setAddProfileHookData] = useState("");
  const [newPrfofile, setNewProfile] = useState(false);
  const [message, setMessage] = useState("");
  const { me } = useMyInfoHook();
  const { addProfileMessage, addProfileErrorMessage } = useAddProfile(profileHookData);

  useEffect(() => {
    if (addProfileMessage) {
      setMessage("Your profile has been created");
      // Resetting states
      setNewProfile("");
      setAddProfileHookData("");
    }
    if (me.profile === null) {
      setNewProfile(true)
    }
  }, [addProfileMessage, me]);
 
   const getFromChild = (formState) => {
    if (formState && me) {
      setAddProfileHookData({ ...formState, username: me.username });
    }
  };

  if (!Auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }

  if (message) {
    return <Success message={"Your profile has been created"} />;
  }
  return (
    <>
      <Navbar />
      <ProfileFormReuse
        getFromChild={getFromChild}
        newProfile={newPrfofile}
        addProfileMessage={addProfileMessage}
        addProfileErrorMessage={addProfileErrorMessage}
      />
      <Footer />
    </>
  );
};
export default ProfileForm;
