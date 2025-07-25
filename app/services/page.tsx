"use client";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ProfessionalServices = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const services = [
    {
      title: "AI & Machine Learning",
      description: "Transform your business with custom AI solutions that automate processes and uncover insights.",
      icon: "🤖",
      features: [
        "Predictive analytics",
        "Computer vision",
        "Natural language processing",
        "Recommendation engines"
      ],
      bgColor: "bg-gray-900",
      accentColor: "from-purple-600 to-blue-500"
    },
    {
      title: "Cloud Solutions",
      description: "Scalable, secure cloud infrastructure tailored to your business needs.",
      icon: "☁️",
      features: [
        "AWS/Azure/GCP architecture",
        "Serverless computing",
        "Cloud migration",
        "Hybrid cloud solutions"
      ],
      bgColor: "bg-gray-800",
      accentColor: "from-blue-600 to-cyan-500"
    },
    {
      title: "Recruitment & Staffing",
      description: "Top-tier talent acquisition and workforce solutions for your technical needs.",
      icon: "👔",
      features: [
        "Technical recruitment",
        "Executive search",
        "Contract staffing",
        "Talent pipeline development"
      ],
      bgColor: "bg-gray-900",
      accentColor: "from-amber-600 to-orange-500"
    },
    {
      title: "Corporate Training",
      description: "Upskill your workforce with customized training programs.",
      icon: "🎓",
      features: [
        "Technical skill development",
        "Leadership training",
        "Certification programs",
        "Workshops & bootcamps"
      ],
      bgColor: "bg-gray-800",
      accentColor: "from-green-600 to-emerald-500"
    },
    {
      title: "Project Support",
      description: "Comprehensive support for your critical technology initiatives.",
      icon: "🛠️",
      features: [
        "Project management",
        "Technical consulting",
        "Quality assurance",
        "Implementation support"
      ],
      bgColor: "bg-gray-900",
      accentColor: "from-pink-600 to-rose-500"
    },
    {
      title: "Data Analytics",
      description: "Turn your data into actionable insights with powerful analytics solutions.",
      icon: "📊",
      features: [
        "Business intelligence",
        "Data visualization",
        "ETL pipelines",
        "Real-time analytics"
      ],
      bgColor: "bg-gray-800",
      accentColor: "from-indigo-600 to-blue-500"
    }
  ];

  return (
    <section className="py-0 px-0 bg-gray-950" ref={ref}>
      {/* HERO SECTION WITH BACKGROUND IMAGE */}
      <div className="relative min-h-[450px] flex items-center justify-center overflow-hidden">
        {/* Background image - replace url as needed */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/bg1.png')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 to-blue-900/70"></div>
        </div>
        {/* Hero Content */}
        <motion.div 
          className="relative z-10 w-full text-center py-24 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Enterprise <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Professional Services</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto drop-shadow-md">
            Comprehensive solutions for your most complex business challenges
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 mt-[-60px] relative z-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group relative h-full ${service.bgColor} rounded-xl border border-gray-800 overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.accentColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.accentColor} flex items-center justify-center text-3xl mb-6`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-gray-400 mb-6 flex-grow">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${service.bgColor === 'bg-gray-900' ? 'text-cyan-400' : 'text-blue-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Process Section */}
        <motion.div 
          className="bg-gray-900 rounded-2xl p-8 md:p-12 mb-20 relative overflow-hidden border border-gray-800"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,24,39,0.8),rgba(16,24,39,1))]"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-center mb-12 text-white">
              Our <span className="text-cyan-400">Engagement Model</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Assessment",
                  description: "Comprehensive needs analysis",
                  icon: "🔍"
                },
                {
                  step: "02",
                  title: "Planning",
                  description: "Tailored solution design",
                  icon: "📝"
                },
                {
                  step: "03",
                  title: "Execution",
                  description: "Agile implementation",
                  icon: "⚡"
                },
                {
                  step: "04",
                  title: "Optimization",
                  description: "Continuous improvement",
                  icon: "🔄"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 text-center"
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-lg font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-white">{item.title}</h4>
                  <p className="text-gray-400">{item.description}</p>
                  {index < 3 && (
                    <div className="hidden md:block mt-6">
                      <svg className="w-8 h-8 text-cyan-400/30 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden border border-gray-800"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="absolute inset-0 bg-[url('/patterns/circuit-board.svg')] opacity-10"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4 text-white">Ready to Transform Your Business?</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-400">Our experts are standing by to discuss your unique requirements</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:opacity-90 transition-all transform hover:-translate-y-1 shadow-lg shadow-cyan-500/20">
                Request Consultation
              </button>
              <button className="px-8 py-4 border-2 border-gray-600 text-white font-bold rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-all transform hover:-translate-y-1">
                Contact Our Team
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfessionalServices;