"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

export default function ProjectImageSlider({ images }) {
  return (
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
        {images.map((image, index) => (
          <SwiperSlide key={index} className="relative h-full w-full">
            <Image
              src={image}
              alt={`Project screenshot ${index + 1}`}
              fill
              className="object-cover"
              quality={90}
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
  );
}
