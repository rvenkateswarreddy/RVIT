"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiEye, FiGithub, FiExternalLink, FiSearch, FiX } from "react-icons/fi";

import slide1 from "../../public/assets/project1.png";
import slide2 from "../../public/assets/online_doctor.png";
import slide3 from "../../public/assets/svu_payment.png";
import slide4 from "../../public/assets/slider2.jpg";
import AnimationTitles from "./AnimationTitles";
import Animation from "./Animation";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const projectsData = [
    {
      id: 1,
      title: "Gyansecure Application",
      description:
        "Gyan Secure is the ultimate app for anyone interested in learning and mastering the art of cryptography. Whether you are a beginner or a seasoned professional, Gyan Secure takes you on a journey through the history, techniques, and modern applications of cryptography, offering you a comprehensive understanding of both classical and contemporary encryption methods.",
      technologies: ["React Native", "Firebase", "Android Studio"],
      image: slide1,
      link: "https://play.google.com/store/apps/details?id=com.gyansecure&hl=en",
      date: "March 2023",
    },
    {
      id: 2,
      title: "Online Doctor",
      description:
        "Mobile application for workout tracking, meal planning, and health monitoring with wearable integration. Features personalized recommendations and social sharing capabilities.",
      technologies: ["React Native", "Firebase", "Redux", "Apple HealthKit"],
      image: slide2,
      link: "https://online-doctor.netlify.app",
      date: "January 2023",
    },
    {
      id: 3,
      title: "SVU Fee Management System",
      description:
        "Business intelligence dashboard with real-time data visualization and reporting tools for enterprise clients. Includes custom reporting and data export functionality.",
      technologies: ["ReactJs", "ExpressJs", "NodeJs", "Mongodb"],
      image: slide3,
      link: "https://subbupayment.netlify.app",
      date: "November 2022",
    },
    {
      id: 4,
      title: "Smart Home Controller",
      description:
        "IoT platform for managing smart home devices with voice control and automation features. Supports 100+ devices from different manufacturers with a unified interface.",
      technologies: ["React", "Node.js", "MQTT", "AWS IoT"],
      image: slide4,
      link: "https://subbu-stu-management.netlify.app",
      date: "August 2022",
    },
  ];

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

  const toggleDescription = (projectId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Animation
            className="text-8xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            title="Our Projects"
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Showcase of our recent work and successful implementations for
            clients worldwide.
          </p>
        </div>

        {/* Search and Filter */}

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group transform hover:-translate-y-1"
              >
                {/* Project Image */}
                <div className="relative h-72 w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                      <FiEye className="mr-2" />
                      View Details
                    </a>
                  </div>
                  <span className="absolute top-4 right-4 bg-gray-900/80 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <AnimationTitles
                      className="text-xl font-bold text-gray-100"
                      title={project.title}
                    />
                    <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                      {project.date}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-4">
                    {expandedDescriptions[project.id]
                      ? project.description
                      : `${project.description.substring(0, 100)}...`}
                    <button
                      onClick={() => toggleDescription(project.id)}
                      className="ml-2 text-blue-400 hover:text-blue-300 text-sm"
                    >
                      {expandedDescriptions[project.id]
                        ? "Show less"
                        : "Read more"}
                    </button>
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-gray-700 text-gray-200 text-xs font-medium px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-300 mb-6 text-lg">
            Want to see more of our work or discuss a potential project?
          </p>
          <Link
            href="/projects"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
