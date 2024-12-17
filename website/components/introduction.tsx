"use client";

import { AnimatedSection } from "./animated-section";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Introduction() {
  return (
    <div>
      <section
        id="introduction"
        className="section-container relative scroll-mt-30"
      >
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            {/* Texte à gauche */}
            <div className="sm:w-1/2 text-gray-200">
              <h2 className="text-3xl font-bold tracking-tight text-white mb-6">
                Welcome young Padawan!
              </h2>
              <p className="text-lg mb-6 text-muted-foreground">
                Do you love watching videos with gaming as one of your main interests?
              </p>
              <p className="text-lg mb-6 text-muted-foreground">
                You would like to engage more on what you are passionate about but feel overwhelmed
                by the sheer amount of diverse content that doesn't always feel right for you?
              </p>
              <p className="text-lg text-white font-semibold">
                Relax, you are in the right place. Hop on board, and let's discover helpful insights
                to guide you forward to the content and community of your dreams.
              </p>
            </div>

            {/* Image à droite */}
            <div
              className="relative sm:w-1/2 lg:w-2/5 flex items-center justify-center h-full"
            >
              <img
                src="/background_hero_page.svg"
                alt="Illustration"
                className="max-h-full object-cover"
                style={{
                  height: "100%",
                }}
              />
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
