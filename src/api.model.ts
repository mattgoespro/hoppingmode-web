import { Encoding } from "crypto";

export interface RepositorySummary {
  name: string;
  description: string;
  pinned: boolean;
  githubUrl: string;
}

export interface ProjectSpecification {
  title: string;
  technicalSkills: string[];
}

export interface Stats {
  createdTimestamp: string;
  updatedTimestamp: string;
  totalCommits: number;
}

export interface ReadmeDocument {
  content: string;
  encoding: Encoding;
}

export interface Repository {
  name: string;
  stats: Stats;
  projectSpec: ProjectSpecification;
  readmeBase64: string;
}

export type ProgrammingLanguages = { [key: string]: number };
