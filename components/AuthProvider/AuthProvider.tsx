"use client";

import { useEffect, useState, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { checkSession, getMe } from "@/lib/api/clientApi";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
    const isPrivateRoute =
      pathname.startsWith("/profile") || pathname.startsWith("/notes");

    const initAuth = async () => {
      if (isAuthenticated) {
        setIsLoading(false);
        return;
      }

      try {
        console.log("Refresh session");
        const session = await checkSession();
        const user = await getMe();
        console.log("Session", session);
        console.log("User", user);
        if (session && user) {
          setUser(user);
        } else {
          clearAuth();
          if (isPrivateRoute) router.push("/sign-in");
        }
      } catch {
        clearAuth();
        if (isPrivateRoute) router.push("/sign-in");
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [setUser, clearAuth, router, pathname, isAuthenticated]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Loading session...</p>
      </div>
    );
  }

  return <>{children}</>;
}
