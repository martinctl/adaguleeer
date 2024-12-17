'use client'

import { TopGames } from '@/components/top-games';
import { NetworkGraph } from '@/components/network-graph';
import { Introduction } from '@/components/introduction';
import { Navbar } from '@/components/navbar';
import { WordCloud } from '@/components/word-cloud';
import { StartingInsightsSection } from '@/components/starting-insights-section';
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
            <Section p="0" id="intro"><Introduction /></Section>
            <Section size="3" id="starting-insights"><StartingInsightsSection /></Section>
            <Section size="3" id="word-cloud"><WordCloud /></Section>
            <Section size="3" id="top-games"><TopGames /></Section>
            <Section size="3" id="network"><NetworkGraph /></Section>
        </>
    );
}