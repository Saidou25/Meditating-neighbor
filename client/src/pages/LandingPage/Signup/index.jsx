import React, { useState, useEffect } from "react";
import { signupTemplate } from "../../../data/templatesData";
import useSignup from "../../../Hooks/UseSignup";
import SignupVerifyReset from "../SignupVerifyReset";
import FormReuse from "../FormReuse";

const Signup = ({ handleCancelForm, handleChooseForm }) => {
  const [signupData, setSignupData] = useState("");
  const [loading, setLoading] = useState(false);
  const [dynamicError, setDynamicError] = useState({
    message: "",
    fieldName: "",
  });

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
    if (signupMessage || signupErrorMessage) {
      setLoading(false);
    }
  }, [signupMessage, signupErrorMessage]);

  return (
    <FormReuse
      template={signupTemplate}
      onSubmit={onSubmit}
      handleCancelForm={handleCancelForm}
      signupMessage={signupMessage}
      hookErrorMessage={signupErrorMessage}
      dynamicError={dynamicError}
      loading={loading}
    >
      <SignupVerifyReset handleChooseForm={handleChooseForm} />
    </FormReuse>
  );
};
export default Signup;
