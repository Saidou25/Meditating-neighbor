import { useState, useEffect, useCallback } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./../firebase";

const useVerifyEmail = (verifyEmailDataValues) => {
  const [verifyEmailDdataTemplate, setVerifyEmailTemplate] = useState("");
  const [verifyEmailMessage, setVerifyEmailMessage] = useState("");

  // Sending a reset password link to user using firebase(sendPasswordResetEmail) documentation.
  const firebaseEmailVerify = useCallback(async () => {
   
    try {
      await sendPasswordResetEmail(auth, verifyEmailDataValues.verifyEmail);
      setVerifyEmailMessage(`Email ${verifyEmailDataValues.verifyEmail} verified.`);
      setVerifyEmailTemplate("cancel");
    } catch (error) {
      console.log(error.message);
    }
    if (verifyEmailMessage) {
      alert("Email verification sent! Please check your email.");
    }
  }, [verifyEmailDataValues, verifyEmailMessage]);

  useEffect(() => {
    if (verifyEmailDataValues) {

      firebaseEmailVerify();
    }
  }, [firebaseEmailVerify, verifyEmailDataValues]);

  return { verifyEmailMessage, verifyEmailDdataTemplate };
};
export default useVerifyEmail;
