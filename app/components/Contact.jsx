"use client";
import React from "react";
import Link from "next/link";
import { FiMail, FiPhone, FiArrowRight } from "react-icons/fi";
import Animation from "./Animation";

const Contact = () => {
  return (
    <section className="min-h-screen bg-gray-800  px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-3xl mx-auto text-center">
        {/* Premium Heading */}

        <div className="mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-100 mb-6 leading-tight">
            Let's Build{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Something Remarkable
            </span>{" "}
            Together
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            With 30 years of crafting digital experiences, I bring unparalleled
            expertise to your project. Let's discuss how we can create something
            extraordinary.
          </p>
        </div>

        {/* Contact Information with Icons */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 mb-10">
          <div className="flex items-center justify-center space-x-3">
            <FiMail className="text-blue-400 text-2xl" />
            <span className="text-gray-300 text-lg">hello@example.com</span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <FiPhone className="text-blue-400 text-2xl" />
            <span className="text-gray-300 text-lg">+1 (555) 123-4567</span>
          </div>
        </div>

        {/* Elegant Contact Button */}
        <Link
          href="/contactUs"
          className="group inline-flex items-center justify-center px-10 py-4 bg-transparent border-2 border-blue-500 text-blue-400 font-medium rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 text-lg relative overflow-hidden"
        >
          <span className="relative z-10">Start Your Project</span>
          <FiArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
          <span className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
        </Link>

        {/* Professional Signature */}
        <div className="mt-20 pt-5 border-t border-gray-700">
          <p className="text-gray-400 italic">
            "Quality is not an act, it's a habit." — Aristotle
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
