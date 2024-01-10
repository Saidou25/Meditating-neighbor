import React, { useState, useEffect } from "react";
import { resetPasswordTemplate } from "../../../data/templatesData";
import { useNavigate } from "react-router-dom";
import useResetPassword from "../../../Hooks/UseResetPassword";
import SignupVerifyReset from "../SignupVerifyReset";
import FormReuse from "../FormReuse";

const ResePassword = ({ handleCancelForm, handleChooseForm }) => {
  const [resetPasswordData, setResetPasswordData] = useState("");
  const [loading, setLoading] = useState(false);
  const [dynamicError, setDynamicError] = useState({
    message: "",
    fieldName: "",
  });

  const { resetPasswordMessage, resetPasswordErrorMessage } =
    useResetPassword(resetPasswordData);

  const navigate = useNavigate();

  const onSubmit = (values) => {
    setResetPasswordData(values);
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
      setResetPasswordData(values);
    }
  };

  useEffect(() => {
    if (resetPasswordErrorMessage) {
      setLoading(false);
    }
  }, [resetPasswordErrorMessage]);

  useEffect(() => {
    if (resetPasswordMessage) {
      setLoading(false);
      navigate("/Login");
    }
  }, [resetPasswordMessage, navigate]);

  return (
    <FormReuse
      template={resetPasswordTemplate}
      onSubmit={onSubmit}
      hookErrorMessage={resetPasswordErrorMessage}
      handleCancelForm={handleCancelForm}
      dynamicError={dynamicError}
      loading={loading}
    >
      <SignupVerifyReset handleChooseForm={handleChooseForm} />
    </FormReuse>
  );
};
export default ResePassword;
