"use client";

export default function AboutSection() {
  return (
    <section className="relative bg-gray-950 text-white py-16 px-6 md:px-12 lg:px-24 xl:px-36">
      <div className="max-w-screen-xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-snug">
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              About RV IT Consulting
            </span>
          </h2>
          <p className="text-lg sm:text-xl mt-4 text-gray-300">
            Empowering businesses with global IT solutions, expertise, and
            innovation.
          </p>
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 blur-xl opacity-40 rounded-lg" />
            <img
              src="/assets/globe.png"
              alt="Global IT Consulting"
              className="relative z-10 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-500"
            />
          </div>

          {/* Text Section */}
          <div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
              Driving Growth Through IT Excellence
            </h3>
            <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed">
              At RV IT Consulting, we deliver innovative and tailored IT
              solutions that help organizations thrive in the digital era. With
              expertise in recruitment, project management, technical training,
              and remote service delivery, we empower businesses to achieve
              their global technology goals.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="flex items-center justify-center w-6 h-6 mr-3 bg-blue-600 rounded-full text-white font-bold">
                  ✓
                </span>
                <p>Global Recruitment and Staffing Solutions</p>
              </li>
              <li className="flex items-center">
                <span className="flex items-center justify-center w-6 h-6 mr-3 bg-blue-600 rounded-full text-white font-bold">
                  ✓
                </span>
                <p>Comprehensive Project Support and Management</p>
              </li>
              <li className="flex items-center">
                <span className="flex items-center justify-center w-6 h-6 mr-3 bg-blue-600 rounded-full text-white font-bold">
                  ✓
                </span>
                <p>Tailored Technical Training Programs</p>
              </li>
              <li className="flex items-center">
                <span className="flex items-center justify-center w-6 h-6 mr-3 bg-blue-600 rounded-full text-white font-bold">
                  ✓
                </span>
                <p>Efficient Contract and Remote Project Delivery</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
