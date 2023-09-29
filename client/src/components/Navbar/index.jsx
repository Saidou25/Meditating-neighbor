import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  QUERY_AVATARS,
  QUERY_REQUESTS,
  QUERY_USERS,
} from "../../utils/queries";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import Auth from "../../utils/auth";
import useHooks from "../../utils/UseHooks";
import profileIcon from "../../assets/images/profileicon.png";
import "./index.css";

const Navbar = () => {
  const [animation, setAnimation] = useState("");
  const [isContact, setIsContact] = useState(false);
  const { me, myContacts } = useHooks();

  // query all users data
  const { data: usersData } = useQuery(QUERY_USERS);

  // query all requests
  const { data: requestsData } = useQuery(QUERY_REQUESTS);

  // getting user's avatar by filtering [avatars] so profile picture in navbar can be updated right away
  const { data: avatarsData } = useQuery(QUERY_AVATARS);
  const avatars = avatarsData?.avatars || [];
  const myAvatar = avatars.filter((avatar) => avatar.username === me?.username);
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
    if (requestsData && me && usersData && myContacts) {
      const allRequests = requestsData?.requests || [];
      const users = usersData?.users || [];
      // setMyRequests(myData.requests);
      const requestsToMe = allRequests.filter(
        (request) => request.destinationName === me.username
      );
      const fromUsers = [];
      //  loop to all request to get profiles of the people requesting my contact and
      //  push them into a list "fromUsers" to set "setRequestingUsersProfiles()" so profiles can be rendered in DOM.
      for (let userRequest of requestsToMe) {
        const requestingUsers = users.filter(
          (user) => user.username === userRequest.myName
        );
        fromUsers.push(requestingUsers[0]);
      }
      const toOthers = [];
      //  loop to all request to get profiles of the people i am requesting contact info from and
      //  push them into a list "toOthers" to set "MyContactRequestsToOthers" so their profiles can be rendered in DOM thru a map()
      const requestsFromMe = allRequests.filter(
        (request) => request.myName === me.username
      );
      // console.log("requests from me for others", requestsFromMe)
      for (let requestFromMe of requestsFromMe) {
        const requestedUsers = users.filter(
          (user) => user.username === requestFromMe.destinationName
        );
        toOthers.push(requestedUsers[0]);
      }

      if (fromUsers.length || toOthers.length) {
        setAnimation("contact-link");
      }
      if (myContacts) {
        setIsContact(true);
      }
    }
  }, [requestsData, me, usersData, myContacts]);

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
                        src={!savedUrl ? profileIcon : savedUrl}
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
