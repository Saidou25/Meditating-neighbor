import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";
import "./index.css";

const ProfileModal = (props) => {
  const { data: usersData } = useQuery(QUERY_USERS);
  const users = usersData?.users || [];
  //   console.log('users', users)
  const [userData, setData] = useState("");
  const selectedUser = users.filter(
    (user) => user.username === userData.username
  );
  //   console.log(userData.username)
  console.log(selectedUser[0]?.username);

  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        onClick={() => setData(props)}
      >
        view profile
      </button>

      {/* <!-- Modal --> */}
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
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                {selectedUser[0]?.username}
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
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                // onClick={findData}
              >
                request friendship
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileModal;
