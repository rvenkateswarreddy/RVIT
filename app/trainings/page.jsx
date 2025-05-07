"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfig";

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Design",
  "DevOps",
  "Data Science",
  "Mobile",
];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

export default function TrainingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch trainings from Firestore
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
    const matchesSearch =
      training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || training.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "All" || training.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading trainings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Our Training Programs
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-300">
            Enhance your skills with our industry-leading courses
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md mb-12">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-full bg-gray-700 text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search trainings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {/* Category Filter */}
            <div className="w-full sm:w-auto">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Category
              </label>
              <select
                id="category"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div className="w-full sm:w-auto">
              <label
                htmlFor="level"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Difficulty Level
              </label>
              <select
                id="level"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters Button */}
            <div className="w-full sm:w-auto flex items-end">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedLevel("All");
                }}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-lg text-gray-300">
            Showing{" "}
            <span className="font-bold text-white">
              {filteredTrainings.length}
            </span>{" "}
            training program{filteredTrainings.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Training Cards Grid */}
        {filteredTrainings.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredTrainings.map((training) => (
              <Link
                key={training.id}
                href={{
                  pathname: `/trainings/${training.id}`,
                  query: { training: JSON.stringify(training) },
                }}
              >
                <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col border border-gray-700 hover:border-blue-500">
                  {/* Course Image */}
                  <div className="h-48 relative">
                    {training.imageUrl ? (
                      <Image
                        src={training.imageUrl}
                        alt={training.title}
                        fill
                        className="object-cover"
                        unoptimized // Needed for external images
                      />
                    ) : (
                      <div className="h-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {training.category}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Course Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    {/* Category and Level Tags */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-300 bg-blue-900 bg-opacity-50 rounded-full">
                        {training.category}
                      </span>
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-purple-300 bg-purple-900 bg-opacity-50 rounded-full">
                        {training.level}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 mb-2">
                      {training.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 mb-4 flex-grow">
                      {training.description}
                    </p>

                    {/* Metadata */}
                    <div className="mt-auto">
                      <div className="flex items-center justify-between">
                        {/* Instructor */}
                        <div className="flex items-center">
                          <svg
                            className="h-5 w-5 text-gray-400 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                          </svg>
                          <span className="text-sm text-gray-300">
                            {training.instructor}
                          </span>
                        </div>

                        {/* Duration */}
                        <div className="flex items-center">
                          <svg
                            className="h-5 w-5 text-gray-400 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm text-gray-300">
                            {training.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-800 rounded-xl shadow border border-gray-700">
            <svg
              className="mx-auto h-12 w-12 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-white">
              No trainings found
            </h3>
            <p className="mt-1 text-gray-400">
              Try adjusting your search or filter criteria.
            </p>
            <div className="mt-6">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedLevel("All");
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset all filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
