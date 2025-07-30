"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const tabs = [
  {
    title: "Global Recruitment",
    heading: "Hiring talent across USA, Canada, Luxembourg and more.",
    sub: "We connect you with the right people, wherever they are.",
    image: "/assets/bg1.png",
  },
  {
    title: "Project Support",
    heading: "Speed up your projects with skilled experts.",
    sub: "Flexible team support with real results.",
    image: "/assets/bg2.png",
  },
  {
    title: "Training Programs",
    heading: "Help your team learn in-demand skills.",
    sub: "Online or on-site — we train your way.",
    image: "/assets/bg3.png",
  },
  {
    title: "App & Web Development",
    heading: "We build apps and websites that stand out.",
    sub: "From idea to launch — we take care of it all.",
    image: "/assets/bg4.jpg",
  },
];



export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Auto slide + animate progress bar
  useEffect(() => {
    let animationFrame: number;
    let start = performance.now();

    const animateProgress = (timestamp: number) => {
      const elapsed = timestamp - start;
      const duration = 5000; // 8 seconds

      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (elapsed < duration) {
        animationFrame = requestAnimationFrame(animateProgress);
      } else {
        setIndex((prev) => (prev + 1) % tabs.length);
        start = performance.now();
        setProgress(0);
        animationFrame = requestAnimationFrame(animateProgress);
      }
    };

    animationFrame = requestAnimationFrame(animateProgress);
    return () => cancelAnimationFrame(animationFrame);
  }, [index]);

  return (
    <div className="relative h-[80vh] w-full overflow-hidden text-white">
      {/* Background Image Crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tabs[index].image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={tabs[index].image}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-50" />
        </motion.div>
      </AnimatePresence>

      {/* Top Navigation Tabs */}
      <div className="relative z-20 px-6 md:px-20 pt-6 flex gap-10 text-white">
        {tabs.map((tab, i) => (
          <div
            key={i}
            className="relative pb-2 cursor-pointer"
            onClick={() => {
              setIndex(i);
              setProgress(0);
            }}
          >
            <span
              className={`text-sm md:text-lg font-medium ${
                index === i ? 'text-white' : 'text-gray-400'
              }`}
            >
              {tab.title}
            </span>

            {/* Active underline loader only for selected tab */}
            {index === i && (
              <motion.div
                className="absolute left-0 bottom-0 h-[2px] bg-white rounded origin-left"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Hero Content Section */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full px-6 md:px-20">
        <motion.h1
          key={tabs[index].heading}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold mb-4 max-w-2xl"
        >
          {tabs[index].heading}
        </motion.h1>

        <motion.p
          key={tabs[index].sub}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-2xl mb-6 max-w-xl"
        >
          {tabs[index].sub}
        </motion.p>

       <Link href="/contactUs">
  <motion.button
    whileHover={{ scale: 1.05 }}
    className="bg-yellow-400 text-black px-6 py-3 rounded-full text-lg font-semibold flex items-center gap-2"
  >
    Contact Us →
  </motion.button>
</Link>
      </div>
    </div>
  );
}


// "use client";

// import { useEffect, useState } from 'react';

// export default function ImageCarousel() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const carouselImages = [
//     "/assets/hero1.jpg",
//     "/assets/hero2.jpg",
//     "/assets/hero3.jpg",
//     "/assets/hero4.png",
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [carouselImages.length]);

//   return (
//     <section className="relative h-screen w-full overflow-hidden">
//       {/* Background Carousel */}
//       <div className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
//            style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
//         {carouselImages.map((image, index) => (
//           <div key={index} className="relative w-full h-full flex-shrink-0">
//             <img
//               src={image}
//               alt={`IT Consulting ${index + 1}`}
//               className="w-full h-full object-cover object-center scale-95"
//             />
//             {/* Dark overlay */}
//             <div className="absolute inset-0 bg-black/60" />
//           </div>
//         ))}
//       </div>

//       {/* Hero Content */}
//       <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 sm:px-12 lg:px-24">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
//             <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
//               Transform Your Business
//             </span>
//             <br />
//             <span className="text-white">With Cutting-Edge IT Solutions</span>
//           </h1>
          
//           <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto">
//             RV IT Consulting delivers world-class technology services, staffing solutions, 
//             and digital transformation expertise to help your business thrive.
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <a
//               href="#contact"
//               className="px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
//             >
//               Contact Us Today
//             </a>
//             <a
//               href="#services"
//               className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
//             >
//               Our Services
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Carousel Indicators */}
//       <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
//         {carouselImages.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentSlide(index)}
//             className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-white w-6' : 'bg-white/50'}`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>

//       {/* Scroll indicator */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
//         <svg
//           className="w-6 h-6 text-white"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M19 14l-7 7m0 0l-7-7m7 7V3"
//           />
//         </svg>
//       </div>
//     </section>
//   );
// }