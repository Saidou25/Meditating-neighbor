import React from "react";
import "./index.css";

const Image = ({ src, alt, style }) => {
  const sourcFunct = () => {
    if (!src) {
      return;
    }
    switch (src) {
      case "/static/media/profileicon.33c53d9af9e71b2a663e.png":
        return src;
      case "/static/media/trash.499e9c77416f98a64dd6.jpg":
        return src;
      default:
        return src;
    }
  };

  return (
    <img
      className="img-fluid img-fit"
      src={sourcFunct(src)}
      alt={alt}
      style={style}
    />
  );
};
export default Image;
