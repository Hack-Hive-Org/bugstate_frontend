"use client";
import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="text-white flex justify-center pt-24 overflow-hidden">
      <div className="flex flex-col items-center text-center space-y-8 max-w-5xl px-6">

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="uppercase font-bold leading-tight
          text-4xl sm:text-5xl md:text-6xl lg:text-8xl
          drop-shadow-[0_0_35px_rgba(0,247,255,0.25)]"
        >
          <span className="text-[#00F7FF] drop-shadow-[0_0_25px_rgba(0,247,255,0.6)]">
            Say
          </span>{" "}
          <span>No</span>{" "}
          <span>To</span>{" "}
          <span className="text-[#FE7F2D] drop-shadow-[0_0_25px_rgba(254,127,45,0.6)]">
            Bugs!
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl"
        >
          Build stable software faster with automated bug tracking & insights.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 pt-6"
        >
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="px-8 py-4 bg-[#4B9DA9] font-semibold
              rounded-tl-lg rounded-br-lg cursor-pointer
              shadow-[0_10px_40px_rgba(75,157,169,0.45)]
              hover:shadow-[0_15px_60px_rgba(75,157,169,0.7)]
              transition"
          >
            Start Tracking
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="px-8 py-4 bg-black font-semibold
              rounded-tl-lg rounded-br-lg border border-white/10
              shadow-[0_8px_30px_rgba(0,0,0,0.6)]
              hover:bg-white/10 transition cursor-pointer"
          >
            Get Demo
          </motion.button>
        </motion.div>

        {/* Trust Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-white/60"
        >
          <span>✓ No credit card required</span>
          <span>✓ Setup in 5 minutes</span>
          <span>✓ Cancel anytime</span>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
