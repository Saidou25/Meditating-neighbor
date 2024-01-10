import React from "react";
import "./index.css";

export default function CardFooter({ data }) {
  return (
    <div className="card-footer papa bg-primary">
      <p className="name-in-footer my-4 text-light">
       {data}
      </p>
    </div>
  );
}
