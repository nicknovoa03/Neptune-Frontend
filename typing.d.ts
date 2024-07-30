type Message = {
  text: string;

  createdAt: admin.firestore.Timestamp;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}

export interface CSVRecord {
  source: string;
  target: string;
}

export interface Node {
  id: string;
}

export interface Link {
  source: string;
  target: string;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}