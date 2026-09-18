import type {
  AuthResponse,
  SessionResponse,
  SignInRequest,
  SignUpRequest,
} from "../types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function signUp(data: SignUpRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Registration failed");
  }

  return result;
}

export async function signIn(data: SignInRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result;
}

export async function getSession(): Promise<SessionResponse> {
  const response = await fetch(`${API_URL}/api/auth/session`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Session is invalid");
  }

  return result;
}

export async function signOut(): Promise<{
  success: boolean;
  message: string;
}> {
  const response = await fetch(`${API_URL}/api/auth/sign-out`, {
    method: "DELETE",
    credentials: "include",
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Logout failed");
  }
  return result;
}
