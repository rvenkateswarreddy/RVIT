"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function GoogleSignInModal() {
  const [isVisible, setIsVisible] = useState(false);
  const { user, signInWithGoogle } = useAuth();

  // Show modal once per session, but only if not logged in
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
    try {
      await signInWithGoogle();
      setIsVisible(false);
    } catch (error) {
      setIsVisible(false);
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
            <p className="text-sm font-semibold mb-4 text-gray-500">
              Sign in to continue
            </p>
            <button
              onClick={handleSignIn}
              className="flex items-center justify-center w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
            >
              {/* SVG omitted for brevity */}
              Continue with Google
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="mt-4 text-sm text-gray-500 hover:underline"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}