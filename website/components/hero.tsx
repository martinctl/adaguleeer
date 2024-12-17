 import { motion } from "framer-motion";
 import { Text, Flex, Button } from "@radix-ui/themes";
 import { RocketIcon } from "@radix-ui/react-icons";
 import Link from "next/link";
 
 export function Hero() {
    return (
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
      );
 }