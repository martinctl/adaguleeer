'use client'

import { Introduction } from '@/components/introduction';
import { TopGames } from '@/components/top-games';
import { NetworkGraph } from '@/components/network-graph';
import { Navbar } from '@/components/navbar';
import { WordCloud } from '@/components/word-cloud';
import { useState, useEffect } from 'react';
import { Section } from '@radix-ui/themes';
interface Section {
    id: string;
    label: string;
}

export default function Home() {
    const [currentSection, setCurrentSection] = useState('');

    const sections: Section[] = [
        { id: 'intro', label: 'Intro' },
        { id: 'starting-insights', label: 'Starting Insights' },
        { id: 'word-cloud', label: 'Word Cloud' },
        { id: 'top-games', label: 'Top Games' },
        { id: 'network', label: 'Network' },
    ];

    const handleScroll = () => {
        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 0) {
                    setCurrentSection(section.id);
                }
            }
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [sections]);

    return (
        <>
            <Navbar currentSection={currentSection} sections={sections} />
            <Section id="intro" p="0" ><Introduction /></Section>
            <Section id="word-cloud" size="3" ><WordCloud /></Section>
            <Section id="top-games" size="3" ><TopGames /></Section>
            <Section id="network" size="3" ><NetworkGraph /></Section>
        </>
    );
}