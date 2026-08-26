'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { AppProvider } from '@/context/AppContext';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-100 font-sans">
        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Main Dashboard Canvas */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </AppProvider>
  );
}
