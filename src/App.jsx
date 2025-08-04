import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Videos from "./components/Videos";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import QuizNavbar from "./components/QuizNavbar";

import Instruction from "./pages/Instruction";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

// Wrapper component to access location inside Router
const AppContent = ({ loading, setLoading }) => {
  const location = useLocation();
  const isQuizRoute = ["/instruction", "/quiz", "/result"].includes(location.pathname);

useEffect(() => {
  // Show loader when going to homepage OR instruction page (from Hero)
  if (location.pathname === "/" || location.pathname === "/instruction") {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // or whatever delay your loader uses

    return () => clearTimeout(timer);
  } else {
    // Skip loader for quiz and result pages
    setLoading(false);
  }
}, [location.pathname]);


  if (loading) return <Loader />;

  return (
    <>
      {isQuizRoute ? <QuizNavbar /> : <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero setLoading={setLoading} />
              <AboutUs />
              <Videos />
            </>
          }
        />
        <Route path="/instruction" element={<Instruction />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
      {!isQuizRoute && <Footer />}
    </>
  );
};

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      <AppContent loading={loading} setLoading={setLoading} />
    </Router>
  );
}

export default App;
