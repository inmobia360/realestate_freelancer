'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { AppProvider } from '@/context/AppContext';

export const PanelLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppProvider>
      <div className="flex h-screen w-full bg-[#F7F9FC] dark:bg-[#111A31] text-[#172033] dark:text-[#F7F9FC] overflow-hidden font-sans">
        <Sidebar />
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </AppProvider>
  );
};
