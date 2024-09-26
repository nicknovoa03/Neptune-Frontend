import React, { useState, useEffect } from 'react'
import ForceGraph from './d3/ForceGraph'
import { csvStringToJsonGraph } from '../utils/d3/csvToJsonGraph'
import { GraphData } from '@/typing'

interface NetworkProps {
  csvData: string
}

const Network: React.FC<NetworkProps> = ({ csvData }: NetworkProps) => {
  const [graphData, setGraphData] = useState<GraphData | null>(null)
  const [showTeam, setShowTeam] = useState<boolean>(false)

  useEffect(() => {
    let data = csvStringToJsonGraph(csvData, showTeam)
    if (data.nodes.length > 2 && data.links.length > 1) {
      setGraphData(data)
    } else {
      setGraphData(null)
    }
  }, [csvData, showTeam])

  const handleToggle = () => {
    setShowTeam(!showTeam)
  }

  if (!graphData) {
    return (
      <div className="flex items-center justify-center h-full my-10">
        Graph Unavailable
      </div>
    )
  }

  return (
    <div className="flex flex-col items-start m-5 p-5 mx-auto w-full border-2 border-[var(--color-bg-quaternary)] rounded-2xl ">
      <div className="mb-4">
        <button
          onClick={handleToggle}
          className="bg-[var(--color-bg-quaternary)] text-white p-3 rounded-xl"
        >
          {showTeam ? 'Show Organization' : 'Show Team'}
        </button>
      </div>
      <ForceGraph data={graphData} showTeam={showTeam} />
    </div>
  )
}

export default Network
