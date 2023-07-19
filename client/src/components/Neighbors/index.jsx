import React from "react";
import { QUERY_USERS, QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import ProfileList from "../ProfileList";
import "./index.css";

const Neighbors = () => {
  const { data, loading, err } = useQuery(QUERY_ME);
  const me = data?.me || [];
  const { data: usersData, usersLaoding, usersError } = useQuery(QUERY_USERS);
  const users = usersData?.users || [];

  // Calculates distance between user's geolocation and other user's
  const seventyFiveMiles = [];
  const overSeventyFiveMiles = [];

  const distance = (myLat, myLon, user) => {
    const r = 6371; // km
    const p = Math.PI / 180;
    const userLat = user.location.latitude;
    const userLon = user.location.longitude;

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
      distance2: distance2,
      username: user.username,
      city: user.location.city,
      state: user.location.state,
      country: user.location.country,
      avatarUrl: user.profile?.avatarUrl,
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

  // gathering each user info and send data to distance()
  for (let user of users) {
    distance(myLat, myLon, user);
  }

  if (loading || usersLaoding) {
    return <>loading...</>;
  }
  if (err || usersError) {
    return (
      <>
        {err.toString()} {usersError.toString()}
      </>
    );
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
