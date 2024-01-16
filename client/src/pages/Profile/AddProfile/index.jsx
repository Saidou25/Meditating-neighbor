import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import ProfileFormReuse from "../ProfileFormReuse";
import Auth from "../../../utils/auth";
import useAddProfile from "../../../Hooks/UseAddProfile";
// import useMyInfoHook from "../../../Hooks/UseMyInfo";
import { useUser } from "../../../contexts/userContext";
import Success from "../../../components/Success";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import "./index.css";

const AddProfile = () => {
  const [addProfileHookData, setAddProfileHookData] = useState("");
  const [newPrfofile, setNewProfile] = useState(false);
  const [message, setMessage] = useState("");
  const { me } = useUser();
  const { addProfileMessage, addProfileErrorMessage } =
    useAddProfile(addProfileHookData);

  useEffect(() => {
    if (addProfileMessage) {
      setMessage(addProfileMessage);

      // Resetting states
      setNewProfile("");
      setAddProfileHookData("");
    }
   
  }, [addProfileMessage]);
  
  useEffect(() => {
    if (me.profile === null) {
      setNewProfile(true);
    }
  }, [me])

  const getFromChild = (formState) => {
    if ("formState from profile form" && me) {
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
export default AddProfile;
