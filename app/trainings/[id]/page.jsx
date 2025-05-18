"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiChevronLeft,
  FiClock,
  FiUsers,
  FiStar,
  FiAward,
} from "react-icons/fi";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../FirebaseConfig";

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

  // Safely parse the training data with defaults
  let training;
  try {
    training = JSON.parse(searchParams.get("training") || "{}");
  } catch (e) {
    training = {};
  }

  // Default values for all required fields
  const safeTraining = {
    id: 0,
    title: "Training Program",
    description: "No description available",
    fullDescription: "Detailed description not provided",
    category: "General",
    level: "Beginner",
    duration: "Not specified",
    students: 0,
    rating: 0,
    instructor: "Certified Instructor",
    instructorBio: "Professional in their field",
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
    setIsSubmitting(true);

    const requestData = {
      ...formData,
      trainingTitle: safeTraining.title,
    };

    try {
      // Store the training request in Firestore
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

  return (
    <motion.section
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/trainings"
            className="inline-flex items-center text-blue-400 hover:text-blue-300"
          >
            <FiChevronLeft className="mr-1" /> Back to Trainings
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="lg:sticky lg:top-20 lg:h-[80vh]">
            <div className="relative h-full w-full rounded-xl overflow-hidden bg-gray-700">
              <Image
                src={safeTraining.imageUrl || "/images/default-training.jpg"}
                alt={safeTraining.title}
                fill
                className="object-cover rounded-lg"
                priority
                quality={100}
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-100 mb-6">
              {safeTraining.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-300 mb-8">
              <div className="flex items-center">
                <FiClock className="mr-2 text-blue-400" />
                <div>
                  <span className="block text-gray-400">Duration</span>
                  {safeTraining.duration}
                </div>
              </div>
              <div className="flex items-center">
                <FiUsers className="mr-2 text-blue-400" />
                <div>
                  <span className="block text-gray-400">Students</span>
                  {safeTraining.students.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center">
                <FiStar className="mr-2 text-blue-400" />
                <div>
                  <span className="block text-gray-400">Rating</span>
                  {safeTraining.rating}/5
                </div>
              </div>
              <div className="flex items-center">
                <FiAward className="mr-2 text-blue-400" />
                <div>
                  <span className="block text-gray-400">Category</span>
                  {safeTraining.category}
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">
                Training Overview
              </h2>
              <p className="text-gray-300 mb-6">
                {safeTraining.fullDescription}
              </p>
            </div>

            {/* What You'll Learn */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">
                What You'll Learn
              </h2>
              <ul className="space-y-3 text-gray-300">
                {safeTraining.syllabus.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Enroll Now
              </button>
              {safeTraining.brochureLink && (
                <a
                  href={safeTraining.brochureLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-6 py-3 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors font-medium"
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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold text-gray-100 mb-4">
              Enrollment Form
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="description"
                placeholder="How can we help?"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.section>
  );
}
