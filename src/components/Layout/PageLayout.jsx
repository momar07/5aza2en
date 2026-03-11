import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0,  transition: { duration: 0.5, ease: "easeOut" } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn"  } },
};

export default function PageLayout({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"
      className="min-h-screen flex flex-col" style={{ background: "var(--dark)" }}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </motion.div>
  );
}
