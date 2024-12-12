import React from "react";
import dynamic from "next/dynamic";
import networkData from "@/data/games_network.json"; // Import your data

// Dynamically import echarts-for-react to avoid server-side rendering issues
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

const NetworkGraph = () => {
    const getOption = () => ({
        title: {
            text: 'Games Network',
            subtext: 'Default layout',
            top: 'bottom',
            left: 'right'
        },
        tooltip: {},
        legend: [
            {
                data: networkData.categories.map(function (a) {
                    return a.name.toString()
                })
            }
        ],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                type: 'graph',
                legendHoverLink: false,
                layout: 'none',
                data: networkData.nodes,
                links: networkData.edges,
                categories: networkData.categories,
                roam: true,
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                },
                labelLayout: {
                    hideOverlap: true
                },
                itemStyle: {
                    borderColor: '#000',
                    borderWidth: 0.5,
                },
                lineStyle: {
                    color: 'source',
                    curveness: 0.2,
                    opacity: 0.2
                },
                emphasis: {
                    focus: 'adjacency',
                    lineStyle: {
                        width: 5
                    }
                }
            }
        ],
    });

    return (
        <div>
            <ReactECharts option={getOption()} style={{ height: "700px", width: "100%" }} />
        </div>
    );
};

export default NetworkGraph;