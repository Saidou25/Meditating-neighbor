import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";
import Auth from "../../utils/auth";
import "./index.css";

const Login = () => {
//   const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, loading }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
        // navigate("/Usa", { state: { formState } });
    } catch (e) {
      console.error(e);
    }
    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };
//   if (loading) return <Spinner />;
  return (
    <>
      <Navbar />
      <main className="container-login bg-primary g-0">
        <div className="form-container">
          <form className="login-form" onSubmit={handleFormSubmit}>
            <label className="form-label-login mb-4 mt-5">Email</label>
            <br />
            <input
              className="form-input mt-2 mb-2"
              placeholder="Your email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />{" "}
            <br />
            <label className="form-label-login  mb-4 mt-4">Password</label>
            <br />
            <input
              className="form-input mt-2 mb-2"
              placeholder="******"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />{" "}
            <br />
            <div></div>
            {error && (
              <div className="signup-login-error p-4 bg-danger text-light mt-5">
                {error.message}
              </div>
            )}
            <div className="btn-position">
              <button
                className="btn btn-login bg-primary text-light rounded-0 mt-5 mb-5"
                style={{ cursor: "pointer" }}
                type="submit"
              >
                login
              </button>
            </div>
          </form>
        </div>
        <p className="login-question text-light">
          Don't have an account yet?
          <Link className="signup-link text-info bg-primary" to="/Signup">
            signup.
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
};
export default Login;
