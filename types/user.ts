export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message?: string;
  user?: User;
  token?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface SessionResponse {
  success: boolean;
  authorized: boolean;
  session?: {
    id: string;
  };
  message?: string;
}
