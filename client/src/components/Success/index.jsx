import React from "react";
import "./index.css";

const Success = ({ message }) => {
  console.log("message", message);

  return (
    <div className="container-fluid success bg-primary">
      <div className="container-success">
        {(message === "Your profile has been updated." ||
          message === "Welcome to TMIWORLD...") && (
          <>
            {" "}
            <div className="d-flex fa-success mb-2">
              <i className="fa-solid fa-check d-flex"></i>
            </div>
            <h2 className="text d-flex text-light justify-content-center mb-5">
              Success!
            </h2>
          </>
        )}
        <p className="p-text d-flex text-light justify-content-center fs-3">
          {message}
        </p>
      </div>
    </div>
  );
};
export default Success;
