import React, { useState, useEffect } from 'react'
import ForceGraph from './d3/ForceGraph'
import { csvStringToJson } from '../utils/d3/csvToJson' // Adjust the import path as necessary
import { GraphData } from '@/typing'
import { sanitizeCsvString } from '../utils/d3/sanitizeCsvString'

interface NetworkProps {
  csvData: string
}

const Network: React.FC<NetworkProps> = ({ csvData }: NetworkProps) => {
  const [graphData, setGraphData] = useState<GraphData | null>(null)

  useEffect(() => {
    let data = csvStringToJson(csvData)
    if (data.nodes.length > 2 && data.links.length > 1) {
      setGraphData(data)
    } else {
      setGraphData(null)
    }
  }, [csvData])

  if (!graphData) {
    return (
      <div className="flex items-center justify-center h-full w-full my-10">
        Graph Unavailable
      </div>
    )
  }
  return (
    <div className="flex items-center space-x-5 px-10 w-full mx-auto">
      <ForceGraph data={graphData} />
    </div>
  )
}

export default Network
