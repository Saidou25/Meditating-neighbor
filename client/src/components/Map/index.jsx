import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  //   Annotaton,
  ZoomableGroup,
} from "react-simple-maps";
import Navbar from "../Navbar";
import API from "../../utils/API";
import Footer from "../Footer";
// import ReactTooltip from "react-tooltip";
import "./index.css";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const Map = () => {
  const [location, setLocation] = useState("");
  const [notSupported, setNotSupported] = useState("");
  // Set state for the longitude and latitude
  const [lat, setLatitude] = useState("");
  const [lon, setLongitude] = useState("");
  // Set state for the search result and the search query
  const [result, setResult] = useState({});
  const [error, setError] = useState("");

  const city = result[0]?.name;
  const state = result[0]?.state;
  const country = result[0]?.country;
  const markers = [
    {
      markerOffset: -15,
      city: city,
      coordinates: [lon, lat],
    },
  ];

  const searchCity = (lon, lat) => {
    API.search(lon, lat)
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

  return (
    <>
      <Navbar />
      <div className="container-btn bg-primary">
        <button
          className="btn text-white coordinates"
          type="button"
          onClick={getLocation}
        >
          locate me
        </button>
      </div>
      {result.length ? (
        <div className="result bg-primary">
          {city}, {state}, {country}.
        </div>
      ) : (
        <></>
      )}
      <div className="map-container bg-primary">
        <ComposableMap data-tip="" className="map">
          <ZoomableGroup zoom={1}>
            {" "}
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography key={geo.rsmKey} geography={geo} />
                ))
              }
            </Geographies>
            {markers.map(({ name, coordinates, markerOffset }) => (
              <Marker key={name} coordinates={coordinates}>
                <circle r={1} fill="#F00" stroke="#fff" strokeWidth={2} />
                <text
                  textAnchor="middle"
                  y={markerOffset}
                  style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                >
                  {name}
                </text>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>
      <Footer />
    </>
  );
};
export default Map;
