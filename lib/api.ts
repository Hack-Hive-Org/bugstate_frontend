// lib/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

const PUBLIC_PATHS = ["/", "/pages/signup", "/pages/login"];

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function attemptRefresh(): Promise<boolean> {
  // Deduplicate concurrent refresh calls
  if (isRefreshing && refreshPromise) return refreshPromise;

  isRefreshing   = true;
  refreshPromise = fetch(`${BASE_URL}/auth/refresh`, {
    method      : "POST",
    credentials : "include",
  })
    .then((r) => r.ok)
    .catch(() => false)
    .finally(() => {
      isRefreshing   = false;
      refreshPromise = null;
    });

  return refreshPromise;
}

async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  // Silent token refresh on first 401
  if (res.status === 401 && !endpoint.startsWith("/auth/")) {
    const refreshed = await attemptRefresh();

    if (!refreshed) {
      // Only redirect to landing page from protected routes to avoid reload loops
      const onProtectedRoute =
        typeof window !== "undefined" &&
        !PUBLIC_PATHS.includes(window.location.pathname);
      if (onProtectedRoute) {
        window.location.href = "/";
      }
      throw new Error("Session expired. Please log in again.");
    }

    // Retry original request with the new access token
    const retry = await fetch(`${BASE_URL}${endpoint}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      ...options,
    });

    if (!retry.ok) {
      const error = await retry.json().catch(() => ({}));
      throw new Error(error.error || "Something went wrong");
    }

    return retry.json();
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Something went wrong");
  }

  return res.json();
}

export default apiFetch;
