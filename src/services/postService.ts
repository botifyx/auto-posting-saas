import apiClient from './apiClient';
import type { Post, PostStatus } from '@/types';

export const postService = {
  async getPosts(params?: { status?: PostStatus; page?: number; limit?: number }): Promise<{ posts: Post[]; total: number }> {
    const { data } = await apiClient.get('/posts', { params });
    return data;
  },

  async getPost(id: string): Promise<Post> {
    const { data } = await apiClient.get(`/posts/${id}`);
    return data;
  },

  async createPost(post: Partial<Post>): Promise<Post> {
    const { data } = await apiClient.post('/posts', post);
    return data;
  },

  async updatePost(id: string, post: Partial<Post>): Promise<Post> {
    const { data } = await apiClient.put(`/posts/${id}`, post);
    return data;
  },

  async deletePost(id: string): Promise<void> {
    await apiClient.delete(`/posts/${id}`);
  },

  async approvePost(id: string, comment?: string): Promise<Post> {
    const { data } = await apiClient.post(`/posts/${id}/approve`, { comment });
    return data;
  },

  async rejectPost(id: string, comment: string): Promise<Post> {
    const { data } = await apiClient.post(`/posts/${id}/reject`, { comment });
    return data;
  },

  async schedulePost(id: string, scheduledAt: string): Promise<Post> {
    const { data } = await apiClient.post(`/posts/${id}/schedule`, { scheduledAt });
    return data;
  },

  async retryPost(id: string): Promise<Post> {
    const { data } = await apiClient.post(`/posts/${id}/retry`);
    return data;
  },
};
