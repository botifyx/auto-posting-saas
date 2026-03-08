'use client';

import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { RefreshCw, AlertTriangle, Check, Clock, Loader2 } from 'lucide-react';
import { mockQueueItems } from '@/lib/mockData';
import { platformConfig } from '@/constants';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import type { QueueItem } from '@/types';

const queueStatusConfig = {
    pending: { label: 'Pending', color: 'text-amber-600', bgColor: 'bg-amber-500/10', icon: Clock },
    posting: { label: 'Posting', color: 'text-blue-600', bgColor: 'bg-blue-500/10', icon: Loader2 },
    completed: { label: 'Completed', color: 'text-emerald-600', bgColor: 'bg-emerald-500/10', icon: Check },
    failed: { label: 'Failed', color: 'text-red-600', bgColor: 'bg-red-500/10', icon: AlertTriangle },
};

type QueueFilter = 'all' | QueueItem['status'];

export default function QueuePage() {
    const [filter, setFilter] = useState<QueueFilter>('all');
    const filters: QueueFilter[] = ['all', 'pending', 'posting', 'completed', 'failed'];

    const filtered = filter === 'all' ? mockQueueItems : mockQueueItems.filter((q) => q.status === filter);

    const handleRetry = (id: string) => {
        toast.success('Post queued for retry');
    };

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">Publishing Queue</h1>
                <p className="text-sm text-stone-500 dark:text-zinc-400 mt-1">Monitor post publishing status.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                {(['pending', 'posting', 'completed', 'failed'] as const).map((s) => {
                    const config = queueStatusConfig[s];
                    const count = mockQueueItems.filter((q) => q.status === s).length;
                    const Icon = config.icon;
                    return (
                        <div key={s} className="premium-card p-4 hover:-translate-y-0.5 transition-all duration-300">
                            <div className="flex items-center gap-2 mb-2">
                                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', config.bgColor)}>
                                    <Icon className={cn('w-4 h-4', config.color)} />
                                </div>
                            </div>
                            <p className="text-2xl font-extrabold text-stone-900 dark:text-white">{count}</p>
                            <p className="text-xs text-stone-500 dark:text-zinc-400">{config.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Filter */}
            <div className="flex gap-1 bg-stone-100 dark:bg-zinc-800 p-1 rounded-xl w-fit">
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={cn(
                            'px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all',
                            filter === f ? 'bg-white dark:bg-zinc-700 text-stone-900 dark:text-white shadow-sm' : 'text-stone-500 dark:text-zinc-400'
                        )}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Queue Items */}
            <div className="space-y-3 stagger-children">
                {filtered.map((item) => {
                    const config = queueStatusConfig[item.status];
                    const Icon = config.icon;
                    return (
                        <div key={item.id} className="premium-card p-5">
                            <div className="flex items-start gap-4">
                                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', config.bgColor)}>
                                    <Icon className={cn('w-5 h-5', config.color, item.status === 'posting' && 'animate-spin')} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-stone-700 dark:text-zinc-300 line-clamp-2">{item.post.content}</p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <span className={cn('text-xs font-medium', config.color)}>{config.label}</span>
                                        <div className="flex gap-1">
                                            {item.post.platforms.map((p) => (
                                                <span key={p} className="text-xs">{platformConfig[p].icon}</span>
                                            ))}
                                        </div>
                                        {item.retryCount > 0 && (
                                            <span className="text-xs text-stone-400 dark:text-zinc-500">Retry #{item.retryCount}</span>
                                        )}
                                    </div>
                                    {item.error && (
                                        <div className="mt-2 p-2.5 rounded-lg bg-red-50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/10">
                                            <p className="text-xs text-red-600 dark:text-red-400">{item.error}</p>
                                        </div>
                                    )}
                                </div>
                                {item.status === 'failed' && (
                                    <button
                                        onClick={() => handleRetry(item.id)}
                                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all flex-shrink-0"
                                    >
                                        <RefreshCw className="w-3.5 h-3.5" /> Retry
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
