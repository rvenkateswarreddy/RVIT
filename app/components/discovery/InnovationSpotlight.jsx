'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

// Main value props
const valueProps = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-cyan-400">
        <path d="M12 2C8.13 2 5 5.13 5 9v2.03c-1.16.41-2 1.52-2 2.83V16c0 1.66 1.34 3 3 3h1v1c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-1h1c1.66 0 3-1.34 3-3v-2.14c0-1.31-.84-2.42-2-2.83V9c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: "Domain-Driven Design",
    desc: "Our experts deeply understand the industries we serve — from finance to education to healthcare."
  },
  {
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 24 24" className="text-blue-400">
        <rect x="4" y="7" width="16" height="10" rx="5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="9" cy="12" r="1.5" fill="currentColor" />
        <circle cx="15" cy="12" r="1.5" fill="currentColor" />
        <rect x="10.5" y="3" width="3" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: "AI-First Engineering",
    desc: "We build solutions with machine learning, automation, and intelligent analytics at the core."
  },
  {
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 24 24" className="text-cyan-400">
        <path d="M13 2L3 14h7v8l11-12h-8V2z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Agile, Scalable Delivery",
    desc: "Fast iterations, continuous feedback, and enterprise-grade quality at every stage."
  },
  {
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 24 24" className="text-blue-400">
        <path d="M12 21c-7-3-9-7-9-10V6l9-4 9 4v5c0 3-2 7-9 10z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Trust & Transparency",
    desc: "We believe in open communication, data privacy, and long-term partnerships."
  },
];

// Spotlight use cases
const useCases = [
  {
    icon: "💬",
    title: "AI Chatbot for Higher Education",
    desc: "Created a multilingual GPT-powered assistant to guide students through academics, campus info, and admission queries."
  },
  {
    icon: "☁️",
    title: "Cloud-Native Migration for FinTech",
    desc: "Transformed monolithic systems into a secure microservices architecture on AWS."
  },
  {
    icon: "🛠️",
    title: "Real-Time Crop Yield Prediction Tool",
    desc: "Used computer vision and LSTM models to help farmers forecast and plan better."
  },
  {
    icon: "📊",
    title: "Predictive Analytics for E-Commerce",
    desc: "Helped a retail brand personalize product recommendations using behavior-based AI models."
  },
];

function AnimatedBorderBox({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
      <div className="relative bg-gray-900 rounded-2xl p-8 h-full flex flex-col items-center text-center border border-gray-800 group-hover:border-cyan-500/30 transition-all duration-300">
        {children}
      </div>
    </motion.div>
  );
}

function GlowingCard({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative bg-gradient-to-br from-black/80 via-cyan-900/20 to-blue-900/30 rounded-2xl p-7 h-full flex flex-col items-center text-center border border-blue-900/50 group-hover:border-cyan-400/50 transition-all duration-300">
        {children}
      </div>
    </motion.div>
  );
}

export default function InnovationSpotlight() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-16 px-4 bg-gray-950 text-white overflow-hidden" ref={ref}>
      {/* Animated background elements */}
      {isInView && (
        <>
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-blue-900/20 rounded-full filter blur-3xl opacity-20"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-64 h-64 bg-cyan-900/20 rounded-full filter blur-3xl opacity-20"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 1.5, delay: 0.6 }}
          />
        </>
      )}

      <div className="max-w-7xl mx-auto relative">
        {/* Main Value Grid */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 inline-block">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              We combine cutting-edge technology with deep industry expertise to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((item, idx) => (
              <AnimatedBorderBox key={item.title} delay={idx * 0.15}>
                <div className="mb-5 p-3 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-full">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base">{item.desc}</p>
              </AnimatedBorderBox>
            ))}
          </div>
        </div>
        {/* Main Value Grid */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 inline-block">
             Innovation in Action
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
             See how we've transformed businesses with our technology solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((item, idx) => (
              <AnimatedBorderBox key={item.title} delay={idx * 0.15}>
                <div className="mb-5 p-3 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-full">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base">{item.desc}</p>
              </AnimatedBorderBox>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}