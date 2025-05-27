"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMail, FiLock, FiUser, FiLogIn } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();

  // Listen for the open event
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("openLoginModal", handler);
    return () => window.removeEventListener("openLoginModal", handler);
  }, []);

  // 1. 👇 Auto-close the modal after login or signup (including Google)
  useEffect(() => {
    if (user && isOpen) {
      setIsOpen(false);
      setEmail("");
      setPassword("");
      setName("");
      setError("");
    }
  }, [user, isOpen]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      try {
        if (isLogin) {
          await signInWithEmail(email, password);
        } else {
          await signUpWithEmail(email, password, name);
        }
        // setIsOpen(false); // No need, handled by user effect above!
        // setEmail(""); setPassword(""); setName(""); setError("");
      } catch (err: any) {
        setError(err.message || "An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [isLogin, email, password, name, signInWithEmail, signUpWithEmail]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
            role="dialog"
            aria-modal="true"
            aria-label={isLogin ? "Sign in to your account" : "Create an account"}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              aria-label="Close modal"
            >
              <FiX size={24} />
            </button>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {isLogin ? "Sign in to your account" : "Create an account"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {isLogin ? "Welcome back!" : "Join us today!"}
              </p>
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            <button
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 mb-4"
            >
              <FcGoogle size={20} />
              {isLogin ? "Sign in with Google" : "Sign up with Google"}
            </button>
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
              <span className="mx-4 text-gray-500 dark:text-gray-400 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  "Processing..."
                ) : (
                  <>
                    <FiLogIn className="mr-2" />
                    {isLogin ? "Sign in" : "Sign up"}
                  </>
                )}
              </button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              {isLogin ? (
                <>
                  Dont have an account?
                  <button
                    onClick={() => setIsLogin(false)}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}