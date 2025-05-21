"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  FiHome,
  FiSettings,
  FiBriefcase,
  FiMail,
  FiMenu,
  FiX,
  FiUser,
  FiLogIn,
  FiChevronDown,
} from "react-icons/fi";
import { FaChalkboardTeacher } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../../FirebaseConfig";
import { 
  signOut, 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import LoginModal from "./LoginModal";
import CookiesBanner from "./CookiesBanner";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showCookiesBanner, setShowCookiesBanner] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Set auth persistence
  useEffect(() => {
    const setAuthPersistence = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
      } catch (error) {
        console.error("Error setting auth persistence:", error);
      }
    };
    setAuthPersistence();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check if cookies consent was given
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setShowCookiesBanner(true);
    }
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);
    return () => unsubscribe();
  }, []);

  const handleAuthStateChange = (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
      localStorage.setItem('user', JSON.stringify({
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        email: currentUser.email,
        photoURL: currentUser.photoURL
      }));
      setIsLoginModalOpen(false);
      if (pathname === '/signup') {
        router.push('/profile');
      }
    } else {
      setUser(null);
      localStorage.removeItem('user');
    }
    setLoading(false);
  };

  const handleSignInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserDropdownOpen(false);
      localStorage.removeItem('user');
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowCookiesBanner(false);
    // No login triggered here!
  };

  useEffect(() => {
    // Navigation loading indicator
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 300);
    return () => clearTimeout(timer);
  }, [pathname]);

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

      {/* Cookies Banner */}
      <CookiesBanner 
        visible={showCookiesBanner}
        onAccept={handleAcceptCookies}
      />

      <header
        className={`fixed top-0 inset-x-0 z-50 h-16 md:h-20 transition-all duration-300 ${
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
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      {user.displayName?.charAt(0) || user.email?.charAt(0)}
                    </div>
                  )}
                  <span className="text-gray-300">{user.displayName || user.email}</span>
                  <FiChevronDown className={`text-gray-400 transition-transform ${userDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>

                {/* User Dropdown */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-999">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              !loading && (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                >
                  <FiLogIn className="mr-2" />
                  Login
                </button>
              )
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none z-[999]"
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
                <div className="flex flex-col space-y-4 px-4 mt-4">
                  <Link
                    href="/profile"
                    onClick={() => {
                      setIsOpen(false);
                      setUserDropdownOpen(false);
                    }}
                    className="flex items-center text-gray-300 hover:text-white"
                  >
                    <FiUser className="mr-2" />
                    {user.displayName || user.email}
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
                  >
                    <FiLogIn className="mr-2" />
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
        onGoogleSignIn={handleSignInWithGoogle}
        onSuccess={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}