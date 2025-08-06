import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GeneratingQuiz from "../components/GeneratingQuiz";

const Instruction = () => {
  const navigate = useNavigate();
  const [showGenerating, setShowGenerating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleStart = () => {
    localStorage.removeItem("clickmorale-quiz-progress"); // Reset saved quiz progress
    setShowGenerating(true); // Show fun screen
    setTimeout(() => {
      navigate("/quiz");
    }, 3000);
  };

  // Detect mobile devices
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (showGenerating) return <GeneratingQuiz />;

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
            animate={!isMobile ? { y: [0, -25, 0] } : {}}
            transition={!isMobile ? {
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
            } : {}}
          >
            {item.icon}
          </motion.span>
        ))}
      </div>

      {/* Main Text */}
      <motion.h1
        initial={!isMobile ? { scale: 0.9, opacity: 0 } : {}}
        animate={!isMobile ? { scale: 1, opacity: 1 } : { opacity: 1 }}
        transition={!isMobile ? { duration: 0.6 } : {}}
        className="text-4xl sm:text-5xl font-bold text-yellow-300 mb-4 z-10"
      >
        Ready to Level Up Your Social Vibe? 🎮
      </motion.h1>

      <p className="text-lg sm:text-xl text-yellow-100 mb-6 max-w-xl z-10">
        This quiz will reveal your social personality — introvert, ambivert, or full-on social wizard! 🔮💬
      </p>

      {/* Instructions Box */}
      <div className="bg-black bg-opacity-40 rounded-2xl p-6 max-w-md w-full text-left text-yellow-100 shadow-lg mb-8 z-10">
        <ul className="space-y-3 list-disc list-inside">
          <li>🧠 Answer honestly—no right or wrong!</li>
          <li>⏱️ Each question is timed (but no stress!)</li>
          <li>💡 You'll get fun insights at the end!</li>
        </ul>
      </div>

      {/* Button to Start */}
      <motion.button
        whileHover={!isMobile ? { scale: 1.1 } : {}}
        whileTap={!isMobile ? { scale: 0.95 } : {}}
        onClick={handleStart}
        className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition z-10"
      >
        Let’s Go! 🚀
      </motion.button>
    </div>
  );
};

export default Instruction;
