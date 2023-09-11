import React from "react";
import { useQuery } from "@apollo/client";
import {
  QUERY_ME,
  QUERY_PROFILES,
  QUERY_LOCATIONS,
  QUERY_AVATARS,
  QUERY_CONTACTS,
  QUERY_REQUESTS,
} from "../../utils/queries";
import { FaEnvelope, FaIdBadge, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import DeleteModal from "../DeleteModal";
import Avatar from "../Avatar";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Spinner from "../Spinner";

import "./index.css";

const Profile = () => {
  const { data: meData, meDataLoading } = useQuery(QUERY_ME);
  const me = meData?.me || [];

  const { data: locationsData, locationsDataLoading } =
    useQuery(QUERY_LOCATIONS);
  const locations = locationsData?.locations || [];
  const userLocation = locations.filter(
    (location) => location.username === me.username
  );
  const myLocation = userLocation[0];
  const locationId = myLocation?._id;

  const { data: allProfiles, allProfilesLoading } = useQuery(QUERY_PROFILES);
  const profiles = allProfiles?.profiles || [];
  const userProfile = profiles.filter(
    (profile) => profile.username === me.username
  );
  const myProfile = userProfile[0];
  const profileId = myProfile?._id;

  const { data: avatarsData, avatarsDataLoading } = useQuery(QUERY_AVATARS);
  const avatars = avatarsData?.avatars || [];
  const userAvatar = avatars.filter(
    (avatar) => avatar.username === me.username
  );
  const myAvatar = userAvatar[0];
  const savedUrl = myAvatar?.avatarUrl;
  const avatarId = myAvatar?._id;

  const { data: contactsData, contactsDataLoading } = useQuery(QUERY_CONTACTS);
  const contacts = contactsData?.contacts || [];
  const myContacts = contacts.filter(
    (contact) => contact.username === me.username
  );

  const { data: requestsData, requestsDataLoading } = useQuery(QUERY_REQUESTS);
  const requests = requestsData?.requests || [];
  const contactRequests = [];
  if (requests) {
    for (let request of requests) {
      if (
        request.destinationName === me.username ||
        request.myName === me.username
      ) {
        contactRequests.push(request._id);
      }
    }
  }
  if (
    meDataLoading ||
    allProfilesLoading ||
    locationsDataLoading ||
    avatarsDataLoading ||
    contactsDataLoading ||
    requestsDataLoading
  ) {
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
                {myProfile?.firstname && myProfile?.lastname ? (
                  <h3>
                    {myProfile.firstname} {myProfile.lastname}
                  </h3>
                ) : (
                  <h3>{me.username}</h3>
                )}
              </div>
              <Avatar me={me} />
              <div className="card-body profile-body mt-5">
                <div className="p-info text-light px-5">
                  {myProfile?.story ? (
                    <>
                      <h4 className="about-profile mb-5">About</h4>
                      <p className="about-p text-light mb-5">
                        {myProfile.story}
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                  {(myProfile?.teacher === "teacher" ||
                    myProfile?.teacher === "Teacher") && (
                    <>
                      <h4 className="info-profile mb-5">Info</h4>
                      <p className="profile-p text-light">
                        Status: {myProfile.teacher}
                      </p>
                      <p className="profile-p text-light mb-5">
                        Has been meditating for {myProfile.years} years
                      </p>
                    </>
                  )}
                  {(myProfile?.teacher === "meditator" ||
                    myProfile?.teacher === "Meditator") && (
                    <>
                      <p className="profile-p text-light">
                        Status: {myProfile?.teacher}
                      </p>
                      <p className="profile-p text-light">
                        Has been meditating for: {myProfile?.years}
                      </p>
                      <p className="profile-p text-light mb-5">
                        Currently working on stage {myProfile?.stage}
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
                    {myLocation ? (
                      <p>
                        <FaHome /> {myLocation.city}, {myLocation.state},{" "}
                        {myLocation.country}
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
                        to="/UpdateMyProfileForm"
                        state={{ me: me, myProfile: myProfile }}
                      >
                        update
                      </Link>
                    ) : (
                      <Link
                        className="btn btn-edit bg-primary rounded-0 text-light"
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
            <div className="delete-text bg-primary text-light mx-5">
              Click
              <DeleteModal
                profileId={profileId}
                avatarId={avatarId}
                savedUrl={savedUrl}
                locationId={locationId}
                myContacts={myContacts}
                contactRequests={contactRequests}
                userId={me._id}
              />
              if you wish to delete your account.
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

export default Profile;
