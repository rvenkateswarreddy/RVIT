"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "react-query";

const queryClient = new QueryClient(); // Create a QueryClient instance

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div>Loading trainings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white">Our Trainings</h1>
          <p className="text-xl text-gray-300 mt-4">
            Explore our industry-leading courses
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800 p-6 rounded-xl mb-8">
          <div className="mb-6">
            <input
              type="text"
              className="w-full bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search trainings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex justify-center gap-4">
            <select
              className="bg-gray-700 text-white p-2 rounded-md"
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
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Training Cards */}
        {paginatedTrainings.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedTrainings.map((training) => (
              <div
                key={training.id}
                className="bg-gray-800 rounded-lg shadow-md overflow-hidden p-4"
              >
                <Link
                  href={{
                    pathname: `/trainings/${training.id}`,
                    query: { training: JSON.stringify(training) },
                  }}
                >
                  <div className="relative h-48">
                    {training.imageUrl ? (
                      <Image
                        src={training.imageUrl}
                        alt={training.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-md"
                      />
                    ) : (
                      <div className="h-full bg-blue-600 flex items-center justify-center text-white">
                        {training.category}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg text-white font-bold">
                      {training.title}
                    </h3>
                    <p className="text-gray-400 mt-2">{training.description}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-12">
            No trainings found. Try adjusting your search or filters.
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
              currentPage === 1 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            Previous
          </button>
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
              currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
