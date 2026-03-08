'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import {
    Zap, ArrowRight, BarChart3, Calendar, Users, Shield, Globe, CheckCircle,
    Sparkles, Clock, TrendingUp, ChevronRight
} from 'lucide-react';

const features = [
    { icon: Calendar, title: 'Smart Scheduling', description: 'AI-powered scheduling to post at optimal times across all platforms.' },
    { icon: BarChart3, title: 'Executive Analytics', description: 'Strategic dashboards with engagement trends and audience insights.' },
    { icon: Users, title: 'Team Collaboration', description: 'Approval workflows and team management for enterprise content.' },
    { icon: Shield, title: 'Enterprise Security', description: 'SOC 2 compliant with role-based access control and audit logs.' },
    { icon: Sparkles, title: 'AI Content Studio', description: 'Generate platform-optimized content with our AI writing assistant.' },
    { icon: Globe, title: 'Multi-Platform', description: 'Publish to LinkedIn, Twitter/X, Instagram, Facebook, YouTube & TikTok.' },
];

const stats = [
    { value: '10M+', label: 'Posts Published' },
    { value: '50K+', label: 'Teams Active' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '6', label: 'Platforms' },
];

const testimonials = [
    { name: 'David Chen', role: 'CMO, TechCorp', quote: 'AutoPost transformed how our marketing team collaborates. The approval workflows alone saved us 20 hours per week.' },
    { name: 'Sarah Miller', role: 'VP Marketing, ScaleUp', quote: 'The executive analytics dashboard gives me the strategic insights I need without drowning in data.' },
    { name: 'James Wilson', role: 'CEO, GrowthCo', quote: 'Finally, a social media tool built for leadership teams. Clean, fast, and incredibly powerful.' },
];

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-stone-200/50 dark:border-zinc-800/50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold text-stone-900 dark:text-white tracking-tight">AutoPost</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/landing" className="text-sm font-medium text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white transition-colors">Features</Link>
                        <Link href="/pricing" className="text-sm font-medium text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white transition-colors">Pricing</Link>
                        <Link href="/login" className="text-sm font-medium text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white transition-colors">Login</Link>
                        <Link href="/register" className={cn(
                            'px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200',
                            'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20',
                            'hover:shadow-xl hover:shadow-indigo-600/30 hover:-translate-y-0.5'
                        )}>
                            Start Free Trial
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-8 animate-fadeIn">
                        <Sparkles className="w-4 h-4" />
                        Built for Enterprise Teams
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-[1.1] mb-6 animate-fadeIn">
                        Social Media
                        <br />
                        <span className="gradient-text">Command Center</span>
                    </h1>
                    <p className="text-lg md:text-xl text-stone-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                        The premium platform for CXO teams to create, schedule, approve, and publish content across every social channel — with strategic analytics built in.
                    </p>
                    <div className="flex items-center justify-center gap-4 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                        <Link href="/register" className={cn(
                            'group flex items-center gap-2 px-8 py-3.5 rounded-2xl text-base font-semibold transition-all duration-300',
                            'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/25',
                            'hover:shadow-2xl hover:shadow-indigo-600/30 hover:-translate-y-1'
                        )}>
                            Start Free Trial
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/dashboard" className={cn(
                            'flex items-center gap-2 px-8 py-3.5 rounded-2xl text-base font-semibold transition-all duration-200',
                            'bg-stone-100 dark:bg-zinc-800 text-stone-700 dark:text-zinc-300 hover:bg-stone-200 dark:hover:bg-zinc-700'
                        )}>
                            View Demo
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 px-6 border-y border-stone-200/50 dark:border-zinc-800/50 bg-stone-50/50 dark:bg-zinc-900/30">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="text-3xl md:text-4xl font-extrabold text-stone-900 dark:text-white">{stat.value}</p>
                            <p className="text-sm text-stone-500 dark:text-zinc-400 mt-1 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
                            Everything Your Team Needs
                        </h2>
                        <p className="text-lg text-stone-500 dark:text-zinc-400 mt-4 max-w-2xl mx-auto">
                            Purpose-built for enterprise social media management with the polish and performance you expect.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <div key={feature.title} className="premium-card p-6 group hover:-translate-y-1 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-6 h-6 text-indigo-500" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-2">{feature.title}</h3>
                                    <p className="text-sm text-stone-500 dark:text-zinc-400 leading-relaxed">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="py-24 px-6 bg-stone-50/50 dark:bg-zinc-900/30 border-y border-stone-200/50 dark:border-zinc-800/50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
                            Trusted by Industry Leaders
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((t) => (
                            <div key={t.name} className="premium-card p-6">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="text-amber-400 text-sm">★</span>
                                    ))}
                                </div>
                                <p className="text-sm text-stone-600 dark:text-zinc-300 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-sm font-bold">
                                        {t.name.split(' ').map(w => w[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-stone-900 dark:text-white">{t.name}</p>
                                        <p className="text-xs text-stone-400 dark:text-zinc-500">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight mb-4">
                        Ready to Transform Your Social Strategy?
                    </h2>
                    <p className="text-lg text-stone-500 dark:text-zinc-400 mb-10">
                        Join 50,000+ teams managing their social presence with AutoPost.
                    </p>
                    <Link href="/register" className={cn(
                        'group inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-300',
                        'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/25',
                        'hover:shadow-2xl hover:shadow-indigo-600/30 hover:-translate-y-1'
                    )}>
                        Start Your Free Trial
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <p className="text-sm text-stone-400 dark:text-zinc-500 mt-4">No credit card required · 14-day free trial</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-stone-200/50 dark:border-zinc-800/50 py-12 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-stone-900 dark:text-white">AutoPost Enterprise</span>
                    </div>
                    <p className="text-sm text-stone-400 dark:text-zinc-500">© 2024 AutoPost. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="text-sm text-stone-400 dark:text-zinc-500 hover:text-stone-600 dark:hover:text-zinc-300 transition-colors">Privacy</Link>
                        <Link href="#" className="text-sm text-stone-400 dark:text-zinc-500 hover:text-stone-600 dark:hover:text-zinc-300 transition-colors">Terms</Link>
                        <Link href="#" className="text-sm text-stone-400 dark:text-zinc-500 hover:text-stone-600 dark:hover:text-zinc-300 transition-colors">Support</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
