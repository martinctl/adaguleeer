import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Callout, SegmentedControl } from "@radix-ui/themes";
import gamesNetworkData from "@/data/games_network.json";
import channelsNetworkData from "@/data/channels_network.json";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { EChartsInstance } from "echarts-for-react";
import { useGSAP } from "@gsap/react";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

type Highlight = {
    nodeIndices: number[];
    zoom: number;
    message: string;
};

const highlights: Highlight[] = [
    { nodeIndices: [-1], zoom: 1, message: "Here is a network of games linked by how many users made a comment on both games" },
    { nodeIndices: [1], zoom: 1.5, message: "First we can see that the most important node is Minecraft Enim mollit qui cupidatat enim consequat in non qui. Id ut laborum sunt incididunt. Consequat ad Lorem dolor ipsum adipisicing elit do irure velit eiusmod magna voluptate. Officia sunt minim veniam adipisicing minim non duis pariatur ipsum. Exercitation eiusmod ut veniam et laboris enim sint esse voluptate aliqua velit dolore consequat. Aute proident do duis officia quis anim magna esse veniam duis. Ut veniam Lorem veniam nostrud velit ut laborum ad sint." },
    { nodeIndices: [0], zoom: 2, message: "It is connected with Fortnite" },
    { nodeIndices: [2], zoom: 2, message: "Other important nodes" },
    { nodeIndices: [37, 35, 36, 45, 48, 49], zoom: 2, message: "And other nodes" },
    { nodeIndices: [117, 118], zoom: 3, message: "These nodes represent..." },
];

type NetworkType = 'games' | 'channels';

export function NetworkGraph () {
    const [roamEnabled, setRoamEnabled] = useState(false);
    const [echartsInstance, setEchartsInstance] = useState<EChartsInstance | null>(null);
    const [networkType, setNetworkType] = useState<NetworkType>('games');

    const [currentMessage, setCurrentMessage] = useState(highlights[0].message);
    const messageRef = useRef(null);

    useGSAP(() => {
        if (!echartsInstance) return;

        gsap.registerPlugin(ScrollTrigger);

        // Animate initial message
        gsap.set(messageRef.current, { opacity: 0 });
        gsap.to(messageRef.current, {
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        });

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
                    // Animate message change without CSS transitions
                    gsap.to(messageRef.current, {
                        opacity: 0,
                        duration: 0.5,
                        onComplete: () => {
                            setCurrentMessage(highlight.message);
                            gsap.to(messageRef.current, {
                                opacity: 1,
                                duration: 0.5
                            });
                        }
                    });
                },
                onEnterBack: () => {
                    if (echartsInstance) {
                        handleHighlight(echartsInstance, highlight);
                    }
                    // Animate message change
                    gsap.to(messageRef.current, {
                        opacity: 0,
                        duration: 0.5,
                        onComplete: () => {
                            setCurrentMessage(highlight.message);
                            gsap.to(messageRef.current, {
                                opacity: 1,
                                duration: 0.5
                            });
                        }
                    });
                }
            });
        });

        // Enable roam after last highlight
        ScrollTrigger.create({
            trigger: ".network-container-wrapper",
            start: `${highlights.length * (100 / (highlights.length + 1))}% center`, // After last highlight
            end: "100% center",
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

    const handleHighlight = (instance: EChartsInstance, highlight: Highlight) => {
        setRoamEnabled(false);
        if (highlight.nodeIndices[0] === -1) {
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
            // Compute mean coordinates
            const meanX = highlight.nodeIndices.reduce((sum: number, idx: number) =>
                sum + networkData.nodes[idx].x, 0) / highlight.nodeIndices.length;
            const meanY = highlight.nodeIndices.reduce((sum: number, idx: number) =>
                sum + networkData.nodes[idx].y, 0) / highlight.nodeIndices.length;

            console.log(highlight.nodeIndices, meanX, meanY);
            instance.setOption({
                series: [{
                    zoom: highlight.zoom,
                    center: [meanX, meanY]
                }]
            });

            // Downplay all nodes first
            instance.dispatchAction({
                type: 'downplay',
                seriesIndex: 0
            });

            // Highlight each node in the array
            instance.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: highlight.nodeIndices
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
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            textStyle: {
                color: '#bbb',
            },
        },
        legend: [{
            show: roamEnabled,
            data: networkData.categories.map(a => a.name.toString()),
            top: 10,
            right: 10,
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

    // Get current network data based on selection
    const networkData = networkType === 'games' ? gamesNetworkData : channelsNetworkData;

    return (
        <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 network-container-wrapper relative h-[800vh]">
            <div className="network-container sticky top-[5rem] h-[calc(100vh-6rem)] flex flex-col gap-4">
                <div className="w-full">
                    <Callout.Root 
                        variant="soft" 
                        color="gray" 
                        highContrast 
                        className="border border-slate-100/10 transition-[height] duration-500 ease-in-out"
                    >
                        <Callout.Icon>
                            <ChatBubbleIcon className="h-5 w-5 text-white" />
                        </Callout.Icon>
                        <Callout.Text 
                            ref={messageRef} 
                            className="transition-[height] duration-500 ease-in-out"
                        >
                            {currentMessage}
                        </Callout.Text>
                    </Callout.Root>
                </div>
                
                <div className="relative network-graph flex-1">
                    <ReactECharts
                        option={getOption()}
                        style={{ height: '100%', width: '100%' }}
                        onChartReady={onChartReady}
                    />
                    <div className="absolute top-1 left-1 drop-shadow-md">
                        <SegmentedControl.Root 
                            size="3"
                            radius="large"
                            value={networkType}
                            onValueChange={(value: NetworkType) => setNetworkType(value)}
                        >
                            <SegmentedControl.Item 
                                className="network-selector-button data-[state=active]:bg-[#0A0B0C] data-[state=active]:text-white text-[#BBB] w-28 rounded-md p-2"
                                value="games"
                            >
                                Games
                            </SegmentedControl.Item>
                            <SegmentedControl.Item 
                                className="network-selector-button data-[state=active]:bg-[#0A0B0C] data-[state=active]:text-white text-[#BBB] w-28 rounded-md p-2"
                                value="channels"
                            >
                                Channels
                            </SegmentedControl.Item>
                        </SegmentedControl.Root>
                    </div>
                </div>
            </div>
        </div>
    );
};