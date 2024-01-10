import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Auth from "../../../utils/auth";
import "./index.css";

export default function LandingNav({ handleLogout }) {
  return (
    <div className="login-signup">
      {!Auth.loggedIn() ? (
        <Link className="link-login" to="/Login">
          login
        </Link>
      ) : (
        <>
          <Button
            className="btn btn-text signup py-0"
            onClick={() => {
              handleLogout();
            }}
          >
            logout
          </Button>
          <Link className="sit-link text-light" to="/USA">
            site
          </Link>
        </>
      )}
    </div>
  );
}
