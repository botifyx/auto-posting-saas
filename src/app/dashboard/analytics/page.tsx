'use client';

import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import {
    TrendingUp, Eye, ThumbsUp, Users, ArrowUpRight, Calendar
} from 'lucide-react';
import { mockAnalyticsOverview, mockEngagementTrends, mockPlatformMetrics, mockTopPosts } from '@/lib/mockData';
import { platformConfig } from '@/constants';
import dayjs from 'dayjs';

const timeRanges = ['7D', '30D', '90D', '1Y'];

const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#3B82F6'];

const bestTimes = [
    { day: 'Mon', slots: [{ hour: 9, score: 85 }, { hour: 12, score: 72 }, { hour: 18, score: 90 }] },
    { day: 'Tue', slots: [{ hour: 9, score: 78 }, { hour: 12, score: 88 }, { hour: 18, score: 65 }] },
    { day: 'Wed', slots: [{ hour: 9, score: 92 }, { hour: 12, score: 80 }, { hour: 18, score: 75 }] },
    { day: 'Thu', slots: [{ hour: 9, score: 70 }, { hour: 12, score: 95 }, { hour: 18, score: 82 }] },
    { day: 'Fri', slots: [{ hour: 9, score: 88 }, { hour: 12, score: 76 }, { hour: 18, score: 60 }] },
];

export default function AnalyticsPage() {
    const [range, setRange] = useState('30D');
    const overview = mockAnalyticsOverview;

    const formatNumber = (n: number) => {
        if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
        if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
        return n.toString();
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">Analytics</h1>
                    <p className="text-sm text-stone-500 dark:text-zinc-400 mt-1">Strategic performance insights across all platforms.</p>
                </div>
                <div className="flex items-center gap-1 bg-stone-100 dark:bg-zinc-800 p-1 rounded-xl">
                    {timeRanges.map((r) => (
                        <button
                            key={r}
                            onClick={() => setRange(r)}
                            className={cn(
                                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                                range === r ? 'bg-white dark:bg-zinc-700 text-stone-900 dark:text-white shadow-sm' : 'text-stone-500 dark:text-zinc-400'
                            )}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
                {[
                    { label: 'Total Impressions', value: formatNumber(overview.totalImpressions), change: 15.8, icon: Eye },
                    { label: 'Engagements', value: formatNumber(overview.totalEngagement), change: overview.engagementGrowth, icon: ThumbsUp },
                    { label: 'Audience', value: formatNumber(overview.totalFollowers), change: overview.followerGrowth, icon: Users },
                    { label: 'Posts Published', value: overview.totalPosts.toString(), change: overview.postsGrowth, icon: Calendar },
                ].map((kpi) => (
                    <div key={kpi.label} className="premium-card p-5 hover:-translate-y-0.5 transition-all duration-300">
                        <div className="flex items-center gap-2 mb-3">
                            <kpi.icon className="w-4 h-4 text-stone-400 dark:text-zinc-500" />
                            <p className="text-xs text-stone-500 dark:text-zinc-400 font-medium">{kpi.label}</p>
                        </div>
                        <p className="text-2xl font-extrabold text-stone-900 dark:text-white">{kpi.value}</p>
                        <p className="text-xs text-emerald-500 font-semibold mt-1 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> +{kpi.change}% vs prev period
                        </p>
                    </div>
                ))}
            </div>

            {/* Engagement Trend Chart */}
            <div className="premium-card p-6">
                <h3 className="text-base font-semibold text-stone-900 dark:text-white mb-6">Engagement Growth Trend</h3>
                <ResponsiveContainer width="100%" height={320}>
                    <AreaChart data={mockEngagementTrends}>
                        <defs>
                            <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="impGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" vertical={false} />
                        <XAxis dataKey="date" tickFormatter={(d) => dayjs(d).format('MMM D')} tick={{ fontSize: 12, fill: '#A8A29E' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 12, fill: '#A8A29E' }} axisLine={false} tickLine={false} tickFormatter={formatNumber} />
                        <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #E7E5E4', borderRadius: '12px', fontSize: '13px' }} labelFormatter={(d) => dayjs(d).format('MMM D, YYYY')} />
                        <Area type="monotone" dataKey="engagement" stroke="#6366F1" strokeWidth={2.5} fill="url(#engGrad)" dot={false} name="Engagement" />
                        <Area type="monotone" dataKey="clicks" stroke="#8B5CF6" strokeWidth={2} fill="url(#impGrad)" dot={false} name="Clicks" strokeDasharray="5 5" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Platform Comparison */}
                <div className="premium-card p-6">
                    <h3 className="text-base font-semibold text-stone-900 dark:text-white mb-6">Platform Comparison</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={mockPlatformMetrics} barSize={32}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" vertical={false} />
                            <XAxis dataKey="platform" tickFormatter={(p) => platformConfig[p as keyof typeof platformConfig]?.name || p} tick={{ fontSize: 12, fill: '#A8A29E' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 12, fill: '#A8A29E' }} axisLine={false} tickLine={false} tickFormatter={formatNumber} />
                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #E7E5E4', borderRadius: '12px', fontSize: '13px' }} />
                            <Bar dataKey="engagement" fill="#6366F1" radius={[8, 8, 0, 0]} name="Engagement" />
                            <Bar dataKey="followers" fill="#C7D2FE" radius={[8, 8, 0, 0]} name="Followers" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Best Time to Post */}
                <div className="premium-card p-6">
                    <h3 className="text-base font-semibold text-stone-900 dark:text-white mb-6">Best Time to Post</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-xs text-stone-400 dark:text-zinc-500 font-medium pl-10">
                            <span className="w-16 text-center">9:00 AM</span>
                            <span className="w-16 text-center">12:00 PM</span>
                            <span className="w-16 text-center">6:00 PM</span>
                        </div>
                        {bestTimes.map((day) => (
                            <div key={day.day} className="flex items-center gap-3">
                                <span className="text-sm font-medium text-stone-500 dark:text-zinc-400 w-8">{day.day}</span>
                                {day.slots.map((slot) => (
                                    <div
                                        key={slot.hour}
                                        className="w-16 h-10 rounded-lg flex items-center justify-center text-xs font-semibold transition-all hover:scale-105"
                                        style={{
                                            backgroundColor: `rgba(99, 102, 241, ${slot.score / 100})`,
                                            color: slot.score > 70 ? '#fff' : '#6366F1',
                                        }}
                                    >
                                        {slot.score}%
                                    </div>
                                ))}
                            </div>
                        ))}
                        <p className="text-xs text-stone-400 dark:text-zinc-500 mt-2">Engagement probability based on historical data</p>
                    </div>
                </div>
            </div>

            {/* Top Content */}
            <div className="premium-card p-6">
                <h3 className="text-base font-semibold text-stone-900 dark:text-white mb-6">Top Performing Content</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-stone-200 dark:border-zinc-800">
                                <th className="text-left py-3 text-xs font-medium text-stone-400 dark:text-zinc-500 uppercase tracking-wider">#</th>
                                <th className="text-left py-3 text-xs font-medium text-stone-400 dark:text-zinc-500 uppercase tracking-wider">Content</th>
                                <th className="text-left py-3 text-xs font-medium text-stone-400 dark:text-zinc-500 uppercase tracking-wider">Platform</th>
                                <th className="text-right py-3 text-xs font-medium text-stone-400 dark:text-zinc-500 uppercase tracking-wider">Impressions</th>
                                <th className="text-right py-3 text-xs font-medium text-stone-400 dark:text-zinc-500 uppercase tracking-wider">Engagements</th>
                                <th className="text-right py-3 text-xs font-medium text-stone-400 dark:text-zinc-500 uppercase tracking-wider">ER</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockTopPosts.map((post, i) => {
                                const config = platformConfig[post.platform];
                                const er = ((post.engagement / post.impressions) * 100).toFixed(1);
                                return (
                                    <tr key={post.id} className="border-b border-stone-100 dark:border-zinc-800/50 hover:bg-stone-50 dark:hover:bg-zinc-800/30 transition-colors">
                                        <td className="py-3 font-bold text-stone-300 dark:text-zinc-600">{i + 1}</td>
                                        <td className="py-3 text-stone-700 dark:text-zinc-300 max-w-xs truncate">{post.content}</td>
                                        <td className="py-3">
                                            <span className={cn('inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium', config.bgColor)} style={{ color: config.color }}>
                                                {config.icon} {config.name}
                                            </span>
                                        </td>
                                        <td className="py-3 text-right text-stone-700 dark:text-zinc-300 font-medium">{formatNumber(post.impressions)}</td>
                                        <td className="py-3 text-right text-stone-700 dark:text-zinc-300 font-medium">{formatNumber(post.engagement)}</td>
                                        <td className="py-3 text-right font-semibold text-emerald-500">{er}%</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
