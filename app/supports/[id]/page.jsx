"use client";
import React from "react";
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
import Image from "next/image";

export default function SupportDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert("Support request submitted successfully!");
    router.push("/supports");
  };

  // Icon mapping for features
  const featureIcons = {
    "Spring Boot and Microservices support": (
      <FiCloud className="text-blue-500 mr-2" />
    ),
    "JavaFX and Desktop development": <FiCpu className="text-blue-500 mr-2" />,
    "Database integration (JPA, Hibernate)": (
      <FiDatabase className="text-blue-500 mr-2" />
    ),
    "Performance optimization": (
      <FiCheckCircle className="text-blue-500 mr-2" />
    ),
    "Deployment & CI/CD support": <FiCode className="text-blue-500 mr-2" />,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-9xl sm:px-6  py-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Supports
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
          {/* Left Column - Support Details */}
          <div className="lg:col-span-2 space-y-6 lg:px-13">
            {/* Image and basic info */}
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
              {item.image && (
                <div className="h-64 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              )}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-sm font-medium mb-3">
                      {item.category}
                    </span>
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {item.title}
                    </h1>
                  </div>
                </div>
                <p className="text-gray-300 mb-6">{item.description}</p>
              </div>
            </div>

            {/* Overview section */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <FiCode className="mr-3 text-blue-400" />
                Overview
              </h2>
              <p className="text-gray-300">{item.details.overview}</p>
            </div>

            {/* Features section */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <FiCheckCircle className="mr-3 text-blue-400" />
                Features
              </h2>
              <ul className="space-y-4">
                {item.details.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      {featureIcons[feature] || (
                        <FiCheckCircle className="text-blue-400 mr-3" />
                      )}
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prerequisites section */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <FiDatabase className="mr-3 text-blue-400" />
                Prerequisites
              </h2>
              <p className="text-gray-300">{item.details.prerequisites}</p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700 sticky top-8">
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
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
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
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    How can we help?
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                      <FiMessageSquare className="text-gray-400" />
                    </div>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                      placeholder="Describe your support needs..."
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg text-white font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                  >
                    Submit Request
                  </button>
                </div>

                <div className="text-center pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-400">
                    Need immediate help?{" "}
                    <a href="#" className="text-blue-400 hover:underline">
                      Contact our support team
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
