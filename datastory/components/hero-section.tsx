"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 -z-10 w-full object-cover"
        style={{ height: "calc(100vh - 50px)" }}
      >
        <source src="/background_hero_page.mp4" type="video/mp4" />
      </video>

      <div className="section-container relative text-center py-20 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-3 text-4xl font-bold tracking-tight sm:text-6xl text">
            Gaming on YouTube
          </h1>
          <h2 className="mb-10 text-3xl font-semibold tracking-tight sm:text-4xl">
            Find the community of your dreams!
          </h2>

          <p className="mx-auto max-w-2xl text-lg font-semibold text-muted-foreground mb-6">
            Do you love watching videos, with gaming as one of your main
            interests?
          </p>
          <p className="mx-auto max-w-2xl text-lg font-semibold text-muted-foreground mb-6">
            Would you like to engage more on what you are passionate about but
            feel overwhelmed by the sheer amount of diverse content that doesn’t
            always feel right for you?
          </p>
          <p className="mx-auto max-w-2xl text-lg font-semibold text-white mb-10">
            Relax, you are in the right place. Hop on board, and let’s discover
            helpful insights to guide you toward the content and community of
            your dreams.
          </p>

          <a href="#trends">
            <button className="px-6 py-3 text-lg font-bold text-white bg-primary rounded-lg hover:bg-red-900">
              Start the Adventure
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
