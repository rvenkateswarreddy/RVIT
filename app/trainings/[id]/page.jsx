"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  FiChevronLeft,
  FiClock,
  FiUsers,
  FiStar,
  FiAward,
} from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

export default function TrainingDetailPage() {
  const searchParams = useSearchParams();

  // Safely parse the training data with defaults
  let training;
  try {
    training = JSON.parse(searchParams.get("training") || "{}");
  } catch (e) {
    training = {};
  }

  // Default values for all required fields
  const safeTraining = {
    id: 0,
    title: "Training Program",
    description: "No description available",
    fullDescription: "Detailed description not provided",
    category: "General",
    level: "Beginner",
    duration: "Not specified",
    students: 0,
    rating: 0,
    instructor: "Certified Instructor",
    instructorBio: "Professional in their field",
    image: "/images/default-training.jpg",
    additionalImages: [],
    syllabus: ["Course content not specified"],
    technologies: ["Technology stack not listed"],
    brochureLink: null,
    ...training,
  };

  // Handle empty state
  if (!training || Object.keys(training).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Training not found</h1>
          <Link href="/trainings" className="text-blue-400 hover:text-blue-300">
            ← Back to Trainings
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
            href="/trainings"
            className="inline-flex items-center text-blue-400 hover:text-blue-300"
          >
            <FiChevronLeft className="mr-1" /> Back to Trainings
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Slider */}
          <div className="lg:sticky lg:top-20 lg:h-[80vh]">
            <div className="relative h-full w-full rounded-xl overflow-hidden bg-gray-700">
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
                {[safeTraining.image, ...safeTraining.additionalImages].map(
                  (image, index) => (
                    <SwiperSlide key={index} className="relative h-full w-full">
                      <Image
                        src={image || "/images/default-training.jpg"}
                        alt={`Training image ${index + 1}`}
                        fill
                        className="object-cover"
                        quality={100}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                      />
                    </SwiperSlide>
                  )
                )}
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

          {/* Training Details */}
          <div>
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-bold text-gray-100">
                {safeTraining.title}
              </h1>
              <span
                className={`text-sm text-white px-3 py-1 rounded-full ${
                  safeTraining.level === "Beginner"
                    ? "bg-green-600"
                    : safeTraining.level === "Intermediate"
                    ? "bg-yellow-600"
                    : "bg-red-600"
                }`}
              >
                {safeTraining.level}
              </span>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-300 mb-8">
              <div className="flex items-center">
                <FiClock className="mr-2 text-blue-400" />
                <div>
                  <span className="block text-gray-400">Duration</span>
                  {safeTraining.duration}
                </div>
              </div>
              <div className="flex items-center">
                <FiUsers className="mr-2 text-blue-400" />
                <div>
                  <span className="block text-gray-400">Students</span>
                  {safeTraining.students.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center">
                <FiStar className="mr-2 text-blue-400" />
                <div>
                  <span className="block text-gray-400">Rating</span>
                  {safeTraining.rating}/5
                </div>
              </div>
              <div className="flex items-center">
                <FiAward className="mr-2 text-blue-400" />
                <div>
                  <span className="block text-gray-400">Category</span>
                  {safeTraining.category}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">
                Training Overview
              </h2>
              <p className="text-gray-300 mb-6">
                {safeTraining.fullDescription}
              </p>

              <h2 className="text-xl font-semibold text-gray-100 mb-4">
                What You'll Learn
              </h2>
              <ul className="space-y-3 text-gray-300">
                {safeTraining.syllabus.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">
                Instructor
              </h2>
              <div className="flex items-center bg-gray-700 p-4 rounded-lg">
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold mr-4">
                  {safeTraining.instructor
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-100">
                    {safeTraining.instructor}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {safeTraining.instructorBio}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Enroll Now
              </button>
              {safeTraining.brochureLink && (
                <a
                  href={safeTraining.brochureLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-6 py-3 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Download Brochure
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
