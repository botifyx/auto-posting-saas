'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/utils/cn';
import { Zap, ArrowLeft, Mail } from 'lucide-react';

const forgotSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

type ForgotForm = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
    const [submitted, setSubmitted] = React.useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotForm>({
        resolver: zodResolver(forgotSchema),
    });

    const onSubmit = async (data: ForgotForm) => {
        console.log('Reset:', data);
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-zinc-950 flex items-center justify-center p-8">
            <div className="w-full max-w-sm">
                <Link href="/landing" className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Zap className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-stone-900 dark:text-white tracking-tight">AutoPost</span>
                </Link>

                {submitted ? (
                    <div className="text-center animate-fadeIn">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                            <Mail className="w-8 h-8 text-emerald-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-stone-900 dark:text-white mb-2">Check your email</h1>
                        <p className="text-sm text-stone-500 dark:text-zinc-400 mb-8">We&apos;ve sent a password reset link to your email address.</p>
                        <Link href="/login" className="text-sm text-indigo-500 hover:text-indigo-600 font-medium transition-colors">
                            ← Back to login
                        </Link>
                    </div>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold text-stone-900 dark:text-white mb-1">Reset your password</h1>
                        <p className="text-sm text-stone-500 dark:text-zinc-400 mb-8">Enter your email and we&apos;ll send you a reset link.</p>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-stone-700 dark:text-zinc-300 mb-1.5">Email</label>
                                <input
                                    type="email"
                                    {...register('email')}
                                    className={cn(
                                        'w-full px-4 py-2.5 rounded-xl text-sm border bg-white dark:bg-zinc-800/60',
                                        'text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-zinc-500',
                                        'focus:outline-none focus:border-indigo-500 transition-all',
                                        errors.email ? 'border-red-300' : 'border-stone-200 dark:border-zinc-700'
                                    )}
                                    placeholder="you@company.com"
                                />
                                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={cn(
                                    'w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
                                    'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20',
                                    'disabled:opacity-50'
                                )}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </form>

                        <Link href="/login" className="flex items-center gap-2 justify-center mt-6 text-sm text-stone-500 dark:text-zinc-400 hover:text-stone-700 dark:hover:text-zinc-300 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to login
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
