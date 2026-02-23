import { useQuery } from "@tanstack/react-query";

const node_env = process.env.NEXT_PUBLIC_NODE_ENV;
const api =
  node_env === "development"
    ? process.env.NEXT_PUBLIC_API_URL_DEV
    : process.env.NEXT_PUBLIC_API_URL_PROD;

/* ──────────────────────────────── */
/* Fetch All Errors (with filters) */
/* ──────────────────────────────── */

export const useGetProjectErrors = (
  projectId: string,
  params?: {
    status?: string;
    limit?: number;
    offset?: number;
  }
) => {
  return useQuery({
    queryKey: ["project-errors", projectId, params],
    enabled: !!projectId,
    queryFn: async () => {
      const search = new URLSearchParams();
      if (params?.status) search.append("status", params.status);
      if (params?.limit) search.append("limit", String(params.limit));
      if (params?.offset) search.append("offset", String(params.offset));

      const res = await fetch(
        `${api}/errors/${projectId}/errors?${search.toString()}`,
        { credentials: "include" }
      );

      if (!res.ok) throw new Error("Failed to fetch errors");
      return res.json();
    },
  });
};

/* ──────────────────────────────── */
/* Fetch Summary (open/resolved)   */
/* ──────────────────────────────── */

export const useGetErrorSummary = (projectId: string) => {
  return useQuery({
    queryKey: ["error-summary", projectId],
    enabled: !!projectId,
    queryFn: async () => {
      const res = await fetch(
        `${api}/errors/${projectId}/errors/summary`,
        { credentials: "include" }
      );

      if (!res.ok) throw new Error("Failed to fetch summary");
      return res.json();
    },
  });
};