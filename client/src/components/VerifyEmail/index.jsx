import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import useUsersInfo from "../../utils/UseUsersInfo";
import Login from "../../pages/Login";
import "./index.css";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [showReset, setShowReset] = useState("block");
  const [showLogin, setShowLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { userId } = useUsersInfo(email);
  console.log(userId);
  
  const firebaseEmailVerify = async (e) => {
    e.preventDefault();
    console.log(email);
    try {
      if (!email) {
        setErrorMessage("Please provide a valid email.");
        return;
      }
      if (email !== "mosaidou@gmail.com") {
        setErrorMessage(
          "this email is not authorized for that operation at the moment."
        );
        return;
      }
      await sendPasswordResetEmail(auth, email);
      alert("Email verification sent! Please check your email.");
      setEmail("");
      setShowReset("none");
      setShowLogin(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="card signup-card g-0" style={{ display: `${showReset}` }}>
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
                      setShowLogin(true);
                      setShowReset("none");
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
      {showLogin === true && <Login />}
    </>
  );
};
export default VerifyEmail;
