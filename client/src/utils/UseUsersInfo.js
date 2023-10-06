import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "./queries";

const useUsers = () => {
  const [users, setUsers] = useState("");
  // const [locations, setLocations] = useState([]);
  // console.log("locations", locations);

  const { data: usersData } = useQuery(QUERY_USERS);

  useEffect(() => {
    if (usersData) {
      const allUsersData = usersData?.users || [];

      setUsers(allUsersData);
      // setLocations(allUsersData.location);
    }
  }, [usersData]);

  return { users };
};
export default useUsers;
