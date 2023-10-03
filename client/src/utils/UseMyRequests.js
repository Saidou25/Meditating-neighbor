import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USERS, QUERY_REQUESTS } from "./queries";

const useMyRequestsHook = () => {
  //   const [myRequests, setMyRequests] = useState("");
  const [usersIncomingRequestProfiles, setUersIncomingRequestProfiles] =
    useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [me, setMe] = useState("");
  // console.log("incomingRequests", incomingRequests);
  // console.log("outgoing requests", outgoingRequests);

  const { data: meData } = useQuery(QUERY_ME);
  const { data: requestsData } = useQuery(QUERY_REQUESTS);
  const { data: usersData } = useQuery(QUERY_USERS);

  useEffect(() => {
    const allRequests = requestsData?.requests || [];
    const allUsers = usersData?.users || [];
    const myData = meData?.me || [];

    if (meData && usersData && requestsData) {
      setMe(myData);

      // filter all contact requests addressed to me
      const requestsToMe = allRequests?.filter(
        (request) => request.destinationName === myData.username
      );
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
          setUersIncomingRequestProfiles(fromUsers);
        }
      }
      //  loop to all request to get profiles of the people i am requesting contact info from and
      //  push them into a list "toOthers" to set "MyContactRequestsToOthers" so their profiles can be rendered in DOM thru a map()
      const myRequests = allRequests.filter(
        (request) => request.myName === myData.username
      );
      setOutgoingRequests(myRequests);
    }
  }, [meData, usersData, requestsData]);

  return {
    me,
    usersIncomingRequestProfiles,
    incomingRequests,
    outgoingRequests,
  };
};
export default useMyRequestsHook;
