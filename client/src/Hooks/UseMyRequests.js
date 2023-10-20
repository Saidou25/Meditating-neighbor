import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_REQUESTS } from "../utils/queries";
import useMyInfo from "./UseMyInfo";
import useUsersInfo from "./UseUsersInfo";

const useMyRequestsHook = () => {
  const [usersIncomingRequestProfiles, setUsersIncomingRequestProfiles] =
    useState([]);
  const [myOutgoingRequestUserProfile, setMyOutgoingRequestUserProfile] =
    useState([]);
  const [myRequestsIds, setMyRequestsIds] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);

  const { data: requestsData } = useQuery(QUERY_REQUESTS);
  const { me } = useMyInfo();
  const { users } = useUsersInfo();

  useEffect(() => {
    const allRequests = requestsData?.requests || [];
    const allMyRequests = [];

    if (me && users && requestsData) {
      // filter all contact requests addressed to me
      const requestsToMe = allRequests?.filter(
        (request) => request.destinationName === me.username
      );
      setIncomingRequests(requestsToMe);
      const fromUsers = [];
      //  loop to all request to get profiles of the people requesting my contact and
      //  push them into a list "fromUsers" to set "setRequestingUsersProfiles()" so profiles can be rendered in DOM.
      if (requestsToMe.length) {
        for (let requestToMe of requestsToMe) {
          const requestingUsers = users?.filter(
            (user) => user.username === requestToMe.myName
          );
          fromUsers.push(requestingUsers[0]);
          setUsersIncomingRequestProfiles(fromUsers);
        }
      } else {
        setUsersIncomingRequestProfiles([]);
      }
      // filter all contact requests made by me
      const myRequests = allRequests?.filter(
        (request) => request.myName === me.username
      );

      setOutgoingRequests(myRequests);
      const toUsers = [];

      for (let myRequest of myRequests) {
        const requestedUsers = users.filter(
          (user) => user.username === myRequest.destinationName
        );
        if (requestedUsers[0]) {
          toUsers.push(requestedUsers[0]);
          setMyOutgoingRequestUserProfile(toUsers);
        }
      }

      // get all requests Ids that will be used for deleting requests from non existing user(in case a user deletes his/her account).
      for (let request of allRequests) {
        if (request.myName === me.username) {
          allMyRequests.push(request._id);
        }
        if (request.destinationName === me.username) {
          allMyRequests.push(request._id);
        }
      }
      setMyRequestsIds(allMyRequests);
    }
  }, [me, users, requestsData]);

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
