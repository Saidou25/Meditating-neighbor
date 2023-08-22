import React from "react";
import "./index.css";

const Success = ({ changes, noChanges }) => {
  return (
    <div className="container-fluid success bg-primary">
      <div className="container-success">
        <div className="d-flex fa-success mb-2">
          <i className="fa-solid fa-check d-flex"></i>
        </div>
        {changes?.length && (
          <>
            <h2 className="text d-flex text-light justify-content-center">
              Success!
            </h2>
            <p className="p-text d-flex text-light justify-content-center">
              {changes}
            </p>
          </>
        )}
        {noChanges?.length && (
          <>
            <h2 className="text d-flex text-light justify-content-center">
              {noChanges}
            </h2>
          </>
        )}
      </div>
    </div>
  );
};
export default Success;
