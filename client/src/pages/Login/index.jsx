import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import VerifyEmail from "../../components/VerifyEmail";
import ResetPassword from "../../components/ResetPassword";
import Signup from "../Signup";
// import Spinner from "../../components/Spinner";
import Auth from "../../utils/auth";
import "./index.css";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState("block");
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [login] = useMutation(LOGIN_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      const lowerCaseEmail = value.toLowerCase();
      SetEmail(lowerCaseEmail);
    }

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async () => {
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      if (data) {
        Auth.login(data.login.token);
      }
    } catch (error) {
      console.error(error.message);
    }
    setFormState({
      email: "",
      password: "",
    });
  };
  const firebaseLogin = async (e) => {
    e.preventDefault();
    try {
      if (auth && email && password) {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log(" firebaseLogin user", user);
        console.log("you are logedin in firebase :-)");
        handleFormSubmit();
      } else {
        setErrorMessage("All fields need to be filled.");
        return;
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // if (loading) return <Spinner />;
  return (
    <>
      <div className="card login-card g-0" style={{ display: `${showLogin}` }}>
        <div className="card-header text-light">
          <h3 className="login-header p-3">login</h3>
        </div>
        <div className="card-body">
          <form className="form">
            <label className="form-label-login text-light mb-4">Email</label>
            <br />
            <input
              className="form-input email-login-input my2"
              placeholder="Your email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />{" "}
            <br />
            <label className="form-label-login text-light my-4">Password</label>
            <br />
            <input
              className="form-input password-login-input g-0 pt-2 mb-5"
              placeholder="******"
              name="password"
              type="password"
              value={formState.password}
              onChange={(e) => {
                handleChange(e);
                setPassword(e.target.value);
              }}
            />
            <br />
            {errorMessage && (
              <div className="signup-error-message text-light bg-danger mb-5">
                <p className="p-message px-1 py-2">{errorMessage}</p>
              </div>
            )}
            <div className="btn-position">
              <div className="row row-signup-buttons">
                <div className="col-6">
                  <button
                    className="btn btn-signup text-light rounded-0"
                    style={{ cursor: "pointer" }}
                    type="submit"
                    onClick={(e) => {
                      firebaseLogin(e);
                    }}
                  >
                    login
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="card-footer">
          <p className="login-question mt-4">
            Don't have an account yet?
            <button
              className="btn btn-text-signup rounded-0 text-info py-0"
              onClick={() => {
                setShowLogin("none");
                setShowSignup(true);
              }}
            >
              Signup.
            </button>
            If you forgot your password,
            <button
              className="btn btn-text-signup rounded-0 text-info py-0"
              onClick={() => {
                setShowLogin("none");
                setShowVerifyEmail(true);
              }}
            >
              verify
            </button>
            your email, then
            <button
              className="btn btn-text-reset rounded-0 text-info py-0"
              onClick={() => {
                setShowLogin("none");
                setShowResetPassword(true);
              }}
            >
              reset
            </button>
            your password.
          </p>
        </div>
      </div>
      {showSignup === true && <Signup />}
      {showVerifyEmail === true && <VerifyEmail />}
      {showResetPassword === true && <ResetPassword />}
    </>
  );
};
export default Login;
