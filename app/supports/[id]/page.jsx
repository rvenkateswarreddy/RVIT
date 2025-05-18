"use client";
import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiCode,
  FiDatabase,
  FiCpu,
  FiCloud,
  FiCheckCircle,
} from "react-icons/fi";

// Firebase imports
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../../FirebaseConfig";

// Dynamically import Image for optimized loading
const Image = dynamic(() => import("next/image"), { suspense: true });

export default function SupportDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [uploading, setUploading] = useState(false);

  // Get support item data from query parameters
  const getSupportItem = () => {
    try {
      const itemParam = searchParams.get("item");
      if (!itemParam) return null;
      return JSON.parse(itemParam);
    } catch (e) {
      return null;
    }
  };

  const item = getSupportItem();

  // Handle case where item data is missing
  if (!item) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
          <h1 className="text-2xl font-bold mb-4 text-white">
            Support Item Not Found
          </h1>
          <p className="text-gray-400 mb-6">
            The support item you're looking for couldn't be found. Please check
            the URL or return to the support page.
          </p>
          <button
            onClick={() => router.push("/supports")}
            className="inline-flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Supports
          </button>
        </div>
      </div>
    );
  }

  const featureIcons = useMemo(
    () => ({
      "Spring Boot and Microservices support": (
        <FiCloud className="text-blue-500 mr-2" />
      ),
      "JavaFX and Desktop development": (
        <FiCpu className="text-blue-500 mr-2" />
      ),
      "Database integration (JPA, Hibernate)": (
        <FiDatabase className="text-blue-500 mr-2" />
      ),
      "Performance optimization": (
        <FiCheckCircle className="text-blue-500 mr-2" />
      ),
      "Deployment & CI/CD support": <FiCode className="text-blue-500 mr-2" />,
    }),
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true); // Show uploading state
    const formData = new FormData(e.target);

    const requestData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"), // Add phone number to requestData
      message: formData.get("message"),
      location: formData.get("location"),
      item: item.title,
    };

    const resumeFile = formData.get("resume");

    try {
      // Upload resume to Firebase Storage
      const storageRef = ref(storage, `resumes/${resumeFile.name}`);
      await uploadBytes(storageRef, resumeFile);

      // Get the download URL
      const fileURL = await getDownloadURL(storageRef);

      // Add the file URL to the request data
      requestData.resume = fileURL;

      // Store request in Firestore
      await addDoc(collection(db, "supportRequests"), requestData);

      alert("Support request submitted successfully!");
      router.push("/supports");
    } catch (error) {
      console.error("Error submitting support request:", error);
      alert("Failed to submit the support request. Please try again.");
    } finally {
      setUploading(false); // Hide uploading state
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-9xl mx-auto px-4 py-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Supports
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Support Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image and Basic Info */}
            {item.image && (
              <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <React.Suspense fallback={<div className="h-64 bg-gray-700" />}>
                  <div className="h-64 relative">
                    <Image
                      src={item.image}
                      alt={item.title}
                      layout="fill"
                      className="object-cover"
                      priority
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                </React.Suspense>
              </div>
            )}

            <div className="bg-gray-800 rounded-xl shadow-lg p-8">
              <span className="inline-block bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-sm font-medium mb-3">
                {item.category}
              </span>
              <h1 className="text-3xl font-bold text-white mb-2">
                {item.title}
              </h1>
              <p className="text-gray-300">{item.description}</p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Request Support
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
                    placeholder="Your phone number"
                    pattern="[0-9]{10}" // Optional validation for 10-digit numbers
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
                    placeholder="Your location"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="resume"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Resume
                  </label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                    accept=".pdf,.doc,.docx"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    How can we help?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
                    placeholder="Describe your support needs..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg"
                  disabled={uploading}
                >
                  {uploading ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
