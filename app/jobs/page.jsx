"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  FiSearch,
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiClock,
  FiX,
} from "react-icons/fi";
import { FaReact, FaNodeJs, FaPython, FaJava } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiNextdotjs } from "react-icons/si";
import Link from "next/link";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig";

const categories = [
  "All",
  "Full Stack Development",
  "Frontend Development",
  "Backend Development",
  "Web Development",
];
const jobTypes = ["All", "Full-time", "Contract", "Part-time"];
const experienceLevels = ["All", "Junior", "Mid-level", "Senior"];

const PAGE_SIZE = 10;

const SkillIcon = ({ skill }) => {
  switch (skill) {
    case "React":
      return <FaReact className="text-blue-400" />;
    case "Node.js":
      return <FaNodeJs className="text-green-500" />;
    case "Python":
      return <FaPython className="text-yellow-400" />;
    case "JavaScript":
      return <SiJavascript className="text-yellow-300" />;
    case "TypeScript":
      return <SiTypescript className="text-blue-500" />;
    case "Next.js":
      return <SiNextdotjs className="text-gray-100" />;
    case "Java":
      return <FaJava className="text-red-500" />;
    default:
      return <FiBriefcase className="text-gray-400" />;
  }
};

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedJobType, setSelectedJobType] = useState("All");
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [jobsData, setJobsData] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const jobsQuery = query(
        collection(db, "rvit_jobs"),
        limit(PAGE_SIZE),
        ...(lastVisible ? [startAfter(lastVisible)] : [])
      );

      const querySnapshot = await getDocs(jobsQuery);
      const newJobs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setJobsData((prevJobs) => {
        const jobIds = new Set(prevJobs.map((job) => job.id));
        const uniqueJobs = newJobs.filter((job) => !jobIds.has(job.id));
        return [...prevJobs, ...uniqueJobs];
      });
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setHasMore(newJobs.length === PAGE_SIZE);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  }, [lastVisible, hasMore, loading]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "All" || job.category === selectedCategory;

    const matchesJobType =
      selectedJobType === "All" || job.type === selectedJobType;

    const matchesExperience =
      selectedExperience === "All" ||
      (selectedExperience === "Junior" &&
        job.experience.toLowerCase().includes("junior")) ||
      (selectedExperience === "Mid-level" &&
        job.experience.toLowerCase().includes("mid-level")) ||
      (selectedExperience === "Senior" &&
        job.experience.toLowerCase().includes("senior"));

    return (
      matchesSearch && matchesCategory && matchesJobType && matchesExperience
    );
  });

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !loading &&
      hasMore
    ) {
      fetchJobs();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  if (loading && jobsData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <p>Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Career Opportunities
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join our team of talented professionals building innovative
            solutions
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Search and Filters */}
        <div className="mb-12">
          <div className="relative max-w-3xl mx-auto mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-400"
              placeholder="Search jobs by title, company, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                <FiX className="h-5 w-5 text-gray-400 hover:text-gray-200" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="relative">
              <select
                className="pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 appearance-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-gray-800"
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                className="pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
              >
                {jobTypes.map((type) => (
                  <option key={type} value={type} className="bg-gray-800">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                className="pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
              >
                {experienceLevels.map((level) => (
                  <option key={level} value={level} className="bg-gray-800">
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSelectedJobType("All");
                setSelectedExperience("All");
              }}
              className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-700 text-gray-300"
            >
              Reset All
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            {filteredJobs.length} Job{filteredJobs.length !== 1 ? "s" : ""}{" "}
            Available
          </h2>
        </div>

        {/* Jobs List */}
        {filteredJobs.length > 0 ? (
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-blue-500/20 transition-shadow duration-300 border border-gray-700"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-lg bg-gray-700 flex items-center justify-center text-2xl">
                      <SkillIcon skill={job.skills[0]} />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {job.title}
                        </h3>
                        <p className="text-gray-300">
                          {job.company} • {job.location}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          job.type === "Full-time"
                            ? "bg-green-900 text-green-300"
                            : job.type === "Contract"
                            ? "bg-yellow-900 text-yellow-300"
                            : "bg-blue-900 text-blue-300"
                        }`}
                      >
                        {job.type}
                      </span>
                    </div>

                    <p className="text-gray-300 mb-4">{job.description}</p>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-300 mb-2">
                        Key Requirements:
                      </h4>
                      <ul className="space-y-2 text-gray-400">
                        {job.requirements.slice(0, 3).map((req, index) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-2"></span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-4">
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gray-700 text-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-1"
                        >
                          <SkillIcon skill={skill} />
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-700">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center text-gray-300">
                          <FiDollarSign className="mr-1" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <FiClock className="mr-1" />
                          <span>
                            {new Date(job.posted).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={{
                          pathname: `/jobs/${job.id}`,
                          query: { job: JSON.stringify(job) },
                        }}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors text-center"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-800 rounded-xl border border-gray-700">
            <div className="mx-auto h-24 w-24 rounded-full bg-gray-700 flex items-center justify-center mb-6">
              <FiBriefcase className="h-12 w-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">
              No jobs found matching your criteria
            </h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSelectedJobType("All");
                setSelectedExperience("All");
              }}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}
        {loading && hasMore && (
          <div className="text-center py-4">
            <p>Loading more jobs...</p>
          </div>
        )}
      </div>
    </div>
  );
}
