import React, { useState, useEffect } from "react";
import { loginTemplate } from "../../../data/templatesData";
import FormReuse from "../FormReuse";
import useLogin from "../../../Hooks/UseLogin";
import SignupVerifyReset from "../SignupVerifyReset";
// import Spinner from "../../components/Spinner";

//  In this component we are handleling login, signup, verifyEmail and signup. This components are
// displayed thru a dynamically generated form called "formReuse".
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState("");
  const [dynamicError, setDynamicError] = useState({
    message: "",
    fieldName: "",
  });
  const { loginMessage, loginErrorMessage } = useLogin(loginData);

  // Handles values captured in the reusable "reusableForm" component.
  const onSubmit = (values) => {
    if (values) {
      if (values?.password.length < 6) {
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
        setLoading(true);
        setLoginData(values);
      }
    }
  };

  useEffect(() => {
    if (loginMessage) {
      setLoading(false);
    }
  }, [loginMessage]);

  useEffect(() => {
    if (loginErrorMessage) {
      setLoading(false);
    }
  }, [loginErrorMessage]);

  return (
    <FormReuse
      template={loginTemplate}
      onSubmit={onSubmit}
      hookErrorMessage={loginErrorMessage}
      dynamicError={dynamicError}
      loading={loading}
    >
      <SignupVerifyReset />
    </FormReuse>
  );
};
export default Login;
