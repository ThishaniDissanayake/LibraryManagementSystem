export interface LoginData {
  email: string;
  passwordHash: string;
}

export interface RegisterData {
  username: string;
  email: string;
  passwordHash: string;
}

export interface AuthResponse {
  token?: string;
  message?: string;
}