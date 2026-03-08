'use client';

import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { Search, Filter, Grid3X3, List, MoreHorizontal, Edit, Trash2, Copy, ExternalLink } from 'lucide-react';
import { mockPosts } from '@/lib/mockData';
import { platformConfig, statusConfig } from '@/constants';
import type { PostStatus } from '@/types';
import dayjs from 'dayjs';
import Link from 'next/link';

const statusFilters: (PostStatus | 'all')[] = ['all', 'draft', 'pending_review', 'approved', 'scheduled', 'posted', 'failed'];

export default function ContentPage() {
    const [filter, setFilter] = useState<PostStatus | 'all'>('all');
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [search, setSearch] = useState('');

    const filtered = mockPosts.filter((p) => {
        if (filter !== 'all' && p.status !== filter) return false;
        if (search && !p.content.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">Content Library</h1>
                    <p className="text-sm text-stone-500 dark:text-zinc-400 mt-1">{mockPosts.length} total posts</p>
                </div>
                <Link href="/dashboard/create-post" className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 transition-all">
                    + New Post
                </Link>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 flex-wrap">
                <div className="relative flex-1 max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search content..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-stone-100 dark:bg-zinc-800/60 border border-transparent text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:border-indigo-500/30 transition-all"
                    />
                </div>
                <div className="flex gap-1 bg-stone-100 dark:bg-zinc-800 p-1 rounded-xl overflow-x-auto">
                    {statusFilters.map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={cn(
                                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap',
                                filter === s ? 'bg-white dark:bg-zinc-700 text-stone-900 dark:text-white shadow-sm' : 'text-stone-500 dark:text-zinc-400'
                            )}
                        >
                            {s === 'all' ? 'All' : statusConfig[s].label}
                        </button>
                    ))}
                </div>
                <div className="flex gap-1 bg-stone-100 dark:bg-zinc-800 p-1 rounded-lg ml-auto">
                    <button onClick={() => setView('grid')} className={cn('p-1.5 rounded-md transition-all', view === 'grid' ? 'bg-white dark:bg-zinc-700 shadow-sm' : '')}>
                        <Grid3X3 className="w-4 h-4 text-stone-500 dark:text-zinc-400" />
                    </button>
                    <button onClick={() => setView('list')} className={cn('p-1.5 rounded-md transition-all', view === 'list' ? 'bg-white dark:bg-zinc-700 shadow-sm' : '')}>
                        <List className="w-4 h-4 text-stone-500 dark:text-zinc-400" />
                    </button>
                </div>
            </div>

            {/* Grid View */}
            {view === 'grid' ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
                    {filtered.map((post) => {
                        const status = statusConfig[post.status];
                        return (
                            <div key={post.id} className="premium-card p-5 group hover:-translate-y-0.5 transition-all duration-300">
                                <div className="flex items-center justify-between mb-3">
                                    <span className={cn('inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium', status.bgColor, status.color)}>
                                        <span className={cn('w-1.5 h-1.5 rounded-full', status.dotColor)} />
                                        {status.label}
                                    </span>
                                    <button className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-zinc-800 transition-all">
                                        <MoreHorizontal className="w-4 h-4 text-stone-400" />
                                    </button>
                                </div>
                                <p className="text-sm text-stone-700 dark:text-zinc-300 line-clamp-3 leading-relaxed mb-4">{post.content}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-1">
                                        {post.platforms.map((p) => (
                                            <span key={p} className="text-xs" title={platformConfig[p].name}>{platformConfig[p].icon}</span>
                                        ))}
                                    </div>
                                    <span className="text-[11px] text-stone-400 dark:text-zinc-500">{dayjs(post.createdAt).format('MMM D, YYYY')}</span>
                                </div>
                                {post.analytics && (
                                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-stone-100 dark:border-zinc-800">
                                        <span className="text-[11px] text-stone-400 dark:text-zinc-500">👁 {post.analytics.impressions.toLocaleString()}</span>
                                        <span className="text-[11px] text-stone-400 dark:text-zinc-500">❤️ {post.analytics.likes}</span>
                                        <span className="text-[11px] text-stone-400 dark:text-zinc-500">💬 {post.analytics.comments}</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="premium-card divide-y divide-stone-100 dark:divide-zinc-800">
                    {filtered.map((post) => {
                        const status = statusConfig[post.status];
                        return (
                            <div key={post.id} className="flex items-center gap-4 p-4 hover:bg-stone-50 dark:hover:bg-zinc-800/30 transition-colors">
                                <span className={cn('w-2 h-2 rounded-full flex-shrink-0', status.dotColor)} />
                                <p className="flex-1 text-sm text-stone-700 dark:text-zinc-300 truncate">{post.content}</p>
                                <div className="flex gap-1 flex-shrink-0">
                                    {post.platforms.map((p) => (
                                        <span key={p} className="text-xs">{platformConfig[p].icon}</span>
                                    ))}
                                </div>
                                <span className={cn('text-xs font-medium px-2 py-0.5 rounded-md', status.bgColor, status.color)}>{status.label}</span>
                                <span className="text-xs text-stone-400 dark:text-zinc-500 w-20 text-right">{dayjs(post.createdAt).format('MMM D')}</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
