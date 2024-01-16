import React, { useState, useEffect } from "react";
import { verifyEmailTemplate } from "../../../data/templatesData";
import useVerifyEmail from "../../../Hooks/UseVerifyEmail";
import FormReuse from "../FormReuse";
import SignupVerifyReset from "../SignupVerifyReset";

const VerifyEmail = () => {
  const [verifyEmailData, setVerifyEmailData] = useState("");
  const [loading, setLoading] = useState(false);

  const { verifyEmailMessage, verifyEmailErrorMessage } =
    useVerifyEmail(verifyEmailData);

  const onSubmit = (values) => {
    setVerifyEmailData(values);
    if (values.title === "Verify your email") {
      setLoading(true);
      setVerifyEmailData(values);
    }
  };

  useEffect(() => {
    if (verifyEmailMessage) {
      setLoading(false);
    }
  }, [verifyEmailMessage]);

  useEffect(() => {
    if (verifyEmailErrorMessage) {
      setLoading(false);
    }
  }, [verifyEmailErrorMessage]);

  return (
    <FormReuse
      template={verifyEmailTemplate}
      onSubmit={onSubmit}
      loading={loading}
      hookErrorMessage={verifyEmailErrorMessage}
    >
      <SignupVerifyReset />
    </FormReuse>
  );
};
export default VerifyEmail;
