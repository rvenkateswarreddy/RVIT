"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  FiHome,
  FiUser,
  FiSettings,
  FiBriefcase,
  FiMail,
  FiX,
  FiMenu,
} from "react-icons/fi";
import Image from "next/image";
import logo from "../../public/ERRTEKNALOZY.jpg"; // Adjust the path to your logo
import { FaChalkboardTeacher, FaSuitcase } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "/", label: "Home", icon: <FiHome /> },
    { id: "/supports", label: "Supports", icon: <FiSettings /> },
    { id: "/trainings", label: "Trainings", icon: <FaChalkboardTeacher /> },
    { id: "/jobs", label: "Jobs", icon: <FiBriefcase /> },
    { id: "/contactUs", label: "Contact", icon: <FiMail /> },
  ];

  const handleLinkClick = (id) => {
    setIsOpen(false);
    router.push(id);
  };

  const mobileMenuVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-900 shadow-lg py-2" : "bg-gray-800 py-4"
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center">
          {/* Brand Logo */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="/"
              className="flex items-center"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("/");
              }}
            >
              <Image
                src={logo}
                alt="ERRTEKNALOZY Logo"
                width={150} // Adjust based on your logo dimensions
                height={50} // Adjust based on your logo dimensions
                className="h-12 w-auto rounded-3xl" // This will maintain aspect ratio
                priority
              />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="flex space-x-10">
              {navLinks.map((link) => (
                <motion.li
                  key={link.id}
                  variants={linkVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <a
                    href={link.id}
                    className={`flex items-center px-3 py-2 text-xl font-medium rounded-md transition-all duration-200 ${
                      pathname === link.id
                        ? "text-white bg-gray-700"
                        : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.id);
                    }}
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-gray-900/90 backdrop-blur-sm z-40 pt-20 mt-18"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <ul className="flex flex-col space-y-4 px-6 py-4">
              {navLinks.map((link) => (
                <motion.li
                  key={link.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <a
                    href={link.id}
                    className={`flex items-center px-4 py-3 text-lg font-medium rounded-md transition-all duration-200 ${
                      pathname === link.id
                        ? "text-white bg-gray-700"
                        : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.id);
                    }}
                  >
                    <span className="mr-3">{link.icon}</span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
