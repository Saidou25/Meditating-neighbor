import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import Login from "../../pages/Login";
import "./index.css";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [showLogin, setShowLogin] = useState("none");
  const [showVerifyEmail, setShowVerifyEmail] = useState("block");
  const [errorMessage, setErrorMessage] = useState("");

  // Sending a reset password link to user using firebase(sendPasswordResetEmail) documentation.
  const firebaseEmailVerify = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Email verification sent! Please check your email.");
      setEmail("");
      setErrorMessage("");
      setShowVerifyEmail("none");
      setShowLogin("block");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <div
        className="card signup-card g-0"
        style={{ display: `${showVerifyEmail}` }}
      >
        <div className="card-header text-light">
          <h3 className="signup-header p-3">Verify your email</h3>
        </div>
        <div className="card-body">
          <form className="signup-form">
            <label className="form-label-signup text-light mb-4">Email</label>
            <br />
            <input
              className="form-input email-input mb-5"
              placeholder="your email.."
              name="email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            {errorMessage && (
              <div className="signup-error-message text-light bg-danger mb-5">
                <p className="p-message p-2">{errorMessage}</p>
              </div>
            )}
            <div className="btn-position">
              <div className="row row-signup-buttons">
                <div className="col-6">
                  <button
                    className="btn btn-signup text-light rounded-0"
                    type="button"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setShowLogin("block");
                      setShowVerifyEmail("none");
                    }}
                  >
                    cancel
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className="btn btn-signup text-light rounded-0"
                    type="submit"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      firebaseEmailVerify(e);
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {showLogin === "block" && <Login />}
    </>
  );
};
export default VerifyEmail;
