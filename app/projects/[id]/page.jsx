"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiGithub, FiExternalLink, FiChevronLeft } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

export default function ProjectDetailPage() {
  const searchParams = useSearchParams();
  const project = JSON.parse(searchParams.get("project") || "{}");

  if (!project || Object.keys(project).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Project not found</h1>
          <Link href="/projects" className="text-blue-400 hover:text-blue-300">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center text-blue-400 hover:text-blue-300"
          >
            <FiChevronLeft className="mr-1" /> Back to Projects
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Slider */}
          <div className="lg:sticky lg:top-20 lg:h-[80vh]">
            <div className="relative h-full w-full rounded-xl overflow-hidden">
              <Swiper
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                  bulletClass: "swiper-custom-bullet",
                  bulletActiveClass: "swiper-custom-bullet-active",
                }}
                loop={true}
                grabCursor={true}
                className="h-full w-full"
              >
                {project.screenshots.map((image, index) => (
                  <SwiperSlide key={index} className="relative h-full w-full">
                    <Image
                      src={image}
                      alt={`Project screenshot ${index + 1}`}
                      fill
                      className="object-contain"
                      quality={100}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom styles */}
              <style jsx global>{`
                .swiper-custom-bullet {
                  width: 10px;
                  height: 10px;
                  background: rgba(255, 255, 255, 0.5);
                  opacity: 1;
                  margin: 0 6px !important;
                  transition: all 0.3s ease;
                }
                .swiper-custom-bullet-active {
                  background: #fff;
                  width: 30px;
                  border-radius: 5px;
                }
                .swiper-pagination {
                  bottom: 20px !important;
                }
              `}</style>
            </div>
          </div>

          {/* Project Details */}
          <div>
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-bold text-gray-100">
                {project.title}
              </h1>
              <span className="text-sm text-gray-300 bg-blue-600 px-3 py-1 rounded-full">
                {project.category}
              </span>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-300 mb-8">
              <div>
                <span className="block text-gray-400">Client</span>
                {project.client}
              </div>
              <div>
                <span className="block text-gray-400">Date</span>
                {project.date}
              </div>
              <div>
                <span className="block text-gray-400">Team Size</span>
                {project.teamSize} members
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">
                Project Overview
              </h2>
              <p className="text-gray-300 mb-6">{project.description}</p>

              <h2 className="text-xl font-semibold text-gray-100 mb-4">
                Key Features
              </h2>
              <ul className="space-y-3 text-gray-300">
                {project.detailedDescription.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 text-gray-200 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <FiGithub className="mr-2" /> View Code
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiExternalLink className="mr-2" /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
