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
    { nodeIndices: [1], zoom: 3, message: "The following graph illustrates the connections between games based on the overlap of their viewers. While games of the same genre may cluster together, popularity is also expected to play a significant role in these interactions. As we can see, Minecraft occupies a central position in the graph, strongly connected to a variety of games, highlighting its universal appeal and cross-genre influence." },
    { nodeIndices: [0], zoom: 3, message: "Fortnite appears as another highly connected node in the graph, bridging communities across different genres, including competitive shooters, and casual multiplayer games. Its position reflects its popularity and its ability to attract a diverse audience, forming connections with games appealing to competitive and social players alike." },
    { nodeIndices: [37, 35, 36, 45, 48, 49], zoom: 2.5, message: "Now, let’s zoom out to the FIFA community. It’s kind of doing its own thing, sitting on the edge of the graph. But there’s an interesting twist: FIFA has this strong link to Rocket League." },
    { nodeIndices: [29, 37, 35, 36, 45, 48, 49], zoom: 2.5, message: "That connection really makes sense, given Rocket League’s mix of sports and competition, which FIFA players can totally relate to." },
    { nodeIndices: [59], zoom: 3, message: "Here’s a fun cluster to look at! Mario Kart 8 is right in the middle of a group of Nintendo classics. You’ve got other Mario games and some beloved Nintendo exclusives all huddled together. It really captures the loyalty and love that Nintendo fans have for these titles."},
    { nodeIndices: [117, 118], zoom: 3, message: "Finally, let’s check out the Pokémon games. They’re off in their own little world, completely disconnected from the rest of the graph. And honestly, that fits perfectly—Pokémon has such a dedicated, standalone fanbase that it doesn’t really need to connect with other gaming communities." },
];

const lastHighlightMessage = "Now it’s your turn! You can freely explore the graph, zoom in, and move around to discover connections between games. Try finding your favorite game and see which communities it’s linked to—you might be surprised by some of the overlaps and clusters you uncover!";

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
                    if (index !== 0) {
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
                            center: [0, -7000]
                        }]
                    });
                    echartsInstance.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0
                    });
                    setTimeout(() => {
                        setRoamEnabled(true);
                        gsap.to(messageRef.current, {
                            opacity: 0,
                            duration: 0.5,
                            onComplete: () => {
                                setCurrentMessage(lastHighlightMessage);
                                gsap.to(messageRef.current, {
                                    opacity: 1,
                                    duration: 0.5
                                });
                            }
                        });
                    }, 2000);
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
            orient: 'vertical',
            top: 'center',
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
                    borderColor: '#FFF',
                    borderWidth: 2,
                },
            }
        }]
    });

    const onChartReady = (instance: EChartsInstance) => {
        setEchartsInstance(instance);
        handleHighlight(instance, highlights[0]);
    };

    // Get current network data based on selection
    const networkData = networkType === 'games' ? gamesNetworkData : channelsNetworkData;

    return (
        <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 network-container-wrapper relative h-[800vh]">
            <div className="network-container sticky top-[5rem] h-[calc(100vh-6rem)] gap-4">
                <div className="relative w-full h-full">
                    <div className="absolute z-50 top-0 left-0 w-full">
                        <div className="flex flex-col gap-4 pointer-events-auto">
                            <div className="flex items-start gap-2 p-3 backdrop-blur-lg border border-gray-100/10 rounded-xl bg-gray-700/20 shadow-lg">
                                <ChatBubbleIcon className="flex-shrink-0 mt-1"/>
                                <div 
                                    ref={messageRef} 
                                    className="transition-[height] duration-500 ease-in-out"
                                >
                                    {currentMessage}
                                </div>
                            </div>
                            <div className="drop-shadow-md">
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
                    
                    <div className="absolute w-full h-full network-graph z-0">
                        <ReactECharts
                            option={getOption()}
                            style={{ height: '100%', width: '100%' }}
                            onChartReady={onChartReady}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};