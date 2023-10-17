import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "./queries";

const useUsersInfo = (accountEmail) => {
  const [users, setUsers] = useState("");
  // const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const { data: usersData } = useQuery(QUERY_USERS);

  useEffect(() => {
    if (usersData || accountEmail) {
      const allUsersData = usersData?.users || [];
      setUsers(allUsersData);
      for (let user of allUsersData) {
        if (user.email === accountEmail) {
          setUserEmail(user.email);
          // setUserId(user._id);
        }
      }
    }
  }, [usersData, accountEmail]);

  return { users, userEmail };
};
export default useUsersInfo;
