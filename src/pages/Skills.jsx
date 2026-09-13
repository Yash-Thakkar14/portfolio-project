import React, { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const SKILLS = [
  "React",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Angular",
  "Redux Toolkit",
  "Material UI",
  "Bootstrap",
  "jQuery",
  "Formik",
  "Salesforce LWC",
  "Node.js",
  "Express",
  "MongoDB",
  "Python",
  "Flask",
  "SQLite",
  "Power Apps",
  "Power Automate",
  "Dataverse",
  "Power Fx",
  "Dynamics 365",
  "Power BI",
];

const CORE = [
  "React",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "Power Apps",
  "Power Automate",
  "Dataverse",
];

const SPOTLIGHT_MS = 1400;
const STAGGER_S = 0.038;

function shuffle(length) {
  const order = Array.from({ length }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

export default function Skills() {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [step, setStep] = useState(0);

  const delays = useMemo(() => shuffle(SKILLS.length), []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = setInterval(
      () => setStep((s) => (s + 1) % CORE.length),
      SPOTLIGHT_MS,
    );
    return () => clearInterval(id);
  }, [paused, reduceMotion]);

  const litSkill = paused || reduceMotion ? null : CORE[step];

  return (
    <section
      id="skills"
      className="min-h-[50vh] w-full py-20 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#37053c] to-[#692097] opacity-20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#37053c] to-[#692097] opacity-20 blur-[120px] animate-pulse delay-500" />
      </div>

      <motion.h2
        className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1580de] via-[#22217f] to-[#302b63] z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        My Skills
      </motion.h2>

      <motion.p
        className="mt-2 mb-10 text-white/90 text-base sm:text-lg z-10"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Applications | Technologies
      </motion.p>

      <div
        className="relative z-10 w-full max-w-3xl px-6 flex flex-wrap justify-center gap-2.5"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        {SKILLS.map((skill, index) => {
          const lit = skill === litSkill;
          return (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.86 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.52,
                delay: delays[index] * STAGGER_S,
                ease: [0.22, 0.85, 0.25, 1],
              }}
              className={`relative overflow-hidden rounded-full border px-4 py-1.5 text-sm
                          transition-colors duration-300 cursor-default
                          before:content-[''] before:absolute before:inset-0 before:origin-left
                          before:bg-gradient-to-r before:from-[#302b63] before:via-[#37053c] before:to-[#692097]
                          before:transition-transform before:ease-out
                          hover:text-white hover:border-transparent hover:before:scale-x-100
                          ${
                            lit
                              ? "text-white border-transparent before:scale-x-100 before:duration-700"
                              : "text-gray-300 border-white/15 bg-white/5 before:scale-x-0 before:duration-300"
                          }`}
            >
              <span className="relative z-10">{skill}</span>
            </motion.span>
          );
        })}
      </div>
    </section>
  );
}
