import * as d3 from 'd3';

// Function to convert CSV string to JSON format for D3
export function csvStringToJson(csvString: string) {

    csvString = `source,target,association
General Stephen Hager,Doug Cress,Colleague,
Doug Cress,General Stephen Hager,Colleague,
Thomas Kalil,Charles Fratzia,Colleague,
Greg B,Dan T,Colleague,
Dan T,Greg B,Colleague,
Young K,Tom H,Colleague,
Tom H,Young K,Colleague,
Dillon Levy,Jeh Johnson,Colleague,
Jeh Johnson,Dillon Levy,Colleague,
Jeh Johnson,Jason,Colleague,
Dillon Levy,Jason,Colleague,
Jason,Dillon Levy,Colleague,`
    // Parse the CSV string
    const parsedData = d3.csvParse(csvString);

    // Extract unique nodes
    const nodes = Array.from(new Set(parsedData.flatMap(d => [d.source, d.target]))).map(id => ({ id }));

    // Map the links
    const links = parsedData.map(d => ({
        source: d.source,
        target: d.target,
        association: d.association
    }));

    return { nodes, links };
}
