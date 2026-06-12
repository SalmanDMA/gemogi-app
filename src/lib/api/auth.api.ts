import { apiClient } from '../axios';
import { ApiResponse } from '../../types/api';
import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  UpdateProfilePayload,
  User,
} from '../../types/auth';

export const authApi = {
  register: async (
    payload: RegisterPayload,
  ): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/register',
      payload,
    );
    return response.data;
  },

  login: async (payload: LoginPayload): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      payload,
    );
    return response.data;
  },

  logout: async (): Promise<ApiResponse<null>> => {
    const response = await apiClient.post<ApiResponse<null>>('/auth/logout');
    return response.data;
  },

  getMe: async (): Promise<ApiResponse<{ user: User }>> => {
    const response =
      await apiClient.get<ApiResponse<{ user: User }>>('/auth/me');
    return response.data;
  },

  updateProfile: async (
    payload: UpdateProfilePayload,
  ): Promise<ApiResponse<{ user: User }>> => {
    const response = await apiClient.put<ApiResponse<{ user: User }>>(
      '/auth/profile',
      payload,
    );
    return response.data;
  },
};
