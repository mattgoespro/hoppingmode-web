import { ApiRepositoryResponseDTO } from '@hoppingmode-web/api-interfaces';
import { Response } from 'express';

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

export interface GithubApiErrorResponse {
  response: {
    status: number;
  };
}

export interface ApiHttpErrorResponse {
  status: number;
  message: string;
}

export function respondWithApiError(
  error: number | GithubApiErrorResponse,
  message: string,
  respond: Response
) {
  let httpCode: number;

  if (typeof error === 'number') {
    httpCode = error;
  } else {
    httpCode = error.response.status;
  }

  return respond.status(httpCode).json({ message });
}
