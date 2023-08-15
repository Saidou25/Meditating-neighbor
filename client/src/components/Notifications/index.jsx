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
  DELETE_RESPONSE,
  ADD_CONTACT,
} from "../../utils/mutations";
import Navbar from "../Navbar";
import profileIcon from "../../assets/images/profileicon.png";
import Footer from "../Footer";
import "./index.css";

const Notifications = () => {
  const [requestId, setRequestId] = useState("");
  const [responseId, setResponseId] = useState("");
  const [requestingUsersProfiles, setRequestingUsersProfiles] = useState([]);
  const [respondingUsersProfiles, setRespondingUsersProfiles] = useState([]);

  const [myContactRequestsToOthers, setMyContactRequestsToOthers] = useState(
    []
  );
  const [me, setMeData] = useState("");
  const [myRequests, setMyRequests] = useState([]);

  const [addResponse] = useMutation(ADD_RESPONSE);

  const { data: meData } = useQuery(QUERY_ME);

  // query all users data
  const { data: usersData } = useQuery(QUERY_USERS);

  // query all requests
  const { data: requestsData } = useQuery(QUERY_REQUESTS);

  // query all responses
  const { data: responsesData } = useQuery(QUERY_RESPONSES);

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
  // const [deleteResponse] = useMutation(DELETE_RESPONSE)
  const [deleteResponse] = useMutation(DELETE_RESPONSE, {
    variables: { id: responseId },
    update(cache, { data: { deleteResponse } }) {
      try {
        const { responses } = cache.readQuery({ query: QUERY_RESPONSES });
        cache.writeQuery({
          query: QUERY_RESPONSES,
          data: {
            responses: responses.filter(
              (response) => response._id !== deleteResponse._id
            ),
          },
        });

        console.log("success updating cache with delete response");
      } catch (e) {
        console.error(e);
      }
    },
  });
  useEffect(() => {
    if (requestsData && meData && usersData && responsesData) {
      const myData = meData?.me || [];
      const allRequests = requestsData?.requests || [];
      const allResponses = responsesData?.responses || [];
      const users = usersData?.users || [];

      // filter all contact requests addressed to me
      const requestsToMe = allRequests.filter(
        (request) => request.destinationName === myData.username
      );

      const fromUsers = [];
      //  loop to all request to get profiles of the people requesting my contact and
      //  push them into a list "fromUsers" to set "setRequestingUsersProfiles()" so profiles can be rendered in DOM.
      for (let userRequest of requestsToMe) {
        const requestingUsers = users.filter(
          (user) => user.username === userRequest.myName
        );
        fromUsers.push(requestingUsers[0]);
        setRequestingUsersProfiles(fromUsers);
        setMeData(myData);
        setMyRequests(myData.requests);
      }
      const toOthers = [];
      //  loop to all request to get profiles of the people i am requesting contact info from and
      //  push them into a list "toOthers" to set "MyContactRequestsToOthers" so their profiles can be rendered in DOM thru a map()
      const requestsFromMe = allRequests.filter(
        (request) => request.myName === myData.username
      );
      // console.log("requests from me for others", requestsFromMe)
      for (let requestFromMe of requestsFromMe) {
        const requestedUsers = users.filter(
          (user) => user.username === requestFromMe.destinationName
        );
        toOthers.push(requestedUsers[0]);
        setMyContactRequestsToOthers(toOthers);
      }
      const responders = [];
      const myResponses = allResponses.filter(
        (response) => response.toName === myData.username
      );
      for (let myResponse of myResponses) {
        const myResponsesProfiles = users.filter(
          (user) => user.username === myResponse.fromName
        );
        responders.push(myResponsesProfiles[0]);
        setRespondingUsersProfiles(responders);
      }
    }
  }, [requestsData, meData, usersData, responsesData]);

  const response = async (user) => {
    for (let response of user.responses) {
      if (response.fromName === user.username) {
        return;
      }
    }
    try {
      const { data } = await addResponse({
        variables: {
          fromName: me.username,
          email: me.email,
          toName: user.username,
        },
      });
      if (data) {
        console.log(
          `${user.username}, ${me.username} has accepted your contact request`
        );
        console.log("success sending response");
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
        response(user);
        console.log("success adding new contact", user.username);
      }
    } catch (e) {
      console.error(e);
    }
  };

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
  const removeResponse = async (user) => {
    const myData = meData?.me || [];
    const myResponses = user.responses.filter(
      (response) => response.toName === myData.username
    );

    const responseId = myResponses[0]._id;

    setResponseId(responseId);
    try {
      const { data } = await deleteResponse({
        variables: {
          id: responseId,
        },
      });
      if (data) {
        console.log("success deleting request");
        addFriend(user);
        setRespondingUsersProfiles([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Navbar />
      {myContactRequestsToOthers.length ? (
        <>
          <h3 className="request-title text-light bg-primary">
            You requested contact info:
          </h3>
          {myContactRequestsToOthers &&
            myContactRequestsToOthers.map((user) => (
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
                  <p>Your contact request with {user.username} is pending.</p>
                </div>
              </div>
            ))}
        </>
      ) : (
        <></>
      )}
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
        {respondingUsersProfiles.length ? (
          <>
            <h3 className="request-title text-light bg-primary">
              You have returns from your contact requests:
            </h3>
            {respondingUsersProfiles &&
              respondingUsersProfiles.map((user) => (
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
                    <div className="row">
                      <div className="col-8">
                        <p>{user.username} has accepted your contact reques.</p>
                      </div>
                      <div className="col-3 d-flex justify-content-end">
                        <button
                          className="btn btn-accept"
                          onClick={() => removeResponse(user)}
                        >
                          ok
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </>
        ) : (
          <></>
        )}
      </div>
      <Footer />
    </>
  );
};
export default Notifications;
