import {
  LayoutDashboard,
  PenSquare,
  BookOpen,
  CheckCircle,
  Clock,
  ListOrdered,
  BarChart3,
  Globe,
  Users,
  Settings,
  Calendar,
} from 'lucide-react';
import type { Platform, PostStatus } from '@/types';

// --- Navigation Items ---
export const sidebarNavItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Create Post', href: '/dashboard/create-post', icon: PenSquare },
  { label: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
  { label: 'Content Library', href: '/dashboard/content', icon: BookOpen },
  { label: 'Approval', href: '/dashboard/approval', icon: CheckCircle },
  { label: 'Scheduled', href: '/dashboard/scheduled', icon: Clock },
  { label: 'Queue', href: '/dashboard/queue', icon: ListOrdered },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { label: 'Social Accounts', href: '/dashboard/social-accounts', icon: Globe },
  { label: 'Team', href: '/dashboard/team', icon: Users },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

// --- Platform Config ---
export const platformConfig: Record<Platform, {
  name: string;
  color: string;
  bgColor: string;
  maxChars: number;
  icon: string;
}> = {
  linkedin: {
    name: 'LinkedIn',
    color: '#0A66C2',
    bgColor: 'bg-[#0A66C2]/10',
    maxChars: 3000,
    icon: '💼',
  },
  twitter: {
    name: 'Twitter / X',
    color: '#000000',
    bgColor: 'bg-neutral-900/10',
    maxChars: 280,
    icon: '𝕏',
  },
  instagram: {
    name: 'Instagram',
    color: '#E4405F',
    bgColor: 'bg-[#E4405F]/10',
    maxChars: 2200,
    icon: '📸',
  },
  facebook: {
    name: 'Facebook',
    color: '#1877F2',
    bgColor: 'bg-[#1877F2]/10',
    maxChars: 63206,
    icon: '📘',
  },
  youtube: {
    name: 'YouTube',
    color: '#FF0000',
    bgColor: 'bg-[#FF0000]/10',
    maxChars: 5000,
    icon: '▶️',
  },
  tiktok: {
    name: 'TikTok',
    color: '#000000',
    bgColor: 'bg-neutral-900/10',
    maxChars: 2200,
    icon: '🎵',
  },
};

// --- Post Status Config ---
export const statusConfig: Record<PostStatus, {
  label: string;
  color: string;
  bgColor: string;
  dotColor: string;
}> = {
  draft: {
    label: 'Draft',
    color: 'text-neutral-500',
    bgColor: 'bg-neutral-500/10',
    dotColor: 'bg-neutral-400',
  },
  pending_review: {
    label: 'Pending Review',
    color: 'text-amber-600',
    bgColor: 'bg-amber-500/10',
    dotColor: 'bg-amber-400',
  },
  approved: {
    label: 'Approved',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-500/10',
    dotColor: 'bg-emerald-400',
  },
  rejected: {
    label: 'Rejected',
    color: 'text-red-600',
    bgColor: 'bg-red-500/10',
    dotColor: 'bg-red-400',
  },
  scheduled: {
    label: 'Scheduled',
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/10',
    dotColor: 'bg-blue-400',
  },
  posted: {
    label: 'Posted',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-500/10',
    dotColor: 'bg-emerald-400',
  },
  failed: {
    label: 'Failed',
    color: 'text-red-600',
    bgColor: 'bg-red-500/10',
    dotColor: 'bg-red-400',
  },
};

// --- AI Tones ---
export const aiTones = [
  { value: 'professional', label: 'Professional', emoji: '👔' },
  { value: 'casual', label: 'Casual', emoji: '😊' },
  { value: 'humorous', label: 'Humorous', emoji: '😄' },
  { value: 'inspirational', label: 'Inspirational', emoji: '✨' },
  { value: 'educational', label: 'Educational', emoji: '📚' },
] as const;

export const aiContentLengths = [
  { value: 'short', label: 'Short', description: '1-2 sentences' },
  { value: 'medium', label: 'Medium', description: '3-5 sentences' },
  { value: 'long', label: 'Long', description: '1-2 paragraphs' },
] as const;

// --- API ---
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
