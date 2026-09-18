"use client";

import { useEffect, useState } from "react";
import { getSession } from "../services/auth.service";

export function useAuth() {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      try {
        const session = await getSession();

        if (mounted) {
          setAuthorized(session.authorized);
        }
      } catch {
        if (mounted) {
          setAuthorized(false);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    checkSession();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    authorized,
    loading,
    isAuthenticated: authorized,
  };
}
