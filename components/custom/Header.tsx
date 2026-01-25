"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i : any) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

const Header = () => {
  const router = useRouter();
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-between items-center text-white p-6"
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="text-2xl font-bold cursor-pointer
          drop-shadow-[0_0_12px_rgba(0,247,255,0.4)]"
      >
        Bug<span className="text-[#00F7FF]">State</span>
      </motion.div>

      {/* Nav */}
      <div className="uppercase flex space-x-16 font-bold text-sm tracking-wide">
        {["Solutions", "Docs", "Pricing"].map((item, i) => (
          <motion.div
            key={item}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={navItemVariants}
            whileHover="hover"
            className="relative cursor-pointer text-white/80 hover:text-white transition"
          >
            {item}

            {/* Underline */}
            <motion.span
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.25 }}
              className="absolute left-0 -bottom-1 h-0.5 w-full
                bg-linear-to-r from-[#00F7FF] to-[#FE7F2D]
                origin-left"
            />
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/pages/signup")}
        className="text-sm font-semibold cursor-pointer px-5 py-2
          transition-transform
          "
      >
        Get Started
      </motion.div>
    </motion.header>
  );
};

export default Header;
