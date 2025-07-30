"use client"
import { useState, useEffect, useCallback } from 'react';

export default function DevelopmentPathway() {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const steps = [
    {
      title: "Strategic Discovery Phase",
      icon: "🔍",
      description: "Define goals, understand needs, and shape a strong project foundation.",
      details: [
        "Stakeholder interviews to gather insights",
        "Competitive and market analysis",
        "Technical feasibility assessment",
        "Creation of a clear and actionable roadmap"
      ]
    },
    {
      title: "Agile Product Development",
      icon: "🔄",
      description: "Iterative development with rapid delivery and continuous collaboration.",
      details: [
        "Setup of CI/CD pipelines and environment readiness",
        "Blue-green or canary deployments for safety",
        "Load balancing and traffic management",
        "Rollback strategies in place for quick recovery"
      ]
    },
    {
      title: "Comprehensive QA Testing",
      icon: "🧪",
      description: "Ensure performance, security, and reliability at every stage of development.",
      details: [
        "End-to-end automated and manual testing",
        "Security and compliance verification",
        "Performance and load testing",
        "User acceptance and usability testing"
      ]
    },
    {
      title: "Zero-Downtime Deployment",
      icon: "🚀",
      description: "Launch seamlessly using CI/CD, load balancing, and rollback strategies.",
      details: [
        "CI/CD pipeline",
        "Blue-green deployment",
        "Load balancing",
        "Rollback strategies"
      ]
    },
    {
      title: "Ongoing Support & Growth",
      icon: "📈",
      description: "Post-launch optimization, monitoring, and continuous product enhancement.",
      details: [
        "24/7 application monitoring and incident response",
        "Frequent updates and security patches",
        "Performance tuning and scalability planning",
        "Ongoing product strategy and feature growth"
      ]
    }
  ];

  // Auto-advance the steps every second
  useEffect(() => {
    if (isHovered || isClicked) return;

    const timer = setInterval(() => {
      setActiveStep(prev => (prev >= steps.length - 1 ? 0 : prev + 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [isHovered, isClicked, steps.length]);

  // Reset click state after 5 seconds of inactivity
  useEffect(() => {
    if (!isClicked) return;

    const timer = setTimeout(() => {
      setIsClicked(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isClicked]);

  const handleStepClick = useCallback((index) => {
    setActiveStep(index);
    setIsClicked(true);
  }, []);

  return (
    <section className="py-16 bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-cyan-400 sm:text-4xl">
            Our Development Pathway
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            A transparent, results-driven process tailored to your success
          </p>
        </div>

        {/* Animated Pathway */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Vertical progress line */}
          <div className="hidden md:block absolute left-8 top-0 h-full w-1 bg-gray-800 transform translate-x-1/2">
            <div
              className="bg-gradient-to-b from-cyan-400 to-blue-600 h-full transition-all duration-1000 ease-in-out"
              style={{ height: `${(activeStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>

          {/* Steps container */}
          <div className="space-y-10 md:space-y-0">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative md:flex items-start transition-all duration-500 ${index <= activeStep ? 'opacity-100' : 'opacity-40'}`}
                onClick={() => handleStepClick(index)}
              >
                {/* Step indicator */}
                <div className={`flex items-center justify-center flex-shrink-0 w-16 h-16 rounded-full border-4 cursor-pointer ${
                  index <= activeStep
                    ? index === activeStep
                      ? 'border-cyan-400 bg-gray-900 shadow-lg shadow-cyan-400/20 pulse-animation'
                      : 'border-blue-500 bg-gray-900'
                    : 'border-gray-700 bg-gray-900'
                } transition-all duration-300 z-10`}>
                  <span className="text-2xl">{step.icon}</span>
                </div>

                {/* Content */}
                <div className="mt-4 md:mt-0 md:ml-6 pb-10 w-full">
                  <div className={`
                    p-6 rounded-xl transition-all duration-500 cursor-pointer
                    ${index === activeStep
                      ? 'bg-gray-800 shadow-xl border-l-4 border-cyan-400 transform scale-[1.02]'
                      : 'bg-gray-900 border-l-2 border-gray-700 hover:bg-gray-800'
                    }
                    md:w-full lg:w-[500px]
                    flex flex-col
                    `}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-sm font-semibold text-blue-400">Phase {index + 1}</span>
                        <h3 className="text-xl font-bold text-gray-100 mt-1">{step.title}</h3>
                      </div>
                      {index === activeStep && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-900 text-cyan-100">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-gray-300">{step.description}</p>

                    {index === activeStep && (
                      <div className="mt-6 animate-fadeIn">
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Key Activities</h4>
                        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {step.details.map((detail, i) => (
                            <li key={i} className="flex items-start">
                              <svg className="flex-shrink-0 h-5 w-5 text-cyan-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              <span className="ml-2 text-gray-200">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation dots (mobile) */}
        <div className="md:hidden mt-8 flex justify-center gap-2">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => handleStepClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeStep ? 'bg-cyan-400 w-6' : 'bg-gray-600'
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(34, 211, 238, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .pulse-animation {
          animation: pulse 2s infinite;
        }
      `}</style>
    </section>
  );
}




// "use client"
// import { useState, useEffect, useCallback } from 'react';

// export default function DevelopmentPathway() {
//   const [activeStep, setActiveStep] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isClicked, setIsClicked] = useState(false);

//   const steps = [
//     {
//       title: "Discovery & Strategy",
//       icon: "🔍",
//       description: "In-depth analysis of business requirements and technical strategy formulation.",
//       details: [
//         "Stakeholder interviews",
//         "Competitive analysis",
//         "Technical feasibility study",
//         "Roadmap creation"
//       ]
//     },
//     {
//       title: "Agile Development",
//       icon: "🔄",
//       description: "Iterative development process with continuous feedback integration.",
//       details: [
//         "Sprint planning",
//         "Bi-weekly iterations",
//         "Continuous integration",
//         "Real-time collaboration"
//       ]
//     },
//     {
//       title: "Quality Assurance",
//       icon: "🧪",
//       description: "Comprehensive testing at all levels to ensure product excellence.",
//       details: [
//         "Automated testing",
//         "Security audits",
//         "Performance testing",
//         "User acceptance testing"
//       ]
//     },
//     {
//       title: "Deployment",
//       icon: "🚀",
//       description: "Seamless transition to production with zero downtime.",
//       details: [
//         "CI/CD pipeline",
//         "Blue-green deployment",
//         "Load balancing",
//         "Rollback strategies"
//       ]
//     },
//     {
//       title: "Support & Growth",
//       icon: "📈",
//       description: "Ongoing optimization and feature enhancement post-launch.",
//       details: [
//         "24/7 monitoring",
//         "Regular updates",
//         "Performance tuning",
//         "Strategic evolution"
//       ]
//     }
//   ];

//   // Auto-advance the steps every second
//   useEffect(() => {
//     if (isHovered || isClicked) return;

//     const timer = setInterval(() => {
//       setActiveStep(prev => (prev >= steps.length - 1 ? 0 : prev + 1));
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [isHovered, isClicked, steps.length]);

//   // Reset click state after 5 seconds of inactivity
//   useEffect(() => {
//     if (!isClicked) return;

//     const timer = setTimeout(() => {
//       setIsClicked(false);
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, [isClicked]);

//   const handleStepClick = useCallback((index) => {
//     setActiveStep(index);
//     setIsClicked(true);
//   }, []);

//   return (
//     <section className="py-16 bg-gray-950 text-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-extrabold text-cyan-400 sm:text-4xl">
//             Our Development Pathway
//           </h2>
//           <p className="mt-4 text-xl text-gray-400">
//             A transparent, results-driven process tailored to your success
//           </p>
//         </div>

//         {/* Animated Pathway */}
//         <div 
//           className="relative"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           {/* Vertical progress line */}
//           <div className="hidden md:block absolute left-8 top-0 h-full w-1 bg-gray-800 transform translate-x-1/2">
//             <div 
//               className="bg-gradient-to-b from-cyan-400 to-blue-600 h-full transition-all duration-1000 ease-in-out" 
//               style={{ height: `${(activeStep / (steps.length - 1)) * 100}%` }}
//             ></div>
//           </div>

//           {/* Steps container */}
//           <div className="space-y-10 md:space-y-0">
//             {steps.map((step, index) => (
//               <div 
//                 key={index}
//                 className={`relative md:flex items-start transition-all duration-500 ${
//                   index <= activeStep ? 'opacity-100' : 'opacity-40'
//                 }`}
//                 onClick={() => handleStepClick(index)}
//               >
//                 {/* Step indicator */}
//                 <div className={`flex items-center justify-center flex-shrink-0 w-16 h-16 rounded-full border-4 cursor-pointer ${
//                   index <= activeStep 
//                     ? index === activeStep 
//                       ? 'border-cyan-400 bg-gray-900 shadow-lg shadow-cyan-400/20 pulse-animation' 
//                       : 'border-blue-500 bg-gray-900'
//                     : 'border-gray-700 bg-gray-900'
//                 } transition-all duration-300 z-10`}>
//                   <span className="text-2xl">{step.icon}</span>
//                 </div>

//                 {/* Content */}
//                 <div className="mt-4 md:mt-0 md:ml-6 pb-10">
//                   <div className={`p-6 rounded-xl transition-all duration-500 cursor-pointer ${
//                     index === activeStep 
//                       ? 'bg-gray-800 shadow-xl border-l-4 border-cyan-400 transform scale-[1.02]' 
//                       : 'bg-gray-900 border-l-2 border-gray-700 hover:bg-gray-800'
//                   }`}>
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <span className="text-sm font-semibold text-blue-400">Phase {index + 1}</span>
//                         <h3 className="text-xl font-bold text-gray-100 mt-1">{step.title}</h3>
//                       </div>
//                       {index === activeStep && (
//                         <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-900 text-cyan-100">
//                           Current
//                         </span>
//                       )}
//                     </div>
//                     <p className="mt-2 text-gray-300">{step.description}</p>

//                     {index === activeStep && (
//                       <div className="mt-6 animate-fadeIn">
//                         <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Key Activities</h4>
//                         <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
//                           {step.details.map((detail, i) => (
//                             <li key={i} className="flex items-start">
//                               <svg className="flex-shrink-0 h-5 w-5 text-cyan-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                               </svg>
//                               <span className="ml-2 text-gray-200">{detail}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Navigation dots (mobile) */}
//         <div className="md:hidden mt-8 flex justify-center gap-2">
//           {steps.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => handleStepClick(index)}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 index === activeStep ? 'bg-cyan-400 w-6' : 'bg-gray-600'
//               }`}
//               aria-label={`Go to step ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Animation styles */}
//       <style jsx global>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes pulse {
//           0% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.4); }
//           70% { box-shadow: 0 0 0 10px rgba(34, 211, 238, 0); }
//           100% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.5s ease-out forwards;
//         }
//         .pulse-animation {
//           animation: pulse 2s infinite;
//         }
//       `}</style>
//     </section>
//   );
// }