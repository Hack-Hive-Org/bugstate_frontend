// services/auth.service.ts

import apiFetch from "@/lib/api";
import { LoginPayload, LoginResponse, SignUpPayload, SignUpResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

/* ──────────────────────────────── */
/* Sign Up                          */
/* ──────────────────────────────── */

export const signUp = async (payload: SignUpPayload): Promise<SignUpResponse> => {
  return apiFetch<SignUpResponse>("/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const useSignUp = () =>
  useMutation<SignUpResponse, Error, SignUpPayload>({
    mutationFn: signUp,
  });

/* ──────────────────────────────── */
/* Login                            */
/* ──────────────────────────────── */

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  return apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const useLogin = () =>
  useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: login,
  });

/* ──────────────────────────────── */
/* Logout                           */
/* ──────────────────────────────── */

export const logoutRequest = async (): Promise<void> => {
  await apiFetch("/auth/logout", { method: "POST" });
};

/* ──────────────────────────────── */
/* Refresh (manual, rarely needed)  */
/* ──────────────────────────────── */

export const refreshTokenRequest = async (): Promise<{ success: boolean }> => {
  return apiFetch<{ success: boolean }>("/auth/refresh", { method: "POST" });
};
