'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { collection, addDoc } from 'firebase/firestore';

import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../../FirebaseConfig';

export default function ApplicationForm() {
  const formRef = useRef(null);
  const inView = useInView(formRef, { once: true, margin: '-100px' });

  // State initialization
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    message: '',
    resume: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  
  // Input change handler
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setError((prev) => ({ ...prev, [name]: undefined }));
  };

  // Basic validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.role) errors.role = 'Role is required';
    if (!formData.message) errors.message = 'Message is required';
    return errors;
  };

  // Submit handler with Firebase Storage and Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setError(errors);
      toast.error('Please fill all required fields.');
      return;
    }
    setLoading(true);
    try {
      let resumeUrl = '';
      if (formData.resume) {
        // Upload resume to Firebase Storage
        const file = formData.resume;
        const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
        const fileRef = storageRef(storage, `resumes/${fileName}`);
        await uploadBytes(fileRef, file);
        resumeUrl = await getDownloadURL(fileRef);
      }
      // Store application in Firestore with resume URL
      await addDoc(collection(db, 'applications'), {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        message: formData.message,
        resumeUrl,
        created: new Date().toISOString(),
      });
      setFormData({ name: '', email: '', role: '', message: '', resume: null });
      toast.success('Application submitted successfully!');
    } catch (err) {
      toast.error('Failed to submit. Please try again.');
    }
    setLoading(false);
  };

  return (
    <section
      className="py-20 px-4 bg-gradient-to-tr from-fuchsia-900/90 via-cyan-900/80 to-black/95"
      ref={formRef}
    >
      <Toaster position="top-right" />
      <div className="max-w-2xl mx-auto">
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Send us your application
        </motion.h2>
        <motion.form
          className="grid grid-cols-1 md:grid-cols-2 gap-7"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
        >
          <div className="md:col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 font-semibold text-cyan-300"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full px-5 py-3 rounded-lg bg-black/70 border border-cyan-800 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 font-medium"
              required
            />
            {error.name && <span className="text-red-500 text-sm mt-1 block">{error.name}</span>}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-cyan-300"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              className="w-full px-5 py-3 rounded-lg bg-black/70 border border-cyan-800 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 font-medium"
              required
            />
            {error.email && <span className="text-red-500 text-sm mt-1 block">{error.email}</span>}
          </div>
          <div>
            <label
              htmlFor="role"
              className="block mb-2 font-semibold text-cyan-300"
            >
              Role <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="Applying for which role?"
              className="w-full px-5 py-3 rounded-lg bg-black/70 border border-cyan-800 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 font-medium"
              required
            />
            {error.role && <span className="text-red-500 text-sm mt-1 block">{error.role}</span>}
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 font-semibold text-cyan-300"
            >
              Cover Letter / Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="5"
              placeholder="Write your cover letter or message here"
              className="w-full px-5 py-3 rounded-lg bg-black/70 border border-cyan-800 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 font-medium"
              required
            ></textarea>
            {error.message && <span className="text-red-500 text-sm mt-1 block">{error.message}</span>}
          </div>
          <div className="md:col-span-2">
            <label className="block mb-4 font-semibold text-cyan-300">
              Resume/CV <span className="text-gray-400 text-xs">(PDF, DOC, etc.)</span>
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleInputChange}
              className="hidden"
            />
            <label htmlFor="resume">
              <div className="px-5 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 border border-cyan-800 cursor-pointer hover:bg-cyan-900 transition-colors text-white text-center font-semibold flex items-center justify-center">
                {formData.resume ? formData.resume.name : "Upload Resume/CV"}
              </div>
            </label>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-full hover:from-fuchsia-500 hover:to-cyan-500 hover:scale-105 shadow-lg transition-all duration-300 text-lg"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}