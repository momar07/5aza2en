import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{
        scaleX,
        position:        "fixed",
        top:             0,
        left:            0,
        right:           0,
        height:          "3px",
        background:      "linear-gradient(90deg,#7a5418,#C8973A,#E8B96A)",
        transformOrigin: "0%",
        zIndex:          9997,
      }}
    />
  );
}
