"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ height: "calc(100vh - 64px)" }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 -z-10 w-full h-full object-cover"
      >
        <source src="/background_hero_page.mp4" type="video/mp4" />
      </video>

      {/* Centered Content */}
      <div className="relative flex items-center justify-center h-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-6xl">
            Gaming on YouTube
          </h1>
          <h2 className="mb-12 text-3xl font-semibold tracking-tight sm:text-4xl">
            Find the community of your dreams!
          </h2>
          <a href="#introduction">
            <button className="px-6 py-3 text-lg font-bold text-white bg-primary rounded-lg hover:bg-red-900">
              Start the adventure
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
