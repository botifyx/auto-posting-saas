'use client';

import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useSchedulerStore } from '@/store/useSchedulerStore';
import { mockCalendarEvents } from '@/lib/mockData';
import { platformConfig, statusConfig } from '@/constants';
import dayjs from 'dayjs';

export default function CalendarPage() {
    const { currentDate, view, setView, nextPeriod, prevPeriod, setCurrentDate } = useSchedulerStore();
    const current = dayjs(currentDate);

    const views = ['day', 'week', 'month'] as const;

    // Generate month calendar
    const startOfMonth = current.startOf('month');
    const endOfMonth = current.endOf('month');
    const startDay = startOfMonth.day(); // 0=Sun
    const daysInMonth = endOfMonth.date();

    const calendarDays: (number | null)[] = [];
    for (let i = 0; i < startDay; i++) calendarDays.push(null);
    for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);
    while (calendarDays.length % 7 !== 0) calendarDays.push(null);

    const getEventsForDay = (day: number) => {
        const dateStr = current.date(day).format('YYYY-MM-DD');
        return mockCalendarEvents.filter((e) => e.date === dateStr);
    };

    // Week view days
    const startOfWeek = current.startOf('week');
    const weekDays = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));

    // Hours for day/week view
    const hours = Array.from({ length: 12 }, (_, i) => i + 7); // 7am to 6pm

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">Calendar</h1>
                    <p className="text-sm text-stone-500 dark:text-zinc-400 mt-1">Schedule and manage your content calendar.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex gap-1 bg-stone-100 dark:bg-zinc-800 p-1 rounded-xl">
                        {views.map((v) => (
                            <button
                                key={v}
                                onClick={() => setView(v)}
                                className={cn(
                                    'px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all',
                                    view === v ? 'bg-white dark:bg-zinc-700 text-stone-900 dark:text-white shadow-sm' : 'text-stone-500 dark:text-zinc-400'
                                )}
                            >
                                {v}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between premium-card px-5 py-3">
                <button onClick={prevPeriod} className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">
                    <ChevronLeft className="w-5 h-5 text-stone-500 dark:text-zinc-400" />
                </button>
                <h2 className="text-lg font-semibold text-stone-900 dark:text-white">
                    {view === 'day' && current.format('dddd, MMMM D, YYYY')}
                    {view === 'week' && `${startOfWeek.format('MMM D')} – ${startOfWeek.add(6, 'day').format('MMM D, YYYY')}`}
                    {view === 'month' && current.format('MMMM YYYY')}
                </h2>
                <button onClick={nextPeriod} className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors">
                    <ChevronRight className="w-5 h-5 text-stone-500 dark:text-zinc-400" />
                </button>
            </div>

            {/* Month View */}
            {view === 'month' && (
                <div className="premium-card overflow-hidden">
                    <div className="grid grid-cols-7">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                            <div key={d} className="px-3 py-2.5 text-xs font-medium text-stone-400 dark:text-zinc-500 text-center border-b border-stone-200 dark:border-zinc-800 uppercase tracking-wider">
                                {d}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7">
                        {calendarDays.map((day, i) => {
                            const events = day ? getEventsForDay(day) : [];
                            const isToday = day === dayjs().date() && current.month() === dayjs().month() && current.year() === dayjs().year();
                            return (
                                <div
                                    key={i}
                                    className={cn(
                                        'min-h-[100px] p-2 border-b border-r border-stone-100 dark:border-zinc-800/50',
                                        !day && 'bg-stone-50/50 dark:bg-zinc-900/30',
                                        i % 7 === 6 && 'border-r-0'
                                    )}
                                >
                                    {day && (
                                        <>
                                            <span className={cn(
                                                'inline-flex items-center justify-center w-7 h-7 rounded-lg text-sm font-medium',
                                                isToday ? 'bg-indigo-600 text-white' : 'text-stone-700 dark:text-zinc-300'
                                            )}>
                                                {day}
                                            </span>
                                            <div className="mt-1 space-y-1">
                                                {events.map((event) => {
                                                    const status = statusConfig[event.status];
                                                    return (
                                                        <div
                                                            key={event.id}
                                                            className={cn(
                                                                'px-2 py-1 rounded-md text-[10px] font-medium truncate cursor-pointer hover:opacity-80 transition-opacity',
                                                                status.bgColor, status.color
                                                            )}
                                                            title={event.title}
                                                        >
                                                            {event.time} · {event.title}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Week View */}
            {view === 'week' && (
                <div className="premium-card overflow-hidden">
                    <div className="grid grid-cols-8">
                        <div className="border-b border-r border-stone-200 dark:border-zinc-800 p-2" />
                        {weekDays.map((d) => (
                            <div key={d.format('ddd')} className="border-b border-stone-200 dark:border-zinc-800 p-3 text-center">
                                <p className="text-xs text-stone-400 dark:text-zinc-500 font-medium">{d.format('ddd')}</p>
                                <p className={cn('text-lg font-semibold mt-0.5', d.isSame(dayjs(), 'day') ? 'text-indigo-600' : 'text-stone-900 dark:text-white')}>
                                    {d.format('D')}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="max-h-[500px] overflow-y-auto">
                        {hours.map((hour) => (
                            <div key={hour} className="grid grid-cols-8 border-b border-stone-100 dark:border-zinc-800/50">
                                <div className="p-2 text-xs text-stone-400 dark:text-zinc-500 text-right pr-3 border-r border-stone-200 dark:border-zinc-800">
                                    {hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                                </div>
                                {weekDays.map((d) => {
                                    const dateStr = d.format('YYYY-MM-DD');
                                    const events = mockCalendarEvents.filter((e) => e.date === dateStr && parseInt(e.time) === hour);
                                    return (
                                        <div key={d.format('ddd')} className="min-h-[50px] p-1 border-r border-stone-100 dark:border-zinc-800/50 last:border-r-0">
                                            {events.map((event) => {
                                                const status = statusConfig[event.status];
                                                return (
                                                    <div key={event.id} className={cn('px-2 py-1 rounded-md text-[10px] font-medium', status.bgColor, status.color)}>
                                                        {event.title}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Day View */}
            {view === 'day' && (
                <div className="premium-card overflow-hidden">
                    <div className="max-h-[600px] overflow-y-auto">
                        {hours.map((hour) => {
                            const dateStr = current.format('YYYY-MM-DD');
                            const events = mockCalendarEvents.filter((e) => e.date === dateStr && parseInt(e.time) === hour);
                            return (
                                <div key={hour} className="flex border-b border-stone-100 dark:border-zinc-800/50">
                                    <div className="w-20 p-3 text-sm text-stone-400 dark:text-zinc-500 text-right border-r border-stone-200 dark:border-zinc-800 flex-shrink-0">
                                        {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                                    </div>
                                    <div className="flex-1 p-2 min-h-[60px]">
                                        {events.map((event) => {
                                            const status = statusConfig[event.status];
                                            return (
                                                <div key={event.id} className={cn('px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-2', status.bgColor, status.color)}>
                                                    {event.title}
                                                    <div className="flex gap-0.5 ml-auto">
                                                        {event.platforms.map((p) => (
                                                            <span key={p} className="text-xs">{platformConfig[p].icon}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
