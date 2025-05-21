"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { FiSearch, FiFilter } from "react-icons/fi";

const queryClient = new QueryClient();

const categories = [
  "All",
  "Programming Language Support",
  "Web Development Support",
  "Mobile App Development Support",
  "Database Support",
  "DevOps & Infrastructure Support",
  "Security Support",
  "ERP & Enterprise Application Support",
  "CRM & SaaS Support",
  "Testing & QA Support",
  "AI/ML & Data Science Support",
  "API & Integration Support",
  "Networking & System Support",
  "Desktop & Software Support",
  "Content Management Systems (CMS)",
  "LMS (Learning Management Systems)",
  "Digital Marketing & SEO Support",
  "Data Analytics & Reporting Support",
  "Version Control & Code Management",
  "Client Training & Onboarding",
  "Cloud Computing Support",
  "Game Development Support",
  "UI/UX Design Support",
  "Blockchain Development Support",
  "E-commerce Support",
  "AR/VR Development Support",
  "IT Support & Help Desk",
  "Big Data Support",
  "IoT (Internet of Things) Support",
  "Automation & RPA Support",
  "Embedded Systems Support",
  "Robotics Support",
  "Bioinformatics Support",
  "Healthcare IT Support",
  "Legal Tech Support",
  "EdTech Support",
  "Energy Tech Support",
  "FinTech Support",
  "Supply Chain & Logistics Support",
  "Human Resource Tech Support",
  "Real Estate Tech Support",
  "Hospitality Tech Support",
  "Retail Tech Support",
  "Manufacturing Tech Support",
  "Non-Profit Tech Support",
  "Government Tech Support",
  "Media & Entertainment Support",
  "Travel & Tourism Tech Support",
];

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TrainingPage />
    </QueryClientProvider>
  );
}

function TrainingPage() {
  const [trainings, setTrainings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [navigatingTo, setNavigatingTo] = useState(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "trainings"));
        const trainingsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrainings(trainingsData);
      } catch (error) {
        console.error("Error fetching trainings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainings();
  }, []);

  const filteredTrainings = trainings.filter((training) => {
    const matchesSearch = training.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || training.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(filteredTrainings.length / ITEMS_PER_PAGE);

  const paginatedTrainings = filteredTrainings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleCardClick = (id) => {
    setNavigatingTo(id);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p>Loading trainings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl drop-shadow">
            Our <span className="text-blue-400">Trainings</span>
          </h1>
          <p className="text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
            Explore our industry-leading courses designed to boost your skills
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800 p-9  rounded-xl mb-10 shadow-2xl border border-blue-800/20">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
            {/* Search Bar with Icon */}
            <div className="relative w-full md:w-1/2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-400 pointer-events-none">
                <FiSearch size={22} />
              </span>
              <input
                type="text"
                className="w-full bg-gray-700 text-white p-3 pl-11 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 shadow-sm"
                placeholder="Search trainings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Filter Section with Icon */}
            <div className="flex gap-4 w-full md:w-auto items-center">
              
              <select
                className="bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-md transition-all duration-300 shadow-md hover:shadow-xl font-semibold"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Training Cards */}
        {paginatedTrainings.length ? (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedTrainings.map((training) => (
              <div
                key={training.id}
                className={`relative bg-gradient-to-br from-gray-800 via-gray-900 to-blue-950 rounded-2xl overflow-hidden border border-blue-800/30 shadow-xl hover:shadow-blue-700/40 transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 group ${
                  navigatingTo === training.id ? "opacity-70" : ""
                }`}
              >
                <Link
                  href={{
                    pathname: `/trainings/${training.id}`,
                    query: { training: JSON.stringify(training) },
                  }}
                  onClick={() => handleCardClick(training.id)}
                  className="block h-full"
                >
                  <div className="relative h-60 group">
                    {training.imageUrl ? (
                      <Image
                        src={training.imageUrl}
                        alt={training.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-all duration-300 group-hover:opacity-90 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full bg-gradient-to-r from-blue-700 to-blue-600 flex items-center justify-center text-white text-lg font-medium">
                        {training.category}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white font-semibold drop-shadow">
                        View Details →
                      </span>
                    </div>
                    {navigatingTo === training.id && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-200">
                        {training.title}
                      </h3>
                      <span className="inline-block bg-blue-700/30 text-blue-200 text-xs px-3 py-1 rounded-full font-semibold shadow-sm border border-blue-400/20">
                        {training.category.split(" ")[0]}
                      </span>
                    </div>
                    <p className="text-gray-400 line-clamp-4">
                      {training.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl mb-4">
              No trainings found
            </div>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-12">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-6 py-3 rounded-md transition-all ${
                currentPage === 1
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-xl"
              }`}
            >
              Previous
            </button>
            <span className="text-white font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-6 py-3 rounded-md transition-all ${
                currentPage === totalPages
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-xl"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}