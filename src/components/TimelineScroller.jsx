import { motion, useTransform } from "framer-motion";
import React from "react";

export default function TimelineScroller({
  exp,
  index,
  start,
  end,
  scrollYProgress,
  layout,
  type,
}) {
  const scale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(
    scrollYProgress,
    [start, end],
    [index % 2 === 0 ? 30 : -30, 0],
  );
  const x = useTransform(scrollYProgress, [start, end], [-24, 0]);

  if (type === "exp" && layout === "desktop") {
    return (
      <div className="relative flex flex-1 justify-center items-center min-w-0">
        {/* Dot */}
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-white"
          style={{ scale, opacity }}
        />
        {/* Connector line */}
        <motion.div
          className={`absolute ${index % 2 === 0 ? "-top-8" : "-bottom-8"} bg-white/40`}
          style={{ width: 3, height: 40, opacity }}
        />
        {/* Card */}
        <motion.article
          className={`absolute ${
            index % 2 === 0 ? "bottom-12" : "top-12"
          } bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 shadow-lg`}
          style={{ opacity, y, width: 300, maxWidth: "40vw" }}
          transition={{ duration: 0.4, delay: index * 0.15 }}
        >
          <h3 className="text-xl font-semibold wrap-break-word">{exp.role}</h3>
          <p className="text-sm text-gray-400 mb-3 wrap-break-word">
            {exp.company} | {exp.duration}
          </p>
          <p className="text-sm text-gray-300 wrap-break-word">
            {exp.description}
          </p>
        </motion.article>
      </div>
    );
  }

  if (type === "exp" && layout === "mobile") {
    return (
      <div className="relative flex items-start gap-4 pl-2">
        <motion.div
          className="absolute -left-3.5 top-3 z-10 w-7 h-7 shrink-0 rounded-full bg-white"
          style={{ opacity }}
        />
        <motion.article
          className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 shadow-lg w-full"
          style={{ opacity, x }}
          transition={{ duration: 0.4, delay: index * 0.15 }}
        >
          <h3 className="text-lg font-semibold wrap-break-word">{exp.role}</h3>
          <p className="text-sm text-gray-400 mb-2 wrap-break-word">
            {exp.company} | {exp.duration}
          </p>
          <p className="text-sm text-gray-300 wrap-break-word">
            {exp.description}
          </p>
        </motion.article>
      </div>
    );
  }

  if (type === "edu" && layout === "desktop") {
    return (
      <div className="relative flex flex-1 justify-center items-center min-w-0">
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-white"
          style={{ scale, opacity }}
        />

        <motion.div
          className={`absolute ${index % 2 === 0 ? "-top-8" : "-bottom-8"} bg-white/40`}
          style={{ width: 3, height: 40, opacity }}
        />
        <motion.article
          className={`absolute ${
            index % 2 === 0 ? "bottom-12" : "top-12"
          } bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 shadow-lg`}
          style={{ opacity, y, width: 300, maxWidth: "40vw" }}
          transition={{ duration: 0.4, delay: index * 0.15 }}
        >
          <h3 className="text-xl font-semibold wrap-break-word">
            {exp.degree}
          </h3>
          <p className="text-sm text-gray-400 mb-3 wrap-break-word">
            {exp.institution} | {exp.duration}
          </p>
          <p className="text-sm text-gray-300 wrap-break-word">{exp.modules}</p>
        </motion.article>
      </div>
    );
  }
  if (type === "edu" && layout === "mobile") {
    return (
      <div className="relative flex items-start gap-4 pl-2">
        <motion.div
          className="absolute -left-3.5 top-3 z-10 w-7 h-7 shrink-0 rounded-full bg-white"
          style={{ opacity }}
        />
        <motion.article
          className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 shadow-lg w-full"
          style={{ opacity, x }}
          transition={{ duration: 0.4, delay: index * 0.15 }}
        >
          <h3 className="text-lg font-semibold wrap-break-word">
            {exp.degree}
          </h3>
          <p className="text-sm text-gray-400 mb-2 wrap-break-word">
            {exp.institution} | {exp.duration}
          </p>
          <p className="text-sm text-gray-300 wrap-break-word">{exp.modules}</p>
        </motion.article>
      </div>
    );
  }
}
