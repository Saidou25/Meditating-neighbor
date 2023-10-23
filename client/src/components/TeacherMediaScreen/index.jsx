import React, { useState } from "react";
import { FaIdBadge, FaHome, FaEllipsisH } from "react-icons/fa";
import profileIcon from "../../assets/images/profileicon.png";
import "./index.css";

// This component displays profile picture and username for smaller screens. Cards didn't look good for smaller screens.
const TeacherMediaScreen = ({ tmiTeacher }) => {
  const [selectedTeacher, setSelectedTeacher] = useState("");

  return (
    <>
      <div className="teachers-cards bg-primary">
        {/* <> */}
          <div className="row card-row">
            {tmiTeacher &&
              tmiTeacher.map((user) => (
                <div
                  key={user._id}
                  className="col-xxl-3 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4"
                >
                  <div className="card-body">
                    <div className="icon-container">
                      <button
                        className="btn btn-profile "
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal2"
                        onClick={() => {
                          setSelectedTeacher(user);
                        }}
                      >
                        <FaEllipsisH className="icon2" />
                      </button>
                    </div>
                    <div className="row profiles-row">
                      <div className="col-12 profiles-column">
                        <img
                          className="contact-pic"
                          src={
                            user.avatar?.avatarUrl
                              ? user.avatar?.avatarUrl
                              : profileIcon
                          }
                          alt="profile avatar"
                        />
                      </div>
                      <div className="col-12 profiles-column">
                        <p className="location my-4 text-light">
                          {user.username}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div
            className="modal fade"
            id="exampleModal2"
            // data-bs-backdrop="static"
            // data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="exampleModa2lLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  {selectedTeacher.profile?.firstname &&
                  selectedTeacher.profile?.lastname ? (
                    <h3
                      className="modal-title text-black"
                      id="exampleModal2Label"
                    >
                      {selectedTeacher.profile.firstname}{" "}
                      {selectedTeacher.profile.lastname}
                    </h3>
                  ) : (
                    <h3>{selectedTeacher.username}</h3>
                  )}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body contact-body">
                  <div className="contact-avatar m-4">
                    <img
                      className="contact-pic-mediascreen"
                      src={
                        selectedTeacher.avatar?.avatarUrl
                          ? selectedTeacher.avatar?.avatarUrl
                          : profileIcon
                      }
                      alt="profile icon"
                    />
                  </div>
                  <div className="row contact-profile-modal">
                    <div className="col-12">
                      {selectedTeacher.profile?.story ? (
                        <>
                          <h4 className="about-title mt-5 mb-4">About</h4>{" "}
                          <p className="p-story-profile-contact mt-5 mb-4">
                            {selectedTeacher.profile.story}
                          </p>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="col-12">
                      <div className="p-info text-primary mb-4">
                        <h4 className="info-teacher text-primary mt-5 mb-4">
                          Info
                        </h4>{" "}
                        {selectedTeacher.profile ? (
                          <div className="p-about mt-5 mb-4">
                            <p>Teacher(TMI)</p>
                            <p>
                              Has been meditating for{" "}
                              {selectedTeacher?.profile.years} years
                            </p>
                            <p>
                              Currently working on stage{" "}
                              {selectedTeacher.profile.stage}
                            </p>
                          </div>
                        ) : (
                          <></>
                        )}
                        <div className="p-about mt-5 mb-4">
                          <p>
                            <FaIdBadge /> {selectedTeacher.username}
                          </p>
                          {/* <p>
                              <FaEnvelope /> {user.friendUser?.email}
                            </p> */}
                          <p>
                            <FaHome /> {selectedTeacher.location?.city},{" "}
                            {selectedTeacher.location?.state}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="row contact-footer">
                    {/* <div className="col-8 friends-since m-0">
                        <p className="friends-since text-primary">
                          Friends since: {user.date}
                        </p>
                      </div> */}
                    <div className="col-4 mediascreen-col">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={() => {
                          setSelectedTeacher("");
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/* </> */}
      </div>
    </>
  );
};
export default TeacherMediaScreen;
