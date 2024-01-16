import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  DELETE_PROFILE,
  DELETE_LOCATION,
  DELETE_AVATAR,
  DELETE_USER,
  DELETE_CONTACT,
  DELETE_REQUEST,
} from "../../../utils/mutations";
import { storage } from "../../../firebase";
import { ref, deleteObject } from "firebase/storage";
import { auth } from "../../../firebase";
// import Button from "../../../components/Button";
// import { useAuthState } from "react-firebase-hooks/auth";
import Auth from "../../../utils/auth";
import { useUser } from "../../../contexts/userContext";

import "./index.css";

const DeleteModal = ({ myContactsIds, myRequestsIds }) => {
  const [message, setMessage] = useState("");
  const { me } = useUser();

  const [deleteLocation] = useMutation(DELETE_LOCATION);
  const [deleteProfile] = useMutation(DELETE_PROFILE);
  const [deleteAvatar] = useMutation(DELETE_AVATAR);
  const [deleteUser] = useMutation(DELETE_USER);
  const [deleteContact] = useMutation(DELETE_CONTACT);
  const [deleteRequest] = useMutation(DELETE_REQUEST);

  const user = auth.currentUser;

  // logout user after account deletion
  const logout = () => {
    Auth.logout();
  };

  // delete user from firebase database
  const removeFirebaseUser = () => {
    user
      .delete()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
    setMessage("Your account has been deleted. Goodbye.");
    setTimeout(() => {
      logout();
    }, 2500);
  };

  const storageRef = ref(storage, me.avatar?.avatarUrl);
  const toDelete = storageRef.fullPath;
  const imageRef = ref(storage, `${toDelete}`);

  //  delete user's account from MongoDb database using graphql deleteUser mutation
  const removeUser = async () => {
    const myId = me._id;
    if (!myId) {
      return;
    }
    try {
      const { data } = await deleteUser({
        variables: { id: myId },
      });
      if (data) {
        removeFirebaseUser();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // delete from MongoDb database with deleteRequest mutation  the request used between users to request connection contact
  const removeRequest = async (myRequestId) => {
    if (!myRequestId) {
      removeUser();
    } else {
      try {
        const { data } = await deleteRequest({
          variables: { id: myRequestId },
        });
        if (data) {
          removeUser();
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  //  looping thru all my contact requests and calling removeRequests to remove all requests involving the user
  const requestDispatch = () => {
    if (myRequestsIds) {
      for (let myRequestId of myRequestsIds) {
        removeRequest(myRequestId);
      }
    }
    removeUser();
  };
  //  delete all the user's contacts using graphql deleteContact mutation
  const removeContact = async (contactId) => {
    if (!contactId) {
      requestDispatch();
    } else {
      try {
        const { data } = await deleteContact({
          variables: { id: contactId },
        });
        if (data) {
          requestDispatch();
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
  // getting all contacts ids and sending to removeContact mutation to delete them from the database
  const contactDispatch = () => {
    if (myContactsIds) {
      for (let contactId of myContactsIds) {
        removeContact(contactId);
      }
    }
    requestDispatch();
  };

  // deletes user's location
  const removeLocation = async () => {
    if (!me.location?._id) {
      contactDispatch();
    } else {
      try {
        const { data } = await deleteLocation({
          variables: { id: me.location._id },
        });
        if (data) {
          contactDispatch();
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  // delete user's profile picture from the firebase database
  const deleteObjAvatar = () => {
    deleteObject(imageRef)
      .then(() => {
        console.log(`${imageRef} deleted`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // delete user's profile picture from MongoDb databse
  const removeAvatar = async () => {
    if (!me.avatar?._id) {
      removeLocation();
    } else {
      try {
        const { data } = await deleteAvatar({
          variables: { id: me.avatar?._id },
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
  // delete user's profile from MongoDb database using deleteProfile graphql mutation
  const removeProfile = async () => {
    if (!me.profile?._id) {
      removeAvatar();
    } else {
      try {
        const { data } = await deleteProfile({
          variables: { id: me.profile?._id },
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
    <>
      <div className="bottom-text">
        <span className="text-light" style={{ verticalAlign: "text-bottom" }}>
          Click
        </span>
        <button
          type="button here-button"
          className="btn btn-primary here-botton text-info px-2 py-0"
          style={{ verticalAlign: "text-bottom" }}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          here
        </button>
        <span className="text-light" style={{ verticalAlign: "text-bottom" }}>
          if you wish to delete your account.
        </span>
      </div>
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
                <p className="info text-primary m-5">{message}</p>
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
    </>
  );
};
export default DeleteModal;
