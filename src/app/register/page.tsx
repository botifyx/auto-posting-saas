'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/utils/cn';
import { Zap, ArrowRight, Eye, EyeOff } from 'lucide-react';

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    company: z.string().optional(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const [showPassword, setShowPassword] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterForm) => {
        console.log('Register:', data);
        window.location.href = '/dashboard';
    };

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-zinc-950 flex">
            {/* Left — Visual */}
            <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-700 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-32 left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
                </div>
                <div className="text-center text-white px-16 relative z-10">
                    <h2 className="text-3xl font-bold mb-4">Start Your Free Trial</h2>
                    <p className="text-white/80 text-lg">14 days free. No credit card required. Cancel anytime.</p>
                </div>
            </div>

            {/* Right — Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-sm">
                    <Link href="/landing" className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-stone-900 dark:text-white tracking-tight">AutoPost</span>
                    </Link>

                    <h1 className="text-2xl font-bold text-stone-900 dark:text-white mb-1">Create your account</h1>
                    <p className="text-sm text-stone-500 dark:text-zinc-400 mb-8">Get started with your 14-day free trial.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-stone-700 dark:text-zinc-300 mb-1.5">Full Name</label>
                            <input type="text" {...register('name')} className={cn('w-full px-4 py-2.5 rounded-xl text-sm border bg-white dark:bg-zinc-800/60 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 transition-all', errors.name ? 'border-red-300' : 'border-stone-200 dark:border-zinc-700')} placeholder="Sarah Chen" />
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-stone-700 dark:text-zinc-300 mb-1.5">Work Email</label>
                            <input type="email" {...register('email')} className={cn('w-full px-4 py-2.5 rounded-xl text-sm border bg-white dark:bg-zinc-800/60 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 transition-all', errors.email ? 'border-red-300' : 'border-stone-200 dark:border-zinc-700')} placeholder="you@company.com" />
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-stone-700 dark:text-zinc-300 mb-1.5">Company <span className="text-stone-400">(optional)</span></label>
                            <input type="text" {...register('company')} className="w-full px-4 py-2.5 rounded-xl text-sm border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/60 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 transition-all" placeholder="Your company" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-stone-700 dark:text-zinc-300 mb-1.5">Password</label>
                            <div className="relative">
                                <input type={showPassword ? 'text' : 'password'} {...register('password')} className={cn('w-full px-4 py-2.5 pr-10 rounded-xl text-sm border bg-white dark:bg-zinc-800/60 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 transition-all', errors.password ? 'border-red-300' : 'border-stone-200 dark:border-zinc-700')} placeholder="Minimum 8 characters" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 dark:text-zinc-500">
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-stone-700 dark:text-zinc-300 mb-1.5">Confirm Password</label>
                            <input type="password" {...register('confirmPassword')} className={cn('w-full px-4 py-2.5 rounded-xl text-sm border bg-white dark:bg-zinc-800/60 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 transition-all', errors.confirmPassword ? 'border-red-300' : 'border-stone-200 dark:border-zinc-700')} placeholder="••••••••" />
                            {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>}
                        </div>

                        <button type="submit" disabled={isSubmitting} className={cn('w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200', 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20', 'hover:shadow-xl hover:shadow-indigo-600/30 disabled:opacity-50')}>
                            {isSubmitting ? 'Creating account...' : 'Create Account'}
                            {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                        </button>
                    </form>

                    <p className="text-xs text-stone-400 dark:text-zinc-500 text-center mt-4">
                        By creating an account, you agree to our <Link href="#" className="text-indigo-500 hover:underline">Terms</Link> and <Link href="#" className="text-indigo-500 hover:underline">Privacy Policy</Link>.
                    </p>
                    <p className="text-sm text-stone-500 dark:text-zinc-400 text-center mt-4">
                        Already have an account? <Link href="/login" className="text-indigo-500 hover:text-indigo-600 font-medium">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
