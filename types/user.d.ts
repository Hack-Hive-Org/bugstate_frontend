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
  description?: string;
  environment: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProjectMember {
  id: number;
  projectId: number;
  userId: number;
  role: "OWNER" | "ADMIN" | "MEMBER";
  createdAt: string;
  updatedAt: string;
}

/* Project CRUD */
export interface ICreateProjectPayload {
  name: string;
  description?: string;
  environment: string;
}
export interface ICreateProjectResponse {
  project: IProject;
}

export interface IAddProjectMemberPayload {
  projectId: number;
  userId: number;
  role: "OWNER" | "ADMIN" | "MEMBER";
}
export interface IAddProjectMemberResponse {
  member: IProjectMember;
}

export interface IUpdateMemberRolePayload {
  memberId: number;
  role: "OWNER" | "ADMIN" | "MEMBER";
  projectId: number;
}
export interface IUpdateMemberRoleResponse {
  member: IProjectMember;
}

export interface IGetProjectMembersResponse {
  members: IProjectMember[];
}

export interface IRemoveProjectMemberPayload {
  memberId: number;
  projectId: number;
}
export interface IRemoveProjectMemberResponse {
  message: string;
}

export interface IDeleteProjectPayload {
  projectId: number;
}
export interface IDeleteProjectResponse {
  message: string;
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