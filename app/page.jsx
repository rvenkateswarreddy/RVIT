"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import components for lazy loading
const ImageCarousel = dynamic(() => import("./components/ImageCarousel"), {
  ssr: false,
});
const AboutSection = dynamic(() => import("./components/AboutSection"), {
  suspense: true,
});
const ServicesSection = dynamic(() => import("./components/ServicesSection"), {
  suspense: true,
});
const TechnologiesSection = dynamic(
  () => import("./components/TechnologiesSection"),
  { suspense: true }
);
const TestimonialsSection = dynamic(
  () => import("./components/TestimonialsSection"),
  { suspense: true }
);
const ProjectSupportSection = dynamic(
  () => import("./components/ProjectSupportSection"),
  { suspense: true }
);
const RecruitmentSection = dynamic(
  () => import("./components/RecruitmentSection"),
  { suspense: true }
);
const TrainingSection = dynamic(
  () => import("./components/TrainingSection"),
  { suspense: true }
);

// Loading Spinner Component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-24">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative">
      <Suspense fallback={<LoadingSpinner />}>
        <ImageCarousel />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <ServicesSection />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <TechnologiesSection />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <TrainingSection />
      </Suspense>
     
      <Suspense fallback={<LoadingSpinner />}>
        <ProjectSupportSection />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <RecruitmentSection />
      </Suspense>
       <Suspense fallback={<LoadingSpinner />}>
        <TestimonialsSection />
      </Suspense>
    </main>
  );
}
