"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "./animated-section";
import { Text, Flex, Button } from "@radix-ui/themes";
import { RocketIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function Introduction() {
  return (
    <div>
      <section className="relative overflow-hidden h-screen">
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

        <div className="relative flex flex-col items-center justify-center h-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Flex direction="column" gap="2">
              <Text weight="bold" className="mb-5 font-sans text-6xl">
                Gaming on YouTube
              </Text>
              <Text weight="medium" className="mb-12 font-semibold text-4xl">
                Find the community of your dreams!
              </Text>
              <Link href="#introduction">
                <Button size="4" variant="classic">
                  <RocketIcon />
                  Start the adventure
                </Button>
              </Link>
            </Flex>
          </motion.div>
        </div>
      </section>
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
                className="max-h-full object-cover" // Contrainte stricte sur la hauteur
                style={{
                  height: "100%", // L'image ne dépassera pas la hauteur du conteneur
                }}
              />
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
