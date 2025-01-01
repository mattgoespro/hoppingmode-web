/**
 * The summary of a listed project repository.
 *
 * @param name - The name of the project.
 * @param description - The description of the project.
 * @param url - The URL of the project repository.
 * @param pinned - Whether the project is pinned to the GitHub profile.
 */
export interface ProjectSummaryDTO {
  name: string;
  description: string;
  url: string;
  pinned: boolean;
}

/**
 * Detailed view of a project, including project stats and its readme.
 *
 * @param name - The name of the project.
 * @param {ProjectActivityViewDTO} stats - The stats of the project.
 * @param {ProjectReadmeViewDTO} readme - The readme of the project.
 */
export interface ProjectViewDTO {
  name: string;
  stats: ProjectActivityViewDTO;
  readme?: ProjectReadmeViewDTO;
}

/**
 * A view of the activities of a project.
 *
 * @param createdTimestamp - The timestamp of when the project was created.
 * @param updatedTimestamp - The timestamp of when the project was last updated.
 * @param totalCommits - The total number of commits.
 */
export interface ProjectActivityViewDTO {
  createdTimestamp: string;
  updatedTimestamp: string;
  totalCommits: number;
}

/**
 * The README.md content of a project.
 *
 * @param content - The base64 encoded content of the project's README.md file.
 */
export interface ProjectReadmeViewDTO {
  content: string;
}

/**
 * A map of the languages used to build the project code, each
 * mapped to their respective percentage contribution to the total
 * project source code.
 *
 * @example
 * {
 *     HTML: 20,
 *     TypeScript: 80
 * }
 */
export type ProjectCodingLanguagesDTO = { [key: string]: number };
