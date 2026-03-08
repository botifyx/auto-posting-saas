// ============================================================
// AUTO SOCIAL MEDIA POSTING PLATFORM — Type Definitions
// ============================================================

// --- Auth ---
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  company?: string;
  createdAt: string;
}

export type UserRole = 'owner' | 'admin' | 'editor' | 'viewer';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  company?: string;
}

// --- Social Platforms ---
export type Platform = 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'youtube' | 'tiktok';

export interface SocialAccount {
  id: string;
  platform: Platform;
  username: string;
  displayName: string;
  avatar?: string;
  isConnected: boolean;
  connectedAt?: string;
  followers?: number;
}

// --- Posts ---
export type PostStatus = 'draft' | 'pending_review' | 'approved' | 'rejected' | 'scheduled' | 'posted' | 'failed';

export interface Post {
  id: string;
  content: string;
  media: MediaFile[];
  platforms: Platform[];
  status: PostStatus;
  scheduledAt?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  reviewer?: User;
  reviewComment?: string;
  analytics?: PostAnalytics;
}

export interface MediaFile {
  id: string;
  url: string;
  type: 'image' | 'video';
  name: string;
  size: number;
  thumbnail?: string;
}

export interface PostAnalytics {
  impressions: number;
  engagements: number;
  clicks: number;
  shares: number;
  likes: number;
  comments: number;
}

// --- Scheduler ---
export interface ScheduleSlot {
  id: string;
  postId: string;
  date: string;
  time: string;
  platforms: Platform[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  platforms: Platform[];
  status: PostStatus;
  post: Post;
}

// --- Analytics ---
export interface AnalyticsOverview {
  totalPosts: number;
  totalEngagement: number;
  totalImpressions: number;
  totalFollowers: number;
  engagementGrowth: number;
  followerGrowth: number;
  postsGrowth: number;
}

export interface EngagementTrend {
  date: string;
  engagement: number;
  impressions: number;
  clicks: number;
}

export interface PlatformMetric {
  platform: Platform;
  followers: number;
  engagement: number;
  posts: number;
  growth: number;
}

export interface TopPost {
  id: string;
  content: string;
  platform: Platform;
  engagement: number;
  impressions: number;
  publishedAt: string;
}

export interface PostingTimeInsight {
  hour: number;
  day: string;
  engagement: number;
}

// --- Team ---
export interface TeamMember {
  id: string;
  user: User;
  role: UserRole;
  joinedAt: string;
  lastActive?: string;
}

export interface TeamInvite {
  email: string;
  role: UserRole;
}

// --- Notifications ---
export interface Notification {
  id: string;
  type: 'post_approved' | 'post_rejected' | 'post_published' | 'post_failed' | 'team_invite' | 'comment' | 'mention';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

// --- AI ---
export interface AIGenerateRequest {
  topic: string;
  tone: AITone;
  length: AIContentLength;
  platforms: Platform[];
}

export type AITone = 'professional' | 'casual' | 'humorous' | 'inspirational' | 'educational';
export type AIContentLength = 'short' | 'medium' | 'long';

export interface AIGeneratedContent {
  content: string;
  hashtags: string[];
  characterCount: number;
}

// --- Queue ---
export interface QueueItem {
  id: string;
  post: Post;
  status: 'pending' | 'posting' | 'completed' | 'failed';
  retryCount: number;
  lastAttempt?: string;
  error?: string;
}

// --- Settings ---
export interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    postPublished: boolean;
    postFailed: boolean;
    approvalRequired: boolean;
  };
  appearance: {
    theme: 'light' | 'dark' | 'system';
    sidebarCollapsed: boolean;
  };
  timezone: string;
}
