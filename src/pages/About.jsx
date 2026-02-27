import React from "react";
import { motion } from "framer-motion";
import profileImg from "../assets/p.jpg";

const card =
  "relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 overflow-hidden";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
  viewport: { once: true },
});

export default function About() {
  const stats = [
    { label: "Years Experience", value: "2+" },
    { label: "Deloitte Awards", value: "3 🏆" },
    { label: "Speciality", value: "React & TS" },
  ];

  const glows = [
    "-top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px]",
    "bottom-0 right-10 w-[420px] h-[420px] opacity-15 blur-[140px] delay-300",
    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[160px] delay-500",
  ];

  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden py-24 px-6 md:px-10 lg:px-16"
    >
      <div className="absolute inset-0 pointer-events-none">
        {glows.map((c, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-gradient-to-r from-[#302b63] via-[#37053c] to-[#692097] animate-pulse ${c}`}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 md:[grid-template-rows:auto_auto] gap-4">
          <motion.div
            className={`${card} md:col-span-4 md:row-span-2 h-[200px] md:h-[420px] lg:h-auto lg:min-h-[320px] p-0`}
            {...fadeUp(0)}
          >
            <img
              src={profileImg}
              alt="Yash Thakkar"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-0 left-0 right-0 z-10 p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
              <p className="text-lg font-bold text-white">Yash Thakkar</p>
              <p className="text-xs text-gray-400 mt-0.5">Frontend Developer</p>
            </div>
          </motion.div>
          <motion.div
            className={`${card} md:col-span-8 flex flex-col justify-between gap-5`}
            {...fadeUp(0.1)}
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#1580de]/10 blur-[60px] pointer-events-none" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                About
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Frontend Developer with experience delivering enterprise-grade
                applications in Agile teams. Specialised in React and
                TypeScript, with hands-on experience in application migration,
                analytics dashboards, accessibility compliance, and cross-team
                feature delivery in government and healthcare domains.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-white
                           bg-gradient-to-r from-[#302b63] via-[#37053c] to-[#692097]
                           hover:scale-105 transition-all shadow-lg"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-white
                           border border-[#692097]/60 bg-white/5
                           hover:bg-[#692097]/20 hover:border-[#692097] transition-all"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
          <motion.div
            className={`${card} md:col-span-5 flex items-center justify-around gap-2 py-6`}
            {...fadeUp(0.2)}
          >
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
          <motion.div
            className={`${card} md:col-span-3 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 md:justify-center`}
            {...fadeUp(0.25)}
          >
            <div className="w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#302b63] to-[#692097] md:mb-3 text-sm">
              🎓
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                Currently
              </p>
              <p className="text-sm font-semibold text-white leading-snug">
                MSc Information Systems
              </p>
              <p className="text-xs text-gray-400 mt-1">Univ. of Nottingham</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
