import React, { useState } from "react";
import "./index.css";

const ProgressBar = () => {
  const [value, setValue] = useState("10");
  let i = 0;
  const move = () => {
    if (i === 0) {
      i = 1;
      let width = 10;
      const id = setInterval(frame, 10);
      function frame() {
        if (width >= 100) {
          clearInterval(id);
          i = 0;
        } else {
          width++;
          setValue(width);
        }
      }
    }
  };
  return (
    <div>
      <div id="myProgress">
        <div id="myBar" style={{ width: `${value}%` }}>{`${value}%`}</div>
      </div>
      <div className="percent">
        <button
          className="percent-btn bg-primary text-light fs-3"
          onClick={move}
        >
          Click Me
        </button>
      </div>
    </div>
  );
};

export default ProgressBar;
