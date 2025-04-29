"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiGithub, FiExternalLink, FiX } from "react-icons/fi";

import slide1 from "../../public/assets/project1.jpg";
import slide2 from "../../public/assets/online_doctor.png";
import slide3 from "../../public/assets/svu_payment.png";

import Green1 from "../../public/assets/Green1.jpg";
import Green2 from "../../public/assets/Green2.jpg";
import Green3 from "../../public/assets/Green3.jpg";
import Green4 from "../../public/assets/Green4.jpg";
import Green5 from "../../public/assets/Green5.jpg";
import Green6 from "../../public/assets/green.jpg";

import rental1 from "../../public/assets/rental1.jpg";

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const projectsData = [
    {
      id: 1,
      title: "Gyansecure Application",
      shortDescription:
        "A full-featured mobile application for secure learning.",
      description:
        "A full-featured online marketplace with payment integration, inventory management, and customer analytics. This platform was built with a focus on scalability and user experience, handling over 10,000 daily active users with 99.9% uptime.",
      technologies: [
        "React Native",
        "Firebase",
        "Android Studio",
        "Stripe API",
        "Redis",
        "Tailwind CSS",
      ],
      image: slide1,
      githubLink: "https://github.com/SUBBARAYUDU3524/GyanSecure_APP",
      liveLink: "https://play.google.com/store/apps/details?id=com.gyansecure",
      category: "Mobile App",
      screenshots: [slide1, slide2, slide3],
      client: "Fashion Retail Co.",
      date: "March 2023",
      teamSize: 5,
      detailedDescription: [
        "Implemented a microservices architecture for better scalability",
        "Integrated with Stripe for secure payment processing",
        "Developed a custom recommendation engine",
        "Created an admin dashboard for real-time analytics",
      ],
    },
    {
      id: 2,
      title: "Online Doctor",
      shortDescription:
        "Mobile application for connecting with doctors online.",
      description:
        "Mobile application for workout tracking, meal planning, and health monitoring with wearable integration. The app has been downloaded over 500,000 times with a 4.8-star rating on app stores.",
      technologies: [
        "React Native",
        "Firebase",
        "Redux",
        "Apple HealthKit",
        "GraphQL",
      ],
      image: slide2,
      githubLink: "https://github.com/SUBBARAYUDU3524/online_doctor",
      liveLink: "https://online-doctor.netlify.app",
      category: "Web Application",
      screenshots: [slide1, slide2, slide3],
      client: "HealthPlus Inc.",
      date: "January 2023",
      teamSize: 4,
      detailedDescription: [
        "Integrated with Apple HealthKit and Google Fit",
        "Developed personalized workout algorithms",
        "Created a social feature for user retention",
        "Implemented offline functionality",
      ],
    },
    {
      id: 3,
      title: "Green Investment",
      shortDescription:
        "Platform to reduce carbon emissions by promoting global plant trade from farmers.",
      description:
        "Green Investment is a web platform designed to reduce carbon emissions by enabling users worldwide to buy plants directly from local farmers at affordable prices. The platform supports environmental sustainability through carbon footprint tracking and analytics.",
      technologies: [
        "React",
        "Firebase",
        "Tailwind CSS",
        "Chart.js",
        "Node.js",
      ],
      image: Green6,
      githubLink: "https://github.com/rvenkateswarreddy/ecosystem",
      liveLink: "https://greeninvestment.netlify.app/",
      category: "Web Application",
      screenshots: [Green1, Green2, Green3, Green4, Green5],
      client: "EcoWorld Initiative",
      date: "March 2024",
      teamSize: 5,
      detailedDescription: [
        "Built a carbon emission analysis dashboard using Chart.js",
        "Enabled real-time plant purchases from local farmers",
        "Integrated Firebase for authentication and database storage",
        "Implemented sustainable trade tracking features",
      ],
    },
  ];

  const categories = ["All", ...new Set(projectsData.map((p) => p.category))];

  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      activeFilter === "All" || project.category === activeFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-100 mb-4">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Projects
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our portfolio of innovative solutions
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto mb-8">
            <FiSearch className="absolute inset-y-0 left-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeFilter === category
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group"
              >
                <div className="relative h-72 w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <Link
                      href={{
                        pathname: `/projects/${project.id}`,
                        query: { project: JSON.stringify(project) },
                      }}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                  <span className="absolute top-4 right-4 bg-gray-900/80 text-white text-xs font-medium px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {project.shortDescription}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-gray-700 text-gray-200 text-xs px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                    <div className="flex space-x-4">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400"
                          title="View code"
                        >
                          <FiGithub className="w-5 h-5" />
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400"
                          title="Live demo"
                        >
                          <FiExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                    <Link
                      href={{
                        pathname: `/projects/${project.id}`,
                        query: { project: JSON.stringify(project) },
                      }}
                      className="text-sm text-blue-400 hover:text-blue-300 font-medium"
                    >
                      Full case study →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-medium text-gray-300 mb-2">
              No projects found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsPage;
