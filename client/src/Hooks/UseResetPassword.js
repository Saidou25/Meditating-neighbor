import { useState, useEffect, useCallback } from "react";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { auth } from "../firebase";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER } from "../utils/mutations";
import { QUERY_USERS } from "../utils/queries";

const useResetPassword = (hooksDataValues) => {
  const [resetDataTemplate, setResetDataTemplate] = useState("");
  const [resetPasswordMessage, setResetPasswordMessage] = useState("");
  const [resetErrorMessage, setResetErrorMessage] = useState("");

  const { data: usersData } = useQuery(QUERY_USERS);
  const [updateUser] = useMutation(UPDATE_USER);

  // getting the code provided in firebase reset password link from the URL.
  const params = new URLSearchParams(window.location.href);
  const code = params.get("oobCode");

  // verifying code provided in the firebase reset password URL to make sure the password is being reset by the right user.
  // Then calling the update function to update the user's password only if the user's email is the same as user's firebase
  // account email from firebase database
  const verifyCode = useCallback(async () => {
    const firebaseResetPassword = async () => {
      try {
        await confirmPasswordReset(auth, code, hooksDataValues.password1).then(
          (resp) => {
            setResetErrorMessage("");
            setResetDataTemplate("cancel");
            setResetPasswordMessage("password reset with success");
          }
        );
      } catch (error) {
        setResetErrorMessage(
          "We have sent you an email with a link. Click the link go to reset and enter your new password."
        );
        return;
      }
    };
    // updating user in MongoDb with  new password then calling firebaseResetPassword to update new password in firebase.
    const update = async (userId, username, accountEmail) => {
      try {
        const { data } = await updateUser({
          variables: {
            id: userId,
            username: username,
            email: accountEmail,
            password: hooksDataValues.password1,
          },
        });
        if (data && data.updateUser) {
          setResetErrorMessage("");
          firebaseResetPassword();
        }
      } catch (error) {
        setResetErrorMessage(error.message);
      }
    };
    // verifying email where code was sent matches the attempting user then updating user with new password.

    try {
      await verifyPasswordResetCode(auth, code).then((email) => {
        const accountEmail = email;
        const users = usersData?.users || [];
        for (let user of users) {
          if (user.email === accountEmail) {
            const userId = user._id;
            const username = user.username;
            update(userId, username, accountEmail);
          }
        }
      });
    } catch (error) {
      setResetErrorMessage(error.message);
    }
  }, [hooksDataValues, code, usersData, updateUser]);

  useEffect(() => {
    if (!hooksDataValues.password1) {
      setResetErrorMessage("");
    } else {
      verifyCode();
    }
  }, [verifyCode, hooksDataValues]);

  return { resetDataTemplate, resetPasswordMessage, resetErrorMessage };
};
export default useResetPassword;
