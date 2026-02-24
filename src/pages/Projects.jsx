import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    id: 1,
    title: "Portfolio Project",
    description:
      "A personal portfolio website built with React, showcasing my skills, experience, and projects. It features smooth animations using Framer Motion and a responsive design with Tailwind CSS.",
    technologies: ["React", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/Yash-Thakkar14",
    live: "https://example.com",
  },
  {
    id: 2,
    title: "Swiggy Clone",
    description:
      "An e-commerce platform with cart functionality, implementing all concept of Redux Toolkit , Context API and React Testing Library.",
    technologies: ["React", "Redux", "Webpack"],
    github: "https://github.com/Yash-Thakkar14/react-swiggy-clone",
    live: null,
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-90 h-90 opacity-20 blur-[120px] rounded-full bg-gradient-to-r from-[#302b63] via-[#37053c] to-[#692097] animate-pulse" />
        <div className="absolute bottom-0 right-10 w-105 h-105 opacity-15 blur-[140px] rounded-full bg-gradient-to-r from-[#302b63] via-[#37053c] to-[#692097] animate-pulse delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-55 h-55 opacity-10 blur-[160px] rounded-full bg-gradient-to-r from-[#302b63] via-[#37053c] to-[#692097] animate-pulse delay-500" />
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12">
        <motion.h2
          className="text-4xl sm:text-5xl font-semibold text-center text-transparent bg-clip-text
                     bg-gradient-to-r from-[#1580de] via-[#22217f] to-[#302b63]"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
