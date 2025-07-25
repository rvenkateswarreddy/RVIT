"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/industries", label: "Industries" }, 
   { href: "/services", label: "Services" },
   { href: "/discovery", label: "Discovery" },
  { href: "/careers", label: "Careers" },
  { href: "/contactUs", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();
  const profileButtonRef = useRef(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    setIsOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileButtonRef.current && !(profileButtonRef.current as any).contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {isNavigating && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 z-[100] animate-pulse" />
      )}
      <header
        className={`fixed top-0 inset-x-0 z-50 h-16 md:h-20 transition-all duration-300 ${
          scrolled
            ? "bg-white dark:bg-black shadow-md border-b border-gray-200 dark:border-gray-700"
            : "bg-white/70 dark:bg-black/70 backdrop-blur-md"
        } text-gray-900 dark:text-white`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" aria-label="Home">
            <Image
              src="/logo3.png"
              alt="RV IT Logo"
              width={100}
              height={80}
              className="object-contain"
              priority
            />
            
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6" aria-label="Desktop navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-base font-medium rounded-md transition ${
                  pathname === link.href
                    ? "text-blue-700 dark:text-blue-400 font-semibold underline underline-offset-4"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {mounted ? (
              !loading && user ? (
                <div className="relative">
                  <button
                    ref={profileButtonRef}
                    onClick={() => setUserDropdownOpen((v) => !v)}
                    className="flex items-center space-x-2 focus:outline-none text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover border border-gray-300 shadow-sm"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                        {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                      </div>
                    )}
                    <span className="font-medium">{user.displayName || user.email}</span>
                    <FiChevronDown className={`text-gray-500 dark:text-gray-400 transition-transform ${userDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg py-1 ring-1 ring-black/5 z-50"
                        role="menu"
                      >
                        <Link
                          href="/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          Your Profile
                        </Link>
                        <Link
                          href="/settings"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          Settings
                        </Link>
                        <button
                          onClick={signOut}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-700"
                        >
                          Sign out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("openLoginModal"))}
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-sm transition-all"
                >
                  Login
                </button>
              )
            ) : (
              <div className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden p-2 text-gray-700 dark:text-gray-200 hover:text-blue-700 dark:hover:text-blue-400 focus:outline-none z-50"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25 }}
              className="md:hidden fixed inset-0 bg-white dark:bg-black z-40 flex flex-col px-6 pt-20 space-y-4 text-gray-800 dark:text-gray-100"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 text-lg font-semibold rounded-md ${
                    pathname === link.href
                      ? "text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900"
                      : "text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {mounted ? (
                !loading && user ? (
                  <div className="flex flex-col space-y-4 px-4 mt-4 border-t pt-4 border-gray-200 dark:border-gray-700">
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400"
                    >
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-7 h-7 rounded-full mr-2 border border-gray-300" />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold mr-2">
                          {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                        </div>
                      )}
                      {user.displayName || user.email}
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={signOut}
                      className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      window.dispatchEvent(new CustomEvent("openLoginModal"));
                    }}
                    className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                  >
                    Login
                  </button>
                )
              ) : (
                <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse mt-4" />
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
