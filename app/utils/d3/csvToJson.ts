import * as d3 from 'd3';

export interface Node {
    id: string;
}

export interface Link {
    source: string;
    target: string;
    association: string;
}

export interface GraphData {
    nodes: Node[];
    links: Link[];
}

// Assuming the CSV has columns: source, target, association
interface CsvRow {
    source: string;
    target: string;
    association: string;
}

export async function csvStringToJson(csvString: string): Promise<GraphData> {
    try {
        const data = d3.csvParse(csvString) as CsvRow[];

        const nodes = new Set<string>();
        const links: Link[] = data.map(d => {
            nodes.add(d.source);
            nodes.add(d.target);
            return { source: d.source, target: d.target, association: d.association };
        });

        return {
            nodes: Array.from(nodes).map(id => ({ id })),
            links: links
        };
    } catch (error) {
        console.error('Error parsing CSV string:', error);
        throw error;
    }
}
