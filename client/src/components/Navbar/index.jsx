import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import profileIcon from "../../assets/images/profileicon.png";
import "./index.css";

const Navbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    console.log("logout success!");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">
          meditating neighbor
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
        <div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-light fs-4" to="/Map">
              map
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light fs-4" to="/ProfPics">
              pics
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light fs-4" to="/Usa">
                usa
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link text-light fs-4" to="/Neighbors">
                nearby
              </Link>
            </li>
            {Auth.loggedIn ? (
              <li className="nav-item">
                <button className="btn-logout" onClick={logout}>
                  <div className="logout text-light">logout</div>
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link text-light fs-4" to="/LoginSignup">
                  login/signup
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link text-light fs-4" to="/Profile">
                <img src={profileIcon} alt="profile icon" height={43} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
