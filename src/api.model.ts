export interface RepositorySummary {
  name: string;
  description: string;
  pinned: boolean;
  githubUrl: string;
}

export interface PortfolioSpec {
  name: string;
  skills: string[];
}

export interface Stats {
  createdTimestamp: string;
  updatedTimestamp: string;
  totalCommits: number;
}

export interface RepositoryDetails {
  name: string;
  stats: Stats;
  portfolioSpec: PortfolioSpec;
  readmeBase64: string;
}

export type RepositoryLanguages = { [key: string]: number };
