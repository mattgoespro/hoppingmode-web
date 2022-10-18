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

export interface RepositoryDetails {
  name: string;
  createdTimestamp: string;
  updatedTimestamp: string;
  portfolioSpec: PortfolioSpec;
  readmeDoc: string;
}

export type RepositoryLanguages = { [key: string]: number };
