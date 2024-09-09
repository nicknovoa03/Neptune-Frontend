import * as d3 from 'd3'

// Function to convert CSV string to JSON format for D3
export function csvStringToJsonGraph(csvString: string) {
  // Parse the CSV string
  const parsedData = d3.csvParse(csvString)

  // Extract unique nodes with type
  const nodes = Array.from(
    new Set(parsedData.flatMap((d) => [d.interviewee, d.team])),
  ).map((id) => ({
    id,
    type: parsedData.some((d) => d.interviewee === id) ? 'source' : 'target',
  }))

  // Map the links
  const links = parsedData.map((d) => ({
    source: d.interviewee,
    target: d.team,
  }))

  return { nodes, links }
}
