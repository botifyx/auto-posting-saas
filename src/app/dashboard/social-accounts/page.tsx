'use client';

import React from 'react';
import { cn } from '@/utils/cn';
import { Link2, Unlink, RefreshCw, ExternalLink, Users } from 'lucide-react';
import { mockSocialAccounts } from '@/lib/mockData';
import { platformConfig } from '@/constants';
import toast from 'react-hot-toast';

export default function SocialAccountsPage() {
    const handleConnect = (platform: string) => {
        toast.success(`Redirecting to ${platform} authorization...`);
    };

    const handleDisconnect = (id: string) => {
        toast.success('Account disconnected');
    };

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">Social Accounts</h1>
                <p className="text-sm text-stone-500 dark:text-zinc-400 mt-1">Manage your connected social media accounts.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
                {mockSocialAccounts.map((account) => {
                    const config = platformConfig[account.platform];
                    return (
                        <div key={account.id} className="premium-card p-6 hover:-translate-y-0.5 transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${config.color}15` }}>
                                    {config.icon}
                                </div>
                                <span className={cn(
                                    'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-xs font-medium',
                                    account.isConnected
                                        ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                        : 'bg-stone-100 dark:bg-zinc-800 text-stone-500 dark:text-zinc-400'
                                )}>
                                    <span className={cn('w-1.5 h-1.5 rounded-full', account.isConnected ? 'bg-emerald-400' : 'bg-stone-300 dark:bg-zinc-600')} />
                                    {account.isConnected ? 'Connected' : 'Not Connected'}
                                </span>
                            </div>

                            <h3 className="text-base font-semibold text-stone-900 dark:text-white">{config.name}</h3>
                            {account.isConnected ? (
                                <>
                                    <p className="text-sm text-stone-500 dark:text-zinc-400 mt-0.5">@{account.username}</p>
                                    <div className="flex items-center gap-1 mt-2">
                                        <Users className="w-3.5 h-3.5 text-stone-400 dark:text-zinc-500" />
                                        <span className="text-sm font-semibold text-stone-700 dark:text-zinc-300">{account.followers?.toLocaleString()}</span>
                                        <span className="text-xs text-stone-400 dark:text-zinc-500">followers</span>
                                    </div>
                                </>
                            ) : (
                                <p className="text-sm text-stone-400 dark:text-zinc-500 mt-0.5">Connect to start posting</p>
                            )}

                            <div className="mt-5 pt-4 border-t border-stone-100 dark:border-zinc-800">
                                {account.isConnected ? (
                                    <div className="flex gap-2">
                                        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-stone-600 dark:text-zinc-300 bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-700 transition-all">
                                            <RefreshCw className="w-3.5 h-3.5" /> Refresh
                                        </button>
                                        <button
                                            onClick={() => handleDisconnect(account.id)}
                                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-red-600 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all"
                                        >
                                            <Unlink className="w-3.5 h-3.5" /> Disconnect
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleConnect(config.name)}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5"
                                        style={{ backgroundColor: config.color, boxShadow: `0 8px 25px ${config.color}30` }}
                                    >
                                        <Link2 className="w-4 h-4" /> Connect {config.name}
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
