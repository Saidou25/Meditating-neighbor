import React from "react";
import linkedIn from "../../assets/images/linkedIn.png";
import "./index.css";

const LandingFooter = () => {
  return (
    <div className="landing-footer-container bg-primary">
      <div className="landing-footer">
        <p className="landing-footer-item text-light pb-0">
          Made by Saidou Monta{" "}
        </p>
        <div className="linkedin-container">
          <a href="https://www.linkedin.com/in/saidou-monta?trk=profile-badge">
            <img
              src={linkedIn}
              className="linkedIn-footer bg-light text-light"
              alt="logo linkedIn"
              style={{ height: 30 }}
            ></img>
          </a>
        </div>
        <p className="landing-footer-concerns text-light py-3 px-5">
          For questions, comments, concerns or support please contact:
        </p>
        <p className="landing-footer-item text-light pt-0 pb-2">
          mosaidou@gmail.com
        </p>
        <p className="landing-footer-item text-light pt-0 pb-4 px-5">
          Photography by Petr Sidorov and Andrea De Santis
        </p>
      </div>
    </div>
  );
};
export default LandingFooter;
