'use client';

import React from 'react';
import { cn } from '@/utils/cn';
import { X, Check, AlertTriangle, Megaphone, Users, MessageSquare, CheckCircle, Bell } from 'lucide-react';
import { useNotificationStore } from '@/store/useNotificationStore';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { Notification } from '@/types';

dayjs.extend(relativeTime);

const notificationIcons: Record<Notification['type'], React.ReactNode> = {
    post_approved: <CheckCircle className="w-4 h-4 text-emerald-500" />,
    post_rejected: <X className="w-4 h-4 text-red-500" />,
    post_published: <Check className="w-4 h-4 text-blue-500" />,
    post_failed: <AlertTriangle className="w-4 h-4 text-red-500" />,
    team_invite: <Users className="w-4 h-4 text-violet-500" />,
    comment: <MessageSquare className="w-4 h-4 text-amber-500" />,
    mention: <Megaphone className="w-4 h-4 text-indigo-500" />,
};

export default function NotificationsPanel() {
    const { notifications, isOpen, setOpen, markAsRead, markAllAsRead } = useNotificationStore();

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

            {/* Panel */}
            <div className={cn(
                'fixed right-4 top-16 z-50 w-[400px] max-h-[calc(100vh-5rem)]',
                'bg-white dark:bg-zinc-900 rounded-2xl border border-stone-200 dark:border-zinc-800',
                'shadow-premium overflow-hidden animate-scaleIn'
            )}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-stone-100 dark:border-zinc-800">
                    <h3 className="text-sm font-semibold text-stone-900 dark:text-white">Notifications</h3>
                    <button
                        onClick={markAllAsRead}
                        className="text-xs text-indigo-500 hover:text-indigo-600 font-medium transition-colors"
                    >
                        Mark all read
                    </button>
                </div>

                {/* List */}
                <div className="overflow-y-auto max-h-[400px] divide-y divide-stone-100 dark:divide-zinc-800">
                    {notifications.length === 0 ? (
                        <div className="p-8 text-center">
                            <Bell className="w-8 h-8 text-stone-300 dark:text-zinc-600 mx-auto mb-3" />
                            <p className="text-sm text-stone-400 dark:text-zinc-500">No notifications yet</p>
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <button
                                key={notification.id}
                                onClick={() => markAsRead(notification.id)}
                                className={cn(
                                    'w-full flex items-start gap-3 p-4 text-left transition-colors hover:bg-stone-50 dark:hover:bg-zinc-800/40',
                                    !notification.read && 'bg-indigo-50/50 dark:bg-indigo-500/5'
                                )}
                            >
                                <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    {notificationIcons[notification.type]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-stone-900 dark:text-white">{notification.title}</p>
                                    <p className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5 line-clamp-2">{notification.message}</p>
                                    <p className="text-[11px] text-stone-400 dark:text-zinc-500 mt-1">{dayjs(notification.createdAt).fromNow()}</p>
                                </div>
                                {!notification.read && (
                                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                                )}
                            </button>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}


