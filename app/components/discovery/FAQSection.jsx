'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What industries do you specialize in?",
      answer: "We work across a wide range of industries including healthcare, finance, education, agriculture, retail, and IT services. Our solutions are always tailored to your domain needs."
    },
    {
      question: "How do you approach new projects?",
      answer: "Every engagement starts with a discovery session to understand your goals. Then we design a solution blueprint, execute it in agile sprints, and provide continuous optimization."
    },
    {
      question: "Do you offer post-launch support and maintenance?",
      answer: "Yes, we offer comprehensive post-launch support, including performance monitoring, updates, enhancements, and technical support."
    },
    {
      question: "Can you integrate with our existing systems?",
      answer: "Absolutely. Our team is experienced in integrating with legacy systems, CRMs, ERPs, databases, and third-party APIs securely."
    },
    {
      question: "Is our data secure with you?",
      answer: "Yes. We follow enterprise-grade security standards and best practices to ensure your data is safe, encrypted, and compliant with regulations like GDPR."
    },
    {
      question: "How long does a typical project take?",
      answer: "The timeline depends on the project's complexity, but we always share a detailed roadmap and delivery plan upfront."
    },
    {
      question: "Do you offer custom AI/ML solutions?",
      answer: "Yes. We build custom machine learning models, NLP systems, computer vision applications, and more based on your specific business needs."
    },
    {
      question: "Can I request a demo or consultation?",
      answer: "Definitely! We offer free discovery consultations to explore how we can help."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-950 text-gray-100">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Discover Our World
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Explore the innovation, expertise, and vision that powers our solutions
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true, margin: "-100px" }}
              className="overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex justify-between items-center p-6 text-left rounded-xl transition-all duration-300 border border-gray-800 ${
                  activeIndex === index 
                    ? 'bg-gradient-to-br from-gray-800/70 to-gray-900/70 shadow-lg' 
                    : 'bg-gray-900 hover:bg-gray-800/50'
                }`}
              >
                <h3 className="text-lg sm:text-xl font-medium text-gray-100">
                  {faq.question}
                </h3>
                <div className="ml-4 shrink-0">
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
                    <div className={`px-6 pb-6 pt-2 text-gray-300 bg-gradient-to-br from-gray-800/40 to-gray-900/70 rounded-b-xl border-l border-r border-b border-gray-800 ${
                      index === faqs.length - 1 ? 'pb-8' : ''
                    }`}>
                      <p className="text-base md:text-lg leading-relaxed">{faq.answer}</p>
                      {index === faqs.length - 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="mt-6"
                        >
                          <a 
                            href="#contact" 
                            className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:opacity-90 transition-opacity shadow-lg hover:shadow-cyan-500/20"
                          >
                            Schedule a Consultation
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                              <path d="M5 12h14"></path>
                              <path d="m12 5 7 7-7 7"></path>
                            </svg>
                          </a>
                        </motion.div>
                      )}
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