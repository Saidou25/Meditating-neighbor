import React from "react";

const ProfileCard = ({ children }) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="card profile-card">{children}</div>
      </div>
    </div>
  );
};
export default ProfileCard;
