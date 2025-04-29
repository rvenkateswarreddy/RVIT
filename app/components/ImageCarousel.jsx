"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

import slide1 from "../../public/slider1.jpg";
import slide2 from "../../public/slider2.jpg";
import slide3 from "../../public/slider1.jpg";
import slide4 from "../../public/slider2.jpg";

const carouselData = [
  {
    id: 1,
    image: slide1,
    alt: "Modern office workspace",
    title: "Premium Workspace Solutions",
    description: "Creating productive environments for your team",
  },
  {
    id: 2,
    image: slide2,
    alt: "Team collaboration meeting",
    title: "Collaborative Spaces",
    description: "Designed to foster creativity and teamwork",
  },
  {
    id: 3,
    image: slide3,
    alt: "Technology infrastructure",
    title: "Cutting-Edge Technology",
    description: "Future-proof solutions for your business",
  },
  {
    id: 4,
    image: slide4,
    alt: "Customer support team",
    title: "Dedicated Support",
    description: "24/7 assistance for your business needs",
  },
];

export default function ImageCarousel() {
  return (
    <div className="relative w-full h-[80vh] max-h-[800px]">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          bulletClass: "swiper-custom-bullet",
          bulletActiveClass: "swiper-custom-bullet-active",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        grabCursor={true}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 0 },
          768: { slidesPerView: 1, spaceBetween: 0 },
          1024: { slidesPerView: 1, spaceBetween: 0 },
        }}
        className="h-full w-full"
      >
        {carouselData.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            <div className="absolute inset-0 bg-black/30 z-10" />
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover"
              quality={90}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              // REMOVE placeholder and priority for all
              loading="eager" // force immediate loading without lazy
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 px-4 sm:px-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fadeIn">
                {slide.title}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-white max-w-2xl animate-fadeIn delay-100">
                {slide.description}
              </p>
            </div>
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
          bottom: 30px !important;
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.3s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
