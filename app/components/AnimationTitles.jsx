"use client";
import { motion } from "framer-motion";

function AnimationTitles({ title, className }) {
  const hVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const spanVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.h1
      variants={hVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.5 }} // <-- Change here: no "once", just "amount"
      className={className}
    >
      {title.split("").map((char, index) => (
        <motion.span
          variants={spanVariants}
          key={index}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default AnimationTitles;
