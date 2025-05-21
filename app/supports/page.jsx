"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import {
  FiSearch,
  FiCode,
  FiServer,
  FiLayers,
  FiFilm,
  FiFileText,
  FiBriefcase,
  FiArrowRight,
  FiLoader,
} from "react-icons/fi";
import { db } from "../../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import useIntersectionObserver from "../components/useIntersectionObserver";
import { useRouter } from "next/navigation";

// Icon mapping for consistent usage
const iconComponents = {
  code: <FiCode className="text-blue-400" />,
  server: <FiServer className="text-purple-400" />,
  layers: <FiLayers className="text-green-400" />,
  film: <FiFilm className="text-red-400" />,
  fileText: <FiFileText className="text-yellow-400" />,
  briefcase: <FiBriefcase className="text-indigo-400" />,
};

const SupportsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [supportDetails, setSupportDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [supportLoading, setSupportLoading] = useState({}); // per-card loading

  const router = useRouter();
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

  const handleGetSupport = (item) => {
    setSupportLoading((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      router.push(
        `/supports/details?item=${encodeURIComponent(JSON.stringify(item))}`
      );
    }, 600);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-100 mb-4 drop-shadow">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
              Support Services
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive assistance for all your technical, creative, and
            professional needs.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-6 w-6 text-blue-400" />
          </div>
          <input
            type="text"
            placeholder="Search support services..."
            className="block w-full pl-12 pr-3 py-4 border border-gray-700 rounded-xl bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory("All")}
            className={`
              px-5 py-2.5 rounded-full text-sm font-semibold 
              transition-all duration-200 flex items-center shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${
                activeCategory === "All"
                  ? "bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-lg shadow-blue-500/30 scale-105"
                  : "bg-gray-900 text-blue-300 border border-blue-700 hover:bg-blue-950 hover:text-white"
              }
            `}
          >
            <span>All</span>
          </button>
          {supportCategories
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  px-5 py-2.5 rounded-full text-sm font-semibold 
                  transition-all duration-200 flex items-center shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-lg shadow-blue-500/30 scale-105"
                      : "bg-gray-900 text-blue-300 border border-blue-700 hover:bg-blue-950 hover:text-white"
                  }
                `}
              >
                {iconComponents[category.icon] && (
                  <span className="mr-2">
                    {iconComponents[category.icon]}
                  </span>
                )}
                {category.name}
              </button>
            ))}
        </div>

        {/* Support Cards (inline, not separate component) */}
     <Suspense fallback={<div className="text-white">Loading...</div>}>
  {filteredSupports.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredSupports.map((item) => (
        <div
          key={item.id}
          className={`
            flex flex-col justify-between h-full
            bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950
            rounded-2xl border border-blue-900/30 shadow-xl
            transition-all duration-300 
            hover:shadow-2xl hover:shadow-blue-700/40 hover:-translate-y-2
            group
            overflow-hidden
          `}
        >
          {/* Card Image */}
          {item.image && (
            <div className="w-full h-40 relative overflow-hidden rounded-t-2xl mb-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          )}

          <div className="p-7 pb-4 flex-1 flex flex-col">
            {/* Card Header */}
            <div className="flex items-center mb-4">
              {item.icon && iconComponents[item.icon] && (
                <span className="flex-shrink-0 text-2xl mr-3">
                  {iconComponents[item.icon]}
                </span>
              )}
              <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors flex-1">
                {item.title}
              </h3>
            </div>
            {/* Category Badge */}
           
            {/* Description */}
            <p className="text-gray-300 text-base mb-6 transition-colors duration-200 group-hover:text-blue-100 line-clamp-4">
              {item.description}
            </p>
          </div>
          {/* Button Area */}
          <div className="w-full px-7 pb-6">
            <button
              onClick={() => handleGetSupport(item)}
              disabled={!!supportLoading[item.id]}
              className={`w-full flex items-center justify-center py-3 px-6
                bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700
                text-white rounded-xl font-bold shadow-lg
                hover:from-blue-800 hover:to-indigo-800
                hover:shadow-blue-700/40
                transition-all duration-300
                group-hover:scale-105
                ${
                  supportLoading[item.id]
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:scale-105"
                }
              `}
            >
              {supportLoading[item.id] ? (
                <>
                  <FiLoader className="animate-spin mr-2 text-xl" />
                  Loading...
                </>
              ) : (
                <>
                  Get Support <FiArrowRight className="ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
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