"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookiesBanner({ visible, onAccept }) {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 shadow-lg"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 md:mr-8">
              <h3 className="text-lg font-semibold mb-1">We use cookies</h3>
              <p className="text-sm text-gray-300">
                We use cookies to enhance your experience, analyze traffic, and for authentication purposes. 
                By clicking "Accept", you consent to our use of cookies.
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setIsVisible(false);
                  onAccept();
                }}
                className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 text-sm font-medium"
              >
                Accept
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 text-sm font-medium"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}