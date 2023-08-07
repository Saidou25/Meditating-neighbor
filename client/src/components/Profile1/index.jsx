import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME, QUERY_PROFILES } from "../../utils/queries";
import { DELETE_PROFILE } from "../../utils/mutations";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Spinner from "../Spinner";

import "./index.css";

const Profile1 = () => {
  const { data, loading } = useQuery(QUERY_ME);
  const { data: profileData, profileLoading } = useQuery(QUERY_PROFILES);

  const me = data?.me || [];
  const profiles = profileData?.profiles || [];
  const userProfile = profiles.filter(
    (profile) => profile.username === me.username
  );
  const myProfile = userProfile[0];
  const profileId = myProfile?._id;

  const [deleteProfile] = useMutation(DELETE_PROFILE, {
    variables: { id: profileId },
    update(cache, { data: { deleteProfile } }) {
      try {
        const { profiles } = cache.readQuery({ query: QUERY_PROFILES });
        cache.writeQuery({
          query: QUERY_PROFILES,
          data: { profiles: [...profiles, deleteProfile] },
          variables: {
            id: profileId,
            username: me.username,
            stage: myProfile.stage,
            years: myProfile.years,
            teacher: myProfile.teacher,
          },
        });
        console.log("success updating cache with deleteProfile");
      } catch (e) {
        console.error(e);
      }
    },
  });

  const removeProfile = async () => {
    console.log("myProfile._id", profileId, myProfile);
    try {
      const { data } = await deleteProfile({
        variables: { id: profileId },
      });
      if (data) {
        console.log("success deleting profile");
      }
    } catch (e) {
      console.error(e);
    }
    console.log("success deleting profile");
  };

  if (loading || profileLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <Navbar />
      <div className="container-fluid profile bg-primary">
        <div className="card profile-card">
          <div className="card-header profile-header mt-3">
            <h3>{me.username}</h3>
          </div>
          <Avatar me={me} />
          <div className="card-body profile-body mt-5">
            <p className="profile-p text-light">{me.username}</p>
            {myProfile ? (
              <>
                <p className="profile-p text-light">{myProfile?.teacher}</p>
                <p className="profile-p text-light">
                  Meditating since {myProfile?.years}
                </p>
                <p className="profile-p text-light">
                  Stage: {myProfile?.stage}
                </p>
                <p className="profile-p text-light">
                  Leaves in {me.location?.city}, {me.location?.state},{" "}
                  {me.location?.country}
                </p>
              </>
            ) : (
              <></>
            )}
          </div>

          <div className="card-footer profile-footer mt-5">
            <div className="row">
              <div className="col-6 edit-column">
                {myProfile ? (
                  <Link
                    className="btn btn-edit bg-primary rounded-0 text-light"
                    //  onClick={editProfile}
                    to="/ProfileForm"
                    // state: {updatePassedData}
                  >
                    update
                  </Link>
                ) : (
                  <Link
                    className="btn btn-edit bg-primary rounded-0 text-light"
                    // onClick={createProfile}
                    to="/ProfileForm"
                    state={{ me: me, myProfile: myProfile }}
                  >
                    add profile
                  </Link>
                )}
              </div>
              <div className="col-6 delete-column">
                <button
                  className="btn btn-delete bg-primary rounded-0 text-light"
                  onClick={removeProfile}
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-footer bg-primary">
        <Footer />
      </div>
    </div>
  );
};

export default Profile1;
