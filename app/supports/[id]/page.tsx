"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter, useParams } from "next/navigation";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiZap,
  FiLoader,
} from "react-icons/fi";
import { BsFire } from "react-icons/bs";
import { MdOutlineTrendingUp } from "react-icons/md";
import { collection, doc, getDoc, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../../FirebaseConfig";
import { useAuth } from "../../context/AuthContext";

const Image = dynamic(() => import("next/image"), {  ssr: false });

interface SupportItem {
  id: string;
  title: string;
  description: string;
  category: string;
  icon?: string;
  image?: string;
  overview?: string;
  isTrending?: boolean;
  details?: {
    overview?: string;
    features?: string[];
    [key: string]: any;
  };
}

export default function SupportDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;
  const [item, setItem] = useState<SupportItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>("");
  const { user, authLoading } = useAuth();

  // Fetch Support Item from Firestore
  useEffect(() => {
    async function fetchSupportItem() {
      setLoading(true);
      setError("");
      try {
        if (!id) {
          setItem(null);
          setLoading(false);
          return;
        }
        const docRef = doc(db, "support", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() } as SupportItem);
        } else {
          setItem(null);
        }
      } catch (e) {
        setError("Failed to fetch support service. Please try again.");
        setItem(null);
      } finally {
        setLoading(false);
      }
    }
    fetchSupportItem();
  }, [id]);

  // Defensive for details object
  const {
    title,
    image,
    category,
    description,
    overview,
    isTrending,
    details,
  } = item || {};

  const detailsOverview = details?.overview || overview || "";
  const detailsFeatures = Array.isArray(details?.features) ? details.features : [];

  const categoryBadgeIcon = useMemo(() => {
    switch (category) {
      case "programming":
        return <FiZap className="inline-block mr-1 text-yellow-400" />;
      default:
        return <FiCheckCircle className="inline-block mr-1 text-blue-400" />;
    }
  }, [category]);

  // Form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!user) return;
      setUploading(true);

      try {
        const formData = new FormData(e.currentTarget);
        const name = (formData.get("name") as string).trim();
        const email = (formData.get("email") as string).trim();
        const phone = (formData.get("phone") as string).trim();
        const message = (formData.get("message") as string).trim();
        const location = (formData.get("location") as string).trim();
        const resumeFile = formData.get("resume") as File;

        // Basic validation
        if (
          !name ||
          !email ||
          !phone ||
          !message ||
          !location ||
          !resumeFile
        ) {
          alert("All fields are required.");
          setUploading(false);
          return;
        }

        // Upload resume to Firebase Storage
        const storageRef = ref(
          storage,
          `resumes/${user.uid}/${Date.now()}_${resumeFile.name.replace(/\s+/g, "_")}`
        );
        await uploadBytes(storageRef, resumeFile);

        // Get the download URL
        const fileURL = await getDownloadURL(storageRef);

        // Store request in Firestore
        await addDoc(collection(db, "supportRequests"), {
          name,
          email,
          phone,
          message,
          location,
          item: title,
          itemId: id,
          userId: user.uid,
          resume: fileURL,
          createdAt: new Date(),
        });

        alert("Support request submitted successfully!");
        router.push("/supports");
      } catch (error) {
        console.error("Error submitting support request:", error);
        alert("Failed to submit the support request. Please try again.");
      } finally {
        setUploading(false);
      }
    },
    [user, title, id, router]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="flex items-center space-x-4">
          <FiLoader className="animate-spin text-4xl text-blue-400" />
          <span className="text-white text-lg">Loading Support Service...</span>
        </div>
      </div>
    );
  }

  if (!item || error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
          <h1 className="text-2xl font-bold mb-4 text-white">
            {error ? "Error" : "Support Item Not Found"}
          </h1>
          <p className="text-gray-400 mb-6">
            {error ||
              "The support item you're looking for couldn't be found. Please check the URL or return to the support page."}
          </p>
          <button
            onClick={() => router.push("/supports")}
            className="inline-flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Supports
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-gray-100 ">
      {/* Header */}
      <header className="bg-black/90 border-b border-gray-800 sticky top-8 z-10">
        <div className="max-w-9xl mx-auto px-4 py-6 ">
          <button
            onClick={() => router.back()}
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            aria-label="Back to Supports"
            type="button"
          >
            <FiArrowLeft className="mr-2" />
            Back to Supports
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7.5xl mx-auto px-4 sm:px-6  py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 ">
          {/* Left Column - Support Details */}
          <div className="lg:col-span-2 space-y-8 px-10">
            {/* Banner Image */}
            {image && (
              <div className="bg-gradient-to-br from-blue-800/70 to-gray-900/70 rounded-2xl shadow-2xl border border-blue-900/40 overflow-hidden relative">
                <React.Suspense fallback={<div className="h-72 bg-gray-700" />}>
                  <div className="h-72 relative">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover"
                      priority
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>
                </React.Suspense>
                {isTrending && (
                  <span className="absolute top-5 right-5 z-10 flex items-center bg-pink-600/80 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg animate-pulse">
                    <MdOutlineTrendingUp className="mr-2 text-lg" />
                    Trending
                  </span>
                )}
              </div>
            )}

            {/* Overview Card */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 rounded-2xl shadow-xl border border-blue-900/30 p-8">
              <div className="flex flex-wrap gap-4 items-center mb-6">
                {/* Category badge */}
                <span className="inline-flex items-center bg-blue-900/40 border border-blue-700/30 text-blue-300 px-4 py-1.5 rounded-full text-xs font-semibold shadow-md uppercase mr-2 tracking-wider">
                  {categoryBadgeIcon}
                  {category}
                </span>
                {isTrending && (
                  <span className="inline-flex items-center bg-pink-900/50 text-pink-300 px-4 py-1.5 rounded-full text-xs font-semibold shadow-md uppercase tracking-wider">
                    <BsFire className="mr-2 text-pink-300" />
                    Hot
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 drop-shadow-lg">
                {title}
              </h1>
              <p className="text-lg text-blue-100 mb-4 font-medium tracking-wide">
                {description}
              </p>
              <div className="bg-gradient-to-r from-blue-900/70 via-gray-900/70 to-blue-800/70 rounded-xl px-6 py-5 shadow-lg border border-blue-800/30 mb-2">
                <div className="text-base text-gray-200 mb-1 font-semibold">
                  Overview
                </div>
                <div className="text-gray-100 text-base">{detailsOverview}</div>
              </div>
              {/* Features */}
              {detailsFeatures && detailsFeatures.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-xl font-bold text-white mb-3">
                    Key Features
                  </h2>
                  <ul className="space-y-3">
                    {detailsFeatures.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start bg-blue-950/40 rounded-lg px-4 py-2 shadow hover:shadow-blue-800/40 transition-all group"
                      >
                        <FiCheckCircle className="mt-1 mr-3 text-blue-400 group-hover:text-blue-300 transition" />
                        <span className="text-blue-100 text-base group-hover:text-blue-200">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Details Section (if any, show other details except features/overview) */}
            {details &&
              Object.keys(details).filter(
                (k) => !["features", "overview"].includes(k)
              ).length > 0 && (
                <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 rounded-2xl shadow-lg border border-blue-900/20 p-7 mt-8">
                  <h3 className="text-xl font-bold text-blue-200 mb-3">
                    Additional Details
                  </h3>
                  <pre className="text-sm text-blue-100 break-words whitespace-pre-wrap">
                    {JSON.stringify(
                      Object.fromEntries(
                        Object.entries(details).filter(
                          ([k]) => !["features", "overview"].includes(k)
                        )
                      ),
                      null,
                      2
                    )}
                  </pre>
                </div>
              )}
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-1 flex justify-center items-center min-h-[70vh]">
            <div className="w-full max-w-xl bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 rounded-2xl shadow-2xl border border-blue-900/30 p-10 sticky top-8 flex flex-col items-center">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-500 mb-8 drop-shadow tracking-tight text-center uppercase">
                <span className="inline-block">Request</span>
                <span className="inline-block ml-2">Support</span>
              </h2>
              {!authLoading && !user && (
                <div className="mb-6 w-full text-center" aria-live="polite">
                  <span className="inline-block bg-red-100 text-red-800 border border-red-300 px-4 py-2 rounded-md font-medium text-sm">
                    Please log in to submit a support request.
                  </span>
                </div>
              )}
              <form
                onSubmit={handleSubmit}
                className="space-y-6 w-full"
                aria-disabled={uploading || !user}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-blue-200 mb-2"
                  >
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-blue-800 text-white placeholder-gray-400"
                    placeholder="Your name"
                    required
                    disabled={uploading || !user}
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-blue-200 mb-2"
                  >
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-blue-800 text-white placeholder-gray-400"
                    placeholder="your.email@example.com"
                    required
                    disabled={uploading || !user}
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-blue-200 mb-2"
                  >
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-blue-800 text-white placeholder-gray-400"
                    placeholder="Your phone number"
                    pattern="[0-9]{10,15}"
                    required
                    disabled={uploading || !user}
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-blue-200 mb-2"
                  >
                    Location <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-blue-800 text-white placeholder-gray-400"
                    placeholder="Your location"
                    required
                    disabled={uploading || !user}
                  />
                </div>
                <div>
                  <label
                    htmlFor="resume"
                    className="block text-sm font-medium text-blue-200 mb-2"
                  >
                    Resume <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-blue-800 text-white file:bg-gradient-to-r file:from-blue-700 file:to-blue-600 file:text-white file:rounded-lg file:px-4 file:py-2 file:border-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
                    accept=".pdf,.doc,.docx"
                    required
                    disabled={uploading || !user}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-blue-200 mb-2"
                  >
                    How can we help? <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-blue-800 text-white placeholder-gray-400"
                    placeholder="Describe your support needs..."
                    required
                    disabled={uploading || !user}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 hover:from-blue-800 hover:to-blue-800 text-white rounded-lg font-bold shadow-lg hover:shadow-blue-700/40 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={uploading || !user}
                >
                  {uploading
                    ? "Submitting..."
                    : user
                    ? "Submit Request"
                    : "Login to Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}