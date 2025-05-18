"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../FirebaseConfig"; // Firebase setup

export default function LoginModal({ isOpen, onClose }) {
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and register views

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Logged in with Google:", result.user);
      onClose(); // Close modal on successful login
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Logged in with Email:", userCredential.user);
      onClose(); // Close modal on successful login
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (fullName, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Registered with Email:", userCredential.user);
      // Save full name to user profile if necessary
      onClose(); // Close modal on successful registration
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gray-900 text-white rounded-lg shadow-lg p-8 max-w-2xl w-full flex relative"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
        >
          {/* Close Icon */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            ✕
          </button>

          {/* Left Section */}
          <div className="w-1/2 border-r border-gray-700 pr-6">
            <h1 className="text-3xl font-bold mb-2 text-center text-red-500">
              RV IT Consulting
            </h1>
            <p className="text-center text-gray-400 mb-6">
              A place to turn your ideas into reality.
            </p>
            <p className="text-sm text-gray-400 mb-4">
              By continuing, you indicate that you agree to RV IT Consulting's{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="space-y-4">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-all"
              >
                Continue with Google
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-1/2 pl-6">
            {isRegistering ? (
              // Registration Form
              <>
                <h2 className="text-xl font-semibold mb-4 text-white">
                  Register
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const fullName = e.target.fullName.value;
                    const email = e.target.email.value;
                    const password = e.target.password.value;
                    handleRegister(fullName, email, password);
                  }}
                >
                  <div className="mb-4">
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-400"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      placeholder="Your full name"
                      className="w-full px-3 py-2 mt-1 border border-gray-600 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-400"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Your email"
                      className="w-full px-3 py-2 mt-1 border border-gray-600 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-400"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Your password"
                      className="w-full px-3 py-2 mt-1 border border-gray-600 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
                  >
                    Register
                  </button>
                </form>
                <p className="text-sm text-gray-400 mt-6">
                  Already have an account?{" "}
                  <span
                    onClick={() => setIsRegistering(false)}
                    className="text-blue-500 hover:underline cursor-pointer"
                  >
                    Login
                  </span>
                </p>
              </>
            ) : (
              // Login Form
              <>
                <h2 className="text-xl font-semibold mb-4 text-white">Login</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const email = e.target.email.value;
                    const password = e.target.password.value;
                    handleEmailLogin(email, password);
                  }}
                >
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-400"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Your email"
                      className="w-full px-3 py-2 mt-1 border border-gray-600 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-400"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Your password"
                      className="w-full px-3 py-2 mt-1 border border-gray-600 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
                  >
                    Login
                  </button>
                </form>
                <p className="text-sm text-gray-400 mt-6">
                  Don’t have an account?{" "}
                  <span
                    onClick={() => setIsRegistering(true)}
                    className="text-blue-500 hover:underline cursor-pointer"
                  >
                    Register
                  </span>
                </p>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
