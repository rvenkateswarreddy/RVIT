"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load the TechCardsGrid for optimal performance
const TechCardsGrid = dynamic(() => import("../components/TechCardsGrid"), {
  suspense: true,
  loading: () => (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-400 border-opacity-30"></div>
    </div>
  ),
});

export default function TechExpertisePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center py-12 px-4">
      <section className="max-w-5xl w-full mx-auto text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-cyan-200">
          Our Tech Expertise
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-4">
          Cutting-edge technologies. Enterprise-grade solutions. End-to-end mastery.
        </p>
        <p className="max-w-2xl mx-auto text-gray-400">
          We bring together the best in frontend, backend, mobile, databases, and DevOps to deliver robust, scalable, and future-ready digital products. Explore our toolset &mdash; each technology is a core part of our delivery DNA.
        </p>
      </section>
      <Suspense fallback={<div className="text-white">Loading technologies...</div>}>
        <TechCardsGrid />
      </Suspense>
    </main>
  );
}