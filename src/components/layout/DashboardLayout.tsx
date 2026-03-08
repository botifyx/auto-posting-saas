'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import NotificationsPanel from './NotificationsPanel';
import { useNotificationStore } from '@/store/useNotificationStore';
import { mockNotifications } from '@/lib/mockData';
import { Toaster } from 'react-hot-toast';
import { useTheme } from 'next-themes';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const { theme, setTheme } = useTheme();
    const darkMode = theme === 'dark';
    const { setNotifications } = useNotificationStore();

    useEffect(() => {
        // Load mock notifications
        setNotifications(mockNotifications);
    }, [setNotifications]);

    return (
        <div className={cn('min-h-screen bg-stone-50 dark:bg-zinc-950 transition-colors duration-300')}>
            <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
            <Topbar
                sidebarCollapsed={sidebarCollapsed}
                darkMode={darkMode}
                onToggleDarkMode={() => setTheme(darkMode ? 'light' : 'dark')}
            />
            <NotificationsPanel />
            <main
                className={cn(
                    'pt-16 min-h-screen transition-all duration-300',
                    sidebarCollapsed ? 'pl-[72px]' : 'pl-[260px]'
                )}
            >
                <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
                    {children}
                </div>
            </main>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: darkMode ? '#27272A' : '#ffffff',
                        color: darkMode ? '#ffffff' : '#1C1917',
                        border: `1px solid ${darkMode ? '#3F3F46' : '#E7E5E4'}`,
                        borderRadius: '12px',
                        fontSize: '14px',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.08)',
                    },
                }}
            />
        </div>
    );
}
