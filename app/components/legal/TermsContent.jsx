'use client';

import { useEffect } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const TermsContent = () => {
  const refs = Array(12).fill(0).map(() => useRef(null));
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
  }, [isInView]);

  return (
    <div className="max-w-4xl mx-auto">
      <div 
        ref={refs[0]}
        className="opacity-0 transform translate-y-8 transition-all duration-500 ease-out"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Terms & Conditions
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div 
        ref={refs[1]}
        className="opacity-0 transform translate-y-8 transition-all duration-500 ease-out mb-12"
      >
        <p className="text-gray-300 mb-4">
          These Terms & Conditions ("Terms") govern your access to and use of RV IT Consulting's website and services. By accessing or using our services, you agree to be bound by these Terms.
        </p>
      </div>

      {[
        {
          title: "Services Description",
          content: "RV IT Consulting provides IT recruitment, staffing, project support, and training services to clients and candidates in the technology sector."
        },
        {
          title: "Eligibility",
          content: "Our services are available only to individuals who are at least 18 years old and can form legally binding contracts."
        },
        {
          title: "User Accounts",
          content: "You may need to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials."
        },
        {
          title: "Intellectual Property",
          content: "All content on our website, including text, graphics, logos, and software, is our property or our licensors' and is protected by intellectual property laws."
        },
        {
          title: "Prohibited Conduct",
          content: "You agree not to misuse our services, including by engaging in fraudulent activities, distributing malware, or violating others' privacy rights."
        },
        {
          title: "Third-Party Links",
          content: "Our website may contain links to third-party sites. We are not responsible for the content or practices of these sites."
        },
        {
          title: "Disclaimer of Warranties",
          content: "Our services are provided 'as is' without warranties of any kind. We do not guarantee job placements or specific outcomes from our services."
        },
        {
          title: "Limitation of Liability",
          content: "To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services."
        },
        {
          title: "Indemnification",
          content: "You agree to indemnify us against any claims arising from your breach of these Terms or your use of our services."
        },
        {
          title: "Termination",
          content: "We may terminate or suspend your access to our services at any time, without notice, for conduct that we believe violates these Terms."
        },
        {
          title: "Governing Law",
          content: "These Terms shall be governed by the laws of [Your Jurisdiction] without regard to its conflict of law provisions."
        },
        {
          title: "Changes to Terms",
          content: "We may modify these Terms at any time. Your continued use of our services constitutes acceptance of the revised Terms."
        },
        {
          title: "Contact Information",
          content: "For questions about these Terms, please contact us at legal@rvitconsulting.com."
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

export default TermsContent;    