"use client";
import React, { useState } from "react";
import {
  FiSearch,
  FiCode,
  FiServer,
  FiLayers,
  FiFilm,
  FiMusic,
  FiFileText,
  FiBriefcase,
} from "react-icons/fi";
import Image from "next/image";

// Sample images (replace with your actual imports)
import pythonImg from "../../public/assets/project1.jpg";
import javaImg from "../../public/slider1.jpg";
import jsImg from "../../public/assets/project1.jpg";
import frontendImg from "../../public/slider1.jpg";
import backendImg from "../../public/assets/project1.jpg";
import fullstackImg from "../../public/slider1.jpg";
import videoEditImg from "../../public/assets/project1.jpg";
import musicEditImg from "../../public/assets/slider1.jpg";
import pptImg from "../../public/assets/project1.jpg";
import wordImg from "../../public/slider1.jpg";
import pdfImg from "../../public/assets/project1.jpg";
import jobAppImg from "../../public/assets/project1.jpg";
import courseAppImg from "../../public/slider1.jpg";

const SupportsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const supportCategories = [
    {
      id: "programming",
      name: "Programming Languages",
      icon: <FiCode className="text-blue-500" />,
    },
    {
      id: "frontend",
      name: "Frontend Development",
      icon: <FiLayers className="text-green-500" />,
    },
    {
      id: "backend",
      name: "Backend Development",
      icon: <FiServer className="text-purple-500" />,
    },
    {
      id: "editing",
      name: "Editing Services",
      icon: <FiFilm className="text-red-500" />,
    },
    {
      id: "documents",
      name: "Document Creation",
      icon: <FiFileText className="text-yellow-500" />,
    },
    {
      id: "applications",
      name: "Application Support",
      icon: <FiBriefcase className="text-indigo-500" />,
    },
  ];

  const supportItems = [
    {
      id: 1,
      title: "Python Support",
      description:
        "Expert assistance with Python programming, debugging, and optimization for all skill levels.",
      category: "programming",
      icon: <FiCode className="text-blue-500" />,
      image: pythonImg,
    },
    {
      id: 2,
      title: "Java Support",
      description:
        "Comprehensive Java development help including Spring framework and enterprise applications.",
      category: "programming",
      icon: <FiCode className="text-blue-500" />,
      image: javaImg,
    },
    {
      id: 3,
      title: "JavaScript Support",
      description:
        "From basic syntax to advanced frameworks like React and Node.js, we cover it all.",
      category: "programming",
      icon: <FiCode className="text-blue-500" />,
      image: jsImg,
    },
    {
      id: 4,
      title: "Frontend Development",
      description:
        "HTML, CSS, JavaScript and framework support for building responsive user interfaces.",
      category: "frontend",
      icon: <FiLayers className="text-green-500" />,
      image: frontendImg,
    },
    {
      id: 5,
      title: "Backend Development",
      description:
        "Server-side programming, APIs, databases, and architecture design assistance.",
      category: "backend",
      icon: <FiServer className="text-purple-500" />,
      image: backendImg,
    },
    {
      id: 6,
      title: "Full Stack Support",
      description:
        "End-to-end development support covering both frontend and backend technologies.",
      category: "backend",
      icon: <FiLayers className="text-indigo-500" />,
      image: fullstackImg,
    },
    {
      id: 7,
      title: "Video Editing",
      description:
        "Professional video editing support for all major software and formats.",
      category: "editing",
      icon: <FiFilm className="text-red-500" />,
      image: videoEditImg,
    },
    {
      id: 8,
      title: "Music Editing",
      description:
        "Audio editing, mixing, mastering, and production assistance.",
      category: "editing",
      icon: <FiMusic className="text-pink-500" />,
      image: musicEditImg,
    },
    {
      id: 9,
      title: "PPT Creation",
      description:
        "Help with designing professional PowerPoint presentations and slides.",
      category: "documents",
      icon: <FiFileText className="text-yellow-500" />,
      image: pptImg,
    },
    {
      id: 10,
      title: "Word Documents",
      description:
        "Assistance with formatting, templates, and advanced Word features.",
      category: "documents",
      icon: <FiFileText className="text-yellow-500" />,
      image: wordImg,
    },
    {
      id: 11,
      title: "PDF Services",
      description: "Help with creating, editing, and optimizing PDF documents.",
      category: "documents",
      icon: <FiFileText className="text-yellow-500" />,
      image: pdfImg,
    },
    {
      id: 12,
      title: "Job Applications",
      description:
        "Support with resume building, cover letters, and job application processes.",
      category: "applications",
      icon: <FiBriefcase className="text-indigo-500" />,
      image: jobAppImg,
    },
    {
      id: 13,
      title: "Course Applications",
      description:
        "Assistance with ICET and other educational course applications.",
      category: "applications",
      icon: <FiBriefcase className="text-indigo-500" />,
      image: courseAppImg,
    },
  ];

  const filteredSupports = supportItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-4">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Support Services
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Comprehensive assistance for all your technical, creative, and
            professional needs.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search support services..."
            className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
              activeCategory === "All"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="mr-1">All</span>
          </button>

          {supportCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Support Items Grid */}
        {filteredSupports.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSupports.map((item) => (
              <div
                key={item.id}
                className="bg-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 transform transition-transform duration-300"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-medium">
                      {
                        supportCategories.find(
                          (cat) => cat.id === item.category
                        )?.name
                      }
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="mr-3 text-xl">{item.icon}</div>
                    <h3 className="text-xl font-bold text-gray-100">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-200 mb-4">{item.description}</p>
                  <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300">
                    Get Support
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-medium text-gray-100 mb-2">
              No support services found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Need specialized support not listed here?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our team can provide customized solutions for your unique
            requirements.
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Contact Our Support Team
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportsPage;
