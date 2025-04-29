"use client";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand and copyright */}
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <a
              href="/"
              className="text-xl font-semibold text-gray-200 hover:text-gray-100 transition-colors"
            >
              Brand
            </a>
            <p className="mt-2 text-sm text-gray-500">
              © {currentYear} Brand. All rights reserved.
            </p>
          </div>

          {/* Social links */}
          <div className="flex space-x-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Secondary navigation */}
        <div className="mt-8 border-t border-gray-200 pt-8">
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-4">
            <a
              href="/about"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              About
            </a>
            <a
              href="/privacy"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Terms
            </a>
            <a
              href="/contact"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
