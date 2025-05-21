"use client";

import { useEffect, useState } from "react";
import { auth } from "../../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiUser, FiMail, FiCalendar, FiEdit, FiLogOut } from "react-icons/fi";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-6 text-white">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-lg">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt="Profile"
                    layout="fill"
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-blue-400 flex items-center justify-center text-4xl font-bold">
                    {user.displayName?.charAt(0) || user.email?.charAt(0)}
                  </div>
                )}
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                <h1 className="text-2xl font-bold">{user.displayName || "User"}</h1>
                <p className="text-blue-100">{user.email}</p>
                <p className="text-blue-100 mt-1">
                  Member since {new Date(user.metadata.creationTime).toLocaleDateString()}
                </p>
              </div>
              <button className="mt-4 sm:mt-0 sm:ml-auto flex items-center px-4 py-2 bg-white text-black bg-opacity-20 rounded-md hover:bg-opacity-30 transition">
                <FiEdit className="mr-2" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Personal Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                  <FiUser />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Full Name
                  </h3>
                  <p className="text-gray-800 dark:text-gray-200">
                    {user.displayName || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
                  <FiMail />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Email Address
                  </h3>
                  <p className="text-gray-800 dark:text-gray-200">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
                  <FiCalendar />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Account Created
                  </h3>
                  <p className="text-gray-800 dark:text-gray-200">
                    {new Date(user.metadata.creationTime).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

        
          </div>
        </div>
      </div>
    </div>
  );
}