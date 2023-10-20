import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { motion } from "framer-motion";
import { auth } from "../../firebase";
import Auth from "../../utils/auth";
import Login from "../../components/Login";
import Navabar from "../../components/Navbar";
import LandingFooter from "../../components/LandingFooter";
import "./index.css";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState("none");
  const [showParallax, setShowParallax] = useState("block");
  const [showLogin2, setShowLogin2] = useState("none");

  // loggingout user from the landing page.
  const logout = () => {
    Auth.logout();
    console.log("logout success!");
  };

  // Logging out user using firebase "signOut" methode.
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("firebase signout succes");
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      // Here we are setting parallax effect depending on the screen width.
      if (showLogin && showParallax) {
        if (window.innerWidth < 640 && showLogin === "block") {
          setShowParallax("none");
          setShowLogin2("block");
        } else if (window.innerWidth < 640 && showLogin === "none") {
          setShowParallax("block");
        }
        if (window.innerWidth > 640 && showLogin === "block") {
          setShowParallax("block");
        }
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [showLogin, showParallax]);

  return (
    <>
      <header className="landing-nav">
        <Navabar />
      </header>
      <main className="container-main" style={{ display: `${showParallax}` }}>
        <div className="parallax">
          <div className="login-signup">
            {!Auth.loggedIn() && (
              <button
                className="btn btn-text signup rounded-0"
                onClick={() => {
                  setShowLogin("block");
                }}
              >
                login
              </button>
            )}
            {Auth.loggedIn() && (
              <>
                <div to="/" className="signup-link">
                  <button
                    className="btn btn-text signup rounded-0"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    logout
                  </button>
                </div>
                <Link to="/USA" className="site-link">
                  <button className="btn site rounded-0">site</button>
                </Link>
              </>
            )}
          </div>
          <div className="row landing-tmiworld g-0">
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1, color: "#ff9f04" }}
              transition={{ type: "tween", duration: 4 }}
              className="col-6 landing-tmi g-0"
            >
              TMI
            </motion.h1>
            <motion.h2
              initial={{ scale: 0 }}
              animate={{ scale: 1, color: "#64625f" }}
              transition={{ type: "tween", duration: 6 }}
              className="col-6 landing-world g-0 text-secondary"
            >
              WORLD
            </motion.h2>
          </div>
          {showLogin === "block" && showParallax === "block" && (
            <div className="show-login">
              <Login />
            </div>
          )}
        </div>
        <div className="container-landing">
          <div className="text-title fs-4">
            <p className="first-title mb-5 fs-1">
              Have you ever wondered how many meditators are currently following
              the book "The Mind Illuminated" by Culadasa (John Yates, PhD) and
              Matthew Immergut, PhD?
            </p>
            <p className="intro-text">
              That's the purpose of this free application we've created. Simply
              sign up, go to the "locate" feature, geolocate your position, and
              save it. That's all it takes to put yourself on the map. Please
              note that, for now, only practitioners from within the United
              States are able to save their locations. However, we have plans to
              expand to Australia, the UK, and Europe in the near future.
            </p>
          </div>
        </div>
        <div className="second"></div>
        <div className="container-landing">
          <div className="text-title fs-4">
            <p className="first-title mb-5 fs-1">
              Wouldn't it be wonderful to discover if there are fellow
              practitioners of "The Mind Illuminated" living just a few miles
              away from you?
            </p>
            <p className="intro-text">
              To make this happen, ensure that you've saved your location,
              created your profile, and uploaded a profile picture. This way,
              you can be visible to others in the members' list. Once you've
              completed these steps, you can send contact requests to anyone
              you'd like to connect with and even follow up through your
              favorite social media platforms.
            </p>
          </div>
        </div>
        <div className="third"></div>
      </main>
      <div
        className="container-nav-login bg-primary"
        style={{ display: `${showLogin2}` }}
      >
        <div className="show-nav-login py-5">
          <Login />
        </div>
      </div>
      <footer className="landing-footer">
        <LandingFooter />
      </footer>
    </>
  );
};
export default LandingPage;
