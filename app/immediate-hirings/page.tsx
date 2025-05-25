"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  FiSearch, FiBriefcase, FiMapPin, FiDollarSign, FiX, FiChevronLeft, FiChevronRight,
} from "react-icons/fi";
import { collection, getDocs, query, limit, startAfter, where } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { useRouter } from "next/navigation";

// Config
const PAGE_SIZE = 10;
const SCROLL_THRESHOLD = 300;

// --- SkillIcon helper ---
const SkillIcon = ({ skill }: { skill: string }) => (
  <FiBriefcase className="text-gray-400" />
);

// --- Job Card for Immediate Hiring ---
function ImmediateJobCard({ job, onClick }: { job: any, onClick: () => void }) {
  return (
    <div
      className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-lg border border-red-700 hover:shadow-red-500/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden min-h-[230px]"
      onClick={onClick}
      tabIndex={0}
      onKeyPress={e => { if (e.key === "Enter") onClick(); }}
      aria-label={`View ${job.title} at ${job.location}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/15 to-red-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      <div className="relative z-10 flex items-center gap-7 px-8 pt-8">
        <div className="w-16 h-16 rounded-xl bg-gray-800 flex items-center justify-center text-3xl shadow-lg border border-gray-700 group-hover:scale-105 transition-transform duration-300">
          <SkillIcon skill={job.skills?.[0]} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4">
            <span className="font-extrabold text-2xl text-white truncate">{job.title}</span>
            <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide shadow-sm bg-red-900/70 text-red-300 border border-red-800">
              Immediate
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide shadow-sm bg-emerald-900/70 text-emerald-300 border border-emerald-800">
              {job.type}
            </span>
          </div>
          <div className="text-gray-400 text-base flex items-center gap-4 mt-2 font-medium">
            <span className="flex items-center"><FiMapPin className="mr-1.5" />{job.location}</span>
          </div>
        </div>
      </div>
      <div className="relative z-10 px-8 py-4">
        <div className="text-gray-200 text-lg font-medium mb-4 line-clamp-2 leading-relaxed">{job.description}</div>
        {job.requirements && (
          <div className="mb-3">
            <h4 className="text-sm font-bold text-red-400 mb-1 tracking-wide">Key Requirements</h4>
            <ul className="flex flex-wrap gap-x-6 gap-y-1 text-gray-300 text-sm font-medium leading-relaxed">
              {Array.isArray(job.requirements)
                ? job.requirements.slice(0, 3).map((req: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    {req}
                  </li>
                ))
                : (job.requirements || "").split(",").slice(0, 3).map((req: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    {req}
                  </li>
                ))
              }
            </ul>
          </div>
        )}
        <div className="flex justify-between text-sm text-gray-400 mt-5 font-semibold">
          <span className="flex items-center gap-1.5">
            <FiDollarSign className="text-red-400" />{job.salary && `Salary: ${job.salary}`}
          </span>
        </div>
      </div>
    </div>
  );
}

// --- Modal (reuse JobModal logic but for Immediate Hiring) ---
function ImmediateJobModal({ job, onClose }: { job: any, onClose: () => void }) {
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
        className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 border border-red-900/50 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-fadeIn overflow-hidden"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-red-800/10 pointer-events-none"></div>
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-300 bg-gray-800/80 border border-gray-700 rounded-full p-2 shadow-lg z-10 transition-colors duration-200"
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
              <p className="text-gray-300 text-lg font-semibold">{job.location}</p>
            </div>
          </div>
          <div className="mb-6 flex gap-5 items-center">
            <span className="px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow bg-red-900/70 text-red-300 border border-red-800">
              Immediate
            </span>
            <span className="px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow bg-emerald-900/70 text-emerald-300 border border-emerald-800">
              {job.type}
            </span>
          </div>
          <div className="text-gray-200 text-lg mb-6 font-medium whitespace-pre-line leading-relaxed">
            {job.description}
          </div>
          {job.requirements && (
            <div className="mb-6">
              <h4 className="text-xl font-bold text-red-400 mb-3">Key Requirements</h4>
              <ul className="list-none flex flex-col gap-2">
                {Array.isArray(job.requirements)
                  ? job.requirements.map((req: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-2 w-2 h-2 rounded-full bg-red-400 flex-shrink-0"></span>
                      <span className="text-gray-300 text-base leading-relaxed">{req}</span>
                    </li>
                  ))
                  : (job.requirements || "").split(",").map((req: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-2 w-2 h-2 rounded-full bg-red-400 flex-shrink-0"></span>
                      <span className="text-gray-300 text-base leading-relaxed">{req}</span>
                    </li>
                  ))
                }
              </ul>
            </div>
          )}

          <button
            className="block w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-xl text-white font-bold rounded-lg py-3.5 text-lg tracking-wide transition-all duration-200 transform hover:scale-[1.01] mt-4"
            onClick={() =>
              router.push(`/jobs/${job.id}?job=${encodeURIComponent(JSON.stringify(job))}`)
            }
          >
            Apply Now
          </button>
        </div>
      </div>
      <style jsx global>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.5);
          border-radius: 3px;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default function ImmediateHiringPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [immediateJobs, setImmediateJobs] = useState<any[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSnapshots, setPageSnapshots] = useState<any[]>([]);

  // Fetch Immediate Hiring Jobs from rvit_jobs where immediate === 'Yes'
  const fetchImmediateJobs = useCallback(
    async (page = 1, direction = "next", isLazy = false) => {
      if (loading || fetchingMore) return;
      if (isLazy) setFetchingMore(true); else setLoading(true);
      try {
        let jobsQuery;
        if (page === 1) {
          jobsQuery = query(
            collection(db, "rvit_jobs"),
            where("immediate", "==", "Yes"),
            limit(PAGE_SIZE)
          );
        } else if (direction === "next" && lastVisible) {
          jobsQuery = query(
            collection(db, "rvit_jobs"),
            where("immediate", "==", "Yes"),
            startAfter(lastVisible),
            limit(PAGE_SIZE)
          );
        } else if (direction === "prev" && pageSnapshots[page - 2]) {
          jobsQuery = query(
            collection(db, "rvit_jobs"),
            where("immediate", "==", "Yes"),
            startAfter(pageSnapshots[page - 2]),
            limit(PAGE_SIZE)
          );
        } else {
          setLoading(false); setFetchingMore(false);
          return;
        }
        const querySnapshot = await getDocs(jobsQuery);
        const newJobs = querySnapshot.docs.map(doc => ({
          id: doc.id, ...(doc.data() as Record<string, any>),
        }));
        if (isLazy && page !== 1) {
          setImmediateJobs(prev => [...prev, ...newJobs]);
        } else {
          setImmediateJobs(newJobs);
        }
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        if (direction === "next" && !isLazy) {
          setPageSnapshots(prev =>
            prev.length < page ? [...prev, querySnapshot.docs[0]] : prev
          );
        }
        setHasMore(newJobs.length === PAGE_SIZE);
      } catch (error) {
        console.error("Error fetching immediate hiring jobs:", error);
      } finally {
        setLoading(false);
        setFetchingMore(false);
      }
    },
    [lastVisible, pageSnapshots, loading, fetchingMore]
  );

  // Initial fetch
  useEffect(() => {
    fetchImmediateJobs(1);
    setCurrentPage(1);
    setPageSnapshots([]);
    // eslint-disable-next-line
  }, []);

  // Infinite lazy loading on scroll
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
    const el = scrollContainerRef.current;
const isWindow = !el;

const scrollY = isWindow ? window.scrollY : el!.scrollTop;
const totalHeight = isWindow ? document.body.offsetHeight : el!.scrollHeight;
const viewport = isWindow ? window.innerHeight : el!.clientHeight;
      if (
        hasMore &&
        !loading &&
        !fetchingMore &&
        totalHeight - (scrollY + viewport) < SCROLL_THRESHOLD
      ) {
        fetchImmediateJobs(currentPage + 1, "next", true);
        setCurrentPage(prev => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchImmediateJobs, loading, fetchingMore, hasMore, currentPage]);

  const handlePageChange = async (direction: "next" | "prev") => {
    if (direction === "next" && hasMore) {
      setCurrentPage(prev => prev + 1);
      await fetchImmediateJobs(currentPage + 1, "next");
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      await fetchImmediateJobs(currentPage - 1, "prev");
    }
  };

  const filteredJobs = immediateJobs.filter(job =>
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (Array.isArray(job.requirements)
      ? job.requirements.join(" ").toLowerCase().includes(searchTerm.toLowerCase())
      : (job.requirements || "").toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const columnJobs: any[][] = [[], []];
  filteredJobs.forEach((job, i) => {
    columnJobs[i % 2].push(job);
  });

  return (
    <div ref={scrollContainerRef} className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-gray-100">
      {/* Animated Trending Banner */}
      <div className="w-full py-3 bg-gradient-to-r from-red-700 via-red-500 to-yellow-400 animate-[pulse_1.5s_infinite] shadow-xl flex items-center justify-center">
        <span className="text-white text-xl md:text-2xl font-extrabold tracking-widest animate-marquee">
          🚨 Urgent Immediate Joinings! 🚨
        </span>
        <style jsx>{`
          @keyframes pulse {
            0% { box-shadow: 0 0 25px #dc2626; }
            50% { box-shadow: 0 0 40px #f87171, 0 0 70px #facc15; }
            100% { box-shadow: 0 0 25px #dc2626; }
          }
          .animate-marquee {
            animation: marquee 10s linear infinite;
            white-space: nowrap;
            display: inline-block;
          }
          @keyframes marquee {
            0%   { transform: translateX(0%);}
            100% { transform: translateX(-50%);}
          }
        `}</style>
      </div>
      <div className="py-12 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10">
          <div className="relative flex-1 max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-10 py-3.5 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-100 placeholder-gray-400 text-base font-medium shadow-sm transition-all duration-200"
              placeholder="Search Immediate Hiring jobs..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              disabled={loading}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label="Clear search"
                disabled={loading}
              >
                <FiX className="h-5 w-5 text-gray-400 hover:text-gray-200 transition-colors" />
              </button>
            )}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">
            {filteredJobs.length} {filteredJobs.length === 1 ? "Immediate Opportunity" : "Immediate Opportunities"} Available
          </h2>
        </div>
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {columnJobs.map((jobs, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-6">
                {jobs.map(job => (
                  <ImmediateJobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
                ))}
              </div>
            ))}
          </div>
        ) : loading ? (
          <div className="text-center py-16">
            <span className="inline-flex items-center gap-3 text-gray-400">
              <span className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></span>
              Fetching jobs...
            </span>
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-800/50 rounded-xl border border-gray-700/50 shadow-lg mt-8 backdrop-blur-sm">
            <div className="mx-auto h-20 w-20 rounded-full bg-gray-700/50 flex items-center justify-center mb-5 border border-gray-600/50">
              <FiBriefcase className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No urgent immediate jobs found</h3>
            <p className="text-gray-400 mb-5 max-w-md mx-auto">Check back soon for new urgent opportunities.</p>
            <button
              onClick={() => setSearchTerm("")}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl text-white font-bold transition-all duration-200 inline-flex items-center gap-2"
              disabled={loading}
            >
              <FiX size={16} /> Reset filters
            </button>
          </div>
        )}
        {/* Pagination Controls (optional, for accessibility; infinite scroll is primary) */}
        <div className="mt-10 flex justify-center gap-8">
          <button
            className={`flex items-center px-5 py-2 rounded-lg font-bold border transition-colors duration-200 ${
              currentPage === 1 || loading
                ? "bg-gray-700 border-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gray-800 border-gray-700 hover:bg-red-800 hover:text-white text-gray-200"
            }`}
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1 || loading}
            aria-label="Previous page"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></span>
                Loading
              </span>
            ) : (
              <>
                <FiChevronLeft className="mr-1" /> Previous
              </>
            )}
          </button>
          <span className="text-lg font-bold text-gray-200">
            Page {currentPage}
          </span>
          <button
            className={`flex items-center px-5 py-2 rounded-lg font-bold border transition-colors duration-200 ${
              !hasMore || loading
                ? "bg-gray-700 border-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gray-800 border-gray-700 hover:bg-red-800 hover:text-white text-gray-200"
            }`}
            onClick={() => handlePageChange("next")}
            disabled={!hasMore || loading}
            aria-label="Next page"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></span>
                Loading
              </span>
            ) : (
              <>
                Next <FiChevronRight className="ml-1" />
              </>
            )}
          </button>
        </div>
        {/* Infinite scroll loading indicator */}
        {fetchingMore && (
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-3 text-gray-400">
              <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Loading more urgent opportunities...</span>
            </div>
          </div>
        )}
      </div>
      {selectedJob && (
        <ImmediateJobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
}