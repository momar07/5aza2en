import React from "react";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "#0a0a0a" }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1,   opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mb-8"
      >
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#7a5418,#C8973A,#E8B96A)" }}
        >
          <span className="text-black font-black text-4xl" style={{ fontFamily: "Cairo,sans-serif" }}>خ</span>
        </div>
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: "2px solid rgba(200,151,58,0.5)" }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ delay: 0.4 }}
        className="text-xl font-bold mb-1"
        style={{ color: "#C8973A", fontFamily: "Cairo,sans-serif" }}
      >
        خبراء الخزائن
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.7 }}
        className="text-sm tracking-widest uppercase"
        style={{ color: "#888", fontFamily: "Cormorant Garamond,serif", letterSpacing: "0.3em" }}
      >
        Khobara Khazaen
      </motion.p>

      <motion.div
        className="mt-10 w-48 h-0.5 rounded-full overflow-hidden"
        style={{ background: "rgba(200,151,58,0.15)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg,#7a5418,#C8973A,#E8B96A)" }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}
