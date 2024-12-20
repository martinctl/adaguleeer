import { GenresBarChart } from "../subs/genres-bar-chart"
import { GenresChordChart } from "../subs/genres-chord-chart"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef } from "react";


export function Genres() {

    gsap.registerPlugin(useGSAP, ScrollTrigger);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const container = containerRef.current;
        if (!container) return;

        const slides = container.querySelectorAll('.slide');
        slides.forEach((slide, _) => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: slide,
                    start: 'top top',
                    end: '+=100%',
                    scrub: true,
                    pin: true,
                    pinSpacing: false,
                    anticipatePin: 1
                }
            })
                .to(slide, {
                    opacity: 0,
                });
        })


        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section ref={containerRef}>
            <div className="slide w-screen h-screen flex justify-center items-center">
                <div className="w-1/2 p-20">
                    <h4 className="font-bold text-xl mb-6">Genre Occupying YouTube</h4>
                    <p className="text-justify mb-4 text-lg border-l-2 pl-4" style={{ borderColor: '#E54D2E' }}>
                        Let’s start by examining which genres dominate the YouTube landscape.
                        Adventure genre is the most represented on YouTube by far.
                        This is no surprise, this general category encompasses diverse gameplay styles and appeals to a wide audience.
                    </p>
                    <p className="text-justify mb-4 text-lg">
                        However, RPG (Role-Playing Games) and Shooter genres are also very present on the platform.
                        This suggests that a significant portion of YouTube content features intense or violent gameplay, which might not resonate with everyone.
                        If you're not a fan of such themes, you may feel excluded from a large segment of the platform's offerings.
                    </p>
                    <p className="text-justify mb-4 text-lg border-r-2 pr-4" style={{ borderColor: '#E54D2E' }}>
                        More interesting would be to see the links between these genres,
                        because as we said several of them can suit a unique game.
                    </p>
                </div>
                <div className="w-full mt-48">
                    <GenresBarChart />
                </div>
            </div>
            <div className="slide">
                <GenresChordChart />
            </div>
        </section>
    )
}