import React from "react";
import { useUser } from "../../../contexts/userContext";

export default function ProfileText() {
  const { me } = useUser();
  return (
    <main className="container">
      {(!me.profile || !me.avatar?.avatarUrl || !me.location) && (
        <p className="profile-warning text-light">
          Once you have successfully created your profile, uploaded your profile
          picture and saved your location from within the "locate" page, your
          profile will be visible to everyone.
        </p>
      )}
    </main>
  );
}
