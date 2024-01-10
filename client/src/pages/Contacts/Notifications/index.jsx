import React, { useState, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import Auth from "../../../utils/auth";
import useDeleteRequest from "../../../Hooks/UseDeleteRequest";
import useMyRequests from "../../../Hooks/UseMyRequests";
import useMyInfo from "../../../Hooks/UseMyInfo";
import "./index.css";

const Notifications = ({ children, user, handleLoading }) => {
  const [hookData, setHookData] = useState({
    requestId: "",
    user: "",
    type: "",
  });

  // import requests info from hooks to avoid writing four queries in this component
  const { me } = useMyInfo();
  const { incomingRequests, outgoingRequests } = useMyRequests();
  const { deleteRequestMessage, deleteRequestErrorMessage, loadingDeleteRequest } =
    useDeleteRequest(hookData);

  const removeRequest = useCallback(
    async (user) => {
      if (!user) {
        setHookData("");
        return;
      }
      for (let request of incomingRequests) {
        if (
          request.destinationName === me.username &&
          request.myName === user.username
        ) {
          setHookData({
            requestId: request._id,
            user: user,
            type: user.type,
          });
        }
      }
      for (let request of outgoingRequests) {
        if (
          request.destinationName === user.username &&
          request.myName === me.username
        ) {
          setHookData({
            requestId: request._id,
            user: user,
            type: user.type,
          });
        }
      }
    },
    [incomingRequests, outgoingRequests, me]
  );

  useEffect(() => {
    if (deleteRequestMessage) {
      removeRequest();
    }
  }, [deleteRequestMessage, removeRequest]);

  useEffect(() => {
    if (deleteRequestErrorMessage) {
    }
  }, [deleteRequestErrorMessage]);

  useEffect(() => {
    if (user) {
      removeRequest(user);
    }
  }, [user, removeRequest]);

  useEffect(() => {
    if (loadingDeleteRequest) {
      handleLoading(loadingDeleteRequest);
    }
  }, [loadingDeleteRequest, handleLoading]);

  if (!Auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};
export default Notifications;
