import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Flex, Box } from '@radix-ui/themes';


interface HeatmapProps {
    games: string[],
    data: number[][];
}

export function HeatmapChart({ games, data }: HeatmapProps) {
    const chartRef = useRef<HTMLDivElement>(null);

    let values: (number | string)[][] = data.map(function (item: number[]) {
        return [item[0], item[1], item[2] || '-']
    })

    useEffect(() => {
        const chart = chartRef.current;
        if (!chart) return;

        const chartInstance = echarts.init(chartRef.current);
        const options = {
            darkMode: true,
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                textStyle: {
                    color: '#bbb',
                },
                formatter: (params: any) => {
                    const [bottom, left, value]: string[] = String(params.value).split(",")
                    return `${games[Number(left)]} => ${games[Number(bottom)]} | ${(Number(value) * 100).toFixed(2)}%`
                }
            },
            grid: {
                height: '80%',
                top: '0%'
            },
            xAxis: {
                type: 'category',
                data: games,
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    rotate: 20
                },
            },
            yAxis: {
                type: 'category',
                data: games,
                axisTick: {
                    show: false,
                },
                splitArea: {
                    show: true
                },
            },
            visualMap: {
                min: 0,
                max: 0.42,
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                bottom: '0%'
            },
            series: [
                {
                    name: 'Punch Card',
                    type: 'heatmap',
                    data: values,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
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
            <Box ref={chartRef} className="w-full h-[80vh]" />
        </Flex>
    );
}