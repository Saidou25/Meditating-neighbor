import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";
import profileIcon from "../../assets/images/profileicon.png";
import "./index.css";

const Teachers = () => {
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [users, setUsers] = useState("");

  const { data, loading } = useQuery(QUERY_USERS);

  let tmiTeacher = [];

  for (let user of users) {
    if (user.profile?.teacher) {
      tmiTeacher.push(user);
    }
  }
  useEffect(() => {
    if (data) {
      const usersInfo = data?.users || [];
      setUsers(usersInfo);
    }
  }, [data]);
  return (
    <div className="teachers bg-primary pt-5">
      <h3 className="teachers-title text-light mb-5">Teachers in the US</h3>

      <div className="row">
        {tmiTeacher &&
          tmiTeacher.map((user) => (
            <div
              className="col-xxl-4 col-xl-6 col-lg-6 col-md-6 col-sm-12"
              key={user._id}
            >
              <div className="card teachers-cards bg-dark text-light mb-4">
                <div id={user._id} className="row">
                  <div className="col-12">
                    <div className="card-header">
                      <h4>{user.username}</h4>
                    </div>
                    <div className="card-body mt-3">
                      <div className="row">
                        <div className="col-4 teachers-pic-col">
                          <img
                            className="teachers-pic"
                            src={
                              user.avatar?.avatarUrl
                                ? user.avatar?.avatarUrl
                                : profileIcon
                            }
                            alt="profile avatar"
                          />
                        </div>
                        <div className="col-8 story">
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Perferendis nobis voluptate voluptas quisquam
                            voluptates adipisci expedita iusto Lorem ipsum,
                            dolor sit amet consectetur adipisicing elit.
                            Molestiae, eum? Vel dignissimos dolores aliquam nam,
                            voluptates iste hic et perspiciatis explicabo in
                            labore dolorem, molestiae est ad, delectus vero
                            soluta!
                          </p>
                        </div>
                        <button
                          type="button"
                          className="btn btn-teacher-modal btn-primary mt-4 mb-5"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => {
                            setSelectedTeacher(user);
                          }}
                        >
                          read more
                        </button>

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
                                <h1
                                  className="modal-title text-black fs-5"
                                  id="exampleModalLabel"
                                >
                                  {selectedTeacher.username}
                                </h1>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                {/* <div className="row m-4">
                                    <div className="col-4"> */}
                                <img
                                  className="teachers-avatar"
                                  src={
                                    selectedTeacher.avatar?.avatarUrl
                                      ? selectedTeacher.avatar?.avatarUrl
                                      : profileIcon
                                  }
                                  alt="profile avatar"
                                />

                                <div className="p-items text-primary mt-5">
                                  <h4>About</h4>
                                  <p>
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Magni asperiores amet
                                    aliquam, obcaecati ducimus inventore
                                    laudantium, repudiandae, tenetur at ut sequi
                                    quod veritatis explicabo et eos expedita
                                    nesciunt ullam nulla.
                                  </p>
                                  <p>
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Magni asperiores amet
                                    aliquam, obcaecati ducimus inventore
                                    laudantium, repudiandae, tenetur at ut sequi
                                    quod veritatis explicabo et eos expedita
                                    nesciunt ullam nulla.
                                  </p>
                                </div>
                                <div className="p-info text-primary mt-5">
                                  <h4>Info</h4>
                                  <p>
                                    Has been meditating for{" "}
                                    {selectedTeacher.profile?.years} years
                                  </p>
                                  <p>
                                    Currently working on stage{" "}
                                    {selectedTeacher.profile?.stage}
                                  </p>
                                  <p>
                                    Leaves in {selectedTeacher.location?.city},{" "}
                                    {selectedTeacher.location?.state}
                                  </p>
                                </div>
                                {/* </div> */}
                              </div>
                              <div className="modal-footer text-primary">
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
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                >
                                  Save changes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <p>
                            Has been meditating for {user.profile?.years} years
                          </p>
                          <p>Currently at stage {user.profile?.stage}</p>
                          <p>certified</p>
                          <p>in progress</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <p className="col-12">
                      {user.location?.city}, {user.location?.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Teachers;
