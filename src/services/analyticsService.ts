import apiClient from './apiClient';
import type { AnalyticsOverview, EngagementTrend, PlatformMetric, TopPost, PostingTimeInsight } from '@/types';

export const analyticsService = {
  async getOverview(): Promise<AnalyticsOverview> {
    const { data } = await apiClient.get('/analytics/overview');
    return data;
  },

  async getEngagementTrends(days?: number): Promise<EngagementTrend[]> {
    const { data } = await apiClient.get('/analytics/engagement', { params: { days } });
    return data;
  },

  async getPlatformMetrics(): Promise<PlatformMetric[]> {
    const { data } = await apiClient.get('/analytics/platforms');
    return data;
  },

  async getTopPosts(limit?: number): Promise<TopPost[]> {
    const { data } = await apiClient.get('/analytics/top-posts', { params: { limit } });
    return data;
  },

  async getPostingTimeInsights(): Promise<PostingTimeInsight[]> {
    const { data } = await apiClient.get('/analytics/posting-times');
    return data;
  },
};
