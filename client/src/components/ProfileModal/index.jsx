import React, { useState, useEffect } from "react";
// import { useQuery } from "@apollo/client";
// import { QUERY_USERS } from "../../utils/queries";
import "./index.css";

const ProfileModal = (props) => {
  const [userData, setData] = useState("");
  const [user, setUser] = useState("");
  console.log("user", user);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        type="input"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        onClick={() => setData(props)}
      >
        view profile
      </button>
      {/* {user ? ( */}
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
               {/* {user ? ( */}
                <>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  {props.username}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <img
                  className="container-pic mb-4"
                  src={userData.avatarUrl}
                  alt="profile icon"
                  style={{ width: 150, height: 150 }}
                />
              </div>
              </>
               {/* ) : (<p>Humm...</p>)} */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  // onClick={resetData}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  // onClick={() => setData("")}
                >
                  request friendship
                </button>
              </div>
            </div>
          </div>
        </div>
      {/* ) : (<p>Humm...</p>)} */}
    </>
  );
};
export default ProfileModal;
