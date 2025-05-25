'use client';

import React, { useEffect, useRef, Suspense } from 'react';
import { useInView } from 'framer-motion';
import {LoadingSkeleton} from '../components/ui/LoadingSkeleton';

function AboutUsContent() {
  const refs = Array.from({ length: 4 }, () => useRef(null));
  const isInView = useInView(refs[0], { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      refs.forEach((ref, index) => {
        setTimeout(() => {
          if (ref.current) {
            ref.current.classList.add('animate-fadeInUp');
          }
        }, index * 100);
      });
    }
  }, [isInView, refs]);

  return (
    <div className="max-w-4xl mx-auto">
      <div
        ref={refs[0]}
        className="opacity-0 transform translate-y-8 transition-all duration-500 ease-out"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          About Us
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          RV IT Consulting is dedicated to delivering innovative IT solutions that empower organizations worldwide.<br />
          Our team specializes in recruitment, staffing, project support, and training services tailored to the modern technology landscape.
        </p>
      </div>

      <div
        ref={refs[1]}
        className="opacity-0 transform translate-y-8 transition-all duration-500 ease-out mb-8"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
        <p className="text-gray-300">
          We strive to bridge the gap between talent and opportunity, helping businesses thrive by connecting them with skilled IT professionals and providing ongoing support and expertise for their projects.
        </p>
      </div>

      <div
        ref={refs[2]}
        className="opacity-0 transform translate-y-8 transition-all duration-500 ease-out mb-8"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Our Values</h2>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>Integrity and transparency in all our engagements</li>
          <li>Commitment to client and candidate success</li>
          <li>Continuous learning and innovation</li>
          <li>Diversity, inclusion, and respect for all individuals</li>
        </ul>
      </div>

      <div
        ref={refs[3]}
        className="opacity-0 transform translate-y-8 transition-all duration-500 ease-out mb-8"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Why Choose RV IT Consulting?</h2>
        <p className="text-gray-300">
          With years of experience and a passion for technology, we partner with organizations of all sizes to deliver customized solutions that drive real results. Whether you are looking for top-tier talent, project support, or IT training, RV IT Consulting is your trusted partner for success.
        </p>
      </div>
    </div>
  );
}

export default function AboutUsPage() {
  return (
    <div className="bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Suspense fallback={<LoadingSkeleton />}>
          <AboutUsContent />
        </Suspense>
      </div>
    </div>
  );
}