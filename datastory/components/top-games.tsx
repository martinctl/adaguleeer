'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

  export function SampleLineChart() {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Game Popularity',
          data: [30, 45, 28, 80, 56, 70],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 2,
          pointRadius: 4,
          tension: 0.4, // Smooth curve
        },
      ],
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            color: '#ddd',
          },
        },
      },
    };
  
    return (
      <div style={{ height: '300px' }}>
        <Line data={data} options={options} />
      </div>
    );
  }



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
            const overlay = card.querySelector('.overlay');
            const textAnimation = card.querySelector('.text-animation');
            gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: 'top top',
                    end: '+=100%',
                    scrub: true,
                    pin: true,
                    pinSpacing: index == cards.length - 1 ? true : false,
                    markers: true,
                }
            })
            .from(card, { 
                opacity: 0,
                duration: 0.1,
            })
            .from(textAnimation, {
                    opacity: 0,
                    y: 30,
                    duration: 0.1,
                }, ">-10%"
            )
            .to(textAnimation, {
                    opacity: 0,
                    y: -30,
                    duration: 0.1,
                }, "+=60%"
            )
            .from(overlay, {
                    opacity: 0,
                    duration: 0.1,
                }, "+=40%"
            )
            .to(card, { 
                    opacity: 0, 
                    duration: 0.1      
                }, "+=95%"
            );
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
                    <div className="text-animation absolute bottom-4 left-4">
                        <p className="text-4xl font-pixel">{games.length - index}</p>
                        <p className="text-2xl font-pixel">{game.title}</p>
                    </div>
                    <div className="overlay absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                        <p className="text-2xl font-pixel text-white">{game.genre}</p>
                        <p className="text-2xl font-pixel text-white">{game.studio}</p>
                        <SampleLineChart />
                    </div>
                </div>
            ))}
        </div>
    );
}
