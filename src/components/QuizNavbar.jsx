import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import bgMusic from "../assets/audio/happy-bg.mp3";

const QuizNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.5); // Default volume 50%

  // Load mute and volume state from localStorage
  useEffect(() => {
    const savedMute = localStorage.getItem("clickmorale-muted");
    const savedVolume = localStorage.getItem("clickmorale-volume");

    if (savedMute === "true") {
      setMuted(true);
    }

    if (savedVolume) {
      const parsed = parseFloat(savedVolume);
      if (!isNaN(parsed)) setVolume(parsed);
    }
  }, []);

  // Handle autoplay after user gesture
  useEffect(() => {
    const audio = audioRef.current;

    const handleUserGesture = () => {
      if (audio && audio.paused) {
        audio.volume = volume;
        audio.muted = muted;
        audio.play().catch(() => {});
      }
      document.removeEventListener("click", handleUserGesture);
    };

    document.addEventListener("click", handleUserGesture);
    return () => document.removeEventListener("click", handleUserGesture);
  }, [muted, volume]);

  // Apply volume change to audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleMute = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    localStorage.setItem("clickmorale-muted", newMuted.toString());
    if (audioRef.current) {
      audioRef.current.muted = newMuted;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    localStorage.setItem("clickmorale-volume", newVolume.toString());
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/instruction":
        return "Quiz Instructions";
      case "/quiz":
        return "Quiz In Progress";
      case "/result":
        return "Your Results";
      default:
        return "";
    }
  };

  return (
      <motion.nav
        className="fixed top-0 w-full z-50 bg-primary text-white px-4 sm:px-6 py-3 sm:py-4 shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto flex flex-wrap sm:flex-nowrap justify-between items-center font-game gap-y-2">
          {/* 🧠 Logo */}
          <motion.div
            className="text-xl sm:text-3xl font-black text-yellow-300 cursor-pointer select-none flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            🎯 ClickMorale
          </motion.div>

          {/* Page Title */}
          <div className="flex-1 text-center sm:text-base text-xs text-yellow-100 italic font-light w-full sm:w-auto">
            {getPageTitle()}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-wrap sm:flex-nowrap justify-center sm:justify-end w-full sm:w-auto">
            {/* 🔇 Mute Button */}
            <motion.button
              onClick={toggleMute}
              className="text-yellow-300 hover:text-yellow-100 text-xl"
              aria-label="Toggle Mute"
              whileHover={{ scale: 1.1 }}
            >
              {muted ? "🔇" : "🎵"}
            </motion.button>

            {/* 🔊 Volume Slider */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-2 accent-yellow-300 cursor-pointer"
              title={`Volume: ${Math.round(volume * 100)}%`}
            />

            {/* 🚪 Exit Button */}
            {location.pathname !== "/result" && (
              <motion.button
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-3 py-1 rounded-lg text-sm shadow-md transition duration-300"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to exit the quiz? Your progress will be lost."
                    )
                  ) {
                    localStorage.removeItem("clickmorale-answers");
                    localStorage.removeItem("clickmorale-result");
                    localStorage.removeItem("clickmorale-questions");

                    navigate("/");
                  }
                }}
                whileHover={{ scale: 1.05 }}
              >
                Exit Quiz
              </motion.button>
            )}
          </div>
        </div>

        {/* 🔊 Background Audio */}
        <audio
          ref={audioRef}
          src={bgMusic}
          loop
          autoPlay
          muted={muted}
          volume={volume}
        />
      </motion.nav>
  );
};

export default QuizNavbar;
