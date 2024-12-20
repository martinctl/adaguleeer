import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface BarRaceProps {
  data: {
    weeks: string[]
    [key: string]: string[] | number[]
  }
  width?: number
  height?: number
}

export default function BarRace({ data, width = 800, height = 500 }: BarRaceProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Constants
    const marginTop = 16
    const marginRight = 6
    const marginBottom = 6
    const marginLeft = 100
    const barSize = 48
    const n = 12 // Show top N games
    const duration = 80
    
    // Transform data into required format
    const games = Object.keys(data).filter(key => key !== 'weeks')
    const formattedData = data.weeks.flatMap((week, i) => 
      games.map(game => ({
        date: new Date(week),
        name: game,
        value: (data[game] as number[])[i]
      }))
    )

    // Setup helper functions
    const formatNumber = d3.format(",d")
    const formatMillions = (x: number) => {
        if (x < 1000000) {
            return `${x}`
        }
        return `${(x / 1000000).toFixed(1)}M`
    }
    const formatDate = d3.utcFormat("%d %b %Y")

    // Create color scale
    const color = d3.scaleOrdinal(d3.schemeTableau10)
      .domain(games)

    // Setup names and date values
    const names = new Set(formattedData.map(d => d.name))
    const datevalues = Array.from(d3.rollup(formattedData, ([d]) => d.value, d => +d.date, d => d.name))
      .map(([date, data]) => [new Date(date), data])
      .sort(([a], [b]) => d3.ascending(a, b))

    // Rank function
    const rank = (value: (name: string) => number) => {
      const data = Array.from(names, name => ({ name, value: value(name) }))
      data.sort((a, b) => d3.descending(a.value, b.value))
      for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(n, i)
      return data
    }

    // Generate keyframes
    const k = 7 // Number of keyframes per transition
    const keyframes: [Date, { name: string; value: number; rank: number }[]][] = []
    for (let i = 0; i < datevalues.length - 1; ++i) {
      const [ka, a] = datevalues[i]
      const [kb, b] = datevalues[i + 1]
      for (let t = 0; t < k; ++t) {
        const alpha = t / k
        keyframes.push([
          new Date(+ka * (1 - alpha) + +kb * alpha),
          rank(name => (a.get(name) || 0) * (1 - alpha) + (b.get(name) || 0) * alpha)
        ])
      }
    }
    keyframes.push([datevalues[datevalues.length - 1][0], rank(name => datevalues[datevalues.length - 1][1].get(name) || 0)])

    // Setup prev/next maps for transitions
    const nameframes = d3.groups(keyframes.flatMap(([, data]) => data), d => d.name)
    const prev = new Map(nameframes.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a])))
    const next = new Map(nameframes.flatMap(([, data]) => d3.pairs(data)))

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('viewBox', [0, 0, width, height])

    // Setup scales
    const x = d3.scalePow()
      .exponent(0.5)
      .range([marginLeft, width - marginRight])
    const y = d3.scaleBand()
      .domain(d3.range(n + 1))
      .rangeRound([marginTop, marginTop + barSize * (n + 1 + 0.1)])
      .padding(0.1)

    // Implementation of the bars
    const barsG = svg.append('g')
      .attr('fill-opacity', 0.6)

    // Implementation of the labels
    const labelsG = svg.append('g')
      .style('font', 'bold 12px var(--sans-serif)')
      .style('font-variant-numeric', 'tabular-nums')
      .style('fill', 'white')
      .attr('text-anchor', 'end')

    // Implementation of the axis
    const axis = svg.append('g')
      .attr('transform', `translate(0,${marginTop})`)
      .style('fill', 'white')

    // Implementation of the ticker
    const ticker = svg.append('text')
      .style('font', `bold ${barSize}px var(--sans-serif)`)
      .style('font-variant-numeric', 'tabular-nums')
      .style('fill', 'white')
      .attr('text-anchor', 'end')
      .attr('x', width - marginRight - 6)
      .attr('y', height - marginBottom - 10)
      .attr('dy', '0.32em')

    // Animation function
    const animate = async () => {
      for (const keyframe of keyframes) {
        const [date, data] = keyframe

        // Update x domain with some padding
        x.domain([0, data[0].value * 1.1])

        // Update axis
        axis.transition()
          .duration(duration)
          .ease(d3.easeLinear)
          .call(d3.axisTop(x)
            .ticks(width / 160)
            .tickFormat(x => formatMillions(+x))
          )
          .call(g => {
            g.select('.domain').remove()
            g.selectAll('.tick line')
              .attr('stroke', 'white')
            g.selectAll('.tick text')
              .attr('fill', 'white')
          })

        // Update bars
        barsG.selectAll('rect')
          .data(data.slice(0, n), d => d.name)
          .join(
            enter => enter.append('rect')
              .attr('fill', d => color(d.name))
              .attr('height', y.bandwidth())
              .attr('x', x(0))
              .attr('y', d => y((prev.get(d) || d).rank))
              .attr('width', d => x((prev.get(d) || d).value) - x(0)),
            update => update,
            exit => exit.transition()
              .duration(duration)
              .remove()
              .attr('y', d => y((next.get(d) || d).rank))
              .attr('width', d => x((next.get(d) || d).value) - x(0))
          )
          .transition()
          .duration(duration)
          .ease(d3.easeLinear)
          .attr('y', d => y(d.rank))
          .attr('width', d => x(d.value) - x(0))

        // Update labels
        labelsG.selectAll('text')
          .data(data.slice(0, n), d => d.name)
          .join(
            enter => enter.append('text')
              .attr('transform', d => `translate(${x((prev.get(d) || d).value)},${y((prev.get(d) || d).rank)})`)
              .attr('y', y.bandwidth() / 2)
              .attr('x', -6)
              .attr('dy', '-0.25em')
              .text(d => d.name)
              .call(text => text.append('tspan')
                .attr('fill-opacity', 0.7)
                .attr('font-weight', 'normal')
                .attr('x', -6)
                .attr('dy', '1.15em')
                .text(d => formatNumber(d.value))),
            update => update,
            exit => exit.transition()
              .duration(duration)
              .remove()
          )
          .transition()
          .duration(duration)
          .ease(d3.easeLinear)
          .attr('transform', d => `translate(${x(d.value)},${y(d.rank)})`)
          .each(function(d) {
            d3.select(this)
              .select('tspan')
              .text(formatNumber(d.value));
          });

        // Update ticker
        ticker.text(formatDate(date))

        await new Promise(resolve => setTimeout(resolve, duration))
      }
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      svg.selectAll('*').remove()
    }

  }, [data, width, height])

  return <svg ref={svgRef} />
}
