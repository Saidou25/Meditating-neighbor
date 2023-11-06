import { useState, useEffect, useCallback } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./../firebase";

const useVerifyEmail = (hooksDataValues) => {
  const [verifyEmailDdataTemplate, setVerifyEmailTemplate] = useState("");
  const [verifyEmailMessage, setVerifyEmailMessage] = useState("");
  const [verifyEmailErrorMessage, setVerifyEmailErrorMessage] = useState("");

  // Sending a reset password link to user using firebase(sendPasswordResetEmail) documentation.
  const firebaseEmailVerify = useCallback(async () => {
    try {
      await sendPasswordResetEmail(auth, hooksDataValues.verifyEmail);
      setVerifyEmailMessage(`Email ${hooksDataValues.verifyEmail} verified.`);
      setVerifyEmailTemplate("cancel");
    } catch (error) {
      setVerifyEmailErrorMessage(error.message);
    }
    if (verifyEmailMessage) {
      setVerifyEmailErrorMessage("");
      alert("Email verification sent! Please check your email.");
    }
  }, [hooksDataValues, verifyEmailMessage]);

  useEffect(() => {
    if (!hooksDataValues.verifyEmail) {
      setVerifyEmailErrorMessage("");
    } else {
      firebaseEmailVerify();
    }
  }, [firebaseEmailVerify, hooksDataValues]);

  return {
    verifyEmailMessage,
    verifyEmailDdataTemplate,
    verifyEmailErrorMessage,
  };
};
export default useVerifyEmail;
