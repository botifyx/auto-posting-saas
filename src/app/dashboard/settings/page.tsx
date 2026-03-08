'use client';

import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { User, Bell, Palette, Key, Globe, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState('profile');
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [pushNotifs, setPushNotifs] = useState(true);
    const [postPublished, setPostPublished] = useState(true);
    const [postFailed, setPostFailed] = useState(true);
    const [approvalRequired, setApprovalRequired] = useState(true);

    const sections = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'appearance', label: 'Appearance', icon: Palette },
        { id: 'api', label: 'API Keys', icon: Key },
    ];

    const handleSave = () => {
        toast.success('Settings saved successfully');
    };

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">Settings</h1>
                <p className="text-sm text-stone-500 dark:text-zinc-400 mt-1">Manage your account preferences.</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="premium-card p-3">
                    <nav className="space-y-1">
                        {sections.map((s) => {
                            const Icon = s.icon;
                            return (
                                <button
                                    key={s.id}
                                    onClick={() => setActiveSection(s.id)}
                                    className={cn(
                                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                                        activeSection === s.id
                                            ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                                            : 'text-stone-500 dark:text-zinc-400 hover:bg-stone-100 dark:hover:bg-zinc-800/60'
                                    )}
                                >
                                    <Icon className="w-4 h-4" /> {s.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Content */}
                <div className="lg:col-span-3 premium-card p-6 space-y-6">
                    {activeSection === 'profile' && (
                        <div className="animate-fadeIn space-y-6">
                            <h3 className="text-lg font-semibold text-stone-900 dark:text-white">Profile Settings</h3>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                                    SC
                                </div>
                                <div>
                                    <button className="text-sm text-indigo-500 hover:text-indigo-600 font-medium">Change Avatar</button>
                                    <p className="text-xs text-stone-400 dark:text-zinc-500 mt-0.5">JPG, PNG. Max 2MB</p>
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 dark:text-zinc-300 mb-1.5">Full Name</label>
                                    <input type="text" defaultValue="Sarah Chen" className="w-full px-4 py-2.5 rounded-xl text-sm border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/60 text-stone-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 dark:text-zinc-300 mb-1.5">Email</label>
                                    <input type="email" defaultValue="sarah.chen@company.com" className="w-full px-4 py-2.5 rounded-xl text-sm border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/60 text-stone-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 dark:text-zinc-300 mb-1.5">Company</label>
                                    <input type="text" defaultValue="TechVentures Inc." className="w-full px-4 py-2.5 rounded-xl text-sm border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/60 text-stone-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-700 dark:text-zinc-300 mb-1.5">Timezone</label>
                                    <select className="w-full px-4 py-2.5 rounded-xl text-sm border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/60 text-stone-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-all">
                                        <option>UTC-8 (Pacific Time)</option>
                                        <option>UTC-5 (Eastern Time)</option>
                                        <option>UTC+0 (GMT)</option>
                                        <option>UTC+5:30 (India Standard Time)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'notifications' && (
                        <div className="animate-fadeIn space-y-6">
                            <h3 className="text-lg font-semibold text-stone-900 dark:text-white">Notification Preferences</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Email Notifications', desc: 'Receive email notifications for important events', value: emailNotifs, set: setEmailNotifs },
                                    { label: 'Push Notifications', desc: 'Browser push notifications', value: pushNotifs, set: setPushNotifs },
                                    { label: 'Post Published', desc: 'Notify when a post is published successfully', value: postPublished, set: setPostPublished },
                                    { label: 'Post Failed', desc: 'Notify when a post fails to publish', value: postFailed, set: setPostFailed },
                                    { label: 'Approval Required', desc: 'Notify when a post needs your approval', value: approvalRequired, set: setApprovalRequired },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center justify-between py-3 border-b border-stone-100 dark:border-zinc-800 last:border-0">
                                        <div>
                                            <p className="text-sm font-medium text-stone-900 dark:text-white">{item.label}</p>
                                            <p className="text-xs text-stone-400 dark:text-zinc-500 mt-0.5">{item.desc}</p>
                                        </div>
                                        <button
                                            onClick={() => item.set(!item.value)}
                                            className={cn(
                                                'w-11 h-6 rounded-full transition-all relative',
                                                item.value ? 'bg-indigo-500' : 'bg-stone-200 dark:bg-zinc-700'
                                            )}
                                        >
                                            <span className={cn(
                                                'absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all',
                                                item.value ? 'left-6' : 'left-1'
                                            )} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeSection === 'appearance' && (
                        <div className="animate-fadeIn space-y-6">
                            <h3 className="text-lg font-semibold text-stone-900 dark:text-white">Appearance</h3>
                            <div>
                                <label className="block text-sm font-medium text-stone-700 dark:text-zinc-300 mb-3">Theme</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {(['light', 'dark', 'system'] as const).map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setTheme(t)}
                                            className={cn(
                                                'p-4 rounded-xl border-2 text-center transition-all',
                                                theme === t
                                                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10'
                                                    : 'border-stone-200 dark:border-zinc-700 hover:border-stone-300'
                                            )}
                                        >
                                            <div className={cn(
                                                'w-10 h-10 rounded-xl mx-auto mb-2',
                                                t === 'light' ? 'bg-white border border-stone-200' : t === 'dark' ? 'bg-zinc-900 border border-zinc-700' : 'bg-gradient-to-br from-white to-zinc-900'
                                            )} />
                                            <p className="text-sm font-medium text-stone-700 dark:text-zinc-300 capitalize">{t}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'api' && (
                        <div className="animate-fadeIn space-y-6">
                            <h3 className="text-lg font-semibold text-stone-900 dark:text-white">API Keys</h3>
                            <p className="text-sm text-stone-500 dark:text-zinc-400">Manage API keys for integrations.</p>
                            <div className="bg-stone-50 dark:bg-zinc-800/40 rounded-xl p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-stone-700 dark:text-zinc-300">Production Key</p>
                                        <p className="text-xs text-stone-400 dark:text-zinc-500 mt-0.5 font-mono">sk_live_••••••••••••••••</p>
                                    </div>
                                    <button className="text-xs text-indigo-500 hover:text-indigo-600 font-medium">Reveal</button>
                                </div>
                            </div>
                            <button className="text-sm text-indigo-500 hover:text-indigo-600 font-medium">+ Generate New Key</button>
                        </div>
                    )}

                    {/* Save Button */}
                    <div className="pt-4 border-t border-stone-200 dark:border-zinc-800">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 transition-all"
                        >
                            <Save className="w-4 h-4" /> Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
