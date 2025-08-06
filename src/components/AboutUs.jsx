import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

// MOBILE HOOK
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
};

const features = [
  {
    icon: "✨",
    title: "Personality-Driven",
    desc: "Get quiz results tailored uniquely to your personality traits.",
    color: "#6EE7B7",
    shadow: "shadow-teal-200",
  },
  {
    icon: "😄",
    title: "Playfully Insightful",
    desc: "Fun questions that make self-discovery engaging and light-hearted.",
    color: "#F87171",
    shadow: "shadow-pink-200",
  },
  {
    icon: "💡",
    title: "Built for Growth",
    desc: "Learn and improve your social skills with each quiz.",
    color: "#60A5FA",
    shadow: "shadow-blue-200",
  },
  {
    icon: "👥",
    title: "Inclusive by Design",
    desc: "Made for everyone, whether shy or outgoing.",
    color: "#C084FC",
    shadow: "shadow-purple-200",
  },
];

const AboutUs = () => {
  const isMobile = useIsMobile();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView) setHasAnimated(true);
  }, [inView]);

  return (
    <section className="bg-white pt-24 pb-28 px-6" id="about" ref={ref}>
      <div className="max-w-5xl mx-auto text-center">
        {isMobile ? (
          <>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-primary mb-6 tracking-tight">About Us</h2>
            <p className="text-lg sm:text-xl text-dark leading-relaxed font-medium mb-12">
              At <span className="font-bold text-accent">ClickMorale</span>, we believe learning about yourself should be{" "}
              <span className="text-primary font-semibold">fun</span>, interactive, and meaningful. Our personality quizzes are
              crafted to <span className="text-accent font-semibold">entertain</span>,{" "}
              <span className="text-primary font-semibold">educate</span>, and spark{" "}
              <span className="text-secondary font-semibold">self-discovery</span>.
            </p>
          </>
        ) : (
          <>
            <motion.h2
              className="text-4xl sm:text-5xl font-extrabold text-primary mb-6 tracking-tight"
              initial="hidden"
              animate={hasAnimated ? "visible" : "hidden"}
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6 }}
            >
              About Us
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl text-dark leading-relaxed font-medium mb-12"
              initial="hidden"
              animate={hasAnimated ? "visible" : "hidden"}
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              At <span className="font-bold text-accent">ClickMorale</span>, we believe learning about yourself should be{" "}
              <span className="text-primary font-semibold">fun</span>, interactive, and meaningful. Our personality quizzes are
              crafted to <span className="text-accent font-semibold">entertain</span>,{" "}
              <span className="text-primary font-semibold">educate</span>, and spark{" "}
              <span className="text-secondary font-semibold">self-discovery</span>.
            </motion.p>
          </>
        )}

        {/* Mission & Vision Cards */}
        <div className="grid gap-12 sm:grid-cols-2 text-left relative mb-20">
          {[
            {
              title: "Our Mission",
              icon: "🌟",
              color: "#14B8A6",
              text: (
                <>
                  To create enjoyable, insightful quizzes that help people explore their personalities and embrace who they are — all
                  while having a <span className="text-accent font-semibold">good time</span>.
                </>
              ),
              delay: 0.4,
            },
            {
              title: "Our Vision",
              icon: "🎯",
              color: "#F59E0B",
              text: (
                <>
                  To be the go-to platform for playful self-reflection, encouraging individuals to understand their social dynamics in a{" "}
                  <span className="text-secondary font-semibold">lighthearted</span> and{" "}
                  <span className="text-primary font-semibold">engaging</span> way.
                </>
              ),
              delay: 0.6,
            },
          ].map((item, i) =>
            isMobile ? (
              <div
                key={i}
                className="bg-white border-l-8 rounded-xl p-6 shadow-lg relative z-10 overflow-hidden"
                style={{ borderColor: item.color }}
              >
                <h3 className="text-2xl font-bold text-primary mb-2 flex items-center space-x-2 relative z-10">
                  <span className="text-4xl">{item.icon}</span>
                  <span>{item.title}</span>
                </h3>
                <p className="text-dark text-md leading-relaxed relative z-10">{item.text}</p>
              </div>
            ) : (
              <motion.div
                key={i}
                className="bg-white border-l-8 rounded-xl p-6 shadow-lg relative z-10 overflow-hidden"
                style={{ borderColor: item.color }}
                initial="hidden"
                animate={hasAnimated ? "visible" : "hidden"}
                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, delay: item.delay }}
              >
                <h3 className="text-2xl font-bold text-primary mb-2 flex items-center space-x-2 relative z-10">
                  <span className="text-4xl">{item.icon}</span>
                  <span>{item.title}</span>
                </h3>
                <p className="text-dark text-md leading-relaxed relative z-10">{item.text}</p>
              </motion.div>
            )
          )}
        </div>

        {/* Features Cards */}
        <div className="text-center max-w-7xl mx-auto mb-12">
          <h3 className="text-4xl font-extrabold text-primary mb-4 tracking-wide">Why Choose ClickMorale?</h3>
          <p className="text-lg text-dark max-w-3xl mx-auto">
            Our platform is designed to be fun, engaging, and inclusive — here’s why users love it.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto relative">
          {features.map(({ icon, title, desc, color, shadow }, index) =>
            isMobile ? (
              <div
                key={title}
                className={`bg-white rounded-xl p-8 flex flex-col space-y-4 cursor-pointer relative overflow-hidden ${shadow}`}
              >
                <div className="w-2 rounded-full absolute left-0 top-0 bottom-0" style={{ backgroundColor: color }} />
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="text-6xl mb-4 select-none" style={{ color }}>
                    {icon}
                  </div>
                  <h3 className="text-2xl font-extrabold text-primary tracking-wide">{title}</h3>
                  <p className="text-dark text-base">{desc}</p>
                </div>
              </div>
            ) : (
              <motion.div
                key={title}
                className={`bg-white rounded-xl p-8 flex flex-col space-y-4 cursor-pointer relative overflow-hidden ${shadow} hover:shadow-2xl hover:scale-105 transform transition-transform duration-300`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <motion.div
                  className="w-2 rounded-full absolute left-0 top-0 bottom-0"
                  style={{ backgroundColor: color }}
                  animate={{ boxShadow: `0 0 8px 3px ${color}` }}
                  transition={{ repeat: Infinity, repeatType: "mirror", duration: 2 }}
                />
                <div className="flex flex-col items-center text-center relative z-10">
                  <motion.div
                    className="text-6xl mb-4 select-none"
                    style={{ color }}
                    animate={{ y: ["0%", "-20%", "0%"] }}
                    transition={{ y: { duration: 0.6, yoyo: Infinity, ease: "easeOut" } }}
                  >
                    {icon}
                  </motion.div>
                  <h3 className="text-2xl font-extrabold text-primary tracking-wide">{title}</h3>
                  <p className="text-dark text-base">{desc}</p>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
