'use client'

import { HeroSection } from '@/components/hero-section';
import { TopGames } from '@/components/top-games';
import { NetworkGraph } from '@/components/network-graph';
import { IntroductionSection } from '@/components/introduction-section';

export default function Home() {
    return (
        <>
            <HeroSection />
            <IntroductionSection />
            <TopGames />
            <NetworkGraph />
        </>
    );
}