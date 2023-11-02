import React, { useState } from "react";
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
import "./index.css";

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
  const { resetPasswordMessage } = useResetPassword(resetPasswordDataValues);
  const { signupMessage } = useSignup(signupDataValues);
  const { verifyEmailMessage } = useVerifyEmail(verifyEmailDataValues);

  const getFromChild = (data) => {
    if (data === "cancel") {
      setValidatedPassword("");
      setValidatedPassword1("");
      setValidatedPassword2("");
      setValidatedSignupPassword("");
      setTemplate(loginTemplate);
    }
    if (data === "reset") {
      setValidatedPassword("");
      setValidatedPassword1("");
      setValidatedPassword2("");
      setValidatedSignupPassword("");
      setTemplate(resetTemplate);
    }
    if (data === "verify") {
      setValidatedPassword("");
      setValidatedPassword1("");
      setValidatedPassword2("");
      setValidatedSignupPassword("");
      setTemplate(verifyTemplate);
    }
    if (data === "signup") {
      setValidatedPassword("");
      setValidatedPassword1("");
      setValidatedPassword2("");
      setValidatedSignupPassword("");
      setTemplate(signupTemplate);
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
          console.log("logedin gql");
          Auth.login(data.login.token);
        }
      } catch (error) {
        console.error(error.message);
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
        console.log("you are logedin in firebase :-)", user);
        handleFormSubmit(password, lowerCaseEmail);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const onSubmit = (values) => {
    console.log(values);
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
        console.log("not identical");
        setValidateIdentical("not identical");
        return;
      } else {
        console.log("doing it anyway");
        setValidateIdentical("");
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
        setSignupDataValues(values);
        getFromChild("cancel");
      }
    }
    if (template.title === "Verify your email") {
      setVerifyEmailDataValues(values);
      getFromChild("cancel");
    }
    if (template.title === "Login") {
      if (values.password.length < 6) {
        setValidatedPassword("Password must be 6 characters long minimun.");
        return;
      } else {
        setValidatedPassword("");
        firebaseLogin(values);
      }
    }
  };
  // if (loading) return <Spinner />;
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
      
    />
  );
};
export default Login;
