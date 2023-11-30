import { useState, useEffect, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "../utils/mutations";
import { QUERY_PROFILES } from "../utils/queries";
import { useNavigate } from "react-router-dom";

const useAddProfile = (updateProfileHookData) => {
    const navigate = useNavigate();
  const [updateProfileErrorMessage, setUpdateProfileErrorMessage] = useState("");
  const [updateProfileMessage, setUpdateProfileMessage] = useState("");

   // update cache by refetchingQueries. Fast, efficient and very little code.
  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    variables: { id: updateProfileHookData.id },
    refetchQueries: [{ query: QUERY_PROFILES }],
  });

  const handleFormSubmit = useCallback(async () => {
    try {
      const { data } = await updateProfile({
        variables: { ...updateProfileHookData },
      });
      if (data) {
        console.log("profile added");
      }
    } catch (error) {
      setUpdateProfileErrorMessage(error);
      return;
    }
    setUpdateProfileMessage("Your profile has been updated");
    setTimeout(() => {
      // Resetting all states
      setUpdateProfileErrorMessage("");
      setUpdateProfileMessage("");
      navigate("/Profile");
    }, 3000);
  }, [updateProfileHookData, updateProfile, navigate]);

  useEffect(() => {
    if (!updateProfileHookData) {
      return;
    } else {
      console.log(updateProfileHookData)
      setUpdateProfileErrorMessage("");
      handleFormSubmit();
    }
  }, [handleFormSubmit, updateProfileHookData]);

  return { updateProfileMessage, updateProfileErrorMessage };
};
export default useAddProfile;
