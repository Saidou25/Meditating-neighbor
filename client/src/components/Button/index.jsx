import React from "react";
import "./index.css";

const Button = ({ children, onClick, type, className, style }) => {
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
