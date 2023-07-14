import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
//   Annotaton,
  ZoomableGroup,
} from "react-simple-maps";
// import ReactTooltip from "react-tooltip";
// import "./index.css";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const markers = [
  {
    markerOffset: -15,
    name: "Sau Paulo",
    coordinates: [-58.3816, -34.6037],
  },
];

const Map = () => {
  return (
    <div className="map-container">
      <ComposableMap data-tip="">
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
  );
};
export default Map;
