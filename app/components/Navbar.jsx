"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation"; // Updated to use usePathname
import {
  FiHome,
  FiSettings,
  FiBriefcase,
  FiMail,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { FaChalkboardTeacher } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../../FirebaseConfig";
import { signOut } from "firebase/auth";
import LoginModal from "./LoginModal";
import CookiesBanner from "./CookiesBanner";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [isNavigating, setIsNavigating] = useState(false); // State for navigation loading
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Trigger navigation loading when pathname changes
    setIsNavigating(true);

    const timer = setTimeout(() => {
      setIsNavigating(false); // Simulate loading complete
    }, 300); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, [pathname]); // Dependency is pathname

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  const navLinks = [
    { id: "/", label: "Home", icon: <FiHome /> },
    { id: "/supports", label: "Supports", icon: <FiSettings /> },
    { id: "/trainings", label: "Trainings", icon: <FaChalkboardTeacher /> },
    { id: "/jobs", label: "Jobs", icon: <FiBriefcase /> },
    { id: "/contactUs", label: "Contact", icon: <FiMail /> },
  ];

  return (
    <>
      {/* Loading Indicator */}
      {isNavigating && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 z-50 animate-loading" />
      )}

      <header
        className={`fixed top-0 inset-x-0 z-50 h-16 md:h-20 transition-all duration-300  ${
          scrolled ? "bg-black shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/assets/rvitlogo.png"
              alt="ERRTEKNALOZY Logo"
              width={160}
              height={60}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.id}
                className={`flex items-center px-3 py-2 text-base font-medium transition-all rounded-md ${
                  pathname === link.id
                    ? "text-white bg-gray-800"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User or Login */}
          <div className="hidden md:flex items-center space-x-4">
            {!loading && user ? (
              <>
                <span className="text-gray-300 text-sm">
                  {user.displayName}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-sm bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              !loading && (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Login
                </button>
              )
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none z-50"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25 }}
              className="md:hidden fixed inset-0 bg-black z-40 flex flex-col px-6 pt-20 space-y-4 shadow-lg"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.id}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-4 py-3 text-base font-medium rounded-md ${
                    pathname === link.id
                      ? "text-white bg-gray-700"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
              {!loading && user ? (
                <div className="flex items-center justify-between px-4 mt-4">
                  <span className="text-gray-300">{user.displayName}</span>
                  <button
                    onClick={handleSignOut}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                !loading && (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsLoginModalOpen(true);
                    }}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Login
                  </button>
                )
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <CookiesBanner />
    </>
  );
}
