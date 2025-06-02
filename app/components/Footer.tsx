"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { db } from "../../FirebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const footerLinks = [
  {
    title: "Services",
    links: [
      { name: "Recruitment", href: "/jobs" },
      { name: "Staffing", href: "/staffing" },
      { name: "Project Support", href: "/supports" },
      { name: "Training", href: "/trainings" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contactUs" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
  {
    title: "Connect",
    links: [
      { name: "LinkedIn", href: "" },
      { name: "Twitter", href: "" },
      { name: "Facebook", href: "" },
      { name: "GitHub", href: "" },
    ],
  },
];

// Utility to create a unique key for each footer link even if href is blank
const makeLinkKey = (sectionTitle: string, linkName: string, linkHref: string, index: number) =>
  `${sectionTitle}-${linkName}-${linkHref || "blank"}-${index}`;

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  // Newsletter subscribe state
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isInView && footerRef.current) {
      const sections = footerRef.current.querySelectorAll(".footer-section");
      sections.forEach((section, i) => {
        setTimeout(() => {
          section.classList.add("animate-fadeInUp");
        }, i * 100);
      });
    }
  }, [isInView]);

  // Real-time subscribe handler
  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubscribed(false);
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "newsletter"), {
        email,
        subscribedAt: serverTimestamp(),
      });
      setSubscribed(true);
      setEmail("");
    } catch (err) {
      setError("Failed to subscribe. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Social links with unique keys (all hrefs blank for now, will update later)
  const socialLinks = [
    { name: "Facebook", href: "", icon: "📘" },
    { name: "Twitter", href: "", icon: "🐦" },
    { name: "LinkedIn", href: "", icon: "🔗" },
    { name: "GitHub", href: "", icon: "🐙" },
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-gray-900 border-t border-gray-800 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 relative z-10">
        {/* Top Section */}
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-8">
          {/* Logo and description */}
          <div className="footer-section opacity-0 flex-1 flex flex-col items-center lg:items-start">
            <div className="flex items-center mb-4">
              <Image
                src="/logo3.png"
                alt="RV IT Consulting"
                width={80}
                height={80}
                className="h-20 w-auto"
              />
              <span className="ml-3 text-xl font-bold text-white">
                RV IT Consulting
              </span>
            </div>
            <p className="text-gray-400 text-base text-center lg:text-left">
              Delivering innovative IT solutions through recruitment, staffing,
              project support, and training services.
            </p>
            {/* Newsletter signup */}
            <div className="mt-6 w-full max-w-sm">
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-2 text-center lg:text-left">
                Subscribe to our newsletter
              </h3>
              <form className="flex" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                    setSubscribed(false);
                  }}
                  required
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-r-lg disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
              {error && (
                <div className="text-red-500 text-xs mt-2">{error}</div>
              )}
              {subscribed && (
                <div className="text-green-500 text-xs mt-2">
                  Subscribed successfully!
                </div>
              )}
            </div>
          </div>
          {/* Footer links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 flex-[2]">
            {footerLinks.map((section, i) => (
              <div
                key={section.title}
                className="footer-section opacity-0"
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <li key={makeLinkKey(section.title, link.name, link.href, linkIdx)}>
                      <Link
                        href={link.href || "#"}
                        className="text-base text-gray-400 hover:text-cyan-400 transition-colors flex items-center"
                        target={link.href && link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href && link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {link.name}
                        {link.href && link.href.startsWith("http") && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4 ml-1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/* Bottom section */}
        <div className="mt-16 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-base text-gray-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} RV IT Consulting. All rights reserved.
          </p>
          {/* Social links */}
          <div className="flex space-x-6">
            {socialLinks.map((social, idx) => (
              <Link
                key={`social-${social.name}-${idx}`}
                href={social.href || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors text-xl"
                aria-label={social.name}
              >
                <span className="sr-only">{social.name}</span>
                <span aria-hidden>{social.icon}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}