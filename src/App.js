import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
// import Kitchens from "./pages/Kitchens";
import Materials from "./pages/Materials";
import Projects from "./pages/Projects";
// import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/kitchens" element={<Kitchens />} /> */}
        <Route path="/materials" element={<Materials />} />?\
        <Route path="/projects" element={<Projects />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer/>
    </BrowserRouter>
  );
}

export default App;