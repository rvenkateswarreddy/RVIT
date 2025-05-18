"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CookiesBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (!cookiesAccepted) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 z-50"
    >
      <div className="flex justify-between items-center">
        <p className="text-sm">
          We use cookies to improve your experience. By continuing, you agree to
          our cookie policy.
        </p>
        <button
          onClick={handleAcceptCookies}
          className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
        >
          Accept
        </button>
      </div>
    </motion.div>
  );
}
