"use client";
import ImageCarousel from "./components/ImageCarousel";
import AboutSection from "./components/About";
import Team from "./components/Team";
import Services from "./components/Services";
import Projects from "./components/projects";
import Contact from "./components/Contact";
import { useState } from "react";
import { FiMessageSquare, FiX } from "react-icons/fi";
import Head from "next/head";
import aiAssistantIcon from "../public/assets/ERRTEKNALOZY.jpg"; // Renamed for clarity
import Image from "next/image";

export default function Home() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full relative">
      <Head>
        <title>Your Company Name - Home</title>
        <meta name="description" content="Your company description" />
      </Head>

      {/* Image Carousel Section */}
      <div>
        <ImageCarousel />
      </div>

      {/* About Section */}
      <AboutSection />

      <Team />

      <Services />

      <Projects />

      <Contact />

      {/* AI Assistant Floating Button */}
      <div
        className="fixed bottom-8 right-8 z-50 transition-all duration-300"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <button
          onClick={() => setShowChatbot(!showChatbot)}
          className={`bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 ${
            showChatbot ? "rotate-180" : ""
          }`}
          aria-label="AI Assistant"
        >
          {showChatbot ? (
            <FiX className="w-8 h-8 text-gray-800 p-2" />
          ) : (
            <div className="p-1">
              <Image
                src={aiAssistantIcon}
                alt="AI Assistant"
                width={48}
                height={48}
                className="rounded-full object-cover w-12 h-12"
              />
            </div>
          )}
        </button>

        {/* Hover Tooltip */}
        {isHovering && !showChatbot && (
          <div className="absolute right-16 bottom-0 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md whitespace-nowrap">
            <p className="text-sm font-medium">
              AI Assistant - Get instant help with your questions
            </p>
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
          </div>
        )}
      </div>

      {/* Chatbot Panel */}
      {showChatbot && (
        <div className="fixed bottom-24 right-8 w-[40%] h-[70%] bg-white rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-200">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-bold">AI Assistant</h3>
            <button
              onClick={() => setShowChatbot(false)}
              className="text-white hover:text-gray-200"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <div className="h-72 p-4 overflow-y-auto">
            <div className="bg-gray-100 rounded-lg p-3 mb-3">
              <p className="text-sm text-gray-700">
                Hello! I'm your AI assistant. How can I help you today?
              </p>
            </div>
            {/* Chat messages would go here */}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
