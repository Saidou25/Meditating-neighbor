import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  DELETE_PROFILE,
  DELETE_LOCATION,
  DELETE_AVATAR,
  DELETE_USER,
  DELETE_CONTACT,
} from "../../utils/mutations";
import { storage } from "../../firebase";
import { ref, deleteObject } from "firebase/storage";
import Auth from "../../utils/auth";
// import "./index.css";

const DeleteModal = ({
  profileId,
  savedUrl,
  avatarId,
  locationId,
  userId,
  myContacts,
}) => {
  // const [contactId, setContactId] = useState("");
  const [message, setMessage] = useState("");
  const [deleteLocation] = useMutation(DELETE_LOCATION);
  const [deleteProfile] = useMutation(DELETE_PROFILE);
  const [deleteAvatar] = useMutation(DELETE_AVATAR);
  const [deleteUser] = useMutation(DELETE_USER);
  const [deleteContact] = useMutation(DELETE_CONTACT);

  const logout = () => {
    Auth.logout();
    console.log("logout success!");
  };

  const storageRef = ref(storage, savedUrl);
  const toDelete = storageRef.fullPath;
  const imageRef = ref(storage, `${toDelete}`);

  const removeUser = async () => {
    console.log("in user");
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

  const removeContact = async (contactId) => {
    if (!contactId) {
      console.log("no contact");
      removeUser();
    } else {
      try {
        const { data } = await deleteContact({
          variables: { id: contactId },
        });
        if (data) {
          console.log("success deleting contact", data);
          removeUser();
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
  const contactDispatch = () => {
    console.log("in dispatch");
    if (myContacts) {
      console.log(myContacts);
      for (let contact of myContacts) {
        const contactId = contact._id;
        console.log("no contact from dispatch");
        removeContact(contactId);
      }
    }
    console.log("moving to user");
    removeUser();
  };

  const removeLocation = async () => {
    if (!locationId) {
      console.log("non location");
      contactDispatch();
    } else {
      try {
        const { data } = await deleteLocation({
          variables: { id: locationId },
        });
        if (data) {
          console.log("success deleting location");
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
      console.log("non avatar");
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
      console.log("non profile");
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
              {message ? (
                <p className="info text-primary">{message}</p>
              ) : (
                <p className="info text-primary">
                  Are you sure you want to delete your account? This is
                  irreversible.
                </p>
              )}
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
