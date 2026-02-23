// lib/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
    console.log("API Base URL:", BASE_URL);
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include", // important for cookies
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Something went wrong");
  }

  return res.json();
}

export default apiFetch;