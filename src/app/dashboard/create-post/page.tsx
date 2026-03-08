'use client';

import React, { useState, useCallback } from 'react';
import { cn } from '@/utils/cn';
import { usePostStore } from '@/store/usePostStore';
import { platformConfig, aiTones, aiContentLengths } from '@/constants';
import type { Platform, AITone, AIContentLength } from '@/types';
import {
    Send, Save, Image as ImageIcon, Video, Sparkles, Hash, X, Check,
    Wand2, FileText, Eye
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

function PlatformPreview({ platform, content }: { platform: Platform; content: string }) {
    const config = platformConfig[platform];
    const charLimit = config.maxChars;
    const charCount = content.length;
    const isOver = charCount > charLimit;

    return (
        <div className="premium-card p-5">
            <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{config.icon}</span>
                <span className="text-sm font-semibold text-stone-700 dark:text-zinc-300">{config.name}</span>
                <span className={cn('ml-auto text-xs font-medium', isOver ? 'text-red-500' : 'text-stone-400 dark:text-zinc-500')}>
                    {charCount}/{charLimit}
                </span>
            </div>
            <div className="bg-stone-50 dark:bg-zinc-800/40 rounded-xl p-4 min-h-[120px]">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">SC</div>
                    <div>
                        <p className="text-sm font-semibold text-stone-800 dark:text-zinc-200">Sarah Chen</p>
                        <p className="text-[10px] text-stone-400 dark:text-zinc-500">Just now</p>
                    </div>
                </div>
                <p className="text-sm text-stone-600 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
                    {content || <span className="text-stone-300 dark:text-zinc-600 italic">Start typing to see preview...</span>}
                </p>
            </div>
        </div>
    );
}

export default function CreatePostPage() {
    const { draftContent, draftPlatforms, draftMedia, setDraftContent, togglePlatform, resetDraft } = usePostStore();
    const [activeTab, setActiveTab] = useState<'editor' | 'ai'>('editor');
    const [previewPlatform, setPreviewPlatform] = useState<Platform>('linkedin');
    const [aiTopic, setAiTopic] = useState('');
    const [aiTone, setAiTone] = useState<AITone>('professional');
    const [aiLength, setAiLength] = useState<AIContentLength>('medium');
    const [aiLoading, setAiLoading] = useState(false);
    const [aiResult, setAiResult] = useState('');

    const onDrop = useCallback((acceptedFiles: File[]) => {
        toast.success(`${acceptedFiles.length} file(s) added`);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [], 'video/*': [] },
        maxSize: 50 * 1024 * 1024,
    });

    const handleAIGenerate = async () => {
        if (!aiTopic) return toast.error('Please enter a topic');
        setAiLoading(true);
        // Simulate AI generation
        await new Promise((r) => setTimeout(r, 2000));
        const generated = `Here's a ${aiTone} post about "${aiTopic}":\n\n${aiLength === 'short'
                ? `${aiTopic} is transforming the way we work. The future is here. 🚀 #Innovation`
                : aiLength === 'medium'
                    ? `${aiTopic} is transforming the way we work. Our team has been exploring this space for months, and the results are incredible.\n\nKey takeaways:\n• Faster workflows\n• Better collaboration\n• Higher engagement\n\nWhat's your experience? Share below. 🚀 #Innovation #Leadership`
                    : `${aiTopic} is transforming the way we work, and I believe every leader should be paying attention.\n\nOver the past quarter, our team has implemented new strategies around ${aiTopic.toLowerCase()}, and the results speak for themselves:\n\n📊 35% increase in team productivity\n🤝 50% faster cross-functional collaboration\n📈 2x improvement in output quality\n\nThe key insight? It's not just about technology — it's about people. When you give your team the right tools and the autonomy to use them, magic happens.\n\nHere are 3 actionable steps to get started:\n\n1. Audit your current processes\n2. Identify bottlenecks\n3. Pilot small, scale fast\n\nI'd love to hear how other leaders are approaching this. Drop your thoughts below. 👇\n\n#Leadership #Innovation #FutureOfWork`
            }`;
        setAiResult(generated);
        setAiLoading(false);
    };

    const handleSaveDraft = () => {
        toast.success('Draft saved successfully');
    };

    const handleSubmitForReview = () => {
        if (!draftContent) return toast.error('Please add content');
        if (draftPlatforms.length === 0) return toast.error('Please select at least one platform');
        toast.success('Post submitted for review');
        resetDraft();
    };

    const platforms: Platform[] = ['linkedin', 'twitter', 'instagram', 'facebook', 'youtube', 'tiktok'];

    return (
        <div className="animate-fadeIn">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">Create Post</h1>
                    <p className="text-sm text-stone-500 dark:text-zinc-400 mt-1">Compose and preview your content across platforms.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={handleSaveDraft} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-stone-600 dark:text-zinc-300 bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-700 transition-all">
                        <Save className="w-4 h-4" /> Save Draft
                    </button>
                    <button onClick={handleSubmitForReview} className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 transition-all">
                        <Send className="w-4 h-4" /> Submit for Review
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
                {/* Left — Editor */}
                <div className="lg:col-span-3 space-y-5">
                    {/* Platform Selector */}
                    <div className="premium-card p-5">
                        <h3 className="text-sm font-semibold text-stone-700 dark:text-zinc-300 mb-3">Platforms</h3>
                        <div className="flex flex-wrap gap-2">
                            {platforms.map((p) => {
                                const selected = draftPlatforms.includes(p);
                                return (
                                    <button
                                        key={p}
                                        onClick={() => togglePlatform(p)}
                                        className={cn(
                                            'flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all border',
                                            selected
                                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                                                : 'border-stone-200 dark:border-zinc-700 text-stone-500 dark:text-zinc-400 hover:border-stone-300'
                                        )}
                                    >
                                        <span>{platformConfig[p].icon}</span>
                                        {platformConfig[p].name}
                                        {selected && <Check className="w-3.5 h-3.5" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 bg-stone-100 dark:bg-zinc-800 p-1 rounded-xl w-fit">
                        <button onClick={() => setActiveTab('editor')} className={cn('flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all', activeTab === 'editor' ? 'bg-white dark:bg-zinc-700 text-stone-900 dark:text-white shadow-sm' : 'text-stone-500 dark:text-zinc-400')}>
                            <FileText className="w-4 h-4" /> Editor
                        </button>
                        <button onClick={() => setActiveTab('ai')} className={cn('flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all', activeTab === 'ai' ? 'bg-white dark:bg-zinc-700 text-stone-900 dark:text-white shadow-sm' : 'text-stone-500 dark:text-zinc-400')}>
                            <Sparkles className="w-4 h-4" /> AI Assist
                        </button>
                    </div>

                    {activeTab === 'editor' ? (
                        <>
                            {/* Text Editor */}
                            <div className="premium-card p-5">
                                <textarea
                                    value={draftContent}
                                    onChange={(e) => setDraftContent(e.target.value)}
                                    placeholder="What would you like to share today?"
                                    className="w-full min-h-[200px] bg-transparent text-stone-900 dark:text-white text-sm placeholder:text-stone-400 dark:placeholder:text-zinc-500 focus:outline-none resize-none leading-relaxed"
                                />
                                <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-zinc-800 mt-3">
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 rounded-lg text-stone-400 dark:text-zinc-500 hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors"><Hash className="w-4 h-4" /></button>
                                    </div>
                                    <span className="text-xs text-stone-400 dark:text-zinc-500">{draftContent.length} characters</span>
                                </div>
                            </div>

                            {/* Media Upload */}
                            <div
                                {...getRootProps()}
                                className={cn(
                                    'premium-card p-8 text-center cursor-pointer transition-all border-2 border-dashed',
                                    isDragActive
                                        ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/5'
                                        : 'border-stone-200 dark:border-zinc-700 hover:border-stone-300 dark:hover:border-zinc-600'
                                )}
                            >
                                <input {...getInputProps()} />
                                <div className="flex items-center justify-center gap-3 mb-2">
                                    <ImageIcon className="w-5 h-5 text-stone-400 dark:text-zinc-500" />
                                    <Video className="w-5 h-5 text-stone-400 dark:text-zinc-500" />
                                </div>
                                <p className="text-sm text-stone-500 dark:text-zinc-400">
                                    Drop images or videos here, or <span className="text-indigo-500 font-medium">browse</span>
                                </p>
                                <p className="text-xs text-stone-400 dark:text-zinc-500 mt-1">Max file size: 50MB</p>
                            </div>
                        </>
                    ) : (
                        /* AI Assist */
                        <div className="premium-card p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-stone-700 dark:text-zinc-300 mb-1.5">Topic</label>
                                <input
                                    type="text"
                                    value={aiTopic}
                                    onChange={(e) => setAiTopic(e.target.value)}
                                    placeholder="e.g., AI in enterprise, remote work tips, product launch"
                                    className="w-full px-4 py-2.5 rounded-xl text-sm border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/60 text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:border-indigo-500 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 dark:text-zinc-300 mb-2">Tone</label>
                                <div className="flex flex-wrap gap-2">
                                    {aiTones.map((t) => (
                                        <button
                                            key={t.value}
                                            onClick={() => setAiTone(t.value)}
                                            className={cn(
                                                'flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all border',
                                                aiTone === t.value
                                                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                                                    : 'border-stone-200 dark:border-zinc-700 text-stone-500 dark:text-zinc-400'
                                            )}
                                        >
                                            {t.emoji} {t.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-stone-700 dark:text-zinc-300 mb-2">Length</label>
                                <div className="flex gap-2">
                                    {aiContentLengths.map((l) => (
                                        <button
                                            key={l.value}
                                            onClick={() => setAiLength(l.value)}
                                            className={cn(
                                                'flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all border text-center',
                                                aiLength === l.value
                                                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                                                    : 'border-stone-200 dark:border-zinc-700 text-stone-500 dark:text-zinc-400'
                                            )}
                                        >
                                            <div className="font-semibold">{l.label}</div>
                                            <div className="text-[10px] text-stone-400 dark:text-zinc-500 mt-0.5">{l.description}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleAIGenerate}
                                disabled={aiLoading}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-50"
                            >
                                {aiLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="w-4 h-4" /> Generate Content
                                    </>
                                )}
                            </button>

                            {aiResult && (
                                <div className="animate-fadeIn">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-sm font-semibold text-stone-700 dark:text-zinc-300">Generated Content</h4>
                                        <button
                                            onClick={() => { setDraftContent(aiResult); setActiveTab('editor'); toast.success('Content applied to editor'); }}
                                            className="text-xs text-indigo-500 hover:text-indigo-600 font-medium"
                                        >
                                            Use This Content
                                        </button>
                                    </div>
                                    <div className="bg-stone-50 dark:bg-zinc-800/40 rounded-xl p-4">
                                        <p className="text-sm text-stone-600 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">{aiResult}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right — Preview */}
                <div className="lg:col-span-2 space-y-5">
                    <div className="flex gap-1 bg-stone-100 dark:bg-zinc-800 p-1 rounded-xl overflow-x-auto">
                        {(['linkedin', 'twitter', 'instagram', 'facebook'] as Platform[]).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPreviewPlatform(p)}
                                className={cn(
                                    'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap',
                                    previewPlatform === p ? 'bg-white dark:bg-zinc-700 text-stone-900 dark:text-white shadow-sm' : 'text-stone-500 dark:text-zinc-400'
                                )}
                            >
                                {platformConfig[p].icon} {platformConfig[p].name}
                            </button>
                        ))}
                    </div>
                    <PlatformPreview platform={previewPlatform} content={draftContent} />
                </div>
            </div>
        </div>
    );
}
