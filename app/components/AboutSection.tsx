"use client";
import React from "react";

export default function DevelopmentPathway() {
  const steps = [
    {
      title: "Discovery & Strategy",
      icon: "🔍",
      description:
        "In-depth analysis of business requirements and technical strategy formulation.",
      details: [
        "Stakeholder interviews",
        "Competitive analysis",
        "Technical feasibility study",
        "Roadmap creation",
      ],
    },
    {
      title: "Agile Development",
      icon: "🔄",
      description:
        "Iterative development process with continuous feedback integration.",
      details: [
        "Sprint planning",
        "Bi-weekly iterations",
        "Continuous integration",
        "Real-time collaboration",
      ],
    },
    {
      title: "Quality Assurance",
      icon: "🧪",
      description:
        "Comprehensive testing at all levels to ensure product excellence.",
      details: [
        "Automated testing",
        "Security audits",
        "Performance testing",
        "User acceptance testing",
      ],
    },
    {
      title: "Deployment",
      icon: "🚀",
      description: "Seamless transition to production with zero downtime.",
      details: [
        "CI/CD pipeline",
        "Blue-green deployment",
        "Load balancing",
        "Rollback strategies",
      ],
    },
    {
      title: "Support & Growth",
      icon: "📈",
      description: "Ongoing optimization and feature enhancement post-launch.",
      details: [
        "24/7 monitoring",
        "Regular updates",
        "Performance tuning",
        "Strategic evolution",
      ],
    },
  ];

  return (
    <section className="py-16 bg-gray-950 text-gray-100 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-cyan-400 sm:text-4xl">
            Our Development Pathway
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            A transparent, results-driven process tailored to your success
          </p>
        </div>

        {/* Timeline vertical path line */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-cyan-500 to-blue-600 transform -translate-x-1/2 z-0" />

        <div className="relative flex flex-col gap-16">
          {steps.map((step, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`
                  md:grid md:grid-cols-2 md:gap-8 relative
                  ${isLeft ? "" : "md:flex-row-reverse"}
                `}
                style={{ zIndex: 1 }}
              >
                {/* Connector line & icon */}
                <div
                  className={`
                    hidden md:flex justify-${isLeft ? "end" : "start"} items-center relative
                  `}
                >
                  <span
                    className={`
                      flex items-center justify-center w-16 h-16 rounded-full border-4
                      ${isLeft ? "border-cyan-400" : "border-blue-500"} 
                      bg-gray-900 shadow-lg text-3xl z-10
                    `}
                  >
                    {step.icon}
                  </span>
                </div>
                {/* Content */}
                <div
                  className={`
                    mt-0 md:mt-0 ${isLeft ? "md:pr-10" : "md:pl-10"}
                    relative
                  `}
                >
                  <div
                    className={`
                      p-6 rounded-xl shadow-xl border-l-4 
                      ${isLeft ? "border-cyan-400 bg-gray-800" : "border-blue-500 bg-gray-900"} 
                      transition-all duration-500
                    `}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-sm font-semibold text-blue-400">
                          Phase {idx + 1}
                        </span>
                        <h3 className="text-xl font-bold text-gray-100 mt-1">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-300">{step.description}</p>
                    <div className="mt-6 animate-fadeIn">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        Key Activities
                      </h4>
                      <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <svg
                              className="flex-shrink-0 h-5 w-5 text-cyan-400 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                            <span className="ml-2 text-gray-200">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* For mobile: show icon above content */}
                <div className="md:hidden flex justify-center mb-4">
                  <span
                    className={`
                      flex items-center justify-center w-14 h-14 rounded-full border-4
                      ${isLeft ? "border-cyan-400" : "border-blue-500"} 
                      bg-gray-900 shadow-lg text-2xl
                    `}
                  >
                    {step.icon}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Animation styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}