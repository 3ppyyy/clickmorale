// src/components/Loader.jsx
import React from "react";
import "../index.css"; // Make sure loader CSS is defined here

const Loader = () => {
  return (
    <div className="relative h-screen flex items-center justify-center bg-white font-game select-none">
      {/* Centered Loader */}
      <div id="loader" className="loader"></div>

      {/* Bottom Brand Text */}
      <div className="absolute bottom-6 w-full text-center text-3xl sm:text-4xl font-extrabold text-yellow-400 animate-pulse drop-shadow-[0_0_12px_rgba(255,215,0,0.7)]">
        ClickMorale
      </div>
    </div>
  );
};

export default Loader;
