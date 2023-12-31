import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";

// query all users to import data in components
const useUsersInfo = (accountEmail) => {
  const [users, setUsers] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const { data: usersData } = useQuery(QUERY_USERS);

  useEffect(() => {
    if (usersData || accountEmail) {
      const allUsersData = usersData?.users || [];
      setUsers(allUsersData);
      for (let user of allUsersData) {
        if (user.email === accountEmail) {
          setUserEmail(user.email);
        }
      }
    }
  }, [usersData, accountEmail]);

  return { users, userEmail };
};
export default useUsersInfo;
