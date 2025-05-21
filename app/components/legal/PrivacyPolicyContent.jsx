'use client';

import React, { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const PrivacyPolicyContent = () => {
  // Create an array of refs, one for each section (header + intro + 8 sections = 10)
  const refs = Array.from({ length: 10 }, () => useRef(null));
  // Only check the header section for in-view trigger
  const isInView = useInView(refs[0], { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      // Animate each section in sequence for a staggered effect
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
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div
        ref={refs[1]}
        className="opacity-0 transform translate-y-8 transition-all duration-500 ease-out mb-12"
      >
        <p className="text-gray-300 mb-4">
          RV IT Consulting ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
        </p>
      </div>

      {[
        {
          title: "Information We Collect",
          content: "We may collect personal information such as your name, email address, phone number, and professional details when you interact with our services, apply for jobs, or contact us."
        },
        {
          title: "How We Use Your Information",
          content: "We use the information we collect to provide and improve our services, communicate with you, process applications, and comply with legal obligations."
        },
        {
          title: "Data Sharing",
          content: "We do not sell your personal information. We may share data with trusted partners who assist us in operating our website and services, subject to confidentiality agreements."
        },
        {
          title: "Data Security",
          content: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, or destruction."
        },
        {
          title: "Your Rights",
          content: "You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing activities."
        },
        {
          title: "Cookies",
          content: "We use cookies and similar tracking technologies to analyze trends, administer the website, and gather demographic information."
        },
        {
          title: "Changes to This Policy",
          content: "We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on our website."
        },
        {
          title: "Contact Us",
          content: "If you have questions about this Privacy Policy, please contact us at privacy@rvitconsulting.com."
        }
      ].map((section, index) => (
        <div
          key={index}
          ref={refs[index + 2]}
          className="opacity-0 transform translate-y-8 transition-all duration-500 ease-out mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
          <p className="text-gray-300">{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PrivacyPolicyContent;