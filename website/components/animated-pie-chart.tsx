import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Flex, Box } from '@radix-ui/themes';

interface YouTubeCategory{
    title: string;
    value: number;
}

interface AnimatedPieChartProps {
    data: YouTubeCategory[];
}

export function AnimatedPieChart({ data }: AnimatedPieChartProps) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const chart = chartRef.current;
        if (!chart) return;

        const chartInstance = echarts.init(chartRef.current);
        const options = {
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                textStyle: {
                    color: '#aaa',
                },
                formatter: (params: any) => {
                    return `<strong>${params.name}</strong> ${params.value}%`;
                }
            },
            series: [
                {
                    type: 'pie',
                    radius: '80%',
                    center: ['50%', '50%'],
                    data: data,
                    roseType: 'radius',
                    label: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    },
                    labelLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.5)'
                        },
                        smooth: 0.2,
                        length: 5,
                        length2: 15
                    },
                    itemStyle: {
                        color: '#c23531',
                        shadowBlur: 50,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx: number) {
                        return Math.random() * 200;
                    }
                }
            ]
        };
        chartInstance.setOption(options);
    }, []);

    return (
        <Flex
            width="100%"
            height="100%"
            justify="center"
            align="center"
        >
            <Box ref={chartRef} className="w-full h-[80vh]"/>
        </Flex>
    );
}