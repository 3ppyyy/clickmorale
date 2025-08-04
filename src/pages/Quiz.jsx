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
      "📚 Reading or watching alone",
      "🧑‍🤝‍🧑 Hanging with close friends",
      "🎉 Parties & meeting people",
      "🎲 Depends on the mood",
    ],
  },
  {
    text: "🧑‍💼 What do you prefer during a group activity?",
    options: [
      "🌟 Observing and planning",
      "🤝 Supporting the team",
      "🎤 Leading and speaking",
      "🎭 Going with the flow",
    ],
  },
  {
    text: "📱 Your phone rings. What's your reaction?",
    options: [
      "😬 Ignore and text later",
      "💬 Pick up if it’s a friend",
      "📞 Answer immediately",
      "🤷 Depends on who's calling",
    ],
  },
  {
    text: "🧩 Which best describes you?",
    options: [
      "🧘 Calm and quiet",
      "😌 Balanced and thoughtful",
      "🔥 Energetic and bold",
      "🌊 Adaptive and mixed",
    ],
  },
  {
    text: "🎓 In school, you were known as...",
    options: [
      "📖 The quiet achiever",
      "😄 Friendly and helpful",
      "🎬 Loud and confident",
      "🎭 All of the above",
    ],
  },
  {
    text: "☕ Your perfect break is...",
    options: [
      "📺 A cozy solo Netflix binge",
      "🧑‍🤝‍🧑 Chat with a close friend",
      "🎊 Dancing or socializing",
      "🌀 Just chill, whatever happens",
    ],
  },
  {
    text: "🌐 In online meetings, you're most likely to...",
    options: [
      "👀 Stay muted and listen",
      "💡 Add a few helpful ideas",
      "🎙️ Be the main speaker",
      "🌀 Switch roles depending",
    ],
  },
  {
    text: "🎮 Pick a game style you vibe with:",
    options: [
      "🧩 Puzzle and solo games",
      "👯 Co-op and team games",
      "⚔️ Competitive and fast",
      "🎲 Random fun games",
    ],
  },
  {
    text: "🎤 How do you feel about public speaking?",
    options: [
      "😰 Please no!",
      "😅 I can if I must",
      "😎 Love the spotlight!",
      "🤔 Depends on the topic",
    ],
  },
  {
    text: "🎯 What motivates your decisions?",
    options: [
      "🔍 Deep thinking",
      "❤️ People’s feelings",
      "🏆 Ambition",
      "🎲 A mix of everything",
    ],
  },
  {
    text: "🌅 What’s your favorite time of day?",
    options: [
      "🌃 Late night solitude",
      "🌄 Early morning peace",
      "☀️ Busy, bright afternoon",
      "🌆 Twilight mood zone",
    ],
  },
  {
    text: "✈️ Vacation goal?",
    options: [
      "📚 Explore museums quietly",
      "🏞️ Hike with a buddy",
      "🎉 Big cities and nightlife",
      "🌀 Go where the wind blows",
    ],
  },
  {
    text: "📖 When learning something new, you...",
    options: [
      "🧠 Dive deep alone",
      "👯‍♀️ Join a study group",
      "🎤 Present & explain to others",
      "🎲 Mix methods every time",
    ],
  },
  {
    text: "🗣️ How do you process emotions?",
    options: [
      "📝 Journal or reflect",
      "🧑‍🤝‍🧑 Talk with someone",
      "🎧 Music or expression",
      "🌀 Varies each time",
    ],
  },
  {
    text: "🧠 What’s your thinking style?",
    options: [
      "🔬 Analytical",
      "🤝 Empathetic",
      "🚀 Bold & instinctive",
      "🌪️ Hybrid & flexible",
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

  useEffect(() => {
    const savedIndex = localStorage.getItem(STORAGE_KEY);
    if (savedIndex) setCurrentIndex(parseInt(savedIndex));
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

    const newAnswers = [...answers];
    newAnswers[currentIndex] = questions[currentIndex].options[index];
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

      {/* 🎉 Quiz Completed UI */}
      {completed ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
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
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
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
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {currentQuestion.text}
            </motion.h2>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {currentQuestion.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  onClick={(e) => handleAnswer(idx, e)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9, rotate: 1 }}
                  className={`w-full px-6 py-4 rounded-2xl border border-white/10 font-medium text-left transition-all duration-300 relative ${
                    selected === idx
                      ? "bg-green-500 text-white shadow-lg"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {opt}
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
            initial={{ width: 0 }}
            animate={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
            transition={{ duration: 0.6 }}
          />
        </div>
      )}

      {/* Footer Note */}
      <motion.div
        className="text-sm text-gray-400 mt-6"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        ✨ Choose what resonates. Trust your vibe!
      </motion.div>
    </div>
  );
};

export default Quiz;
