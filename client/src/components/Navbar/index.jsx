import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_REQUESTS, QUERY_CONTACTS } from "../../utils/queries";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import dropDownLinks from "../../data/navbarData";
import Auth from "../../utils/auth";
import profileIcon from "../../assets/images/profileicon.png";
import "./index.css";

const Navbar = () => {
  const { data: meData } = useQuery(QUERY_ME);
  const me = meData?.me || [];
  const { data: requestsData } = useQuery(QUERY_REQUESTS);
  const allRequests = requestsData?.requests || [];
  const { data: contactsData } = useQuery(QUERY_CONTACTS);
  const contacts = contactsData?.contacts || [];

  const myContacts = contacts?.filter(
    (contact) =>
      contact.username === me.username || contact.friendUsername === me.username
  );

  const requestsToMe = allRequests?.filter(
    (request) => request.destinationName === me.username
  );

  const myRequests = allRequests?.filter(
    (request) => request.myName === me.username
  );

  const logout = () => {
    Auth.logout();
    console.log("logout success!");
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("firebase signout succes");
        logout();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
        <div className="container-fluid">
          {Auth.loggedIn() ? (
            <>
              <Link className="navbar-brand" to="/" state={{ passData: true }}>
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
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/Members">
                      members
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
                      locate
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

                  {!myContacts.length &&
                  (requestsToMe.length || myRequests.length) ? (
                    <li className="nav-item">
                      <Link className="nav-link blinking-link" to="/Contacts">
                        contacts
                      </Link>
                    </li>
                  ) : null}
                  {myContacts.length ? (
                    <li className="nav-item">
                      <Link
                        className={
                          requestsToMe.length || myRequests.length
                            ? "nav-link blinking-link"
                            : "nav-link"
                        }
                        to="/Contacts"
                      >
                        contacts
                      </Link>
                    </li>
                  ) : null}
                  <li className="nav-item">
                    <button className="nav-link" onClick={handleLogout}>
                      <div className="logout py-0">logout</div>
                    </button>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-light fs-4" to="/Profile">
                      <img
                        className="icon-nav"
                        src={
                          !me?.avatar?.avatarUrl
                            ? profileIcon
                            : me?.avatar?.avatarUrl
                        }
                        alt="profile icon"
                      />
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="row tmiworld1 g-0">
                <div className="col-6 tmi g-0">TMI</div>
                <div className="col-6 world g-0">WORLD</div>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
export default Navbar;
