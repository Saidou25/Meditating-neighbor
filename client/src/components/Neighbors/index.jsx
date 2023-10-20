import React from "react";
import { QUERY_USERS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { v4 } from "uuid";
import Auth from "../../utils/auth";
import useMyInfo from "../../Hooks/UseMyInfo";
import ProfileList from "../ProfileList";
import Spinner from "../Spinner";
import "./index.css";

const Neighbors = () => {
  const { me } = useMyInfo();
  let noUserYet = "true";
  const { data: usersData, usersLaoding, usersError } = useQuery(QUERY_USERS);
  const users = usersData?.users || [];

  // Calculates distance between user's geolocation and other users
  const seventyFiveMiles = [];
  const overSeventyFiveMiles = [];

  const distance = (myLat, myLon, user) => {
    const r = 6371; // km
    const p = Math.PI / 180;
    const userLat = user.location?.latitude;
    const userLon = user.location?.longitude;

    const a =
      0.5 -
      Math.cos((userLat - myLat) * p) / 2 +
      (Math.cos(myLat * p) *
        Math.cos(userLat * p) *
        (1 - Math.cos((userLon - myLon) * p))) /
        2;

    const distance2 = 2 * r * Math.asin(Math.sqrt(a)) * 0.62;

    // building a distance object to push users data and pass data around in components
    const distanceObj = {
      id: v4(),
      distance2: distance2,
      user: user,
      me: me,
      username: user.username,
      city: user.location?.city,
      state: user.location?.state,
      country: user.location?.country,
      avatarUrl: user.avatar?.avatarUrl,
    };
    // conditionally pushing the object distance to arrays for "within a radius display"
    distance2 <= 50
      ? seventyFiveMiles.push(distanceObj)
      : overSeventyFiveMiles.push(distanceObj);

    return 2 * r * Math.asin(Math.sqrt(a));
  };

  // // getting user's coordinates(longitutde and latitude)
  const myLat = me.location?.latitude;
  const myLon = me.location?.longitude;

  // gathering each user info (exept loggedin user) and send data to distance()
  const allUsersButMe = users.filter((user) => user.username !== me.username);

  for (let user of allUsersButMe) {
    if (user.location && user.profile && user.avatar)
      distance(myLat, myLon, user);
  }

  if (usersLaoding) {
    return <Spinner />;
  }
  if (usersError) {
    return <>{usersError.toString()}</>;
  }
  if (noUserYet === "false") {
    <h1>No user yet</h1>;
  }
  if (!Auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <ProfileList
        seventyFiveMiles={seventyFiveMiles}
        overSeventyFiveMiles={overSeventyFiveMiles}
        me={me}
      />
    </>
  );
};
export default Neighbors;
