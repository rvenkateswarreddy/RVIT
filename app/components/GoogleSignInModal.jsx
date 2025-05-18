"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../FirebaseConfig"; // Firebase setup

export default function GoogleSignInModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the modal only once per session
    const modalShown = localStorage.getItem("googleSignInModalShown");
    if (!modalShown) {
      setIsVisible(true);
      localStorage.setItem("googleSignInModalShown", "true");
    }
  }, []);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setIsVisible(false); // Close the modal on successful sign-in
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 z-50 w-80"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <div className="flex flex-col items-start">
            <p className="text-sm font-semibold mb-4 text-gray-500">
              Sign in to continue
            </p>
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
            >
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.3 0 6.4 1.3 8.7 3.5l6.4-6.4C34.6 3.2 29.6 1 24 1c-9.4 0-17.4 5.8-20.9 13.9l7.3 5.7C12.1 13.7 17.5 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.5 24c0-1.3-.1-2.5-.3-3.7H24v7.1h12.7c-.5 2.5-1.8 4.6-3.7 6.1l6 4.9c3.5-3.2 5.5-7.9 5.5-13.5z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.4 28.6c-1.4-2.7-1.4-5.9 0-8.6v-5H3.1c-2.5 5.1-2.5 11.1 0 16.2l7.3-5.7z"
                />
                <path
                  fill="#34A853"
                  d="M24 47c5.7 0 10.6-1.8 14.1-4.8l-6-4.9c-2.2 1.5-4.9 2.3-8 2.3-6.4 0-11.8-4.1-13.7-9.8l-7.4 5.7C6.6 41.2 14.6 47 24 47z"
                />
              </svg>
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
