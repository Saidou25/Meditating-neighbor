import React from "react";
import { useUser } from "../../../../contexts/userContext";
import { FaEnvelope, FaIdBadge, FaHome } from "react-icons/fa";

const CardBody = ({ children }) => {
  const { me } =useUser();
    return (
        <>
        <div>{children}</div>
        <div className="card-body profile-body text-light mt-5">
              <div className="p-info-body text-light">
                {me.profile?.teacher === "teacher" && me.profile?.story ? (
                  <>
                    <h4 className="about-profile mb-5">About</h4>
                    <p className="about-p-story text-light mb-5">
                      {me.profile?.story}
                    </p>
                  </>
                ) : (
                  <></>
                )}
                {(me.profile?.teacher === "teacher" ||
                  me.profile?.teacher === "Teacher") && (
                  <>
                    <h4 className="info-profile mb-5">Info</h4>
                    <p className="profile-p text-light">
                      Status: {me.profile?.teacher}
                    </p>
                    <p className="profile-p text-light mb-5">
                      Has been meditating for {me.profile?.years} years
                    </p>
                  </>
                )}
                {(me.profile?.teacher === "meditator" ||
                  me.profile?.teacher === "Meditator") && (
                  <>
                    <p className="profile-p text-light">
                      Status: {me.profile?.teacher}
                    </p>
                    <p className="profile-p text-light">
                      Has been meditating for: {me.profile?.years} years
                    </p>
                    <p className="profile-p text-light mb-5">
                      Currently working on stage {me.profile?.stage}
                    </p>
                  </>
                )}
             <div className="p-fas text-light">
                  <p>
                 <FaIdBadge /> {me.username}
                  </p>
                  <p>
                    <FaEnvelope /> {me.email}
                  </p> 
                {me.location ? (
                    <p> 
                      <FaHome /> {me.location?.city}, {me.location?.state},{" "}
                      {me.location?.country}
                    </p>
                  ) : (
                    <></>
                  )} 
             </div> 
              </div>
            </div></>
    )
};
export default CardBody;