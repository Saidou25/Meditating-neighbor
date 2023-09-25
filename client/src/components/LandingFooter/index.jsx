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
        <p className="landing-footer-item text-light pt-0 pb-2">
          mosaidou@gmail.com{" "}
        </p>
        <a
          href="https://www.linkedin.com/in/saidou-monta?trk=profile-badge"
          className="landing-footer-item"
        >
          <img
            src={linkedIn}
            className="linkedIn-footer bg-light text-light"
            alt="letters linkedIn"
            style={{ height: 30 }}
          ></img>
        </a>
      </div>
    </div>
  );
};
export default LandingFooter;
