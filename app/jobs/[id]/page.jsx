"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../FirebaseConfig";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center text-blue-400 hover:text-blue-300 mb-6"
          >
            <FiArrowLeft className="mr-2" />
            Back to Jobs
          </button>
          <h1 className="text-3xl font-bold text-white mb-4">{job.title}</h1>
          <p className="text-xl text-blue-400">{job.company}</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">
              Job Description
            </h2>
            <p className="text-gray-300">{job.description}</p>
          </section>

          <section className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Apply Now</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <input
                type="file"
                name="resumeFile"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                onChange={handleFileChange}
                required
              />
              <input
                type="file"
                name="coverLetterFile"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                onChange={handleFileChange}
              />
              <input
                type="url"
                name="portfolio"
                placeholder="Portfolio URL (optional)"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                value={formData.portfolio}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
