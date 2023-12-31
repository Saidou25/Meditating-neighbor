import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBw12T42JkcibgzasLv5BjaB-P_p9Fu_o4",
  authDomain: "tmiusa-12aca.firebaseapp.com",
  projectId: "tmiusa-12aca",
  storageBucket: "tmiusa-12aca.appspot.com",
  messagingSenderId: "1048343372801",
  appId: "1:1048343372801:web:23440bf1174fe280dc8c00",
  measurementId: "G-G00H24001X"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;