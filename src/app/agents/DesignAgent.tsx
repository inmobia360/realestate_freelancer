import { ThemeProvider } from '@/context/ThemeContext';
import { AppProvider } from '@/context/AppContext';
import type { ReactNode } from 'react';

/**
 * DesignAgent encapsulates the theming and application‑level context for the UI.
 * It can be used as a reusable wrapper around any part of the Next.js tree, making
 * the layout logic a first‑class component rather than being hard‑coded in
 * `src/app/layout.tsx`.
 */
export function DesignAgent({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AppProvider>{children}</AppProvider>
    </ThemeProvider>
  );
}
