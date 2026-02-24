// src/pages/Education.jsx

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import TimelineScroller from "../components/TimelineScroller";

const education = [
  {
    degree: "Master of Science in Information Systems & Operations Management",
    institution: "University of Nottingham, UK",
    duration: "2025 - 2026",
    modules: "Specializing in Data Analytics and Supply Chain Management",
  },
  {
    degree: "Bachelor of Engineering in Chemical",
    institution: "National Institute of Technology, India",
    duration: "2019 - 2023",
    modules: "Graduated with First Class with Distinction",
  },
];

export default function Education() {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Changed from 768 → 1024 so tablets also use the vertical layout
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const SCENE_HEIGHT_VH = isMobile
    ? 160 * education.length
    : 120 * education.length;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const threshould = useMemo(
    () => education.map((_, i) => (i + 1) / education.length),
    [],
  );

  const lineSize = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section id="education" className="relative bg-black text-white">
      <div
        ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col">
          <motion.h2
            className="text-4xl sm:text-5xl font-semibold mt-5 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1580de] via-[#22217f] to-[#302b63]"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Education
          </motion.h2>

          <div className="flex flex-1 items-center justify-center px-6 pb-10">
            {/* ── Desktop horizontal timeline (≥ 1024px) ── */}
            {!isMobile && (
              <div className="relative w-full max-w-7xl">
                <div className="relative h-[6px] bg-white/50 rounded">
                  <motion.div
                    className="absolute top-0 left-0 h-[6px] bg-white rounded origin-left"
                    style={{ width: lineSize }}
                  />
                </div>
                <div className="relative flex justify-between mt-0">
                  {education.map((edu, index) => (
                    <TimelineScroller
                      key={index}
                      exp={edu}
                      index={index}
                      start={index === 0 ? 0 : threshould[index - 1]}
                      end={threshould[index]}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                      type="edu"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── Mobile / tablet vertical timeline (< 1024px) ── */}
            {isMobile && (
              <div className="relative w-full max-w-lg px-4">
                {/* Vertical line */}
                <div className="absolute left-4 top-0 bottom-0 w-[3px] bg-white/15 rounded">
                  <motion.div
                    className="absolute top-0 left-0 w-full bg-white rounded origin-top"
                    style={{ height: lineSize }}
                  />
                </div>
                <div className="relative flex flex-col gap-10 ml-10 mt-6 pb-28">
                  {education.map((edu, index) => (
                    <TimelineScroller
                      key={index}
                      exp={edu}
                      index={index}
                      start={index === 0 ? 0 : threshould[index - 1]}
                      end={threshould[index]}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                      type="edu"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
