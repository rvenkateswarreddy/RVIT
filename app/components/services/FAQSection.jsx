'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What kind of project support does RV IT provide?",
      answer: "We provide end-to-end project support, including planning, execution, resource allocation, performance tracking, and delivery assurance tailored to your business goals."
    },
    {
      question: "Can RV IT handle short-term or contract-based projects?",
      answer: "Yes, we specialize in flexible contract project models, allowing clients to scale teams quickly and efficiently for short-term or specific-duration needs."
    },
    {
      question: "What industries does RV IT serve?",
      answer: "RV IT serves diverse industries such as finance, healthcare, logistics, retail, education, and technology — delivering tailored IT solutions across sectors."
    },
    {
      question: "How does RV IT ensure quality recruitment?",
      answer: "Our recruitment team follows a rigorous screening process involving skill assessments, background checks, and client-specific role mapping to deliver high-quality, job-ready candidates."
    },
    {
      question: "Is RV IT experienced with both technical and non-technical staffing?",
      answer: "Yes, we offer staffing solutions for both technical (developers, testers, DevOps) and non-technical (BPO, support staff, admin roles) positions based on your organization's requirements."
    },
    {
      question: "What makes RV IT's consulting services different?",
      answer: "Our IT consulting is led by certified experts who provide business-driven strategies, compliance guidance, and technology roadmaps aligned with your objectives."
    },
    {
      question: "Can I customize the service offerings based on my project needs?",
      answer: "Absolutely. We offer modular and customizable service plans, allowing you to pick exactly what you need — whether it's one-time consulting or full-scale staffing."
    },
    {
      question: "What is the engagement model followed by RV IT?",
      answer: "We follow a structured engagement model: Assessment → Planning → Execution → Optimization — ensuring maximum value at every stage of the project."
    },
    {
      question: "Do you provide post-deployment support?",
      answer: "Yes. Our engagement doesn't end at delivery — we offer post-deployment maintenance, support, monitoring, and performance tuning."
    },
    {
      question: "Is data security ensured in your services?",
      answer: "Definitely. We comply with global data security standards and implement best-in-class security practices in all our deliverables."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8   mb-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full blur-xl opacity-30"></span>
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
               Got Questions About Our Services? We’ve Got Answers!
              </span>
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Find answers to common questions about our comprehensive IT solutions and services
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: false, margin: "-50px" }}
              className="overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex justify-between items-start p-6 text-left rounded-xl transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-gray-800/50 shadow-lg border border-gray-700' 
                    : 'bg-gray-800/30 hover:bg-gray-800/40 border border-gray-800'
                }`}
              >
                <div className="flex items-start">
                  <span className="text-cyan-400 font-bold mr-4 mt-1">{index + 1}.</span>
                  <h3 className="text-lg sm:text-xl font-medium text-gray-100 text-left">
                    {faq.question}
                  </h3>
                </div>
                <div className="ml-4 shrink-0 mt-1">
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-6 h-6 flex items-center justify-center"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="w-5 h-5 text-cyan-400"
                    >
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: 'auto', 
                      opacity: 1,
                      transition: {
                        height: { duration: 0.3, ease: 'easeInOut' },
                        opacity: { duration: 0.2, delay: 0.1 }
                      }
                    }}
                    exit={{ 
                      height: 0, 
                      opacity: 0,
                      transition: {
                        height: { duration: 0.2, ease: 'easeInOut' },
                        opacity: { duration: 0.1 }
                      }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-gray-300 bg-gray-800/20 rounded-b-xl border-l border-r border-b border-gray-700/50">
                      <p className="text-base leading-relaxed pl-10">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      
      </div>
    </section>
  );
};

export default FAQSection;