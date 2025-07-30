'use client';

import { useState } from "react";
import { FaSearch, FaUserTie, FaHandshake, FaChartLine } from 'react-icons/fa';
import { motion } from "framer-motion";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import toast, { Toaster } from "react-hot-toast";

export default function RecruitmentSection() {
  const recruitmentServices = [
    {
      icon: <FaSearch className="text-2xl text-blue-400" />,
      title: "Talent Acquisition",
      description: "We identify and attract top IT professionals with specialized skills for your organization."
    },
    {
      icon: <FaUserTie className="text-2xl text-blue-400" />,
      title: "Executive Search",
      description: "Strategic recruitment of C-level and senior IT leadership to drive your digital transformation."
    },
    {
      icon: <FaHandshake className="text-2xl text-blue-400" />,
      title: "Contract Staffing",
      description: "Flexible staffing solutions for project-based work or temporary skill gaps."
    },
    {
      icon: <FaChartLine className="text-2xl text-blue-400" />,
      title: "Workforce Planning",
      description: "Data-driven strategies to align your talent pipeline with business objectives."
    }
  ];

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);

  // Validation
  const validateForm = () => {
    const errors = {};
    if (!form.name) errors.name = "Name is required";
    if (!form.email) errors.email = "Email is required";
    if (!form.service) errors.service = "Service selection is required";
    return errors;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: undefined });
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }
    setLoading(true);
    setSuccess(false);
    try {
      await addDoc(collection(db, "recruitmentRequests"), form);
      setSuccess(true);
      setForm({ name: "", email: "", service: "" });
      toast.success("Request submitted successfully!");
    } catch (err) {
      setError({ submit: "Failed to submit. Please try again." });
      toast.error("Failed to submit. Please try again.");
    }
    setLoading(false);
  };

  return (
    <section className="py-16 bg-gray-900 relative">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4 drop-shadow">
            IT Recruitment Solutions
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-medium">
            <span className="text-blue-300 font-semibold">Connecting</span> exceptional <span className="text-cyan-400 font-semibold">IT talent</span> with <span className="text-blue-400 font-semibold">innovative organizations</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {recruitmentServices.map((service, index) => (
            <div 
              key={index}
              className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300 hover:-translate-y-2 shadow-lg border border-gray-700"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-blue-300 mb-3">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 rounded-xl p-8 md:p-12 border border-gray-700 shadow-lg">
          {/* Reduce gap between form and left content: change md:gap-20 to md:gap-8 */}
          <div className="flex flex-col md:flex-row items-center md:gap-8 lg:px-20">
            <motion.div
              className="md:w-1/2 mb-8 md:mb-0 md:pr-6 w-full"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              viewport={{ once: false }}
            >
              <h3 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-4 drop-shadow">Why Partner With Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="flex-shrink-0 w-5 h-5 text-blue-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300 font-medium">Deep understanding of IT skill requirements</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 w-5 h-5 text-blue-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300 font-medium">Extensive network of pre-vetted professionals</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 w-5 h-5 text-blue-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300 font-medium">Competitive placement rates</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 w-5 h-5 text-blue-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300 font-medium">90-day replacement guarantee</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              className="md:w-1/2 bg-gray-700 rounded-lg p-6 border border-gray-600 w-full"
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              viewport={{ once: false }}
            >
              <h4 className="text-xl font-semibold text-cyan-300 mb-4">Request Talent</h4>
              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                <div>
                  <label className="block text-gray-300 mb-1 font-semibold">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name" 
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      error.name ? "border-red-500" : "border-gray-600"
                    }`}
                  />
                  {error.name && (
                    <span className="text-red-500 text-sm mt-1 block">{error.name}</span>
                  )}
                </div>
                <div>
                  <label className="block text-gray-300 mb-1 font-semibold">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address" 
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      error.email ? "border-red-500" : "border-gray-600"
                    }`}
                  />
                  {error.email && (
                    <span className="text-red-500 text-sm mt-1 block">{error.email}</span>
                  )}
                </div>
                <div>
                  <label className="block text-gray-300 mb-1 font-semibold">
                    Service Needed <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      error.service ? "border-red-500" : "border-gray-600"
                    }`}
                  >
                    <option value="">Select Service Needed</option>
                    <option value="permanent">Permanent Recruitment – Hiring full-time employees for long-term roles</option>
                    <option value="contract">Contract Staffing - Providing skilled professionals on a short-term or project basis</option>
                    <option value="executive">Executive Search - Finding top-level leaders (CEO, CTO, etc.) for your organization</option>
                    <option value="consulting">Consulting Services - Career opportunities, support, trainings, and development projects</option>
                  </select>
                  {error.service && (
                    <span className="text-red-500 text-sm mt-1 block">{error.service}</span>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center mt-2 shadow-md"
                >
                  {loading ? "Submitting..." : "Submit Request"}
                </button>
                {error.submit && (
                  <span className="text-red-500 text-sm mt-2 block">{error.submit}</span>
                )}
                {/* Success handled by react-hot-toast */}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}




// 'use client';

// import { FaSearch, FaUserTie, FaHandshake, FaChartLine } from 'react-icons/fa';

// export default function RecruitmentSection() {
//   const recruitmentServices = [
//     {
//       icon: <FaSearch className="text-2xl text-blue-400" />,
//       title: "Talent Acquisition",
//       description: "We identify and attract top IT professionals with specialized skills for your organization."
//     },
//     {
//       icon: <FaUserTie className="text-2xl text-blue-400" />,
//       title: "Executive Search",
//       description: "Strategic recruitment of C-level and senior IT leadership to drive your digital transformation."
//     },
//     {
//       icon: <FaHandshake className="text-2xl text-blue-400" />,
//       title: "Contract Staffing",
//       description: "Flexible staffing solutions for project-based work or temporary skill gaps."
//     },
//     {
//       icon: <FaChartLine className="text-2xl text-blue-400" />,
//       title: "Workforce Planning",
//       description: "Data-driven strategies to align your talent pipeline with business objectives."
//     }
//   ];

//   return (
//     <section className="py-16 bg-gray-900">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//             IT Recruitment Solutions
//           </h2>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//             Connecting exceptional IT talent with innovative organizations
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//           {recruitmentServices.map((service, index) => (
//             <div 
//               key={index}
//               className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300 hover:-translate-y-2 shadow-lg border border-gray-700"
//             >
//               <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full mb-4">
//                 {service.icon}
//               </div>
//               <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
//               <p className="text-gray-400">{service.description}</p>
//             </div>
//           ))}
//         </div>

//         <div className="bg-gray-800 rounded-xl p-8 md:p-12 border border-gray-700 shadow-lg">
//           <div className="flex flex-col md:flex-row items-center">
//             <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
//               <h3 className="text-2xl font-bold text-white mb-4">Why Partner With Us?</h3>
//               <ul className="space-y-4">
//                 <li className="flex items-start">
//                   <svg className="flex-shrink-0 w-5 h-5 text-blue-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-gray-300">Deep understanding of IT skill requirements</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg className="flex-shrink-0 w-5 h-5 text-blue-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-gray-300">Extensive network of pre-vetted professionals</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg className="flex-shrink-0 w-5 h-5 text-blue-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-gray-300">Competitive placement rates</span>
//                 </li>
//                 <li className="flex items-start">
//                   <svg className="flex-shrink-0 w-5 h-5 text-blue-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   <span className="text-gray-300">90-day replacement guarantee</span>
//                 </li>
//               </ul>
//             </div>
//             <div className="md:w-1/2 bg-gray-700 rounded-lg p-6 border border-gray-600">
//               <h4 className="text-xl font-semibold text-white mb-4">Request Talent</h4>
//               <form className="space-y-4">
//                 <div>
//                   <input 
//                     type="text" 
//                     placeholder="Your Name" 
//                     className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <input 
//                     type="email" 
//                     placeholder="Email Address" 
//                     className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <select className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
// <option value="">Select Service Needed</option>

// <option value="permanent">
//   Permanent Recruitment – Hiring full-time employees for long-term roles
// </option>

// <option value="contract">
//   Contract Staffing - Providing skilled professionals on a short-term or project basis
// </option>

// <option value="executive">
//   Executive Search - Finding top-level leaders (CEO, CTO, etc.) for your organization
// </option>

// <option value="consulting">
//   Consulting Services -  Career opportunities, support, trainings, and development projects
// </option>

//     </select>
//    </div>
//     <button 
//            type="submit" 
//         >
//                   Submit Request
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* <div className="mt-12 text-center">
//           <button className="bg-transparent hover:bg-blue-600 text-blue-400 font-medium py-3 px-8 rounded-lg border-2 border-blue-400 hover:text-white transition-all duration-300 inline-flex items-center">
//             View Current Candidates
//             <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//             </svg>
//           </button>
//         </div> */}
//       </div>
//     </section>
//   );
// }