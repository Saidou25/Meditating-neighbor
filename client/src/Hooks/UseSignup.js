import { useState, useEffect, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const useSignupHook = (hooksDataValues) => {
  const [addUser] = useMutation(ADD_USER);
  const [signupErrorMessage, setSignupErrorMessage] = useState("");
  const [signupDataTemplate, setSignupDataTemplate] = useState("");
  const [signupMessage, setSignupMessage] = useState("");

  const handleFormSubmit = useCallback(async () => {
    if (hooksDataValues) {
      const lowerCaseEmail = hooksDataValues.signupEmail.toLowerCase();
      try {
        const { data } = await addUser({
          variables: {
            username: hooksDataValues.Username,
            password: hooksDataValues.signupPassword,
            email: lowerCaseEmail,
          },
        });
        if (data) {
          setSignupErrorMessage("");
          setSignupDataTemplate("cancel");
          setSignupMessage(`Welcome ${hooksDataValues.Username}.`);
          return;
        }
      } catch (error) {
        setSignupErrorMessage("Credentials not available.");
      }
    }
  }, [hooksDataValues, addUser]);

  const firebaseSignup = useCallback(async () => {
    if (hooksDataValues) {
      const email = hooksDataValues.signupEmail.toLowerCase();
      const password = hooksDataValues.signupPassword;
      try {
        const { data } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (data) {
          setSignupErrorMessage("");
        }
      } catch (error) {
        setSignupErrorMessage("Credentials already in use.");
      }
    }
  }, [hooksDataValues]);

  useEffect(() => {
    if (!hooksDataValues.signupEmail) {
      setSignupErrorMessage("");
    } else {
      firebaseSignup();
      handleFormSubmit();
    }
  }, [firebaseSignup, handleFormSubmit, hooksDataValues]);

  return { signupMessage, signupDataTemplate, signupErrorMessage };
};
export default useSignupHook;
