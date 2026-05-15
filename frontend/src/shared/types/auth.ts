export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  studentId: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthUser {
  id: string;
  name?: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}