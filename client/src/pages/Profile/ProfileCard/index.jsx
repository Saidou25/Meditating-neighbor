import React from "react";
import "./index.css";

const ProfileCard = ({ children }) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="card shadow profile-card">{children}</div>
      </div>
    </div>
  );
};
export default ProfileCard;
