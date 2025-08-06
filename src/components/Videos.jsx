import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VideoCard = ({ src, title, delay, isMobile }) => (
  <motion.div
    initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 30 }}
    whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
    transition={isMobile ? {} : { duration: 0.6, delay }}
    viewport={{ once: true }}
  >
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        className="bg-white w-full h-full rounded-md"
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
    <p className="mt-2 text-sm font-semibold text-[#0F172A] drop-shadow-sm">{title}</p>
  </motion.div>
);

const Videos = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categories = [
    {
      title: "🧠 Essential Social Skills",
      color: "text-[#14B8A6]",
      videos: [
        { src: "https://www.youtube.com/embed/7wUCyjiyXdg", title: "Active Listening" },
        { src: "https://www.youtube.com/embed/l_NYrWqUR40", title: "Building Confidence" },
        { src: "https://www.youtube.com/embed/3ML_uBKpD6Y", title: "Thinking Before Speaking" },
        { src: "https://www.youtube.com/embed/53Yu91Ya0wY", title: "Handling Rejection" },
        { src: "https://www.youtube.com/embed/mJLROKV2SzU", title: "Reading Emotions" },
        { src: "https://www.youtube.com/embed/Gf4FIt5DG4g", title: "Respecting Boundaries" },
      ],
    },
    {
      title: "💬 Conversation & Small Talk",
      color: "text-[#3B82F6]",
      videos: [
        { src: "https://www.youtube.com/embed/lKYy94zodbk", title: "Starting Conversations" },
        { src: "https://www.youtube.com/embed/0q2X3yVwGMk", title: "Breaking the Ice" },
        { src: "https://www.youtube.com/embed/0rIjFCNay2Q", title: "Maintaining Flow" },
        { src: "https://www.youtube.com/embed/caAURGZBLeY", title: "Being Present" },
        { src: "https://www.youtube.com/embed/yJG--x80VxI", title: "Ending Gracefully" },
        { src: "https://www.youtube.com/embed/6K9LhzyLUfY", title: "Fun Topics to Discuss" },
      ],
    },
    {
      title: "🤝 Body Language & Presence",
      color: "text-[#FACC15]",
      videos: [
        { src: "https://www.youtube.com/embed/VRJzvJ5XPQI", title: "Confident Posture" },
        { src: "https://www.youtube.com/embed/TNRx0xDamtc", title: "Mirroring Gestures" },
        { src: "https://www.youtube.com/embed/8OGDhlUvSK4", title: "Eye Contact Basics" },
        { src: "https://www.youtube.com/embed/TaXcQmlSnbw", title: "Avoiding Fidgeting" },
        { src: "https://www.youtube.com/embed/m0SstuhI79A", title: "Tone of Voice" },
        { src: "https://www.youtube.com/embed/zn2iRG7bI2I", title: "Expressive Hands" },
      ],
    },
  ];

  const toggleCategory = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section className="relative min-h-screen py-24 px-6 text-center overflow-hidden" id="videos">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 30%, rgba(94,234,212,0.5) 0%, transparent 60%),
            radial-gradient(circle at 70% 70%, rgba(253,224,71,0.5) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(168,85,247,0.4) 0%, transparent 60%)
          `,
          filter: "blur(100px)",
        }}
      />

      {/* Floating Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none text-[3.5rem] opacity-10 select-none text-[#0F172A]">
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
            animate={isMobile ? {} : { y: [0, -25, 0] }}
            transition={
              isMobile
                ? {}
                : {
                    duration: 6 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          >
            {item.icon}
          </motion.span>
        ))}
      </div>

      {/* Section Title */}
      <motion.h2
        className={`text-4xl sm:text-5xl font-extrabold mb-4 text-[#0F172A] relative z-10 drop-shadow-[2px_2px_0px_#FACC15] ${isMobile ? 'opacity-100' : 'opacity-0'}`}
        initial={isMobile ? false : { opacity: 0, y: -20 }}
        whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={isMobile ? { duration: 0.6 } : { duration: 0.6 }}
      >
        Learn Through Videos
      </motion.h2>

      <motion.p
        className="text-lg text-[#334155] mb-12 relative z-10"
        initial={isMobile ? false : { opacity: 0, y: -10 }}
        whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={isMobile ? { duration: 0.5, delay: 0.2 } : { duration: 0.5, delay: 0.2 }}
      >
        Bite-sized lessons to boost your social skills, confidence, and presence.
      </motion.p>

      {/* Category Sections */}
      <AnimatePresence>
        {categories.map((cat, i) => {
          const isExpanded = expanded[i];
          const visibleVideos = isExpanded ? cat.videos : cat.videos.slice(0, 3);

          return (
            <motion.div
              key={i}
              layout
              initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 30 }}
              animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={isMobile ? { opacity: 0 } : { opacity: 0, y: 30 }}
              transition={isMobile ? {} : { duration: 0.5 }}
              className="bg-white border border-gray-200 rounded-xl p-10 mb-16 relative z-10 max-w-6xl mx-auto"
            >
              <motion.h3
                className={`text-2xl font-semibold ${cat.color} mb-4 drop-shadow-[1px_1px_0px_#14B8A6]`}
                initial={isMobile ? false : { opacity: 0, y: 20 }}
                whileInView={isMobile ? false : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={isMobile ? {} : { duration: 0.5, delay: 0.1 * i }}
              >
                {cat.title}
              </motion.h3>

              <div className={`grid ${isMobile ? 'grid-cols-1' : 'sm:grid-cols-2 md:grid-cols-3'} gap-6`}>
                {visibleVideos.map((v, idx) => (
                  <VideoCard key={idx} src={v.src} title={v.title} delay={idx * 0.2} isMobile={isMobile} />
                ))}
              </div>

              {cat.videos.length > 3 && (
                <button
                  onClick={() => toggleCategory(i)}
                  className="mt-10 text-sm text-[#0F172A] bg-yellow-300 hover:bg-yellow-400 font-semibold px-4 py-2 rounded-full transition-all"
                >
                  {isExpanded ? "Show Less ▲" : "Show More ▼"}
                </button>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </section>
  );
};

export default Videos;
