import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="container-fluid bg-primary"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 className="text-light">Page Not Found</h1>
      <br />
      <Button
        type="onClick"
        onClick={() => navigate(-1)}
        style={{ borderRadius: "25px" }}
      >
        go back
      </Button>
    </div>
  );
}
