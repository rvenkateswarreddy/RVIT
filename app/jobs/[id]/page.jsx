"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FiArrowLeft,
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiClock,
} from "react-icons/fi";
import { FaReact, FaNodeJs, FaPython, FaJava, FaAws } from "react-icons/fa";
import { SiTypescript, SiPostgresql, SiMongodb } from "react-icons/si";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";

const PhoneInput = () => {
  useEffect(() => {
    const input = document.querySelector("#phone");
    if (input) {
      intlTelInput(input, {
        initialCountry: "us",
        separateDialCode: true,
        preferredCountries: ["us", "in", "gb"],
        utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
      });
    }
  }, []);
};

export default function JobApplicationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  // Handle case where job data is missing
  if (!job) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-white">Job Not Found</h1>
          <p className="text-gray-400 mb-6">
            The job you're looking for couldn't be found. Please check the URL
            or return to the jobs listing.
          </p>
          <button
            onClick={() => router.push("/jobs")}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <FiArrowLeft className="mr-2" />
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  // Skill icon mapping
  const skillIcons = {
    React: <FaReact className="text-blue-400" />,
    "Node.js": <FaNodeJs className="text-green-500" />,
    TypeScript: <SiTypescript className="text-blue-600" />,
    Python: <FaPython className="text-yellow-400" />,
    Java: <FaJava className="text-red-500" />,
    AWS: <FaAws className="text-orange-400" />,
    PostgreSQL: <SiPostgresql className="text-blue-300" />,
    MongoDB: <SiMongodb className="text-green-400" />,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert("Application submitted successfully!");
    router.push("/jobs");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors duration-200"
            aria-label="Go back to previous page"
          >
            <FiArrowLeft className="mr-2" size={18} />
            Back to Jobs
          </button>

          <div className="mb-2">
            <span className="inline-block bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-sm font-medium mb-3">
              {job.type}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
            {job.title}
          </h1>
          <p className="text-xl text-blue-400 mb-6">{job.company}</p>

          <div className="flex flex-wrap gap-4 text-gray-300">
            <span className="flex items-center">
              <FiMapPin className="mr-2 text-gray-400" size={16} />
              {job.location}
            </span>
            <span className="flex items-center">
              <FiDollarSign className="mr-2 text-gray-400" size={16} />
              {job.salary}
            </span>
            <span className="flex items-center">
              <FiClock className="mr-2 text-gray-400" size={16} />
              Posted {job.posted}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-9xl  py-12 px-4 sm:px-6 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-gray-800 rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-white">
                Job Description
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {job.description}
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">
                    Requirements
                  </h3>
                  <ul className="space-y-3">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2.5 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-300">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">
                    Skills & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-700/50 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-full flex items-center gap-2 transition-colors duration-200 border border-gray-600"
                      >
                        {skillIcons[skill] || (
                          <FiBriefcase className="text-gray-400" />
                        )}
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Additional Information Section */}
            <section className="bg-gray-800 rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-white">
                About {job.company}
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {job.company} is a leading company in the tech industry,
                dedicated to creating innovative solutions that make a
                difference. We value creativity, collaboration, and a passion
                for technology.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our team is composed of talented individuals who are committed
                to excellence and continuous learning. We offer competitive
                benefits, professional growth opportunities, and a dynamic work
                environment.
              </p>
            </section>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-1">
            <section className="bg-gray-800 rounded-xl p-8 shadow-lg sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-white">
                Apply for this position
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-400 transition-all duration-200"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-400 transition-all duration-200"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-400 transition-all duration-200"
                    placeholder="Enter your phone number"
                    name="phone"
                  />
                </div>

                <div>
                  <label
                    htmlFor="resume"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Resume/CV
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="resume"
                      className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-colors duration-200 file:cursor-pointer cursor-pointer"
                      accept=".pdf,.doc,.docx"
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    PDF, DOC, or DOCX (Max. 5MB)
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="portfolio"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Portfolio/GitHub (Optional)
                  </label>
                  <input
                    type="url"
                    id="portfolio"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-400 transition-all duration-200"
                    placeholder="https://github.com/username"
                  />
                </div>

                <div>
                  <label
                    htmlFor="coverLetter"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    id="coverLetter"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-400 transition-all duration-200"
                    placeholder="Tell us why you're the perfect candidate for this position..."
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg text-white font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    Submit Application
                  </button>
                </div>

                <p className="text-xs text-gray-400 text-center">
                  By applying, you agree to our{" "}
                  <a href="#" className="text-blue-400 hover:underline">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-400 hover:underline">
                    Terms of Service
                  </a>
                  .
                </p>
              </form>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} {job.company} Careers. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
