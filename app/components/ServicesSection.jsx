'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const AnnualReportCard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  const images = [
    '/assets/Home/GlobalTalent.jpg',
    '/assets/Home/support.jpg',
    '/assets/Home/corporateTraining1.jpg',
    '/assets/Home/cloudDevelopment.jpg',
  ];

  const headings = [
    {
      title: 'Global Talent & Staffing Solutions',
      subtitle: 'Hire across USA, Canada, Luxembourg and more.',
    },
    {
      title: 'Project & IT Support Services',
      subtitle: 'Part-time, full-time, and contract-based experts on demand.',
    },
    {
      title: 'Corporate Training & Upskilling',
      subtitle: 'Technical and soft skill training tailored for teams.',
    },
    {
      title: 'Apps & Cloud Development',
      subtitle: 'Build reliable web/mobile apps and deploy them in the cloud.',
    },
  ];

  // Animation variants for smooth transitions
  const textVariants = {
    initial: (direction) => ({
      opacity: 0,
      x: direction === 1 ? -60 : 60,
      scale: 0.96
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.6, type: "spring", stiffness: 60 }
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction === 1 ? 60 : -60,
      scale: 0.96,
      transition: { duration: 0.45 }
    }),
  };

  const imageVariants = {
    initial: (direction) => ({
      opacity: 0,
      x: direction === 1 ? 120 : -120,
      scale: 1.03
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.7, type: "spring", stiffness: 70 }
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction === 1 ? -120 : 120,
      scale: 1.03,
      transition: { duration: 0.45 }
    }),
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative w-full h-[500px] flex overflow-hidden flex-col md:flex-row"
    >
      {/* Left Section (Text) */}
      <div className="md:w-1/2 w-full bg-[#0078B8] text-white p-10 flex flex-col justify-center md:justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            // Responsive centering for text and button
            className="w-full flex flex-col items-center justify-center text-center h-full"
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              {headings[activeIndex].title}
            </h2>
            <p className="text-lg md:text-xl mb-6">
              {headings[activeIndex].subtitle}
            </p>
            <Link href="/services">
              <button className="bg-white text-[#0078B8] px-6 py-3 rounded-full flex items-center gap-2 w-fit font-medium hover:bg-gray-100 transition">
                Explore Services →
              </button>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Section (Image) */}
      <div className="md:w-1/2 w-full h-full relative flex items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={activeIndex}
            src={images[activeIndex]}
            alt="Service highlight"
            className="object-cover w-full h-full"
            custom={direction}
            variants={imageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            draggable={false}
          />
        </AnimatePresence>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full flex items-center gap-4 shadow-xl z-10">
        <button onClick={handlePrev}>
          <ChevronLeft className="text-black hover:scale-110 transition" />
        </button>
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i === activeIndex ? 'bg-black' : 'bg-gray-300'
            }`}
          />
        ))}
        <button onClick={handleNext}>
          <ChevronRight className="text-black hover:scale-110 transition" />
        </button>
      </div>

      {/* Responsive stacking and centering for small/medium screens */}
      <style jsx>{`
        @media (max-width: 1023px) {
          .md\\:w-1\\/2 {
            width: 100% !important;
          }
          .md\\:flex-row {
            flex-direction: column !important;
          }
          .h-\\[500px\\] {
            height: 600px !important;
          }
          .w-full.flex.flex-col.items-center.justify-center.text-center.h-full {
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default AnnualReportCard;