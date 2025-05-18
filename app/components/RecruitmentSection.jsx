"use client";

import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

// Recruitment process steps
const recruitmentProcess = [
  {
    step: "1",
    title: "Requirement Analysis",
    description: "We deeply understand your technical and cultural needs",
  },
  {
    step: "2",
    title: "Talent Sourcing",
    description: "Leveraging our global network to find the perfect match",
  },
  {
    step: "3",
    title: "Technical Screening",
    description: "Rigorous evaluation by our expert technical team",
  },
  {
    step: "4",
    title: "Cultural Fit Assessment",
    description: "Ensuring alignment with your company values",
  },
  {
    step: "5",
    title: "Candidate Presentation",
    description: "Detailed profiles of pre-vetted professionals",
  },
  {
    step: "6",
    title: "Onboarding Support",
    description: "Seamless integration into your teams",
  },
];

export default function RecruitmentSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      // Animate heading and cards when in view
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
      className="relative min-h-screen w-full overflow-hidden bg-gray-950 flex items-center justify-center py-20"
    >
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-white mb-4 opacity-0"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Global Recruitment Solutions
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connecting world-class IT talent with innovative companies worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {recruitmentProcess.map((step, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 opacity-0 hover:bg-gray-700/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl mb-4">
                {step.step}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20 mr-4">
            Hire Talent
          </button>
          <button className="px-8 py-3 bg-transparent border-2 border-cyan-400 text-cyan-100 font-medium rounded-lg hover:bg-cyan-400/10 transition-colors">
            Find Jobs
          </button>
        </div>
      </div>
    </section>
  );
}
