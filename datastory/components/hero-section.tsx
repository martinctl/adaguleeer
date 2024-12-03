"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "./animated-section";
import gsap from "gsap";

export function HeroSection() {
  return (
    <section className="relative min-h-screen max-w-full overflow-hidden bg">
    <AnimatedSection>  
      <div className="title-container relative z-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Gaming on YouTube: Find the community of your dreams!
        </h1>
      </div>

      <div className="hero-container relative z-10 flex flex-col sm:flex-row items-center justify-center sm:justify-between bg px-8 py-0 lg:px-10">

        <div className="text-left mt-0 sm:mt-0 sm:w-1/2 lg:w-1/2 text-gray-200">
          <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
            Welcome young Padawan!
          </h2>

          <p className="text-lg mb-6 text-muted-foreground">
            Do you love watching videos with gaming as one of your main interests?
          </p>
          <p className="text-lg mb-6 text-muted-foreground">
            You would like to engage more on what you are passionate about but feel overwhelmed by the sheer amount of diverse content that doesn't always feel right for you?
          </p>
          <p className="text-lg mb-10 text-white font-semibold">
            Relax, you are in the right place. Hop on board, and let's discover helpful insights to guide you forward to the content and community of your dreams.
          </p>
          <a href="#trends">
            <button className="px-6 py-3 text-lg font-bold text-white bg-primary rounded-lg hover:bg-red-900">
              Start the Adventure
            </button>
          </a>

        </div>

        <div className="mt-0 sm:mt-0 sm:w-1/2 lg:w-2/5">
            <img
              src="/background_hero_page.svg"
              alt="Illustration"
              className="w-full h-auto"
            />
        </div>
      </div>

      <div className="flex justify-center mt-6">
        
      </div>
    </AnimatedSection>
    </section>
  );
}
