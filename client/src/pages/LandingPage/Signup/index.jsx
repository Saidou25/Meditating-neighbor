import React, { useState, useEffect } from "react";
import { signupTemplate } from "../../../data/templatesData";
import { useNavigate } from "react-router-dom";
import useSignup from "../../../Hooks/UseSignup";
import SignupVerifyReset from "../SignupVerifyReset";
import FormReuse from "../FormReuse";

const Signup = () => {
  const [signupData, setSignupData] = useState("");
  const [loading, setLoading] = useState(false);
  const [dynamicError, setDynamicError] = useState({
    message: "",
    fieldName: "",
  });

  const navigate = useNavigate();
  const { signupMessage, signupErrorMessage } = useSignup(signupData);

  const onSubmit = (values) => {
    setSignupData(values);
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
      setSignupData(values);
    }
  };

  useEffect(() => {
    if (signupMessage) {
      setLoading(false);
      navigate("/Login");
    }
  }, [signupMessage, navigate]);

  useEffect(() => {
    if (signupErrorMessage) {
      setLoading(false);
    }
  }, [signupErrorMessage]);

  return (
    <FormReuse
      template={signupTemplate}
      onSubmit={onSubmit}
      signupMessage={signupMessage}
      hookErrorMessage={signupErrorMessage}
      dynamicError={dynamicError}
      loading={loading}
    >
      <SignupVerifyReset />
    </FormReuse>
  );
};
export default Signup;
