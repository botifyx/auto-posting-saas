// ============================================================
// Mock Data — For development and demonstration
// ============================================================
import type {
  User, Post, SocialAccount, Notification, AnalyticsOverview,
  EngagementTrend, PlatformMetric, TopPost, QueueItem, TeamMember, CalendarEvent
} from '@/types';

export const mockUser: User = {
  id: '1',
  email: 'sarah.chen@company.com',
  name: 'Sarah Chen',
  avatar: '',
  role: 'owner',
  company: 'TechVentures Inc.',
  createdAt: '2024-01-15T00:00:00Z',
};

export const mockSocialAccounts: SocialAccount[] = [
  { id: '1', platform: 'linkedin', username: 'techventures', displayName: 'TechVentures Inc.', isConnected: true, connectedAt: '2024-01-20T00:00:00Z', followers: 45200 },
  { id: '2', platform: 'twitter', username: '@techventures', displayName: 'TechVentures', isConnected: true, connectedAt: '2024-01-20T00:00:00Z', followers: 32100 },
  { id: '3', platform: 'instagram', username: 'techventures', displayName: 'TechVentures', isConnected: true, connectedAt: '2024-02-01T00:00:00Z', followers: 28900 },
  { id: '4', platform: 'facebook', username: 'TechVentures', displayName: 'TechVentures Inc.', isConnected: true, connectedAt: '2024-02-10T00:00:00Z', followers: 51000 },
  { id: '5', platform: 'youtube', username: 'TechVentures', displayName: 'TechVentures', isConnected: false, followers: 0 },
  { id: '6', platform: 'tiktok', username: 'techventures', displayName: 'TechVentures', isConnected: false, followers: 0 },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    content: 'Excited to announce our latest product launch! 🚀 After months of development, we\'re bringing something revolutionary to the market. Stay tuned for more details. #Innovation #Tech #Launch',
    media: [],
    platforms: ['linkedin', 'twitter'],
    status: 'posted',
    scheduledAt: '2024-03-01T10:00:00Z',
    publishedAt: '2024-03-01T10:00:00Z',
    createdAt: '2024-02-28T09:00:00Z',
    updatedAt: '2024-03-01T10:00:00Z',
    author: mockUser,
    analytics: { impressions: 15420, engagements: 1240, clicks: 380, shares: 89, likes: 672, comments: 99 },
  },
  {
    id: '2',
    content: 'Great insights from our CEO at the Global Tech Summit 2024. The future of AI in enterprise is here. Read the full recap on our blog.',
    media: [],
    platforms: ['linkedin', 'facebook'],
    status: 'scheduled',
    scheduledAt: '2024-03-15T14:00:00Z',
    createdAt: '2024-03-10T08:00:00Z',
    updatedAt: '2024-03-10T08:00:00Z',
    author: mockUser,
  },
  {
    id: '3',
    content: 'Behind the scenes at our new office! The team is growing and we\'re more excited than ever. 🏢✨ #TeamCulture #Growth',
    media: [],
    platforms: ['instagram', 'facebook'],
    status: 'pending_review',
    createdAt: '2024-03-12T11:00:00Z',
    updatedAt: '2024-03-12T11:00:00Z',
    author: mockUser,
  },
  {
    id: '4',
    content: '5 tips for building a strong remote team culture:\n\n1. Regular video check-ins\n2. Virtual team activities\n3. Clear communication channels\n4. Flexible schedules\n5. Celebrate wins together\n\n#RemoteWork #Leadership',
    media: [],
    platforms: ['linkedin', 'twitter'],
    status: 'approved',
    createdAt: '2024-03-13T09:00:00Z',
    updatedAt: '2024-03-13T14:00:00Z',
    author: mockUser,
    reviewer: { ...mockUser, id: '2', name: 'Alex Kim', email: 'alex@company.com', role: 'admin' },
    reviewComment: 'Great content! Approved for scheduling.',
  },
  {
    id: '5',
    content: 'We\'re hiring! Looking for passionate engineers to join our team. Check out open positions on our careers page. 💼',
    media: [],
    platforms: ['linkedin', 'twitter', 'facebook'],
    status: 'draft',
    createdAt: '2024-03-14T10:00:00Z',
    updatedAt: '2024-03-14T10:00:00Z',
    author: mockUser,
  },
  {
    id: '6',
    content: 'Our Q1 results are in! 📊 Revenue up 35%, customer satisfaction at an all-time high. Thank you to our incredible team and customers.',
    media: [],
    platforms: ['linkedin'],
    status: 'failed',
    scheduledAt: '2024-03-08T09:00:00Z',
    createdAt: '2024-03-07T15:00:00Z',
    updatedAt: '2024-03-08T09:05:00Z',
    author: mockUser,
  },
];

export const mockNotifications: Notification[] = [
  { id: '1', type: 'post_approved', title: 'Post Approved', message: 'Your post "5 tips for building..." has been approved by Alex Kim.', read: false, createdAt: '2024-03-13T14:00:00Z', actionUrl: '/dashboard/content' },
  { id: '2', type: 'post_published', title: 'Post Published', message: 'Your post about the product launch has been published successfully.', read: false, createdAt: '2024-03-01T10:00:00Z', actionUrl: '/dashboard/content' },
  { id: '3', type: 'post_failed', title: 'Post Failed', message: 'Failed to publish Q1 results post to LinkedIn. Click to retry.', read: false, createdAt: '2024-03-08T09:05:00Z', actionUrl: '/dashboard/queue' },
  { id: '4', type: 'team_invite', title: 'New Team Member', message: 'Jordan Lee has joined the team as an Editor.', read: true, createdAt: '2024-03-05T12:00:00Z' },
  { id: '5', type: 'comment', title: 'New Comment', message: 'Alex Kim commented on your draft post.', read: true, createdAt: '2024-03-04T16:30:00Z', actionUrl: '/dashboard/approval' },
];

export const mockAnalyticsOverview: AnalyticsOverview = {
  totalPosts: 147,
  totalEngagement: 89420,
  totalImpressions: 1240000,
  totalFollowers: 157200,
  engagementGrowth: 12.5,
  followerGrowth: 8.3,
  postsGrowth: 23.1,
};

export const mockEngagementTrends: EngagementTrend[] = [
  { date: '2024-02-01', engagement: 2100, impressions: 28000, clicks: 890 },
  { date: '2024-02-08', engagement: 2450, impressions: 31000, clicks: 1020 },
  { date: '2024-02-15', engagement: 2200, impressions: 29500, clicks: 940 },
  { date: '2024-02-22', engagement: 2800, impressions: 35000, clicks: 1150 },
  { date: '2024-03-01', engagement: 3200, impressions: 42000, clicks: 1380 },
  { date: '2024-03-08', engagement: 2900, impressions: 38000, clicks: 1240 },
  { date: '2024-03-15', engagement: 3500, impressions: 45000, clicks: 1500 },
  { date: '2024-03-22', engagement: 3800, impressions: 48000, clicks: 1620 },
];

export const mockPlatformMetrics: PlatformMetric[] = [
  { platform: 'linkedin', followers: 45200, engagement: 28900, posts: 42, growth: 15.2 },
  { platform: 'twitter', followers: 32100, engagement: 22400, posts: 56, growth: 8.7 },
  { platform: 'instagram', followers: 28900, engagement: 19800, posts: 28, growth: 22.1 },
  { platform: 'facebook', followers: 51000, engagement: 18320, posts: 21, growth: 5.4 },
];

export const mockTopPosts: TopPost[] = [
  { id: '1', content: 'Excited to announce our latest product launch! 🚀', platform: 'linkedin', engagement: 1240, impressions: 15420, publishedAt: '2024-03-01T10:00:00Z' },
  { id: '2', content: '5 tips for building a strong remote team culture', platform: 'twitter', engagement: 980, impressions: 12300, publishedAt: '2024-02-25T14:00:00Z' },
  { id: '3', content: 'Behind the scenes at our new office! 🏢', platform: 'instagram', engagement: 875, impressions: 11200, publishedAt: '2024-02-20T09:00:00Z' },
  { id: '4', content: 'Our Q4 growth story — from startup to scale-up', platform: 'linkedin', engagement: 720, impressions: 9800, publishedAt: '2024-02-15T11:00:00Z' },
  { id: '5', content: 'The future of work is distributed. Here\'s why.', platform: 'twitter', engagement: 650, impressions: 8900, publishedAt: '2024-02-10T16:00:00Z' },
];

export const mockQueueItems: QueueItem[] = [
  { id: '1', post: mockPosts[1], status: 'pending', retryCount: 0 },
  { id: '2', post: mockPosts[3], status: 'pending', retryCount: 0 },
  { id: '3', post: mockPosts[0], status: 'completed', retryCount: 0 },
  { id: '4', post: mockPosts[5], status: 'failed', retryCount: 2, lastAttempt: '2024-03-08T09:05:00Z', error: 'API rate limit exceeded. Please try again later.' },
];

export const mockTeamMembers: TeamMember[] = [
  { id: '1', user: mockUser, role: 'owner', joinedAt: '2024-01-15T00:00:00Z', lastActive: '2024-03-14T10:00:00Z' },
  { id: '2', user: { id: '2', name: 'Alex Kim', email: 'alex@company.com', role: 'admin', createdAt: '2024-02-01T00:00:00Z' }, role: 'admin', joinedAt: '2024-02-01T00:00:00Z', lastActive: '2024-03-14T09:30:00Z' },
  { id: '3', user: { id: '3', name: 'Jordan Lee', email: 'jordan@company.com', role: 'editor', createdAt: '2024-03-05T00:00:00Z' }, role: 'editor', joinedAt: '2024-03-05T00:00:00Z', lastActive: '2024-03-13T16:00:00Z' },
  { id: '4', user: { id: '4', name: 'Maria Garcia', email: 'maria@company.com', role: 'viewer', createdAt: '2024-03-10T00:00:00Z' }, role: 'viewer', joinedAt: '2024-03-10T00:00:00Z', lastActive: '2024-03-12T11:00:00Z' },
];

export const mockCalendarEvents: CalendarEvent[] = [
  { id: '1', title: 'Product Launch Announcement', date: '2024-03-18', time: '10:00', platforms: ['linkedin', 'twitter'], status: 'scheduled', post: mockPosts[1] },
  { id: '2', title: 'Team Culture Post', date: '2024-03-19', time: '14:00', platforms: ['instagram', 'facebook'], status: 'pending_review', post: mockPosts[2] },
  { id: '3', title: 'Remote Work Tips', date: '2024-03-20', time: '09:00', platforms: ['linkedin', 'twitter'], status: 'approved', post: mockPosts[3] },
  { id: '4', title: 'Hiring Post', date: '2024-03-22', time: '11:00', platforms: ['linkedin', 'twitter', 'facebook'], status: 'draft', post: mockPosts[4] },
  { id: '5', title: 'Q1 Results', date: '2024-03-25', time: '09:00', platforms: ['linkedin'], status: 'scheduled', post: mockPosts[0] },
];
