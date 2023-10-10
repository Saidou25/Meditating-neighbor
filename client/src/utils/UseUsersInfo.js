import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "./queries";

const useUsers = (accountEmail) => {
  const [users, setUsers] = useState("");
  const [userId, setUserId] = useState("");

  const { data: usersData } = useQuery(QUERY_USERS);

  useEffect(() => {
    if (usersData && accountEmail) {
      const allUsersData = usersData?.users || [];
      setUsers(allUsersData);
      // console.log(accountEmail);
      for (let user of allUsersData) {
        if (user.email === accountEmail) {
          // console.log('user.email', user.email);
          // console.log('account email', accountEmail);
          setUserId(user._id);
        }
      }
    }
  }, [usersData, accountEmail]);

  return { users, userId };
};
export default useUsers;
