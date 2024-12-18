'use client';

import { Card, Text, Flex, Grid } from '@radix-ui/themes';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
} from 'echarts/components';
import { LineChart, BarChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import gameStatsData from '@/data/game_statistics.json';

// Register the required components
echarts.use([
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  LineChart,
  BarChart,
  CanvasRenderer,
  UniversalTransition
]);

interface GameStatisticsProps {
  gameTitle: string;
}

export function GameStatistics({ gameTitle }: GameStatisticsProps) {
  const gameData = gameStatsData.games[gameTitle as keyof typeof gameStatsData.games];

  const likesViewsOptions = {
    darkMode: true,
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      type: 'category',
      data: gameData.likesViewsData.months,
      axisLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#2B2D31'
        }
      }
    },
    series: [{
      name: 'Likes/Views',
      type: 'line',
      data: gameData.likesViewsData.values,
      smooth: true,
      lineStyle: {
        width: 3,
        color: '#7289DA'
      },
      itemStyle: {
        color: '#7289DA'
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(114, 137, 218, 0.3)'
          },
          {
            offset: 1,
            color: 'rgba(114, 137, 218, 0.1)'
          }
        ])
      }
    }]
  };

  const videoDurationOptions = {
    darkMode: true,
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['0-5 min', '5-10 min', '10-20 min', '20-30 min', '30+ min'],
      axisLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#2B2D31'
        }
      }
    },
    series: [{
      name: 'Video Duration Distribution',
      type: 'bar',
      data: gameData.videoDurationData.values,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(114, 137, 218, 0.8)'
          },
          {
            offset: 1,
            color: 'rgba(114, 137, 218, 0.3)'
          }
        ])
      }
    }]
  };

  return (
    <Grid columns="6" gap="4" p="6">
      {gameData.stats.map((stat, index) => (
        <Card key={index} style={{ gridColumn: 'span 2' }}>
          <Flex direction="column" gap="2">
            <Text size="2" weight="bold" className="font-pixel">
              {stat.label}
            </Text>
            <Text size="6" className="font-pixel">
              {stat.value}
            </Text>
          </Flex>
        </Card>
      ))}
      
      <Card style={{ gridColumn: 'span 3' }}>
        <Text size="2" weight="bold" className="font-pixel mb-4">
          Likes/Views Over Time
        </Text>
        <div className="h-72">
          <ReactEChartsCore
            echarts={echarts}
            option={likesViewsOptions}
            style={{ height: '100%' }}
          />
        </div>
      </Card>
      
      <Card style={{ gridColumn: 'span 3' }}>
        <Text size="2" weight="bold" className="font-pixel mb-4">
          Distribution of Video Length
        </Text>
        <div className="h-72">
          <ReactEChartsCore
            echarts={echarts}
            option={videoDurationOptions}
            style={{ height: '100%' }}
          />
        </div>
      </Card>
    </Grid>
  );
}
