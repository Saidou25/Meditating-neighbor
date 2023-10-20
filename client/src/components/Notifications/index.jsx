import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { QUERY_REQUESTS, QUERY_CONTACTS } from "../../utils/queries";
import { DELETE_REQUEST, ADD_CONTACT } from "../../utils/mutations";
import { Navigate } from "react-router-dom";
import Auth from "../../utils/auth";
import useMyRequests from "../../Hooks/UseMyRequests";
import profileIcon from "../../assets/images/profileicon.png";

import "./index.css";

const Notifications = () => {
  const [requestId, setRequestId] = useState("");
  const [requestingUsersProfiles, setRequestingUsersProfiles] = useState([]);
  const [requestedUsersProfiles, setRequestedUsersProfiles] = useState([]);

  // import requests info from hooks to avoid writing four queries in this component
  const {
    me,
    incomingRequests,
    usersIncomingRequestProfiles,
    myOutgoingRequestUserProfile,
  } = useMyRequests();

  // getting the date to add a "friend since ..." in the friend contact
  const date = new Date();
  const todaysDate = date.toString().slice(0, 15);

  // Updating the cache with newly created contact
  const [addContact] = useMutation(ADD_CONTACT, {
    update(cache, { data: { addContact } }) {
      try {
        const { contacts } = cache.readQuery({ query: QUERY_CONTACTS });
        cache.writeQuery({
          query: QUERY_CONTACTS,
          data: {
            contacts: [...contacts, addContact],
          },
        });

        console.log("success updating cache with add contact");
      } catch (e) {
        console.error(e);
      }
    },
  });

  // Updating the cache with newly deleted request
  const [deleteRequest] = useMutation(DELETE_REQUEST, {
    variables: { id: requestId },
    update(cache, { data: { deleteRequest } }) {
      try {
        const { requests } = cache.readQuery({ query: QUERY_REQUESTS });
        cache.writeQuery({
          query: QUERY_REQUESTS,
          data: {
            requests: requests.filter(
              (request) => request._id !== deleteRequest._id
            ),
          },
        });

        console.log("success updating cache with delete request");
      } catch (e) {
        console.error(e);
      }
    },
  });

  // add contact to MongoDb database using grapgql addContact mutation
  const addFriend = async (user) => {
    const id = user._id;
    try {
      const { data } = await addContact({
        variables: {
          friendId: id,
          friendUsername: user.username,
          username: me.username,
          todaysDate: todaysDate,
          avatarUrl: me.avatar?.avatarUrl,
          friendAvatarUrl: user.avatar?.avatarUrl,
        },
      });
      if (data) {
        console.log("success adding new contact", data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // delete contact request sent to me from MongoDb database using deleteRequest mutation
  const removeRequest = async (user) => {
    for (let request of incomingRequests) {
      if (
        request.destinationName === me.username &&
        request.myName === user.username
      ) {
        setRequestId(request._id);

        try {
          const { data } = await deleteRequest({
            variables: {
              id: request._id,
            },
          });
          if (data) {
            console.log("success deleting request");
            addFriend(user);
            setRequestingUsersProfiles([]);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  };
  
  // making sure we have all data needed uppon page load and that these datas stay monitored during user's operations in this page
  useEffect(() => {
    if (usersIncomingRequestProfiles && myOutgoingRequestUserProfile) {
      setRequestingUsersProfiles(usersIncomingRequestProfiles);
      setRequestedUsersProfiles(myOutgoingRequestUserProfile);
    }
  }, [usersIncomingRequestProfiles, myOutgoingRequestUserProfile]);

  if (!Auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      {requestedUsersProfiles?.length ? (
        <>
          <h3 className="request-title text-light bg-primary">
            You requested contact info:
          </h3>
          {requestedUsersProfiles &&
            requestedUsersProfiles.map((user) => (
              <div
                key={user._id}
                className="row response-list bg-primary g-0 text-light"
              >
                <div className="col-2">
                  <img
                    className="response-avatar"
                    src={
                      user.avatar?.avatarUrl
                        ? user.avatar?.avatarUrl
                        : profileIcon
                    }
                    alt="profile avatar"
                  />
                </div>
                <div className="col-10">
                  <p>Your contact request with {user.username} is pending.</p>
                </div>
              </div>
            ))}
        </>
      ) : (
        <></>
      )}
      {requestingUsersProfiles?.length ? (
        <h3 className="request-title text-light bg-primary">
          Your contact info is requested:
        </h3>
      ) : (
        <></>
      )}
      <div className="container-fluid notification bg-primary text-light">
        {requestingUsersProfiles &&
          requestingUsersProfiles.map((user) => (
            <div key={user._id} className="row requests-list">
              <div className="col-2">
                <img
                  className="request-avatar"
                  src={
                    user.avatar?.avatarUrl
                      ? user.avatar?.avatarUrl
                      : profileIcon
                  }
                  alt="profile avatar"
                />
              </div>
              <div className="col-10">
                <div className="row">
                  <div className="col-8">
                    <p className="request-p d-flex align-items-center">
                      {user?.username} is requesting your contact information.
                    </p>
                  </div>
                  <div className="col-3 d-flex justify-content-end">
                    <button
                      className="btn btn-accept"
                      onClick={() => removeRequest(user)}
                    >
                      accept
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
export default Notifications;
