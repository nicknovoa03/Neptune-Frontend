import * as d3 from 'd3'

// Function to convert CSV string to JSON format for D3
export function csvStringToJsonGraph(csvString: string, showTeam: boolean) {
  // Parse the CSV string
  const parsedData = d3.csvParse(csvString)

  // Extract unique nodes with type
  const nodes = Array.from(
    new Set(parsedData.flatMap((d) => [d.interviewee, d.team, d.organization])),
  )
    .map((id) => ({
      id,
      type: parsedData.some((d) => d.interviewee === id)
        ? 'source'
        : showTeam
          ? parsedData.some((d) => d.team === id)
            ? 'team'
            : null
          : parsedData.some((d) => d.organization === id)
            ? 'organization'
            : null,
    }))
    .filter((node) => node.type !== null)

  // Map the links, using showTeam to determine the target
  const links = parsedData
    .map((d) => ({
      source: d.interviewee,
      target: showTeam ? d.team : d.organization,
    }))
    .filter(
      (link) =>
        nodes.some((node) => node.id === link.source) &&
        nodes.some((node) => node.id === link.target),
    )

  return { nodes, links }
}
