// import React, { useState } from "react";
// import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
// import { auth } from "../../firebase";
// import { useMutation, useQuery } from "@apollo/client";
// import { UPDATE_USER } from "../../utils/mutations";
// import { QUERY_USERS } from "../../utils/queries";
// // import FormReuse from "../../components/FormReuse";
// import Login from "../Login";
// import "./index.css";

// const ResetPassword = (values) => {

// console.log(values);


//   const [showReset, setShowReset] = useState("block");
//   const [showLogin, setShowLogin] = useState("none");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [password1, setPassword1] = useState("");
//   const [password2, setPassword2] = useState("");


//   const { data: usersData } = useQuery(QUERY_USERS);
//   const users = usersData?.users || [];
//   const [updateUser] = useMutation(UPDATE_USER);
//   //  reseting user's password using Firebase documentation and adding front-end errorMessages
//   const firebaseResetPassword = async () => {
//     try {
//       if (!password1 || !password2) {
//         setErrorMessage("Please confirm your password.");
//         return;
//       }
//       if (password1.length < 6 || password2.length < 6) {
//         setErrorMessage("Password needs to be 6 characters minimum.");
//         return;
//       }
//       if (password1 !== password2) {
//         setErrorMessage("Your passwords are different.");
//         return;
//       }
//       await confirmPasswordReset(auth, code, password1).then((resp) => {
//         setShowReset("none");
//         setShowLogin("block");
//       });
//     } catch (e) {
//       console.error(e);
//       return;
//     }
//   };
//   // updating user in MongoDb with  new password then calling firebaseResetPassword to update new password in firebase.
//   const update = async (userId, username, accountEmail) => {
//     try {
//       const { data } = await updateUser({
//         variables: {
//           id: userId,
//           username: username,
//           email: accountEmail,
//           password: password1,
//         },
//       });
//       if (data && data.updateUser) {
//         firebaseResetPassword();
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   // getting the code provided in firebase reset password link from the URL
//   const params = new URLSearchParams(window.location.href);
//   const code = params.get("oobCode");

//   // verifying code provided in the firebase reset password URL to make sure the password is being reset by the right user.
//   // Then calling the update function to update the user's password only if the user's email is the same as user's firebase
//   // account email from firebase database
//   const verifyCode = async (e) => {
//     e.preventDefault();
//     try {
//       await verifyPasswordResetCode(auth, code).then((email) => {
//         const accountEmail = email;
//         for (let user of users) {
//           if (user.email === accountEmail) {
//             const userId = user._id;
//             const username = user.username;
//             update(userId, username, accountEmail);
//           }
//         }
//       });
//     } catch (error) {
//       setErrorMessage("You need to signup first!");
//     }
//   };
 
//   return (
//     <>
//     {/* <FormReuse
//         // template={template}
//         getFromChild={getFromChild}
//         onSubmit={onSubmit}
//       /> */}
//       <div className="card signup-card g-0" style={{ display: `${showReset}` }}>
//         <div className="card-header text-light">
//           <h3 className="signup-header p-3">password reset</h3>
//         </div>
//         <div className="card-body">
//           <form className="signup-form">
//             <label className="form-label-signup text-light mb-4">
//               password
//             </label>
//             <br />
//             <input
//               className="form-input email-input"
//               placeholder="enter new password..."
//               name="password"
//               type="password"
//               onChange={(e) => {
//                 setPassword1(e.target.value);
//               }}
//             />
//             <br />
//             <label className="form-label-signup text-light my-4">confirm</label>
//             <br />
//             <input
//               className="form-input email-input mb-4"
//               placeholder="confirm new password..."
//               name="password"
//               type="password"
//               onChange={(e) => {
//                 setPassword2(e.target.value);
//               }}
//             />
//             <br />
//             {errorMessage && (
//               <div className="signup-error-message text-light bg-danger my-4">
//                 <p className="p-message px-1 py-2">{errorMessage}</p>
//               </div>
//             )}
//             <div className="btn-position">
//               <div className="row row-signup-buttons">
//                 <div className="col-6">
//                   <button
//                     className="btn btn-signup text-light rounded-0 mt-5"
//                     type="button"
//                     style={{ cursor: "pointer" }}
//                     onClick={() => {
//                       setShowLogin("block");
//                       setShowReset("none");
//                     }}
//                   >
//                     cancel
//                   </button>
//                 </div>
//                 <div className="col-6">
//                   <button
//                     className="btn btn-signup text-light rounded-0 mt-5"
//                     type="submit"
//                     style={{ cursor: "pointer" }}
//                     onClick={(e) => {
//                       verifyCode(e);
//                     }}
//                   >
//                     Reset
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//       {showLogin === "block" && <Login />}
//     </>
//   );
// };
// export default ResetPassword;
