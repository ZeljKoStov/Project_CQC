import React from "react";
import { motion } from "framer-motion";

const AnimatedTextWord = ({ text }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { delay:4.1 ,staggerChildren: 0.12, delayChildren: 4.1+ 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexDirection:"row",alignItems:"center", justifyContent:"center", marginLeft:"0.7em",Top:"1rem" }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.spam

          variants={child}
          style={{ marginRight: "0.25em", }}
          key={index}
        >
          {word}
        </motion.spam>
      ))}
    </motion.div>
  
  );
};

export default AnimatedTextWord;
