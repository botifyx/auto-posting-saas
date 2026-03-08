import apiClient from './apiClient';
import type { SocialAccount, Platform } from '@/types';

export const socialService = {
  async getAccounts(): Promise<SocialAccount[]> {
    const { data } = await apiClient.get('/social/accounts');
    return data;
  },

  async connectAccount(platform: Platform): Promise<{ authUrl: string }> {
    const { data } = await apiClient.post('/social/connect', { platform });
    return data;
  },

  async disconnectAccount(id: string): Promise<void> {
    await apiClient.delete(`/social/accounts/${id}`);
  },

  async refreshAccount(id: string): Promise<SocialAccount> {
    const { data } = await apiClient.post(`/social/accounts/${id}/refresh`);
    return data;
  },
};
