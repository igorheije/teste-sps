import { Request } from "express";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: UserResponse;
  token: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role?: "admin" | "user";
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  role?: "admin" | "user";
}

export interface AuthRequest extends Request {
  user?: User;
}

export interface AuthRequestWithParams<P = any> extends Request<P> {
  user?: User;
}

export interface ApiResponse<T = any> {
  message?: string;
  error?: string;
  data?: T;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
