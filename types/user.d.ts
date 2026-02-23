// types/user.ts

export interface IUser {
  id: number;
  email: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IProject {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserProfileResponse {
  user: IUser;
}

export interface IUserProjectsResponse {
  projects: ProjectWithErrorSummary[];
}

export interface IGenerateApiKeyResponse {
  api_key: string;
}

export interface IApiKey {
  id: string;
  keyId: string;
  prefix: string;
  isActive: boolean;
  createdAt: string;
}

export interface IGetApiKeysResponse {
  apiKeys: IApiKey[];
}

export interface IRevokeApiKeyResponse {
  message: string;
  apiKey: IApiKey;
}