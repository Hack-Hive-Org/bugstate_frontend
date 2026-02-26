// services/project.service.ts

import apiFetch from "@/lib/api";
import {
  IAddProjectMemberPayload,
  IAddProjectMemberResponse,
  ICreateProjectPayload,
  ICreateProjectResponse,
  IDeleteProjectPayload,
  IDeleteProjectResponse,
  IGetProjectMembersResponse,
  IRemoveProjectMemberPayload,
  IRemoveProjectMemberResponse,
  IUpdateMemberRolePayload,
  IUpdateMemberRoleResponse,
} from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/* ──────────────────────────────── */
/* Create Project                   */
/* ──────────────────────────────── */

export const createProject = async (
  payload: ICreateProjectPayload
): Promise<ICreateProjectResponse> => {
  return apiFetch<ICreateProjectResponse>("/projects/create", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation<ICreateProjectResponse, Error, ICreateProjectPayload>({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-projects"] });
    },
  });
};

/* ──────────────────────────────── */
/* Delete Project                   */
/* ──────────────────────────────── */

export const deleteProject = async (
  payload: IDeleteProjectPayload
): Promise<IDeleteProjectResponse> => {
  return apiFetch<IDeleteProjectResponse>("/projects/delete", {
    method: "DELETE",
    body: JSON.stringify(payload),
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation<IDeleteProjectResponse, Error, IDeleteProjectPayload>({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-projects"] });
    },
  });
};

/* ──────────────────────────────── */
/* Get Project Members              */
/* ──────────────────────────────── */

export const getProjectMembers = async (
  projectId: string
): Promise<IGetProjectMembersResponse> => {
  return apiFetch<IGetProjectMembersResponse>(
    `/projects/members/${projectId}`,
    { method: "GET" }
  );
};

export const useGetProjectMembers = (projectId: string) =>
  useQuery<IGetProjectMembersResponse>({
    queryKey: ["project-members", projectId],
    queryFn: () => getProjectMembers(projectId),
    enabled: !!projectId,
  });

/* ──────────────────────────────── */
/* Add Project Member               */
/* ──────────────────────────────── */

export const addProjectMember = async (
  payload: IAddProjectMemberPayload
): Promise<IAddProjectMemberResponse> => {
  return apiFetch<IAddProjectMemberResponse>("/projects/add-member", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const useAddProjectMember = () => {
  const queryClient = useQueryClient();
  return useMutation<IAddProjectMemberResponse, Error, IAddProjectMemberPayload>({
    mutationFn: addProjectMember,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["project-members", String(variables.projectId)],
      });
    },
  });
};

/* ──────────────────────────────── */
/* Update Member Role               */
/* ──────────────────────────────── */

export const updateMemberRole = async (
  payload: IUpdateMemberRolePayload
): Promise<IUpdateMemberRoleResponse> => {
  return apiFetch<IUpdateMemberRoleResponse>("/projects/update-member-role", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const useUpdateMemberRole = () => {
  const queryClient = useQueryClient();
  return useMutation<IUpdateMemberRoleResponse, Error, IUpdateMemberRolePayload>({
    mutationFn: updateMemberRole,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["project-members", String(variables.projectId)],
      });
    },
  });
};

/* ──────────────────────────────── */
/* Remove Project Member            */
/* ──────────────────────────────── */

export const removeProjectMember = async (
  payload: IRemoveProjectMemberPayload
): Promise<IRemoveProjectMemberResponse> => {
  return apiFetch<IRemoveProjectMemberResponse>("/projects/remove-member", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const useRemoveProjectMember = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IRemoveProjectMemberResponse,
    Error,
    IRemoveProjectMemberPayload
  >({
    mutationFn: removeProjectMember,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["project-members", String(variables.projectId)],
      });
    },
  });
};
