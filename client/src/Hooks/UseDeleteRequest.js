import { useState, useEffect, useCallback } from "react";
import { QUERY_REQUESTS, QUERY_CONTACTS } from "../utils/queries";
import { DELETE_REQUEST, ADD_CONTACT } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import useMyInfo from "../Hooks/UseMyInfo";

export default function useDeleteRequest(hookData) {
  const [loadingDeleteRequest, setLoadingDeleteRequest] = useState({ status: false, user: "", type: "" })
  const [deleteRequestMessage, setDeleteRequestMessage] = useState("");
  const [deleteRequestErrorMessage, setDeleteRequestErrorMessage] =
    useState("");

  const { me } = useMyInfo();

  // getting the date to add a "friend since ..." in the friend contact
  const date = new Date();
  const todaysDate = date.toString().slice(0, 15);

  // Updating the cache with newly created contact
  const [addContact] = useMutation(ADD_CONTACT, {
    update(cache, { data: { addContact } }) {
      try {
        const { contacts } = cache.readQuery({ query: QUERY_CONTACTS });
        cache.writeQuery({
          query: QUERY_CONTACTS,
          data: {
            contacts: [...contacts, addContact],
          },
        });

        console.log("success updating cache with add contact");
      } catch (error) {
        setLoadingDeleteRequest({ status: false, user: "", type: "" })
        setDeleteRequestErrorMessage(error.message);
        return;
      }
    },
  });

  // add contact to MongoDb database using grapgql addContact mutation
  const addFriend = useCallback(
    async (hookData) => {
      const id = hookData.user._id;
      try {
        const { data } = await addContact({
          variables: {
            friendId: id,
            friendUsername: hookData.user.username,
            username: me.username,
            todaysDate: todaysDate,
            avatarUrl: me.avatar?.avatarUrl,
            friendAvatarUrl: hookData.user.avatar?.avatarUrl,
          },
        });
        if (data) {
          setDeleteRequestErrorMessage("");
          setDeleteRequestMessage("success deleting request");
          setLoadingDeleteRequest({ status: false, user: "", type: "" })
        }
      } catch (error) {
        setLoadingDeleteRequest({ status: false, user: "", type: "" })
        setDeleteRequestErrorMessage(error.message);
        return;
      }
    },
    [me, todaysDate, addContact]
  );

  //   Updating the cache with newly deleted request
  const [deleteRequest] = useMutation(DELETE_REQUEST, {
    update(cache, { data: { deleteRequest } }) {
      try {
        const { requests } = cache.readQuery({ query: QUERY_REQUESTS });
        cache.writeQuery({
          query: QUERY_REQUESTS,
          data: {
            requests: requests.filter(
              (request) => request._id !== deleteRequest._id
            ),
          },
        });
      } catch (error) {
        setLoadingDeleteRequest({ status: false, user: "", type: "" })
        setDeleteRequestErrorMessage(error.message);
        return;
      }
    },
  });

  // delete contact request sent to me from MongoDb database using deleteRequest mutation
  const removeRequest = useCallback(
    async (hookData) => {
      const requestId = hookData.requestId;
      if (!requestId) {
        return;
      }
      if (hookData.type) {
        setLoadingDeleteRequest({ status: true, user: hookData.user, type: hookData.type})
      }

      try {
        const { data } = await deleteRequest({
          variables: {
            id: hookData.requestId,
          },
        });
      } catch (error) {
        setLoadingDeleteRequest({ status: false, user: "", type: "" })
        setDeleteRequestErrorMessage(error.message);
        return;
      } finally {
        if (hookData.type === "accept") {
          addFriend(hookData);
        } else {
          setDeleteRequestErrorMessage("");
          setDeleteRequestMessage("success deleting request");
          setLoadingDeleteRequest({ status: false, user: "", type: "" })
        }
      }
    },
    [deleteRequest, addFriend]
  );

  useEffect(() => {

    if (!hookData) {
      setDeleteRequestMessage("");
      // setLoading({ status: false, user: "", type: "" })
      return;
    } else if (hookData) {
      removeRequest(hookData);
    }
  }, [hookData, removeRequest]);

  return {
    deleteRequestMessage,
    deleteRequestErrorMessage,
    loadingDeleteRequest
  };
}
