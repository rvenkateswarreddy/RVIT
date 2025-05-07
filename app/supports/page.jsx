"use client";

import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiCode,
  FiServer,
  FiLayers,
  FiFilm,
  FiFileText,
  FiBriefcase,
} from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { db } from "../../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// Icon mapping for consistent usage
const iconComponents = {
  code: <FiCode className="text-blue-500" />,
  server: <FiServer className="text-purple-500" />,
  layers: <FiLayers className="text-green-500" />,
  film: <FiFilm className="text-red-500" />,
  fileText: <FiFileText className="text-yellow-500" />,
  briefcase: <FiBriefcase className="text-indigo-500" />,
};

const SupportsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [supportDetails, setSupportDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const supportCategories = [
    {
      id: "programming",
      name: "Programming Languages",
      icon: "code",
    },
    {
      id: "frontend",
      name: "Frontend Development",
      icon: "layers",
    },
    {
      id: "backend",
      name: "Backend Development",
      icon: "server",
    },
    {
      id: "editing",
      name: "Editing Services",
      icon: "film",
    },
    {
      id: "documents",
      name: "Document Creation",
      icon: "fileText",
    },
    {
      id: "applications",
      name: "Application Support",
      icon: "briefcase",
    },
  ];

  useEffect(() => {
    const fetchSupportDetails = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "support"));
        const supports = [];
        querySnapshot.forEach((doc) => {
          supports.push({ id: doc.id, ...doc.data() });
        });
        setSupportDetails(supports);
      } catch (error) {
        console.error("Error fetching support details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupportDetails();
  }, []);

  const filteredSupports = supportDetails.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading support services...</div>
      </div>
    );
  }

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
              <span className="mr-1">{iconComponents[category.icon]}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Conditional Rendering */}
        {filteredSupports.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSupports.map((item) => (
              <div
                key={item.id}
                className="bg-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 transform transition-transform duration-300"
              >
                <div className="relative h-48 w-full">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      unoptimized // Required for external image URLs
                    />
                  )}
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
                    <div className="mr-3 text-xl">
                      {iconComponents[item.icon]}
                    </div>
                    <h3 className="text-xl font-bold text-gray-100">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-200 mb-4">{item.description}</p>
                  <Link
                    href={{
                      pathname: `/supports/${item.id}`,
                      query: {
                        item: JSON.stringify({
                          id: item.id,
                          title: item.title,
                          description: item.description,
                          image: item.image,
                          category: item.category,
                          icon: item.icon,
                          details: item.details,
                        }),
                      },
                    }}
                    className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors text-center w-full"
                  >
                    Get Support
                  </Link>
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
              {supportDetails.length === 0
                ? "No support services available yet"
                : "Try adjusting your search or filter criteria"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportsPage;
