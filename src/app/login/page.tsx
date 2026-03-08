'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/utils/cn';
import { Zap, ArrowRight, Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const [showPassword, setShowPassword] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        // Simulate login — in production, call authService.login
        console.log('Login:', data);
        window.location.href = '/dashboard';
    };

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-zinc-950 flex">
            {/* Left — Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-sm">
                    <Link href="/landing" className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-stone-900 dark:text-white tracking-tight">AutoPost</span>
                    </Link>

                    <h1 className="text-2xl font-bold text-stone-900 dark:text-white mb-1">Welcome back</h1>
                    <p className="text-sm text-stone-500 dark:text-zinc-400 mb-8">Sign in to your account to continue.</p>

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
                                    errors.email ? 'border-red-300 dark:border-red-500/50' : 'border-stone-200 dark:border-zinc-700'
                                )}
                                placeholder="you@company.com"
                            />
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-stone-700 dark:text-zinc-300 mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password')}
                                    className={cn(
                                        'w-full px-4 py-2.5 pr-10 rounded-xl text-sm border bg-white dark:bg-zinc-800/60',
                                        'text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-zinc-500',
                                        'focus:outline-none focus:border-indigo-500 transition-all',
                                        errors.password ? 'border-red-300 dark:border-red-500/50' : 'border-stone-200 dark:border-zinc-700'
                                    )}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 dark:text-zinc-500"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm text-stone-600 dark:text-zinc-400">
                                <input type="checkbox" className="rounded border-stone-300 dark:border-zinc-600" />
                                Remember me
                            </label>
                            <Link href="/forgot-password" className="text-sm text-indigo-500 hover:text-indigo-600 font-medium transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={cn(
                                'w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
                                'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20',
                                'hover:shadow-xl hover:shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed'
                            )}
                        >
                            {isSubmitting ? 'Signing in...' : 'Sign In'}
                            {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                        </button>
                    </form>

                    <p className="text-sm text-stone-500 dark:text-zinc-400 text-center mt-6">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-indigo-500 hover:text-indigo-600 font-medium transition-colors">
                            Create account
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right — Visual */}
            <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
                </div>
                <div className="text-center text-white px-16 relative z-10">
                    <h2 className="text-3xl font-bold mb-4">Manage Your Social Presence</h2>
                    <p className="text-white/80 text-lg">One platform for all your social media needs. Trusted by 50,000+ teams worldwide.</p>
                </div>
            </div>
        </div>
    );
}
