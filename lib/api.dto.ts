export interface ProjectListDTO {
  name: string;
  description: string;
  pinned: boolean;
  githubUrl: string;
}

export interface ProjectStatsViewDTO {
  createdTimestamp: string;
  updatedTimestamp: string;
  totalCommits: number;
}

export interface ProjectReadmeViewDTO {
  content: string;
}

export interface ProjectViewDTO {
  name: string;
  stats: ProjectStatsViewDTO;
  readme?: ProjectReadmeViewDTO;
}

export type ProjectCodingLanguagesDTO = { [key: string]: number };
