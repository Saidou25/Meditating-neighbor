import React from "react";
import { QUERY_LOCATIONS, QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./index.css";

const Neighbors = () => {
  const { data, loading, err } = useQuery(QUERY_ME);
  const me = data?.me || [];
  const username = me.username;
  // console.log("username", username);

  const {
    data: locationData,
    locationLoading,
    locationError,
  } = useQuery(QUERY_LOCATIONS);
  const locations = locationData?.locations || [];
  // console.log("locations", allLocations);

  // Calculates distance between user's geolocation and other user's
  const seventyFiveMiles = [];
  const overSeventyFiveMiles = [];

  const distance = (myLat, myLon, location) => {
    const r = 6371; // km
    const p = Math.PI / 180;
    const usersLat = location.latitude;
    const usersLon = location.longitude;

    const a =
      0.5 -
      Math.cos((usersLat - myLat) * p) / 2 +
      (Math.cos(myLat * p) *
        Math.cos(usersLat * p) *
        (1 - Math.cos((usersLon - myLon) * p))) /
        2;

    const distance2 = 2 * r * Math.asin(Math.sqrt(a)) * 0.62;
    const distanceObj = {
      distance2: distance2,
      username: location.username,
      city: location.city,
      state: location.state,
      country: location.country,
    };
// conditionally pushing the object distance to arrays for "within a radius display"
    distance2 <= 50
      ? seventyFiveMiles.push(distanceObj)
      : overSeventyFiveMiles.push(distanceObj);

    return 2 * r * Math.asin(Math.sqrt(a));
  };

  // getting user's coordinates(longitutde and latitude)
  const myLocation = locations.filter(
    (location) => location.username === username
  );
  const myLat = myLocation[0]?.latitude;
  const myLon = myLocation[0]?.longitude;

  // gathering each user info and send data to distance()
  for (let location of locations) {
    distance(myLat, myLon, location);
  }

  if (loading || locationLoading) {
    return <>loading...</>;
  }
  if (err || locationError) {
    return (
      <>
        {err.toString()} {locationError.toString()}
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container-neighbors bg-primary">
        <h3 className="locations-list-title text-white">
          Within a 75 miles radius
        </h3>
        {seventyFiveMiles &&
          seventyFiveMiles.map((distanceObj) => (
            <div key={distanceObj.username} className="card card-locations">
              <div className="card-header">
                <p className="location text-light">{distanceObj.username}</p>
              </div>
              <div className="card-body">
                <p className="location text-light">
                  {distanceObj.distance2} miles
                </p>
                <p className="location text-light">{distanceObj.city}</p>
                <p className="location text-light">{distanceObj.state}</p>
                <p className="location text-light">{distanceObj.country}</p>
                <p className="location text-light">{distanceObj.longitude}</p>
                <p className="location text-light">{distanceObj.latitude}</p>
              </div>
            </div>
          ))}
        <h3 className="locations-list-title text-white">
          Over a 75 miles radius
        </h3>
        {overSeventyFiveMiles &&
          overSeventyFiveMiles.map((distanceObj) => (
            <div key={distanceObj._id} className="card card-locations">
              <div className="card-header">
                <p className="location text-light">{distanceObj.username}</p>
              </div>
              <div className="card-body">
                <p className="location text-light">
                  {distanceObj.distance2} miles
                </p>
                <p className="location text-light">{distanceObj.city}</p>
                <p className="location text-light">{distanceObj.state}</p>
                <p className="location text-light">{distanceObj.country}</p>
                <p className="location text-light">{distanceObj.longitude}</p>
                <p className="location text-light">{distanceObj.latitude}</p>
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </>
  );
};
export default Neighbors;
