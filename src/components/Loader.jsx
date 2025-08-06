// src/components/Loader.jsx
import React from "react";
import "../index.css"; // Make sure loader CSS is defined here

// Hook to detect if user is on mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

const Loader = () => {
  const isMobile = useIsMobile(); // Check if the user is on mobile

  return (
    <div className="relative h-screen flex items-center justify-center bg-white font-game select-none">
      {/* Centered Loader */}
      <div id="loader" className={`loader ${isMobile ? '' : 'animate-loader'}`}></div>

      {/* Bottom Brand Text */}
      <div className={`absolute bottom-6 w-full text-center text-3xl sm:text-4xl font-extrabold text-yellow-400 ${isMobile ? '' : 'animate-pulse drop-shadow-[0_0_12px_rgba(255,215,0,0.7)]'}`}>
        ClickMorale
      </div>
    </div>
  );
};

export default Loader;
