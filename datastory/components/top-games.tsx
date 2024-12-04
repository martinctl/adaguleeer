'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Game {
    id: number;
    title: string;
    genre: string;
    studio: string;
    backgroundClip: string;
}

const games: Game[] = [
    { id: 1, title: 'Grand Theft Auto V', genre: 'Cars', studio: 'Rockstar', backgroundClip: '/videos/gta.mp4' },
    { id: 2, title: 'League of Legends', genre: 'Strategy',  studio: 'Riot Games', backgroundClip: '/videos/lol.mp4' },
    { id: 3, title: 'Roblox', genre: 'Sandbox', studio: 'Roblox Corporation', backgroundClip: '/videos/roblox.mp4' },
    { id: 4, title: 'Call of Duty', genre: 'RPG', studio: 'Activision', backgroundClip: '/videos/cod.mp4' },
    { id: 5, title: 'Fortnite', genre: 'Battle Royale', studio: 'Epic Games', backgroundClip: '/videos/fortnite.mp4' },
    { id: 6, title: 'Minecraft', genre: 'Sandbox', studio: 'Mojang', backgroundClip: '/videos/minecraft.mp4' },
];

export function GameReveal() {
    gsap.registerPlugin(useGSAP, ScrollTrigger);

    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const container = containerRef.current;
        if (!container) return;

        const cards = container.querySelectorAll('.game-card');
        cards.forEach((card, index) => {
            const textElements = card.querySelectorAll(".text-animation");
            gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: 'top top',
                    end: '+=100%',
                    scrub: true,
                    pin: true,
                    pinSpacing: index == cards.length - 1 ? true : false,
                }
            })
            .from(card, { 
                opacity: 0,
                duration: 0.2,
                ease: "power2.out",
            })
            .from(textElements, {
                    opacity: 0,
                    y: 30,
                    stagger: 0.1,
                    duration: 0.5,
                    ease: "power2.out",
                },"-=0.3"
            )
            .to(card, { 
                opacity: 0,
                duration: 0.2,
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [games]);

    return (
        <div ref={containerRef} className="">
            {games.map((game, index) => (
                <div key={game.id} className={`relative w-full h-auto game-card bg-black overflow-hidden rounded-lg shadow-lg`}>
                    <video 
                        src={game.backgroundClip} 
                        autoPlay playsInline 
                        loop muted 
                        className="w-full h-auto object-cover brightness-50"
                    >
                        Your browser does not support the video tag.
                    </video>
                    {/* <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 text-center text-white">
                        <h3 className="title text-xl font-bold text-animation">{game.title}</h3>
                        <p className="text-animation">Genre: {game.genre}</p>
                        <p className="text-animation">Studio: {game.studio}</p>
                    </div> */}
                    <div className="text-animation absolute bottom-4 left-4">
                        <p className="text-4xl font-pixel">{games.length - index}</p>
                        <p className="text-2xl font-pixel">{game.title}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
