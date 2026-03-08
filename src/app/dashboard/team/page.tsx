'use client';

import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { UserPlus, MoreHorizontal, Shield, Mail, X } from 'lucide-react';
import { mockTeamMembers } from '@/lib/mockData';
import type { UserRole } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import toast from 'react-hot-toast';

dayjs.extend(relativeTime);

const roleConfig: Record<UserRole, { label: string; color: string; bgColor: string }> = {
    owner: { label: 'Owner', color: 'text-violet-600', bgColor: 'bg-violet-500/10' },
    admin: { label: 'Admin', color: 'text-blue-600', bgColor: 'bg-blue-500/10' },
    editor: { label: 'Editor', color: 'text-emerald-600', bgColor: 'bg-emerald-500/10' },
    viewer: { label: 'Viewer', color: 'text-stone-600', bgColor: 'bg-stone-500/10' },
};

export default function TeamPage() {
    const [showInvite, setShowInvite] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState<UserRole>('editor');

    const handleInvite = () => {
        if (!inviteEmail) return toast.error('Please enter an email');
        toast.success(`Invitation sent to ${inviteEmail}`);
        setInviteEmail('');
        setShowInvite(false);
    };

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">Team</h1>
                    <p className="text-sm text-stone-500 dark:text-zinc-400 mt-1">{mockTeamMembers.length} team members</p>
                </div>
                <button
                    onClick={() => setShowInvite(true)}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 transition-all"
                >
                    <UserPlus className="w-4 h-4" /> Invite Member
                </button>
            </div>

            {/* Invite Dialog */}
            {showInvite && (
                <div className="premium-card p-6 animate-scaleIn">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-semibold text-stone-900 dark:text-white">Invite Team Member</h3>
                        <button onClick={() => setShowInvite(false)} className="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">
                            <X className="w-4 h-4 text-stone-400" />
                        </button>
                    </div>
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <input
                                type="email"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                                placeholder="colleague@company.com"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/60 text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:border-indigo-500 transition-all"
                            />
                        </div>
                        <select
                            value={inviteRole}
                            onChange={(e) => setInviteRole(e.target.value as UserRole)}
                            className="px-3 py-2.5 rounded-xl text-sm border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/60 text-stone-900 dark:text-white focus:outline-none focus:border-indigo-500"
                        >
                            <option value="admin">Admin</option>
                            <option value="editor">Editor</option>
                            <option value="viewer">Viewer</option>
                        </select>
                        <button
                            onClick={handleInvite}
                            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-all"
                        >
                            Send Invite
                        </button>
                    </div>
                </div>
            )}

            {/* Team List */}
            <div className="premium-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-stone-200 dark:border-zinc-800">
                                <th className="text-left px-5 py-3 text-xs font-medium text-stone-400 dark:text-zinc-500 uppercase tracking-wider">Member</th>
                                <th className="text-left px-5 py-3 text-xs font-medium text-stone-400 dark:text-zinc-500 uppercase tracking-wider">Role</th>
                                <th className="text-left px-5 py-3 text-xs font-medium text-stone-400 dark:text-zinc-500 uppercase tracking-wider">Joined</th>
                                <th className="text-left px-5 py-3 text-xs font-medium text-stone-400 dark:text-zinc-500 uppercase tracking-wider">Last Active</th>
                                <th className="text-right px-5 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockTeamMembers.map((member) => {
                                const role = roleConfig[member.role];
                                return (
                                    <tr key={member.id} className="border-b border-stone-100 dark:border-zinc-800/50 hover:bg-stone-50 dark:hover:bg-zinc-800/30 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                                    {member.user.name.split(' ').map(w => w[0]).join('')}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-stone-900 dark:text-white">{member.user.name}</p>
                                                    <p className="text-xs text-stone-400 dark:text-zinc-500">{member.user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium', role.bgColor, role.color)}>
                                                <Shield className="w-3 h-3" /> {role.label}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-stone-500 dark:text-zinc-400 text-xs">{dayjs(member.joinedAt).format('MMM D, YYYY')}</td>
                                        <td className="px-5 py-4 text-stone-500 dark:text-zinc-400 text-xs">
                                            {member.lastActive ? dayjs(member.lastActive).fromNow() : 'Never'}
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            {member.role !== 'owner' && (
                                                <button className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">
                                                    <MoreHorizontal className="w-4 h-4 text-stone-400 dark:text-zinc-500" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
