import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import Auth from "../../utils/auth";
import Login from "../Login";
// import Signup from "../Signup";
import Navabar from "../../components/Navbar";
import LandingFooter from "../../components/LandingFooter";
import "./index.css";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState("none");
  const [showParallax, setShowParallax] = useState("block");
  const [showLogin2, setShowLogin2] = useState("none");
  // const [screenSize, setScreenSize] = useState(undefined);

  const logout = () => {
    Auth.logout();
    console.log("logout success!");
  };

  const handleLogout = async () => {
    console.log("in handleLogout");
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
              // <div className="show-login">
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
                      // logout();
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
            <div className="col-6 landing-tmi g-0">TMI</div>
            <div className="col-6 landing-world g-0">WORLD</div>
          </div>
          {showLogin === "block" && showParallax === "block" && (
            <div className="show-login">
              <Login />
            </div>
          )}
        </div>
        <div className="container-landing">
          <div className="text-title fs-4">
            <h3 className="first-title text-secondary mb-5">
              Where is the nearest TMI meditator?
            </h3>
            <p>
              This appliction is designed for you to see if there is any TMI
              meditator in your town or may be even next door. Lorem, ipsum
              dolor sit amet consectetur adipisicing elit. Deserunt neque
              corporis et voluptate ut repellat vitae, dolores consectetur eaque
              quo voluptatem aspernatur officia delectus nisi animi sit
              laboriosam, quas quod. . Lorem ipsum dolor sit amet consectetu
            </p>
          </div>
        </div>
        <div className="second"></div>
        <div className="container-landing">
          <div className="text-title fs-4">
            <h3 className="first-title text-secondary mb-5">
              Where is the nearest TMI meditator?
            </h3>
            <p>
              This appliction is designed for you to see if there is any TMI
              meditator in your town or may be even next door. Lorem, ipsum
              dolor sit amet consectetur adipisicing elit. Deserunt neque
              corporis et voluptate ut repellat vitae, dolores consectetur eaque
              quo voluptatem aspernatur officia delectus nisi animi sit
              laboriosam, quas quod. . Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Sit, ipsam quae atque necessitatibus natus quas
              quis dolores? Architecto quidem eum perferendis eligendi sed
            </p>
          </div>
        </div>
        <div className="third"></div>
      </main>
      {/* {showParallax === "none" && showLogin === "block" && ( */}
      <div
        className="container-nav-login bg-primary"
        style={{ display: `${showLogin2}` }}
      >
        <div className="show-nav-login py-5">
          <Login />
        </div>
      </div>
      {/* )}  */}
      <footer className="landing-footer">
        <LandingFooter />
      </footer>
    </>
  );
};
export default LandingPage;
