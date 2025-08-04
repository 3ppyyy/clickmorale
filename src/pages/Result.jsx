import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { motion } from "framer-motion";

const Result = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);
  const [resultSummary, setResultSummary] = useState("");
  const [personalityType, setPersonalityType] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem("clickmorale-quiz-questions")) || [];
    const savedAnswers = JSON.parse(localStorage.getItem("clickmorale-quiz-answers")) || [];

    setQuestions(savedQuestions);
    setAnswers(savedAnswers);

    if (savedAnswers.length) {
      let introvertScore = 0;
      let extrovertScore = 0;
      let ambivertScore = 0;

      savedAnswers.forEach((answer) => {
        if (answer.type === "introvert") introvertScore++;
        else if (answer.type === "extrovert") extrovertScore++;
        else if (answer.type === "ambivert") ambivertScore++;
      });

      if (introvertScore > extrovertScore && introvertScore > ambivertScore) {
        setPersonalityType("Introvert");
        setResultSummary(
          "You enjoy your own company and value peace, deep conversations, and solo adventures."
        );
      } else if (extrovertScore > introvertScore && extrovertScore > ambivertScore) {
        setPersonalityType("Extrovert");
        setResultSummary(
          "You're energized by people, love to socialize, and thrive in group activities!"
        );
      } else {
        setPersonalityType("Ambivert");
        setResultSummary(
          "You enjoy both alone time and social moments. You balance quiet and chaos perfectly!"
        );
      }
    }

    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const clearQuizData = () => {
    localStorage.removeItem("clickmorale-quiz-answers");
    localStorage.removeItem("clickmorale-quiz-questions");
  };

  const handleExit = () => {
    clearQuizData();
    navigate("/");
  };

  const handleRetake = () => {
    if (confirm("Are you sure you want to retake the quiz? Your answers will be reset.")) {
      clearQuizData();
      navigate("/instruction");
    }
  };

  const shareText = `I just found out I'm an ${personalityType} on ClickMorale! 🧠🎯 Try the quiz: https://clickmorale.netlify.app`;


  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
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

      {/* Floating quiz icons (bigger and scattered full screen) */}
        <div className="absolute inset-0 z-0 pointer-events-none text-[3.5rem] opacity-20 select-none flex items-center justify-center">
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
          {showConfetti && <Confetti width={width} height={height} />}
        </div>

        <div className="pt-5 relative z-10 flex flex-col items-center justify-center min-h-screen pt-24 pb-12">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-6 text-pink-600 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            🎉 Your Personality Result: <br />
            <span className="text-purple-700 mt-10">{personalityType}</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-gray-800 max-w-2xl mb-8 leading-relaxed text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {resultSummary}
          </motion.p>

          {/* Share Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-semibold shadow"
            >
              🐦 Share on Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://clickmorale.netlify.app`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-full font-semibold shadow"
            >
              📘 Share on Facebook
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold shadow"
            >
              📲 Share on WhatsApp
            </a>
          </motion.div>


          <motion.div
            className="text-left w-full max-w-xl p-6 bg-white rounded-2xl shadow-xl border border-pink-200 mb-10 overflow-y-auto max-h-[300px] sm:max-h-[400px] scroll-smooth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl font-bold mb-4 text-pink-600">📝 Your Answers:</h2>
            <ul className="space-y-4 text-sm sm:text-base pr-2">
          {questions.map((q, index) => (
            <li key={index}>
              <p className="font-semibold text-gray-800">Q{index + 1}: {q.text}</p>
              <p className="text-purple-700 ml-2">👉 {answers[index]?.answer}</p>
            </li>
          ))}
            </ul>
          </motion.div>
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            onClick={handleRetake}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full transition duration-300 shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            🔁 Retake Quiz
          </motion.button>

          <motion.button
            onClick={() => {
              const confirmExit = window.confirm("❓ Are you sure you want to exit to the homepage?");
              if (confirmExit) {
                handleExit();
              }
            }}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            🚪 Exit to Home
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Result;
