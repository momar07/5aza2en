import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const variants = {
  up:    { hidden: { opacity:0, y:50  }, visible: { opacity:1, y:0  } },
  down:  { hidden: { opacity:0, y:-50 }, visible: { opacity:1, y:0  } },
  left:  { hidden: { opacity:0, x:50  }, visible: { opacity:1, x:0  } },
  right: { hidden: { opacity:0, x:-50 }, visible: { opacity:1, x:0  } },
  scale: { hidden: { opacity:0, scale:0.85 }, visible: { opacity:1, scale:1 } },
  fade:  { hidden: { opacity:0 }, visible: { opacity:1 } },
};

export default function AnimatedSection({
  children,
  className = "",
  delay     = 0,
  direction = "up",
  duration  = 0.7,
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const v      = variants[direction] || variants.up;

  return (
    <motion.div
      ref={ref}
      variants={v}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
