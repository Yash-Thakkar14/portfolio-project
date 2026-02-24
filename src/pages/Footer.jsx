import { motion } from "framer-motion";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
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
        "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(45, 27, 78,0.8))",
    },
    tap: {
      scale: 0.95,
      y: 0,
      transition: { duration: 0.08 },
    },
  };

  return (
    <footer className="relative overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 bg-radial-gradient(55%_60%_at_70%_35% , rgba(13,88,202,0.35),transparent_70%)" />
      <div className="pointer-events-none absolute inset-0 bg-radial-gradient(50%_55%_at_30%_70% , rgba(16,185,129,0.30),transparent_70%)" />
      <motion.div
        className="relative z-10 px-4 sm:px-8 lg:px-10 py-16 md:py-20 flex flex-col items-center text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="h-3px w-24 md:w-32 rounded-full bg-gradient-to-r from-[#1580de] via-[#22217f] to-[#302b63] " />
        <div className="flex gap-5 text-2xl md:text-3xl">
          {socials.map(({ Icon, label, href }) => (
            <a
              href={href}
              key={label}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              variants={glowVariants}
              initial="initial"
              whilehover="hover"
              whiletap="tap"
              className="text-gray-300 transition-colors duration-200 inline-flex items-center justify-center"
            >
              <Icon />
            </a>
          ))}
        </div>
        <p className="text-xs text-gray-400 ">
          &copy; {new Date().getFullYear()} Yash Thakkar. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
