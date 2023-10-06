import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import Auth from "../../utils/auth";
import useMyContacts from "../../utils/UseMyContacts";
import useMyRequests from "../../utils/UseMyRequests";
import useUsersInfo from "../../utils/UseUsersInfo";
import profileIcon from "../../assets/images/profileicon.png";
import "./index.css";

const Navbar = () => {
  const [animation, setAnimation] = useState("");
  const [isContact, setIsContact] = useState(false);

  const { me, myContacts, allContacts } = useMyContacts();
  const { users } = useUsersInfo();
  const { usersIncomingRequestProfiles, outgoingRequests } = useMyRequests();
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

  const logout = () => {
    Auth.logout();
    console.log("logout success!");
  };

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
    if (
      usersIncomingRequestProfiles ||
      outgoingRequests ||
      myContacts ||
      allContacts ||
      users ||
      me
    ) {
      if (usersIncomingRequestProfiles.length || outgoingRequests.length) {
        setAnimation("contact-link");
      }
      if (myContacts?.length) {
        setIsContact(true);
      }
    }
  }, [
    usersIncomingRequestProfiles,
    outgoingRequests,
    myContacts,
    allContacts,
    users,
    me,
  ]);
  
  return (
    <>
      <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
        <div className="container-fluid">
          {Auth.loggedIn() ? (
            <>
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
                  <li className="nav-item">
                    <Link className="nav-link" to="/Neighbors">
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
                  {animation && (
                    <li className="nav-item">
                      <Link className={`nav-link ${animation}`} to="/Contacts">
                        contacts
                      </Link>
                    </li>
                  )}
                  {isContact === true && !animation && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/Contacts">
                        contacts
                      </Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      <div className="logout">logout</div>
                    </button>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-light fs-4" to="/Profile">
                      <img
                        className="icon-nav"
                        src={
                          !me.avatar?.avatarUrl
                            ? profileIcon
                            : me.avatar?.avatarUrl
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
              {" "}
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
