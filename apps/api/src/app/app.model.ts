import { ApiRepositoryResponseDTO } from '@hoppingmode-web/api-interfaces';

export interface GithubRepositoryResponseDTO {
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  html_url: string;
}

export interface GithubGqlResponseDTO {
  mattgoespro: {
    projects: {
      pinned: ApiRepositoryResponseDTO[];
    };
  };
}

export interface HttpErrorResponse {
  status: number;
  message: string;
}

export interface GraphQlErrorResponse {
  response: {
    status: number;
    message: string;
  };
}

export interface GithubApiRestErrorResponse {
  response: {
    status: number;
    statusText: string;
  };
}
