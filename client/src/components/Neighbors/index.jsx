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
  console.log("username", username);

  const {
    data: locationData,
    locationLoading,
    locationError,
  } = useQuery(QUERY_LOCATIONS);
  const locations = locationData?.locations || [];
  //   const username = me.username;
  console.log("locations", locations);

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
          List of your TMI neighbors
        </h3>
        {locations &&
          locations.map((location) => (
            <div key={location._id} className="card card-locations">
              <div className="card-header">
                <p className="location text-light">{location.username}</p>
              </div>
              <div className="card-body">
                <p className="location text-light">{location.city}</p>
                <p className="location text-light">{location.state}</p>
                <p className="location text-light">{location.country}</p>
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </>
  );
};
export default Neighbors;
