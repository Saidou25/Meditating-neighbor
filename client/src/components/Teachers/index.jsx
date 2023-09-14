import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";
import { FaEnvelope, FaIdBadge, FaHome, FaEllipsisH } from "react-icons/fa";
import profileIcon from "../../assets/images/profileicon.png";
import Spinner from "../Spinner";
import "./index.css";

const Teachers = () => {
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [users, setUsers] = useState("");

  const { data, loading } = useQuery(QUERY_USERS);

  let tmiTeacher = [];

  for (let user of users) {
    if (user.profile?.teacher === "teacher" || user.profile?.teacher === "Teacher") {
      tmiTeacher.push(user);
    }
  }
  useEffect(() => {
    if (data) {
      const usersInfo = data?.users || [];
      setUsers(usersInfo);
    }
  }, [data]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="teachers bg-primary pt-5">
      <h3 className="teachers-title text-light mb-5">Teachers in the US</h3>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="row scrolling-row">
            {tmiTeacher &&
              tmiTeacher.map((user) => (
                <div
                  className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6"
                  key={user._id}
                >
                  <div className="card teachers-cards bg-dark text-light mb-4">
                    <div id={user._id} className="row">
                      <div className="col-12">
                        <div className="card-header">
                          {user.profile.firstname && user.profile.lastname ? (
                            <h3>
                              {user.profile.firstname} {user.profile.lastname}
                            </h3>
                          ) : (
                            <h3>{user.username}</h3>
                          )}
                        </div>
                      </div>
                      <div className="card-body mt-3">
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
                              <p >{user.profile.story}</p>
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
                                    <h3
                                      className="modal-title text-black"
                                      id="exampleModalLabel"
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
                                      {selectedTeacher.location ? (
                                        <>
                                          <p className="p-fas mt-5">
                                            <FaIdBadge />{" "}
                                            {selectedTeacher.username}
                                          </p>
                                          <p>
                                            <FaHome />{" "}
                                            {selectedTeacher.location?.city},{" "}
                                            {selectedTeacher.location?.state}
                                          </p>
                                        </>
                                      ) : (
                                        <></>
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
                        {user.location?.city ? (
                          <p className="footer-teacher m-0 p-2">
                            {user.location?.city}, {user.location?.state}
                          </p>
                        ) : (
                          <p className="footer-teacher m-0 p-2">
                            Location unknown...
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};
export default Teachers;
