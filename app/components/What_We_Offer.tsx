"use client";
import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Real-Time Bug Tracking",
    description:
      "Automatically capture errors, crashes, and logs as they happen across your application.",
    glow: "rgba(0,247,255,0.35)",
  },
  {
    title: "Smart Issue Prioritization",
    description:
      "AI helps you focus on high-impact bugs so you fix what truly matters first.",
    glow: "rgba(254,127,45,0.35)",
  },
  {
    title: "Developer-First Dashboard",
    description:
      "Clean, fast, and intuitive dashboard designed for modern dev workflows.",
    glow: "rgba(75,157,169,0.35)",
  },
  {
    title: "Seamless Integration",
    description:
      "Plug into your existing stack with minimal setup and zero friction.",
    glow: "rgba(139,92,246,0.35)",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i : number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6 },
  }),
};

const WhatWeOffer = () => {
  return (
    <section className="text-white py-28 flex justify-center">
      <div className="max-w-6xl w-full px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-widest text-sm text-[#00F7FF] mb-3">
            What We Offer
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Everything you need to ship
            <span className="text-[#FE7F2D]"> bug-free software</span>
          </h2>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{
                y: -6,
                boxShadow: `0 20px 60px ${feature.glow}`,
              }}
              className="relative bg-black/60 border border-white/10
                rounded-2xl p-8 cursor-pointer transition"
            >
              {/* Glow Layer */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition pointer-events-none"
                style={{
                  boxShadow: `0 0 80px ${feature.glow}`,
                }}
              />

              <h3 className="text-xl font-semibold mb-4">
                {feature.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhatWeOffer;
