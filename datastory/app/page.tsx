'use client'

import { HeroSection } from '@/components/hero-section';
import { TrendsSection } from '@/components/trends-section';
import { CategorySection } from '@/components/category-section';

import NetworkGraph from '@/components/network-graph';


export default function Home() {
    return (
        <>
            <div className="w-screen max-w-full"></div>
            <HeroSection />
            <TrendsSection />
            <CategorySection />
            <NetworkGraph />
        </>
    );
}