import React from "react";
import "./Loader.css"; // Ensure you have the correct CSS file

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="hacker-loader">
        <div className="loader-text">
          <span data-text="Initializing..." className="text-glitch">Initializing...</span>
        </div>
        <div className="loader-bar">
          <div className="bar-fill"></div>
          <div className="bar-glitch"></div>
        </div>
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
