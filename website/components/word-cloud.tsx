'use client';

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import wordCloudData from "@/data/word_cloud.json";
import maskImageSrc from '@/data/ps4.jpg';

export function WordCloud() {
    const chartRef = useRef(null);
    const nbTags = 18925838;

    var colors = [
        'rgb(229, 77, 46)',
        'rgb(234, 47, 112)',
        'rgb(198, 68, 173)',
        'rgb(117, 100, 214)',
        'rgb(0, 120, 221)',
        'rgb(0, 127, 192)'
    ]

    const maskImage = new Image();
    maskImage.src = maskImageSrc.src;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('echarts-wordcloud').then(() => {
                const chartInstance = echarts.init(chartRef.current);
                const options = {
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        textStyle: {
                            color: '#aaa',
                        },
                        formatter: (params: any) => {
                            return `<strong>${params.data.name}</strong> appears in <strong>${((params.data.value / nbTags) * 100).toFixed(3)}%</strong> of tags`;
                        }
                    },
                    series: [{
                        type: 'wordCloud',
                        shape: 'circle',
                        keepAspect: false,
                        left: 'center',
                        top: 'center',
                        width: '100%',
                        height: '100%',
                        sizeRange: [8, 60],
                        rotationRange: [0, 90],
                        rotationStep: 90,
                        gridSize: 4,
                        maskImage: maskImage,
                        drawOutOfBound: false,
                        shrinkToFit: true,
                        layoutAnimation: true,
                        textStyle: {
                            fontFamily: 'sans-serif',
                            fontWeight: 'bold',
                            color: () => {
                                return colors[Math.floor(Math.random() * colors.length)];
                            },
                        },
                        emphasis: {
                            focus: 'self',
                            textStyle: {
                                textShadowBlur: 4,
                                textShadowColor: '#222',
                            },
                        },
                        data: wordCloudData,
                    },
                    ],
                };
                chartInstance.setOption(options);
            });
        }
    }, []);

    return <div ref={chartRef} className="w-screen h-screen" />;
};
