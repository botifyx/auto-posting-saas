import { create } from 'zustand';
import type { Post, Platform, MediaFile } from '@/types';

interface PostState {
  // Draft state
  draftContent: string;
  draftPlatforms: Platform[];
  draftMedia: MediaFile[];
  draftScheduledAt: string | null;

  // Actions
  setDraftContent: (content: string) => void;
  togglePlatform: (platform: Platform) => void;
  setDraftPlatforms: (platforms: Platform[]) => void;
  addMedia: (media: MediaFile) => void;
  removeMedia: (id: string) => void;
  setScheduledAt: (date: string | null) => void;
  resetDraft: () => void;

  // Selected post for editing
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
}

export const usePostStore = create<PostState>((set) => ({
  draftContent: '',
  draftPlatforms: [],
  draftMedia: [],
  draftScheduledAt: null,

  setDraftContent: (content) => set({ draftContent: content }),
  togglePlatform: (platform) =>
    set((state) => ({
      draftPlatforms: state.draftPlatforms.includes(platform)
        ? state.draftPlatforms.filter((p) => p !== platform)
        : [...state.draftPlatforms, platform],
    })),
  setDraftPlatforms: (platforms) => set({ draftPlatforms: platforms }),
  addMedia: (media) => set((state) => ({ draftMedia: [...state.draftMedia, media] })),
  removeMedia: (id) => set((state) => ({ draftMedia: state.draftMedia.filter((m) => m.id !== id) })),
  setScheduledAt: (date) => set({ draftScheduledAt: date }),
  resetDraft: () =>
    set({
      draftContent: '',
      draftPlatforms: [],
      draftMedia: [],
      draftScheduledAt: null,
    }),

  selectedPost: null,
  setSelectedPost: (post) => set({ selectedPost: post }),
}));
