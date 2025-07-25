'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AnnualReportCard = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    '/assets/bg1.png',
    '/assets/bg2.png',
    '/assets/bg3.png',
    '/assets/bg4.jpg',
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

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-[500px] flex overflow-hidden">
      {/* Left Section */}
      <div className="w-1/2 bg-[#0078B8] text-white p-10 flex flex-col justify-center">
        <h2 className="text-4xl font-semibold mb-4">
          {headings[activeIndex].title}
        </h2>
        <p className="text-xl mb-6">
          {headings[activeIndex].subtitle}
        </p>
        <button className="bg-white text-[#0078B8] px-6 py-3 rounded-full flex items-center gap-2 w-fit font-medium hover:bg-gray-100 transition">
          Explore Services →
        </button>
      </div>

      {/* Right Section (Image) */}
      <div className="w-1/2 h-full relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={images[activeIndex]}
            alt="Service highlight"
            className="object-cover w-full h-full"
            initial={{ opacity: 0.2, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
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
    </div>
  );
};

export default AnnualReportCard;
