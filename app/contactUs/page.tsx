
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend, FiPhone, FiMapPin } from 'react-icons/fi';
import Image from 'next/image';
import contact from '../../public/assets/herosection3.png';
import { db } from '../../FirebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = () => {
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      createdAt: serverTimestamp(),
    };

    if (!data.name || !data.email || !data.subject || !data.message) {
      setError('Please fill out all required fields.');
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, 'contacts'), data);
      setSuccess(true);
      form.reset();
    } catch (err) {
      setError('Failed to send message. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FiMail className="text-blue-400 text-xl" />,
      title: 'Email',
      value: 'support@rvit.co.in',
      description: 'Drop us a line anytime'
    },
    {
      icon: <FiPhone className="text-blue-400 text-xl" />,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Mon-Fri from 9am to 5pm'
    },
    {
      icon: <FiMapPin className="text-blue-400 text-xl" />,
      title: 'Office',
      value: '123 Tech Park, Bangalore',
      description: 'Come visit our headquarters'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-100 mb-4">
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-30"></span>
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                Lets Connect
              </span>
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to start your next project? Reach out and we will respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left Column - Image & Contact Info */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-96 w-full rounded-xl overflow-hidden shadow-2xl group"
            >
              <Image
                src={contact}
                alt="Contact RV IT Services"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-xl font-bold">RV IT Services</h3>
                <p className="text-gray-300">Transforming ideas into digital reality</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-700/30"
            >
              <h2 className="text-2xl font-bold text-gray-100 mb-6">
                Our Contact Information
              </h2>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-start group"
                  >
                    <div className="bg-blue-500/10 p-3 rounded-lg mr-4 group-hover:bg-blue-500/20 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-gray-400 text-sm font-medium">{item.title}</h3>
                      <p className="text-gray-200 font-medium">{item.value}</p>
                      <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-700/30 h-fit sticky top-8"
          >
            <h2 className="text-2xl font-bold text-gray-100 mb-6">
              Send Us a Message
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit} onChange={handleInputChange}>
              <motion.div whileHover={{ scale: 1.01 }}>
                <label
                  htmlFor="name"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600/50 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500"
                  placeholder="John Doe"
                  required
                  disabled={loading}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.01 }}>
                <label
                  htmlFor="email"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600/50 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500"
                  placeholder="john@example.com"
                  required
                  disabled={loading}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.01 }}>
                <label
                  htmlFor="subject"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  name="subject"
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600/50 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500"
                  placeholder="Project Inquiry"
                  required
                  disabled={loading}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.01 }}>
                <label
                  htmlFor="message"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600/50 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500"
                  placeholder="Tell us about your project requirements..."
                  required
                  disabled={loading}
                ></textarea>
              </motion.div>

              {/* Status Messages */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 font-medium text-sm"
                >
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 py-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 font-medium text-sm"
                >
                  Your message has been sent successfully! We will get back to you soon.
                </motion.div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 group disabled:opacity-60 shadow-lg hover:shadow-blue-500/20"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V8z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Submit Message
                    <FiSend className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4 text-sm uppercase tracking-wider">
            Trusted by companies worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-80">
            {['TechCorp', 'InnoVate', 'DigitalPlus', 'WebSolutions', 'CloudNine'].map((company, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3 }}
                className="text-gray-300 font-medium"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </div>
  );
};

export default ContactPage;









// "use client";
// import React, { useState } from "react";
// import { FiMail, FiSend } from "react-icons/fi";
// import Image from "next/image";
// import contact from "../../public/assets/project1.jpg";
// import { db } from "../../FirebaseConfig";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// const ContactPage = () => {
//   // Form state
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);

//   // Optional: Clear status on input change
//   const handleInputChange = () => {
//     setError(null);
//     setSuccess(false);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     const form = e.currentTarget;
//     const formData = new FormData(form);

//     const data = {
//       name: formData.get("name"),
//       email: formData.get("email"),
//       subject: formData.get("subject"),
//       message: formData.get("message"),
//       createdAt: serverTimestamp(),
//     };

//     // Basic client-side validation
//     if (
//       !data.name ||
//       !data.email ||
//       !data.subject ||
//       !data.message ||
//       typeof data.name !== "string" ||
//       typeof data.email !== "string"
//     ) {
//       setError("Please fill out all required fields.");
//       setLoading(false);
//       return;
//     }

//     try {
//       await addDoc(collection(db, "contacts"), data);
//       setSuccess(true);
//       form.reset();
//     } catch (err) {
//       setError("Failed to send message. Please try again later.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
//         <div className="text-center mb-16">
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-100 mb-4">
//             Get in
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
//               Touch
//             </span>
//           </h1>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//             Have a project in mind? Lets collaborate and create something
//             extraordinary together.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
//           {/* Left Column - Image & Contact Info */}
//           <div className="space-y-8">
//             <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-2xl">
//               <Image
//                 src={contact}
//                 alt="Contact Us"
//                 fill
//                 className="object-cover"
//                 priority
//               />
//             </div>

//             <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
//               <h2 className="text-2xl font-bold text-gray-100 mb-6">
//                 Contact Information
//               </h2>

//               <div className="space-y-6">
//                 <div className="flex items-start">
//                   <div className="bg-blue-500/10 p-3 rounded-lg mr-4">
//                     <FiMail className="text-blue-400 text-xl" />
//                   </div>
//                   <div>
//                     <h3 className="text-gray-400 text-sm font-medium">Email</h3>
//                     <p className="text-gray-200">support@rvit.co.in</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Contact Form */}
//           <div className="bg-gray-800 p-8 rounded-xl shadow-lg h-fit sticky top-8">
//             <h2 className="text-2xl font-bold text-gray-100 mb-6">
//               Send Us a Message
//             </h2>

//             <form className="space-y-6" onSubmit={handleSubmit} onChange={handleInputChange}>
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="block text-gray-300 text-sm font-medium mb-2"
//                 >
//                   Full Name
//                 </label>
//                 <input
//                   name="name"
//                   type="text"
//                   id="name"
//                   className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   placeholder="Enter your name"
//                   required
//                   disabled={loading}
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-gray-300 text-sm font-medium mb-2"
//                 >
//                   Email Address
//                 </label>
//                 <input
//                   name="email"
//                   type="email"
//                   id="email"
//                   className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   placeholder="Enter your email"
//                   required
//                   disabled={loading}
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="subject"
//                   className="block text-gray-300 text-sm font-medium mb-2"
//                 >
//                   Subject
//                 </label>
//                 <input
//                   name="subject"
//                   type="text"
//                   id="subject"
//                   className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   placeholder="What's this about?"
//                   required
//                   disabled={loading}
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="message"
//                   className="block text-gray-300 text-sm font-medium mb-2"
//                 >
//                   Your Message
//                 </label>
//                 <textarea
//                   name="message"
//                   id="message"
//                   rows={5}
//                   className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   placeholder="Tell us about your project..."
//                   required
//                   disabled={loading}
//                 ></textarea>
//               </div>

//               {/* Status Messages */}
//               {error && (
//                 <div className="text-red-500 font-medium text-sm">{error}</div>
//               )}
//               {success && (
//                 <div className="text-green-500 font-medium text-sm">
//                   Your message has been sent!
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 group disabled:opacity-60"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <svg
//                     className="animate-spin h-5 w-5 mr-2 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8v8z"
//                     ></path>
//                   </svg>
//                 ) : (
//                   <>
//                     Send Message
//                     <FiSend className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
//                   </>
//                 )}
//                 {loading && "Sending..."}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;