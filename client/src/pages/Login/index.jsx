import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
// import useAuth from "../../utils/useAuth";
import Signup from "../Signup";
import Spinner from "../../components/Spinner";
import Auth from "../../utils/auth";
import "./index.css";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [hideLogin, setHideLogin] = useState("block");
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

  // submit form
  const handleFormSubmit = async () => {
    // e.preventDefault();
    try {
      if (email || password || !errorMessage) {
        const { data } = await login({
          variables: { ...formState },
        });
        if (data) {
          Auth.login(data.login.token);
          
        }
      } else {
        setErrorMessage("All fields need filled.");
        return;
      }
    } catch (e) {
      console.error(e);
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
        handleFormSubmit();
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("on AuthStateChange", user);
    });
  }, []);

  // if (loading) return <Spinner />;
  return (
    <>
      <div className="card login-card g-0" style={{ display: `${hideLogin}` }}>
        <div className="card-header text-light">
          <h3 className="login-header p-3">login</h3>
        </div>
        <div className="card-body">
          <form className="login-form">
            <label className="form-label-login text-light mb-4">Email</label>
            <br />
            <input
              className="form-input email-input mt-2 mb-2"
              placeholder="Your email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />{" "}
            <br />
            <label className="form-label-login text-light mb-4 mt-4">
              Password
            </label>
            <br />
            <input
              className="form-input password-input g-0 pt-2"
              placeholder="******"
              name="password"
              type="password"
              value={formState.password}
              onChange={(e) => {
                handleChange(e);
                setPassword(e.target.value);
              }}
            />{" "}
            <br />
            <div></div>
            {errorMessage && (
              <div className="signup-error-message text-light bg-danger mx-3 my-5">
                <p className="p-message p-3">{errorMessage}</p>
              </div>
            )}
            <div className="btn-position">
              {/* <div className="row row-login-buttons"> */}
              {/* <div className="col-6">
                  <button
                    className="btn btn-login text-light rounded-0 mt-4"
                    type="button"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      // showSignup(false);
                      setHideLogin("none");
                    }}
                  >
                    cancel
                  </button>
                </div> */}
              {/* <div className="col-6"> */}
              <button
                className="btn btn-login text-light rounded-0 mt-4"
                style={{ cursor: "pointer" }}
                type="submit"
                onClick={(e) => {
                  firebaseLogin(e);
                }}
              >
                login
              </button>
            </div>
            {/* </div> */}
            {/* </div> */}
          </form>
        </div>
        <div className="card-footer">
          <p className="login-question text-light">
            Don't have an account yet?
            <button
              className="btn btn-text rounded-0 text-info"
              onClick={() => {
                setHideLogin("none");
                setShowSignup(true);
              }}
            >
              Signup
            </button>
          </p>
        </div>
      </div>
      {showSignup === true && <Signup />}
    </>
    // </>
  );
};
export default Login;
