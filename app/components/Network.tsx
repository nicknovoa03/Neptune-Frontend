import React, { useState, useEffect } from 'react'
import ForceGraph from './d3/ForceGraph'
import { csvStringToJson } from '../utils/d3/csvToJson' // Adjust the import path as necessary
import { GraphData } from '@/typing'
import { sanitizeCsvString } from '../utils/d3/sanitizeCsvString'

interface NetworkProps {
  csvData: string
}

const Network: React.FC<NetworkProps> = ({ csvData }: NetworkProps) => {
  const [graphData, setGraphData] = useState<GraphData>()

  useEffect(() => {
    let data = csvStringToJson(sanitizeCsvString(csvData))
    setGraphData(data)
  }, [])

  if (!graphData) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex items-center space-x-5 px-10 max-w-4xl mx-auto">
      <ForceGraph data={graphData} />
    </div>
  )
}

export default Network
