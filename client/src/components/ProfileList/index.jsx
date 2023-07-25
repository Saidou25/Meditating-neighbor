import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ProfileModal from "../ProfileModal";
// import ProfilePortal from "../ProfilePortal";
import profileIcon from "../../assets/images/profileicon.png";
import "./index.css";

const ProfileList = (props) => {
  const seventyFiveMiles = props.seventyFiveMiles;
  const overSeventyFiveMiles = props.overSeventyFiveMiles;

  return (
    <>
      <Navbar />
      <div className="container-neighbors bg-primary">
        <h3 className="locations-list-title text-white">
          {seventyFiveMiles.length ? <>Within a 75 miles radius</> : <></>}
        </h3>
        <div className="row card-row">
          {seventyFiveMiles &&
            seventyFiveMiles.map((distanceObj, index) => (
              <div key={index} className="col-3 card-column">
                <div className="card card-locations bg-primary">
                  <div className="card-body">
                    <div className="row profiles-row">
                      <div className="col-12 profiles-column">
                        {!distanceObj.avatarUrl ? (
                          <img
                            className="container-pic mb-4"
                            src={profileIcon}
                            alt="profile icon"
                            style={{ width: 150, height: 150 }}
                          />
                        ) : (
                          <img
                            className="container-pic mb-4"
                            src={distanceObj.avatarUrl}
                            alt="profile icon"
                            style={{ width: 150, height: 150 }}
                          />
                        )}
                      </div>
                      <div className="col-12 profiles-column">
                        <p className="location text-light">
                          {distanceObj.username}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <ProfileModal
                      username={distanceObj.username}
                      avatarUrl={distanceObj.avatarUrl}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
        <h3 className="locations-list-title text-white">
          Over a 75 miles radius
        </h3>
        <div className="row card-row">
          {overSeventyFiveMiles &&
            overSeventyFiveMiles.map((distanceObj, index) => (
              <div key={index} className="col-3 card-column">
                <div className="card card-locations bg-primary">
                  <div className="card-body">
                    <div className="row profiles-row">
                      <div className="col-12 profiles-column">
                        {!distanceObj.avatarUrl ? (
                          <img
                            className="container-pic mb-4"
                            src={profileIcon}
                            alt="profile icon"
                            style={{ width: 150, height: 150 }}
                          />
                        ) : (
                          <img
                            className="container-pic mb-4"
                            src={distanceObj.avatarUrl}
                            alt="profile icon"
                            style={{ width: 150, height: 150 }}
                          />
                        )}
                      </div>
                      <div className="col-12 profiles-column">
                        <p className="location text-light">
                          {distanceObj.username}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <ProfileModal
                      username={distanceObj.username}
                      avatarUrl={distanceObj.avatarUrl}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ProfileList;
