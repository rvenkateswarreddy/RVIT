'use client';

import React, { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import Link from 'next/link';

const trainingPrograms = [
  {
    title: "Frontend Development",
    description: "Master modern frameworks like React, Angular, and Vue with our comprehensive curriculum",
    duration: "8 weeks",
    level: "Beginner to Advanced",
    icon: "💻"
  },
  {
    title: "Cloud Architecture",
    description: "Learn to design and deploy scalable cloud solutions on AWS, Azure, and GCP",
    duration: "6 weeks",
    level: "Intermediate",
    icon: "☁️"
  },
  {
    title: "DevOps Engineering",
    description: "CI/CD pipelines, containerization, and infrastructure as code training",
    duration: "10 weeks",
    level: "Intermediate",
    icon: "🛠️"
  },
  {
    title: "Data Science",
    description: "Python, machine learning, and data visualization intensive program",
    duration: "12 weeks",
    level: "Advanced",
    icon: "📊"
  },
  {
    title: "Cybersecurity",
    description: "Ethical hacking, penetration testing, and security best practices",
    duration: "8 weeks",
    level: "Intermediate",
    icon: "🔒"
  },
  {
    title: "Mobile Development",
    description: "Build cross-platform apps with React Native and Flutter",
    duration: "6 weeks",
    level: "Beginner to Intermediate",
    icon: "📱"
  }
];

const trainingStats = [
  { value: "95%", label: "Completion Rate" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "10K+", label: "Trained Professionals" },
  { value: "50+", label: "Industry Experts" }
];

function useAnimatedRefs(count) {
  const refs = useRef([]);
  refs.current = Array(count)
    .fill()
    .map((_, i) => refs.current[i] || React.createRef());
  return refs;
}

// Best optimized functional component
export default function TrainingSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const ctaRef = useRef(null);

  // For stats and program cards, use array refs for animation
  const statsRefs = useAnimatedRefs(trainingStats.length);
  const cardsRefs = useAnimatedRefs(trainingPrograms.length);

  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      headingRef.current?.classList.add('animate-in-left');
      subheadingRef.current?.classList.add('animate-in-right');
      ctaRef.current?.classList.add('animate-in-up');

      statsRefs.current.forEach((stat, index) => {
        if (stat.current) {
          stat.current.style.animationDelay = `${index * 0.1}s`;
          stat.current.classList.add('animate-in-up');
        }
      });

      cardsRefs.current.forEach((card, index) => {
        if (card.current) {
          card.current.style.animationDelay = `${index * 0.15}s`;
          card.current.classList.add('animate-in-up');
        }
      });
    }
  }, [isInView, statsRefs, cardsRefs]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950 py-20"
    >
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-white mb-4 opacity-0"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Technical Training Programs
            </span>
          </h2>
          <p
            ref={subheadingRef}
            className="text-xl text-gray-300 opacity-0"
          >
            Upskill your team with industry-leading training designed by technology experts
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {trainingStats.map((stat, index) => (
            <div
              key={stat.label}
              ref={statsRefs.current[index]}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center opacity-0"
            >
              <div className="text-3xl font-bold text-cyan-400 mb-2">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Training Programs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {trainingPrograms.map((program, index) => (
            <div
              key={program.title}
              ref={cardsRefs.current[index]}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-cyan-400/50 transition-all duration-300 opacity-0 group"
            >
              <div className="text-4xl mb-6 group-hover:text-cyan-400 transition-colors duration-300">
                {program.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                {program.title}
              </h3>
              <p className="text-gray-300 mb-4">{program.description}</p>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{program.duration}</span>
                <span>{program.level}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="text-center opacity-0"
        >
          <Link href="/trainings" passHref>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20 mr-4 mb-4 md:mb-0">
              View All Courses
            </button>
          </Link>
          <Link href="/contactUs" passHref>
            <button className="px-8 py-3 bg-transparent border-2 border-cyan-400 text-cyan-100 font-medium rounded-lg hover:bg-cyan-400/10 transition-colors">
              Corporate Training Inquiry  
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}