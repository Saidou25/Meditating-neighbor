import React, { useState, useEffect } from "react";
import { verifyEmailTemplate } from "../../../data/templatesData";
import useVerifyEmail from "../../../Hooks/UseVerifyEmail";
import FormReuse from "../FormReuse";
import SignupVerifyReset from "../SignupVerifyReset";

const VerifyEmail = ({ handleCancelForm, handleChooseForm }) => {
  const [verifyEmailData, setVerifyEmailData] = useState("");
  const [loading, setLoading] = useState(false);
  const [dynamicError, setDynamicError] = useState({
    message: "",
    fieldName: "",
  });
  const { verifyEmailMessage, verigyEmailErrorMessage } =
    useVerifyEmail(verifyEmailData);

  const onSubmit = (values) => {
    setVerifyEmailData(values);
    if (values.title === "Verify your email") {
      setLoading(true);
      // firebaseLogin(values);
    setVerifyEmailData(values);
    }
  };

  useEffect(() => {
    if (verifyEmailMessage || verigyEmailErrorMessage) {
      setLoading(false);
    }
  }, [verigyEmailErrorMessage, verifyEmailMessage]);

  return (
    <FormReuse
      template={verifyEmailTemplate}
      onSubmit={onSubmit}
      loading={loading}
      dynamicError={dynamicError}
      hookErrorMessage={verigyEmailErrorMessage}
      handleCancelForm={handleCancelForm}
    >
      <SignupVerifyReset handleChooseForm={handleChooseForm} />
    </FormReuse>
  );
};
export default VerifyEmail;
