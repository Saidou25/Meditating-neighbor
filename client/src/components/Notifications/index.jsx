import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  QUERY_REQUESTS,
  QUERY_ME,
  QUERY_USERS,
  QUERY_CONTACTS,
  QUERY_RESPONSES,
} from "../../utils/queries";
import {
  ADD_RESPONSE,
  DELETE_REQUEST,
  ADD_CONTACT,
} from "../../utils/mutations";
import Navbar from "../Navbar";
import profileIcon from "../../assets/images/profileicon.png";
import Footer from "../Footer";
import "./index.css";

const Notifications = () => {
  let respondingUsersProfiles = [];

  const [requestId, setRequestId] = useState("");
  const [requestingUsersProfiles, setRequestingUsersProfiles] = useState([]);
  const [me, setMeData] = useState("");

  const { data: meData } = useQuery(QUERY_ME);

  // query all users data
  const { data: usersData } = useQuery(QUERY_USERS);
  const users = usersData?.users || [];

  // query all requests
  const { data: requestsData } = useQuery(QUERY_REQUESTS);


  //  query all responses and filter user responses from his/her contact requests to others
  const { data: responsesData } = useQuery(QUERY_RESPONSES);
  const responses = responsesData?.responses || [];

  const responsesFromNames = responses.filter(
    (response) => response.fromName === me.username
  );

  //  loop to all responses to get profiles of the people responding to contact requests and
  //  push them into a list "respondingUsersProfiles" so they can be rendered thru a map()
  for (let responseFromName of responsesFromNames) {
    const respondingUsers = users.filter(
      (user) => user.username === responseFromName.toName
    );
    respondingUsersProfiles.push(respondingUsers[0]);
  }
 // Updating the cache with newly created contact
  const [addContact] = useMutation(ADD_CONTACT, {
    update(cache, { data: { addContact } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: {
            me: { ...me, contacts: [...me.contacts, addContact] },
          },
        });

        console.log("success updating cache with add contact");
      } catch (e) {
        console.error(e);
      }
    },
  });
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
  useEffect(() => {
    if (requestsData && meData && usersData) {
      const me = meData?.me || [];
      const allRequests = requestsData?.requests || [];
      const users = usersData?.users || [];
      // filter all contact request addressed to me
      const requestsToMe = allRequests.filter(
        (request) => request.destinationName === me.username
      );
      const fromUsers = [];
      //  loop to all request to get profiles of the people requesting my contact and
      //  push them into a list "requestingUsersProfiles" so they can be rendered thru a map()
      for (let userRequest of requestsToMe) {
        const requestingUsers = users.filter(
          (user) => user.username === userRequest.myName
        );
        fromUsers.push(requestingUsers[0]);
        setRequestingUsersProfiles(fromUsers);
        setMeData(me);
      }
    }
  }, [requestsData, meData, usersData]);

  const removeRequest = async (user) => {
    const myRequest = user.requests.filter(
      (request) => request.destinationName === me.username
    );
    const requestId = myRequest[0]._id;
    setRequestId(requestId);
    try {
      const { data } = await deleteRequest({
        variables: {
          id: requestId,
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
  };

  const addFriend = async (user) => {
    const id = user._id;
    try {
      const { data } = await addContact({
        variables: {
          friendId: id,
        },
      });
      if (data) {
        console.log("success adding new contact", user.username);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Navbar />
      {/* <div className="container-fluid notification"> */}
      {/* {myRequests.length ? (
          <>
            <h3 className="request-title text-light bg-primary">
              You requested contact info:
            </h3>
            {myRequests &&
              myRequests.map((user) => (
                <div
                  key={user._id}
                  className="row response-list bg-primary text-light"
                >
                  <div className="col-2">
                    <img
                      className="response-avatar"
                      src={user?.avatarUrl ? user?.avatarUrl : profileIcon}
                      alt="profile avatar"
                    />
                  </div>
                  <div className="col-10">
                    <p>
                      Your contact request with {user.destinationName} is
                      pending.
                    </p>
                  </div>
                </div>
              ))}
          </>
        ) : (
          <></>
        )} */}
      {requestingUsersProfiles.length ? (
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
                  src={user?.avatarUrl ? user?.avatarUrl : profileIcon}
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
      <Footer />
    </>
  );
};
export default Notifications;
