import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import Avatar from "../Avatar";
import Spinner from "../Spinner";
import Footer from "../Footer";
import Navbar from "../Navbar";

import "./index.css";

const Profile = () => {
  const { data, loading } = useQuery(QUERY_ME);
  const me = data?.me || [];

  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <Navbar />
      <div className="container-profile bg-primary">
        <div className="container-card">
          <div className="card profile-card">
            <div className="card-header profile-header">
              <h3>{me.username}</h3>
            </div>
            <div className="profile-icon">
                <Avatar me={me} />
            </div>
            <div className="card-body profile-body mt-5">
              <p className="profile-p">{me.email}</p>
              <p className="profile-p ">
                {me.location?.city} {me.location?.state} {me.location?.country}
              </p>
            </div>
            <div className="card-footer profile-footer">footer</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
