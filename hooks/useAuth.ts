"use client";

import { useEffect, useState } from "react";
import { getSession } from "../services/auth.service";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    let cancelled = false;

    const checkSession = async () => {
      try {
        const result = await getSession();

        if (!cancelled) {
          setIsAuthenticated(result.authorized);
        }
      } catch {
        if (!cancelled) {
          setIsAuthenticated(false);
        }
      }
    };

    void checkSession();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    isAuthenticated: isAuthenticated === true,
    authLoading: isAuthenticated === null,
  };
}