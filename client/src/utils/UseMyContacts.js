import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_CONTACTS, QUERY_USERS } from "./queries";

const useMyContacts = () => {
  const [myContacts, setMyContacts] = useState("");
  const [me, setMe] = useState("");
  const [allContacts, setAllContacts] = useState([]);
  const [myContactsProfiles, setMyContactProfiles] = useState([]);

  const { data: contactsData } = useQuery(QUERY_CONTACTS);
  const { data: meData } = useQuery(QUERY_ME);
  const { data: usersData } = useQuery(QUERY_USERS);

  useEffect(() => {
    let allMyContacts = [];
    const myData = meData?.me || [];
    const contacts = contactsData?.contacts || [];
    const users = usersData?.users || [];

    setMe(myData);
    setAllContacts(contacts);

    if (meData && contactsData && usersData) {
      const allContactProfiles = [];
      for (let contact of contacts) {
        if (
          contact.username === myData.username ||
          contact.friendUsername === myData.username
        ) {
          allMyContacts.push(contact);
          setMyContacts(allMyContacts);
        }
      }
      for (let allMyContact of allMyContacts) {
        if (allMyContact.username === myData.username) {
          const myFriends = users.filter(
            (user) => user.username === allMyContact.friendUsername
          );
          allContactProfiles.push({
            friend: myFriends[0],
            date: allMyContact.todaysDate,
          });
        } else if (allMyContact.friendUsername === myData.username) {
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
  }, [meData, contactsData, usersData]);
  return { myContacts, me, allContacts, myContactsProfiles };
};
export default useMyContacts;
