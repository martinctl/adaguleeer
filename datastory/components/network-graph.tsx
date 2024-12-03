"use client";

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { GameNode, GameLink } from '../types/network';

interface NetworkGraphProps {
    nodes: GameNode[];
    links: GameLink[];
    width?: number;
    height?: number;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({
    nodes,
    links,
    width = 800,
    height = 600
}) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        // Clear previous content
        d3.select(svgRef.current).selectAll('*').remove();

        // Create the simulation
        const simulation = d3.forceSimulation<GameNode>(nodes)
            .force('link', d3.forceLink<GameNode, GameLink>(links)
                .id(d => d.id)
                .distance(d => (1 - d.weight) * 100))
            .force('charge', d3.forceManyBody().strength(-50))
            .force('center', d3.forceCenter(width / 2, height / 2));

        const svg = d3.select(svgRef.current);

        // Create the links
        const link = svg.append('g')
            .selectAll('line')
            .data(links)
            .join('line')
            .attr('stroke', '#999')
            .attr('stroke-opacity', 0.6)
            .attr('stroke-width', d => d.weight * 10);

        // Create the nodes
        const node = svg.append('g')
            .selectAll('g')
            .data(nodes)
            .join('g')
            .call(d3.drag<SVGGElement, GameNode>()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended));

        // Add circles to nodes
        node.append('circle')
            .attr('r', d => 5 + d.popularity)
            .attr('fill', d => d3.schemeCategory10[d.group % 10])
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)
            .on('mouseover', hover);

        // Add labels to nodes
        node.append('text')
            .text(d => d.popularity > 0.2 ? d.name : '')
            .attr('x', 0)
            .attr('y', d => -(10 + d.popularity * 2))
            .attr('text-anchor', 'middle')
            .attr('fill', '#333')
            .attr('font-size', '12px');

        // Update positions on each tick
        /**simulation.on('tick', () => {
            link
                .attr('x1', d => (d.source as GameNode).x!)
                .attr('y1', d => (d.source as GameNode).y!)
                .attr('x2', d => (d.target as GameNode).x!)
                .attr('y2', d => (d.target as GameNode).y!);

            node
                .attr('transform', d => `translate(${d.x},${d.y})`);
        }); */

        // Drag functions
        function dragstarted(event: d3.D3DragEvent<SVGGElement, GameNode, GameNode>) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event: d3.D3DragEvent<SVGGElement, GameNode, GameNode>) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event: d3.D3DragEvent<SVGGElement, GameNode, GameNode>) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        function hover(event: d3.D3DragEvent<SVGGElement, GameNode, GameNode>) {
            const name = event.target.__data__.name;
            console.log(`Hovering over ${name}`);
        }

        return () => {
            simulation.stop();
        };
    }, [nodes, links, width, height]);

    return (
        <svg
            ref={svgRef}
            width={width}
            height={height}
            className="bg-white rounded-lg shadow-lg"
        />
    );
};

export default NetworkGraph;