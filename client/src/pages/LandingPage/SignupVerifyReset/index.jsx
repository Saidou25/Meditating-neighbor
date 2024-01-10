import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const SignupVerifyReset = () => {
  return (
    <>
      <p className="login-question text-light mt-4">
        Don't have an account yet?
        <Link
          className="text-info py-0 ms-1"
          to="/Signup"
          style={{ textDecoration: "none", marginRight: "4px" }}
        >
          Signup.
        </Link>
        If you forgot your password,
        <Link
          className="text-info py-0 ms-1"
          to="/VerifyEmail"
          style={{ textDecoration: "none", marginRight: "4px" }}
        >
          verify
        </Link>
        your email, then
        <Link
          className="text-info py-0 ms-1"
          to="/ResetPassword"
          style={{ textDecoration: "none", marginRight: "4px" }}
        >
          reset
        </Link>
        your password.
      </p>
    </>
  );
};

export default SignupVerifyReset;
