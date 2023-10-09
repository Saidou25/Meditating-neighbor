import React, { useState, useEffect } from "react";
import { verifyPasswordResetCode } from "firebase/auth";
import { auth } from "../../firebase";
import Login from "../../pages/Login";
import "./index.css";

const ResetPassword = () => {
  const [showReset, setShowReset] = useState("block");
  const [showLogin, setShowLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [acode, setAcode] = useState("");
  console.log(acode);

  useEffect(() => {
      const params = new URLSearchParams(window.location.pathname);
    
      const code = params.get("oobCode");
      console.log("code", code);
      const email = verifyPasswordResetCode(auth, code);
      console.log(email);
      setAcode(code);
    
  }, []);

  //   const firebaseResetPassword = async (e) => {
  //     e.preventDefault();
  //     console.log(password1, password2);
  //     try {
  //       if (!password1 || !password2) {
  //         setErrorMessage("Please provide a valid password.");
  //         return;
  //       }
  //       if (password1.length < 6 || password2.length < 6) {
  //         setErrorMessage("Password needs to be 6 characters minimum.");
  //         return;
  //       }
  //       if (password1 !== password2) {
  //         setErrorMessage("Your passwords are different.");
  //         return;
  //       }
  //       console.log('good to go');
  //     //   await auth().verifyPasswordResetCode(code);
  //       alert("Email verification sent! Please check your email.");
  //       setShowReset("none");
  //       setShowLogin(true);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  return (
    <>
      <div className="card signup-card g-0" style={{ display: `${showReset}` }}>
        <div className="card-header text-light">
          <h3 className="signup-header p-3">password reset</h3>
        </div>
        <div className="card-body">
          <form className="signup-form">
            <label className="form-label-signup text-light mb-4">
              password
            </label>
            <br />
            <input
              className="form-input email-input"
              placeholder="enter new password..."
              name="password"
              type="password"
              onChange={(e) => {
                setPassword1(e.target.value);
              }}
            />
            <br />
            <label className="form-label-signup text-light my-4">confirm</label>
            <br />
            <input
              className="form-input email-input mb-4"
              placeholder="confirm new password..."
              name="password"
              type="password"
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
            />
            <br />
            {errorMessage && (
              <div className="signup-error-message text-light bg-danger my-4">
                <p className="p-message px-1 py-2">{errorMessage}</p>
              </div>
            )}
            <div className="btn-position">
              <div className="row row-signup-buttons">
                <div className="col-6">
                  <button
                    className="btn btn-signup text-light rounded-0 mt-5"
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
                    className="btn btn-signup text-light rounded-0 mt-5"
                    type="submit"
                    style={{ cursor: "pointer" }}
                    // onClick={(e) => {
                    //   firebaseResetPassword(e);
                    // }}
                    // onClick={findCode}
                  >
                    Reset
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
export default ResetPassword;