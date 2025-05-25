'use client';

import React, { useEffect, useRef, Suspense } from 'react';
import { useInView } from 'framer-motion';
import {LoadingSkeleton} from '../components/ui/LoadingSkeleton';

function StaffingContent() {
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
          Staffing Solutions
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          RV IT Consulting delivers top-tier staffing solutions, connecting you with the right talent to power your business goals.
        </p>
      </div>

      <div
        ref={refs[1]}
        className="opacity-0 transform translate-y-8 transition-all duration-500 ease-out mb-8"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Why Choose Our Staffing Services?</h2>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>Access to a diverse pool of pre-vetted IT professionals</li>
          <li>Flexible engagement models (contract, contract-to-hire, permanent)</li>
          <li>Fast turnaround to meet urgent project needs</li>
          <li>Dedicated account managers and ongoing support</li>
        </ul>
      </div>

      <div
        ref={refs[2]}
        className="opacity-0 transform translate-y-8 transition-all duration-500 ease-out mb-8"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Our Process</h2>
        <ol className="list-decimal pl-6 text-gray-300 space-y-2">
          <li>Understanding your requirements and company culture</li>
          <li>Sourcing and screening candidates for technical and cultural fit</li>
          <li>Coordinating interviews and feedback</li>
          <li>Ensuring a smooth onboarding and continued support</li>
        </ol>
      </div>

      <div
        ref={refs[3]}
        className="opacity-0 transform translate-y-8 transition-all duration-500 ease-out mb-8"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Get Started</h2>
        <p className="text-gray-300">
          Looking for exceptional IT talent? <a href="/contactUs" className="text-cyan-400 underline hover:text-cyan-300">Contact us</a> to discuss your staffing needs and learn how RV IT Consulting can help your business grow.
        </p>
      </div>
    </div>
  );
}

export default function StaffingPage() {
  return (
    <div className="bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Suspense fallback={<LoadingSkeleton />}>
          <StaffingContent />
        </Suspense>
      </div>
    </div>
  );
}