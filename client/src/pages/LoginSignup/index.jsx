// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useMutation } from "@apollo/client";
// import { ADD_USER, LOGIN_USER } from "../../utils/mutations";
// import { Link } from "react-router-dom";
// import Success from "../../components/Success";
// import Spinner from "../../components/Spinner";
// import Auth from "../../utils/auth";
// import Footer from "../../components/Footer";
// import "./index.css";

// const LoginSignup = () => {
//     const [message, setMessage] = useState("");
//     const [email, SetEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [username, setUsername] = useState("");
//     const [formState, setFormState] = useState({ email: "", password: "" });

//   const navigate = useNavigate();

//   const [login, { loginError, loginLoading }] = useMutation(LOGIN_USER);
//   const [addUser, { signUpError, signUpLoading }] = useMutation(ADD_USER);

//   // update state based on form input changes
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;

//     setFormState({
//       ...formState,
//       [name]: value,
//     });
//   };
//   // submit form
//   const handleLoginFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const { data } = await login({
//         variables: { ...formState },
//       });
//       Auth.login(data.login.token);
//     } catch (e) {
//       console.error(e);
//     }
//     navigate("/Usa");
//     // clear form values
//     setFormState({
//       email: "",
//       password: "",
//     });
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     if (name === "email") {
//       const lowerCaseEmail = value.toLowerCase();
//       SetEmail(lowerCaseEmail);
//     }
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const { data } = await addUser({
//         variables: { username: username, password: password, email: email },
//       });
//       Auth.login(data.addUser.token);
//       if (data) {
//         setMessage("You are now loggedin");
//       }
//     } catch (e) {
//       console.error(e);
//     }
//     setTimeout(() => {
//       navigate("/Usa");
//       setMessage("");
//     }, 3000);
//   };
//   if (loginLoading || signUpLoading) return <Spinner />;
//   if (message) return <Success message={message} />;
//   return (
//     <>
//       <div className="container-fluid loginsignup bg-primary">
//         <div className="container-nav">
//           <div className="go-back d-flex justify-content-center">
//             <Link to="/">
//               <button type="btn" className="btn-go-back text-white m-0">
//                 go back
//               </button>
//             </Link>
//           </div>
//           <nav>
//             <div className="nav nav-tabs" id="nav-tab" role="tablist">
//               <button
//                 className="nav-link active fs-3"
//                 id="nav-login-tab"
//                 data-bs-toggle="tab"
//                 data-bs-target="#nav-login"
//                 type="button"
//                 role="tab"
//                 aria-controls="nav-login"
//                 aria-selected="true"
//               >
//                 Login
//               </button>
//               <button
//                 className="nav-link sign-up-link fs-3"
//                 id="nav-signup-tab"
//                 data-bs-toggle="tab"
//                 data-bs-target="#nav-signup"
//                 type="button"
//                 role="tab"
//                 aria-controls="nav-signup"
//                 aria-selected="false"
//               >
//                 Signup
//               </button>
//             </div>
//           </nav>
//           <div className="tab-content" id="nav-tabContent">
//             <div
//               className="tab-pane fade show active"
//               id="nav-login"
//               role="tabpanel"
//               aria-labelledby="nav-login-tab"
//               tabIndex="0"
//             >
//               <main className="container-login g-0">
//                 <form className="login-form" onSubmit={handleLoginFormSubmit}>
//                   <label className="form-label-login mb-4 mt-5">Email</label>
//                   <br />
//                   <input
//                     className="form-input mt-2 mb-2"
//                     placeholder="Your email"
//                     name="email"
//                     type="email"
//                     value={formState.email}
//                     onChange={handleInputChange}
//                   />{" "}
//                   <br />
//                   <label className="form-label-login  mb-4 mt-4">
//                     Password
//                   </label>
//                   <br />
//                   <input
//                     className="form-input mt-2 mb-2"
//                     placeholder="******"
//                     name="password"
//                     type="password"
//                     value={formState.password}
//                     onChange={handleInputChange}
//                   />{" "}
//                   <br />
//                   <div></div>
//                   {loginError && (
//                     <div className="signup-login-error p-4 bg-danger text-light mt-5">
//                       {loginError.message}
//                     </div>
//                   )}
//                   <div className="btn-position">
//                     <button
//                       className="btn btn-login bg-primary text-light rounded-0 mt-5 mb-5"
//                       style={{ cursor: "pointer" }}
//                       type="submit"
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </form>
//               </main>
//             </div>
//             <div
//               className="tab-pane fade"
//               id="nav-signup"
//               role="tabpanel"
//               aria-labelledby="nav-signup-tab"
//               tabIndex="0"
//             >
//               <div className="container-signup g-0">
//                 <div className="container-login g-0">
//                   <form className="signup-form" onSubmit={handleFormSubmit}>
//                     <label className="form-label-signup mb-4 mt-5">
//                       Username
//                     </label>
//                     <br />
//                     <input
//                       className="form-input mt-2 mb-2"
//                       placeholder="choose a username..."
//                       name="username"
//                       type="username"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                     />
//                     <br />
//                     <label className="form-label-signup mb-4 mt-4">Email</label>
//                     <br />
//                     <input
//                       className="form-input mt-2 mb-2"
//                       placeholder="your email.."
//                       name="email"
//                       type="email"
//                       value={email}
//                       onChange={handleChange}
//                     />
//                     <br />
//                     <label className="form-label-signup mb-4 mt-4">
//                       Password
//                     </label>
//                     <br />
//                     <input
//                       className="form-input mt-2 mb-2"
//                       placeholder="******"
//                       name="password"
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <br />
//                     {signUpError && (
//                       <div className="signup-login-error p-4 bg-danger text-light mt-5">
//                         {signUpError.message}
//                       </div>
//                     )}
//                     <div className="btn-position">
//                       <button
//                         className="btn btn-signup text-light rounded-0 mt-5"
//                         type="button"
//                         style={{ cursor: "pointer" }}
//                         onClick={handleFormSubmit}
//                       >
//                         Submit
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="profile-footer bg-primary">
//         <Footer />
//       </div>
//     </>
//   );
// };
// export default LoginSignup;
