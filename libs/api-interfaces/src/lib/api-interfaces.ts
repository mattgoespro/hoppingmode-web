export interface ApiRepositoryResponseDTO {
  name: string;
  description: string;
  createdTimestamp: string;
  updatedTimestamp: string;
  link: string;
}

export interface GithubRepositoryLanguageResponseDTO {
  languages: { [key: string]: number };
}
