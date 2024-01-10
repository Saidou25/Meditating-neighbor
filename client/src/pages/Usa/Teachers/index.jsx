import React, { useState, useEffect } from "react";
import { FaEllipsisH } from "react-icons/fa";
import ModalReuse from "../../../components/ModalReuse";
import Image from "../../../components/Image";
import useUsersInfo from "../../../Hooks/UseUsersInfo";
import TeacherMediaScreen from "./TeacherMediaScreen";
import profileIcon from "../../../assets/images/profileicon.png";
// import Spinner from "../Spinner";
import "./index.css";

const Teachers = () => {
  const [data, setData] = useState({ userInfo: "", date: "" });
  const [tmiTeacher, setTmiTeacher] = useState("");
  const [showModal, setShowModal] = useState(false);

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
      <div className="container-fluid teachers show-teachers bg-primary">
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
                          <Image src={
                              user.avatar?.avatarUrl
                                ? user.avatar?.avatarUrl
                                : profileIcon
                            }
                            alt="default profile icon or user's profile picture"
                            style={{ borderRadius: "50%" }}
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
                            onClick={() => {
                              setData({
                                userInfo: user,
                                date: "",
                              });
                              setShowModal(true);
                            }}
                          >
                            <div className="teacher-icon-col">
                              <FaEllipsisH className="teacher-icon" />
                            </div>
                          </button>
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
        {showModal && <ModalReuse hideModal={setShowModal} data={data} />}
      </div>
      <div className="hide">
        <TeacherMediaScreen tmiTeacher={tmiTeacher} />
      </div>
    </>
  );
};
export default Teachers;
