"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  FiSearch, FiBriefcase, FiMapPin, FiDollarSign, FiClock, FiX, FiChevronLeft, FiChevronRight,
} from "react-icons/fi";
import { FaReact, FaNodeJs, FaPython, FaJava } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiNextdotjs } from "react-icons/si";
import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";

// --- Constants ---
const categories = [
  "All", "Full Stack Development", "Frontend Development", "Backend Development", "Web Development",
  "Mobile App Development", "Software Development", "DevOps & Infrastructure", "Cloud Computing & Cloud Engineering",
  "Data Science & Analytics", "Machine Learning & Artificial Intelligence", "Cybersecurity",
  "Database Administration & Development", "Enterprise Resource Planning (ERP)", "Customer Relationship Management (CRM)",
  "Quality Assurance & Testing", "Project Management", "Product Management", "Business Analysis", "UI/UX Design",
  "Graphic Design & Multimedia", "Content Writing & Editing", "Digital Marketing & SEO", "Sales & Business Development",
  "Customer Support & Help Desk", "Human Resources & Recruitment", "Finance & Accounting", "Legal & Compliance",
  "Supply Chain & Logistics", "IT Support & Networking", "System Administration", "Embedded Systems & IoT",
  "Robotics & Automation", "E-commerce & Retail", "Game Development", "Blockchain Development",
  "Augmented Reality (AR) & Virtual Reality (VR)", "Media & Entertainment", "Healthcare IT", "Education Technology (EdTech)",
  "Energy & Utilities", "Government & Public Sector", "Manufacturing & Engineering", "Real Estate & Construction",
  "Travel & Hospitality", "Non-Profit & NGOs", "Freelancing & Remote Work", "Internships & Entry-Level Jobs",
];
const jobTypes = ["All", "Full-time", "Contract", "Part-time"];
const experienceLevels = ["All", "Junior", "Mid-level", "Senior"];
const PAGE_SIZE = 5;

// --- Utility: Debounce Hook ---
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

// --- Skill Icon ---
const SkillIcon = ({ skill }: { skill: string }) => {
  switch (skill) {
    case "React": return <FaReact className="text-blue-400" />;
    case "Node.js": return <FaNodeJs className="text-green-600" />;
    case "Python": return <FaPython className="text-yellow-400" />;
    case "JavaScript": return <SiJavascript className="text-yellow-300" />;
    case "TypeScript": return <SiTypescript className="text-blue-500" />;
    case "Next.js": return <SiNextdotjs className="text-gray-100" />;
    case "Java": return <FaJava className="text-red-500" />;
    default: return <FiBriefcase className="text-gray-400" />;
  }
};

// --- Job Card ---
function JobCard({ job, onClick }: { job: any, onClick: () => void }) {
  return (
    <div
      className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-lg border border-gray-700 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden"
      onClick={onClick}
      tabIndex={0}
      onKeyPress={e => { if (e.key === "Enter") onClick(); }}
      aria-label={`View ${job.title} at ${job.company}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      <div className="relative z-10 flex items-center gap-7 px-8 pt-8">
        <div className="w-16 h-16 rounded-xl bg-gray-800 flex items-center justify-center text-3xl shadow-lg border border-gray-700 group-hover:scale-105 transition-transform duration-300">
          <SkillIcon skill={job.skills?.[0]} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4">
            <span className="font-extrabold text-2xl text-white truncate">{job.title}</span>
            <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide shadow-sm
              ${job.type === "Full-time"
                ? "bg-emerald-900/70 text-emerald-300 border border-emerald-800"
                : job.type === "Contract"
                  ? "bg-amber-900/70 text-amber-300 border border-amber-800"
                  : "bg-blue-900/70 text-blue-300 border border-blue-800"
              }`}>
              {job.type}
            </span>
          </div>
          <div className="text-gray-400 text-base flex items-center gap-4 mt-2 font-medium">
            <span className="flex items-center"><FiMapPin className="mr-1.5" />{job.location}</span>
            <span className="flex items-center"><FiBriefcase className="mr-1.5" />{job.company}</span>
          </div>
        </div>
      </div>
      <div className="relative z-10 px-8 py-4">
        <div className="text-gray-200 text-lg font-medium mb-4 line-clamp-2 leading-relaxed">{job.description}</div>
        {job.requirements?.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-bold text-blue-400 mb-1 tracking-wide">Key Requirements</h4>
            <ul className="flex flex-wrap gap-x-6 gap-y-1 text-gray-300 text-sm font-medium leading-relaxed">
              {job.requirements.slice(0, 3).map((req: string, idx: number) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex justify-between text-sm text-gray-400 mt-5 font-semibold">
          <span className="flex items-center gap-1.5"><FiDollarSign className="text-blue-400" />Salary: {job.salary}</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">{job.experience}</span></span>
        </div>
      </div>
    </div>
  );
}

// --- Job Modal ---
function JobModal({ job, onClose }: { job: any, onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useEffect(() => {
    const focusable = modalRef.current?.querySelectorAll("button, a");
    (focusable?.[0] as HTMLElement)?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 border border-blue-900/50 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-fadeIn overflow-hidden"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 pointer-events-none"></div>
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-blue-300 bg-gray-800/80 border border-gray-700 rounded-full p-2 shadow-lg z-10 transition-colors duration-200"
          onClick={onClose}
          aria-label="Close"
        >
          <FiX size={24} />
        </button>
        <div className="overflow-y-auto px-8 pb-8 pt-6 flex-1 custom-scrollbar">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-xl bg-gray-800 flex items-center justify-center text-4xl shadow-lg border border-gray-700">
              <SkillIcon skill={job.skills?.[0]} />
            </div>
            <div>
              <h2 id="modal-title" className="text-3xl font-extrabold text-white">{job.title}</h2>
              <p className="text-gray-300 text-lg font-semibold">{job.company} • {job.location}</p>
            </div>
          </div>
          <div className="mb-6 flex gap-5 items-center">
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow
              ${job.type === "Full-time"
                ? "bg-emerald-900/70 text-emerald-300 border border-emerald-800"
                : job.type === "Contract"
                  ? "bg-amber-900/70 text-amber-300 border border-amber-800"
                  : "bg-blue-900/70 text-blue-300 border border-blue-800"
              }`}>
              {job.type}
            </span>
            <span className="text-base text-gray-400 font-semibold">{job.experience}</span>
          </div>
          <div className="text-gray-200 text-lg mb-6 font-medium whitespace-pre-line leading-relaxed">
            {job.description}
          </div>
          {job.requirements?.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xl font-bold text-blue-400 mb-3">Key Requirements</h4>
              <ul className="list-none flex flex-col gap-2">
                {job.requirements.map((req: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></span>
                    <span className="text-gray-300 text-base leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {job.responsibilities?.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xl font-bold text-purple-400 mb-3">Responsibilities</h4>
              <ul className="list-none flex flex-col gap-2">
                {job.responsibilities.map((resp: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-purple-400 flex-shrink-0"></span>
                    <span className="text-gray-300 text-base leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {job.skills && job.skills.length > 0 && (
            <div className="mb-8">
              <h4 className="text-xl font-bold text-green-400 mb-3">Required Skills</h4>
              <div className="flex flex-wrap gap-2 items-center overflow-x-auto pb-1">
                {job.skills.map((skill: string, idx: number) => (
                  <span
                    key={idx}
                    className="flex items-center gap-1.5 bg-gradient-to-tr from-gray-700 to-gray-800 text-green-200 px-4 py-1.5 rounded-2xl text-base font-semibold shadow border border-green-500/30 hover:bg-green-700/50 transition whitespace-nowrap"
                  >
                    <SkillIcon skill={skill} />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center gap-8 text-lg text-gray-400 border-t border-gray-700/50 pt-6 pb-8 font-bold">
            <span className="flex items-center gap-2"><FiDollarSign className="text-blue-400" />Salary: {job.salary}</span>
            <span className="flex items-center gap-2"><FiClock className="text-purple-400" />Posted on: {job.posted ? new Date(job.posted).toLocaleDateString() : "N/A"}</span>
          </div>
          <button
            className="block w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-xl text-white font-bold rounded-lg py-3.5 text-lg tracking-wide transition-all duration-200 transform hover:scale-[1.01] mt-4"
            onClick={() =>
              router.push(`/jobs/${job.id}`)
            }
          >
            Apply Now
          </button>
        </div>
      </div>
      <style jsx global>{`
        .animate-fadeIn { animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(100, 116, 139, 0.5); border-radius: 3px; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .animate-gradient-move { background-size: 300% 300%; animation: gradient-move 6s ease infinite; }
        @keyframes gradient-move { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
      `}</style>
    </div>
  );
}

// --- Main Page ---
export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedJobType, setSelectedJobType] = useState("All");
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [jobsData, setJobsData] = useState<any[]>([]);
  const [pageSnapshots, setPageSnapshots] = useState<any[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search for performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // --- Fetch jobs from Firestore with server-side paging ---
  async function fetchJobs(page = 1, direction: "next" | "prev" = "next") {
    setLoading(true);
    try {
      let jobsQuery;
      if (page === 1) {
        jobsQuery = query(
          collection(db, "rvit_jobs"),
          orderBy("posted", "desc"),
          limit(PAGE_SIZE)
        );
      } else if (direction === "next" && lastVisible) {
        jobsQuery = query(
          collection(db, "rvit_jobs"),
          orderBy("posted", "desc"),
          startAfter(lastVisible),
          limit(PAGE_SIZE)
        );
      } else if (direction === "prev" && pageSnapshots[page - 2]) {
        jobsQuery = query(
          collection(db, "rvit_jobs"),
          orderBy("posted", "desc"),
          startAfter(pageSnapshots[page - 2]),
          limit(PAGE_SIZE)
        );
      } else {
        setLoading(false);
        return;
      }
      const querySnapshot = await getDocs(jobsQuery);
      const newJobs = querySnapshot.docs.map(doc => ({
        id: doc.id, ...(doc.data() as Record<string, any>),
      }));
      setJobsData(newJobs);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      if (direction === "next" && querySnapshot.docs.length > 0) {
        setPageSnapshots(prev =>
          prev.length < page ? [...prev, querySnapshot.docs[0]] : prev
        );
      }
      setHasMore(newJobs.length === PAGE_SIZE);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  }

  // --- Initial Fetch ---
  useEffect(() => {
    fetchJobs(1, "next");
    setCurrentPage(1);
    setPageSnapshots([]);
    // eslint-disable-next-line
  }, []);

  // --- Pagination ---
  const handlePageChange = async (direction: "next" | "prev") => {
    if (direction === "next" && hasMore) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      await fetchJobs(newPage, "next");
    } else if (direction === "prev" && currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      await fetchJobs(newPage, "prev");
    }
  };

  // --- Filtering ---
  const filteredJobs = useMemo(() => {
    return jobsData.filter(job => {
      const matchesSearch =
        job.title?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        job.company?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        job.description?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        job.skills?.some((skill: string) =>
          skill.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
      const matchesCategory = selectedCategory === "All" || job.category === selectedCategory;
      const matchesJobType = selectedJobType === "All" || job.type === selectedJobType;
      const matchesExperience =
        selectedExperience === "All" ||
        (selectedExperience === "Junior" && (job.experience || "").toLowerCase().includes("junior")) ||
        (selectedExperience === "Mid-level" && (job.experience || "").toLowerCase().includes("mid-level")) ||
        (selectedExperience === "Senior" && (job.experience || "").toLowerCase().includes("senior"));
      return matchesSearch && matchesCategory && matchesJobType && matchesExperience;
    });
  }, [jobsData, debouncedSearchTerm, selectedCategory, selectedJobType, selectedExperience]);

  // --- Two-column layout logic ---
  const columnJobs = useMemo(() => {
    const cols: any[][] = [[], []];
    filteredJobs.forEach((job, i) => {
      cols[i % 2].push(job);
    });
    return cols;
  }, [filteredJobs]);

  // --- Reset filter and search ---
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedJobType("All");
    setSelectedExperience("All");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-gray-100">
      <div className="py-20 px-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YTIgMiAwIDEgMSAwLTQgMiAyIDAgMCAxIDAgNHptMC0xMmEyIDIgMCAxIDEgMC00IDIgMiAwIDAgMSAwIDR6bTAgMTJhMiAyIDAgMSAxIDAtNCAyIDIgMCAwIDEgMCA0em0xMiAxMmEyIDIgMCAxIDEgMC00IDIgMiAwIDAgMSAwIDR6bTAgMTJhMiAyIDAgMSAxIDAtNCAyIDIgMCAwIDEgMCA0em0xMi0yNGEyIDIgMCAxIDEgMC00IDIgMiAwIDAgMSAwIDR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
         
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 animate-gradient-move">
            Career Opportunities
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed">
            Discover your next career move with our curated selection of tech opportunities
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10">
          <div className="relative flex-1 max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-10 py-3.5 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-400 text-base font-medium shadow-sm transition-all duration-200"
              placeholder="Search jobs by title, company, or skills..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label="Clear search"
              >
                <FiX className="h-5 w-5 text-gray-400 hover:text-gray-200 transition-colors" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-3 justify-center md:justify-end">
            <select
              className="pl-3 pr-8 py-2.5 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 text-gray-100 text-sm font-medium shadow-sm transition-all duration-200"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              aria-label="Category"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-gray-800">{category}</option>
              ))}
            </select>
            <select
              className="pl-3 pr-8 py-2.5 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 text-gray-100 text-sm font-medium shadow-sm transition-all duration-200"
              value={selectedJobType}
              onChange={e => setSelectedJobType(e.target.value)}
              aria-label="Job Type"
            >
              {jobTypes.map(type => (
                <option key={type} value={type} className="bg-gray-800">{type}</option>
              ))}
            </select>
            <select
              className="pl-3 pr-8 py-2.5 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 text-gray-100 text-sm font-medium shadow-sm transition-all duration-200"
              value={selectedExperience}
              onChange={e => setSelectedExperience(e.target.value)}
              aria-label="Experience Level"
            >
              {experienceLevels.map(level => (
                <option key={level} value={level} className="bg-gray-800">{level}</option>
              ))}
            </select>
            <button
              onClick={resetFilters}
              className="px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 hover:bg-gray-700/80 text-gray-300 font-medium text-sm shadow-sm transition-all duration-200 flex items-center gap-1.5"
            >
              <FiX size={16} /> Reset
            </button>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">
            {filteredJobs.length} {filteredJobs.length === 1 ? "Opportunity" : "Opportunities"} Available | page {currentPage}
          </h2>
        </div>
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {columnJobs.map((jobs, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-6">
                {jobs.map(job => (
                  <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-800/50 rounded-xl border border-gray-700/50 shadow-lg mt-8 backdrop-blur-sm">
            <div className="mx-auto h-20 w-20 rounded-full bg-gray-700/50 flex items-center justify-center mb-5 border border-gray-600/50">
              <FiBriefcase className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No matching opportunities found</h3>
            <p className="text-gray-400 mb-5 max-w-md mx-auto">Try adjusting your search criteria or check back later for new postings.</p>
            <button onClick={resetFilters} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-bold transition-all duration-200 inline-flex items-center gap-2">
              <FiX size={16} /> Reset filters
            </button>
          </div>
        )}
        <div className="mt-10 flex justify-center gap-8">
          <button
            className={`flex items-center px-5 py-2 rounded-lg font-bold border transition-colors duration-200 ${
              currentPage === 1
                ? "bg-gray-700 border-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gray-800 border-gray-700 hover:bg-blue-800 hover:text-white text-gray-200"
            }`}
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <FiChevronLeft className="mr-1" /> Previous
          </button>
          <span className="text-lg font-bold text-gray-200">
            Page {currentPage}
          </span>
          <button
            className={`flex items-center px-5 py-2 rounded-lg font-bold border transition-colors duration-200 ${
              !hasMore
                ? "bg-gray-700 border-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gray-800 border-gray-700 hover:bg-blue-800 hover:text-white text-gray-200"
            }`}
            onClick={() => handlePageChange("next")}
            disabled={!hasMore}
            aria-label="Next page"
          >
            Next <FiChevronRight className="ml-1" />
          </button>
        </div>
        {loading && (
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-3 text-gray-400">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Loading opportunities...</span>
            </div>
          </div>
        )}
      </div>
      {selectedJob && (
        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
}