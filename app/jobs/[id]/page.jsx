"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../FirebaseConfig";
import { formatData } from "../../components/utils/formatData";
import { useAuth } from "../../context/AuthContext"; // <-- import useAuth

// SkillCard: uniform width/height, professional look
const SkillCard = ({ skill }) => (
  <span
    className="
      flex items-center justify-center
      min-w-[110px] min-h-[44px] max-w-[140px] max-h-[44px]
      px-5 py-2
      rounded-xl
      font-semibold text-base tracking-wide
      bg-gradient-to-br from-blue-900 via-blue-700 to-blue-800
      text-blue-100 shadow-md border border-blue-500/40
      hover:bg-blue-800/80 hover:shadow-lg transition-all
      uppercase
      select-none
      text-center
      m-1
    "
    style={{
      aspectRatio: "3/1",
    }}
  >
    {skill}
  </span>
);

const SkillGrid = ({ skills }) => (
  <div className="flex flex-wrap items-center gap-2 mt-3 mb-2">
    {skills.map((skill, idx) => (
      <SkillCard key={idx} skill={skill} />
    ))}
  </div>
);

export default function JobApplicationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    portfolio: "",
    coverLetterFile: null,
    resumeFile: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, authLoading } = useAuth(); // <-- Auth

  // Autofill name/email if logged in and modal opens
  useEffect(() => {
    if (user && !authLoading) {
      setFormData((prev) => ({
        ...prev,
        name: user.displayName || "",
        email: user.email || "",
      }));
    }
  }, [user, authLoading]);

  // Get job data from query parameters
  const getJobData = () => {
    try {
      const jobParam = searchParams.get("job");
      if (!jobParam) return null;
      return JSON.parse(jobParam);
    } catch (e) {
      return null;
    }
  };

  const job = getJobData();

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-white">Job Not Found</h1>
          <button
            onClick={() => router.push("/jobs")}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors duration-200"
          >
            <FiArrowLeft className="mr-2" />
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  // Input change for text/url/tel/email fields
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // File change handler
  function handleFileChange(e) {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files && files[0] ? files[0] : null,
    }));
  }

  // Form submit
  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) return; // prevent submission if not logged in
    setIsSubmitting(true);

    try {
      const requestData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        portfolio: formData.portfolio || "",
        resumeUrl: "",
        coverLetterUrl: "",
        jobTitle: job.title,
        companyName: job.company,
        location: job.location,
        dateApplied: new Date().toISOString(),
        userId: user.uid, // Save user's UID
      };

      // Upload resume if provided
      if (formData.resumeFile) {
        const resumeRef = ref(
          storage,
          `resumes/${Date.now()}_${formData.resumeFile.name}`
        );
        await uploadBytes(resumeRef, formData.resumeFile);
        const resumeUrl = await getDownloadURL(resumeRef);
        requestData.resumeUrl = resumeUrl;
      }

      // Upload cover letter if provided
      if (formData.coverLetterFile) {
        const coverLetterRef = ref(
          storage,
          `coverLetters/${Date.now()}_${formData.coverLetterFile.name}`
        );
        await uploadBytes(coverLetterRef, formData.coverLetterFile);
        const coverLetterUrl = await getDownloadURL(coverLetterRef);
        requestData.coverLetterUrl = coverLetterUrl;
      }

      // Add job request data to Firestore
      await addDoc(collection(db, "jobRequests"), requestData);

      alert("Application submitted successfully!");
      router.push("/jobs");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit the application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-gray-100">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-blue-950 py-14 px-4 shadow-lg border-b border-blue-900/40">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center text-blue-400 hover:text-blue-300 mb-7 font-medium text-lg"
          >
            <FiArrowLeft className="mr-2" size={22} />
            Back to Jobs
          </button>
          <h1 className="text-4xl font-extrabold text-white mb-2">{job.title}</h1>
          <div className="flex flex-wrap gap-6 items-center text-base text-blue-200 mb-2">
            <span className="font-semibold">{job.company}</span>
            <span>• {job.location}</span>
            {job.type && <span>• <b>Type:</b> {job.type}</span>}
          </div>
          <div className="flex flex-wrap gap-6 text-base text-gray-300 mb-3">
            {job.salary && <span><b>Salary:</b> {job.salary}</span>}
            {job.experience && <span><b>Experience:</b> {job.experience}</span>}
          </div>
          <h2 className="text-2xl font-bold text-white mb-4 mt-4">Job Description</h2>
          <p className="text-gray-300 whitespace-pre-line mb-2 text-lg leading-relaxed">
            {job.description}
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
          {/* DETAILS SIDE */}
          <section className="xl:col-span-7">
            {job.requirements && job.requirements.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-blue-400 mb-3">Key Requirements</h3>
                <ul className="list-disc ml-6 space-y-2 text-gray-200 text-base leading-relaxed">
                  {job.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
            {job.skills && job.skills.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-green-400 mb-4">Required Skills</h3>
                <div className="flex flex-col gap-3">
                  {job.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="
                        inline-flex items-center
                        bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700
                        border border-blue-500/30
                        rounded-lg shadow
                        min-h-[42px] px-6 py-2
                        text-base text-blue-100
                        uppercase tracking-wide
                        hover:bg-blue-800/80 hover:scale-105 hover:shadow-xl
                        transition-all duration-200
                        select-none
                      "
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-purple-400 mb-3">Responsibilities</h3>
                <ul className="list-disc ml-6 space-y-2 text-gray-200 text-base leading-relaxed">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
          {/* APPLICATION FORM - Wider and better styled */}
          <section className="bg-gradient-to-b from-gray-800/90 to-gray-900/90 p-10 rounded-2xl shadow-2xl border border-blue-900/40 flex flex-col justify-center mt-8 xl:mt-0 xl:col-span-5 w-full max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent tracking-tight drop-shadow-md">
              Job Application Form
            </h2>
            {!authLoading && !user && (
              <div className="mb-6 w-full text-center">
                <span className="inline-block bg-red-100 text-red-800 border border-red-300 px-4 py-2 rounded-md font-medium text-sm">
                  Please log in to apply for this job.
                </span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label className="block text-gray-300 text-base font-semibold mb-2" htmlFor="name">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-gray-400 text-base"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting || !user}
                />
              </div>
              <div>
                <label className="block text-gray-300 text-base font-semibold mb-2" htmlFor="email">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-gray-400 text-base"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting || !user}
                />
              </div>
              <div>
                <label className="block text-gray-300 text-base font-semibold mb-2" htmlFor="phone">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-gray-400 text-base"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting || !user}
                />
              </div>
              <div className="space-y-1">
                <label className="text-gray-300 text-base font-semibold block mb-2" htmlFor="resumeFile">
                  Resume <span className="text-red-400">*</span>
                </label>
                <input
                  id="resumeFile"
                  type="file"
                  name="resumeFile"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white file:bg-gradient-to-r file:from-blue-700 file:to-blue-600 file:text-white file:rounded-lg file:px-4 file:py-2 file:border-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
                  onChange={handleFileChange}
                  required
                  disabled={isSubmitting || !user}
                />
              </div>
              <div className="space-y-1">
                <label className="text-gray-300 text-base font-semibold block mb-2" htmlFor="coverLetterFile">
                  Cover Letter (optional)
                </label>
                <input
                  id="coverLetterFile"
                  type="file"
                  name="coverLetterFile"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white file:bg-gradient-to-r file:from-blue-700 file:to-blue-600 file:text-white file:rounded-lg file:px-4 file:py-2 file:border-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
                  onChange={handleFileChange}
                  disabled={isSubmitting || !user}
                />
              </div>
              <div>
                <label className="block text-gray-300 text-base font-semibold mb-2" htmlFor="portfolio">
                  Portfolio URL (optional)
                </label>
                <input
                  id="portfolio"
                  type="url"
                  name="portfolio"
                  placeholder="Portfolio URL (optional)"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder-gray-400 text-base"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                  disabled={isSubmitting || !user}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg font-bold text-lg shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSubmitting || !user}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : user
                ? "Submit Application"
                : "Login to Submit"}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}