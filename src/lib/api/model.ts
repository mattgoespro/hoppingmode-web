/**
 * Summary of a GitHub project.
 *
 * @param name - The name of the project.
 * @param description - The description of the project.
 * @param pinned - Whether the project is pinnede.
 * @param githubUrl - The GitHub URL of the project.
 */
export interface ProjectListDTO {
  name: string;
  description: string;
  pinned: boolean;
  githubUrl: string;
}

/**
 * General stats of a project.
 *
 * @param createdTimestamp - The timestamp of when the project was created.
 * @param updatedTimestamp - The timestamp of when the project was last updated.
 * @param totalCommits - The total number of commits.
 */
export interface ProjectStatsViewDTO {
  createdTimestamp: string;
  updatedTimestamp: string;
  totalCommits: number;
}

/**
 * The readme of a project.
 *
 * @param content - The content of the project's 'README.md' file, encoded
 * in Base64 format.
 */
export interface ProjectReadmeViewDTO {
  content: string;
}

/**
 * Detailed view of a project, including project stats and readme.
 *
 * @param name - The name of the project.
 * @param {ProjectStatsViewDTO} stats - The stats of the project.
 * @param {ProjectReadmeViewDTO} readme - The readme of the project.
 */
export interface ProjectViewDTO {
  name: string;
  stats: ProjectStatsViewDTO;
  readme?: ProjectReadmeViewDTO;
}

/**
 * An object with coding language names in which the project code, each
 * mapped to their respective percentage contribution to the total
 * source code.
 *
 * @example
 * {
 *     HTML: 20,
 *     TypeScript: 80
 * }
 */
export type ProjectCodingLanguagesDTO = { [key: string]: number };
