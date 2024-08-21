import React from 'react'
import { csvStringToJson } from '../utils/csvToJsonTable'
import { sanitizeCsvString } from '../utils/d3/sanitizeCsvString'
import { CSVRecord } from '@/typing'

interface CsvTableProps {
  csvData: string
}

const CsvTable: React.FC<CsvTableProps> = ({ csvData }) => {
  // Sanitize and parse the CSV data
  console.log('csvData', csvData)
  const jsonArray = csvStringToJson(csvData)
  console.log('jsonArray', jsonArray)

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-black border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Person</th>
            <th className="px-4 py-2 border-b">Organization</th>
            <th className="px-4 py-2 border-b">Area of Expertise</th>
          </tr>
        </thead>
        <tbody>
          {jsonArray.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b">{item.organization}</td>
              <td className="px-4 py-2 border-b">{item.person}</td>
              <td className="px-4 py-2 border-b">{item.areaOfExpertise}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CsvTable
