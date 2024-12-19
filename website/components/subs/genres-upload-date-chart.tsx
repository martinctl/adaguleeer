'use client'

import * as echarts from 'echarts';
import { useEffect } from 'react';
import data from '@/data/uploads_genres.json';

export function GenresUploadDateChart() {
    useEffect(() => {
        const chartDom = document.getElementById('uploads')!;
        const myChart = echarts.init(chartDom);

        const option = {
            title: {
                text: 'Genre Uploads over Time',
                textStyle: {
                    color: '#ffffff'
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: data.date
            },
            grid: {
                left: '10%',
                right: '10%',
                top: '10%',
                bottom: '10%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisLabel: {
                    interval: 0,
                    rotate: 45,
                    color: '#ffffff'
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: '#ffffff'
                },
            },
            series: data.series
        };

        myChart.setOption(option);
    }, []);

    return (
        <div id="uploads" className="w-screen h-screen"></div>
    );
};