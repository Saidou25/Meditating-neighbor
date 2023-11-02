// import { useState } from "react";
// import { useMutation } from "@apollo/client";
// import { ADD_USER } from "../../utils/mutations";
// // import Success from "../../components/Success";
// import Login from "../Login";
// // import Spinner from "../../components/Spinner";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import FormReuse from "../../components/FormReuse";
// import { auth } from "../../firebase";
// import "./index.css";
// import { set } from "react-hook-form";

// const Signup = (values) => {
// console.log("values from utils");

//   const [email, SetEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [username, setUsername] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [showLogin, setShowLogin] = useState("none");
//   const [showSignup, setShowSignup] = useState("block");

  

//   const [addUser] = useMutation(ADD_USER);

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     if (name === "email") {
//       const lowerCaseEmail = value.toLowerCase();
//       SetEmail(lowerCaseEmail);
//     }
//   };
//   const firebaseSignup = async (e) => {
//     e.preventDefault();

//     try {
//       if (auth && username && email && password) {
//         const user = await createUserWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );
//         console.log("user", user);
//       }
//     } catch (error) {
//       setErrorMessage(
//         "Password is shorter than the minimum allowed (6 characters)."
//       );
//     }
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (!email || !password || !username) {
//         setErrorMessage("All fields need to be filled.");
//         return;
//       }
//       if (password.length < 6) {
//         setErrorMessage(
//           "Password is shorter than the minimum allowed (6 characters)."
//         );
//         return;
//       }
//       const { data } = await addUser({
//         variables: { username: username, password: password, email: email },
//       });
//       if (data) {
//         // setMessage(`Welcome ${username}.`);
//         console.log(`Welcome ${username}.`);
//         setShowLogin("block");
//         setShowSignup("none");
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   };
//   const onSubmit = (values) => {
//     console.log(values);
//     if (values) {
//       setMessage('bravo');
//     } else {
//       setErrorMessage("no values");
//     }
//     // console.log("template", template);
//     // if (values.title === "Reset Password") {
//     //   console.log("values says reset password");
//     //   // ResetPassword(values);
//     // }
//     // if (template.title === "Signup") {
//     //   console.log("values says signup");
//     //   setShowSignup(true);
//     // }
//     // if (values.title === "verify your email") {
//     //   console.log("values says verify");
//     // }
//   };

//   // if (loading) return <Spinner />;
//   // if (message) return <Success message={message} />;

//   return (
//     <>
//     {message ? (<h1 className="text-light">{message}</h1>) : (<>{errorMessage}</>)}
//     {/* {showLogin && (
//         <FormReuse
//           // template={template}
//           // getFromChild={getFromChild}
//           onSubmit={onSubmit}
//         />
//       )}  */}
//       {/* <div
//         className="card signup-card g-0"
//         style={{ display: `${showSignup}` }}
//       >
//         <div className="card-header text-light">
//           <h3 className="signup-header p-3">Signup</h3>
//         </div>
//         <div className="card-body">
//           <form className="signup-form">
//             <label className="form-label-signup text-light mb-4">
//               Username
//             </label>
//             <br />
//             <input
//               className="form-input username-input"
//               placeholder="choose a username..."
//               name="username"
//               type="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <br />
//             <label className="form-label-signup text-light my-4">Email</label>
//             <br />
//             <input
//               className="form-input email-input"
//               placeholder="your email.."
//               name="email"
//               type="email"
//               value={email}
//               onChange={handleChange}
//             />
//             <br />
//             <label className="form-label-signup text-light my-4">
//               Password
//             </label>
//             <br />
//             <input
//               className="form-input password-input g-0 pt-2 mb-5"
//               placeholder="******"
//               name="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <br />
//             {errorMessage && (
//               <div className="signup-error-message text-light bg-danger mb-5">
//                 <p className="p-message px-1 py-2">{errorMessage}</p>
//               </div>
//             )}

            
//             <div className="btn-position">
//               <div className="row row-signup-buttons">
//                 <div className="col-6">
//                   <button
//                     className="btn btn-signup text-light rounded-0"
//                     type="button"
//                     style={{ cursor: "pointer" }}
//                     onClick={() => {
//                       setShowSignup("none");
//                       setShowLogin("block");
//                     }}
//                   >
//                     cancel
//                   </button>
//                 </div>
//                 <div className="col-6">
//                   <button
//                     className="btn btn-signup text-light rounded-0"
//                     type="submit"
//                     style={{ cursor: "pointer" }}
//                     onClick={(e) => {
//                       handleFormSubmit(e);
//                       firebaseSignup(e);
//                     }}
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//       {showLogin === "block" && <Login />} */}
//     </>
//   );
// };
// export default Signup;
