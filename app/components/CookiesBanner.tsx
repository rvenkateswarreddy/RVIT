"use client";
import { useState, useEffect } from "react";

export default function CookiesBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookiesAccepted")) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 flex items-center justify-between bg-gray-800 text-gray-100 px-6 py-4 shadow-lg">
      <span>
        We use cookies to improve your experience. See our{" "}
        <a href="/cookie-policy" className="underline text-blue-400">
          cookie policy
        </a>
        .
      </span>
      <button
        onClick={handleAccept}
        className="ml-4 px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition"
      >
        Accept
      </button>
    </div>
  );
}