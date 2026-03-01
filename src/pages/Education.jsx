import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import TimelineScroller from "../components/TimelineScroller";

const education = [
  {
    degree: "MSc Information Systems & Operations Management",
    institution: "University of Nottingham, UK",
    duration: "2025 – 2026",
    modules: [
      "Information System Design & Development",
      "Business Intelligence & Analytics",
      "Data Management & Manipulation",
      "Project Management",
      "E-Business",
      "Operations & Supply Chain Strategy",
    ],
  },
  {
    degree: "B.TECH in Chemical Engineering",
    institution: "National Institute of Technology, India",
    duration: "2019 – 2023",
    modules: ["First Class with Distinction"],
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

function MobileCard({ edu, index, total }) {
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
        <h3 className="text-base font-semibold">{edu.degree}</h3>
        <p className="text-xs text-gray-400 mt-0.5 mb-1">
          {edu.institution} | {edu.duration}
        </p>
        <Pills items={edu.modules} />
      </article>
    </motion.div>
  );
}

export default function Education() {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const SCENE_HEIGHT_VH = 120 * education.length;
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
      {isMobile && (
        <div className="px-6 py-16">
          <motion.h2
            className="text-4xl font-semibold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1580de] via-[#22217f] to-[#302b63]"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Education
          </motion.h2>
          <div className="max-w-lg mx-auto">
            {education.map((edu, index) => (
              <MobileCard
                key={index}
                edu={edu}
                index={index}
                total={education.length}
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
              Education
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
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
