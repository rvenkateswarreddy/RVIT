"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Example hero background image (replace with your own)
const HERO_BG = "/assets/bg1.png"; // Place a suitable image in public/assets/bg1.png

const departments = [
  { id: "engineering", name: "Engineering" },
  { id: "design", name: "Design" },
  { id: "product", name: "Product" },
  { id: "sales", name: "Sales" },
  { id: "marketing", name: "Marketing" },
];

// All jobs are remote, so reflect that in the openings and content.
const jobOpenings = {
  engineering: [
    {
      title: "Senior Frontend Engineer",
      type: "Full-time",
      location: "Remote",
      description:
        "Help us build seamless, accessible user interfaces using React and Next.js in a remote-first, async-friendly team.",
    },
    {
      title: "DevOps Engineer",
      type: "Full-time",
      location: "Remote",
      description:
        "Automate, optimize, and support global cloud infrastructure—work from anywhere, collaborate online, deliver real impact.",
    },
    {
      title: "Backend Developer",
      type: "Full-time",
      location: "Remote",
      description:
        "Design and maintain scalable, secure APIs and services. Collaborate across time zones, shape our backend architecture.",
    },
  ],
  design: [
    {
      title: "UX Designer",
      type: "Full-time",
      location: "Remote",
      description:
        "Design intuitive, delightful digital experiences for users worldwide—flexibility, creativity, and autonomy encouraged.",
    },
    {
      title: "UI Designer",
      type: "Contract",
      location: "Remote",
      description:
        "Transform ideas into clean, modern interfaces. Collaborate with remote product and engineering teams.",
    },
  ],
  product: [
    {
      title: "Product Manager",
      type: "Full-time",
      location: "Remote",
      description:
        "Drive product strategy and execution in a distributed team. Influence, lead, and deliver—wherever you are.",
    },
  ],
  sales: [
    {
      title: "Sales Executive",
      type: "Full-time",
      location: "Remote",
      description:
        "Build relationships, grow partnerships, and connect with clients—all from wherever you work best.",
    },
  ],
  marketing: [
    {
      title: "Content Marketer",
      type: "Full-time",
      location: "Remote",
      description:
        "Create engaging content and tell our story. Enjoy remote work and a culture that values your voice.",
    },
  ],
};

const benefits = [
  {
    title: "Truly Remote",
    description: "Work from anywhere, always. No office, no commute, just great work.",
    icon: "/assets/bg2.png",
  },
  {
    title: "Flexible Hours",
    description: "Set your schedule. We care about output, not hours.",
    icon: "/assets/bg1.png",
  },
  {
    title: "Learning Budget",
    description: "Yearly stipend for courses, books, and conferences.",
    icon: "/assets/bg3.png",
  },
  {
    title: "Health Coverage",
    description: "Comprehensive health, dental, and vision plans (country dependent).",
    icon: "/assets/bg2.png",
  },
  {
    title: "Team Meetups",
    description: "Optional annual offsite—connect, learn, and have fun in person.",
    icon: "/assets/bg1.png",
  },
  {
    title: "Modern Tech",
    description: "Latest hardware and tools to do your best work.",
    icon: "/assets/bg4.jpg",
  }
];

const cultureBullets = [
  "Async-first, documentation-driven processes",
  "Open, collaborative communication",
  "Flat structure—your ideas matter",
  "Diverse team, inclusive environment",
];

const galleryImages = [
  "/assets/bg1.png",
  "/assets/bg2.png",
"/assets/bg3.png",
 "/assets/bg4.jpg"
];

export default function CareersPage() {
  const [activeDepartment, setActiveDepartment] = useState("engineering");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
  });
  const [isApplying, setIsApplying] = useState(false);
  const formRef = useRef(null);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApply = (jobTitle) => {
    setFormData((prev) => ({ ...prev, role: jobTitle }));
    setIsApplying(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <section
        className="relative py-32 px-4 flex items-center min-h-[60vh] overflow-hidden"
        style={{
          background: `linear-gradient(rgba(12,18,32,0.94),rgba(12,20,40,.98)), url('${HERO_BG}') center/cover no-repeat`,
        }}
      >
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
          >
            Remote-First Careers
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.2 }}
          >
            Work from anywhere. Build things that matter.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.4 }}
          >
            <button
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold rounded-full shadow-lg hover:scale-105 hover:from-fuchsia-500 hover:to-cyan-400 transition-all duration-300 text-lg"
              onClick={() => {
                setIsApplying(false);
                setTimeout(() => {
                  formRef.current?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
            >
              General Application
            </button>
          </motion.div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#161a23] via-[#202a36] to-[#090e13]" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-400">
              Join our distributed team
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              All positions are remote. Work with talented people globally and make an impact from wherever you are.
            </p>
          </motion.div>

          {/* Department Tabs */}
          <motion.div
            className="flex gap-2 flex-wrap justify-center mb-10"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveDepartment(dept.id)}
                className={`px-6 py-2 font-semibold rounded-full border-2 transition-all duration-200 text-base shadow
                  ${
                    activeDepartment === dept.id
                      ? "bg-gradient-to-tr from-cyan-500 to-fuchsia-500 border-transparent text-white scale-105"
                      : "bg-black/70 border-gray-700 text-gray-300 hover:bg-gradient-to-r hover:from-cyan-900 hover:to-fuchsia-900 hover:text-white"
                  }`}
              >
                {dept.name}
              </button>
            ))}
          </motion.div>

          {/* Job Listings */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {jobOpenings[activeDepartment].map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{
                  y: -6,
                  boxShadow:
                    "0 8px 40px 0 rgba(32,255,255,0.07),0 1.5px 5px 0 rgba(245,0,255,0.06)",
                }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="bg-gradient-to-br from-[#22273a] to-[#13171f] rounded-2xl shadow-xl overflow-hidden border border-cyan-800/30 group transition-transform duration-300"
              >
                <div className="p-8">
                  <h3 className="text-lg font-bold mb-2 text-cyan-300">
                    {job.title}
                  </h3>
                  <div className="flex items-center text-gray-400 mb-3 gap-4 font-medium text-xs">
                    <span className="flex items-center gap-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-400 mr-1"></span>
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 inline mr-1 opacity-60"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      Remote
                    </span>
                  </div>
                  <p className="text-gray-200 mb-7">{job.description}</p>

                  <AnimatePresence>
                    {hoveredCard === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <button
                          className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white rounded-xl font-semibold hover:from-fuchsia-500 hover:to-cyan-500 transition-all"
                          onClick={() => handleApply(job.title)}
                        >
                          Apply Now
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#181c27] via-[#151a22] to-[#11141a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-400">
              Benefits
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              We make remote work rewarding and sustainable.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.06 }}
                whileHover={{ y: -6, scale: 1.04 }}
                className="bg-gradient-to-bl from-[#181c27] to-[#141923] rounded-2xl p-8 shadow-lg border border-cyan-800/20 flex flex-col items-center text-center group"
              >
                <div className="mb-5 h-14 w-14 flex items-center justify-center rounded-full bg-cyan-900/20 group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={benefit.icon}
                    alt={benefit.title}
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold mb-2 text-cyan-200">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-base">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-20 px-4 bg-gradient-to-t from-[#161a23] via-[#181b24] to-[#232946]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-7 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-400">
                Our Culture
              </h2>
              <p className="text-lg text-gray-400 mb-7">
                We work asynchronously, value clear written communication, and trust each other to do great work.
              </p>
              <ul className="space-y-5">
                {cultureBullets.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-3">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-400 flex items-center justify-center text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {galleryImages.map((img, index) => (
                <motion.div
                  key={index}
                  className={`${
                    index === 0 ? "rounded-tl-2xl" : ""
                  } ${index === 1 ? "rounded-tr-2xl" : ""} ${
                    index === 2 ? "rounded-bl-2xl" : ""
                  } ${index === 3 ? "rounded-br-2xl" : ""} overflow-hidden aspect-square`}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={img}
                    alt="Company culture"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section
        className="py-20 px-4 bg-gradient-to-tr from-fuchsia-900/90 via-cyan-900/80 to-black/95"
        ref={formRef}
      >
        <div className="max-w-2xl mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-400"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            {isApplying && formData.role
              ? `Apply for ${formData.role}`
              : "Send us your application"}
          </motion.h2>
          <motion.form
            className="grid grid-cols-1 md:grid-cols-2 gap-7"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={(e) => {
              e.preventDefault();
              // handle submit
            }}
          >
            <div className="md:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 font-semibold text-cyan-300"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-5 py-3 rounded-lg bg-black/70 border border-cyan-800 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 font-medium"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 font-semibold text-cyan-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-5 py-3 rounded-lg bg-black/70 border border-cyan-800 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 font-medium"
                required
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block mb-2 font-semibold text-cyan-300"
              >
                Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-5 py-3 rounded-lg bg-black/70 border border-cyan-800 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 font-medium"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 font-semibold text-cyan-300"
              >
                Cover Letter / Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="5"
                className="w-full px-5 py-3 rounded-lg bg-black/70 border border-cyan-800 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 font-medium"
                required
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block mb-4">
                <input type="file" className="hidden" />
                <div className="px-5 py-3 rounded-lg bg-gradient-to-r from-cyan-800 to-fuchsia-800 border border-cyan-800 cursor-pointer hover:bg-cyan-900 transition-colors text-white text-center font-semibold">
                  Upload Resume/CV
                </div>
              </label>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold rounded-full hover:from-fuchsia-500 hover:to-cyan-500 hover:scale-105 shadow-lg transition-all duration-300 text-lg"
              >
                Submit Application
              </button>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
}