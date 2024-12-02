'use client';

import { ResponsiveLine } from '@nivo/line';
import { AnimatedSection } from './animated-section';

const data = [
  {
    id: 'Channel Growth',
    data: [
      { x: 'Jan', y: 1000000 },
      { x: 'Feb', y: 1200000 },
      { x: 'Mar', y: 1800000 },
      { x: 'Apr', y: 2500000 },
      { x: 'May', y: 3100000 },
      { x: 'Jun', y: 4000000 },
    ],
  },
];

export function TrendsSection() {
  return (
    <section id="trends" className="section-container">
      <AnimatedSection>
        <h2 className="mb-8 text-3xl font-bold">Channel Growth Trends</h2>
        <div className="chart-container">
          <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
            curve="cardinal"
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
            enablePoints={true}
            pointSize={10}
            pointColor="#FF4454"
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            enableArea={true}
            areaOpacity={0.1}
            colors={['#FF4454']}
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
              crosshair: {
                line: {
                  stroke: '#FF4454',
                  strokeWidth: 1,
                  strokeOpacity: 0.35,
                },
              },
            }}
          />
        </div>
      </AnimatedSection>
    </section>
  );
}