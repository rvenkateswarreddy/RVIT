"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProgressBar from "./components/ProgressBar";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";

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
const LoginModal = dynamic(() => import("./components/LoginModal"), {
  ssr: false,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`antialiased bg-black text-white ${geistSans.variable} ${geistMono.variable}`}
      >
        <AuthProvider>
          <Suspense fallback={<div className="text-center text-gray-300">Loading...</div>}>
            <ProgressBar />
            <Navbar />
            <main className="pt-16 md:pt-20 min-h-screen">{children}</main>
            <Footer />
            <CookiesBanner />
            <GoogleSignInModal />
            <LoginModal/>
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}