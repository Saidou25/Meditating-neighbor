import { useState, useEffect, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const useSignupHook = (signupData) => {
  const [addUser] = useMutation(ADD_USER);
  const [signupErrorMessage, setSignupErrorMessage] = useState("");
  // const [signupDataTemplate, setSignupDataTemplate] = useState("");
  const [signupMessage, setSignupMessage] = useState("");

  const handleFormSubmit = useCallback(async () => {
    if (signupData) {
      const lowerCaseEmail = signupData.signupEmail.toLowerCase();
      try {
        const { data } = await addUser({
          variables: {
            username: signupData.Username,
            password: signupData.signupPassword,
            email: lowerCaseEmail,
          },
        });
        if (data) {
          setSignupErrorMessage("");
          // setSignupDataTemplate("cancel");
          setSignupMessage(`Welcome ${signupData.Username}.`);
          return;
        }
      } catch (error) {
        setSignupErrorMessage("Credentials not available.");
      }
    }
  }, [signupData, addUser]);

  const firebaseSignup = useCallback(async () => {
    if (signupData) {
      const email = signupData.signupEmail.toLowerCase();
      const password = signupData.signupPassword;
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
  }, [signupData]);

  useEffect(() => {
    console.log(signupData)
    if (!signupData.signupEmail) {
      setSignupErrorMessage("");
    } else {
      firebaseSignup();
      handleFormSubmit();
    }
  }, [firebaseSignup, handleFormSubmit, signupData]);

  return { signupMessage, signupErrorMessage };
};
export default useSignupHook;
