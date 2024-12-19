import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Text, Flex, Button } from '@radix-ui/themes';
import { RocketIcon } from '@radix-ui/react-icons';
import { ScrollDown } from '../subs/scroll-down';


export function Hero() {

    gsap.registerPlugin(useGSAP, ScrollTrigger);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const container = containerRef.current;
        if (!container) return;

        gsap.timeline({
            scrollTrigger: {
                trigger: "#container",
                start: 'top top',
                end: '+=100%',
                scrub: true,
                pin: true,
                pinSpacing: false
            }
        })
        .to("#container", { 
            opacity: 0,    
        });


        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section ref={containerRef} id="container" className="overflow-hidden h-screen">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 -z-10 w-auto h-screen object-cover"
                src="/background_hero_page.mp4"
            />
            <div className="relative flex flex-col items-center justify-center h-full text-center">
                <Flex direction="column" gap="2">
                    <Text weight="bold" className="mb-5 font-sans text-6xl">
                        Gaming on YouTube
                    </Text>
                    <Text weight="medium" className="mb-12 font-semibold text-4xl">
                        Find the community of your dreams!
                    </Text>
                    <Link href="#intro">
                        <Button size="4" variant="classic">
                            <RocketIcon />
                            Start the adventure
                        </Button>
                    </Link>
                </Flex>
                <ScrollDown />
            </div>
        </section>
    );
}