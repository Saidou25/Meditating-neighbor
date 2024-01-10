import React, { useContext } from "react";
import { UserContext } from "../../../../utils/userContext";

const CardHeader = () => {
  const me = useContext(UserContext);
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
          // {/* <h3>{message}</h3> */}
       <h3>{me.username}</h3> 
    )} 
      </div>
    </>
  );
};
export default CardHeader;
