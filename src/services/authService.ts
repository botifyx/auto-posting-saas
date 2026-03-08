import apiClient from './apiClient';
import type { LoginCredentials, RegisterData, AuthTokens, User } from '@/types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> {
    const { data } = await apiClient.post('/auth/login', credentials);
    return data;
  },

  async register(userData: RegisterData): Promise<{ user: User; tokens: AuthTokens }> {
    const { data } = await apiClient.post('/auth/register', userData);
    return data;
  },

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post('/auth/forgot-password', { email });
  },

  async getProfile(): Promise<User> {
    const { data } = await apiClient.get('/auth/profile');
    return data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
};
