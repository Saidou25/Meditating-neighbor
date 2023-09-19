import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Signup from "../Signup";
import Spinner from "../../components/Spinner";
import Auth from "../../utils/auth";
import "./index.css";

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, loading }] = useMutation(LOGIN_USER);
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [hideLogin, setHideLogin] = useState("block");
  const [errorMessage, setErrorMessage] = useState("");

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      const lowerCaseEmail = value.toLowerCase();
      SetEmail(lowerCaseEmail);
    }

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const firebaseLogin = async (e) => {
    // e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // navigate("/Usa", { state: { user } });
        // console.log(user);
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    handleFormSubmit();
  };

  // submit form
  const handleFormSubmit = async (e) => {
    // event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    navigate("/Usa", { state: { formState } });
    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };
  const validate = (e) => {
    e.preventDefault();
    if (email && password && !error) {
      firebaseLogin();
      // handleFormSubmit();
    }
  };
  //   if (loading) return <Spinner />;
  return (
    <>
      <div className="card login-card g-0" style={{ display: `${hideLogin}`}}>
      <div className="card-header text-light"><h3 className="login-header p-3">login</h3></div>
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
            <label className="form-label-login text-light mb-4 mt-4">Password</label>
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
            {error && (
              <div className="signup-login-error p-4 bg-danger text-light mt-5">
                {error.message}
              </div>
            )}
              {errorMessage && (
              <div className="signup-error-message text-light bg-danger mx-3 mt-4">
                <p className="p-message p-2">{errorMessage}</p>
              </div>
            )}
            <div className="btn-position">
              <button
                className="btn btn-login text-light rounded-0 mt-5"
                style={{ cursor: "pointer" }}
                type="button"
                onClick={validate}
              >
                login
              </button>
            </div>
          </form>
        </div>
        <div className="card-footer">
          <p className="login-question text-light">
            Don't have an account yet?
            <button
                className="btn btn-text rounded-0 text-info"
                onClick={() => {setHideLogin("none"); setShowSignup(true);}}
              >
                Signup
              </button>
          </p>
        </div>
      </div>
      {showSignup === true && (
        <Signup />
      )}
    </>
    // </>
  );
};
export default Login;