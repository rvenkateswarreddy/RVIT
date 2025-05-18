"use client";

import { useRef, useEffect, Suspense } from "react";
import { useInView } from "framer-motion";

// Technology stack data
const techStack = [
  // Frontend
  { name: "React", icon: "⚛️" },
  { name: "Angular", icon: "🅰️" },
  { name: "Vue", icon: "🖖" },
  { name: "Next.js", icon: "⏭️" },
  { name: "TypeScript", icon: "📘" },
  { name: "Tailwind", icon: "🎨" },

  // Backend
  { name: "Node.js", icon: "🟢" },
  { name: "Python", icon: "🐍" },
  { name: "Java", icon: "☕" },
  { name: ".NET", icon: "🔷" },
  { name: "Go", icon: "🐹" },
  { name: "Ruby", icon: "💎" },

  // Mobile
  { name: "React Native", icon: "📱" },
  { name: "Flutter", icon: "🦋" },
  { name: "Swift", icon: "🍏" },
  { name: "Kotlin", icon: "🟪" },

  // Databases
  { name: "MongoDB", icon: "🍃" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "MySQL", icon: "🐬" },
  { name: "Redis", icon: "🔴" },

  // DevOps
  { name: "Docker", icon: "🐳" },
  { name: "Kubernetes", icon: "☸️" },
  { name: "AWS", icon: "☁️" },
  { name: "Azure", icon: "🔵" },
  { name: "Terraform", icon: "🏗️" },
  { name: "Git", icon: "📌" },
];

export default function TechnologiesSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      headingRef.current?.classList.add("animate-in-left");
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gray-950 flex flex-col items-center justify-center py-16"
    >
      <Suspense
        fallback={<div className="text-white text-center">Loading...</div>}
      >
        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24 ">
          <div className="text-center mb-16">
            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl font-bold text-white mb-4 opacity-0"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Technologies We Master
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our expertise spans across the entire technology stack
            </p>
          </div>

          {/* Marquee Top (Left to Right) */}
          <div className="overflow-hidden mb-8">
            <div className="flex w-max">
              <div className="flex items-center space-x-12 py-4 marquee-left">
                {techStack.slice(0, 12).map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 bg-gray-800/50 px-6 py-3 rounded-full border border-gray-700"
                  >
                    <span className="text-xl">{tech.icon}</span>
                    <span className="text-white font-medium">{tech.name}</span>
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {techStack.slice(0, 12).map((tech, index) => (
                  <div
                    key={`dup-${index}`}
                    className="flex items-center space-x-3 bg-gray-800/50 px-6 py-3 rounded-full border border-gray-700"
                  >
                    <span className="text-xl">{tech.icon}</span>
                    <span className="text-white font-medium">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Marquee Bottom (Right to Left) */}
          <div className="overflow-hidden">
            <div className="flex w-max">
              <div className="flex items-center space-x-12 py-4 marquee-right">
                {techStack.slice(12).map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 bg-gray-800/50 px-6 py-3 rounded-full border border-gray-700"
                  >
                    <span className="text-xl">{tech.icon}</span>
                    <span className="text-white font-medium">{tech.name}</span>
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {techStack.slice(12).map((tech, index) => (
                  <div
                    key={`dup-${index}`}
                    className="flex items-center space-x-3 bg-gray-800/50 px-6 py-3 rounded-full border border-gray-700"
                  >
                    <span className="text-xl">{tech.icon}</span>
                    <span className="text-white font-medium">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20 animate-in-up">
              Explore Our Tech Expertise
            </button>
          </div>
        </div>
      </Suspense>
    </section>
  );
}
