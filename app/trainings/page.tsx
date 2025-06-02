"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { FiSearch } from "react-icons/fi";

// Category options (extract to a constants file for reusability in prod)
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

// TypeScript interface for safety and maintainability
interface Training {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
}

export default function TrainingsPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);

  // Fetch trainings from Firestore
  useEffect(() => {
    let isMounted = true;
    async function fetchTrainings() {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "trainings"));
        const data: Training[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Training[];
        if (isMounted) setTrainings(data);
      } catch (error) {
        // You might want to use a toast/snackbar for prod
        console.error("Error fetching trainings:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTrainings();
    return () => { isMounted = false; };
  }, []);

  // Reset page on filters
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Debounce search for better performance
  const debouncedSearchTerm = useDebounce(searchTerm, 250);

  // Filter and paginate
  const filteredTrainings = useMemo(() => {
    return trainings.filter((training) => {
      const matchesSearch = training.title
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || training.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [trainings, debouncedSearchTerm, selectedCategory]);

  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(filteredTrainings.length / ITEMS_PER_PAGE);
  const paginatedTrainings = filteredTrainings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  }, [currentPage, totalPages]);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  }, [currentPage]);

  const handleCardClick = useCallback((id: string) => {
    setNavigatingTo(id);
  }, []);

  // Accessibility: announce navigation
  useEffect(() => {
    if (navigatingTo) {
      const timer = setTimeout(() => setNavigatingTo(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [navigatingTo]);

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
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* SEO: Put <head> in head.tsx for App Router */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl drop-shadow">
            Our <span className="text-blue-400">Trainings</span>
          </h1>
          <p className="text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
            Explore our industry-leading courses designed to boost your skills
          </p>
        </header>

        {/* Search and Filters */}
        <section className="bg-gray-800 p-9 rounded-xl mb-10 shadow-2xl border border-blue-800/20" aria-label="Search and filter trainings">
          <form
            className="flex flex-col md:flex-row md:items-center gap-4 mb-3"
            onSubmit={(e) => e.preventDefault()}
            role="search"
          >
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
                aria-label="Search trainings"
              />
            </div>
            {/* Filter Section - Responsive: category and reset button */}
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-stretch md:items-center">
              <select
                className="bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                value={selectedCategory}
                aria-label="Select training category"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {/* On small screens, button is full-width and below. On md+, inline with select. */}
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-md transition-all duration-300 shadow-md hover:shadow-xl font-semibold w-full md:w-auto"
                aria-label="Reset filters"
              >
                Reset Filters
              </button>
            </div>
          </form>
        </section>

        {/* Training Cards */}
        {paginatedTrainings.length ? (
          <section className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3" aria-label="Trainings list">
            {paginatedTrainings.map((training) => (
              <div
                key={training.id}
                className={`relative bg-gradient-to-br from-gray-800 via-gray-900 to-blue-950 rounded-2xl overflow-hidden border border-blue-800/30 shadow-xl hover:shadow-blue-700/40 transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 group ${
                  navigatingTo === training.id ? "opacity-70" : ""
                }`}
                tabIndex={0}
                aria-label={training.title}
                role="listitem"
              >
                <Link
                  href={`/trainings/${training.id}`}
                  onClick={() => handleCardClick(training.id)}
                  className="block h-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label={`View details of ${training.title}`}
                >
                  <div className="relative h-60 group">
                    {training.imageUrl ? (
                      <Image
                        src={training.imageUrl}
                        alt={training.title}
                        fill
                        className="object-cover transition-all duration-300 group-hover:opacity-90 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={false}
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
          </section>
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
          <nav className="flex justify-between items-center mt-12" aria-label="Pagination">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-6 py-3 rounded-md transition-all ${
                currentPage === 1
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-xl"
              }`}
              aria-disabled={currentPage === 1}
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
              aria-disabled={currentPage === totalPages}
            >
              Next
            </button>
          </nav>
        )}
      </div>
    </main>
  );
}

// Debounce hook for production search UX
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}