import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Map from "./components/Map";
// import "bootswatch/dist/lux/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <>
        <Routes>
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Map" element={<Map />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
        </>
      </Router>
    </>
  );
}

export default App;
