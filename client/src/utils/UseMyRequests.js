import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USERS, QUERY_REQUESTS } from "./queries";

const useMyRequestsHook = () => {
  //   const [myRequests, setMyRequests] = useState("");
  const [usersIncomingRequestProfiles, setUsersIncomingRequestProfiles] =
    useState([]);
  const [myOutgoingRequestUserProfile, setMyOutgoingRequestUserProfile] =
    useState([]);
  const [myRequestsIds, setMyRequestsIds] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [me, setMe] = useState("");
  // console.log("incomingRequests", incomingRequests);
  // console.log("outgoing requests", outgoingRequests);
  // console.log("usersIncomingRequestProfiles", usersIncomingRequestProfiles);
  // console.log("myOutgoingRequestUserProfile", myOutgoingRequestUserProfile);

  const { data: meData } = useQuery(QUERY_ME);
  const { data: requestsData } = useQuery(QUERY_REQUESTS);
  const { data: usersData } = useQuery(QUERY_USERS);

  useEffect(() => {
    const allRequests = requestsData?.requests || [];
    const allUsers = usersData?.users || [];
    const myData = meData?.me || [];
    const allMyRequests = [];

    if (meData && usersData && requestsData) {
      setMe(myData);

      // filter all contact requests addressed to me
      const requestsToMe = allRequests?.filter(
        (request) => request.destinationName === myData.username
      );
      // allMyRequests.push(requestsToMe);
      // console.log("requests to me", requestsToMe);
      setIncomingRequests(requestsToMe);
      const fromUsers = [];

      //  loop to all request to get profiles of the people requesting my contact and
      //  push them into a list "fromUsers" to set "setRequestingUsersProfiles()" so profiles can be rendered in DOM.
      for (let userRequest of requestsToMe) {
        const requestingUsers = allUsers?.filter(
          (user) => user.username === userRequest.myName
        );
        if (requestingUsers[0]) {
          fromUsers.push(requestingUsers[0]);
          setUsersIncomingRequestProfiles(fromUsers);
        }
      }
      // filter all contact requests made by me
      const myRequests = allRequests?.filter(
        (request) => request.myName === myData.username
      );
      // allMyRequests.push(myRequests);
      // console.log("my requests", myRequests);
      setOutgoingRequests(myRequests);
      const toUsers = [];

      for (let myRequest of myRequests) {
        const requestedUsers = allUsers.filter(
          (user) => user.username === myRequest.destinationName
        );
        if (requestedUsers[0]) {
          toUsers.push(requestedUsers[0]);
          setMyOutgoingRequestUserProfile(toUsers);
        }
      }

      // get all requests Ids
      for (let request of allRequests) {
        if (request.myName === myData.username) {
          // console.log('request 1', request);
          allMyRequests.push(request._id);
        }
        if (request.destinationName === myData.username) {
          // console.log('request 2', request);
          allMyRequests.push(request._id);
        }
      }
      // console.log("all my request", allMyRequests);
      setMyRequestsIds(allMyRequests);
    }
  }, [meData, usersData, requestsData]);

  return {
    me,
    usersIncomingRequestProfiles,
    myOutgoingRequestUserProfile,
    incomingRequests,
    outgoingRequests,
    myRequestsIds,
  };
};
export default useMyRequestsHook;
