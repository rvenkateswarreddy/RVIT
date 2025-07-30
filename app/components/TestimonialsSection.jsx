'use client';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    name: "Rajeshwari Iyer",
    designation: "CTO",
    company: "Tata Nexarc Digital Solutions",
    avatar: "/indian-woman-executive.jpg",
    quote: "RV IT's consulting transformed our cloud migration strategy. Their team delivered 40% cost savings while improving our system reliability beyond expectations. Their understanding of both global standards and local business needs is exceptional.",
    results: [
      "40% infrastructure cost reduction",
      "99.98% uptime achieved",
      "3-month accelerated timeline"
    ]
  },
  {
    name: "Vikram Patel",
    designation: "Head of Digital Transformation",
    company: "HDFC Securities",
    avatar: "/indian-man-executive.jpg",
    quote: "We engaged RV IT for our core banking modernization. Their technical architects demonstrated deep domain expertise while customizing solutions for Indian regulatory requirements. The project was completed with zero business disruption.",
    results: [
      "Zero downtime migration",
      "200% performance improvement",
      "RBI compliance certified"
    ]
  },
  {
    name: "Priyanka Reddy",
    designation: "VP Technology",
    company: "Flipkart Marketplace",
    avatar: "/indian-woman-tech.jpg",
    quote: "During our peak season scaling, RV IT's team implemented optimizations that handled 3x traffic growth seamlessly. Their 24/7 support during critical periods gave us complete peace of mind.",
    results: [
      "3x traffic capacity",
      "300ms response time maintained",
      "100% order success rate"
    ]
  },
  {
    name: "Arjun Mehra",
    designation: "Director",
    company: "Reliance Jio Platforms",
    avatar: "/indian-man-tech.jpg",
    quote: "RV IT's AI implementation roadmap helped us personalize our customer experiences while maintaining strict data sovereignty requirements. Their solutions delivered measurable business impact within the first quarter.",
    results: [
      "35% increase in engagement",
      "Local data compliance maintained",
      "ROI in 90 days"
    ]
  }
];

// Animation variants for the testimonial boxes
const boxVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 }
};

export default function ClientTestimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by India's Digital Leaders
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from executives who've transformed their businesses with our solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={boxVariants}
              initial="initial"
              whileInView="animate"
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: false }} // This will animate every time it enters the viewport
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-400 transition-all duration-300"
            >
              <div className="flex items-start mb-6">
                <div className="relative mr-4 flex-shrink-0">
                  <FaQuoteLeft className="absolute -top-2 -left-2 text-cyan-400 bg-gray-800 p-1 rounded-full" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">
                    {testimonial.designation}, {testimonial.company}
                  </p>
                </div>
              </div>
              <blockquote className="text-gray-300 italic mb-6 pl-2 border-l-2 border-cyan-500">
                "{testimonial.quote}"
              </blockquote>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: false }}
          className="mt-16 text-center"
        >
        </motion.div>
      </div>
    </section>
  );
}


// 'use client';
// import { motion } from 'framer-motion';
// import { FaQuoteLeft } from 'react-icons/fa';

// const testimonials = [
//   {
//     name: "Rajeshwari Iyer",
//     designation: "CTO",
//     company: "Tata Nexarc Digital Solutions",
//     avatar: "/indian-woman-executive.jpg", // Use appropriate image
//     quote: "RV IT's consulting transformed our cloud migration strategy. Their team delivered 40% cost savings while improving our system reliability beyond expectations. Their understanding of both global standards and local business needs is exceptional.",
//     results: [
//       "40% infrastructure cost reduction",
//       "99.98% uptime achieved",
//       "3-month accelerated timeline"
//     ]
//   },
//   {
//     name: "Vikram Patel",
//     designation: "Head of Digital Transformation",
//     company: "HDFC Securities",
//     avatar: "/indian-man-executive.jpg", // Use appropriate image
//     quote: "We engaged RV IT for our core banking modernization. Their technical architects demonstrated deep domain expertise while customizing solutions for Indian regulatory requirements. The project was completed with zero business disruption.",
//     results: [
//       "Zero downtime migration",
//       "200% performance improvement",
//       "RBI compliance certified"
//     ]
//   },
//   {
//     name: "Priyanka Reddy",
//     designation: "VP Technology",
//     company: "Flipkart Marketplace",
//     avatar: "/indian-woman-tech.jpg", // Use appropriate image
//     quote: "During our peak season scaling, RV IT's team implemented optimizations that handled 3x traffic growth seamlessly. Their 24/7 support during critical periods gave us complete peace of mind.",
//     results: [
//       "3x traffic capacity",
//       "300ms response time maintained",
//       "100% order success rate"
//     ]
//   },
//   {
//     name: "Arjun Mehra",
//     designation: "Director",
//     company: "Reliance Jio Platforms",
//     avatar: "/indian-man-tech.jpg", // Use appropriate image
//     quote: "RV IT's AI implementation roadmap helped us personalize our customer experiences while maintaining strict data sovereignty requirements. Their solutions delivered measurable business impact within the first quarter.",
//     results: [
//       "35% increase in engagement",
//       "Local data compliance maintained",
//       "ROI in 90 days"
//     ]
//   }
// ];

// export default function ClientTestimonials() {
//   return (
//     <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//             Trusted by India's Digital Leaders
//           </h2>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//             Hear from executives who've transformed their businesses with our solutions
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {testimonials.map((testimonial, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               viewport={{ once: true, margin: "-100px" }}
//               className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-400 transition-all duration-300"
//             >
//               <div className="flex items-start mb-6">
//                 <div className="relative mr-4 flex-shrink-0">
                 
//                   <FaQuoteLeft className="absolute -top-2 -left-2 text-cyan-400 bg-gray-800 p-1 rounded-full" />
//                 </div>
//                 <div>
//                   <h4 className="text-xl font-semibold text-white">{testimonial.name}</h4>
//                   <p className="text-gray-400 text-sm">
//                     {testimonial.designation}, {testimonial.company}
//                   </p>
//                 </div>
//               </div>
              
//               <blockquote className="text-gray-300 italic mb-6 pl-2 border-l-2 border-cyan-500">
//                 "{testimonial.quote}"
//               </blockquote>
         
//             </motion.div>
//           ))}
//         </div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           viewport={{ once: true }}
//           className="mt-16 text-center"
//         >
        
//         </motion.div>
//       </div>
//     </section>
//   );
// }