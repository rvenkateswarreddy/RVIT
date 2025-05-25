"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  Suspense,
} from "react";
import Head from "next/head";
import { FiSearch, FiLoader } from "react-icons/fi";
import { db } from "../../FirebaseConfig";
import { collection, query, orderBy, limit, startAfter, getDocs } from "firebase/firestore";
import useIntersectionObserver from "../Features/supports/hooks/useIntersectionObserver";
import useDebounce from "../Features/supports/hooks/useDebounce";
import CategoryButton from "../Features/supports/components/CategoryButton";
import SupportCard from "../Features/supports/components/SupportCard";
import SUPPORT_CATEGORIES from "../Features/supports/constants/supportCategories"
import { SupportItem } from "../Features/supports/types/index";

const ITEMS_PER_PAGE = 10;

const SupportsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [activeCategory, setActiveCategory] = useState("All");
  const [supportDetails, setSupportDetails] = useState<SupportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [supportLoading, setSupportLoading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string>("");

  // --- Reset page when filters change ---
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setSupportDetails([]);
  }, [debouncedSearch, activeCategory]);

  // --- Data Fetching (Server-side Pagination) ---
  useEffect(() => {
    let isMounted = true;
    const fetchSupportDetails = async () => {
      try {
        setLoading(true);
        setError("");
        let supports: SupportItem[] = [];
        let q = query(
          collection(db, "support"),
          orderBy("title"),
          limit(ITEMS_PER_PAGE)
        );
        // Note: Server-side filtering recommended for large data sets.
        // For full prod, add where clauses for category & searchTerm.
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          supports.push({ id: doc.id, ...(doc.data() as Omit<SupportItem, "id">) });
        });
        if (isMounted) {
          setSupportDetails(supports);
          setHasMore(supports.length === ITEMS_PER_PAGE);
        }
      } catch (error) {
        setError("Failed to load support services. Please try again later.");
        console.error("Error fetching support details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSupportDetails();
    return () => { isMounted = false; };
  }, [debouncedSearch, activeCategory]);

  // --- Infinite Scroll Handler ---
  const loadMoreData = useCallback(async () => {
    if (loadingMore || !hasMore || loading) return;
    setLoadingMore(true);
    try {
      let lastVisible = supportDetails[supportDetails.length - 1];
      if (!lastVisible) {
        setLoadingMore(false);
        return;
      }
      let q = query(
        collection(db, "support"),
        orderBy("title"),
        startAfter(lastVisible.title),
        limit(ITEMS_PER_PAGE)
      );
      // Same note on server-side filtering.
      const querySnapshot = await getDocs(q);
      let moreSupports: SupportItem[] = [];
      querySnapshot.forEach((doc) => {
        moreSupports.push({ id: doc.id, ...(doc.data() as Omit<SupportItem, "id">) });
      });
      setSupportDetails((prev) => [...prev, ...moreSupports]);
      setHasMore(moreSupports.length === ITEMS_PER_PAGE);
    } catch (error) {
      setError("Failed to load more support services.");
    } finally {
      setLoadingMore(false);
    }
  }, [supportDetails, loadingMore, hasMore, loading]);

  const { ref } = useIntersectionObserver({
    onIntersect: loadMoreData,
    enabled: hasMore && !loading && !loadingMore,
  });

  // --- Filtering and Pagination (Client-side for Search/Category) ---
  const filteredSupports = useMemo(() => {
    const matchesSearch = (item: SupportItem) =>
      item.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesCategory = (item: SupportItem) =>
      activeCategory === "All" || item.category === activeCategory;
    return supportDetails.filter((item) => matchesSearch(item) && matchesCategory(item));
  }, [supportDetails, debouncedSearch, activeCategory]);

  // --- Card Loading State and Routing ---
  const handleGetSupport = useCallback((item: SupportItem) => {
    setSupportLoading((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      window.location.href = `/supports/${item.id}`;
    }, 600);
  }, []);

  // --- Render ---
  if (loading && !supportDetails.length) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
          <p className="text-xl text-gray-100 font-medium">
            Loading RV Support Services...
          </p>
        </div>
        <p className="text-gray-400 mt-4 text-center">
          Bringing you the best support services tailored for your needs. Please wait a moment.
        </p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Support Services | RV</title>
        <meta
          name="description"
          content="Comprehensive assistance for all your technical, creative, and professional needs."
        />
        <meta property="og:title" content="Support Services | RV IT" />
        <meta property="og:description" content="Comprehensive assistance for all your technical, creative, and professional needs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rvit.co.in/supports" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12" role="banner">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-100 mb-4 drop-shadow">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                Support Services
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive assistance for all your technical, creative, and professional needs.
            </p>
          </header>

          {error && (
            <div
              className="rounded-lg bg-red-900/70 text-red-200 px-6 py-4 mb-8 text-center"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          )}

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12 relative" role="search">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-6 w-6 text-blue-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              placeholder="Search support services..."
              className="block w-full pl-12 pr-3 py-4 border border-gray-700 rounded-xl bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search support services"
            />
          </div>

          {/* Categories */}
          <nav className="flex flex-wrap justify-center gap-3 mb-12" aria-label="Support Categories">
            <CategoryButton
              active={activeCategory === "All"}
              onClick={() => setActiveCategory("All")}
              name="All"
              ariaLabel="Select All Categories"
            />
            {SUPPORT_CATEGORIES
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((category) => (
                <CategoryButton
                  key={category.id}
                  active={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                  icon={require("../Features/supports/constants/iconComponents").default[category.icon]}
                  name={category.name}
                  ariaLabel={`Select ${category.name} Category`}
                />
              ))}
          </nav>

          <Suspense fallback={<div className="text-white">Loading...</div>}>
            {filteredSupports.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
                {filteredSupports.map((item) => (
                  <SupportCard
                    key={item.id}
                    item={item}
                    loading={!!supportLoading[item.id]}
                    onGetSupport={handleGetSupport}
                  />
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-400 mt-8">
                No support services available for the selected category or search.
              </div>
            )}
          </Suspense>

          {/* Infinite Scroll Loader or Observer */}
          {hasMore && (
            <div ref={ref} className="h-16 flex items-center justify-center" aria-live="polite">
              <div className="flex items-center space-x-2 text-blue-400">
                <FiLoader className="animate-spin" />
                <span className="text-sm">Loading more services...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SupportsPage;