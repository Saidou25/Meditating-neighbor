import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Success from "../../components/Success";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";
import Auth from "../../utils/auth";
import "./index.css";

const Signup = () => {
  const navigate = useNavigate();

  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const [addUser, { error, loading }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      const lowerCaseEmail = value.toLowerCase();
      SetEmail(lowerCaseEmail);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { username: username, password: password, email: email },
      });
    //   Auth.login(data.addUser.token);
      if (data) {
        setMessage(`Welcome ${username}.`)
      }
    } catch (e) {
      console.error(e);
    }
    setTimeout(() => {
        navigate("/Login");
    }, 3000);
  };

  if (loading) return <Spinner />;
  if (message) return <Success message={message} />

  return (
    <>
      <Navbar />
      <div className="container-signup bg-primary g-0">
        <div className="signup-form-container">
          <form className="signup-form" onSubmit={handleFormSubmit}>
            <label className="form-label-signup mb-4 mt-5">Username</label>
            <br />
            <input
              className="form-input mt-2 mb-2"
              placeholder="choose a username..."
              name="username"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <label className="form-label-signup mb-4 mt-4">Email</label>
            <br />
            <input
              className="form-input mt-2 mb-2"
              placeholder="your email.."
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
            />
            <br />
            <label className="form-label-signup mb-4 mt-4">Password</label>
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
              <div className="signup-login-error p-4 bg-danger text-light mt-5">
                {error.message}
              </div>
            )}
            <div className="btn-position">
              <button
                className="btn btn-signup text-light rounded-0 mt-5"
                type="button"
                style={{ cursor: "pointer" }}
                onClick={handleFormSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Signup;
