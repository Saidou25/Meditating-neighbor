import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Spinner from "../../components/Spinner";
import Auth from "../../utils/auth";
import "./index.css";

const Signup = () => {
  const navigate = useNavigate();

  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirm, setConfirm] = useState(false);

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
      Auth.login(data.addUser.token);
      if (data) {
        setConfirm(true);
        setTimeout(() => {
          navigate("/Map");
        }, 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <Spinner />;

  if (confirm === true) {
    return (
      <main className="row container-success">
        <div className="col-12 appointment-success d-flex mb-2">
          <i className="d-flex fa-solid fa-check"></i>
        </div>
        <h2 className="col-12 signup-success d-flex justify-content-center">
          Success!
        </h2>
        <p className="col-12 signup-success d-flex justify-content-center">
          Let's now head to your dashboard...
        </p>
      </main>
    );
  }
  return (
    <>
      <div className="container-signup g-0">
        {error && (
          <div className="signup-login-error p-4 bg-warning text-primary">
            {error.message}
          </div>
        )}
        <div className="container-login g-0">
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
              className="form-input mt-2 mb-2"
              placeholder="******"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />

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
    </>
  );
};
export default Signup;
