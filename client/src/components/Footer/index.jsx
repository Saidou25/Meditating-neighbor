import React from "react";
import linkedIn from "../../assets/images/linkedIn.png";
import "./index.css";

const Footer = () => {
  return (
    <div className="footer-container bg-primary">
      <div className="footer">
        <p className="footer-item text-light">Made by Saidou Monta </p>
        <div className="linkedin-container">
          <a href="https://www.linkedin.com/in/saidou-monta?trk=profile-badge">
            <img
              src={linkedIn}
              className="linkedIn bg-light text-light"
              alt="letters linkedIn"
              style={{ height: 30 }}
            ></img>
          </a>
        </div>
        <p className="footer-item text-light pt-0 pt-3 px-5">
          For questions, comments, concerns or support please contact:
          mosaidou@gmail.com
        </p>
        <p className="footer-item text-light pt-0 pb-2 px-5">
          Photography by Petr Sidorov and Andrea De Santis
        </p>
      </div>
    </div>
  );
};
export default Footer;
