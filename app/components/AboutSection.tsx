import Image from 'next/image';
import { useState } from 'react';

type Service = {
  title: string;
  desc: string;
  img: string;
  tag: string;
};

const services: Service[] = [
  // Talent (Recruitment & Staffing)
  {
    title: "Global Recruitment & Staffing",
    desc: "Hire skilled professionals across USA, Canada, Luxembourg, and more. Fast onboarding with flexible hiring.",
    img: "D:\AllREACTPROJECTS\Errtek_Portfolio\public\assets\Home\global.jpg",
    tag: "Talent"
  },
  {
    title: "Executive Hiring",
    desc: "Leadership and C-level hiring services with a global headhunting network.",
    img: "/assets/home/ExecutiveHiring.jpg",
    tag: "Talent"
    
  },
  {
    title: "Contract Staffing",
    desc: "Quickly scale your team with vetted contract workers — short-term or long-term.",
    img: "/assets/home/ContractStaffing.jpg",
    tag: "Talent"
  },

  // Training
  {
    title: "Corporate Skill Training",
    desc: "Customized training for teams — from onboarding to upskilling, designed for company goals.",
    img: "/assets/home/ExecutiveHiring.jpg",
    tag: "Training"
  },
  {
    title: "Tech Bootcamps for Teams",
    desc: "Hands-on workshops for software tools, frameworks, and cloud platforms.",
    img: "/assets/home/bootcamp.jpg",
    tag: "Training"
  },
  {
    title: "Leadership & Communication",
    desc: "Workshops that boost leadership, communication, and agile thinking for managers and teams.",
    img: "/assets/home/leadership1.jpg",
    tag: "Training"
  },

  // Support
  {
    title: "Project-Based Support",
    desc: "On-demand experts for your projects — part-time, full-time, or contract-based support.",
    img: "/assets/home/project.jpg",
    tag: "Support"
  },
  {
    title: "IT Helpdesk & Tech Support",
    desc: "24/7 technical support including L1 and L2 resolution for smooth business operations.",
    img: "/assets/home/Helpdesk.jpg",
    tag: "Support"
  },
  {
    title: "Fully Managed IT Services",
    desc: "Full-cycle IT support with SLAs — includes infrastructure, monitoring, and user support.",
    img: "/assets/home/ITServices.jpg",
    tag: "Support"
  },

  // AI
  {
    title: "Business Automation & AI",
    desc: "Automate tasks, workflows, and reporting with powerful AI-driven tools.",
    img: "/assets/home/businnesAuto.jpg",
    tag: "AI"
  },
  {
    title: "AI Chatbots & Assistants",
    desc: "Deploy chatbots for websites, apps, and internal workflows. Powered by large language models.",
    img: "/assets/home/chatbot.jpg",
    tag: "AI"
  },
  {
    title: "Predictive Data Insights",
    desc: "Turn raw data into actionable insights using AI and machine learning.",
    img: "/assets/home/reprasentation.jpg",
    tag: "AI"
  },

  // Development (6 modern services)
  {
    title: "Web & Mobile App Development",
    desc: "End-to-end development for modern apps and responsive websites.",
    img: "/assets/home/web.jpg",
    tag: "Development"
  },
  {
    title: "Cloud Services (AWS, Azure, GCP)",
    desc: "Migrate, manage, and scale apps in the cloud using major platforms.",
    img: "/assets/home/CloudServices.jpg",
    tag: "Development"
  },
  {
    title: "DevOps & Automation",
    desc: "Set up CI/CD pipelines, manage infrastructure as code, and speed up releases.",
    img: "/assets/home/devops.jpg",
    tag: "Development"
  },
  {
    title: "E-commerce Solutions",
    desc: "We build online stores with Shopify, Magento, WooCommerce and custom platforms.",
    img: "/assets/home/E-commerce.jpg",
    tag: "Development"
  },
  {
    title: "API & Backend Development",
    desc: "Build secure APIs and backend systems using Node.js, Python, Java, and GraphQL.",
    img: "/assets/home/API.jpg",
    tag: "Development"
  },
  {
    title: "UI/UX & Front-End Engineering",
    desc: "Beautiful, fast front-ends built with React, Angular, and Vue.",
    img: "/assets/home/uiux.jpg",
    tag: "Development"
  }
];

const tags = ['Talent', 'Training', 'Support', 'AI', 'Development'];



const ServicesDisplay = () => {
  const [activeTab, setActiveTab] = useState<string>('Talent');
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  // Always show exactly 3 (Development: 6) services per tag
  const getServicesForTag = (tag: string) => {
    if (tag === 'Development') {
      return services.filter(s => s.tag === tag).slice(0, 6);
    }
    return services.filter(s => s.tag === tag).slice(0, 3);
  };

  const filteredServices = getServicesForTag(activeTab);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-900 to-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
        
          <h2 className="mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Our Professional Services
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
            Trusted solutions crafted with three decades of industry experience
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-md shadow-sm bg-gray-800" role="group">
            {tags.map((tag, idx) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTab(tag)}
                className={`px-6 py-3 text-sm font-medium transition-all duration-300 focus:outline-none ${
                  activeTab === tag
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                } ${idx === 0 ? 'rounded-l-lg' : ''} ${
                  idx === tags.length - 1 ? 'rounded-r-lg' : ''
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className={`grid grid-cols-1 ${activeTab === 'Development' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
          {filteredServices.map((service, index) => (
            <div 
              key={index}
              className="relative overflow-hidden rounded-xl shadow-xl group bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 transition-all duration-500 hover:shadow-2xl border border-gray-800"
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
            <div className="relative h-64 overflow-hidden rounded-xl group">
  <Image
    src={service.img}
    alt={service.title}
    layout="fill"
    objectFit="cover"
    objectPosition="center top" // shifts image downward to show more of top part
    className="transition-transform duration-500 group-hover:scale-105"
    draggable={false}
    priority={index < 2}
  />
  
  {/* Overlay gradient */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-gray-900/60" />

  {/* Tag badge */}
  <span className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
    {service.tag}
  </span>
</div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.desc}</p>
                <div className="flex items-center">
                 
                  {hoveredService === index && (
                    <span className="ml-2 text-xs text-blue-400">Good expertise</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-300 mb-6">
            Ready to leverage our three decades of industry experience?
          </p>
          <button className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors duration-300 shadow-lg hover:shadow-indigo-900/60">
            Contact Our Experts
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesDisplay;