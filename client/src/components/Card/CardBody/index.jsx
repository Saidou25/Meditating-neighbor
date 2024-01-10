import React from "react";
// import Image from "../../Image";

export default function CardBody({ children }) {
  return (
    <div className="card-body bg-primary p-0"
    style={{ marginLeft: "30%", marginRight: "30%" }}
    >
      <div
        className="container-fluid p-0"
        style={{ maxWidth: "100px", maxHeight: "100px" }}
      >
        {children}
      </div>
    </div>
  );
}
