"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import apiFetch from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthUser {
  id: string;
  email: string;
  name?: string | null;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  refetch: () => Promise<void>;
}

// ─── Public routes that do NOT require authentication ─────────────────────────

const PUBLIC_PATHS = ["/", "/pages/signup", "/pages/login"];

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  logout: async () => {},
  refetch: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router   = useRouter();
  const pathname = usePathname();
  const isPublic = PUBLIC_PATHS.includes(pathname);

  const [user, setUser]           = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const data = await apiFetch<{ user: AuthUser }>("/user/profile");
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch {
      // Ignore errors on logout – clear state regardless
    } finally {
      setUser(null);
      router.push("/");
    }
  }, [router]);

  // Always fetch user so public pages (landing, header) know auth state too
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const value: AuthContextValue = {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout,
    refetch: fetchUser,
  };

  // Show nothing while validating the session for protected routes
  if (!isPublic && isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
