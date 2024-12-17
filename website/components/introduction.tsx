"use client";

import { Text, Flex, Button } from '@radix-ui/themes';
import { RocketIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedPieChart } from './animated-pie-chart';
import categoriesData from "@/data/categories.json";

export function Introduction() {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const container = containerRef.current;
        if (!container) return;

        const slides = container.querySelectorAll('.slide');
        slides.forEach((slide, index) => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: slide,
                    start: 'top top',
                    end: '+=100%',
                    scrub: true,
                    pin: true,
                    pinSpacing: index == slides.length - 1 ? true : false,
                }
            })
            .from(slide, { 
                opacity: index == 0 ? 1 : 0,
                y: index == 0 ? 0 : 30,
            })
            .to(slide, { 
                opacity: 0,    
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section ref={containerRef} id="container">
            <div className="slide overflow-hidden h-screen">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 -z-10 w-full h-full object-cover"
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
                        <Link href="#introduction">
                            <Button size="4" variant="classic">
                                <RocketIcon />
                                Start the adventure
                            </Button>
                        </Link>
                    </Flex>
                </div>
            </div>
            <div className="slide h-screen flex items-center justify-around">
                <div className="w-1/3 flex flex-col space-y-5">
                <h4 className="font-bold text-xl">Your Mission, Explorer</h4>
                <p>
                    Your journey begins as an Explorer, where we'll guide you through the fascinating world of gaming on 
                    YouTube. We have analysed a comprehensive amount of YouTube metadata involving ~130k channels with more
                    than 10k subscribers, with videos ranging from 2005 to 2019. As you can see on the right, gaming content
                    is the most popular during this period, that's why we can't wait to make you dive into this world!
                </p>
                </div>
                <div className="w-7/12">
                    <AnimatedPieChart data={categoriesData}/>
                </div>
            </div>
            <div className="slide h-screen flex flex-col items-center justify-center">
                <h4>3-link Rigid Axle Suspension With Coil Spring</h4>
                <p>The long-stroke 3-link suspension is teamed with full-width rigid axles in both the front and rear.
                    This coupled with less variation in ground clearance and high tyre grounding force enables you to
                    conquer the toughest of terrains. With the rigid axle suspension, when an obstacle pushes one wheel
                    up, the axle presses the other down, to increase tyre contact in rough road conditions.</p>
            </div>
            <div className="slide h-screen flex flex-col items-center justify-center">
                <h4>Engine Performance</h4>
                <p>When you are setting forth into the unknown, the responsive 1.5L K15B engine powers you through.
                    Built for off-roading, it generates strong torque throughout a wide RPM range for unstoppable
                    performance.</p>
            </div>
        </section>
    );
}
