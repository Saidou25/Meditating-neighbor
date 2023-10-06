import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
// import Success from "../../components/Success";
import Login from "../Login";
// import Spinner from "../../components/Spinner";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
// import Auth from "../../utils/auth";
import "./index.css";

const Signup = () => {
  // const navigate = useNavigate();

  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  // const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [hideSignup, setHideSignup] = useState("block");

  const [addUser] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      const lowerCaseEmail = value.toLowerCase();
      SetEmail(lowerCaseEmail);
    }
  };
  const firebaseSignup = async (e) => {
    e.preventDefault();

    try {
      if (auth && username && email && password) {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("user", user);
      }
    } catch (error) {
      setErrorMessage(
        "Password is shorter than the minimum allowed (6 characters)."
      );
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password || !username) {
        setErrorMessage("All fields need to be filled.");
        return;
      }
      if (password.length < 6) {
        setErrorMessage(
          "Password is shorter than the minimum allowed (6 characters)."
        );
        return;
      }
      const { data } = await addUser({
        variables: { username: username, password: password, email: email },
      });
      // Auth.login(data.addUser.token);
      if (data) {
        // setMessage(`Welcome ${username}.`);
        console.log(`Welcome ${username}.`);
        setShowLogin(true);
        setHideSignup("none");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // if (loading) return <Spinner />;
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
              className="form-input username-input"
              placeholder="choose a username..."
              name="username"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <label className="form-label-signup text-light my-4">Email</label>
            <br />
            <input
              className="form-input email-input"
              placeholder="your email.."
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
            />
            <br />
            <label className="form-label-signup text-light my-4">
              Password
            </label>
            <br />
            <input
              className="form-input password-input g-0 pt-2 mb-5"
              placeholder="******"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                    className="btn btn-signup text-light rounded-0"
                    type="submit"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      handleFormSubmit(e);
                      firebaseSignup(e);
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
export default Signup;
