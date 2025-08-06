import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../index.css";
import { useNavigate } from "react-router-dom";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // run on load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
};

const Hero = ({ setLoading }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleStartQuiz = () => {
    setLoading(false);
    setTimeout(() => {
      setLoading(false);
      navigate("/instruction");
    }, 100);
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20 text-center overflow-hidden">
      {/* Gradient Background */}
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

      {/* SVG Blob */}
      <div
        className="absolute -z-10 pointer-events-none"
        style={{
          width: "400px",
          height: "400px",
          top: "50%",
          left: "50%",
          transform: "translate(calc(-125% + 20px), calc(-100% + 30px))",
        }}
      >
        <svg viewBox="0 0 1024 1024" width="1000" height="1000" className="fill-[#f0f9ff]">
          <path d="M700 100Q830 200 820 330T680 520T520 680T310 690T180 500T120 300T250 150T470 80T700 100Z" />
        </svg>
      </div>

      {/* Floating Icons */}
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
        ].map((item, i) =>
          isMobile ? (
            <span key={i} className={`absolute ${item.x} ${item.y}`}>
              {item.icon}
            </span>
          ) : (
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
          )
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 font-game max-w-xl">
        {isMobile ? (
          <>
            <h1 className="text-[3.5rem] sm:text-[4.5rem] font-black text-[#0F172A] mb-4 drop-shadow-[2px_2px_0px_#FFD700]">
              ClickMorale
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#EC4899] mb-4 uppercase tracking-wide drop-shadow-[1px_1px_0px_#FDE68A]">
              Discover Your <span className="text-[#3B82F6]">Social Vibe</span>!
            </h2>
            <p className="text-[#1E293B] text-lg mb-8 font-semibold drop-shadow-sm">
              Answer exciting questions to find out if you're a{" "}
              <span className="text-[#10B981] font-bold">social butterfly</span> 🦋 or a{" "}
              <span className="text-[#6366F1] font-bold">quiet genius</span> 🧠!
            </p>
            <button
              onClick={handleStartQuiz}
              className="px-8 py-4 bg-[#FACC15] text-[#0F172A] font-bold text-lg rounded-full shadow-lg hover:bg-yellow-300 transition uppercase tracking-wider"
            >
              🎯 Start the Quiz
            </button>
            <div className="bg-[#ECFDF5] border border-[#10B981] px-6 py-3 rounded-xl text-sm text-[#0F172A] shadow mt-6 max-w-md mx-auto">
              💬 You might actually enjoy this quiz more than you think 😄 — it's fun, simple, and made just for you!
            </div>
          </>
        ) : (
          <>
            <motion.h1
              className="text-[3.5rem] sm:text-[4.5rem] font-black text-[#0F172A] mb-4 drop-shadow-[2px_2px_0px_#FFD700]"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              ClickMorale
            </motion.h1>
            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-[#EC4899] mb-4 uppercase tracking-wide drop-shadow-[1px_1px_0px_#FDE68A]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Discover Your <span className="text-[#3B82F6]">Social Vibe</span>!
            </motion.h2>
            <motion.p
              className="text-[#1E293B] text-lg mb-8 font-semibold drop-shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Answer exciting questions to find out if you're a{" "}
              <span className="text-[#10B981] font-bold">social butterfly</span> 🦋 or a{" "}
              <span className="text-[#6366F1] font-bold">quiet genius</span> 🧠!
            </motion.p>
            <motion.button
              onClick={handleStartQuiz}
              className="px-8 py-4 bg-[#FACC15] text-[#0F172A] font-bold text-lg rounded-full shadow-lg hover:bg-yellow-300 transition uppercase tracking-wider"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              🎯 Start the Quiz
            </motion.button>
            <motion.div
              className="bg-[#ECFDF5] border border-[#10B981] px-6 py-3 rounded-xl text-sm text-[#0F172A] shadow mt-6 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              💬 You might actually enjoy this quiz more than you think 😄 — it's fun, simple, and made just for you!
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;
