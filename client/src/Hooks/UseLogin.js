import { useState, useEffect, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Auth from "../utils/auth";

const useLogin = (loginData) => {
  // const [loginDatatemplate, setLoginDatatemplate] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [login] = useMutation(LOGIN_USER);

//  onAuthStateChanged(auth, (user) => {
//    console.log("there is a user", user?.uid);
//     if (user) {
//       console.log("there is a user", user?.uid);
//     } else {
//       console.log("no user found");
//     }
//   });
  // Handles gql login.
  const handleFormSubmit = useCallback(async () => {
    if (loginData) {
      const lowerCaseEmail = loginData.loginEmail.toLowerCase();
      try {
        const { data } = await login({
          variables: { email: lowerCaseEmail, password: loginData.password },
        });
        if (data) {
          console.log("gql success logingin");
          setLoginErrorMessage("");
          // setLoginDatatemplate("cancel");
          setLoginMessage("Login success.");
          Auth.login(data.login.token);
        }
      } catch (error) {
        setLoginErrorMessage("Invalid login credentials from gql.");
      }
    }
  }, [loginData, login]);

  // Handles firebase login.
  const firebaseLogin = useCallback(async () => {
    if (!loginData.loginEmail) {
      setLoginErrorMessage("");
      return;
    }
    const lowerCaseEmail = loginData.loginEmail.toLowerCase();
    const password = loginData.password;
    if (password && lowerCaseEmail) {
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          lowerCaseEmail,
          password
        );
        if (user) {
          console.log("firebase login success");
          setLoginErrorMessage("");
          setLoginMessage("Login success.");
          handleFormSubmit();
        }
      } catch (error) {
        console.log("Invalid login credentials from firebase.");
      }
    }
  }, [loginData, handleFormSubmit]);

  useEffect(() => {
    if (!loginData?.loginEmail) {
      setLoginErrorMessage("");
    } else {
      firebaseLogin();
      // handleFormSubmit();
    }
  }, [handleFormSubmit, loginData, firebaseLogin]);

  return { loginMessage, loginErrorMessage };
};
export default useLogin;
