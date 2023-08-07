import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Spinner from "../../components/Spinner";
import Auth from "../../utils/auth";
import "./index.css";

const Login = () => {
  const navigate = useNavigate();
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

      navigate("/Map", { state: { formState } });
    } catch (e) {
      console.error(e);
    }
    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };
  if (loading) return <Spinner />;
  return (
    <>
      <div className="container-signup g-0"></div>
     
      <main className="container-login g-0">
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
              className="btn btn-login text-light rounded-0 mt-5 mb-5"
              style={{ cursor: "pointer" }}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </main>
      {/* <div className="form-group">
<label className="form-label mt-4">Floating labels</label>
<div className="form-floating mb-3">
  <input
    type="email"
    className="form-control"
    id="floatingInput"
    placeholder="name@example.com"
  />
  <label for="floatingInput">Email address</label>
</div>
<div className="form-floating">
  <input
    type="password"
    className="form-control"
    id="floatingPassword"
    placeholder="Password"
    autocomplete="off"
  />
  <label for="floatingPassword">Password</label>
</div>
</div> */}
    </>
  );
};
export default Login;


