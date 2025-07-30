'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import careersImage from '../../../public/slider1.jpg';

const jobOpenings = [
  {
    id: 1,
    title: "Technical Recruiter",
    type: "Full-time",
    location: "Remote",
    department: "Talent Acquisition"
  },
  {
    id: 2,
    title: "IT Project Manager",
    type: "Contract",
    location: "Hybrid (Bangalore)",
    department: "Project Delivery"
  },
  {
    id: 3,
    title: "DevOps Trainer",
    type: "Part-time",
    location: "Remote",
    department: "Training"
  },
  {
    id: 4,
    title: "Business Development Executive",
    type: "Full-time",
    location: "Mumbai",
    department: "Sales"
  },
  {
    id: 5,
    title: "Full Stack Developer",
    type: "Contract-to-hire",
    location: "Remote",
    department: "Technical Staffing"
  },
  {
    id: 6,
    title: "HR Manager",
    type: "Full-time",
    location: "Delhi",
    department: "Human Resources"
  }
];

const benefits = [
  {
    title: "Competitive Compensation",
    description: "Attractive salary packages with performance bonuses",
    icon: "💰"
  },
  {
    title: "Flexible Work",
    description: "Remote and hybrid work options for many positions",
    icon: "🏡"
  },
  {
    title: "Learning & Growth",
    description: "Continuous training and professional development",
    icon: "📚"
  },
  {
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs",
    icon: "❤️"
  },
  {
    title: "Cutting-Edge Projects",
    description: "Work with the latest technologies and innovative clients",
    icon: "🚀"
  },
  {
    title: "Inclusive Culture",
    description: "Diverse and supportive work environment",
    icon: "🌍"
  }
];

const CareersContent = () => {
  const heroRef = useRef(null);
  const jobsRefs = jobOpenings.map(() => useRef(null));
  const benefitsRefs = benefits.map(() => useRef(null));
  const ctaRef = useRef(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const isJobsInView = useInView(jobsRefs[0], { once: true, margin: '-100px' });
  const isBenefitsInView = useInView(benefitsRefs[0], { once: true, margin: '-100px' });

  useEffect(() => {
    if (isHeroInView) {
      heroRef.current.classList.add('animate-fadeInUp');
    }
  }, [isHeroInView]);

  useEffect(() => {
    if (isJobsInView) {
      jobsRefs.forEach((ref, index) => {
        setTimeout(() => {
          if (ref.current) {
            ref.current.classList.add('animate-fadeInUp');
          }
        }, index * 100);
      });
    }
  }, [isJobsInView]);

  useEffect(() => {
    if (isBenefitsInView) {
      benefitsRefs.forEach((ref, index) => {
        setTimeout(() => {
          if (ref.current) {
            ref.current.classList.add('animate-fadeInUp');
          }
        }, index * 100);
      });
      if (ctaRef.current) {
        ctaRef.current.classList.add('animate-fadeInUp');
      }
    }
  }, [isBenefitsInView]);

  return (
    <div className="max-w-7xl mx-auto  min-h-screen py-8 px-2 sm:px-4 md:px-8">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="opacity-0 transform translate-y-8 transition-all duration-700 ease-out mb-16"
      >
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Grow Your Career With Us
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Join RV IT Consulting and be part of a team that's transforming the technology services landscape through innovative staffing and training solutions.
            </p>
            <button
              className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
              onClick={() => document.getElementById('openings').scrollIntoView({ behavior: 'smooth' })}
            >
              View Open Positions
            </button>
          </div>
          <div className="md:w-1/2">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-700">
              <Image
                src={careersImage}
                alt="Careers at RV IT Consulting"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-900/30" />
            </div>
          </div>
        </div>
      </div>

      {/* Job Openings Section */}
      <div id="openings" className="mb-16">
        <h2 className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow">
          Current Job Openings
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {jobOpenings.map((job, index) => (
            <div
              key={job.id}
              ref={jobsRefs[index]}
              className={`opacity-0 transform translate-y-8 transition-all duration-500 ease-out bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-cyan-400/50 transition-colors cursor-pointer`}
              onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <span className="text-sm bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full">
                      {job.type}
                    </span>
                    <span className="text-sm bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full">
                      {job.location}
                    </span>
                    <span className="text-sm bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full">
                      {job.department}
                    </span>
                  </div>
                </div>
                <button
                  className={`font-semibold transition-colors text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-blue-500 hover:to-cyan-400`}
                >
                  {selectedJob === job.id ? 'Hide Details' : 'View Details'}
                </button>
              </div>

              {selectedJob === job.id && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <h4 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">Job Description:</h4>
                  <p className="text-gray-300 mb-4">
                    We are looking for a {job.title} to join our {job.department} team. In this role, you'll be responsible for [brief description of key responsibilities]. The ideal candidate will have [key qualifications].
                  </p>

                  <h4 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">Requirements:</h4>
                  <ul className="list-disc pl-5 space-y-1 mb-4 text-gray-300">
                    <li>Minimum X years of experience in [relevant field]</li>
                    <li>Proficiency in [relevant skills/technologies]</li>
                    <li>Excellent communication and collaboration skills</li>
                    <li>[Any other specific requirements]</li>
                  </ul>

                  <button
                    className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg text-sm font-semibold shadow-lg hover:from-blue-500 hover:to-cyan-400 hover:scale-105 transition-all"
                  >
                    Apply Now
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow">
          Why Work With Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              ref={benefitsRefs[index]}
              className="opacity-0 transform translate-y-8 transition-all duration-500 ease-out bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-cyan-400/50 transition-colors"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-3">{benefit.title}</h3>
              <p className="text-gray-300">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div
        ref={ctaRef}
        className="opacity-0 transform translate-y-8 transition-all duration-700 ease-out bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border border-gray-700 rounded-xl p-8 md:p-12 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Don't See Your Perfect Role?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          We're always looking for talented individuals. Send us your resume and we'll contact you when a matching position becomes available.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg hover:scale-105">
            Send Us Your Application
          </button>
          <button className="px-8 py-3 bg-transparent border-2 border-cyan-400 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-semibold rounded-lg hover:bg-cyan-400/10 transition-colors">
            Contact HR
          </button>
        </div>
      </div>

      {/* FadeInUp Keyframes */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          opacity: 1 !important;
          transform: translateY(0) !important;
          animation: fadeInUp 0.7s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards;
        }
      `}</style>
    </div>
  );
};

export default CareersContent;




// 'use client';

// import { useEffect, useState } from 'react';
// import { useInView } from 'framer-motion';
// import { useRef } from 'react';
// import Image from 'next/image';
// import careersImage from '../../../public/slider1.jpg';

// const jobOpenings = [
//   {
//     id: 1,
//     title: "Technical Recruiter",
//     type: "Full-time",
//     location: "Remote",
//     department: "Talent Acquisition"
//   },
//   {
//     id: 2,
//     title: "IT Project Manager",
//     type: "Contract",
//     location: "Hybrid (Bangalore)",
//     department: "Project Delivery"
//   },
//   {
//     id: 3,
//     title: "DevOps Trainer",
//     type: "Part-time",
//     location: "Remote",
//     department: "Training"
//   },
//   {
//     id: 4,
//     title: "Business Development Executive",
//     type: "Full-time",
//     location: "Mumbai",
//     department: "Sales"
//   },
//   {
//     id: 5,
//     title: "Full Stack Developer",
//     type: "Contract-to-hire",
//     location: "Remote",
//     department: "Technical Staffing"
//   },
//   {
//     id: 6,
//     title: "HR Manager",
//     type: "Full-time",
//     location: "Delhi",
//     department: "Human Resources"
//   }
// ];

// const benefits = [
//   {
//     title: "Competitive Compensation",
//     description: "Attractive salary packages with performance bonuses",
//     icon: "💰"
//   },
//   {
//     title: "Flexible Work",
//     description: "Remote and hybrid work options for many positions",
//     icon: "🏡"
//   },
//   {
//     title: "Learning & Growth",
//     description: "Continuous training and professional development",
//     icon: "📚"
//   },
//   {
//     title: "Health & Wellness",
//     description: "Comprehensive health insurance and wellness programs",
//     icon: "❤️"
//   },
//   {
//     title: "Cutting-Edge Projects",
//     description: "Work with the latest technologies and innovative clients",
//     icon: "🚀"
//   },
//   {
//     title: "Inclusive Culture",
//     description: "Diverse and supportive work environment",
//     icon: "🌍"
//   }
// ];

// const CareersContent = () => {
//   const heroRef = useRef(null);
//   const jobsRefs = jobOpenings.map(() => useRef(null));
//   const benefitsRefs = benefits.map(() => useRef(null));
//   const ctaRef = useRef(null);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const isHeroInView = useInView(heroRef, { once: true, margin: '-100px' });
//   const isJobsInView = useInView(jobsRefs[0], { once: true, margin: '-100px' });
//   const isBenefitsInView = useInView(benefitsRefs[0], { once: true, margin: '-100px' });

//   useEffect(() => {
//     if (isHeroInView) {
//       heroRef.current.classList.add('animate-fadeInUp');
//     }
//   }, [isHeroInView]);

//   useEffect(() => {
//     if (isJobsInView) {
//       jobsRefs.forEach((ref, index) => {
//         setTimeout(() => {
//           if (ref.current) {
//             ref.current.classList.add('animate-fadeInUp');
//           }
//         }, index * 100);
//       });
//     }
//   }, [isJobsInView]);

//   useEffect(() => {
//     if (isBenefitsInView) {
//       benefitsRefs.forEach((ref, index) => {
//         setTimeout(() => {
//           if (ref.current) {
//             ref.current.classList.add('animate-fadeInUp');
//           }
//         }, index * 100);
//       });
//       ctaRef.current.classList.add('animate-fadeInUp');
//     }
//   }, [isBenefitsInView]);

//   return (
//     <div className="max-w-7xl mx-auto">
//       {/* Hero Section */}
//       <div 
//         ref={heroRef}
//         className="opacity-0 transform translate-y-8 transition-all duration-700 ease-out mb-16"
//       >
//         <div className="flex flex-col md:flex-row gap-8 items-center">
//           <div className="md:w-1/2">
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
//                 Grow Your Career With Us
//               </span>
//             </h1>
//             <p className="text-xl text-gray-300 mb-6">
//               Join RV IT Consulting and be part of a team that's transforming the technology services landscape through innovative staffing and training solutions.
//             </p>
//             <button 
//               className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
//               onClick={() => document.getElementById('openings').scrollIntoView({ behavior: 'smooth' })}
//             >
//               View Open Positions
//             </button>
//           </div>
//           <div className="md:w-1/2">
//             <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-700">
//               <Image
//                 src={careersImage}
//                 alt="Careers at RV IT Consulting"
//                 fill
//                 className="object-cover"
//                 priority
//               />
//               <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-900/30" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Job Openings Section */}
//       <div id="openings" className="mb-16">
//         <h2 className="text-3xl font-bold text-white mb-12 text-center">
//           Current Job Openings
//         </h2>
//         <div className="grid grid-cols-1 gap-4">
//           {jobOpenings.map((job, index) => (
//             <div
//               key={job.id}
//               ref={jobsRefs[index]}
//               className="opacity-0 transform translate-y-8 transition-all duration-500 ease-out bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-cyan-400/50 transition-colors cursor-pointer"
//               onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
//             >
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                 <div>
//                   <h3 className="text-xl font-bold text-white">{job.title}</h3>
//                   <div className="flex flex-wrap gap-4 mt-2">
//                     <span className="text-sm bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full">
//                       {job.type}
//                     </span>
//                     <span className="text-sm bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full">
//                       {job.location}
//                     </span>
//                     <span className="text-sm bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full">
//                       {job.department}
//                     </span>
//                   </div>
//                 </div>
//                 <button className="text-cyan-400 hover:text-cyan-300 font-medium">
//                   {selectedJob === job.id ? 'Hide Details' : 'View Details'}
//                 </button>
//               </div>
              
//               {selectedJob === job.id && (
//                 <div className="mt-4 pt-4 border-t border-gray-700">
//                   <h4 className="font-bold text-white mb-2">Job Description:</h4>
//                   <p className="text-gray-300 mb-4">
//                     We are looking for a {job.title} to join our {job.department} team. In this role, you'll be responsible for [brief description of key responsibilities]. The ideal candidate will have [key qualifications].
//                   </p>
                  
//                   <h4 className="font-bold text-white mb-2">Requirements:</h4>
//                   <ul className="list-disc pl-5 space-y-1 mb-4 text-gray-300">
//                     <li>Minimum X years of experience in [relevant field]</li>
//                     <li>Proficiency in [relevant skills/technologies]</li>
//                     <li>Excellent communication and collaboration skills</li>
//                     <li>[Any other specific requirements]</li>
//                   </ul>
                  
//                   <button className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm">
//                     Apply Now
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Benefits Section */}
//       <div className="mb-16">
//         <h2 className="text-3xl font-bold text-white mb-12 text-center">
//           Why Work With Us?
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {benefits.map((benefit, index) => (
//             <div
//               key={index}
//               ref={benefitsRefs[index]}
//               className="opacity-0 transform translate-y-8 transition-all duration-500 ease-out bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-cyan-400/50 transition-colors"
//             >
//               <div className="text-4xl mb-4">{benefit.icon}</div>
//               <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
//               <p className="text-gray-300">{benefit.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div 
//         ref={ctaRef}
//         className="opacity-0 transform translate-y-8 transition-all duration-700 ease-out bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border border-gray-700 rounded-xl p-8 md:p-12 text-center"
//       >
//         <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
//           Don't See Your Perfect Role?
//         </h2>
//         <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
//           We're always looking for talented individuals. Send us your resume and we'll contact you when a matching position becomes available.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20">
//             Submit Your Resume
//           </button>
//           <button className="px-8 py-3 bg-transparent border-2 border-cyan-400 text-cyan-100 font-medium rounded-lg hover:bg-cyan-400/10 transition-colors">
//             Contact HR
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CareersContent;