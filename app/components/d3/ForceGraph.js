import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'

// Define the ForceGraph component
const ForceGraph = ({ data, scaleFactor }) => {
  // Create a ref to the SVG element
  const svgRef = useRef(null)
  const Maroon = '#8C1D40'
  const Gold = '#FFC627'

  useEffect(() => {
    // Select the SVG element and set its dimensions
    const svg = d3.select(svgRef.current)
    const width = 1500 * scaleFactor
    const height = 1200 * scaleFactor
    const nodeRadius = 15 * scaleFactor
    const nodeTextSize = 15 * scaleFactor
    const linkWidth = 6 * scaleFactor
    const linkDistance = 200 * scaleFactor
    const linkTextSize = 12 * scaleFactor
    const chargeStrength = -100 * scaleFactor
    const collisionRadius = 5 * scaleFactor
    // Clear previous contents of the SVG element
    svg.selectAll('*').remove()

    // Set up the SVG element with the specified dimensions
    svg.attr('width', width).attr('height', height)

    // Create the D3 simulation with nodes and forces
    const simulation = d3
      .forceSimulation(data.nodes)
      .force(
        'link',
        d3
          .forceLink(data.links)
          .id((d) => d.id)
          .distance(linkDistance),
      )
      .force('charge', d3.forceManyBody().strength(chargeStrength))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius(collisionRadius)) // Add collision force with a radius of 50

    // Create link elements and append them to the SVG
    const link = svg
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .attr('stroke-width', linkWidth)
      .attr('stroke', '#999')
      .attr('opacity', 0.7) // Semi-transparent links

    // Create text elements for associations and append them to the SVG
    const linkText = svg
      .append('g')
      .attr('class', 'link-texts')
      .selectAll('text')
      .data(data.links)
      .enter()
      .append('text')
      .attr('font-size', linkTextSize)
      .attr('fill', '#ccc')

    // Create node elements and append them to the SVG
    // Enhance node elements
    const node = svg
      .append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(data.nodes)
      .enter()
      .append('circle')
      .attr('r', nodeRadius)
      .attr('fill', (d) => (d.type === 'source' ? Maroon : Gold))
      .attr('stroke', '#000') // Border color
      .call(
        d3
          .drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended),
      )
      .on('mouseover', function (event, d) {
        d3.select(this).attr('fill', '#ffffff') // Change color to blue on hover
      })
      .on('mouseout', function (event, d) {
        d3.select(this).attr('fill', (d) =>
          d.type === 'source' ? Maroon : Gold,
        ) // Revert color on mouse out
      })
      .on('click', function (event, d) {
        console.log('Node clicked:', d)
      })

    // Create text elements for node IDs and append them to the SVG
    const nodeText = svg
      .append('g')
      .attr('class', 'node-texts')
      .selectAll('text')
      .data(data.nodes)
      .enter()
      .append('text')
      .attr('font-size', nodeTextSize)
      .attr('fill', '#fff')
      .text((d) => d.id)

    // Add tooltips to nodes
    node.append('title').text((d) => d.id)

    // Define the tick function to update positions of nodes, links, and text elements
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y)

      linkText
        .attr('x', (d) => (d.source.x + d.target.x + 20) / 2)
        .attr('y', (d) => (d.source.y + d.target.y) / 2)

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)

      nodeText.attr('x', (d) => d.x + 30).attr('y', (d) => d.y + 5) // Adjust the position of the text relative to the node
    })

    // Add legend to the top right corner
    const legend = svg
      .append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(20, 20)`)

    legend
      .append('circle')
      .attr('cx', 10)
      .attr('cy', 10)
      .attr('r', 10)
      .attr('fill', Maroon)

    legend
      .append('text')
      .attr('x', 30)
      .attr('y', 15)
      .attr('font-size', 15)
      .attr('fill', '#fff')
      .text('Person')

    legend
      .append('circle')
      .attr('cx', 10)
      .attr('cy', 40)
      .attr('r', 10)
      .attr('fill', Gold)

    legend
      .append('text')
      .attr('x', 30)
      .attr('y', 45)
      .attr('font-size', 15)
      .attr('fill', '#fff')
      .text('Organization')

    // Define drag event handlers for the nodes
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
      simulation.force('charge', null) // Disable charge force during drag
    }

    function dragged(event, d) {
      d.fx = Math.max(0, Math.min(width, event.x))
      d.fy = Math.max(0, Math.min(height, event.y))
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    // Cleanup function to stop the simulation on component unmount
    return () => {
      simulation.stop()
    }
  }, [data, scaleFactor])

  // Render the SVG element
  return <svg ref={svgRef}></svg>
}

export default ForceGraph
