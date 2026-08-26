'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { AppProvider } from '@/context/AppContext';

export const PanelLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppProvider>
      <div className="flex h-screen w-full bg-[#F8FAFC] dark:bg-[#080b18] text-[#0A192F] dark:text-[#F8FAFC] overflow-hidden font-sans">
        <Sidebar />
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </AppProvider>
  );
};
