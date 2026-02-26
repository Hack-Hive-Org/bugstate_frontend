// services/user.service.ts

import apiFetch from "@/lib/api";
import { IGenerateApiKeyResponse, IGetApiKeysResponse, IRevokeApiKeyResponse, IUserProfileResponse, IUserProjectsResponse } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const getUserProfile = async (): Promise<IUserProfileResponse> => {
  return apiFetch<IUserProfileResponse>("/user/profile", {
    method: "GET",
  });
};

export const useGetUserProfile = () =>
  useQuery<IUserProfileResponse>({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
  });

export const getMyProjects = async (): Promise<IUserProjectsResponse> => {
  return apiFetch<IUserProjectsResponse>("/user/projects", {
    method: "GET",
  });
};


export const generateApiKey = async (
  projectId: string | number
): Promise<IGenerateApiKeyResponse> => {
  return apiFetch<IGenerateApiKeyResponse>("/user/generate-api-key", {
    method: "POST",
    body: JSON.stringify({ projectId }),
  });
};

export const useGenerateApiKey = () => {
  const queryClient = useQueryClient();
  return useMutation<IGenerateApiKeyResponse, Error, string | number>({
    mutationFn: generateApiKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
    },
  });
};

export const useGetMyProjects = () =>
  useQuery<{ projects: ProjectWithErrorSummary[] }>({
    queryKey: ["my-projects"],
    queryFn: getMyProjects
    
  });

export const getApiKeys = async (
  projectId: string
): Promise<IGetApiKeysResponse> => {
  return apiFetch<IGetApiKeysResponse>(
    `/user/api-keys?projectId=${projectId}`,
    {
      method: "GET",
    }
  );
};

export const useGetApiKeys = (projectId: string) =>
  useQuery({
    queryKey: ["api-keys", projectId],
    queryFn: () => getApiKeys(projectId),
    enabled: !!projectId, // prevents call if undefined
  });

  interface RevokeApiKeyPayload {
  projectId: string;
  apiKeyId: string;
}

export const revokeApiKey = async (
  payload: RevokeApiKeyPayload
): Promise<IRevokeApiKeyResponse> => {
  return apiFetch<IRevokeApiKeyResponse>("/user/revoke-api-key", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const useRevokeApiKey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: revokeApiKey,
    onSuccess: (_data, variables) => {
      // Refetch keys for that project
      queryClient.invalidateQueries({
        queryKey: ["api-keys", variables.projectId],
      });
    },
  });
};