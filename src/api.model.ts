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

export interface RepositoryStats {
  createdTimestamp: string;
  updatedTimestamp: string;
  totalCommits: number;
}

export interface RepositoryDetails {
  name: string;
  stats: RepositoryStats;
  portfolioSpec: PortfolioSpec;
  readmeDoc: string;
}

export type RepositoryLanguages = { [key: string]: number };
