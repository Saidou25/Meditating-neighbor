import React from "react";
import "./index.css";

// This is a reusable confirmation email which accepts a "message" as prop from where ever the component is called.
const Success = ({ message }) => {
  

  return (
    <div className="container-fluid success bg-primary">
      <div className="container-success">
        {message === "you haven't made any changes to your profile..." ? (
          <p className="p-text d-flex text-light justify-content-center fs-3">
            {message}
          </p>
        ) : (
          <>
            {" "}
            <div className="d-flex fa-success mb-2">
              <i className="fa-solid fa-check d-flex"></i>
            </div>
            <h2 className="text d-flex text-light justify-content-center mb-5">
              Success!
            </h2>
            <p className="p-text d-flex text-light justify-content-center fs-3">
              {message}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
export default Success;
