import { create } from 'zustand';

type CalendarView = 'day' | 'week' | 'month';

interface SchedulerState {
  currentDate: string; // ISO string
  view: CalendarView;
  setCurrentDate: (date: string) => void;
  setView: (view: CalendarView) => void;
  nextPeriod: () => void;
  prevPeriod: () => void;
}

export const useSchedulerStore = create<SchedulerState>((set, get) => ({
  currentDate: new Date().toISOString(),
  view: 'month',
  setCurrentDate: (date) => set({ currentDate: date }),
  setView: (view) => set({ view }),
  nextPeriod: () => {
    const current = new Date(get().currentDate);
    const view = get().view;
    if (view === 'day') current.setDate(current.getDate() + 1);
    else if (view === 'week') current.setDate(current.getDate() + 7);
    else current.setMonth(current.getMonth() + 1);
    set({ currentDate: current.toISOString() });
  },
  prevPeriod: () => {
    const current = new Date(get().currentDate);
    const view = get().view;
    if (view === 'day') current.setDate(current.getDate() - 1);
    else if (view === 'week') current.setDate(current.getDate() - 7);
    else current.setMonth(current.getMonth() - 1);
    set({ currentDate: current.toISOString() });
  },
}));
