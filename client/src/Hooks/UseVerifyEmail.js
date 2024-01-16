import { useState, useEffect, useCallback } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./../firebase";

const useVerifyEmail = (verifyEmailData) => {

  const [verifyEmailMessage, setVerifyEmailMessage] = useState("");
  const [verifyEmailErrorMessage, setVerifyEmailErrorMessage] = useState("");

  // Sending a reset password link to user using firebase(sendPasswordResetEmail) documentation.
  const firebaseEmailVerify = useCallback(async () => {
    try {
      await sendPasswordResetEmail(auth, verifyEmailData.verifyEmail);
    } catch (error) {
      setVerifyEmailErrorMessage(error.message);
      return;
    }
    setVerifyEmailMessage(`Email ${verifyEmailData.verifyEmail} verified.`);
    setVerifyEmailErrorMessage("");
    alert("Email verification sent! Please check your email.");
  }, [verifyEmailData]);

  useEffect(() => {
    if (!verifyEmailData.verifyEmail) {
      setVerifyEmailErrorMessage("");
    } else {
      firebaseEmailVerify();
    }
  }, [firebaseEmailVerify, verifyEmailData]);

  return {
    verifyEmailMessage,
    verifyEmailErrorMessage,
  };
};
export default useVerifyEmail;
