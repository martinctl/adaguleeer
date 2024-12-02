'use client';

import { motion } from 'framer-motion';
import { TwitchIcon } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-32">
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
          >
            <TwitchIcon className="h-10 w-10 text-primary" />
          </motion.div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
            YouTube Gaming Trends
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Explore the evolving landscape of gaming content on YouTube through
            interactive visualizations and real-time data analysis.
          </p>
        </motion.div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(255,68,84,0.13),transparent)]" />
    </section>
  );
}