import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'

interface BarChartProps {
  data: number[]
}

// BarChart component to render a bar chart using D3 and React
const BarChart: React.FC<BarChartProps> = ({ data }) => {
  // Create a reference to the SVG element
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    // Select the SVG element using the ref
    const svg = d3.select(svgRef.current)

    // Set the dimensions of the SVG
    const width = 500
    const height = 300
    const margin = { top: 20, right: 30, bottom: 40, left: 40 }

    // Set the width and height attributes of the SVG element
    svg.attr('width', width).attr('height', height)

    // Create the x-scale with a band scale for the bars
    const x = d3
      .scaleBand()
      .domain(data.map((_, i) => i.toString())) // Map data indices to the x domain
      .range([margin.left, width - margin.right]) // Set the range from left to right margins
      .padding(0.1) // Add padding between the bars

    // Create the y-scale with a linear scale for the bar heights
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data) || 0]) // Set the domain from 0 to the maximum data value
      .nice() // Round the domain to nice values
      .range([height - margin.bottom, margin.top]) // Set the range from bottom to top margins

    // Append rectangles for each data point
    svg
      .append('g')
      .attr('fill', 'steelblue') // Set the fill color for the bars
      .selectAll('rect') // Select all existing rect elements (none initially)
      .data(data) // Bind the data to the rect elements
      .enter()
      .append('rect') // Create a new rect for each data point
      .attr('x', (_, i) => x(i.toString())!) // Set the x position of the rect
      .attr('y', y(0)) // Initially set the y position to the bottom of the chart
      .attr('height', 0) // Initially set the height to 0
      .attr('width', x.bandwidth()) // Set the width based on the x-scale bandwidth
      .transition() // Add a transition for the bar height
      .duration(750) // Set the duration of the transition
      .attr('y', (d) => y(d)) // Set the y position based on the data value
      .attr('height', (d) => y(0) - y(d)) // Set the height based on the data value

    // Append the x-axis to the SVG
    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`) // Position the x-axis at the bottom
      .call(d3.axisBottom(x).tickFormat((i) => i.toString())) // Create and call the x-axis

    // Append the y-axis to the SVG
    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`) // Position the y-axis at the left
      .call(d3.axisLeft(y)) // Create and call the y-axis
  }, [data]) // Run the effect whenever the data changes

  // Render the SVG element
  return <svg ref={svgRef}></svg>
}

export default BarChart
