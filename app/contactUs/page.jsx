"use client";
import React from "react";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import Image from "next/image";
import contact from "../../public/assets/project1.jpg";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Heading Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-100 mb-4">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Touch
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have a project in mind? Let's collaborate and create something
            extraordinary together.
          </p>
        </div>

        {/* Content Grid - Image Left, Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left Column - Image & Contact Info */}
          <div className="space-y-8">
            <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={contact} // Replace with your image path
                alt="Contact Us"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-100 mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-500/10 p-3 rounded-lg mr-4">
                    <FiMail className="text-blue-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm font-medium">Email</h3>
                    <p className="text-gray-200">contact@tirupati.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-500/10 p-3 rounded-lg mr-4">
                    <FiPhone className="text-blue-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm font-medium">Phone</h3>
                    <p className="text-gray-200">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-500/10 p-3 rounded-lg mr-4">
                    <FiMapPin className="text-blue-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm font-medium">
                      Address
                    </h3>
                    <p className="text-gray-200">
                      Tirupati, Andhra Pradesh - 517501
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Near Tirumala Temple
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg h-fit sticky top-8">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">
              Send Us a Message
            </h2>

            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 group"
              >
                Send Message
                <FiSend className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-100 mb-4">
              Our Location in Tirupati
            </h2>
            <p className="text-gray-300 mb-6">
              Visit us at our office near the sacred Tirumala Temple
            </p>
          </div>
          <div className="h-96 w-full relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3882.036144724644!2d79.4197853158223!3d13.62853399038461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b1b3e1d41a5%3A0x7db200a1a8e9a9a!2sTirumala%20Tirupati%20Balaji%20Temple!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="absolute inset-0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
