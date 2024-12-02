'use client';

import { ResponsiveBar } from '@nivo/bar';
import { AnimatedSection } from './animated-section';

const data = [
  {
    category: 'Action',
    value: 45,
  },
  {
    category: 'RPG',
    value: 35,
  },
  {
    category: 'FPS',
    value: 55,
  },
  {
    category: 'Strategy',
    value: 25,
  },
  {
    category: 'Sports',
    value: 30,
  },
];

export function CategorySection() {
  return (
    <section id="categories" className="section-container">
      <AnimatedSection>
        <h2 className="mb-8 text-3xl font-bold">Popular Game Categories</h2>
        <div className="chart-container">
          <ResponsiveBar
            data={data}
            keys={['value']}
            indexBy="category"
            margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            colors={['#7289DA']}
            borderRadius={4}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            theme={{
              axis: {
                ticks: {
                  text: {
                    fill: '#A3A6AA',
                  },
                },
              },
              grid: {
                line: {
                  stroke: '#2B2D31',
                  strokeWidth: 1,
                },
              },
            }}
          />
        </div>
      </AnimatedSection>
    </section>
  );
}