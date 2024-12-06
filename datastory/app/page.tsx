import { HeroSection } from '@/components/hero-section';
import { TrendsSection } from '@/components/trends-section';
import { CategorySection } from '@/components/category-section';
import NetworkGraph from '@/components/network-graph';
import { nodes, links } from '@/data/network';
import { IntroductionSection } from '@/components/introduction-section';
import { StartingInsightsSection } from '@/components/starting-insights-section';

export default function Home() {
    return (
        <>
            <HeroSection />
            <IntroductionSection />
            <StartingInsightsSection />
            <TrendsSection />
            <CategorySection />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="network">
                <NetworkGraph
                    nodes={nodes}
                    links={links}
                    width={1200}
                    height={600}
                />
            </div>
        </>
    );
}