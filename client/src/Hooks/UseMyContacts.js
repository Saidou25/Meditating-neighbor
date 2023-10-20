import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CONTACTS } from "../utils/queries";
import useMyInfo from "./UseMyInfo"; 
import useUsersInfo from "./UseUsersInfo";

const useMyContacts = () => {
  const [myContacts, setMyContacts] = useState("");
  const [allContacts, setAllContacts] = useState([]);
  const [myContactsProfiles, setMyContactProfiles] = useState([]);

  const { data: contactsData } = useQuery(QUERY_CONTACTS);
  const { me } = useMyInfo();
  const { users } = useUsersInfo();

  useEffect(() => {
    let allMyContacts = [];
    const contacts = contactsData?.contacts || [];

    setAllContacts(contacts);

    if (me && contactsData && users) {
      const allContactProfiles = [];
      for (let contact of contacts) {
        if (
          contact.username === me.username ||
          contact.friendUsername === me.username
        ) {
          allMyContacts.push(contact);
          setMyContacts(allMyContacts);
        }
      }
      for (let allMyContact of allMyContacts) {
        if (allMyContact.username === me.username) {
          const myFriends = users.filter(
            (user) => user.username === allMyContact.friendUsername
          );
          allContactProfiles.push({
            friend: myFriends[0],
            date: allMyContact.todaysDate,
          });
        } else if (allMyContact.friendUsername === me.username) {
          const friendOf = users.filter(
            (user) => user.username === allMyContact.username
          );
          allContactProfiles.push({
            friend: friendOf[0],
            date: allMyContact.todaysDate,
          });
        }

        setMyContactProfiles(allContactProfiles);
      }
    }
  }, [me, contactsData, users]);
  return { myContacts, me, allContacts, myContactsProfiles };
};
export default useMyContacts;
