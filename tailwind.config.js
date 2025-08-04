/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3DB88F",     // Teal Green (MAIN accent)
        secondary: "#6FCADC",   // Sky Blue
        accent: "#E9A920",      // Golden Yellow
        highlight: "#E11462",   // Pink (for highlights or alerts)
        background: "#F0FDFB",  // Very light teal background
        dark: "#1B1F23",        // Neutral dark for text
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
