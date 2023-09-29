import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_CONTACTS } from "./queries";

const useHooks = () => {
    const [me, setMeData] = useState("");
  const [myContacts, setMyContacts] = useState("");

  const { data: meData } = useQuery(QUERY_ME);
  const { data: contactsData } = useQuery(QUERY_CONTACTS);

  useEffect(() => {
    const myData = meData?.me || [];
    const contacts = contactsData?.contacts || [];
    setMeData(myData);
    let allMyContacts = [];
    if (contactsData && meData) {
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
  }, [contactsData, meData]);

  return { myContacts, me };
};
export default useHooks;
