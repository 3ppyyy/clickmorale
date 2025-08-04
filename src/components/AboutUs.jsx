import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

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

const bounceTransition = {
  y: {
    duration: 0.6,
    yoyo: Infinity,
    ease: "easeOut",
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const AboutUs = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView) setHasAnimated(true);
  }, [inView]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-white pt-24 pb-28 px-6" id="about" ref={ref}>
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-primary mb-6 tracking-tight"
          variants={fadeInUp}
          initial="hidden"
          animate={hasAnimated ? "visible" : "hidden"}
          transition={{ duration: 0.6 }}
        >
          About Us
        </motion.h2>

        <motion.p
          className="text-lg sm:text-xl text-dark leading-relaxed font-medium mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate={hasAnimated ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          At <span className="font-bold text-accent">ClickMorale</span>, we believe learning about yourself should be{" "}
          <span className="text-primary font-semibold">fun</span>, interactive, and meaningful. Our personality quizzes are
          crafted to <span className="text-accent font-semibold">entertain</span>,{" "}
          <span className="text-primary font-semibold">educate</span>, and spark{" "}
          <span className="text-secondary font-semibold">self-discovery</span>. Whether you’re exploring your social style or
          simply having fun, there’s always something exciting waiting for you.
        </motion.p>

        <div className="grid gap-12 sm:grid-cols-2 text-left relative mb-20">

            {/* Mission */}
            <motion.div
            className="bg-white border-l-8 rounded-xl p-6 shadow-lg relative z-10 overflow-hidden"
            style={{ borderColor: "#14B8A6" }}
            variants={fadeInUp}
            initial="hidden"
            animate={hasAnimated ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.4 }}
            >
            {/* Confetti dots */}
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                backgroundImage:
                    "radial-gradient(circle at 15% 25%, rgba(255, 215, 0, 0.1) 2px, transparent 3px), radial-gradient(circle at 45% 75%, rgba(20, 184, 166, 0.1) 2px, transparent 3px), radial-gradient(circle at 80% 30%, rgba(59, 130, 246, 0.1) 2px, transparent 3px)",
                backgroundRepeat: "repeat",
                backgroundSize: "20px 20px",
                }}
            />
            <h3 className="text-2xl font-bold text-primary mb-2 flex items-center space-x-2 relative z-10">
                <span className="text-4xl">🌟</span>
                <span>Our Mission</span>
            </h3>
            <p className="text-dark text-md leading-relaxed relative z-10">
                To create enjoyable, insightful quizzes that help people explore their personalities and embrace who they are — all while
                having a <span className="text-accent font-semibold">good time</span>.
            </p>
            </motion.div>

            {/* Vision */}
            <motion.div
            className="bg-white border-l-8 rounded-xl p-6 shadow-lg relative z-10 overflow-hidden"
            style={{ borderColor: "#F59E0B" }}
            variants={fadeInUp}
            initial="hidden"
            animate={hasAnimated ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.6 }}
            >
            {/* Confetti dots */}
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                backgroundImage:
                    "radial-gradient(circle at 15% 25%, rgba(255, 215, 0, 0.1) 2px, transparent 3px), radial-gradient(circle at 45% 75%, rgba(20, 184, 166, 0.1) 2px, transparent 3px), radial-gradient(circle at 80% 30%, rgba(59, 130, 246, 0.1) 2px, transparent 3px)",
                backgroundRepeat: "repeat",
                backgroundSize: "20px 20px",
                }}
            />
            <h3 className="text-2xl font-bold text-primary mb-2 flex items-center space-x-2 relative z-10">
                <span className="text-4xl">🎯</span>
                <span>Our Vision</span>
            </h3>
            <p className="text-dark text-md leading-relaxed relative z-10">
                To be the go-to platform for playful self-reflection, encouraging individuals to understand their social dynamics in a{" "}
                <span className="text-secondary font-semibold">lighthearted</span> and{" "}
                <span className="text-primary font-semibold">engaging</span> way.
            </p>
            </motion.div>

        </div>

        {/* WHY CHOOSE CLICKMORALE FEATURE CARDS */}
        <div className="text-center max-w-7xl mx-auto mb-12">
          <motion.h3
            className="text-4xl font-extrabold text-primary mb-4 tracking-wide"
            variants={fadeInUp}
            initial="hidden"
            animate={hasAnimated ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Why Choose ClickMorale?
          </motion.h3>
          <motion.p
            className="text-lg text-dark max-w-3xl mx-auto"
            variants={fadeInUp}
            initial="hidden"
            animate={hasAnimated ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Our platform is designed to be fun, engaging, and inclusive — here’s why users love it.
          </motion.p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto relative">
          {features.map(({ icon, title, desc, color, shadow }, index) => (
            <motion.div
              key={title}
              className={`bg-white rounded-xl p-8 flex flex-col space-y-4 cursor-pointer relative overflow-hidden ${shadow} hover:shadow-2xl hover:scale-105 transform transition-transform duration-300`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Accent bar with pulse */}
              <motion.div
                className="w-2 rounded-full absolute left-0 top-0 bottom-0"
                style={{ backgroundColor: color }}
                animate={{ boxShadow: `0 0 8px 3px ${color}` }}
                transition={{ repeat: Infinity, repeatType: "mirror", duration: 2 }}
                aria-hidden="true"
              />

              <div className="flex flex-col items-center text-center relative z-10">
                {/* Bounce emoji icon */}
                <motion.div
                  className="text-6xl mb-4 select-none"
                  style={{ color: color }}
                  aria-label={title + " icon"}
                  animate={{ y: ["0%", "-20%", "0%"] }}
                  transition={bounceTransition}
                >
                  {icon}
                </motion.div>

                <h3 className="text-2xl font-extrabold text-primary tracking-wide">{title}</h3>
                <p className="text-dark text-base">{desc}</p>
              </div>

              {/* Confetti dots */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 10% 20%, rgba(255, 215, 0, 0.15) 2px, transparent 3px), radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.15) 2px, transparent 3px), radial-gradient(circle at 80% 30%, rgba(232, 121, 234, 0.15) 2px, transparent 3px)",
                  backgroundRepeat: "repeat",
                  backgroundSize: "20px 20px",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
