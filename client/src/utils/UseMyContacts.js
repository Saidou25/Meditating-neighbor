import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_CONTACTS } from "./queries";

const useMyContacts = () => {
  const [myContacts, setMyContacts] = useState("");
  const [me, setMe] = useState("");
  const [allContacts, setAllContacts] = useState("");

  const { data: contactsData } = useQuery(QUERY_CONTACTS);
  const { data: meData } = useQuery(QUERY_ME);

  useEffect(() => {
    let allMyContacts = [];
    const myData = meData?.me || [];
    const contacts = contactsData?.contacts || [];

    setMe(myData);
    setAllContacts(contacts);

    if (meData && contactsData) {
      for (let contact of contacts) {
        if (
          contact.username === myData.username ||
          contact.friendUsername === myData.username
        ) {
          allMyContacts.push(contact);
          setMyContacts(allMyContacts);
        }
      }
    }
  }, [meData, contactsData]);
  return { myContacts, me, allContacts };
};
export default useMyContacts;
