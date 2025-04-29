import React from "react";
import {
  FiCode,
  FiLayers,
  FiSmartphone,
  FiDatabase,
  FiShield,
  FiBarChart2,
} from "react-icons/fi";
import AnimationTitles from "./AnimationTitles";
import Animation from "./Animation";

const Services = () => {
  const services = [
    {
      id: 1,
      icon: <FiCode className="w-8 h-8" />,
      title: "Web Development",
      description:
        "Custom, responsive websites built with modern frameworks for optimal performance and user experience.",
      features: [
        "React/Next.js",
        "Tailwind CSS",
        "REST APIs",
        "Performance Optimization",
      ],
    },
    {
      id: 2,
      icon: <FiSmartphone className="w-8 h-8" />,
      title: "Mobile App Development",
      description:
        "Cross-platform mobile applications that deliver seamless experiences on all devices.",
      features: [
        "React Native",
        "Flutter",
        "iOS & Android",
        "App Store Optimization",
      ],
    },
    {
      id: 3,
      icon: <FiLayers className="w-8 h-8" />,
      title: "UI/UX Design",
      description:
        "Beautiful, intuitive interfaces that drive engagement and improve conversion rates.",
      features: [
        "User Research",
        "Wireframing",
        "Prototyping",
        "Design Systems",
      ],
    },
    {
      id: 4,
      icon: <FiDatabase className="w-8 h-8" />,
      title: "Backend Solutions",
      description:
        "Scalable server architecture and database solutions for your growing business needs.",
      features: ["Node.js", "Python/Django", "MongoDB", "PostgreSQL"],
    },
    {
      id: 5,
      icon: <FiShield className="w-8 h-8" />,
      title: "Cyber Security",
      description:
        "Comprehensive protection for your digital assets and customer data.",
      features: [
        "Penetration Testing",
        "Security Audits",
        "Data Encryption",
        "Compliance",
      ],
    },
    {
      id: 6,
      icon: <FiBarChart2 className="w-8 h-8" />,
      title: "Digital Marketing",
      description:
        "Data-driven strategies to increase your online visibility and customer acquisition.",
      features: ["SEO", "PPC Campaigns", "Content Strategy", "Social Media"],
    },
  ];

  return (
    <section className="bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Animation
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 lg:text-5xl"
            title="Our Services"
          />

          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Comprehensive solutions tailored to meet your business objectives
            and drive growth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative bg-gray-800 rounded-xl p-8 overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl" />

              {/* Service Icon */}
              <div className="text-blue-400 mb-6 group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>

              {/* Service Title with Animation */}
              <AnimationTitles
                className="text-xl font-bold text-white mb-3"
                title={service.title}
              />

              {/* Service Description */}
              <p className="text-gray-300 mb-5">{service.description}</p>

              {/* Features List */}
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-4 h-4 text-blue-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Hover Effect Bottom Border */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-gray-300 mb-6">
            Have a custom project? We specialize in tailored solutions for
            unique business needs.
          </p>
          <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
            Get a Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
