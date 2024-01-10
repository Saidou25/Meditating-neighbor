import { useState, useEffect, useCallback } from "react";

const useSubmitFormData = (formData) => {
    const [loginData, setLoginData] = useState("");
  //   const [hookErrorMessage, setHookErrorMessage] = useState("");
    const [dynamicError, setDynamicError] = useState({
      message: "",
      fieldName: "",
    });
  //   const [loading, setLoading] = useState(false);

  const validate = useCallback((formData) => {
    if (formData?.loginEmail) {
      if (formData?.password.length < 6) {
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
        //   setLoading(true);
        setLoginData(formData);
      }
    }
}, [setDynamicError]);

  useEffect(() => {
    if (!formData) {
      return;
    } else {
        validate(formData);
    }
  }, [formData, validate]);

  return { dynamicError, loginData };
};

export default useSubmitFormData;
