import React, { useState } from "react";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps";
// import ReactTooltip from "react-tooltip";
import { ADD_LOCATION, UPDATE_LOCATION } from "../../utils/mutations";
import { QUERY_LOCATIONS, QUERY_ME, QUERY_USERS } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { Navigate } from "react-router-dom";
import Auth from "../../utils/auth";
import API from "../../utils/API";
import Navbar from "../Navbar";
import Teachers from "../Teachers";
import Footer from "../Footer";
import allStates from "../../data/allstates.json";
import Spinner from "../Spinner";

import "./index.css";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};

const Usa = () => {
  const [location, setLocation] = useState("");
  const [notSupported, setNotSupported] = useState("");
  // Set state for the longitude and latitude
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  // Set state for the search result and the search query
  const [result, setResult] = useState({});
  const [error, setError] = useState("");
  // set state for progress bar
  const [value, setValue] = useState("10");
  const [showProgressBar, setShowProgressBar] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [confirm1, setConfirm1] = useState(false);


  const { data, loading, err } = useQuery(QUERY_ME);
  const me = data?.me || [];
  const username = me.username;

  const { data: usersData, usersLoading } = useQuery(QUERY_USERS);
  const users = usersData?.users || [];
  const {
    data: locationsData,
    locationsError,
    loadingLocations,
  } = useQuery(QUERY_LOCATIONS);
  const locations = locationsData?.locations || [];
  const userLocation = locations.filter(
    (location) => location.username === username
  );
  const myLocation = userLocation[0];
  const locationId = myLocation?._id;

  const markers = [];
  for (let location of locations) {
    const city = {
      cityName: location.city
    }
    const longitude = location.longitude;
    const latitude = location.latitude;

    const coordinatesObj = {
      city: city.cityName,
      coordinates: [longitude, latitude],
    };
    markers.push(coordinatesObj);
  }

  const city = result[0]?.name;
  const state = result[0]?.state;
  const country = result[0]?.country;

  // query locations from backend and pushing to [markers] to display meditators location on map

  const [addLocation] = useMutation(ADD_LOCATION, {
    update(cache, { data: { addLocation } }) {
      try {
        const { locations } = cache.readQuery({ query: QUERY_LOCATIONS });
        cache.writeQuery({
          query: QUERY_LOCATIONS,
          data: { locations: [...locations, addLocation] },
        });
      } catch (e) {
        console.error(e);
      }
      console.log("location successfully added to the cache");
    },
  });
  const [updateLocation] = useMutation(UPDATE_LOCATION);
  // function for progress bar
  const move = () => {
    let i = 0;
    if (i === 0) {
      i = 1;
      let width = 10;
      const id = setInterval(frame, 30);
      function frame() {
        if (width >= 100) {
          clearInterval(id);
          i = 0;
        } else {
          width++;
          // dynamically setting width for progress bar
          setValue(width);
        }
      }
    }
  };

  const searchCity = (longitude, latitude) => {
    API.search(longitude, latitude)
      .then((res) => setResult(res.data))
      .catch((err) => setError(err));
  };
  // geolocate user with getCurrentPosition methode
  const getLocation = () => {
    setShowProgressBar("show");
    // setProgress("40% completed");
    if (navigator.geolocation) {
      setLocation(navigator.geolocation.getCurrentPosition(showPosition));
      move();
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
    setValue("100");
    setShowProgressBar("");
  };
  const update = async () => {
    try {
      const { data } = await updateLocation({
        variables: {
          id: locationId,
          username: username,
          longitude: longitude,
          latitude: latitude,
          city: city,
          state: state,
          country: country,
        },
      });
      if (data) {
        console.log("success updating location");
      }
    } catch (e) {
      console.error(e);
    }
    setConfirm1(true);
    setResult({});
    setTimeout(() => {
      setConfirm1(false);
    }, 4000);
  };

  const handleSubmit = async () => {
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
    setConfirm(true);
    setResult({});
    setTimeout(() => {
      setConfirm(false);
    }, 4000);
  };

  if (!Auth.loggedIn()) {
    return <Navigate to="/" replace />;
  }

  if (loading || loadingLocations || usersLoading) {
    return <Spinner />;
  }
  if (err || locationsError) {
    return <>{error.toString()}</>;
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid main-usa bg-primary px-0">
        <div className="row buttons-row m-0">
          <div className="col-12 btn-locate bg-primary">
            <button
              className="btn-coordinates text-white"
              type="button"
              onClick={getLocation}
            >
              locate me
            </button>
          </div>
          {showProgressBar === "show" && !result.length && (
            <div className="col-12 bar bg-primary p-0 my-5">
              <div className="myProgress bg-dark">
                <div
                  className="myBar"
                  style={{ width: `${value}%` }}
                >{`${value}%`}</div>
              </div>
            </div>
          )}
          {result.length && !showProgressBar && (
            <div className="col-12 result justify-content-center align-items-center bg-primary p-0 my-5">
              You are located in {city}, {state}, {country}.
            </div>
          )}
          {result[0]?.country === "US" && !myLocation && (
            <div className=" col-12 btn-locate bg-primary">
              <button
                className="btn-coordinates text-white"
                type="button"
                onClick={handleSubmit}
              >
                save location
              </button>
            </div>
          )}
          {result[0]?.country === "US" && myLocation && (
            <div className="col-12 btn-locate bg-primary">
              <button
                className="btn-coordinates text-white"
                type="button"
                onClick={update}
              >
                update location
              </button>
            </div>
          )}
          {confirm && (
            <div className="col-12 btn-locate mt-5">
              <button
                className="btn-coordinates bg-success text-white"
                type="button"
              >
                location saved
              </button>
              {/* <p className="location-saved-p bg-success">location saved</p> */}
            </div>
          )}
          {confirm1 && (
            <div className="col-12 btn-locate mt-5">
              <button
                className="btn-coordinates bg-success text-primary"
                type="button"
              >
                location updated
              </button>
              {/* <p className="location-saved-p bg-success">location updated</p> */}
            </div>
          )}
        </div>
        <div className="map-container bg-primary">
          <ComposableMap projection="geoAlbersUsa" className="map" data-tip="">
            <Geographies geography={geoUrl}>
              {({ geographies }) => (
                <>
                  {geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
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
                      }}
                    />
                  ))}
                  {geographies.map((geo) => {
                    const centroid = geoCentroid(geo);
                    const cur = allStates.find((s) => s.val === geo.id);
                    return (
                      <g key={geo.rsmKey + "-name"}>
                        {cur &&
                          centroid[0] > -160 &&
                          centroid[0] < -67 &&
                          (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                            <Marker
                              coordinates={centroid}
                              style={{
                                default: {
                                  fill: "#000000",
                                },
                                hover: {
                                  fill: "#f69c26",
                                },
                                pressed: {
                                  fill: "#eeebea",
                                },
                              }}
                            >
                              <text y="2" textAnchor="middle">
                                {cur.id}
                              </text>
                            </Marker>
                          ) : (
                            <Annotation
                              subject={centroid}
                              dx={offsets[cur.id][0]}
                              dy={offsets[cur.id][1]}
                            >
                              <text
                                x={4}
                                fontSize={14}
                                alignmentBaseline="middle"
                              >
                                {cur.id}
                              </text>
                            </Annotation>
                          ))}
                      </g>
                    );
                  })}
                </>
              )}
            </Geographies>
            {markers.map(({city, coordinates}) => (
              <Marker key={coordinates} coordinates={coordinates}>
               <circle r={1} fill="#fff" />
               <text 
              //  textAnchor="middle"
              //  y={markerOffset}
                style={{ fontFamily: "system-ui", fill: "#fff" }}
             >
              {/* {city} */}
              </text> 
              </Marker>
            ))}
          </ComposableMap>
        </div>
        <Teachers />
        <p className="count-p fs-5 bg-primary text-light mt-5">
          {users?.length} users within the US.
        </p>
      </div>
      <div className="profile-footer bg-primary">
        <Footer />
      </div>
    </>
  );
};

export default Usa;
