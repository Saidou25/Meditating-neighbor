import { useState, useEffect, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const useSignupHook = (signupDataValues) => {
  const [addUser] = useMutation(ADD_USER);
  const [signupErrorMessage, setSignupErrorMessage] = useState("");
  const [signupDataTemplate, setSignupDataTemplate] = useState("");
  const [signupMessage, setSignupMessage] = useState("");

  const handleFormSubmit = useCallback(async () => {
    if (signupDataValues) {
      const lowerCaseEmail = signupDataValues.signupEmail.toLowerCase();
      try {
        const { data } = await addUser({
          variables: {
            username: signupDataValues.Username,
            password: signupDataValues.signupPassword,
            email: lowerCaseEmail,
          },
        });
        if (data) {
          console.log(`Welcome ${signupDataValues.Username}.`);
          setSignupErrorMessage("");
          setSignupDataTemplate("cancel");
          setSignupMessage(`Welcome ${signupDataValues.Username}.`);
          return;
        }
      } catch (error) {
        setSignupErrorMessage(error.message);
      }
    }
  }, [signupDataValues, addUser]);

  const firebaseSignup = useCallback(async () => {
    if (signupDataValues) {
      const email = signupDataValues.signupEmail.toLowerCase();
      const password = signupDataValues.signupPassword;
      try {
        const { data } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (data) {
          console.log("Firebase welcomes you");
          setSignupErrorMessage("");
        }
      } catch (error) {
        console.log("error");
        setSignupErrorMessage(error.message);
      }
    }
  }, [signupDataValues]);

  useEffect(() => {
    firebaseSignup();
    handleFormSubmit();
  }, [firebaseSignup, handleFormSubmit, signupDataValues]);

  return { signupMessage, signupDataTemplate, signupErrorMessage };
};
export default useSignupHook;
