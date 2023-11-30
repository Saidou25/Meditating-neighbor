import { useState, useEffect, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROFILE } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import { useNavigate } from "react-router-dom";

const useAddProfile = (addProfileHookData) => {
    const navigate = useNavigate();
  const [addProfileErrorMessage, setAddProfileErrorMessage] = useState("");
  const [addProfileMessage, setAddProfileMessage] = useState("");

  const [addProfile] = useMutation(ADD_PROFILE, {
    update(cache, { data: { addProfile } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, profile: { ...me.profile, ...addProfile } } },
        });
      } catch (e) {
        console.error(e);
      }
      console.log("Profile successfully added to the cache");
    },
  });

  const handleFormSubmit = useCallback(async () => {
    try {
      const { data } = await addProfile({
        variables: { ...addProfileHookData },
      });
      if (data) {
        console.log("profile added");
      }
    } catch (error) {
      setAddProfileErrorMessage(error);
      return;
    }
    // Resetting all states
    setAddProfileMessage("Your profile has been created");
    setAddProfileErrorMessage("");
     setTimeout(() => {
        setAddProfileMessage("");
      navigate("/Profile");
    }, 3000);
  }, [addProfileHookData, addProfile, navigate]);

  useEffect(() => {
    if (!addProfileHookData) {
      return;
    } else {
      setAddProfileErrorMessage("");
      handleFormSubmit();
    }
  }, [handleFormSubmit, addProfileHookData]);

  return { addProfileMessage, addProfileErrorMessage };
};
export default useAddProfile;
