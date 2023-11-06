import React, { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import ModalReuse from "../../../../components/ModalReuse";
import profileIcon from "../../../../assets/images/profileicon.png";
import "./index.css";

// This component displays profile picture and username for smaller screens. Cards didn't look good for smaller screens.
const TeacherMediaScreen = ({ tmiTeacher }) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({ userInfo: "", date: "" });

  return (
    <>
      <div className="teachers-cards bg-primary">
        <div className="row card-row m-0">
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
                      onClick={() => {
                        setData({
                          userInfo: user,
                          date: "",
                        });
                        setShowModal(true);
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
        {showModal && <ModalReuse hideModal={setShowModal} data={data} />}
      </div>
    </>
  );
};
export default TeacherMediaScreen;
