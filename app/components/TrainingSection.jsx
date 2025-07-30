"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const trainingPrograms = [
  {
    id: 1,
    title: "Customized IT Training",
    description:
      "Tailored programs designed to meet your organization's specific technology needs and business objectives.",
    image: "/assets/Home/training2.jpg",
  },
  {
    id: 2,
    title: "Technical Workshops",
    description:
      "Hands-on sessions covering the latest technologies, cloud platforms, and development methodologies.",
    image: "/assets/Home/workshop.jpg",
  },
  {
    id: 3,
    title: "Team Upskilling",
    description:
      "Comprehensive programs to elevate your team's technical competencies for future challenges.",
    image: "/assets/Home/teamupskill.jpg",
  },
  {
    id: 4,
    title: "IT Leadership Programs",
    description:
      "Specialized training for IT leaders focusing on digital strategy and innovation management.",
    image: "/assets/Home/leadership2.jpg",
  },
];

export default function CorporateTrainingCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % trainingPrograms.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gray-900 relative">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12 flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight md:leading-snug max-w-2xl mx-auto">
            Corporate IT Training Solutions
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-medium md:font-normal">
            Empowering individuals and organizations with real-world IT skills — whether you're preparing for your first job or upgrading post-employment, our training is built for results.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative h-96 md:h-[500px] w-full overflow-hidden rounded-xl shadow-2xl border border-gray-800">
         {trainingPrograms.map((program, index) => (
  <div
    key={program.id}
    className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${
      index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    {/* Ensure container has a height */}
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[900px] overflow-hidden">
      {/* Background Image */}
      <Image
        src={program.image}
        alt={program.title}
        layout="fill"
        objectFit="cover"
        objectPosition="center top" // prevents head cuts
        className="brightness-75"
      />

      {/* Optional dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Text Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center text-white px-4">
        <div className="text-center max-w-2xl">
          <h3 className="text-2xl md:text-4xl font-bold mb-4">{program.title}</h3>
          <p className="text-base md:text-xl mb-6 text-gray-200">{program.description}</p>
          <button className="relative bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-blue-500/40">
            <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-lg"></span>
            Learn More
          </button>
        </div>
      </div>
    </div>
  </div>
))}


          {/* Navigation Dots */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
            {trainingPrograms.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-blue-500 w-6" : "bg-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev - 1 + trainingPrograms.length) % trainingPrograms.length)
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700/90 text-white p-3 rounded-full z-10 transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % trainingPrograms.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700/90 text-white p-3 rounded-full z-10 transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Key Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-white text-center">
          <div className="bg-gray-800 p-6 rounded-xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40 hover:border-blue-500 border-2 border-transparent flex flex-col items-center justify-center">
            <h4 className="text-xl font-semibold mb-2">Pre-job & Post-job Readiness</h4>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Whether you're entering the workforce or upskilling after employment, our programs align with career transitions.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40 hover:border-blue-500 border-2 border-transparent flex flex-col items-center justify-center">
            <h4 className="text-xl font-semibold mb-2">Real Corporate Projects</h4>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Learn through enterprise case studies and active project simulations from Fortune 500 environments.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40 hover:border-blue-500 border-2 border-transparent flex flex-col items-center justify-center">
            <h4 className="text-xl font-semibold mb-2">Enterprise-Grade Skills</h4>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Gain proficiency in scalable, production-level tools and frameworks used by today’s tech leaders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}



// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";

// const trainingPrograms = [
//   {
//     id: 1,
//     title: "Customized IT Training",
//     description:
//       "Tailored programs designed to meet your organization's specific technology needs and business objectives.",
//     image: "/assets/bg1.png",
//   },
//   {
//     id: 2,
//     title: "Technical Workshops",
//     description:
//       "Hands-on sessions covering the latest technologies, cloud platforms, and development methodologies.",
//     image: "/assets/bg1.png",
//   },
//   {
//     id: 3,
//     title: "Team Upskilling",
//     description:
//       "Comprehensive programs to elevate your team's technical competencies for future challenges.",
//     image: "/assets/bg1.png",
//   },
//   {
//     id: 4,
//     title: "IT Leadership Programs",
//     description:
//       "Specialized training for IT leaders focusing on digital strategy and innovation management.",
//     image: "/assets/bg1.png",
//   },
// ];

// export default function CorporateTrainingCarousel() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % trainingPrograms.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="py-16 bg-gray-900 relative">
//       <div className="container mx-auto px-4">
//         {/* Heading */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//             Corporate IT Training Solutions
//           </h2>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//             Empowering individuals and organizations with real-world IT skills — whether you're preparing for your first job or upgrading post-employment, our training is built for results.
//           </p>
//         </div>

//         {/* Carousel Container */}
//         <div className="relative h-96 md:h-[500px] w-full overflow-hidden rounded-xl shadow-2xl border border-gray-800">
//           {trainingPrograms.map((program, index) => (
//             <div
//               key={program.id}
//               className={`absolute inset-0 transition-opacity duration-1000 flex items-center ${
//                 index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
//               }`}
//             >
//               <div className="absolute inset-0">
//                 <Image
//                   src={program.image}
//                   alt={program.title}
//                   layout="fill"
//                   objectFit="cover"
//                   className="brightness-50"
//                 />
//                 <div className="absolute inset-0 bg-black/40"></div>
//               </div>

//               <div className="relative z-10 text-white p-8 md:p-12 max-w-2xl">
//                 <h3 className="text-2xl md:text-3xl font-bold mb-4">{program.title}</h3>
//                 <p className="text-lg md:text-xl mb-6 text-gray-200">{program.description}</p>
//                 <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-all duration-300 transform hover:scale-105">
//                   Learn More
//                 </button>
//               </div>
//             </div>
//           ))}

//           {/* Navigation Dots */}
//           <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
//             {trainingPrograms.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   index === currentSlide ? "bg-blue-500 w-6" : "bg-gray-500"
//                 }`}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>

//           {/* Arrows */}
//           <button
//             onClick={() =>
//               setCurrentSlide((prev) => (prev - 1 + trainingPrograms.length) % trainingPrograms.length)
//             }
//             className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700/90 text-white p-3 rounded-full z-10 transition-all duration-300 hover:scale-110"
//             aria-label="Previous slide"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>
//           <button
//             onClick={() => setCurrentSlide((prev) => (prev + 1) % trainingPrograms.length)}
//             className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700/90 text-white p-3 rounded-full z-10 transition-all duration-300 hover:scale-110"
//             aria-label="Next slide"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         </div>

//         {/* Key Features Section */}
//         <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-white text-center">
//           <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition">
//             <h4 className="text-xl font-semibold mb-2">Pre-job & Post-job Readiness</h4>
//             <p className="text-gray-300 text-sm">
//               Whether you're entering the workforce or upskilling after employment, our programs align with career transitions.
//             </p>
//           </div>
//           <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition">
//             <h4 className="text-xl font-semibold mb-2">Real Corporate Projects</h4>
//             <p className="text-gray-300 text-sm">
//               Learn through enterprise case studies and active project simulations from Fortune 500 environments.
//             </p>
//           </div>
//           <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition">
//             <h4 className="text-xl font-semibold mb-2">Enterprise-Grade Skills</h4>
//             <p className="text-gray-300 text-sm">
//               Gain proficiency in scalable, production-level tools and frameworks used by today’s tech leaders.
//             </p>
//           </div>
//         </div>

//         {/* Final CTA 
//         // <div className="mt-12 text-center">
//         //   <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center shadow-lg">
//         //     View All Training Programs
//         //     <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//         //     </svg>
//         //   </button>
//         // </div>*/}
//       </div>
//     </section>
//   );
// }
