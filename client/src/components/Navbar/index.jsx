import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_AVATARS } from "../../utils/queries";
import Auth from "../../utils/auth";
import profileIcon from "../../assets/images/profileicon.png";
import "./index.css";

const Navbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    console.log("logout success!");
  };
  const { data } = useQuery(QUERY_ME);
  const me = data?.me || [];
  const username = me.username;

  // getting user's avatar by filtering [avatars] so profile picture in navbar can be updated right away
  const { data: avatarsData } = useQuery(QUERY_AVATARS);
  const avatars = avatarsData?.avatars || [];
  const myAvatar = avatars.filter((avatar) => avatar.username === username);
  const savedUrl = myAvatar[0]?.avatarUrl;

  const dropDownLinks = [
    {
      linkName: "Usa",
      linkTo: "/Usa",
    },
    {
      linkName: "Map",
      linkTo: "/Map",
    },
    {
      linkName: "Europe(coming soon)",
      linkTo: "/",
    },
    {
      linkName: "Austalia(coming soon)",
      linkTo: "/",
    },
    {
      linkName: "UK(coming soon",
      linkTo: "/",
    },
  ];

  return (
    <>
      <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <div className="row tmiworld">
              <div className="col-6 tmi g-0">TMI</div>
              <div className="col-6 world g-0">WORLD</div>
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              {/* <li className="nav-item">
                <Link className="nav-link active" to="">
                  Home
                  <span className="visually-hidden">(current)</span>
                </Link>
              </li> */}
              {Auth.loggedIn() && (
                <>
              <li className="nav-item">
                <Link className="nav-link" to="/Neighbors">
                  nearby
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  to=""
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  >
                  search country
                </Link>
                <div className="dropdown-menu">
                  {dropDownLinks &&
                    dropDownLinks.map((dropDownLink, index) => (
                      <div key={index} className="drop-div">
                        <Link
                          className="dropdown-item"
                          to={`${dropDownLink.linkTo}`}
                        >
                          {dropDownLink.linkName}
                        </Link>
                      </div>
                    ))}
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="">
                    Separated link
                  </Link>
                </div>
              </li>
              </> )}
              {Auth.loggedIn() ? (
                <li className="nav-item">
                  <button className="nav-link" onClick={logout}>
                    <div className="logout">logout</div>
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link fs-4" to="/LoginSignup">
                    login/signup
                  </Link>
                </li>
              )}
              {Auth.loggedIn() && (
              <li className="nav-item">
                <Link className="nav-link text-light fs-4" to="/Profile">
                  <img
                    className="icon-nav"
                    src={!savedUrl ? profileIcon : savedUrl}
                    alt="profile icon"
                  />
                </Link>
              </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
