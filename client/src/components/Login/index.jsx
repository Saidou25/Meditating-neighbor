import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import {
  loginTemplate,
  resetTemplate,
  verifyTemplate,
  signupTemplate,
} from "../../data/templatesData";
import FormReuse from "../../components/FormReuse";
import useSignup from "../../Hooks/UseSignup";
import useVerifyEmail from "../../Hooks/UseVerifyEmail";
import useResetPassword from "../../Hooks/UseResetPassword";
// import Spinner from "../../components/Spinner";
import Auth from "../../utils/auth";

const Login = () => {
  const [signupDataValues, setSignupDataValues] = useState("");
  const [verifyEmailDataValues, setVerifyEmailDataValues] = useState("");
  const [resetPasswordDataValues, setResetPasswordDataValues] = useState("");
  const [template, setTemplate] = useState(loginTemplate);
  const [validatedPassword, setValidatedPassword] = useState("");
  const [validatedPassword1, setValidatedPassword1] = useState("");
  const [validatedPassword2, setValidatedPassword2] = useState("");
  const [validatedSignupPassword, setValidatedSignupPassword] = useState("");
  const [validateIdentical, setValidateIdentical] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [clearErrorMessage, setClearErrorMessage] = useState(false);
  const { resetPasswordMessage, resetErrorMessage } = useResetPassword(
    resetPasswordDataValues
  );
  const { signupMessage, signupErrorMessage } = useSignup(signupDataValues);
  const { verifyEmailMessage, verifyEmailErrorMessage } = useVerifyEmail(
    verifyEmailDataValues
  );

  const getFromChild = (data) => {
    if (data === "cancel") {
      setValidatedPassword("");
      setValidatedPassword1("");
      setValidatedPassword2("");
      setValidatedSignupPassword("");
      setTemplate(loginTemplate);
      if (
        verifyEmailErrorMessage ||
        signupErrorMessage ||
        resetErrorMessage ||
        loginErrorMessage
      ) {
        setClearErrorMessage(true);
        setLoading(false);
      }
    }
    if (data === "reset") {
      setValidatedPassword("");
      setValidatedPassword1("");
      setValidatedPassword2("");
      setValidatedSignupPassword("");
      setTemplate(resetTemplate);
      if (
        verifyEmailErrorMessage ||
        signupErrorMessage ||
        resetErrorMessage ||
        loginErrorMessage
      ) {
        setClearErrorMessage(true);
        setLoading(false);
      }
    }
    if (data === "verify") {
      setValidatedPassword("");
      setValidatedPassword1("");
      setValidatedPassword2("");
      setValidatedSignupPassword("");
      setTemplate(verifyTemplate);
      if (
        verifyEmailErrorMessage ||
        signupErrorMessage ||
        resetErrorMessage ||
        loginErrorMessage
      ) {
        setClearErrorMessage(true);
        setLoading(false);
      }
    }
    if (data === "signup") {
      setValidatedPassword("");
      setValidatedPassword1("");
      setValidatedPassword2("");
      setValidatedSignupPassword("");
      setTemplate(signupTemplate);
      if (
        verifyEmailErrorMessage ||
        signupErrorMessage ||
        resetErrorMessage ||
        loginErrorMessage
      ) {
        setClearErrorMessage(true);
        setLoading(false);
      }
    }
  };
  const [login] = useMutation(LOGIN_USER);

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
  const firebaseLogin = async (values) => {
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

  const onSubmit = (values) => {
    if (template.title === "Reset your password") {
      if (values.password1.length < 6) {
        setValidatedPassword1("Password must be 6 characters long minimun.");
        return;
      } else {
        setValidatedPassword1("");
        setValidatedPassword2("");
      }
    }
    if (template.title === "Reset your password") {
      if (values.password2.length < 6) {
        setValidatedPassword2("Password must be 6 characters long minimun.");
        return;
      } else {
        setValidatedPassword1("");
        setValidatedPassword2("");
      }
    }
    if (template.title === "Reset your password") {
      if (values.password1 !== values.password2) {
        setValidateIdentical("not identical");
        return;
      } else {
        setValidateIdentical("");
        setLoading(true);
        setResetPasswordDataValues(values);
        getFromChild("cancel");
      }
    }
    if (template.title === "Signup") {
      if (values.signupPassword.length < 6) {
        setValidatedSignupPassword(
          "Password must be 6 characters long minimun."
        );
        return;
      } else {
        setValidatedSignupPassword("");
        setLoading(true);
        setSignupDataValues(values);
        getFromChild("cancel");
      }
    }
    if (template.title === "Verify your email") {
      setLoading(true);
      setVerifyEmailDataValues(values);
      getFromChild("cancel");
    }
    if (template.title === "Login") {
      if (values.password.length < 6) {
        setValidatedPassword("Password must be 6 characters long minimun.");
        return;
      } else {
        setValidatedPassword("");
      }
      setValidatedPassword("");
      setLoading(true);
      setClearErrorMessage(false);
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
      setClearErrorMessage(false);
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
      validatedPassword1={validatedPassword1}
      validatedPassword2={validatedPassword2}
      validatedPassword={validatedPassword}
      validatedSignupPassword={validatedSignupPassword}
      validateIdentical={validateIdentical}
      loading={loading}
      verifyEmailErrorMessage={verifyEmailErrorMessage}
      signupErrorMessage={signupErrorMessage}
      resetErrorMessage={resetErrorMessage}
      loginErrorMessage={loginErrorMessage}
      clearErrorMessage={clearErrorMessage}
    />
  );
};
export default Login;
