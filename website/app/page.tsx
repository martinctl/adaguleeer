'use client'

import { TopGames } from '@/components/top-games';
import { NetworkGraph } from '@/components/network-graph';
import { Introduction } from '@/components/introduction';
import { Navbar } from '@/components/navbar';
import { useState, useEffect } from 'react';

export default function Home() {
    const [currentSection, setCurrentSection] = useState('');

    const handleScroll = () => {
        const sections = ['intro', 'top-games', 'network'];
        sections.forEach((section) => {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 0) {
                    setCurrentSection(section);
                }
            }
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Navbar currentSection={currentSection} />
            <div id="intro"><Introduction /></div>
            <div id="top-games"><TopGames /></div>
            <div id="network"><NetworkGraph /></div>
        </>
    );
}