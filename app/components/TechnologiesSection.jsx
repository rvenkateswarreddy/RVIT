"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const reasons = [
  {
    title: "Architecture Excellence",
    description: "Future-proof system designs that scale with your business",
    icon: "🏛️",
    highlights: [
      "Modular component design",
      "High-availability systems",
      "Fault-tolerant architectures",
      "Scalable infrastructure"
    ]
  },
  {
    title: "Implementation Mastery",
    description: "Precision execution of complex technical initiatives",
    icon: "⚙️",
    highlights: [
      "Phased deployment strategies",
      "Zero-downtime migrations",
      "Automated provisioning",
      "Continuous optimization"
    ]
  },
  {
    title: "Performance Optimization",
    description: "Systems tuned for maximum efficiency and throughput",
    icon: "🚀",
    highlights: [
      "Latency reduction techniques",
      "Resource utilization analysis",
      "Bottleneck identification",
      "Throughput maximization"
    ]
  },
  {
    title: "Security Integration",
    description: "Protection mechanisms built into every layer",
    icon: "🛡️",
    highlights: [
      "Defense-in-depth approach",
      "Real-time threat monitoring",
      "Compliance frameworks",
      "Data protection protocols"
    ]
  }]


const WhyChooseUs = () => {
  const [activeReason, setActiveReason] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReason((prev) => (prev + 1) % reasons.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-24 px-4 min-h-screen bg-gradient-to-br from-[#090e1a] via-[#13192d] to-[#07080c] overflow-x-hidden text-white"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4 drop-shadow">
            Why Industry Leaders Choose Us
          </h2>
          <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto">
            The RV IT difference: <span className="text-cyan-400">Enterprise expertise</span> meets <span className="text-blue-400">personalized service</span>
          </p>
        </motion.div>

        {/* Timeline Cards: Floating and Overlapping */}
        <div className="relative w-full flex flex-col items-center">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-800 to-blue-800 opacity-30 z-0" />
          {reasons.map((reason, idx) => {
            const isActive = activeReason === idx;
            return (
              <motion.div
                key={reason.title}
                className={`relative w-full md:w-4/5 mx-auto rounded-3xl shadow-2xl z-10
                  transition-all duration-500
                  ${isActive ? "scale-105 bg-gradient-to-br from-[#101c2c] via-[#181f34] to-[#141726] border-2 border-cyan-600/60" : "bg-[#181f34] border border-gray-700 opacity-70"}
                  ${idx % 2 === 0 ? "md:-ml-24 md:self-start" : "md:-mr-24 md:self-end"}
                `}
                style={{
                  marginBottom: idx !== reasons.length - 1 ? "4.5rem" : 0,
                  boxShadow: isActive
                    ? "0 8px 40px 0 rgba(0,255,255,0.10), 0 2px 16px 0 rgba(0,0,0,0.18)"
                    : "0 2px 16px 0 rgba(0,0,0,0.18)",
                  zIndex: isActive ? 50 : 10,
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: idx * 0.17 }}
                onClick={() => setActiveReason(idx)}
              >
                <div className="flex flex-col md:flex-row items-center px-7 py-9 gap-8 cursor-pointer">
                  {/* Icon */}
                  <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 text-5xl rounded-full bg-gradient-to-br from-cyan-900 to-blue-900 shadow-lg border-2 border-cyan-700/40">
                    {reason.icon}
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight text-cyan-300 drop-shadow">
                      {reason.title}
                    </h3>
                    <p className="text-base md:text-lg text-gray-300 mb-4">
                      {reason.description}
                    </p>
                    <ul className="flex flex-wrap gap-3 mt-4">
                      {reason.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-center px-3 py-1.5 text-sm bg-[#232d46] rounded-lg text-cyan-200 font-semibold shadow-sm mr-2 mb-2"
                        >
                          <svg className="w-4 h-4 text-cyan-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Metrics: Neon Dots */}
        <motion.div
          className="flex flex-wrap justify-center gap-10 mt-32"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {[
            { label: "Client Retention", value: "98%" },
            { label: "On-Time Delivery", value: "100%" },
            { label: "Solution Adoption", value: "95%" },
            { label: "Response Time", value: "<2 hrs" }
          ].map((m, i) => (
            <div
              key={i}
              className="relative group flex flex-col items-center"
            >
              <span className={`absolute -top-7 w-4 h-4 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-cyan-300 blur-sm animate-pulse`} />
              <div className="text-3xl font-extrabold text-cyan-400 drop-shadow mb-1 group-hover:scale-110 transition-transform">{m.value}</div>
              <div className="text-gray-300 font-medium tracking-wide text-sm">{m.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Call to Action: Futuristic Glow */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-cyan-300 mb-8 drop-shadow">
            Ready to experience the RV IT difference?
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-10 py-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-500 text-white font-bold rounded-2xl text-lg shadow-lg hover:scale-105 hover:shadow-cyan-400/30 transition-all border border-cyan-400/30">
              Schedule Consultation
            </button>
        
          </div>
        </motion.div>
      </div>
      {/* Subtle floating neon circles for futuristic effect */}
      <span className="pointer-events-none fixed z-0 left-4 top-40 w-32 h-32 bg-cyan-700 opacity-30 rounded-full blur-3xl animate-pulse" />
      <span className="pointer-events-none fixed z-0 right-8 top-1/3 w-24 h-24 bg-blue-700 opacity-20 rounded-full blur-2xl animate-pulse" />
      <span className="pointer-events-none fixed z-0 left-1/2 -translate-x-1/2 bottom-10 w-40 h-40 bg-cyan-600 opacity-25 rounded-full blur-3xl animate-pulse" />
    </section>
  );
};

export default WhyChooseUs;