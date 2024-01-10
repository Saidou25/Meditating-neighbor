import React, { useState, useEffect } from "react";
// import Spinner from "../../components/Spinner";
import "./index.css";

const LandingPageTitle = ({ pageLoading }) => {

  const [wordEffect, setMainEffect] = useState("");
  const [liliEffect, setLiliEffect] = useState("");
  const [liliEffect2, setLiliEffect2] = useState("");

  let letters = "tmiworld";

  useEffect(() => {
    if (!pageLoading) {
      setMainEffect("effect");
      setLiliEffect("ready");
      setLiliEffect2("solid-letter");
    } else {
      setMainEffect("");
      setLiliEffect("");
      setLiliEffect2("");
    }
  }, [pageLoading, wordEffect]);

  return (
    <div className="main">
      <div>
        <ul className={`word ${wordEffect}`}>
          {letters &&
            letters.split("").map((letter, i) => (
              <li className={`lili ${liliEffect}${i}`} key={i}>
                <span
                  className={
                    letter === "t" || letter === "m" || letter === "i"
                      ? `solid-letter ${liliEffect2}${i}`
                      : ""
                  }
                >
                  {letter}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
export default LandingPageTitle;
