import React from "react";
import "./index.css";

const Spinner = () => {
  return (
    <div className="container-spinner">
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
        <p className="loading text-white mt-4">Loading...</p>
    </div>
  );
};

export default Spinner;
