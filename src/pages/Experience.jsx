import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import TimelineScroller from "../components/TimelineScroller";

const experiences = [
  {
    role: "Frontend Developer",
    company: "Deloitte USI",
    duration: "Jul 2023 – Jul 2025",
    description:
      "Built enterprise React and Salesforce LWC applications in Agile teams. Improved CI stability by 20%.",
    technologies: [
      "React",
      "TypeScript",
      "Salesforce LWC",
      "Redux Toolkit",
      "Jest",
      "WCAG",
      "Angular",
    ],
  },
  {
    role: "Process Engineering Intern",
    company: "Zydus Cadila Healthcare",
    duration: "Nov – Dec 2021",
    description:
      "Root cause analysis on a corrosion issue reduced costs by 12% and downtime by 15%.",
    technologies: [
      "Root Cause Analysis",
      "Process Engineering",
      "Documentation",
    ],
  },
];

function Pills({ items }) {
  if (!items?.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {items.map((item) => (
        <span
          key={item}
          className="px-2 py-0.5 rounded-full text-[11px] font-medium text-gray-300
                     bg-gradient-to-r from-[#302b63]/60 to-[#37053c]/60 border border-white/10"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function MobileCard({ exp, index, total }) {
  return (
    <motion.div
      className="flex items-start gap-4"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
    >
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        <div className="w-3 h-3 rounded-full bg-white" />
        {index < total - 1 && (
          <div className="w-[2px] bg-white/20 mt-1" style={{ minHeight: 40 }} />
        )}
      </div>
      <article className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 shadow-lg w-full mb-6">
        <h3 className="text-base font-semibold">{exp.role}</h3>
        <p className="text-xs text-gray-400 mt-0.5 mb-2">
          {exp.company} | {exp.duration}
        </p>
        <p className="text-sm text-gray-300">{exp.description}</p>
        <Pills items={exp.technologies} />
      </article>
    </motion.div>
  );
}

export default function Experience() {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const SCENE_HEIGHT_VH = 120 * experiences.length;
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
      {isMobile && (
        <div className="px-6 py-16">
          <motion.h2
            className="text-4xl font-semibold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1580de] via-[#22217f] to-[#302b63]"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Experience
          </motion.h2>
          <div className="max-w-lg mx-auto">
            {experiences.map((exp, index) => (
              <MobileCard
                key={index}
                exp={exp}
                index={index}
                total={experiences.length}
              />
            ))}
          </div>
        </div>
      )}
      <div
        ref={sceneRef}
        style={
          isMobile
            ? { height: 0 }
            : { height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }
        }
        className="relative"
      >
        {!isMobile && (
          <div className="sticky top-0 h-screen flex flex-col">
            <motion.h2
              className="text-4xl sm:text-5xl font-semibold mt-5 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1580de] via-[#22217f] to-[#302b63]"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Experience
            </motion.h2>
            <div className="flex flex-1 items-center justify-center px-6 pb-10">
              <div className="relative w-full max-w-7xl">
                <div className="relative h-1.5 bg-white/50 rounded">
                  <motion.div
                    className="absolute top-0 left-0 h-1.5 bg-white rounded origin-left"
                    style={{ width: lineSize }}
                  />
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
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
