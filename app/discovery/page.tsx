"use client";
import { useState, useRef, useEffect, JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import InnovationSpotlight from '../components/discovery/InnovationSpotlight'
import TeamHilight from '../components/discovery/TeamHilight'
import FAQSection from '../components/discovery/FAQSection'


const TechnologyIcons: Record<string, JSX.Element> = {
  Blockchain: (
    <svg className="h-14 w-14 text-indigo-400" fill="none" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="22" stroke="currentColor" strokeWidth="4"/>
      <rect x="15" y="15" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="3"/>
    </svg>
  ),
  IoT: (
    <svg className="h-14 w-14 text-red-400" fill="none" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="21" stroke="currentColor" strokeWidth="4"/>
      <circle cx="25" cy="25" r="7" stroke="currentColor" strokeWidth="3"/>
      <circle cx="25" cy="6" r="2" fill="currentColor"/>
      <circle cx="25" cy="44" r="2" fill="currentColor"/>
      <circle cx="6" cy="25" r="2" fill="currentColor"/>
      <circle cx="44" cy="25" r="2" fill="currentColor"/>
    </svg>
  ),
  "AR/VR": (
    <svg className="h-14 w-14 text-yellow-400" fill="none" viewBox="0 0 50 50">
      <rect x="7" y="14" width="36" height="22" rx="7" stroke="currentColor" strokeWidth="4"/>
      <circle cx="16" cy="25" r="4" fill="currentColor"/>
      <circle cx="34" cy="25" r="4" fill="currentColor"/>
    </svg>
  ),
  "Cloud Computing": (
    <svg className="h-14 w-14 text-blue-400" fill="none" viewBox="0 0 50 50">
      <ellipse cx="25" cy="32" rx="15" ry="10" stroke="currentColor" strokeWidth="3"/>
      <ellipse cx="25" cy="22" rx="10" ry="7" stroke="currentColor" strokeWidth="3"/>
    </svg>
  ),
  "AI/ML": (
    <svg className="h-14 w-14 text-purple-400" fill="none" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="18" stroke="currentColor" strokeWidth="3"/>
      <rect x="15" y="15" width="20" height="20" rx="10" stroke="currentColor" strokeWidth="3"/>
      <circle cx="25" cy="25" r="4" fill="currentColor"/>
    </svg>
  ),
  "Big Data": (
    <svg className="h-14 w-14 text-emerald-400" fill="none" viewBox="0 0 50 50">
      <ellipse cx="25" cy="35" rx="15" ry="7" stroke="currentColor" strokeWidth="3"/>
      <ellipse cx="25" cy="25" rx="15" ry="7" stroke="currentColor" strokeWidth="3"/>
      <ellipse cx="25" cy="15" rx="15" ry="7" stroke="currentColor" strokeWidth="3"/>
    </svg>
  ),
  "Cybersecurity": (
    <svg className="h-14 w-14 text-pink-400" fill="none" viewBox="0 0 50 50">
      <rect x="10" y="20" width="30" height="18" rx="5" stroke="currentColor" strokeWidth="3"/>
      <circle cx="25" cy="29" r="4" stroke="currentColor" strokeWidth="3"/>
      <rect x="21" y="33" width="8" height="3" rx="1.5" fill="currentColor"/>
    </svg>
  ),
  "Mobile": (
    <svg className="h-14 w-14 text-cyan-400" fill="none" viewBox="0 0 50 50">
      <rect x="16" y="7" width="18" height="36" rx="4" stroke="currentColor" strokeWidth="3"/>
      <rect x="22" y="38" width="6" height="3" rx="1.5" fill="currentColor"/>
    </svg>
  ),
  "Web": (
    <svg className="h-14 w-14 text-green-400" fill="none" viewBox="0 0 50 50">
      <ellipse cx="25" cy="25" rx="20" ry="20" stroke="currentColor" strokeWidth="3"/>
      <path d="M5 25h40M25 5v40" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  "DevOps": (
    <svg className="h-14 w-14 text-orange-400" fill="none" viewBox="0 0 50 50">
      <circle cx="15" cy="25" r="8" stroke="currentColor" strokeWidth="3"/>
      <circle cx="35" cy="25" r="8" stroke="currentColor" strokeWidth="3"/>
      <path d="M23 25h4" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  "Edge Computing": (
    <svg className="h-14 w-14 text-gray-400" fill="none" viewBox="0 0 50 50">
      <rect x="10" y="16" width="30" height="18" rx="6" stroke="currentColor" strokeWidth="3"/>
      <path d="M25 16v18" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  "5G": (
    <svg className="h-14 w-14 text-pink-400" fill="none" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="21" stroke="currentColor" strokeWidth="3"/>
      <path d="M12 29c2-4 8-9 13-9s11 5 13 9" stroke="currentColor" strokeWidth="2"/>
      <circle cx="25" cy="28" r="3" fill="currentColor"/>
    </svg>
  ),
};

const DiscoveryPage = () => {
  const [activeTab, setActiveTab] = useState('solutions');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Scroll progress effect
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollY / scrollHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Give each card a unique image background, remove color gradient from card backgrounds.
  const discoveryItems = {
    solutions: [
      {
        title: "AI-Powered Analytics",
        description: "Transform raw data into actionable insights. Our analytics solutions empower your teams to make informed decisions faster, uncovering growth opportunities and driving measurable business impact.",
        image: "/assets/Discovery/ai-data-analysis-team.jpg",
      },
      {
        title: "Cloud Architecture",
        description: "Architect and optimize your IT infrastructure for scale, agility, and resilience. We design cloud-native environments that accelerate innovation while ensuring robust security and compliance.",
        image: "/assets/Discovery/saas-concept-collage.jpg",
      },
      {
        title: "Digital Transformation",
        description: "Reimagine how your business operates in the digital age. We partner with you to modernize legacy systems, streamline workflows, and create seamless customer experiences.",
        image: "/assets/Discovery/close-up-hand-holding-smartphone.jpg",
      },
      {
        title: "Cybersecurity Solutions",
        description: "Protect your digital assets with comprehensive threat detection, response, and security architecture tailored to your business.",
        image: "/assets/Discovery/cybersecurity-data-protection-concept.jpg",
      },
      {
        title: "Mobile & Web Development",
        description: "Deliver seamless, engaging digital experiences across platforms—fast, secure, and scalable for every device.",
        image: "/assets/Discovery/representations-user-experience-interface-design.jpg",
      },
      {
        title: "DevOps Automation",
        description: "Accelerate delivery with CI/CD pipelines, automated testing, and state-of-the-art deployment strategies.",
        image: "/assets/Discovery/devops.jpg",
      }
    ],
    industries: [
      {
        title: "Financial Services",
        description: "From automated compliance to real-time payments and personalized banking, we help financial institutions embrace the future of fintech safely and efficiently.",
        image:"/assets/Discovery/Financial.jpg",
      },
      {
        title: "Healthcare",
        description: "Enhance patient outcomes and operational efficiency. Our digital health solutions power telemedicine, predictive analytics, and secure medical data management.",
        image: "/assets/Discovery/Healthcare.jpg",
      },
      {
        title: "Pharma",
        description: "Modernize R&D, streamline clinical trials, and ensure regulatory compliance with our digital pharma solutions.",
        image: "/assets/Discovery/Pharma.jpg",
      },
      {
        title: "Education",
        description: "Empower learning through digital classrooms, adaptive content, and scalable online platforms.",
        image: "/assets/Discovery/Education.jpg",
      },
      {
        title: "Retail & E-Commerce",
        description: "Transform shopping experiences with omnichannel platforms, personalized recommendations, and robust back-end systems.",
        image: "/assets/Discovery/Retail.jpg",
      }
    ],
    technologies: [
      {
        title: "Blockchain",
        description: "Build trust with decentralized ledgers. We develop secure blockchain solutions for supply chain, finance, and more.",
        icon: TechnologyIcons.Blockchain,
        image: "/assets/tech-blockchain.jpg",
      },
      {
        title: "IoT",
        description: "Connect physical and digital worlds. Our IoT experts deliver solutions for smart monitoring, predictive maintenance, and seamless device integration.",
        icon: TechnologyIcons.IoT,
        image: "/assets/tech-iot.jpg",
      },
      {
        title: "AR/VR",
        description: "Bring ideas to life with immersive technologies. We craft AR/VR experiences for training, design, and customer engagement that inspire action.",
        icon: TechnologyIcons["AR/VR"],
        image: "/assets/tech-arvr.jpg",
      },
      {
        title: "Cloud Computing",
        description: "Scale with confidence. Our cloud-native solutions drive agility, security, and reliability.",
        icon: TechnologyIcons["Cloud Computing"],
        image: "/assets/tech-cloud.jpg",
      },
      {
        title: "AI/ML",
        description: "Leverage artificial intelligence and machine learning to automate, predict, and personalize at scale.",
        icon: TechnologyIcons["AI/ML"],
        image: "/assets/tech-aiml.jpg",
      },
      {
        title: "Big Data",
        description: "Process, analyze, and visualize massive data sets to uncover actionable insights.",
        icon: TechnologyIcons["Big Data"],
        image: "/assets/tech-bigdata.jpg",
      },
      {
        title: "Cybersecurity",
        description: "Defend against evolving threats with proactive, layered security approaches.",
        icon: TechnologyIcons["Cybersecurity"],
        image: "/assets/tech-cyber.jpg",
      },
      {
        title: "Mobile",
        description: "Craft intuitive, high-performance mobile apps for iOS and Android.",
        icon: TechnologyIcons["Mobile"],
        image: "/assets/tech-mobile.jpg",
      },
      {
        title: "Web",
        description: "Modern, responsive web applications tailored to your business needs.",
        icon: TechnologyIcons["Web"],
        image: "/assets/tech-web.jpg",
      },
      {
        title: "DevOps",
        description: "Automate, monitor, and accelerate your software delivery lifecycle.",
        icon: TechnologyIcons["DevOps"],
        image: "/assets/tech-devops.jpg",
      },
      {
        title: "Edge Computing",
        description: "Move computation closer to where data is generated, reducing latency and bandwidth.",
        icon: TechnologyIcons["Edge Computing"],
        image: "/assets/tech-edge.jpg",
      },
      {
        title: "5G",
        description: "Enable ultra-fast, low-latency connectivity for next-gen applications and devices.",
        icon: TechnologyIcons["5G"],
        image: "/assets/tech-5g.jpg",
      }
    ]
  };

  const tabs = [
    { id: 'solutions', label: 'Solutions' },
    { id: 'industries', label: 'Industries' },
    { id: 'technologies', label: 'Technologies' }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white" ref={containerRef}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,41,59,0.5),rgba(15,23,42,1))]" />
      </div>

      {/* Scroll Indicator */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 z-50"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Hero Section */}
      <section className="relative py-32 px-4 z-10">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Discover
            </span>{" "}
            <span className="text-white">Possibilities</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Unlock value at every step of your digital journey. We help you imagine, build, and scale with confidence.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="inline-flex p-1 bg-gray-800 rounded-full">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Discovery Grid */}
      <section className="relative  px-4 z-10" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {discoveryItems[activeTab].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative group"
              >
                <div
                  className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-70 blur-lg transition duration-500 group-hover:duration-200"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 h-full">
                  <div
                    className="h-48 flex items-center justify-center"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {activeTab === "technologies" && item.icon ? (
                      <div className="bg-black/40 rounded-full p-4">{item.icon}</div>
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-32 w-32 object-contain mx-auto bg-white/10 rounded-lg shadow"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                    <p className="text-gray-400 mb-6">{item.description}</p>
                    <AnimatePresence>
                      {hoveredCard === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <button className="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:shadow-lg transition-all">
                            Learn More
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* <TechnologiesSection/> */}
      <InnovationSpotlight/>
      <TeamHilight/>
      <FAQSection/>

      

      
    </div>
  );
};

export default DiscoveryPage;