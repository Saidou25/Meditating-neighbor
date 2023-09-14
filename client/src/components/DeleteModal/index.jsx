import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  DELETE_PROFILE,
  DELETE_LOCATION,
  DELETE_AVATAR,
  DELETE_USER,
  DELETE_CONTACT,
  DELETE_REQUEST,
} from "../../utils/mutations";
import { storage } from "../../firebase";
import { ref, deleteObject } from "firebase/storage";
import Auth from "../../utils/auth";
import "./index.css";

const DeleteModal = ({
  profileId,
  savedUrl,
  avatarId,
  locationId,
  userId,
  myContacts,
  contactRequests,
}) => {
  console.log("from modal delete", myContacts);
  const [message, setMessage] = useState("");
  const [deleteLocation] = useMutation(DELETE_LOCATION);
  const [deleteProfile] = useMutation(DELETE_PROFILE);
  const [deleteAvatar] = useMutation(DELETE_AVATAR);
  const [deleteUser] = useMutation(DELETE_USER);
  const [deleteContact] = useMutation(DELETE_CONTACT);
  const [deleteRequest] = useMutation(DELETE_REQUEST);

  const logout = () => {
    Auth.logout();
    console.log("logout success!");
  };

  const storageRef = ref(storage, savedUrl);
  const toDelete = storageRef.fullPath;
  const imageRef = ref(storage, `${toDelete}`);

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
    setMessage("Your account has been deleted. Goodbye.");
    setTimeout(() => {
      logout();
    }, 3000);
  };

  const removeRequest = async (contactRequest) => {
    if (!contactRequest) {
      removeUser();
    } else {
      try {
        const { data } = await deleteRequest({
          variables: { id: contactRequest },
        });
        if (data) {
          console.log("success deleting request", data);
          removeUser();
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
  const requestDispatch = () => {
    if (contactRequests) {
      for (let contactRequest of contactRequests) {
        removeRequest(contactRequest);
      }
    }
    removeUser();
  };
  const removeContact = async (contactId) => {
    if (!contactId) {
      requestDispatch();
    } else {
      try {
        const { data } = await deleteContact({
          variables: { id: contactId },
        });
        if (data) {
          console.log("success deleting contact", data);
          requestDispatch();
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
  console.log(myContacts);
  const contactDispatch = () => {
    if (myContacts) {
      for (let contact of myContacts) {
        removeContact(contact);
      }
    }
    requestDispatch();
  };

  const removeLocation = async () => {
    if (!locationId) {
      contactDispatch();
    } else {
      try {
        const { data } = await deleteLocation({
          variables: { id: locationId },
        });
        if (data) {
          contactDispatch();
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const deleteObjAvatar = () => {
    deleteObject(imageRef)
      .then(() => {
        console.log(`${imageRef} deleted`);
      })
      .catch((error) => {
        console.log(error);
      });
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
          deleteObjAvatar();
        }
      } catch (e) {
        console.error(e);
      }
    }
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
      }
    }
  };

  return (
    <div className="footer-container-here bg-primary">
      <button
        type="button"
        className="btn btn-primary here-botton text-info px-2 pt-0"
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
        <div className="modal-dialog modal-dialog-centered">
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
              {message ? (
                <p className="info text-primary">{message}</p>
              ) : (
                <p className="info-delete text-primary m-5">
                  Are you sure you want to delete your account? This is
                  irreversible.
                </p>
              )}
            </div>
            <div className="modal-footer">
              <div className="row delete-modal">
                <div className="col row-delete-button">
                  <button
                    type="button"
                    className="btn btn-secondary col-delete-button"
                    data-bs-dismiss="modal"
                  >
                    cancel
                  </button>
                </div>
                <div className="col row-delete-confirm">
                  <button
                    type="button"
                    className="btn btn-primary col-delete-button"
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
      </div>
    </div>
  );
};
export default DeleteModal;
