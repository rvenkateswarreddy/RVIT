'use client';

import React, { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const CookiePolicyContent = () => {
  // refs: header + intro + 6 sections = 8
  const refs = Array.from({ length: 8 }, () => useRef(null));
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
          Cookie Policy
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
          This Cookie Policy explains how RV IT Consulting ("we," "our," or "us") uses cookies and similar technologies when you visit our website. By continuing to use our website, you consent to the use of cookies in accordance with this policy.
        </p>
      </div>

      {[
        {
          title: "What Are Cookies?",
          content: "Cookies are small text files placed on your device when you visit a website. They help the website remember your preferences, enhance your user experience, and provide information to the website owners."
        },
        {
          title: "Types of Cookies We Use",
          content: "We use both session and persistent cookies. Session cookies are temporary and expire when you close your browser. Persistent cookies remain on your device until deleted or they expire. These cookies can be essential, functional, analytical, or related to third-party services."
        },
        {
          title: "How We Use Cookies",
          content: "We use cookies to remember your preferences, analyze website traffic, improve website functionality, and provide personalized content. Some cookies are essential for the operation of our website."
        },
        {
          title: "Third-Party Cookies",
          content: "We may allow third-party service providers to use cookies on our website to help us analyze traffic and improve our services. These third parties may collect information about your online activities over time and across different websites."
        },
        {
          title: "Your Cookie Choices",
          content: "Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer. However, disabling cookies may affect your experience on our website."
        },
        {
          title: "Changes to This Cookie Policy",
          content: "We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically."
        },
        {
          title: "Contact Us",
          content: "If you have any questions about our use of cookies, please contact us at privacy@rvitconsulting.com."
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

export default CookiePolicyContent;
