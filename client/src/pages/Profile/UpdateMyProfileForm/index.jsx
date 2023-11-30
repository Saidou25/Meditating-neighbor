import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import useMyInfoHook from "../../../Hooks/UseMyInfo";
import useUpdateProfile from "../../../Hooks/UseUpdateProfile";
import ProfileFormReuse from "../../../components/ProfileFormReuse";
import Auth from "../../../utils/auth";
import Success from "../../../components/Success";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

import "./index.css";

const UpdateMyProfileForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // getting all initial values from useLocation().
  const myProfile = location.state.myProfile;
  const profileId = myProfile._id;

  const [confirm, setConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [updateProfileHookData, setUpdateProfileHookData] = useState("");
  const [updateMeditatorTemplate, setUpdateMeditatorTemplate] = useState({
    title: "",
    fields: [],
  });
  const [updateTeacherTemplate, setUpdateTeacherTemplate] = useState({
    title: "",
    fields: [],
  });
  const { me } = useMyInfoHook();
  const { updateProfileMessage, updateProfileErrorMessage } = useUpdateProfile(
    updateProfileHookData
  );

  const doMeditatorTemplate = useCallback(() => {
    let fieldsArr = [];
    for (let field in me.profile) {
      if (me.profile[field] === "meditator") {
        let fieldObj = {
          name: "meditator",
          type: "radio",
          value: "meditator",
        };
        fieldsArr.push(fieldObj);
        let fieldObj1 = {
          name: "teacher",
          type: "radio",
          value: "",
        };
        fieldsArr.push(fieldObj1);
      }
      if (field === "years") {
        let fieldObj = {
          name: "years",
          type: "text",
          placeholder: "number of years meditating...",
          value: me.profile[field],
        };
        fieldsArr.push(fieldObj);
      }
      if (field === "stage") {
        let fieldObj1 = {
          name: "stage",
          type: "text",
          value: me.profile[field],
          placeholder: "stage you are currently working on...",
        };
        fieldsArr.push(fieldObj1);
      }
      setUpdateMeditatorTemplate({
        title: "Update your meditator's profile",
        fields: fieldsArr,
      });
    }
  }, [me]);

  const doTeacherTemplate = useCallback(() => {
    let fieldsArr = [];
    for (let field in me.profile) {
      if (me.profile[field] === "teacher") {
        let fieldObj1 = {
          name: "meditator",
          type: "radio",
          value: "",
        };
        fieldsArr.push(fieldObj1);
        let fieldObj = {
          name: "teacher",
          type: "radio",
          value: "teacher",
        };
        fieldsArr.push(fieldObj);
      }
      if (field === "years") {
        let fieldObj = {
          name: "years",
          type: "text",
          placeholder: "number of years meditating...",
          value: me.profile[field],
        };
        fieldsArr.push(fieldObj);
      }
      if (field === "firstname") {
        let fieldObj = {
          name: "firstname",
          type: "text",
          placeholder: " enter first name...",
          value: me.profile[field] ? me.profile[field] : "",
        };
        fieldsArr.push(fieldObj);
      }
      if (field === "lastname") {
        let fieldObj = {
          name: "lastname",
          type: "text",
          placeholder: "enter last name...",
          value: me.profile[field] ? me.profile[field] : "",
        };
        fieldsArr.push(fieldObj);
      }
      if (field === "story") {
        let fieldObj = {
          name: "story",
          type: "text",
          placeholder: "tell us about you...",
          value: me.profile[field] ? me.profile[field] : "",
        };
        fieldsArr.push(fieldObj);
      }
      setUpdateTeacherTemplate({
        title: "Update your teacher's profile",
        fields: fieldsArr,
      });
    }
  }, [me]);

  const getFromChild = (formState) => {
    switch (formState.teacher) {
      case "meditator":
        if (formState.teacher === "meditator") {
          // If no changes have been made then no need to perform updateProfile mutation, let's just let the user know and redirect to Profile.
          if (
            (JSON.stringify(myProfile) === JSON.stringify(formState)) ===
            true
          ) {
            setMessage("You haven't made any changes to your profile...");
            setConfirm(true);
            setTimeout(() => {
              navigate("/Profile");
              setConfirm(false);
            }, 3000);
            return;
          }
        }
        break;
      case "teacher":
        if (formState.teacher === "teacher") {
          // Comparing myProfile from saved data to new data sent from child component "profileFormReuse" as formState.
          //  If no changes have been made then no need to perform updateProfile mutation, let's just let the user know and redirect to Profile.
          if (
            (JSON.stringify(myProfile) === JSON.stringify(formState)) ===
            true
          ) {
            setMessage("You haven't made any changes to your profile...");
            setConfirm(true);
            setTimeout(() => {
              navigate("/Profile");
              setConfirm(false);
            }, 3000);
            return;
          }
        }
        break;
      default:
        setMessage("");
    }

    // activating "useUpdateProfile" by changing the state of "setUpdateProfileHookData".
    if (formState && me) {
      setUpdateProfileHookData({
        ...formState,
        username: me.username,
        id: profileId,
      });
    }
  };

  useEffect(() => {
    // if there already is a "meditator" or "teacher" profile we use the data to build a "template", using "do...Template",
    // which will be send to child component's form in order to be dynamiclly rendered.
    if (me.profile?.teacher === "meditator") {
      doMeditatorTemplate();
    }
    if (me.profile?.teacher === "teacher") {
      doTeacherTemplate();
    }
    // When "updateProfile" mutation is successfully completed "useUpdateProfile" hook returns a
    // "updateProfileMessage" which we use to trigger "Success" component and set the message to
    // be displayed in it.
    if (updateProfileMessage) {
      setConfirm(true);
      setMessage(updateProfileMessage);
    }
  }, [me, updateProfileMessage, doMeditatorTemplate, doTeacherTemplate]);

  if (!Auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }

  if (confirm === true) {
    return <Success message={message} />;
  }
  return (
    <>
      <Navbar />
      <ProfileFormReuse
        myProfile={myProfile}
        updateProfileMessage={updateProfileMessage}
        updateProfileErrorMessage={updateProfileErrorMessage}
        updateMeditatorTemplate={updateMeditatorTemplate}
        updateTeacherTemplate={updateTeacherTemplate}
        getFromChild={getFromChild}
      />
      <Footer />
    </>
  );
};
export default UpdateMyProfileForm;
