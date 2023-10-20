import React from "react";
import { FaEnvelope, FaIdBadge, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";/
import useMyContacts from "../../Hooks/UseMyContacts";
import useMyRequests from "../../Hooks/UseMyRequests";
import Auth from "../../utils/auth";
import DeleteModal from "../DeleteModal";
import Avatar from "../Avatar";
import Footer from "../Footer";
import Navbar from "../Navbar";
// import Spinner from "../Spinner";
import "./index.css";

const Profile = () => {
  // import hooks to have data ready to go for profile display. This avoids doing and writing 6 queries in this page
  const { me, myContacts } = useMyContacts();
  const { myRequestsIds } = useMyRequests();
  const myAvatarUrl = me.avatar?.avatarUrl;
  const myLocation = me.location;
  const myProfile = me.profile;
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log("user from profile", user);
  //     } else {
  //       console.log("no firebase user");
  //       // console.log("auth", auth);
  //       // signInWithEmailAndPassword(auth, email, password);
  //     }
  //   });
  // }, [user]);

  // building a list of all user's contacts ids to be passed as props to delete modal for deleting user's account
  const myContactsIds = [];
  if (myContacts) {
    for (let contact of myContacts) {
      myContactsIds.push(contact._id);
    }
  }

  if (!Auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Navbar />
      <div
        className="container-fluid profile bg-primary"
        style={{ borderColor: "primary" }}
      >
        {!myAvatarUrl || !myProfile || !myLocation ? (
          <p className="profile-warning text-light">
            Once you have successfully created your profile, uploaded your
            profile picture and saved your location from within the "locate"
            page, your profile will be visible to everyone.
          </p>
        ) : (
          <></>
        )}
        <div className="row">
          <div className="col-12">
            <div className="card profile-card">
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
              <Avatar me={me} />
              <div className="card-body profile-body mt-5">
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
              </div>
              <div className="card-footer profile-footer">
                <div className="row">
                  <div className="col-12 edit-column">
                    {me.profile ? (
                      <Link
                        className="btn btn-edit bg-primary rounded-0 text-light"
                        to="/UpdateMyProfileForm"
                        state={{ me: me, myProfile: me.profile }}
                      >
                        update
                      </Link>
                    ) : (
                      <Link
                        className="btn btn-edit bg-primary rounded-0 text-light"
                        to="/ProfileForm"
                        state={{ me: me, myProfile: me.profile }}
                      >
                        add profile
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 bottom-text text-light mx-0">
            Click
            <DeleteModal
              profileId={me.profile?._id}
              avatarId={me.avatar?._id}
              savedUrl={me.avatar?.avatarUrl}
              locationId={me.location?._id}
              myContactsIds={myContactsIds}
              myRequestsIds={myRequestsIds}
              userId={me._id}
            />
            if you wish to delete your account.
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
