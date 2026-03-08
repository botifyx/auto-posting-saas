'use client';

import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { Check, X, MessageSquare, Send } from 'lucide-react';
import { mockPosts } from '@/lib/mockData';
import { platformConfig, statusConfig } from '@/constants';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import type { PostStatus } from '@/types';

export default function ApprovalPage() {
    const [commentText, setCommentText] = useState<Record<string, string>>({});
    const [filter, setFilter] = useState<'all' | PostStatus>('all');

    const approvalPosts = mockPosts.filter((p) => {
        if (filter === 'all') return ['pending_review', 'approved', 'rejected'].includes(p.status);
        return p.status === filter;
    });

    const handleApprove = (id: string) => {
        toast.success('Post approved successfully');
    };

    const handleReject = (id: string) => {
        if (!commentText[id]) return toast.error('Please add a comment when rejecting');
        toast.success('Post rejected with feedback');
    };

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">Approval Workflow</h1>
                <p className="text-sm text-stone-500 dark:text-zinc-400 mt-1">Review and manage content approvals.</p>
            </div>

            <div className="flex gap-1 bg-stone-100 dark:bg-zinc-800 p-1 rounded-xl w-fit">
                {(['all', 'pending_review', 'approved', 'rejected'] as const).map((s) => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={cn(
                            'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                            filter === s ? 'bg-white dark:bg-zinc-700 text-stone-900 dark:text-white shadow-sm' : 'text-stone-500 dark:text-zinc-400'
                        )}
                    >
                        {s === 'all' ? 'All' : statusConfig[s].label}
                    </button>
                ))}
            </div>

            <div className="space-y-4 stagger-children">
                {approvalPosts.map((post) => {
                    const status = statusConfig[post.status];
                    return (
                        <div key={post.id} className="premium-card p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                                        {post.author.name.split(' ').map(w => w[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-stone-900 dark:text-white">{post.author.name}</p>
                                        <p className="text-xs text-stone-400 dark:text-zinc-500">{dayjs(post.createdAt).format('MMM D, YYYY · h:mm A')}</p>
                                    </div>
                                </div>
                                <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium', status.bgColor, status.color)}>
                                    <span className={cn('w-1.5 h-1.5 rounded-full', status.dotColor)} />
                                    {status.label}
                                </span>
                            </div>

                            <p className="text-sm text-stone-700 dark:text-zinc-300 leading-relaxed mb-4 whitespace-pre-wrap">{post.content}</p>

                            <div className="flex items-center gap-2 mb-4">
                                {post.platforms.map((p) => (
                                    <span key={p} className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium', platformConfig[p].bgColor)} style={{ color: platformConfig[p].color }}>
                                        {platformConfig[p].icon} {platformConfig[p].name}
                                    </span>
                                ))}
                            </div>

                            {post.reviewComment && (
                                <div className="bg-stone-50 dark:bg-zinc-800/40 rounded-xl p-3 mb-4">
                                    <p className="text-xs text-stone-400 dark:text-zinc-500 mb-1">Reviewer Comment</p>
                                    <p className="text-sm text-stone-600 dark:text-zinc-300">{post.reviewComment}</p>
                                </div>
                            )}

                            {post.status === 'pending_review' && (
                                <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-zinc-800">
                                    <div className="flex-1 relative">
                                        <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                                        <input
                                            type="text"
                                            value={commentText[post.id] || ''}
                                            onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
                                            placeholder="Add a comment..."
                                            className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-stone-100 dark:bg-zinc-800/60 border border-transparent text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:border-indigo-500/30 transition-all"
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleReject(post.id)}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-red-600 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all"
                                    >
                                        <X className="w-4 h-4" /> Reject
                                    </button>
                                    <button
                                        onClick={() => handleApprove(post.id)}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 transition-all"
                                    >
                                        <Check className="w-4 h-4" /> Approve
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}

                {approvalPosts.length === 0 && (
                    <div className="premium-card p-12 text-center">
                        <Check className="w-10 h-10 text-stone-300 dark:text-zinc-600 mx-auto mb-3" />
                        <p className="text-sm text-stone-500 dark:text-zinc-400">No posts to review</p>
                    </div>
                )}
            </div>
        </div>
    );
}
