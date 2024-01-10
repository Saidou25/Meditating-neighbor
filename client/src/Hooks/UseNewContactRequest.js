import { useState, useEffect, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { QUERY_REQUESTS } from "../utils/queries";
import { ADD_REQUEST } from "../utils/mutations";

export default function useNewContactRequest(contactRequestData) {
  const [addNewContactRequestMessage, setaddNewContactRequestMessage] =
    useState("");
  const [addNewContactRequestError, setAddNewContactRequestError] =
    useState("");

  const [addRequest] = useMutation(ADD_REQUEST, {
    update(cache, { data: { addRequest } }) {
      try {
        const { requests } = cache.readQuery({ query: QUERY_REQUESTS });
        cache.writeQuery({
          query: QUERY_REQUESTS,
          data: {
            requests: [...requests, addRequest],
          },
        });

        console.log("success updating cache with add request");
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  const addNewContactRequest = useCallback(async () => {
    try {
      const { data } = await addRequest({
        variables: {
          email: contactRequestData.email,
          myName: contactRequestData.myName,
          destinationName: contactRequestData.destinationName,
          avatarUrl: contactRequestData.avatarUrl,
        },
      });
      if (data) {
        setAddNewContactRequestError("");
        setaddNewContactRequestMessage("success sending contact request");
      }
    } catch (error) {
      setAddNewContactRequestError(error.message);
    }
  }, [contactRequestData, addRequest]);

  useEffect(() => {
    if (!contactRequestData.email) {
      setAddNewContactRequestError("");
      return;
    } else {
      addNewContactRequest(contactRequestData);
      setAddNewContactRequestError("");
    }
  }, [contactRequestData, addNewContactRequest]);

  return { addNewContactRequestMessage, addNewContactRequestError };
}
