import React, { useState, useEffect } from 'react'
import ForceGraph from './d3/ForceGraph'
import { csvStringToJsonGraph } from '../utils/d3/csvToJsonGraph'
import { GraphData } from '@/typing'
import { sanitizeCsvString } from '../utils/d3/sanitizeCsvString'

interface NetworkProps {
  csvData: string
}

const Network: React.FC<NetworkProps> = ({ csvData }: NetworkProps) => {
  const [graphData, setGraphData] = useState<GraphData | null>(null)
  const [scaleFactor, setScaleFactor] = useState<number>(0.3)

  useEffect(() => {
    let data = csvStringToJsonGraph(csvData)
    if (data.nodes.length > 2 && data.links.length > 1) {
      setGraphData(data)
    } else {
      setGraphData(null)
    }
  }, [csvData])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setScaleFactor(0.5)
      } else if (window.innerWidth < 1200) {
        setScaleFactor(0.75)
      } else {
        setScaleFactor(1)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Set initial value

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!graphData) {
    return (
      <div className="flex items-center justify-center h-full my-10">
        Graph Unavailable
      </div>
    )
  }
  return (
    <div className="flex items-center m-5 mx-auto w-full border-2 border-[var(--color-bg-white)] rounded-2xl ">
      <ForceGraph data={graphData} scaleFactor={scaleFactor} />
    </div>
  )
}

export default Network
