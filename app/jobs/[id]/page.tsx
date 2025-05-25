"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../FirebaseConfig";
import { useAuth } from "../../context/AuthContext";
import SkillGrid from "../../components/SkillGrid";

interface JobType {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements?: string[];
  responsibilities?: string[];
  skills?: string[];
  salary?: string;
  experience?: string;
  type?: string;
}

export default function JobApplicationPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params?.id as string | undefined;
  const [job, setJob] = useState<JobType | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    portfolio: "",
    coverLetterFile: null as File | null,
    resumeFile: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, authLoading } = useAuth();

  // Autofill name/email if logged in
  useEffect(() => {
    if (user && !authLoading) {
      setFormData((prev) => ({
        ...prev,
        name: user.displayName || "",
        email: user.email || "",
      }));
    }
  }, [user, authLoading]);

  // Fetch job data from Firestore
  useEffect(() => {
    async function fetchJob() {
      setLoading(true);
      try {
        if (!jobId) {
          setJob(null);
          setLoading(false);
          return;
        }
        const docRef = doc(db, "rvit_jobs", jobId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setJob({ id: docSnap.id, ...docSnap.data() } as JobType);
        } else {
          setJob(null);
        }
      } catch (e) {
        setJob(null);
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [jobId]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files && files[0] ? files[0] : null,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);

    try {
      const requestData: any = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        portfolio: formData.portfolio || "",
        resumeUrl: "",
        coverLetterUrl: "",
        jobTitle: job?.title,
        companyName: job?.company,
        location: job?.location,
        dateApplied: new Date().toISOString(),
        userId: user.uid,
        jobId: job?.id,
      };

      // Upload resume if provided
      if (formData.resumeFile) {
        const resumeRef = ref(
          storage,
          `resumes/${user.uid}/${Date.now()}_${formData.resumeFile.name.replace(/\s+/g, "_")}`
        );
        await uploadBytes(resumeRef, formData.resumeFile);
        const resumeUrl = await getDownloadURL(resumeRef);
        requestData.resumeUrl = resumeUrl;
      }

      // Upload cover letter if provided
      if (formData.coverLetterFile) {
        const coverLetterRef = ref(
          storage,
          `coverLetters/${user.uid}/${Date.now()}_${formData.coverLetterFile.name.replace(/\s+/g, "_")}`
        );
        await uploadBytes(coverLetterRef, formData.coverLetterFile);
        const coverLetterUrl = await getDownloadURL(coverLetterRef);
        requestData.coverLetterUrl = coverLetterUrl;
      }

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p>Loading job details...</p>
        </div>
      </div>
    );
  }

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
                  {job?.requirements?.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
            <SkillGrid skills={job.skills || []} label="Required Skills" />
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
          {/* APPLICATION FORM */}
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
                  accept=".pdf,.doc,.docx"
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
                  accept=".pdf,.doc,.docx"
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