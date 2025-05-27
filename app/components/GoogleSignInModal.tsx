"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { FiZap, FiClock, FiX } from "react-icons/fi";
import { SiGoogle } from "react-icons/si";

export default function GoogleSignInModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, signInWithGoogle } = useAuth();

  // Show modal once per session, only if not logged in
  useEffect(() => {
    if (!user) {
      const shown = sessionStorage.getItem("googleSignInModalShown");
      if (!shown) {
        setIsVisible(true);
        sessionStorage.setItem("googleSignInModalShown", "true");
      }
    }
  }, [user]);

  // If user logs in while modal is visible, close it
  useEffect(() => {
    if (user && isVisible) setIsVisible(false);
  }, [user, isVisible]);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      setIsVisible(false);
    } catch (error) {
      setIsVisible(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && !user && (
        <motion.div
          className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 z-50 w-80"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          role="dialog"
          aria-modal="true"
          aria-label="Google Sign-In"
        >
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-2">
              <FiZap className="text-cyan-600" />
              <span className="text-xs text-gray-400">Real-time & Secure</span>
              <FiClock className="text-green-500 animate-pulse" />
            </div>
            <p className="text-sm font-semibold mb-4 text-gray-500">
              Sign in to continue
            </p>
            <button
              onClick={handleSignIn}
              className="flex items-center justify-center w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all font-medium disabled:opacity-70"
              disabled={loading}
              type="button"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              ) : (
                <SiGoogle className="mr-2 text-lg" />
              )}
              {loading ? "Signing in..." : "Continue with Google"}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="mt-4 text-sm text-gray-500 hover:underline flex items-center"
              type="button"
            >
              <FiX className="mr-1" />
              Close
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}