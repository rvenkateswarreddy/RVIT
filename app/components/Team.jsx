"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter, FaGithub, FaDribbble } from "react-icons/fa";
import AnimationTitles from "./AnimationTitles";
import Animation from "./Animation";

// Import your images
import slide1 from "../../public/slider1.jpg";
import slide2 from "../../public/slider2.jpg";
import slide3 from "../../public/slider1.jpg";
import slide4 from "../../public/assets/kesava.jpg";

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Venkateswarreddy R",
      role: "CEO & Founder",
      image: slide1,
      bio: "Visionary leader with 15+ years of industry experience driving company strategy and growth.",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
      },
    },
    {
      id: 2,
      name: "B Sai School Yadav",
      role: "CTO",
      image: slide3,
      bio: "Technology expert specializing in scalable architecture and innovative solutions.",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
      },
    },
    {
      id: 3,
      name: "Subbarayudu Rajupalem",
      role: "Lead Designer",
      image: slide2,
      bio: "Award-winning designer focused on creating exceptional user experiences.",
      social: {
        linkedin: "#",
        dribbble: "#",
        twitter: "#",
      },
    },
    {
      id: 4,
      name: "Kesava Busagani",
      role: "Marketing Director",
      image: slide4,
      bio: "Digital marketing strategist with expertise in brand development and growth marketing.",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
  ];

  const SocialIcon = ({ platform, url }) => {
    const icons = {
      linkedin: <FaLinkedin className="text-lg" />,
      twitter: <FaTwitter className="text-lg" />,
      github: <FaGithub className="text-lg" />,
      dribbble: <FaDribbble className="text-lg" />,
    };

    return (
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white transition-colors duration-300"
        aria-label={`${platform} profile`}
        whileHover={{ y: -3, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {icons[platform]}
      </motion.a>
    );
  };

  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <section className="bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <Animation
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
            title="Meet Our Team"
          />
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }}
          >
            Our team of talented professionals brings diverse expertise and
            passion to deliver exceptional results.
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="group"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: false, amount: 0.2 }}
              variants={cardVariants}
              custom={index}
            >
              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                {/* Team Member Image */}
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                </div>

                {/* Team Member Info */}
                <div className="p-6 flex-grow flex flex-col">
                  <AnimationTitles
                    className="text-2xl font-bold text-white mb-1"
                    title={member.name}
                  />
                  <motion.p
                    className="text-blue-400 mb-4 font-medium"
                    whileHover={{ x: 5 }}
                  >
                    {member.role}
                  </motion.p>
                  <p className="text-gray-300 mb-6 flex-grow">{member.bio}</p>

                  {/* Social Links */}
                  <div className="flex space-x-4 mt-auto">
                    {Object.entries(member.social).map(([platform, url]) => (
                      <SocialIcon
                        key={platform}
                        platform={platform}
                        url={url}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          <p className="text-gray-300 mb-6 text-lg">
            Want to join our talented team? We're always looking for passionate
            individuals.
          </p>
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">View Open Positions</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
