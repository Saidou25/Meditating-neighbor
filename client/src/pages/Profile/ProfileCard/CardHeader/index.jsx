import React from "react";
import { useUser } from "../../../../contexts/userContext";

const CardHeader = () => {
  const { me } = useUser();
  return (
    <>
      <div className="card-header profile-header mt-3">
        {me.profile?.teacher === "teacher" &&
        me.profile?.firstname &&
        me.profile?.lastname ? (
          <h3>
            {me.profile?.firstname} {me.profile?.lastname}
          </h3>
        ) : (
          <h3>{me.username}</h3>
        )}
      </div>
    </>
  );
};
export default CardHeader;
