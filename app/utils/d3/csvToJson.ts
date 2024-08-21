import * as d3 from 'd3'

// Function to convert CSV string to JSON format for D3
export function csvStringToJson(csvString: string) {
  // Parse the CSV string
  const parsedData = d3.csvParse(csvString)

  // Extract unique nodes
  const nodes = Array.from(
    new Set(parsedData.flatMap((d) => [d.source, d.target])),
  ).map((id) => ({ id }))

  // Map the links
  const links = parsedData.map((d) => ({
    source: d.source,
    target: d.target,
    association: d.association,
  }))

  return { nodes, links }
}
