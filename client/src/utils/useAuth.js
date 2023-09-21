// import { onAuthStateChanged, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, signOut } from "firebase/auth";
// import { auth } from "../firebase";
// import { useEffect, useState } from "react";

// export const useAuth = () => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const handleUser = (user) => {
//     if (user) {
//       setUser(user);
//     } else {
//       setUser(null);
//     }

//     setIsLoading(false);
//   };

//   const firebaseLogin = async (auth, email, password) => {
//     try {
//       if (auth && email && password) {
//         const user = await signInWithEmailAndPassword(auth, email, password);
//         console.log(" firebaseLogin user", user);
//       }
//     } catch (error) {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorCode, errorMessage);
//     }
//     // handleFormSubmit();
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       console.log("firebase signed out");
//       // logout();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = auth.onIdTokenChanged(handleUser);
//     return () => unsubscribe();
//   }, []);

//   return { user, isLoading, firebaseLogin, handleLogout };
// };

// export default useAuth;