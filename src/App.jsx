import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Experience from "./pages/Experience";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import ParticlesBackground from "./components/ParticlesBackground";
import CustomCursor from "./components/CustomCursor";
import IntroAnimation from "./components/IntroAnimation";
import Education from "./pages/Education";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  // The intro runs for roughly 2.25s and reveals the site from its exit callback.
  // Background tabs pause requestAnimationFrame, so that callback can stall and
  // leave a visitor on a black screen. This timer reveals the site regardless.
  useEffect(() => {
    const timer = setTimeout(() => setIntroDone(true), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}
      {introDone && (
        <div className="relative gradient text-white">
          <CustomCursor />
          {/* <ParticlesBackground /> */}
          <Navbar />
          <Home />
          <About />
          <Skills />
          <Education />
          <Experience />
          <Projects />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
}
