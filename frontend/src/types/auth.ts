
export type ApiUserRole = 'PATIENT' | 'PSYCHOLOGIST' | 'ADMIN';

export interface RegisterRequest {
  tenantId: string;
  name: string;
  email: string;
  password: string;
  role?: ApiUserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: ApiUserRole;
  tenantId: string;
}

export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}
