import React, { useState } from "react";
import { ADD_LOCATION } from "../../utils/mutations";
import { QUERY_LOCATIONS, QUERY_ME, QUERY_USERS } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  // ZoomableGroup,
} from "react-simple-maps";
import Navbar from "../Navbar";
import Footer from "../Footer";
import API from "../../utils/API";
import Spinner from "../Spinner";
import "./index.css";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const Map = () => {
  const [location, setLocation] = useState("");
  const [notSupported, setNotSupported] = useState("");
  // Set state for the longitude and latitude
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  // Set state for the search result and the search query
  const [result, setResult] = useState({});
  const [error, setError] = useState("");

  const { data: usersData, usersLoading } = useQuery(QUERY_USERS);
  const users = usersData?.users || [];

  const {
    data: locationsData,
    locationsError,
    loadingLocations,
  } = useQuery(QUERY_LOCATIONS);
  const locations = locationsData?.locations || [];
  // console.log("locations", locations);

  const markers = [];
  for (let location of locations) {
    const coordin = {
      city: location.city,
      coordinates: [location.longitude, location.latitude],
    };
    markers.push(coordin);
  }

  const city = result[0]?.name;
  const state = result[0]?.state;
  const country = result[0]?.country;

  // query locations from backend and pushing to [markers] to display meditators location on map

  const { data, loading, err } = useQuery(QUERY_ME);
  const me = data?.me || [];
  const username = me.username;

  const [addLocation] = useMutation(ADD_LOCATION, {
    update(cache, { data: { addLocation } }) {
      try {
        const { locations } = cache.readQuery({ query: QUERY_LOCATIONS });
        cache.writeQuery({
          query: QUERY_LOCATIONS,
          data: { locations: [addLocation, ...locations] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const searchCity = (longitude, latitude) => {
    API.search(longitude, latitude)
      .then((res) => setResult(res.data))
      .catch((err) => setError(err));
  };
  // geolocate user with getCurrentPosition methode
  const getLocation = () => {
    if (navigator.geolocation) {
      setLocation(navigator.geolocation.getCurrentPosition(showPosition));
      console.log("location", location);
    } else {
      setNotSupported("Geolocation is not supported by this browser.");
      console.log("not supported", notSupported);
    }
  };

  const showPosition = (position) => {
    const lat = position.coords.latitude;
    setLatitude(lat);
    const lon = position.coords.longitude;
    setLongitude(lon);
    searchCity(lon, lat);
  };

  const handleSubmit = async () => {
    console.log(typeof longitude);
    try {
      const { data } = await addLocation({
        variables: {
          username: username,
          longitude: longitude,
          latitude: latitude,
          city: city,
          state: state,
          country: country,
        },
      });
      if (data) {
        console.log("success adding location");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading || loadingLocations || usersLoading) {
    return <Spinner />;
  }
  if (err || locationsError) {
    return <>{error.toString()}</>;
  }
  return (
    <>
      <Navbar />
      <div className="container-fluid main-map bg-primary">
      <div className="map">
        <ComposableMap
          data-tip=""
          className="map"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} 
                style={{
                  default: {
                    fill: "#000000",
                  },
                  hover: {
                    fill: "#f63b26",
                  },
                  pressed: {
                    fill: "#eeebea",
                  },
                }}/>
              ))
            }
          </Geographies>
          {markers.map(({ city, coordinates }) => (
            <Marker key={city} coordinates={coordinates}>
              <circle r={0.3} fill="#fff" stroke="#fff" strokeWidth={0.05} />
              <text
                textAnchor="middle"
                // y={markerOffset}
                // style={{ fontFamily: "system-ui", fill: "#fff" }}
              >
                {/* {city} */}
              </text>
            </Marker>
          ))}
        </ComposableMap>
      </div>
      <p className="count-map fs-5 bg-primary text-light">
        {users?.length} users
      </p>
      </div>
      <div className="profile-footer bg-primary">
        <Footer />
      </div>
    </>
  );
};
export default Map;
