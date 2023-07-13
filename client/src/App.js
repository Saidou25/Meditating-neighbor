import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <>
        <Routes>
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
        </>
      </Router>
    </>
  );
}

export default App;
