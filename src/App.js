import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Materials from "./pages/Materials";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import KitchensPage from "./pages/KitchensPage";

// Automatically scrolls to top on every route/page change
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname, search]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      {/* Listens to path changes and resets scroll position */}
      <ScrollToTop />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/kitchens" element={<KitchensPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;