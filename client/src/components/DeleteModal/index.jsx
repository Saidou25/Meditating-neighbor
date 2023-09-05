import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  DELETE_PROFILE,
  DELETE_LOCATION,
  DELETE_AVATAR,
  DELETE_USER,
  // DELETE_CONTACT
} from "../../utils/mutations";
import Auth from "../../utils/auth";
import Success from "../Success";
// import "./index.css";

const DeleteModal = ({ profileId, avatarId, locationId, userId }) => {
  const [message, setMessage] = useState("");
  const [deleteLocation] = useMutation(DELETE_LOCATION);
  const [deleteProfile] = useMutation(DELETE_PROFILE);
  const [deleteAvatar] = useMutation(DELETE_AVATAR);
  const [deleteUser] = useMutation(DELETE_USER);
  // const [deleteContact] = useMutation(DELETE_CONTACT);

  const logout = () => {
    Auth.logout();
    console.log("logout success!");
  };

  const removeProfile = async () => {
    if (!profileId) {
      removeAvatar();
    } else {
      try {
        const { data } = await deleteProfile({
          variables: { id: profileId },
        });
        if (data) {
          console.log("success deleting profile");
          removeAvatar();
        }
      } catch (e) {
        console.error(e);
      };
    }
  };

  const removeAvatar = async () => {
    if (!avatarId) {
      removeLocation();
    } else {
      try {
        const { data } = await deleteAvatar({
          variables: { id: avatarId },
        });
        if (data) {
          console.log("success deleting avatar");
          removeLocation();
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const removeLocation = async () => {
    if (!locationId) {
      removeUser();
    } else {
      try {
        const { data } = await deleteLocation({
          variables: { id: locationId },
        });
        if (data) {
          console.log("success deleting location");
          removeUser();
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
  // const removeContact = async () => {
  //   if (!contactId) {
  //     removeUser();
  //   } else {
  //     try {
  //       const { data } = await deleteContact({
  //         variables: { id: contactId },
  //       });
  //       if (data) {
  //         console.log("success deleting location");
  //         removeUser();
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  // };
  const removeUser = async () => {
    try {
      const { data } = await deleteUser({
        variables: { id: userId },
      });
      if (data) {
        console.log("success deleting user");
      }
    } catch (e) {
      console.error(e);
    }
    // logout();
    console.log("success");
    // setMessage("Your account has been deleted. Goodbye.");
    // setTimeout(() => {
    //   logout();
    //   setMessage("");
    // }, 3000);
  };

  if (message) {
    return <Success message={message} />;
  }
  return (
    <div className="footer-container bg-primary">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        here
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Confirmation
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="info text-primary">
                Are you sure you want to delete your account? This is
                irreversible.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  removeProfile();
                }}
              >
                confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;
