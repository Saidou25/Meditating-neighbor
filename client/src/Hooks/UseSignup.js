import { useState, useEffect, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const useSignupHook = (setHooksDataValues) => {
  const [addUser] = useMutation(ADD_USER);
  const [signupErrorMessage, setSignupErrorMessage] = useState("");
  const [signupDataTemplate, setSignupDataTemplate] = useState("");
  const [signupMessage, setSignupMessage] = useState("");

  const handleFormSubmit = useCallback(async () => {
    if (setHooksDataValues) {
      const lowerCaseEmail = setHooksDataValues.signupEmail.toLowerCase();
      try {
        const { data } = await addUser({
          variables: {
            username: setHooksDataValues.Username,
            password: setHooksDataValues.signupPassword,
            email: lowerCaseEmail,
          },
        });
        if (data) {
          setSignupErrorMessage("");
          setSignupDataTemplate("cancel");
          setSignupMessage(`Welcome ${setHooksDataValues.Username}.`);
          return;
        }
      } catch (error) {
        setSignupErrorMessage(error.message);
      }
    }
  }, [setHooksDataValues, addUser]);

  const firebaseSignup = useCallback(async () => {
    if (setHooksDataValues) {
      const email = setHooksDataValues.signupEmail.toLowerCase();
      const password = setHooksDataValues.signupPassword;
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
        setSignupErrorMessage(error.message);
      }
    }
  }, [setHooksDataValues]);

  useEffect(() => {
    if (!setHooksDataValues.signupEmail) {
      setSignupErrorMessage("");
    } else {
      firebaseSignup();
      handleFormSubmit();
    }
  }, [firebaseSignup, handleFormSubmit, setHooksDataValues]);

  return { signupMessage, signupDataTemplate, signupErrorMessage };
};
export default useSignupHook;
