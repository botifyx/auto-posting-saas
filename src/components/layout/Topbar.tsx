'use client';

import React from 'react';
import { cn } from '@/utils/cn';
import { Bell, Search, Moon, Sun, Plus } from 'lucide-react';
import { useNotificationStore } from '@/store/useNotificationStore';
import Link from 'next/link';

interface TopbarProps {
    sidebarCollapsed: boolean;
    darkMode: boolean;
    onToggleDarkMode: () => void;
}

export default function Topbar({ sidebarCollapsed, darkMode, onToggleDarkMode }: TopbarProps) {
    const { unreadCount, togglePanel } = useNotificationStore();

    return (
        <header
            className={cn(
                'fixed top-0 right-0 z-30 h-16 flex items-center justify-between px-6 transition-all duration-300',
                'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-stone-200 dark:border-zinc-800',
                sidebarCollapsed ? 'left-[72px]' : 'left-[260px]'
            )}
        >
            {/* Search */}
            <div className="flex items-center gap-3 flex-1 max-w-md">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search posts, analytics, team..."
                        className={cn(
                            'w-full pl-10 pr-4 py-2 rounded-xl text-sm',
                            'bg-stone-100 dark:bg-zinc-800/60 border border-transparent',
                            'placeholder:text-stone-400 dark:placeholder:text-zinc-500',
                            'text-stone-900 dark:text-white',
                            'focus:outline-none focus:border-indigo-500/30 focus:bg-white dark:focus:bg-zinc-800',
                            'transition-all duration-200'
                        )}
                    />
                    <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 text-[10px] text-stone-400 dark:text-zinc-500 bg-white dark:bg-zinc-700 px-1.5 py-0.5 rounded-md border border-stone-200 dark:border-zinc-600 font-mono">
                        ⌘K
                    </kbd>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <Link
                    href="/dashboard/create-post"
                    className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200',
                        'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20',
                        'hover:shadow-xl hover:shadow-indigo-600/30 hover:-translate-y-0.5 active:translate-y-0'
                    )}
                >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">New Post</span>
                </Link>

                {/* <button
                    onClick={onToggleDarkMode}
                    className="p-2.5 rounded-xl text-stone-500 dark:text-zinc-400 hover:bg-stone-100 dark:hover:bg-zinc-800/60 transition-all duration-200"
                >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button> */}

                <button
                    onClick={togglePanel}
                    className="relative p-2.5 rounded-xl text-stone-500 dark:text-zinc-400 hover:bg-stone-100 dark:hover:bg-zinc-800/60 transition-all duration-200"
                >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scaleIn">
                            {unreadCount}
                        </span>
                    )}
                </button>

                {/* User Avatar */}
                <button className="flex items-center gap-3 pl-3 ml-1 border-l border-stone-200 dark:border-zinc-700">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        SC
                    </div>
                    <div className="hidden md:block text-left">
                        <p className="text-sm font-semibold text-stone-900 dark:text-white">Sarah Chen</p>
                        <p className="text-[11px] text-stone-400 dark:text-zinc-500">Owner</p>
                    </div>
                </button>
            </div>
        </header>
    );
}
