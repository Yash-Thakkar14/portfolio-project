import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import ParticlesBackground from "../components/ParticlesBackground";

export default function Home() {
  const socials = [
    {
      Icon: FaLinkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/yash-d-thakkar/",
    },
    {
      Icon: FaGithub,
      label: "GitHub",
      href: "https://github.com/Yash-Thakkar14",
    },
  ];

  const glowVariants = {
    initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
    hover: {
      scale: 1.2,
      y: -3,
      filter:
        "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(45,27,78,0.8))",
    },
    tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
  };

  const roles = useMemo(
    () => ["Frontend Developer", "Web Developer", "React Developer"],
    [],
  );

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(
      () => {
        if (!deleting && subIndex < current.length) {
          setSubIndex(subIndex + 1);
        } else if (!deleting && subIndex === current.length) {
          setTimeout(() => setDeleting(true), 1200);
        } else if (deleting && subIndex > 0) {
          setSubIndex(subIndex - 1);
        } else if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((index + 1) % roles.length);
        }
      },
      deleting ? 40 : 60,
    );
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, roles]);

  return (
    <section
      id="home"
      className="w-full h-screen relative bg-black text-white overflow-hidden"
    >
      <ParticlesBackground />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[350px] h-[350px] rounded-full bg-gradient-to-r from-[#302b63] via-[#37053c] to-[#692097] blur-3xl animate-glow-pulse" />
        <div
          className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-gradient-to-r from-[#302b63] via-[#37053c] to-[#692097] blur-3xl animate-glow-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="relative z-10 h-full max-w-6xl mx-auto px-6 md:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-x-12 items-center">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <motion.div
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-wide min-h-[1.6rem]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span>{roles[index].substring(0, subIndex)}</span>
            <span
              className="inline-block w-0.5 ml-1 bg-white animate-pulse align-middle"
              style={{ height: "1em" }}
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="block text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1580de] via-[#22217f] to-[#302b63]">
              Hi, I'm
            </span>
            <span className="block text-5xl sm:text-6xl md:text-7xl font-bold text-white mt-1 lg:whitespace-nowrap">
              Yash Thakkar
            </span>
          </motion.h1>
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-full font-medium text-white
                         bg-gradient-to-r from-[#302b63] via-[#37053c] to-[#692097]
                         shadow-lg hover:scale-105 transition-all"
            >
              View my Work
            </a>
            <a
              href="/CV.pdf"
              download
              className="px-6 py-3 rounded-full font-medium text-black bg-white hover:bg-gray-200 shadow-lg hover:scale-105 transition-all"
            >
              My Resume
            </a>
          </motion.div>
          <motion.div
            className="flex gap-5 text-2xl md:text-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {socials.map(({ Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                aria-label={label}
                rel="noopener noreferrer"
                variants={glowVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="text-gray-300"
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>
        </div>
        <motion.div
          className="hidden lg:flex lg:col-span-5 flex-col gap-8"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Frontend Developer with experience building scalable, accessible
            enterprise web applications using React and TypeScript. Clean
            architecture, strong performance, and reliable feature releases in
            Agile environments.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
