const Footer = () => {
  return (
    <footer className="bg-primary text-white px-6 py-10 mt-10 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
        {/* Branding & Mission */}
        <div>
          <h2 className="text-xl font-extrabold text-yellow-300 font-display tracking-wide">
            ClickMorale
          </h2>
          <p className="mt-3 text-sm leading-relaxed opacity-90 font-light">
            A fun and insightful way to explore your social vibe.
            Designed for curious minds who love self-improvement through play.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-base font-bold uppercase mb-3 tracking-wider text-yellow-200">
            Navigate
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#home" className="hover:text-yellow-400 transition duration-200">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-yellow-400 transition duration-200">
                About
              </a>
            </li>
            <li>
              <a href="#videos" className="hover:text-yellow-400 transition duration-200">
                Videos
              </a>
            </li>
          </ul>
        </div>

        {/* Creator Info */}
        <div>
          <h3 className="text-base font-bold uppercase mb-3 tracking-wider text-yellow-200">
            Created By
          </h3>
          <p className="text-sm font-medium">John Alexis Manansala</p>
          <p className="text-xs font-light opacity-80 mt-1">
            BSIT Graduate | Front-End & UI/UX Developer
          </p>
          <p className="text-xs mt-2 opacity-70">
            Passionate about turning ideas into interactive experiences.
          </p>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-8 border-t border-white border-opacity-10 pt-4 text-xs text-center text-white/70 tracking-wide">
        © {new Date().getFullYear()} ClickMorale. Built with 💙 for everyone exploring self-growth.
      </div>
    </footer>
  );
};

export default Footer;
