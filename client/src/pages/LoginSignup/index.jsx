import React from "react";
import Login from "../Login";
import Signup from "../Signup";
import "./index.css";

const LoginSignup = () => {
  return (
    <div className="container-loginsignup">
      <div className="container-nav">
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className="nav-link active"
            id="nav-login-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-login"
            type="button"
            role="tab"
            aria-controls="nav-login"
            aria-selected="true"
          >
            Login
          </button>
          <button
            className="nav-link"
            id="nav-signup-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-signup"
            type="button"
            role="tab"
            aria-controls="nav-signup"
            aria-selected="false"
          >
            Signup
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-login"
          role="tabpanel"
          aria-labelledby="nav-login-tab"
          // tabindex="0"
        >
          <Login />
        </div>
        <div
          className="tab-pane fade"
          id="nav-signup"
          role="tabpanel"
          aria-labelledby="nav-signup-tab"
          // tabindex="0"
        >
          <Signup />
        </div>
      </div>
    </div>
    </div>
  );
};
export default LoginSignup;
