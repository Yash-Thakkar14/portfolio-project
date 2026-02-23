import React from "react";
import ParticlesBackground from "../components/ParticlesBackground";

export default function Contact() {
  return (
    <section
      id="contact"
      className="w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10"
    >
      <ParticlesBackground />
    </section>
  );
}
