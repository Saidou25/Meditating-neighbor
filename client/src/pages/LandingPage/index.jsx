import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useLocation } from "react-router-dom";
import Auth from "../../utils/auth";
import LandingPageTitle from "./LandingPageTitle";
import LandingNav from "./LandingNav";
import LandingFooter from "./LandingFooter";
import Navabar from "../../components/Navbar";
import "./index.css";

const LandingPage = () => {
  // Reiceiving "landingPage" loading state set to loading from Navbar so when LandingPage is done rendering
  // pageLoading get set to false, sent to "LandingPageTirle" component to start css effects.
  const location = useLocation();
  const passData = location.state;
  let followPath = window.location.pathname;

  const [showLogin, setShowLogin] = useState(false);

  const [showParallax, setShowParallax] = useState("block");
  const [showLogin2, setShowLogin2] = useState("none");
  const [pageLoading, setPageLoading] = useState(true);

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

  window.onload = () => {
    setPageLoading(false);
  };
  window.onbeforeunload = () => {
    setPageLoading(true);
  };

  useEffect(() => {
    if (
      followPath === "/VerifyEmail" ||
      followPath === "/Login" ||
      followPath === "/ResetPassword" ||
      followPath === "/Signup"
    ) {
      setShowLogin("block");
    } else {
      setShowLogin("none");
    }
  }, [followPath]);

  useEffect(() => {
    if (passData) {
      setPageLoading(false);
    }
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
  }, [showLogin, showParallax, passData]);

  return (
    <>
      <header className="landing-nav">
        <Navabar />
      </header>
      <main
        className="container-main bg-primary"
        style={{ display: `${showParallax}` }}
      >
        <div className="parallax">
          <LandingNav
            handleLogout={handleLogout}
            setShowLogin2={setShowLogin2}
          />
          <div className="title">
            <LandingPageTitle pageLoading={pageLoading} />
          </div>
          <Outlet />
        </div>
        <div className="container-landing">
          <div className="text-title">
            <p className="first-title">
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
          <div className="text-title">
            <p className="first-title">
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
          <Outlet />
        </div>
      </div>
      <footer className="landing-footer">
        <LandingFooter />
      </footer>
    </>
  );
};
export default LandingPage;
