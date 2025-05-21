"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiChevronLeft } from "react-icons/fi";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../FirebaseConfig";
import { useAuth } from "../../context/AuthContext"; // <-- Import the Auth Context

export default function TrainingDetailPage() {
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, authLoading } = useAuth(); // <-- Get user and loading state

  // Safely parse the training data with defaults
  let training;
  try {
    training = JSON.parse(searchParams.get("training") || "{}");
  } catch {
    training = {};
  }

  // Default values for all required fields
  const safeTraining = {
    id: 0,
    title: "Training Program",
    description: "No description available",
    fullDescription: "Detailed description not provided",
    category: "General",
    trainingMode: "Online",
    instructor: "Certified Instructor",
    image: "/images/default-training.jpg",
    additionalImages: [],
    syllabus: ["Course content not specified"],
    technologies: ["Technology stack not listed"],
    brochureLink: null,
    ...training,
  };

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return; // prevent submission if not logged in
    setIsSubmitting(true);

    const requestData = {
      ...formData,
      trainingTitle: safeTraining.title,
      userId: user.uid,
    };

    try {
      await addDoc(collection(db, "trainingRequests"), requestData);
      alert("Your enrollment request has been submitted successfully!");
      setIsModalOpen(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        description: "",
      });
    } catch (error) {
      console.error("Error submitting enrollment request:", error);
      alert("Failed to submit your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Autofill name/email if logged in and modal opens
  React.useEffect(() => {
    if (isModalOpen && user && !authLoading) {
      setFormData((prev) => ({
        ...prev,
        name: user.displayName || "",
        email: user.email || "",
      }));
    }
  }, [isModalOpen, user, authLoading]);

  return (
    <motion.section
      className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <div className="mb-10">
          <Link
            href="/trainings"
            className="inline-flex items-center text-blue-400 hover:text-white hover:bg-blue-600/30 px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow hover:shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FiChevronLeft className="mr-2" /> Back to Trainings
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Image Section */}
          <div className="lg:sticky lg:top-20 lg:h-[82vh]">
            <div className="relative h-full w-full rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900 via-gray-800 to-gray-800 shadow-2xl border border-blue-900/30">
              <Image
                src={safeTraining.imageUrl || "/images/default-training.jpg"}
                alt={safeTraining.title}
                fill
                className="object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                priority
                quality={100}
                style={{ border: "1.5px solid #2563eb33" }}
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 mb-8 drop-shadow-md tracking-tight">
              {safeTraining.title}
            </h1>

            {/* Tags with shadow effect */}
            <div className="flex flex-wrap gap-4 mb-7 text-sm">
              <span className="inline-block bg-blue-700/30 text-blue-200 font-semibold px-5 py-2 rounded-lg border border-blue-400/30 shadow-lg shadow-blue-700/20 uppercase tracking-widest transition transform hover:scale-105 hover:shadow-blue-500/40">
                {safeTraining.category}
              </span>
              <span className="inline-block bg-pink-800/30 text-pink-200 font-semibold px-5 py-2 rounded-lg border border-pink-400/30 shadow-lg shadow-pink-700/20 uppercase tracking-widest transition transform hover:scale-105 hover:shadow-pink-400/40">
                TrainingMode : {safeTraining.trainingMode}
              </span>
              <span className="inline-block bg-green-700/30 text-green-200 font-semibold px-5 py-2 rounded-lg border border-green-400/30 shadow-lg shadow-green-700/20 uppercase tracking-widest transition transform hover:scale-105 hover:shadow-green-400/40">
                Instructor: {safeTraining.instructor}
              </span>
            </div>

            {/* Description Card */}
            <div className="mb-6">
              <div className="bg-gradient-to-r from-blue-900/70 via-gray-900/70 to-blue-800/70 rounded-xl px-6 py-6 shadow-2xl border border-blue-800/30">
                <h2 className="text-2xl font-bold text-white mb-3 drop-shadow">Training Overview</h2>
                <p className="text-gray-200 text-lg leading-relaxed transition-colors duration-200">
                  {safeTraining.fullDescription}
                </p>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-white mb-4 drop-shadow">What You'll Learn</h2>
              <ul className="space-y-3 text-blue-100 text-lg font-medium">
                {safeTraining.syllabus.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start shadow hover:shadow-blue-700/30 transition-all bg-blue-900/30 rounded-lg px-4 py-2 group"
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 group-hover:bg-blue-400 transition" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Enroll Button Centered */}
            <div className="flex flex-col items-center gap-4 mt-10">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center px-10 py-3 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Enroll Now
              </button>
              {safeTraining.brochureLink && (
                <a
                  href={safeTraining.brochureLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-8 py-3 bg-gradient-to-r from-gray-800 via-gray-700 to-blue-900 text-gray-100 rounded-xl font-bold shadow hover:shadow-lg hover:bg-blue-900/80 transition-all duration-200 text-lg"
                >
                  Download Brochure
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto min-h-screen">
    <motion.div
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 border border-blue-800/50 rounded-2xl shadow-2xl w-full max-w-lg p-10 relative max-h-[90vh] overflow-y-auto"
      initial={{ opacity: 0, scale: 0.97, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-blue-300 bg-gray-700/80 border border-gray-600 rounded-full p-2 shadow-lg transition-colors duration-200"
              aria-label="Close"
            >
              <svg width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <h2 className="text-2xl font-extrabold text-white mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500">
              Enrollment Form
            </h2>
            {/* Show red warning if not logged in */}
            {!authLoading && !user && (
              <div className="mb-6 w-full text-center">
                <span className="inline-block bg-red-100 text-red-800 border border-red-300 px-4 py-2 rounded-md font-medium text-sm">
                  Please log in to enroll for this training.
                </span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-300 font-semibold mb-2" htmlFor="name">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none transition placeholder-gray-400"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting || !user}
                />
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2" htmlFor="email">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none transition placeholder-gray-400"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting || !user}
                />
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2" htmlFor="phone">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none transition placeholder-gray-400"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting || !user}
                />
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2" htmlFor="location">
                  Location <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Location"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none transition placeholder-gray-400"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting || !user}
                />
              </div>
              <div>
                <label className="block text-gray-300 font-semibold mb-2" htmlFor="description">
                  How can we help? <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none transition placeholder-gray-400 resize-none"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting || !user}
                />
              </div>
              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-7 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 shadow font-semibold transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-60"
                  disabled={isSubmitting || !user}
                >
                  {isSubmitting
                    ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : user
                    ? "Submit"
                    : "Login to Submit"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.section>
  );
}