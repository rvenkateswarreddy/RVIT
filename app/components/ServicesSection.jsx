"use client";

import { useRef, useEffect, Suspense } from "react";
import { useInView } from "framer-motion";

// Services data
const services = [
  {
    title: "Global Recruitment",
    description:
      "Access top-tier IT talent from our global network of professionals.",
    icon: "👥",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "IT Staffing",
    description: "Flexible staffing solutions tailored to your project needs.",
    icon: "💻",
    color: "from-purple-500 to-blue-500",
  },
  {
    title: "Project Support",
    description:
      "End-to-end support for your IT projects from conception to delivery.",
    icon: "🛠️",
    color: "from-cyan-500 to-teal-500",
  },
  {
    title: "Technical Training",
    description:
      "Upskill your team with cutting-edge technology training programs.",
    icon: "🎓",
    color: "from-indigo-500 to-purple-500",
  },
  {
    title: "Contract Delivery",
    description:
      "Comprehensive contract-based project execution with guaranteed results.",
    icon: "📝",
    color: "from-teal-500 to-emerald-500",
  },
  {
    title: "Remote Solutions",
    description: "Build your remote tech team with our vetted professionals.",
    icon: "🌐",
    color: "from-blue-500 to-indigo-500",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Add animations when the section is in view
  useEffect(() => {
    if (isInView) {
      headingRef.current?.classList.add("animate-in-left");

      cardsRef.current.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add("animate-in-up");
      });
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-gray-950 flex items-center justify-center  "
    >
      <Suspense
        fallback={<div className="text-white text-center">Loading...</div>}
      >
        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16">
            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl font-bold text-white mb-4 opacity-0"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Our Services
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive IT solutions designed to meet your business needs at
              every stage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="service-card bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 opacity-0 hover:bg-gray-700/30 transition-colors"
              >
                <div
                  className={`w-16 h-16 rounded-full mb-6 flex items-center justify-center text-2xl bg-gradient-to-r ${service.color}`}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Suspense>
    </section>
  );
}
