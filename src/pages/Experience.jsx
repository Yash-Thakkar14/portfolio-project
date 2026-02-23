import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import TimelineScroller from "../components/TimelineScroller";

const experiences = [
  {
    role: "Frontend Developer",
    company: "Deloitte USI",
    duration: "2023 - 2025",
    description: "Front end dev at Deloitte USI",
  },
  {
    role: "Process Engineering Intern",
    company: "Zydus Cadila Healthcare",
    duration: "2022",
    description: "Process engineering intern at Zydus Cadila Healthcare",
  }
];

export default function Experience() {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const SCENE_HEIGHT_VH = isMobile
    ? 160 * experiences.length
    : 120 * experiences.length;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const threshould = useMemo(
    () => experiences.map((_, i) => (i + 1) / experiences.length),
    [],
  );

  const lineSize = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section id="experience" className="relative bg-black text-white">
      <div
        ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh `, minHeight: "120vh" }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col">
          <motion.h2
            className="text-4xl sm:text-5xl font-semibold mt-5 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1580de] via-[#22217f] to-[#302b63] "
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Experience
          </motion.h2>
          <div className="flex flex-1 items-center justify-center px-6 pb-10">
            {!isMobile && (
              <div className="relative w-full max-w-7xl">
                <div className="relative h-[6px] bg-white/50 rounded">
                  <motion.div
                    className="absolute top-0 left-0 h-[6px] bg-white rounded origin-left"
                    style={{ width: lineSize }}
                  ></motion.div>
                </div>
                <div className="relative flex justify-between mt-0">
                  {experiences.map((exp, index) => (
                    <TimelineScroller
                      key={index}
                      exp={exp}
                      index={index}
                      start={index === 0 ? 0 : threshould[index - 1]}
                      end={threshould[index]}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                      type="exp"
                    />
                  ))}
                </div>
              </div>
            )}
            {isMobile && (
              <div className="relative w-full max-w-md">
                <div className="absolute left-0 top-0 bottom-0 w-6px bg-white/15 rounded">
                  <motion.div
                    className="absolute top-0 left-0 w-6px bg-white rounded origin-top"
                    style={{ height: lineSize }}
                  ></motion.div>
                </div>
                <div className="relative flex flex-col gap-10 ml-10 mt-6 pb-28">
                  {experiences.map((exp, index) => (
                    <TimelineScroller
                      key={index}
                      exp={exp}
                      index={index}
                      start={index === 0 ? 0 : threshould[index - 1]}
                      end={threshould[index]}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                      type="exp"
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
