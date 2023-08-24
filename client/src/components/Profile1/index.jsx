import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME, QUERY_PROFILES, QUERY_LOCATIONS } from "../../utils/queries";
import { DELETE_PROFILE } from "../../utils/mutations";
import { FaEnvelope, FaIdBadge, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Spinner from "../Spinner";

import "./index.css";

const Profile1 = () => {
  const [me, setMe] = useState("");
  const [myProfile, setMyProfile] = useState("");
  const [profileId, setProfileId] = useState("");

  const { data, loading } = useQuery(QUERY_ME);
  const { data: profileData, profileLoading } = useQuery(QUERY_PROFILES);

  const { data: locationData } = useQuery(QUERY_LOCATIONS);
  const locations = locationData?.locations || [];
  const myLocation = locations.filter(
    (location) => location.username === me.username
  );

  useEffect(() => {
    if (profileData && data) {
      const me = data?.me || [];
      const profiles = profileData?.profiles || [];
      const userProfile = profiles.filter(
        (profile) => profile.username === me.username
      );
      const myProfile = userProfile[0];
      const id = myProfile?._id;
      setMe(me);
      setMyProfile(userProfile[0]);
      setProfileId(id);
    }
  }, [profileData, data]);

  const [deleteProfile] = useMutation(DELETE_PROFILE, {
    variables: { id: profileId },
    update(cache, { data: { deleteProfile } }) {
      try {
        const { profiles } = cache.readQuery({ query: QUERY_PROFILES });
        cache.writeQuery({
          query: QUERY_PROFILES,
          data: {
            profiles: [
              ...profiles.filter(
                (profile) => profile._id !== deleteProfile._id
              ),
            ],
          },
        });
        console.log("success updating cache with deleteProfile");
      } catch (e) {
        console.error(e);
      }
    },
  });

  const removeProfile = async () => {
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
      <div
        className="container-fluid profile bg-primary"
        style={{ borderColor: "primary" }}
      >
        <div className="row">
          <div className="col-12">
            <div className="card profile-card">
              <div className="card-header profile-header mt-3">
                <h3>{me.username}</h3>
              </div>
              <Avatar me={me} />
              <div className="card-body profile-body mt-5">
              <div className="p-info text-light px-5">
                {myProfile ? (
                  <>
                    <h4 className="about-profile mb-5">About</h4>
                    {myProfile.story ? (
                      <p className="about-p text-light mb-5">{myProfile.story}</p>
                    ) : (
                      <></>
                    )}
                    <h4 className="info-profile mb-5">Info</h4>
                    <p className="profile-p text-light">
                      Meditating for {myProfile.years} years
                    </p>
                    <p className="profile-p text-light">
                      Currently working on stage {myProfile.stage}
                    </p>
                  </>
                ) : (
                  <></>
                )}
                <div className="p-fas text-light mt-5">
                <p>
                  <FaIdBadge /> {me.username}
                </p>
                <p>
                  <FaEnvelope /> {me.email}
                </p>
                {me.location ? (
                  <p>
                    <FaHome /> {me.location.city}, {me.location?.state},{" "}
                    {me.location.country}
                  </p>
                ) : (
                  <></>
                )}
              </div>
              </div>
              </div>
              <div className="card-footer profile-footer mt-5">
                <div className="row">
                  <div className="col-12 edit-column">
                    {profileId ? (
                      <Link
                        className="btn btn-edit bg-primary rounded-0 text-light"
                        //  onClick={editProfile}
                        to="/UpdateMyProfileForm"
                        state={{ me: me, myProfile: myProfile }}
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
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 bottom-text mx-0">
            <p className="delete-text bg-primary text-light mx-5">
              Click
              <button
                className="delete-btn bg-primary text-info"
                onClick={removeProfile}
              >
                here
              </button>{" "}
              if you wish to delete your account.
            </p>
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
