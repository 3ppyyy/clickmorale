// src/components/GeneratingResult.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const GeneratingResult = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/result");
    }, 10000); // Simulate 10 seconds of quiz generation
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary via-black to-gray-900 text-white flex flex-col justify-center items-center px-6 text-center font-game overflow-hidden">
      {/* Gradient glow background */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 30%, rgba(94,234,212,0.5) 0%, transparent 60%),
            radial-gradient(circle at 70% 70%, rgba(253,224,71,0.5) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(168,85,247,0.4) 0%, transparent 60%)
          `,
          filter: "blur(100px)",
        }}
      />

      {/* Floating animated emojis */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 pointer-events-none text-[3.5rem] opacity-20 select-none">
          {[
            { x: "left-[10%]", y: "top-[10%]", icon: "❓" },
            { x: "right-[12%]", y: "top-[25%]", icon: "💡" },
            { x: "left-[20%]", y: "bottom-[20%]", icon: "🧠" },
            { x: "right-[24%]", y: "bottom-[15%]", icon: "🎲" },
            { x: "left-[50%]", y: "top-[15%]", icon: "📊" },
            { x: "left-[6%]", y: "top-[50%]", icon: "🗣️" },
            { x: "right-[5%]", y: "bottom-[35%]", icon: "🧩" },
            { x: "left-[45%]", y: "bottom-[10%]", icon: "🤔" },
            { x: "right-[35%]", y: "top-[40%]", icon: "🎯" },
          ].map((item, i) => (
            <motion.span
              key={i}
              className={`absolute ${item.x} ${item.y}`}
              animate={{ y: [0, -25, 0] }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {item.icon}
            </motion.span>
          ))}
        </div>
      )}

      <motion.h1
        className="text-3xl sm:text-5xl text-yellow-300 font-bold mb-4"
        initial={!isMobile ? { scale: 0.8, opacity: 0 } : {}}
        animate={!isMobile ? { scale: 1, opacity: 1 } : { opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Generating Your Result...
      </motion.h1>

      <motion.div
        className="text-xl sm:text-2xl italic mb-6"
        initial={{ opacity: 0 }}
        animate={!isMobile ? { opacity: [0, 1, 0], transition: { repeat: Infinity, duration: 2 } } : { opacity: 1 }}
      >
        Crunching your answers 🤓, decoding your vibes 🎭, and revealing your inner social spark ✨...
      </motion.div>

      {/* Loading Spinner - Always Visible */}
      <motion.div
        className="w-16 h-16 border-4 border-dashed border-white rounded-full animate-spin"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        className="mt-6 text-sm opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Let’s see how socially sharp you really are! 🧠🎯
      </motion.div>
    </div>
  );
};

export default GeneratingResult;
