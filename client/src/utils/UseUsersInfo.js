import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "./queries";

const useUsers = () => {
  const [users, setUsers] = useState("");
  // console.log("users", users);

  const { data: usersData } = useQuery(QUERY_USERS);

  useEffect(() => {
    if (usersData) {
      const allUsersData = usersData?.users || [];

      setUsers(allUsersData);
    }
  }, [usersData]);

  return { users };
};
export default useUsers;
