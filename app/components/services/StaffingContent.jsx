'use client';

import { useEffect } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import staffingImage from './public/images/slider2.jpg';

const staffingBenefits = [
  {
    title: "Flexible Engagement Models",
    description: "Contract, contract-to-hire, and direct placement options to suit your needs",
    icon: "🔄"
  },
  {
    title: "Specialized Talent",
    description: "Access to niche IT professionals with specific skill sets",
    icon: "🎯"
  },
  {
    title: "Rapid Deployment",
    description: "Quick turnaround times to fill your critical positions",
    icon: "⚡"
  },
  {
    title: "Scalability",
    description: "Easily scale your team up or down based on project demands",
    icon: "📈"
  },
  {
    title: "Reduced Risk",
    description: "Thorough vetting process ensures quality candidates",
    icon: "🛡️"
  },
  {
    title: "Cost Efficiency",
    description: "Optimize your hiring budget with flexible staffing solutions",
    icon: "💰"
  }
];

const StaffingContent = () => {
  const heroRef = useRef(null);
  const benefitsRefs = staffingBenefits.map(() => useRef(null));
  const ctaRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const isBenefitsInView = useInView(benefitsRefs[0], { once: true, margin: '-100px' });

  useEffect(() => {
    if (isHeroInView) {
      heroRef.current.classList.add('animate-fadeInUp');
    }
  }, [isHeroInView]);

  useEffect(() => {
    if (isBenefitsInView) {
      benefitsRefs.forEach((ref, index) => {
        setTimeout(() => {
          if (ref.current) {
            ref.current.classList.add('animate-fadeInUp');
          }
        }, index * 150);
      });
      ctaRef.current.classList.add('animate-fadeInUp');
    }
  }, [isBenefitsInView]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="opacity-0 transform translate-y-8 transition-all duration-700 ease-out mb-16"
      >
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                IT Staffing Solutions
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Flexible staffing solutions with top-tier technology professionals tailored to your project requirements.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20">
              Get Started
            </button>
          </div>
          <div className="md:w-1/2">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-700">
              <Image
                src={staffingImage}
                alt="IT Staffing Solutions"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-900/30" />
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          Why Choose Our Staffing Services?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staffingBenefits.map((benefit, index) => (
            <div
              key={index}
              ref={benefitsRefs[index]}
              className="opacity-0 transform translate-y-8 transition-all duration-500 ease-out bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-cyan-400/50 transition-colors"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
              <p className="text-gray-300">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div 
        ref={ctaRef}
        className="opacity-0 transform translate-y-8 transition-all duration-700 ease-out bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border border-gray-700 rounded-xl p-8 md:p-12 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ready to Build Your Dream Team?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Contact us today to discuss your staffing needs and discover how we can help you achieve your technology goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20">
            Request Talent
          </button>
          <button className="px-8 py-3 bg-transparent border-2 border-cyan-400 text-cyan-100 font-medium rounded-lg hover:bg-cyan-400/10 transition-colors">
            Call Us Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffingContent;