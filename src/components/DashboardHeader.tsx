'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bell, 
  RotateCcw, 
  ExternalLink, 
  Sparkles,
  Building2,
  Users2
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ThemeToggle } from './ui/ThemeToggle';

export const DashboardHeader: React.FC<{ title?: string; subtitle?: string }> = ({ 
  title, 
  subtitle 
}) => {
  const { 
    user, 
    notifications, 
    markNotificationAsRead, 
    language, 
    setLanguage, 
    resetToDemoData 
  } = useApp();

  const [showNotifs, setShowNotifs] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0d1322]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Title / Breadcrumb */}
      <div>
        {title ? (
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{title}</h1>
            {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-200">{user.agencyName}</span>
            <span>/</span>
            <span className="text-violet-600 dark:text-violet-400 font-medium">RealEstate Connect</span>
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Reset Demo Data Button */}
        <button
          onClick={() => {
            if (confirm(language === 'es' ? '¿Restablecer todos los datos de demostración iniciales?' : 'Reset all initial demo data?')) {
              resetToDemoData();
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700/80 rounded-xl transition"
          title="Restablecer datos demo"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{language === 'es' ? 'Demo Data' : 'Reset Demo'}</span>
        </button>

        {/* Theme Toggle in Header */}
        <ThemeToggle />

        {/* Language Switcher */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setLanguage('es')}
            className={"px-2.5 py-1 rounded-lg transition " + (language === 'es' ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white')}
          >
            ES
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={"px-2.5 py-1 rounded-lg transition " + (language === 'en' ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white')}
          >
            EN
          </button>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl relative transition"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {language === 'es' ? 'Notificaciones' : 'Notifications'}
                  </h4>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {unreadCount} {language === 'es' ? 'sin leer' : 'unread'}
                </span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto my-2">
                {notifications.length === 0 ? (
                  <p className="text-center py-6 text-xs text-slate-400">
                    {language === 'es' ? 'No hay notificaciones' : 'No notifications yet'}
                  </p>
                ) : (
                  notifications.map((n) => (
                    <div 
                      key={n.id} 
                      onClick={() => markNotificationAsRead(n.id)}
                      className={"p-3 text-left transition rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 " + (!n.read ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : '')}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                          {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />}
                          {n.title}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {n.message}
                      </p>
                      {n.link && (
                        <Link 
                          href={n.link} 
                          onClick={() => setShowNotifs(false)}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline mt-1.5"
                        >
                          <span>{language === 'es' ? 'Ver detalles' : 'View details'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
