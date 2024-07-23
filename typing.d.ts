type Message = {
  text: string;

  createdAt: admin.firestore.Timestamp;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}

export type CSVRecord = {
  source: string;
  target: string;
  association: string;
}

export type Node = {
  id: string;
}

export type Link = {
  source: string;
  target: string;
  association: string;
}

export type GraphData = {
  nodes: Node[];
  links: Link[];
}