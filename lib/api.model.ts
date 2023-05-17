export interface RepositorySummary {
  name: string;
  description: string;
  pinned: boolean;
  githubUrl: string;
}

export interface Stats {
  createdTimestamp: string;
  updatedTimestamp: string;
  totalCommits: number;
}

export interface ReadmeDocument {
  content: string;
}

export interface Repository {
  name: string;
  stats: Stats;
  readme: ReadmeDocument;
}

export type ProgrammingLanguages = { [key: string]: number };
