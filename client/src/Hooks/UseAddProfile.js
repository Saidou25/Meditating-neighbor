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
    },
  });

  const handleFormSubmit = useCallback(async () => {
    setAddProfileErrorMessage("");
    try {
      const { data } = await addProfile({
        variables: { ...addProfileHookData },
      });
      if (data) {
        setAddProfileMessage("Your profile has been created");
      }
    } catch (error) {
      setAddProfileErrorMessage(error);
      return;
    }
    // Resetting all states
    setAddProfileErrorMessage("");
    setTimeout(() => {
      setAddProfileMessage("");
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
