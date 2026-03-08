'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { Zap, Check } from 'lucide-react';

const plans = [
    {
        name: 'Starter',
        price: { monthly: 29, yearly: 24 },
        description: 'For individuals and small teams getting started.',
        features: [
            '3 social accounts',
            '30 scheduled posts/month',
            'Basic analytics',
            'Content calendar',
            'Email support',
        ],
        cta: 'Start Free Trial',
        highlighted: false,
    },
    {
        name: 'Professional',
        price: { monthly: 79, yearly: 66 },
        description: 'For growing teams that need collaboration features.',
        features: [
            '10 social accounts',
            'Unlimited scheduled posts',
            'Advanced analytics',
            'AI content assistant',
            'Approval workflows',
            'Team collaboration (5 members)',
            'Priority support',
        ],
        cta: 'Start Free Trial',
        highlighted: true,
    },
    {
        name: 'Enterprise',
        price: { monthly: 199, yearly: 166 },
        description: 'For organizations with complex needs and large teams.',
        features: [
            'Unlimited social accounts',
            'Unlimited scheduled posts',
            'Executive analytics dashboard',
            'AI content studio',
            'Custom approval workflows',
            'Unlimited team members',
            'Role-based access control',
            'SSO & SAML',
            'Dedicated account manager',
            'Custom integrations',
        ],
        cta: 'Contact Sales',
        highlighted: false,
    },
];

export default function PricingPage() {
    const [annual, setAnnual] = useState(true);

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-stone-200/50 dark:border-zinc-800/50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/landing" className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold text-stone-900 dark:text-white tracking-tight">AutoPost</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white transition-colors">Login</Link>
                        <Link href="/register" className="px-5 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 transition-all">Start Free Trial</Link>
                    </div>
                </div>
            </nav>

            <section className="pt-32 pb-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight mb-4">
                            Simple, Transparent Pricing
                        </h1>
                        <p className="text-lg text-stone-500 dark:text-zinc-400 max-w-xl mx-auto mb-8">
                            Choose the plan that fits your team. All plans include a 14-day free trial.
                        </p>
                        {/* Toggle */}
                        <div className="inline-flex items-center gap-3 bg-stone-100 dark:bg-zinc-800 p-1 rounded-xl">
                            <button
                                onClick={() => setAnnual(false)}
                                className={cn(
                                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                                    !annual ? 'bg-white dark:bg-zinc-700 text-stone-900 dark:text-white shadow-sm' : 'text-stone-500 dark:text-zinc-400'
                                )}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setAnnual(true)}
                                className={cn(
                                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                                    annual ? 'bg-white dark:bg-zinc-700 text-stone-900 dark:text-white shadow-sm' : 'text-stone-500 dark:text-zinc-400'
                                )}
                            >
                                Annual <span className="text-emerald-500 text-xs font-bold ml-1">Save 20%</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 items-start">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={cn(
                                    'premium-card p-8 relative',
                                    plan.highlighted && 'border-indigo-500 dark:border-indigo-500 ring-1 ring-indigo-500/20 scale-105'
                                )}
                            >
                                {plan.highlighted && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-1">{plan.name}</h3>
                                <p className="text-sm text-stone-500 dark:text-zinc-400 mb-6">{plan.description}</p>
                                <div className="mb-6">
                                    <span className="text-4xl font-extrabold text-stone-900 dark:text-white">
                                        ${annual ? plan.price.yearly : plan.price.monthly}
                                    </span>
                                    <span className="text-sm text-stone-400 dark:text-zinc-500 ml-1">/month</span>
                                </div>
                                <Link
                                    href="/register"
                                    className={cn(
                                        'block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200',
                                        plan.highlighted
                                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20'
                                            : 'bg-stone-100 dark:bg-zinc-800 text-stone-700 dark:text-zinc-300 hover:bg-stone-200 dark:hover:bg-zinc-700'
                                    )}
                                >
                                    {plan.cta}
                                </Link>
                                <ul className="mt-8 space-y-3">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3 text-sm text-stone-600 dark:text-zinc-300">
                                            <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
