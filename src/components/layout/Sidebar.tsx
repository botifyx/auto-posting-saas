'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import { sidebarNavItems } from '@/constants';
import { ChevronLeft, Zap } from 'lucide-react';

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside
            className={cn(
                'fixed left-0 top-0 z-40 h-screen flex flex-col border-r transition-all duration-300 ease-in-out',
                'bg-white dark:bg-zinc-950 border-stone-200 dark:border-zinc-800',
                collapsed ? 'w-[72px]' : 'w-[260px]'
            )}
        >
            {/* Logo */}
            <div className={cn(
                'flex items-center h-16 px-4 border-b border-stone-200 dark:border-zinc-800',
                collapsed ? 'justify-center' : 'gap-3'
            )}>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/20">
                    <Zap className="w-5 h-5 text-white" />
                </div>
                {!collapsed && (
                    <div className="animate-fadeIn">
                        <h1 className="text-[15px] font-bold text-stone-900 dark:text-white tracking-tight">AutoPost</h1>
                        <p className="text-[10px] text-stone-400 dark:text-zinc-500 font-medium uppercase tracking-widest">Enterprise</p>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {sidebarNavItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                                collapsed && 'justify-center px-0',
                                isActive
                                    ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                                    : 'text-stone-500 dark:text-zinc-400 hover:bg-stone-100 dark:hover:bg-zinc-800/60 hover:text-stone-900 dark:hover:text-white'
                            )}
                            title={collapsed ? item.label : undefined}
                        >
                            <Icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-indigo-500 dark:text-indigo-400')} />
                            {!collapsed && <span className="animate-fadeIn">{item.label}</span>}
                            {isActive && !collapsed && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Collapse Toggle */}
            <div className="p-3 border-t border-stone-200 dark:border-zinc-800">
                <button
                    onClick={onToggle}
                    className={cn(
                        'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                        'text-stone-400 dark:text-zinc-500 hover:bg-stone-100 dark:hover:bg-zinc-800/60 hover:text-stone-600 dark:hover:text-zinc-300',
                        collapsed && 'justify-center px-0'
                    )}
                >
                    <ChevronLeft className={cn('w-5 h-5 transition-transform duration-300', collapsed && 'rotate-180')} />
                    {!collapsed && <span>Collapse</span>}
                </button>
            </div>
        </aside>
    );
}
