import React from 'react'
import ForceGraph from './d3/ForceGraph'

const Network: React.FC = () => {
  const data = {
    nodes: [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }],
    links: [
      { source: 'A', target: 'B', association: 'Friend' },
      { source: 'A', target: 'C', association: 'Colleague' },
      { source: 'B', target: 'C', association: 'Neighbor' },
      { source: 'C', target: 'D', association: 'Family' },
    ],
  }

  return (
    <div className="App">
      <h1>CSV to Network Graph with D3 and React</h1>
      <ForceGraph data={data} />
    </div>
  )
}

export default Network
