import React from "react";
import { Navigate } from "react-router-dom";
import Auth from "../../../utils/auth";
import "./index.css";

const ProfileList = ({ children }) => {
  if (!Auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div
        className="container-fluid bg-primary"
        style={{ minHeight: "100vh" }}
      >
        {children}
      </div>
    </>
  );
};
export default ProfileList;
