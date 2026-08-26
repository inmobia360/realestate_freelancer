'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Cargando selector de tema"
        className={"p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 bg-slate-100 dark:bg-slate-800/80 " + className}
      >
        <Moon className="w-4 h-4" />
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Modo Claro' : 'Modo Oscuro'}
      className={"flex items-center gap-2 p-2 rounded-xl transition-all duration-200 cursor-pointer " + (
        isDark
          ? 'bg-slate-800/90 text-amber-300 hover:bg-slate-700 border border-slate-700 shadow-sm'
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 shadow-sm'
      ) + " " + className}
    >
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 transition-transform text-slate-700" />
      )}
      {showLabel && (
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
          {isDark ? 'Modo Claro' : 'Modo Oscuro'}
        </span>
      )}
    </button>
  );
};
