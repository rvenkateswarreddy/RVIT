'use client';

import { FaSearch, FaUserTie, FaHandshake, FaChartLine } from 'react-icons/fa';

export default function RecruitmentSection() {
  const recruitmentServices = [
    {
      icon: <FaSearch className="text-2xl text-blue-400" />,
      title: "Talent Acquisition",
      description: "We identify and attract top IT professionals with specialized skills for your organization."
    },
    {
      icon: <FaUserTie className="text-2xl text-blue-400" />,
      title: "Executive Search",
      description: "Strategic recruitment of C-level and senior IT leadership to drive your digital transformation."
    },
    {
      icon: <FaHandshake className="text-2xl text-blue-400" />,
      title: "Contract Staffing",
      description: "Flexible staffing solutions for project-based work or temporary skill gaps."
    },
    {
      icon: <FaChartLine className="text-2xl text-blue-400" />,
      title: "Workforce Planning",
      description: "Data-driven strategies to align your talent pipeline with business objectives."
    }
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            IT Recruitment Solutions
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connecting exceptional IT talent with innovative organizations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {recruitmentServices.map((service, index) => (
            <div 
              key={index}
              className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300 hover:-translate-y-2 shadow-lg border border-gray-700"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 rounded-xl p-8 md:p-12 border border-gray-700 shadow-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold text-white mb-4">Why Partner With Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="flex-shrink-0 w-5 h-5 text-blue-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Deep understanding of IT skill requirements</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 w-5 h-5 text-blue-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Extensive network of pre-vetted professionals</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 w-5 h-5 text-blue-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Competitive placement rates</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 w-5 h-5 text-blue-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">90-day replacement guarantee</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 bg-gray-700 rounded-lg p-6 border border-gray-600">
              <h4 className="text-xl font-semibold text-white mb-4">Request Talent</h4>
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <select className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
<option value="">Select Service Needed</option>

<option value="permanent">
  Permanent Recruitment – Hiring full-time employees for long-term roles
</option>

<option value="contract">
  Contract Staffing - Providing skilled professionals on a short-term or project basis
</option>

<option value="executive">
  Executive Search - Finding top-level leaders (CEO, CTO, etc.) for your organization
</option>

<option value="consulting">
  Consulting Services -  Career opportunities, support, trainings, and development projects
</option>

    </select>
   </div>
    <button 
           type="submit" 
        >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* <div className="mt-12 text-center">
          <button className="bg-transparent hover:bg-blue-600 text-blue-400 font-medium py-3 px-8 rounded-lg border-2 border-blue-400 hover:text-white transition-all duration-300 inline-flex items-center">
            View Current Candidates
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div> */}
      </div>
    </section>
  );
}