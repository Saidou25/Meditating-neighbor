import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";
import Navbar from "../Navbar";
import Footer from "../Footer";
import profileIcon from "../../assets/images/profileicon.png";
import { FaEllipsisH } from "react-icons/fa";
import "./index.css";

const ProfileList = (props) => {
  const seventyFiveMiles = props.seventyFiveMiles;
  const overSeventyFiveMiles = props.overSeventyFiveMiles;

  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("");

  const [user, setUser] = useState("");
  const { data: usersData } = useQuery(QUERY_USERS);

  const contact = () => {
    console.log("contact requested from, ", props.me.email);
  };

  useEffect(() => {
    if (usersData && username) {
      const users = usersData?.users || [];
      const selectedUser = users.filter((user) => user.username === username);
      setUser(selectedUser[0]);
    }
  }, [usersData, username]);

  return (
    <>
      <Navbar />
      <div className="container-neighbors bg-primary">
        <h3 className="locations-list-title text-white">
          {seventyFiveMiles.length ? <>Within a 75 miles radius</> : <></>}
        </h3>

        <div className="row card-row">
          {seventyFiveMiles &&
            seventyFiveMiles.map((distanceObj, index) => (
              <div key={index} className="col-3 card-column">
                <div className="card card-locations bg-primary">
                  <div className="card-body">
                    <div className="icon-container">
                      <button
                        className="btn btn-profile "
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        onClick={() => {
                          setAvatarUrl(distanceObj.avatarUrl);
                          setUsername(distanceObj.username);
                        }}
                      >
                        <FaEllipsisH className="icon" />
                      </button>
                    </div>
                    <div className="row profiles-row">
                      <div className="col-12 profiles-column">
                        {!distanceObj.avatarUrl ? (
                          <img
                            className="container-pic mb-4"
                            src={profileIcon}
                            alt="profile icon"
                            // style={{ width: 150, height: 150 }}
                          />
                        ) : (
                          <img
                            className="container-pic mb-4"
                            src={distanceObj.avatarUrl}
                            alt="profile icon"
                            // style={{ width: 150, height: 150 }}
                          />
                        )}
                      </div>
                      <div className="col-12 profiles-column">
                        <p className="location text-light">
                          {distanceObj.username}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <h3 className="locations-list-title text-white">
          Over a 75 miles radius
        </h3>
        <div className="row card-row">
          {overSeventyFiveMiles &&
            overSeventyFiveMiles.map((distanceObj, index) => (
              <div key={index} className="col-3 card-column">
                <div className="card card-locations bg-primary">
                  <div className="card-body">
                  <div className="icon-container">
                      <button
                        className="btn btn-profile "
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        onClick={() => {
                          setAvatarUrl(distanceObj.avatarUrl);
                          setUsername(distanceObj.username);
                        }}
                      >
                        <FaEllipsisH className="icon" />
                      </button>
                    </div>
                    <div className="row profiles-row">
                      <div className="col-12 profiles-column">
                        {!distanceObj.avatarUrl ? (
                          <img
                            className="container-pic mb-4"
                            src={profileIcon}
                            alt="profile icon"
                            // style={{ width: 150, height: 150 }}
                          />
                        ) : (
                          <img
                            className="container-pic mb-4"
                            src={distanceObj.avatarUrl}
                            alt="profile icon"
                            // style={{ width: 150, height: 150 }}
                          />
                        )}
                      </div>
                      <div className="col-12 profiles-column">
                        <p className="location text-light">
                          {distanceObj.username}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <button
                    className="btn bg-primary text-light"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={() => {
                      setAvatarUrl(distanceObj.avatarUrl);
                      setUsername(distanceObj.username);
                    }}
                  >
                    view profile
                  </button> */}
                </div>
              </div>
            ))}
        </div>
       
          <div
            className="modal fade"
            id="staticBackdrop"
            // data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <>
                  <div className="modal-header">
                    <h3 className="modal-title fs-5" id="staticBackdropLabel">
                      {user.username}
                    </h3>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-6">
                        {" "}
                        {user.avatar?.avatarUrl ? (
                          <img
                            className="container-pic mb-4"
                            src={avatarUrl}
                            alt="profile icon"
                            style={{ width: 150, height: 150 }}
                          />
                        ) : (
                          <img
                            className="container-pic mb-4"
                            src={profileIcon}
                            alt="profile icon"
                            style={{ width: 150, height: 150 }}
                          />
                        )}
                      </div>
                      <div className="col-6">
                        {" "}
                        <div className="location">
                          <p>teacher(TMI)</p>
                          <p>meditating since: 2010</p>
                          <p>frequency: 7hrs/week</p>
                          <p>
                            leaves in {user.location?.city},{" "}
                            {user.location?.state}, {user.location?.country}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      setAvatarUrl("");
                      setUsername("");
                    }}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={contact}
                  >
                    request friendship
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div>
      <Footer />
    </>
  );
};
export default ProfileList;
