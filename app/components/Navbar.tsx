"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { href: "/", label: "Home", icon: <FiHome /> },
  { href: "/supports", label: "Supports", icon: <FiSettings /> },
  { href: "/trainings", label: "Trainings", icon: <FaChalkboardTeacher /> },
  { href: "/jobs", label: "Jobs", icon: <FiBriefcase /> },
  { href: "/contactUs", label: "Contact", icon: <FiMail /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  // Only render auth-dependent UI after mount to avoid hydration error
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation loading indicator
  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  const profileButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      {/* Loading Indicator */}
      {isNavigating && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 z-50 animate-loading" />
      )}
      <header
        className={`fixed top-0 inset-x-0 z-50 h-16 md:h-20 transition-all duration-300 ${
          scrolled ? "bg-black shadow-md" : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" aria-label="Home">
            <Image
              src="/logo3.png"
              alt="Rv IT Logo"
              width={100}
              height={40}
              className="object-contain"
              priority
            />
          </Link>
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Desktop navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-3 py-2 text-base font-medium transition-all rounded-md ${
                  pathname === link.href
                    ? "text-white bg-gray-800"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>
          {/* User / Login */}
          <div className="hidden md:flex items-center space-x-4">
            {mounted ? (
              !loading && user ? (
                <div className="relative">
                  <button
                    ref={profileButtonRef}
                    onClick={() => setUserDropdownOpen((v) => !v)}
                    className="flex items-center space-x-2 focus:outline-none"
                    aria-haspopup="true"
                    aria-expanded={userDropdownOpen}
                    aria-label="User menu"
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
                    <FiChevronDown className={`text-gray-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {/* Dropdown */}
                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50"
                        tabIndex={-1}
                        role="menu"
                        aria-label="User menu"
                      >
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => setUserDropdownOpen(false)}
                          role="menuitem"
                        >
                          Your Profile
                        </Link>
                        <Link
                          href="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => setUserDropdownOpen(false)}
                          role="menuitem"
                        >
                          Settings
                        </Link>
                        <button
                          onClick={signOut}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                          role="menuitem"
                        >
                          Sign out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                !loading && (
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent("openLoginModal"))}
                    className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                    aria-label="Login"
                  >
                    <FiLogIn className="mr-2" />
                    Login
                  </button>
                )
              )
            ) : (
              <div style={{ width: 80, height: 32 }} />
            )}
          </div>
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none z-50"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25 }}
              className="md:hidden fixed inset-0 bg-black z-40 flex flex-col px-6 pt-20 space-y-4 shadow-lg"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-4 py-3 text-base font-medium rounded-md ${
                    pathname === link.href
                      ? "text-white bg-gray-700"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
              {mounted ? (
                !loading && user ? (
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
                      onClick={signOut}
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
                        window.dispatchEvent(new CustomEvent("openLoginModal"));
                      }}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
                    >
                      <FiLogIn className="mr-2" />
                      Login
                    </button>
                  )
                )
              ) : (
                <div style={{ width: 80, height: 32 }} />
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}