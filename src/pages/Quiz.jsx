import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { useNavigate } from "react-router-dom";
import GeneratingResult from "../components/GeneratingResult";

const originalQuestions = [
  {
    text: "🤔 How do you usually spend your weekends?",
    options: [
      { text: "📚 Reading or watching alone", type: "introvert" },
      { text: "🧑‍🤝‍🧑 Hanging with close friends", type: "extrovert" },
      { text: "🎉 Parties & meeting people", type: "extrovert" },
      { text: "🎲 Depends on the mood", type: "ambivert" },
    ],
  },
  {
    text: "🧑‍💼 What do you prefer during a group activity?",
    options: [
      { text: "🌟 Observing and planning", type: "introvert" },
      { text: "🤝 Supporting the team", type: "ambivert" },
      { text: "🎤 Leading and speaking", type: "extrovert" },
      { text: "🎭 Going with the flow", type: "ambivert" },
    ],
  },
  {
    text: "📱 Your phone rings. What's your reaction?",
    options: [
      { text: "😬 Ignore and text later", type: "introvert" },
      { text: "💬 Pick up if it’s a friend", type: "ambivert" },
      { text: "📞 Answer immediately", type: "extrovert" },
      { text: "🤷 Depends on who's calling", type: "ambivert" },
    ],
  },
  {
    text: "🧩 Which best describes you?",
    options: [
      { text: "🧘 Calm and quiet", type: "introvert" },
      { text: "😌 Balanced and thoughtful", type: "ambivert" },
      { text: "🔥 Energetic and bold", type: "extrovert" },
      { text: "🌊 Adaptive and mixed", type: "ambivert" },
    ],
  },
  {
    text: "🎓 In school, you were known as...",
    options: [
      { text: "📖 The quiet achiever", type: "introvert" },
      { text: "😄 Friendly and helpful", type: "ambivert" },
      { text: "🎬 Loud and confident", type: "extrovert" },
      { text: "🎭 All of the above", type: "ambivert" },
    ],
  },
  {
    text: "☕ Your perfect break is...",
    options: [
      { text: "📺 A cozy solo Netflix binge", type: "introvert" },
      { text: "🧑‍🤝‍🧑 Chat with a close friend", type: "ambivert" },
      { text: "🎊 Dancing or socializing", type: "extrovert" },
      { text: "🌀 Just chill, whatever happens", type: "ambivert" },
    ],
  },
  {
    text: "🌐 In online meetings, you're most likely to...",
    options: [
      { text: "👀 Stay muted and listen", type: "introvert" },
      { text: "💡 Add a few helpful ideas", type: "ambivert" },
      { text: "🎙️ Be the main speaker", type: "extrovert" },
      { text: "🌀 Switch roles depending", type: "ambivert" },
    ],
  },
  {
    text: "🎮 Pick a game style you vibe with:",
    options: [
      { text: "🧩 Puzzle and solo games", type: "introvert" },
      { text: "👯 Co-op and team games", type: "ambivert" },
      { text: "⚔️ Competitive and fast", type: "extrovert" },
      { text: "🎲 Random fun games", type: "ambivert" },
    ],
  },
  {
    text: "🎤 How do you feel about public speaking?",
    options: [
      { text: "😰 Please no!", type: "introvert" },
      { text: "😅 I can if I must", type: "ambivert" },
      { text: "😎 Love the spotlight!", type: "extrovert" },
      { text: "🤔 Depends on the topic", type: "ambivert" },
    ],
  },
  {
    text: "🎯 What motivates your decisions?",
    options: [
      { text: "🔍 Deep thinking", type: "introvert" },
      { text: "❤️ People’s feelings", type: "ambivert" },
      { text: "🏆 Ambition", type: "extrovert" },
      { text: "🎲 A mix of everything", type: "ambivert" },
    ],
  },
  {
    text: "🌅 What’s your favorite time of day?",
    options: [
      { text: "🌃 Late night solitude", type: "introvert" },
      { text: "🌄 Early morning peace", type: "ambivert" },
      { text: "☀️ Busy, bright afternoon", type: "extrovert" },
      { text: "🌆 Twilight mood zone", type: "ambivert" },
    ],
  },
  {
    text: "✈️ Vacation goal?",
    options: [
      { text: "📚 Explore museums quietly", type: "introvert" },
      { text: "🏞️ Hike with a buddy", type: "ambivert" },
      { text: "🎉 Big cities and nightlife", type: "extrovert" },
      { text: "🌀 Go where the wind blows", type: "ambivert" },
    ],
  },
  {
    text: "📖 When learning something new, you...",
    options: [
      { text: "🧠 Dive deep alone", type: "introvert" },
      { text: "👯‍♀️ Join a study group", type: "ambivert" },
      { text: "🎤 Present & explain to others", type: "extrovert" },
      { text: "🎲 Mix methods every time", type: "ambivert" },
    ],
  },
  {
    text: "🗣️ How do you process emotions?",
    options: [
      { text: "📝 Journal or reflect", type: "introvert" },
      { text: "🧑‍🤝‍🧑 Talk with someone", type: "ambivert" },
      { text: "🎧 Music or expression", type: "extrovert" },
      { text: "🌀 Varies each time", type: "ambivert" },
    ],
  },
  {
    text: "🧠 What’s your thinking style?",
    options: [
      { text: "🔬 Analytical", type: "introvert" },
      { text: "🤝 Empathetic", type: "ambivert" },
      { text: "🚀 Bold & instinctive", type: "extrovert" },
      { text: "🌪️ Hybrid & flexible", type: "ambivert" },
    ],
  },
];

const STORAGE_KEY = "clickmorale-quiz-progress";
const ANSWERS_KEY = "clickmorale-quiz-answers";
const QUESTIONS_KEY = "clickmorale-quiz-questions";

const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const Quiz = () => {
  const { width, height } = useWindowSize();
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem(QUESTIONS_KEY);
    if (saved) return JSON.parse(saved);
    const shuffled = shuffleArray(originalQuestions).slice(0, 10);
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(shuffled));
    return shuffled;
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confettiBurst, setConfettiBurst] = useState(null);
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem(ANSWERS_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [completed, setCompleted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const savedIndex = localStorage.getItem(STORAGE_KEY);
    if (savedIndex) setCurrentIndex(parseInt(savedIndex));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (index, e) => {
    const rect = e.target.getBoundingClientRect();
    setSelected(index);

    setConfettiBurst({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      id: Date.now(),
    });

    const selectedOption = questions[currentIndex].options[index];
    const newAnswers = [...answers];
    newAnswers[currentIndex] = {
      question: questions[currentIndex].text,
      answer: selectedOption.text,
      type: selectedOption.type,
    };
    setAnswers(newAnswers);
    localStorage.setItem(ANSWERS_KEY, JSON.stringify(newAnswers));

    setTimeout(() => {
      setSelected(null);
      setConfettiBurst(null);

      if (currentIndex + 1 < questions.length) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        localStorage.setItem(STORAGE_KEY, nextIndex);
      } else {
        localStorage.removeItem(STORAGE_KEY);
        setCompleted(true);
      }
    }, 1400);
  };

  const restartQuiz = () => {
    const reshuffled = shuffleArray(originalQuestions).slice(0, 10);
    setQuestions(reshuffled);
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(reshuffled));
    setCurrentIndex(0);
    setAnswers([]);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ANSWERS_KEY);
    setCompleted(false);
    setSelected(null);
    setConfettiBurst(null);
    window.scrollTo(0, 0);
  };

  const [showGenerating, setShowGenerating] = useState(false);
  const navigate = useNavigate();

  const handleGetResult = () => {
    setShowGenerating(true);
    setTimeout(() => {
      navigate("/result");
    }, 3000);
  };

  if (showGenerating) return <GeneratingResult />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-black to-gray-900 text-white flex flex-col items-center justify-center px-6 py-10 relative overflow-hidden">
      {confettiBurst && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={200}
          recycle={false}
          gravity={0.6}
          run={true}
          confettiSource={{
            x: confettiBurst.x,
            y: confettiBurst.y,
            w: 10,
            h: 10,
          }}
          colors={["#00FFC2", "#8E2DE2", "#FF61D2", "#FEC260", "#ffffff"]}
        />
      )}
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

      {/* 🎉 Quiz Completed UI */}
      {completed ? (
        <motion.div
          initial={!isMobile ? { scale: 0.8, opacity: 0 } : {}}
          animate={!isMobile ? { scale: 1, opacity: 1 } : { opacity: 1 }}
          className="bg-white/10 p-10 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-lg text-center max-w-xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pink-400 mb-4">🎉 Congrats!</h2>
          <p className="text-lg text-gray-200 mb-6">You've completed the quiz. Ready to see your result?</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to restart the quiz?")) {
                  restartQuiz();
                }
              }}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full transition"
            >
              🔄 Restart Quiz
            </button>
            <button
              onClick={handleGetResult}
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-full transition"
            >
              🧠 Get Result
            </button>
          </div>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={!isMobile ? { opacity: 0, y: 40 } : {}}
            animate={!isMobile ? { opacity: 1, y: 0 } : { opacity: 1 }}
            exit={!isMobile ? { opacity: 0, y: -40 } : {}}
            transition={!isMobile ? { duration: 0.5 } : {}}
            className="relative w-full max-w-3xl bg-white/5 p-8 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-md"
          >
            {/* Top Bar */}
            <div className="w-full flex justify-between items-center text-sm text-gray-300 mb-6">
              <span className="bg-black/30 px-4 py-2 rounded-full shadow">
                Question {currentIndex + 1} / {questions.length}
              </span>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to restart the quiz?")) {
                    restartQuiz();
                  }
                }}
                className="text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full shadow transition-all"
              >
                🔄 Restart
              </button>
            </div>

            {/* Question */}
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-center mb-8"
              animate={!isMobile ? { scale: [1, 1.03, 1] } : {}}
              transition={!isMobile ? { repeat: Infinity, duration: 2 } : {}}
            >
              {currentQuestion.text}
            </motion.h2>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {currentQuestion.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  onClick={(e) => handleAnswer(idx, e)}
                  whileHover={!isMobile ? { scale: 1.05 } : {}}
                  whileTap={!isMobile ? { scale: 0.9, rotate: 1 } : {}}
                  className={`w-full px-6 py-4 rounded-2xl border border-white/10 font-medium text-left transition-all duration-300 relative ${
                    selected === idx
                      ? "bg-green-500 text-white shadow-lg"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {opt.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Progress Bar */}
      {!completed && (
        <div className="w-full max-w-3xl h-3 bg-white/10 rounded-full mt-10 overflow-hidden">
          <motion.div
            className="h-full bg-pink-500"
            initial={!isMobile ? { width: 0 } : {}}
            animate={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
            transition={!isMobile ? { duration: 0.6 } : {}}
          />
        </div>
      )}

      {/* Footer Note */}
      <motion.div
        className="text-sm text-gray-400 mt-6"
        animate={!isMobile ? { opacity: [0.8, 1, 0.8] } : {}}
        transition={!isMobile ? { repeat: Infinity, duration: 3 } : {}}
      >
        ✨ Choose what resonates. Trust your vibe!
      </motion.div>
    </div>
  );
};

export default Quiz;
