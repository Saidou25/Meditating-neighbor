import React from "react";

export default function CardHeader({ children }) {
  return (
    <div className="card-header bg-primary p-0">
      <div className="contact-fa">{children}</div>
    </div>
  );
}
