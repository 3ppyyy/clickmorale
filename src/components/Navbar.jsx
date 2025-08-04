import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Videos", id: "videos" },
  ];

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 bg-primary text-white px-6 py-4 shadow-lg"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center font-game relative">
        {/* Logo + Tagline */}
        <div className="flex flex-col">
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-2xl sm:text-3xl font-black flex items-center gap-2 text-yellow-300 cursor-pointer select-none"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            🎯 ClickMorale
          </motion.a>
          <small className="text-yellow-100 text-xs sm:text-sm font-light -mt-1 select-none">
            Discover your social vibe
          </small>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-sm sm:text-base font-semibold">
          {menuItems.map((item) => (
            <motion.li
              key={item.name}
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <a
                href={`#${item.id}`}
                className="hover:text-[#FEE440] transition duration-300 ease-in-out"
              >
                {item.name}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Fun Tagline */}
        <div className="hidden md:flex items-center">
          <span className="text-yellow-100 font-medium text-sm italic">
            Level up your social game!
          </span>
        </div>

        {/* Hamburger Button (Mobile) */}
        <div
          className="md:hidden cursor-pointer text-yellow-300 select-none z-50"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-full left-0 w-full bg-primary shadow-md md:hidden z-40"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ul className="text-center font-semibold text-sm py-4 space-y-3">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={`#${item.id}`}
                    className="block px-4 py-2 hover:text-[#FEE440] transition duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
