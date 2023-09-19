import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
// import Success from "../../components/Success";
import Login from "../Login";
import Spinner from "../../components/Spinner";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Auth from "../../utils/auth";
import "./index.css";

const Signup = () => {
  // const navigate = useNavigate();

  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [hideSignup, setHideSignup] = useState("block");

  const [addUser, { error, loading }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      const lowerCaseEmail = value.toLowerCase();
      SetEmail(lowerCaseEmail);
    }
  };
  const firebaseSignup = async (e) => {
    // e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // navigate("/login")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };
  const handleFormSubmit = async (e) => {
    // e.preventDefault();
    try {
      const { data } = await addUser({
        variables: { username: username, password: password, email: email },
      });
      // Auth.login(data.addUser.token);
      if (data) {
        // setMessage(`Welcome ${username}.`);
        console.log(`Welcome ${username}.`);
      }
    } catch (e) {
      console.error(e);
    }
    // setTimeout(() => {
    // navigate("/Login");
    // }, 3000);
    setShowLogin(true);
    setHideSignup("none");
  };
  const validate = (e) => {
    e.preventDefault();
    if (!email || !password || !username || error) {
      setErrorMessage("All fields need filled.");
      return;
    } else {
      firebaseSignup();
      handleFormSubmit();
    }
  };

  if (loading) return <Spinner />;
  // if (message) return <Success message={message} />;

  return (
    <>
      <div
        className="card signup-card g-0"
        style={{ display: `${hideSignup}` }}
      >
        <div className="card-header text-light">
          <h3 className="signup-header p-3">Signup</h3>
        </div>
        <div className="card-body">
          <form className="signup-form">
            <label className="form-label-signup text-light mb-4">
              Username
            </label>
            <br />
            <input
              className="form-input username-input mt-2 mb-2"
              placeholder="choose a username..."
              name="username"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <label className="form-label-signup text-light mb-4 mt-4">
              Email
            </label>
            <br />
            <input
              className="form-input email-input mt-2 mb-2"
              placeholder="your email.."
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
            />
            <br />
            <label className="form-label-signup text-light mb-4 mt-4">
              Password
            </label>
            <br />
            <input
              className="form-input password-input g-0 pt-2"
              placeholder="******"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            {error && (
              <div className="signup-login-error p-4 bg-danger text-light mt-4">
                {error.message}
              </div>
            )}
            {errorMessage && (
              <div className="signup-error-message text-light bg-danger mx-3 my-5">
                <p className="p-message p-3">{errorMessage}</p>
              </div>
            )}
            <div className="btn-position">
              <div className="row row-signup-buttons">
                <div className="col-6">
                  <button
                    className="btn btn-signup text-light rounded-0 mt-4"
                    type="button"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setHideSignup("none");
                      setShowLogin(true);
                    }}
                  >
                    cancel
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className="btn btn-signup text-light rounded-0 mt-4"
                    type="button"
                    style={{ cursor: "pointer" }}
                    onClick={validate}
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
export default Signup;
