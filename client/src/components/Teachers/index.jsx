import React, { useState, useEffect } from "react";
import { FaIdBadge, FaHome, FaEllipsisH } from "react-icons/fa";
import useUsersInfo from "../../Hooks/UseUsersInfo";
import TeacherMediaScreen from "../TeacherMediaScreen";
import profileIcon from "../../assets/images/profileicon.png";
// import Spinner from "../Spinner";
import "./index.css";

const Teachers = () => {
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [tmiTeacher, setTmiTeacher] = useState("");
  // importing all users from useUsersInfo hook
  const { users } = useUsersInfo();

  useEffect(() => {
    let teachers = [];
    if (users) {
      // getting all teacher from all users using a for of loop and pushing to [tmiTeacher] to display in page using a map().
      for (let user of users) {
        if (user.profile?.teacher === "teacher") {
          teachers.push(user);
        }
      }
      setTmiTeacher(teachers);
    }
  }, [users]);

  // if (loading) {
  //   return <Spinner />;
  // }
  return (
    <>
      {tmiTeacher.length ? (
        <h3 className="teachers-title text-light my-5">Teachers in the US</h3>
      ) : (
        <></>
      )}
      <div className="teachers show-teachers bg-primary">
        {/* {loading ? ( */}
        {/* <Spinner /> */}
        {/* ) : ( */}

        <div className="row">
          {tmiTeacher &&
            tmiTeacher.map((user) => (
              <div
                className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6"
                key={user._id}
              >
                <div className="card teachers-cards bg-dark text-light mb-4">
                  <div id={user._id} className="row">
                    <div className="col-12">
                      <div className="card-header">
                        {user.profile.firstname && user.profile.lastname ? (
                          <h5>
                            {user.profile.firstname} {user.profile.lastname}
                          </h5>
                        ) : (
                          <h5>{user.username}</h5>
                        )}
                      </div>
                    </div>
                    <div className="card-body mt-3 mx-2">
                      <div className="row">
                        <div className="col-4 teachers-pic-col">
                          <img
                            className="teachers-pic p-2"
                            src={
                              user.avatar?.avatarUrl
                                ? user.avatar?.avatarUrl
                                : profileIcon
                            }
                            alt="profile avatar"
                          />
                        </div>
                        {user.profile.story ? (
                          <div className="col-8 story">
                            <p>{user.profile.story}</p>
                          </div>
                        ) : (
                          <></>
                        )}

                        <div className="teacher-btn-col">
                          <button
                            type="button"
                            className="btn btn-teacher-modal mt-2"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => {
                              setSelectedTeacher(user);
                            }}
                          >
                            <div className="teacher-icon-col">
                              <FaEllipsisH className="teacher-icon" />
                            </div>
                          </button>
                        </div>
                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                              <div className="modal-header">
                                {selectedTeacher.profile?.firstname &&
                                selectedTeacher.profile?.lastname ? (
                                  <h4
                                    className="modal-title text-black"
                                    id="exampleModalLabel"
                                  >
                                    {selectedTeacher.profile.firstname}{" "}
                                    {selectedTeacher.profile.lastname}
                                  </h4>
                                ) : (
                                  <h4>{selectedTeacher.username}</h4>
                                )}
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body body-teachers ">
                                <div className="teachers-avatar-col m-4">
                                  <img
                                    className="teachers-avatar"
                                    src={
                                      selectedTeacher.avatar?.avatarUrl
                                        ? selectedTeacher.avatar?.avatarUrl
                                        : profileIcon
                                    }
                                    alt="profile avatar"
                                  />
                                </div>
                                <div className="p-items text-primary">
                                  {selectedTeacher.profile?.story ? (
                                    <>
                                      <h4 className="p-about mt-5 mb-4">
                                        About
                                      </h4>
                                      <p className="p-story-teachers mt-5 mb-4">
                                        {selectedTeacher.profile.story}
                                      </p>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div className="p-info text-primary mb-4">
                                  <h4 className="p-about mt-5 mb-4">Info</h4>
                                  {selectedTeacher.profile ? (
                                    <div className="p-about-teachers mt-5 mb-4">
                                      <p>
                                        Has been meditating for{" "}
                                        {selectedTeacher?.profile.years} years
                                      </p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  <div className="p-about-teachers mt-5 mb-4">
                                    <p>
                                      <FaIdBadge /> {selectedTeacher.username}
                                    </p>
                                    {selectedTeacher.location?.city &&
                                    selectedTeacher.location?.state ? (
                                      <p>
                                        <FaHome />{" "}
                                        {selectedTeacher.location?.city},{" "}
                                        {selectedTeacher.location?.state}
                                      </p>
                                    ) : (
                                      <p>No location yet</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="modal-footer teacher-footer text-primary px-4">
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
                    <div className="card-footer footer-teacher">
                      {user.location?.city && (
                        <p className="footer-teacher m-0 p-2">
                          {user.location?.city}, {user.location?.state}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="hide">
        <TeacherMediaScreen tmiTeacher={tmiTeacher} />
      </div>
    </>
  );
};
export default Teachers;
