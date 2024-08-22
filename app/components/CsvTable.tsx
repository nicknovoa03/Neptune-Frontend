import React from 'react'
import { csvStringToJson } from '../utils/csvToJsonTable'

interface CsvTableProps {
  csvData: string
}

const CsvTable: React.FC<CsvTableProps> = ({ csvData }) => {
  // Sanitize and parse the CSV data
  console.log('csvData', csvData)
  const jsonArray = csvStringToJson(csvData)
  console.log('jsonArray', jsonArray)

  // Check if jsonArray is empty
  if (jsonArray.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-[var(--color-bg-white)]">
          Error: No data available to display.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto border-2 border-[var(--color-bg-white)] text-[var(--color-text-gray-200)] rounded-2xl">
      <table className="min-w-full bg-[var(--color-bg-quaternary)] ">
        <thead>
          <tr className="border-b border-[var(--color-bg-black)]">
            <th className="px-4 py-2 ">Person</th>
            <th className="px-4 py-2">Organization</th>
            <th className="px-4 py-2 ">Title</th>
            <th className="px-4 py-2 ">Team</th>
          </tr>
        </thead>
        <tbody>
          {jsonArray.map((item, index) => (
            <tr
              key={index}
              className="last:border-0 border-b border-[var(--color-bg-black)]"
            >
              <td className="px-4 py-2 ">{item.interviewee}</td>
              <td className="px-4 py-2">{item.organization}</td>
              <td className="px-4 py-2 ">{item.title}</td>
              <td className="px-4 py-2 ">{item.team}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CsvTable
