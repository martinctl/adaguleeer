import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import networkData from "@/data/games_network.json";
import networkData2 from "@/data/games_network_good.json";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styled from "styled-components";
import { EChartsInstance } from "echarts-for-react";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

const NetworkGraph = () => {
    const [roamEnabled, setRoamEnabled] = useState(false);
    const [echartsInstance, setEchartsInstance] = useState<EChartsInstance | null>(null);
    const [data, setData] = useState<any>(networkData);

    const highlights = [
        { nodeIndex: -1, zoom: 1, message: "Here is a network of games linked by how many users made a comment on both games" },
        { nodeIndex: 0, zoom: 2, message: "This is the first highlighted node" },
        { nodeIndex: 1, zoom: 2, message: "Second important node" },
        { nodeIndex: 2, zoom: 2, message: "Third important node" },
        { nodeIndex: 117, zoom: 3, message: "Fourth important node" },
    ];

    useEffect(() => {
        if (!echartsInstance) return;

        gsap.registerPlugin(ScrollTrigger);

        // Handle highlights
        highlights.forEach((highlight, index) => {
            ScrollTrigger.create({
                trigger: ".network-container-wrapper",
                start: `${index * (100 / (highlights.length + 1))}% center`,
                end: `${(index + 1) * (100 / (highlights.length + 1))}% center`,
                markers: false,
                scrub: 1,
                onEnter: () => {
                    if (echartsInstance) {
                        handleHighlight(echartsInstance, highlight);
                    }
                },
                onEnterBack: () => {
                    if (echartsInstance) {
                        handleHighlight(echartsInstance, highlight);
                    }
                }
            });
        });

        // Enable roam after last highlight
        ScrollTrigger.create({
            trigger: ".network-container-wrapper",
            start: `${highlights.length * (100 / (highlights.length + 1))}% center`, // After last highlight
            end: "100% bottom",
            markers: false,
            onEnter: () => {
                if (echartsInstance) {
                    // Clear any existing highlights
                    echartsInstance.setOption({
                        animationDurationUpdate: 3000,
                        series: [{
                            zoom: 1,
                            center: [0, 0]
                        }]
                    });
                    echartsInstance.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0
                    });
                    // Wait 1 second before enabling roam
                    setTimeout(() => {
                        setRoamEnabled(true);
                    }, 3000);
                }
            },
            onLeave: () => {
                setRoamEnabled(false);
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [echartsInstance]);

    const handleHighlight = (instance: EChartsInstance, highlight: any) => {
        setRoamEnabled(false);
        if (highlight.nodeIndex === -1) {
            instance.dispatchAction({
                type: 'downplay',
                seriesIndex: 0
            });
            instance.setOption({
                series: [{
                    zoom: highlight.zoom,
                    center: [0, 0]
                }]
            });
        } else {
            instance.setOption({
                series: [{
                    zoom: highlight.zoom,
                    center: [
                        networkData.nodes[highlight.nodeIndex].x,
                        networkData.nodes[highlight.nodeIndex].y
                    ]
                }]
            });
            instance.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: highlight.nodeIndex
            });
        }
    };

    const getOption = () => ({
        darkMode: true,
        title: {
            text: 'Games Network',
            subtext: 'Default layout',
            top: 'bottom',
            left: 'right'
        },
        tooltip: {
            show: roamEnabled,
        },
        legend: [{
            data: networkData.categories.map(a => a.name.toString()),
            top: 10,
            left: 10,
            textStyle: {
                color: '#aaa'
            },
        }],
        animationDuration: 1500,
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticOut',
        series: [{
            type: 'graph',
            layout: 'none',
            data: networkData.nodes,
            links: networkData.edges,
            categories: networkData.categories,
            roam: roamEnabled, // Enable roam for interactive exploration
            silent: !roamEnabled, // Disable hover effects when not in roam mode
            label: {
                show: true,
                position: "right",
                formatter: function (params: any) {
                    return params.name.split(' ')
                        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                }
            },
            labelLayout: {
                hideOverlap: true,
            },
            itemStyle: {
                borderColor: "#000",
                borderWidth: 0.5,
            },
            lineStyle: {
                color: "source",
                curveness: 0.2,
                opacity: 0.2,
            },
            scaleLimit: {
                min: 0.9,
                max: 20,
            },
            emphasis: {
                focus: 'adjacency',
                lineStyle: {
                    width: 5,
                },
                itemStyle: {
                    borderColor: '#FFFAD8',
                    borderWidth: 2,
                },
            }
        }]
    });

    const onChartReady = (instance: EChartsInstance) => {
        setEchartsInstance(instance);
    };

    return (
        <div className="network-container-wrapper relative h-[500vh]">
            <div className="network-container sticky top-[5rem] h-[calc(100vh-6rem)] flex justify-between gap-4 items-start px-2">
                <div className="network-graph h-full w-full bg-[#171717] border border-[#333] rounded-lg flex-grow">
                    <ReactECharts
                        option={getOption()}
                        style={{ height: '100%', width: '100%' }}
                        onChartReady={onChartReady}
                    />
                </div>
                <div className="network-selectors w-1/4 bg-[#171717] border border-[#333] rounded-lg">
                    <div className="flex flex-row gap-1 p-1 items-center justify-between">
                        <button className="network-selector-button hover:bg-[#0A0B0C] hover:text-white text-[#BBB] w-1/3 rounded-md p-2">Games</button>
                        <button className="network-selector-button hover:bg-[#0A0B0C] hover:text-white text-[#BBB] w-1/3 rounded-md p-2">Channels</button>
                        <button className="network-selector-button hover:bg-[#0A0B0C] hover:text-white text-[#BBB] w-1/3 rounded-md p-2">Genres</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NetworkGraph;