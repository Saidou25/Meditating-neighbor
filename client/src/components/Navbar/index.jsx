import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  QUERY_ME,
  QUERY_AVATARS,
  QUERY_REQUESTS,
  QUERY_USERS,
  QUERY_CONTACTS,
} from "../../utils/queries";
import Auth from "../../utils/auth";
import profileIcon from "../../assets/images/profileicon.png";
import "./index.css";

const Navbar = () => {
  const [me, setMeData] = useState("");
  const [animation, setAnimation] = useState("");
  const [isContact, setIsContact] = useState(false);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    console.log("logout success!");
  };
  // query all my data
  const { data: meData } = useQuery(QUERY_ME);
  const username = me.username;

  // query all users data
  const { data: usersData } = useQuery(QUERY_USERS);

  // query all requests
  const { data: requestsData } = useQuery(QUERY_REQUESTS);

  //query all contacts

  const { data: contactsData } = useQuery(QUERY_CONTACTS);

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
  useEffect(() => {
    if (requestsData && meData && usersData && contactsData) {
      const myData = meData?.me || [];
      const contacts = contactsData?.contacts || [];
      const allRequests = requestsData?.requests || [];
      const users = usersData?.users || [];
      setMeData(myData);
      // setMyRequests(myData.requests);
      // filter all contact requests addressed to me
      const requestsToMe = allRequests.filter(
        (request) => request.destinationName === myData.username
      );
      let hasContact;
      for (let contact of contacts) {
        if (contact.username === myData.username) {
          hasContact = contact;
        }
      }
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
        (request) => request.myName === myData.username
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
      if (hasContact) {
        setIsContact(true);
      }
    }
  }, [requestsData, meData, usersData, contactsData]);

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
              {Auth.loggedIn() && (
                <>
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
                  {animation && (
                    <li className="nav-item">
                      <Link className={`nav-link ${animation}`} to="/Contacts">
                        contacts
                      </Link>
                    </li>
                  )}
                  {isContact === true && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/Contacts">
                        contacts
                      </Link>
                    </li>
                  )}
                </>
              )}
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
