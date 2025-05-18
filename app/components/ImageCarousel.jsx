"use client";

import React, { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import TechWorldBackground from "./TechWorldBackground"; // Separate the background into its own file for modularity

const ImageCarousel = () => {
  const heroRef = useRef(null);

  const services = [
    { name: "Global Recruitment", icon: "👥" },
    { name: "IT Staffing", icon: "💻" },
    { name: "Project Support", icon: "🛠️" },
    { name: "Technical Training", icon: "🎓" },
    { name: "Contract Delivery", icon: "📝" },
    { name: "Remote Solutions", icon: "🌐" },
  ];

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950 flex items-center justify-center pt-52 sm:pt-1"
    >
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={<div className="text-white">Loading...</div>}>
            <TechWorldBackground />
          </Suspense>
          <Preload all />
        </Canvas>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24 xl:px-32 flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              RV IT Consulting
            </span>{" "}
            <br />
            Transforming Tech Talent Globally
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            End-to-end IT solutions with global recruitment, staffing, project
            delivery, and technical training for the modern tech landscape.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20">
              Get Started
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-cyan-400 text-cyan-100 font-medium rounded-lg hover:bg-cyan-400/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 w-full max-w-5xl">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg p-4 hover:bg-gray-700/50 transition-colors cursor-default"
            >
              <div className="text-2xl mb-2">{service.icon}</div>
              <div className="text-sm font-medium text-gray-200">
                {service.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scrolling indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce w-6 h-6 border-4 border-cyan-400 rounded-full border-t-transparent"></div>
      </div>
    </section>
  );
};

export default ImageCarousel;
