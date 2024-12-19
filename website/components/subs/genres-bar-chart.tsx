'use client'

import * as echarts from 'echarts';
import { useEffect } from 'react';
import data from '@/data/barchart_genres.json';

export function GenresBarChart() {
    useEffect(() => {
        const chartDom = document.getElementById('genre')!;
        const myChart = echarts.init(chartDom);

        const option = {
            xAxis: {
                type: 'category',
                data: data.genres,
                axisLabel: {
                    interval: 0,
                    rotate: 45,
                    color: '#ffffff'
                },
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    lineStyle: {
                        color: '#ffffff'
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: '#ffffff'
                },
                splitLine: {
                    lineStyle: {
                        color: '#444'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#ffffff'
                    }
                }
            },
            series: [
                {
                    data: data.count,
                    type: 'bar',
                    barWidth: '60%',
                    itemStyle: {
                        color: '#E54D2E'
                    }
                }
            ],
            grid: {
                left: '5%',
                right: '5%',
                top: '5%',
                bottom: '5%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                textStyle: {
                    color: '#ffffff',
                },
                backgroundColor: '#333333',
                borderColor: '#555',
                borderWidth: 1
            }
        };

        myChart.setOption(option);
    }, []);

    return (
        <div id="genre" className="w-screen h-screen"></div>
    );
};
