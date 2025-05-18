"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import dynamic from "next/dynamic";
import {
  FiSearch,
  FiCode,
  FiServer,
  FiLayers,
  FiFilm,
  FiFileText,
  FiBriefcase,
} from "react-icons/fi";
import { db } from "../../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import useIntersectionObserver from "../components/useIntersectionObserver";

// Dynamically import the SupportCard component for lazy loading
const SupportCard = dynamic(() => import("../components/SupportCard"), {
  suspense: true,
});

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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const itemsPerPage = 10; // Number of items per page

  const supportCategories = useMemo(
    () => [
      { id: "programming", name: "Programming Languages", icon: "code" },
      { id: "web", name: "Web Development", icon: "layers" },
      { id: "mobile", name: "Mobile App Development", icon: "briefcase" },
      { id: "database", name: "Database Support", icon: "server" },
      { id: "devops", name: "DevOps & Infrastructure", icon: "server" },
      { id: "security", name: "Security Support", icon: "briefcase" },
      { id: "erp", name: "ERP & Enterprise Applications", icon: "fileText" },
      { id: "crm", name: "CRM & SaaS Support", icon: "fileText" },
      { id: "testing", name: "Testing & QA Support", icon: "layers" },
      { id: "aiml", name: "AI/ML & Data Science Support", icon: "code" },
      { id: "api", name: "API & Integration Support", icon: "server" },
      { id: "networking", name: "Networking & System Support", icon: "server" },
      { id: "desktop", name: "Desktop & Software Support", icon: "briefcase" },
      { id: "cms", name: "Content Management Systems", icon: "fileText" },
      { id: "lms", name: "Learning Management Systems", icon: "fileText" },
      {
        id: "digital-marketing",
        name: "Digital Marketing & SEO",
        icon: "briefcase",
      },
      {
        id: "data-analytics",
        name: "Data Analytics & Reporting",
        icon: "layers",
      },
      {
        id: "version-control",
        name: "Version Control & Code Management",
        icon: "code",
      },
      {
        id: "client-training",
        name: "Client Training & Onboarding",
        icon: "briefcase",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchSupportDetails = async () => {
      try {
        setLoading(true);
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

  const loadMoreData = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    if (endIndex >= supportDetails.length) {
      setHasMore(false);
    }

    setPage((prevPage) => prevPage + 1);
  };

  const filteredSupports = useMemo(() => {
    const matchesSearch = (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = (item) =>
      activeCategory === "All" || item.category === activeCategory;

    return supportDetails
      .filter((item) => matchesSearch(item) && matchesCategory(item))
      .slice(0, page * itemsPerPage);
  }, [supportDetails, searchTerm, activeCategory, page]);

  const { ref } = useIntersectionObserver({
    onIntersect: loadMoreData,
    enabled: hasMore,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <p className="text-xl text-gray-100 font-medium">
            Loading RV Support Services...
          </p>
        </div>
        <p className="text-gray-400 mt-4 text-center">
          Bringing you the best support services tailored for your needs. Please
          wait a moment.
        </p>
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

        {/* Support Cards */}
        <Suspense fallback={<div>Loading...</div>}>
          {filteredSupports.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSupports.map((item) => (
                <SupportCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 mt-8">
              No support services available for the selected category.
            </div>
          )}
        </Suspense>

        {/* Observer for Infinite Scrolling */}
        {hasMore && <div ref={ref} className="h-16"></div>}
      </div>
    </div>
  );
};

export default SupportsPage;
