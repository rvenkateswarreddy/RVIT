import React, { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

const supportServices = [
  {
    title: 'End-to-End Development',
    description: 'Full lifecycle project support from requirements to deployment',
    icon: '🔄',
  },
  {
    title: 'Architecture Consulting',
    description: 'Expert guidance on system design and technology selection',
    icon: '🏛️',
  },
  {
    title: 'Code Review & Audit',
    description: 'Comprehensive analysis of your codebase for quality and security',
    icon: '🔍',
  },
  {
    title: 'Performance Optimization',
    description: 'Identify and resolve bottlenecks in your applications',
    icon: '⚡',
  },
  {
    title: 'Legacy Modernization',
    description: 'Transform outdated systems into modern, maintainable solutions',
    icon: '🔄',
  },
  {
    title: 'DevOps Implementation',
    description: 'Establish CI/CD pipelines and infrastructure as code',
    icon: '🛠️',
  }
];

export const ProjectSupportSection=()=> {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Track which cards are visible for animation
  const [cardsVisible, setCardsVisible] = useState(Array(supportServices.length).fill(false));

  useEffect(() => {
    if (isInView) {
      headingRef.current?.classList.add('animate-in-left');
      contentRef.current?.classList.add('animate-in-right');
      // Animate cards in sequence
      supportServices.forEach((_, idx) => {
        setTimeout(() => {
          setCardsVisible(prev => {
            const updated = [...prev];
            updated[idx] = true;
            return updated;
          });
        }, idx * 100);
      });
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-gray-950 flex items-center justify-center py-20"
    >
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl font-bold text-white mb-8 opacity-0"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Project Support & Training
              </span>
            </h2>
            <div ref={contentRef} className="space-y-6 text-gray-300 opacity-0">
              <p className="text-lg">
                Our comprehensive project support services ensure your technology initiatives
                are delivered on time, within budget, and to the highest quality standards.
              </p>
              <p className="text-lg">
                Complemented by our technical training programs, we equip your teams
                with the skills needed to maintain and extend your solutions long after
                implementation.
              </p>
              <button className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20">
                Discuss Your Project
              </button>
            </div>
          </div>
          {/* Right Service Cards */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportServices.map((service, i) => (
                <div
                  key={service.title}
                  className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 opacity-0 hover:bg-gray-700/30 transition-colors
                    ${cardsVisible[i] ? 'animate-in-up opacity-100' : ''}`}
                  style={{
                    animationDelay: `${i * 0.1}s`
                  }}
                >
                  <div className="text-3xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-300">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ProjectSupportSection; 