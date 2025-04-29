"use client";
import { motion } from "framer-motion";

const Animation = ({ title, className }) => {
  const textVariants = {
    hidden: {
      width: "0%",
      opacity: 0,
      letterSpacing: "-0.5em", // Initial tight letter spacing
      scale: 0.95, // Slightly scale down the text
    },
    visible: {
      width: "100%",
      opacity: 1,
      letterSpacing: "0.05em", // Increased letter spacing as it reveals
      scale: 1, // Scale the text to normal size
      transition: {
        duration: 1.5, // Smooth transition duration
        ease: "easeOut",
        staggerChildren: 0.1, // Small delay between each letter
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 30, // Start from a slightly lower position
    },
    visible: {
      opacity: 1,
      y: 0, // Move to its original position
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.h1
      variants={textVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }} // Triggers when half of the element is visible
      className={`${className} overflow-hidden whitespace-nowrap`}
    >
      {title.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default Animation;
