'use client';

import React from 'react';
import { cn } from '@/utils/cn';
import {
    TrendingUp, TrendingDown, FileText, Users, Eye, ThumbsUp, Clock,
    ArrowUpRight, BarChart3
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar
} from 'recharts';
import { mockAnalyticsOverview, mockEngagementTrends, mockPlatformMetrics, mockTopPosts, mockPosts } from '@/lib/mockData';
import { platformConfig, statusConfig } from '@/constants';
import dayjs from 'dayjs';
import Link from 'next/link';

// Executive metric card
function MetricCard({ title, value, change, icon: Icon, trend }: {
    title: string; value: string; change: number; icon: React.ElementType; trend: 'up' | 'down';
}) {
    return (
        <div className="premium-card p-6 group hover:-translate-y-0.5 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-indigo-500" />
                </div>
                <div className={cn(
                    'flex items-center gap-1 text-sm font-semibold',
                    trend === 'up' ? 'text-emerald-500' : 'text-red-500'
                )}>
                    {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {Math.abs(change)}%
                </div>
            </div>
            <p className="text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">{value}</p>
            <p className="text-sm text-stone-500 dark:text-zinc-400 mt-1">{title}</p>
        </div>
    );
}

export default function DashboardPage() {
    const overview = mockAnalyticsOverview;
    const trends = mockEngagementTrends;
    const platforms = mockPlatformMetrics;
    const topPosts = mockTopPosts;
    const recentPosts = mockPosts.filter(p => p.status === 'scheduled' || p.status === 'pending_review');

    // Format numbers
    const formatNumber = (n: number) => {
        if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
        if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
        return n.toString();
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">Executive Dashboard</h1>
                <p className="text-sm text-stone-500 dark:text-zinc-400 mt-1">Strategic overview of your social media performance.</p>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
                <MetricCard
                    title="Total Posts This Month"
                    value={overview.totalPosts.toString()}
                    change={overview.postsGrowth}
                    icon={FileText}
                    trend="up"
                />
                <MetricCard
                    title="Total Engagement"
                    value={formatNumber(overview.totalEngagement)}
                    change={overview.engagementGrowth}
                    icon={ThumbsUp}
                    trend="up"
                />
                <MetricCard
                    title="Total Impressions"
                    value={formatNumber(overview.totalImpressions)}
                    change={15.8}
                    icon={Eye}
                    trend="up"
                />
                <MetricCard
                    title="Audience Growth"
                    value={formatNumber(overview.totalFollowers)}
                    change={overview.followerGrowth}
                    icon={Users}
                    trend="up"
                />
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Engagement Trend */}
                <div className="lg:col-span-2 premium-card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-base font-semibold text-stone-900 dark:text-white">Engagement Trend</h3>
                            <p className="text-xs text-stone-400 dark:text-zinc-500 mt-0.5">Last 8 weeks performance</p>
                        </div>
                        <Link href="/dashboard/analytics" className="flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-600 font-medium transition-colors">
                            View Details <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={trends}>
                            <defs>
                                <linearGradient id="engGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" vertical={false} />
                            <XAxis dataKey="date" tickFormatter={(d) => dayjs(d).format('MMM D')} tick={{ fontSize: 12, fill: '#A8A29E' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 12, fill: '#A8A29E' }} axisLine={false} tickLine={false} tickFormatter={formatNumber} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', border: '1px solid #E7E5E4', borderRadius: '12px', fontSize: '13px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}
                                labelFormatter={(d) => dayjs(d).format('MMM D, YYYY')}
                            />
                            <Area type="monotone" dataKey="engagement" stroke="#6366F1" strokeWidth={2.5} fill="url(#engGradient)" dot={false} activeDot={{ r: 5, strokeWidth: 2 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Platform Performance */}
                <div className="premium-card p-6">
                    <h3 className="text-base font-semibold text-stone-900 dark:text-white mb-6">Platform Performance</h3>
                    <div className="space-y-4">
                        {platforms.map((p) => {
                            const config = platformConfig[p.platform];
                            return (
                                <div key={p.platform} className="flex items-center gap-3">
                                    <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center text-base', config.bgColor)}>
                                        {config.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-sm font-medium text-stone-700 dark:text-zinc-300">{config.name}</p>
                                            <p className="text-xs text-emerald-500 font-semibold">+{p.growth}%</p>
                                        </div>
                                        <div className="w-full h-1.5 bg-stone-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-700"
                                                style={{
                                                    width: `${(p.engagement / 30000) * 100}%`,
                                                    backgroundColor: config.color,
                                                }}
                                            />
                                        </div>
                                        <p className="text-[11px] text-stone-400 dark:text-zinc-500 mt-1">{formatNumber(p.followers)} followers · {formatNumber(p.engagement)} engagements</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Top Performing Posts */}
                <div className="premium-card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-base font-semibold text-stone-900 dark:text-white">Top Performing Posts</h3>
                        <Link href="/dashboard/analytics" className="flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-600 font-medium transition-colors">
                            View All <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {topPosts.slice(0, 4).map((post, i) => {
                            const config = platformConfig[post.platform];
                            return (
                                <div key={post.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-zinc-800/40 transition-colors">
                                    <span className="text-sm font-bold text-stone-300 dark:text-zinc-600 w-6">{i + 1}</span>
                                    <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-sm', config.bgColor)}>
                                        {config.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-stone-700 dark:text-zinc-300 truncate">{post.content}</p>
                                        <p className="text-[11px] text-stone-400 dark:text-zinc-500">{dayjs(post.publishedAt).format('MMM D')} · {formatNumber(post.impressions)} impressions</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-stone-900 dark:text-white">{formatNumber(post.engagement)}</p>
                                        <p className="text-[11px] text-stone-400 dark:text-zinc-500">engagements</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Content Pipeline */}
                <div className="premium-card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-base font-semibold text-stone-900 dark:text-white">Content Pipeline</h3>
                        <Link href="/dashboard/content" className="flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-600 font-medium transition-colors">
                            View All <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {mockPosts.slice(0, 5).map((post) => {
                            const status = statusConfig[post.status];
                            return (
                                <div key={post.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-zinc-800/40 transition-colors">
                                    <div className={cn('w-2 h-2 rounded-full flex-shrink-0', status.dotColor)} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-stone-700 dark:text-zinc-300 truncate">{post.content.substring(0, 60)}...</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className={cn('text-[11px] font-medium', status.color)}>{status.label}</span>
                                            <span className="text-[11px] text-stone-400 dark:text-zinc-500">· {dayjs(post.createdAt).format('MMM D')}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        {post.platforms.map((p) => (
                                            <span key={p} className="text-xs" title={platformConfig[p].name}>{platformConfig[p].icon}</span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
