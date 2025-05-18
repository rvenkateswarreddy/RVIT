"use client";

import { Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProgressBar from "./components/ProgressBar"; // Preloading progress bar
import dynamic from "next/dynamic";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

// Google Fonts with subsets
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Lazy-load certain components
const GoogleSignInModal = dynamic(
  () => import("./components/GoogleSignInModal"),
  { ssr: false }
);
const CookiesBanner = dynamic(() => import("./components/CookiesBanner"), {
  ssr: false,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${geistSans.variable} ${geistMono.variable}`}
      >
        <Suspense
          fallback={<div className="text-center text-gray-300">Loading...</div>}
        >
          <ProgressBar />
          <Navbar />
          <GoogleSignInModal />
          <main className="pt-16 md:pt-20 min-h-screen">{children}</main>
          <Footer />
        </Suspense>
        {/* Lazy-loaded components */}
        <CookiesBanner />
      </body>
    </html>
  );
}
