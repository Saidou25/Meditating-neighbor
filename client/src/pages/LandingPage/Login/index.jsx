import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../../utils/mutations";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import {
  loginTemplate,
  resetTemplate,
  verifyTemplate,
  signupTemplate,
} from "../../../data/templatesData";
import FormReuse from "../../../components/FormReuse";
import useSignup from "../../../Hooks/UseSignup";
import useVerifyEmail from "../../../Hooks/UseVerifyEmail";
import useResetPassword from "../../../Hooks/UseResetPassword";
// import Spinner from "../../components/Spinner";
import Auth from "../../../utils/auth";

//  In this component we are handleling login, signup, verifyEmail and signup. This components are
// displayed thru a dynamically generated form called "formReuse".
const Login = () => {
  const [dynamicError, setDynamicError] = useState({
    message: "",
    fieldName: "",
  });
  const [hooksDataValues, setHooksDataValues] = useState("");
  const [template, setTemplate] = useState(loginTemplate);
  const [loading, setLoading] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const { resetPasswordMessage, resetErrorMessage } =
    useResetPassword(hooksDataValues);
  const { signupMessage, signupErrorMessage } = useSignup(hooksDataValues);
  const { verifyEmailMessage, verifyEmailErrorMessage } =
    useVerifyEmail(hooksDataValues);

  const [login] = useMutation(LOGIN_USER);

  // getFrmonChild handles the forms rendering from the "submit, verify, login and reset" from the bottom of the login card. data
  // is provided by the reusable form component.
  const getFromChild = (data) => {
    switch (data) {
      case "cancel":
        setDynamicError({
          message: "",
          fieldName: "",
        });
        setTemplate(loginTemplate);
        setLoading(false);
        break;
      case "reset":
        setDynamicError({
          message: "",
          fieldName: "",
        });
        setTemplate(resetTemplate);
        setLoading(false);
        break;
      case "veify":
        setDynamicError({
          message: "",
          fieldName: "",
        });
        setTemplate(verifyTemplate);
        setLoading(false);
        break;
      case "signup":
        setDynamicError({
          message: "",
          fieldName: "",
        });
        setTemplate(signupTemplate);
        setLoading(false);
        break;
      default:
        setTemplate(loginTemplate);
    }
  };
  
  // Handles gql login.
  const handleFormSubmit = async (password, lowerCaseEmail) => {
    if (password && lowerCaseEmail) {
      try {
        const { data } = await login({
          variables: { email: lowerCaseEmail, password: password },
        });
        if (data) {
          setLoginErrorMessage("");
          console.log("logedin gql");
          Auth.login(data.login.token);
        }
      } catch (error) {
        setLoginErrorMessage(error.message);
        setLoading(false);
      }
    }
  };
  // Handles firebase login.
  const firebaseLogin = async (values) => {
    if (!values.loginEmail) {
      setLoginErrorMessage("");
      return;
    }
    const lowerCaseEmail = values.loginEmail.toLowerCase();
    const password = values.password;
    if (password && lowerCaseEmail) {
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          lowerCaseEmail,
          password
        );
        if (user) {
          setLoginErrorMessage("");
          console.log("you are logedin in firebase :-)", user);
          handleFormSubmit(password, lowerCaseEmail);
        }
      } catch (error) {
        setLoginErrorMessage(error.message);
        setLoading(false);
      }
    }
  };
  // Handles values captured in the reusable "reusableForm" component.
  const onSubmit = (values) => {
    if (template.title === "Reset your password") {
      if (values.password1.length < 6) {
        setDynamicError({
          message: "Password must be 6 characters long minimun.",
          fieldName: "password1",
        });
        return;
      } else {
        setDynamicError({
          message: "",
          fieldName: "",
        });
      }
      if (values.password2.length < 6) {
        setDynamicError({
          message: "Password must be 6 characters long minimun.",
          fieldName: "password2",
        });
        return;
      } else {
        setDynamicError({
          message: "",
          fieldName: "",
        });
      }
      if (values.password1 !== values.password2) {
        setDynamicError({
          message: "Passwords need to be identical.",
          fieldName: "password2",
        });
        return;
      } else {
        setDynamicError({
          message: "",
          fieldName: "",
        });
        setLoading(true);
        setHooksDataValues("");
        firebaseLogin(values);
        setHooksDataValues(values);
        getFromChild("cancel");
      }
    }
    if (template.title === "Signup") {
      if (values.signupPassword.length < 6) {
        setDynamicError({
          message: "Password must be 6 characters long minimun...",
          fieldName: "signupPassword",
        });
        return;
      } else {
        setDynamicError({
          message: "",
          fieldName: "",
        });
        setLoading(true);
        firebaseLogin(values);
        setHooksDataValues(values);
        getFromChild("cancel");
      }
    }
    if (template.title === "Verify your email") {
      setLoading(true);
      firebaseLogin(values);
      setHooksDataValues(values);
      getFromChild("cancel");
    }
    if (template.title === "Login") {
      if (values.password.length < 6) {
        setDynamicError({
          message: "Password must be 6 characters long minimun.",
          fieldName: "password",
        });
        return;
      } else {
        setDynamicError({
          message: "",
          fieldName: "",
        });
      }
      setLoading(true);
      setHooksDataValues("");
      firebaseLogin(values);
    }
  };
  useEffect(() => {
    if (
      resetPasswordMessage ||
      signupMessage ||
      verifyEmailMessage ||
      verifyEmailErrorMessage ||
      signupErrorMessage ||
      resetErrorMessage ||
      loginErrorMessage
    ) {
      setLoading(false);
      setDynamicError({
        message: "",
        fieldName: "",
      });
    }
  }, [
    resetPasswordMessage,
    signupMessage,
    verifyEmailMessage,
    verifyEmailErrorMessage,
    signupErrorMessage,
    resetErrorMessage,
    loginErrorMessage,
  ]);
  return (
    <FormReuse
      template={template}
      getFromChild={getFromChild}
      onSubmit={onSubmit}
      resetPasswordMessage={resetPasswordMessage}
      signupMessage={signupMessage}
      verifyEmailMessage={verifyEmailMessage}
      dynamicError={dynamicError}
      loading={loading}
      verifyEmailErrorMessage={verifyEmailErrorMessage}
      signupErrorMessage={signupErrorMessage}
      resetErrorMessage={resetErrorMessage}
      loginErrorMessage={loginErrorMessage}
    />
  );
};
export default Login;
