"use client";
import { motion } from "framer-motion";

const supports = [
  {
    type: "Full-Time Support",
    icon: "🕓",
    highlights: [
      "Dedicated engineers for your project",
      "Seamless team integration",
      "Priority response & support",
      "Flexible ramp-up as business grows"
    ]
  },
  {
    type: "Part-Time Support",
    icon: "⏳",
    highlights: [
      "On-demand specialist access",
      "Cost-effective for dynamic needs",
      "Remote or onsite options",
      "Ideal for SMEs & pilot projects"
    ]
  },
  {
    type: "Contract / Project-Based",
    icon: "📄",
    highlights: [
      "Fixed scope or retainer models",
      "Rapid team deployment",
      "Clear milestones & deliverables",
      "Industry-certified consultants"
    ]
  }
];

const ProjectSupportSection = () => (
  <section className="relative py-20 px-4 bg-gradient-to-br from-[#05080e] via-[#0b101a] to-[#1a2130] text-white overflow-x-hidden">
    <div className="max-w-5xl mx-auto text-center mb-16">
      <motion.h2
        className="text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Flexible Project Support
      </motion.h2>
      <motion.p
        className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Choose the engagement model that fits your business: full-time, part-time, or contract-based support from expert teams.
      </motion.p>
    </div>
    {/* Support Cards */}
    <div
      className="
        flex flex-col
        lg:flex-row
        gap-8
        lg:gap-0
        justify-center
        items-stretch
        relative
        z-10
      "
    >
      {/* 
        Space between cards managed here:
        - On all screens: gap-8 (Tailwind default large gap)
        - On lg and above: gap-4 (Tailwind small gap for large screens)
        Just change lg:gap-4 to any value you want even smaller (e.g. lg:gap-2).
      */}
      {supports.map((support, idx) => (
        <motion.div
          key={support.type}
          className="w-full sm:w-[350px] bg-gradient-to-br from-[#131c2c] to-[#232d3b] rounded-2xl shadow-2xl px-7 py-8 flex flex-col items-center border-2 border-blue-700/40 hover:scale-105 transition-transform duration-300 cursor-pointer mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 * idx }}
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-800 to-cyan-700 shadow mb-4 text-4xl">
            {support.icon}
          </div>
          <h3 className="text-xl font-bold text-blue-300 mb-2 text-center w-full">{support.type}</h3>
          {/* Highlights list - center on sm/md, left on lg */}
          <ul className="space-y-2 w-full mt-4 flex flex-col items-center text-center lg:items-start lg:text-left">
            {support.highlights.map((item, i) => (
              <li key={i} className="flex items-center text-blue-100 text-sm justify-center lg:justify-start">
                <svg className="w-4 h-4 text-cyan-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
    {/* Call to Action */}
    <motion.div
      className="mt-20 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.8 }}
    >
      <h4 className="text-xl md:text-2xl font-bold text-cyan-300 mb-6">Start your support journey today!</h4>
     <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/40">
  Get Project Support
</button>
    </motion.div>
    {/* Neon floating circles */}
    <span className="pointer-events-none fixed z-0 left-4 top-40 w-24 h-24 bg-cyan-700 opacity-25 rounded-full blur-2xl animate-pulse" />
    <span className="pointer-events-none fixed z-0 right-8 top-1/3 w-16 h-16 bg-blue-700 opacity-15 rounded-full blur-xl animate-pulse" />
  </section>
);

export default ProjectSupportSection;



// "use client";
// import { motion } from "framer-motion";

// const supports = [
//   {
//     type: "Full-Time Support",
//     icon: "🕓",
//     highlights: [
//       "Dedicated engineers for your project",
//       "Seamless team integration",
//       "Priority response & support",
//       "Flexible ramp-up as business grows"
//     ]
//   },
//   {
//     type: "Part-Time Support",
//     icon: "⏳",
//     highlights: [
//       "On-demand specialist access",
//       "Cost-effective for dynamic needs",
//       "Remote or onsite options",
//       "Ideal for SMEs & pilot projects"
//     ]
//   },
//   {
//     type: "Contract / Project-Based",
//     icon: "📄",
//     highlights: [
//       "Fixed scope or retainer models",
//       "Rapid team deployment",
//       "Clear milestones & deliverables",
//       "Industry-certified consultants"
//     ]
//   }
// ];

// const ProjectSupportShowcase = () => (
//   <section className="relative py-20 px-4 bg-gradient-to-br from-[#05080e] via-[#0b101a] to-[#1a2130] text-white overflow-x-hidden">
//     <div className="max-w-5xl mx-auto text-center mb-16">
//       <motion.h2
//         className="text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//       >
//         Flexible Project Support
//       </motion.h2>
//       <motion.p
//         className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.2 }}
//       >
//         Choose the engagement model that fits your business: full-time, part-time, or contract-based support from expert teams.
//       </motion.p>
//     </div>
//     {/* Support Cards - Innovative Floating Style */}
//     <div className="flex flex-wrap gap-8 justify-center items-stretch relative z-10">
//       {supports.map((support, idx) => (
//         <motion.div
//           key={support.type}
//           className={`w-full sm:w-[350px] bg-gradient-to-br from-[#131c2c] to-[#232d3b] rounded-2xl shadow-2xl px-7 py-8 flex flex-col items-center border-2 border-blue-700/40 hover:scale-105 transition-transform duration-300 cursor-pointer`}
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.15 * idx }}
//         >
//           <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-800 to-cyan-700 shadow mb-4 text-4xl">
//             {support.icon}
//           </div>
//           <h3 className="text-xl font-bold text-blue-300 mb-2">{support.type}</h3>
//           <ul className="space-y-2 text-left w-full mt-4">
//             {support.highlights.map((item, i) => (
//               <li key={i} className="flex items-center text-blue-100 text-sm">
//                 <svg className="w-4 h-4 text-cyan-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                 </svg>
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </motion.div>
//       ))}
//     </div>
//     {/* Call to Action */}
//     <motion.div
//       className="mt-20 text-center"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.7, delay: 0.8 }}
//     >
//       <h4 className="text-xl md:text-2xl font-bold text-cyan-300 mb-6">Start your support journey today!</h4>
//       <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-lg hover:shadow-lg transition-all">
//         Get Project Support
//       </button>
//     </motion.div>
//     {/* Neon floating circles */}
//     <span className="pointer-events-none fixed z-0 left-4 top-40 w-24 h-24 bg-cyan-700 opacity-25 rounded-full blur-2xl animate-pulse" />
//     <span className="pointer-events-none fixed z-0 right-8 top-1/3 w-16 h-16 bg-blue-700 opacity-15 rounded-full blur-xl animate-pulse" />
//   </section>
// );

// export default ProjectSupportShowcase;