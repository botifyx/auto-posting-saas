'use client';

import React from 'react';
import { cn } from '@/utils/cn';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { mockPosts } from '@/lib/mockData';
import { platformConfig } from '@/constants';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function ScheduledPage() {
    const scheduledPosts = mockPosts.filter((p) => p.status === 'scheduled' || p.status === 'approved');

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">Scheduled Posts</h1>
                    <p className="text-sm text-stone-500 dark:text-zinc-400 mt-1">{scheduledPosts.length} posts upcoming</p>
                </div>
            </div>

            <div className="space-y-4 stagger-children">
                {scheduledPosts.map((post) => (
                    <div key={post.id} className="premium-card p-5 hover:-translate-y-0.5 transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex flex-col items-center justify-center flex-shrink-0">
                                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{post.scheduledAt ? dayjs(post.scheduledAt).format('DD') : '--'}</span>
                                <span className="text-[10px] text-indigo-400 font-medium uppercase">{post.scheduledAt ? dayjs(post.scheduledAt).format('MMM') : ''}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-stone-700 dark:text-zinc-300 line-clamp-2 leading-relaxed">{post.content}</p>
                                <div className="flex items-center gap-3 mt-2">
                                    <div className="flex items-center gap-1 text-xs text-stone-400 dark:text-zinc-500">
                                        <Clock className="w-3 h-3" />
                                        {post.scheduledAt ? dayjs(post.scheduledAt).format('h:mm A') : 'Not scheduled'}
                                    </div>
                                    <span className="text-xs text-stone-300 dark:text-zinc-600">·</span>
                                    <div className="flex gap-1">
                                        {post.platforms.map((p) => (
                                            <span key={p} className="text-xs" title={platformConfig[p].name}>{platformConfig[p].icon}</span>
                                        ))}
                                    </div>
                                    {post.scheduledAt && (
                                        <>
                                            <span className="text-xs text-stone-300 dark:text-zinc-600">·</span>
                                            <span className="text-xs text-indigo-500 font-medium">{dayjs(post.scheduledAt).fromNow()}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <button className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors flex-shrink-0">
                                <ArrowRight className="w-4 h-4 text-stone-400 dark:text-zinc-500" />
                            </button>
                        </div>
                    </div>
                ))}

                {scheduledPosts.length === 0 && (
                    <div className="premium-card p-12 text-center">
                        <Calendar className="w-10 h-10 text-stone-300 dark:text-zinc-600 mx-auto mb-3" />
                        <p className="text-sm text-stone-500 dark:text-zinc-400">No scheduled posts</p>
                    </div>
                )}
            </div>
        </div>
    );
}
