import React, { useState, useEffect } from "react";
// import { useQuery } from "@apollo/client";
// import { QUERY_USERS } from "../../utils/queries";
import profileIcon from "../../assets/images/profileicon.png";
import "./index.css";

const ModalReadMore = ({ userId }) => {
  const [teacherId, setTeacherId] = useState("");
  
  
  console.log("userId", userId)
  console.log("teacher id", teacherId);

  // useEffect(() => {
  //   if (userId) {
  //     setTeacherId(userId);

  //   }
  // }, [userId]);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#${teacherId}`}
        onClick={() => setTeacherId(userId)}
      >
        Launch demo modal
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
              <h1 className="modal-title fs-5 text-black" id="exampleModalLabel">
                {teacherId}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setTeacherId("")}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ModalReadMore;
