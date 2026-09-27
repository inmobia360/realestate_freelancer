'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Building2, 
  Users2, 
  Sparkles, 
  Settings, 
  PlusCircle, 
  ExternalLink,
  ChevronRight,
  Home,
  ShieldCheck,
  Calculator,
  Languages,
  Compass
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ThemeToggle } from './ui/ThemeToggle';
import { BrandLogo } from './brand/BrandLogo';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { user, properties, leads, language, setLanguage } = useApp();

  const activePropsCount = properties.filter(p => p.status === 'published').length;
  const newLeadsCount = leads.filter(l => l.status === 'new').length;

  const mainNav = [
    {
      name: language === 'es' ? 'Panel General' : 'Dashboard',
      href: '/app/dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: language === 'es' ? 'Propiedades & Mapa' : 'Properties & Map',
      href: '/app/properties',
      icon: Building2,
      badge: activePropsCount > 0 ? `${activePropsCount} activas` : null,
    },
    {
      name: language === 'es' ? 'Captación & Scoring' : 'Leads Hub',
      href: '/app/leads',
      icon: Users2,
      badge: newLeadsCount > 0 ? `${newLeadsCount} nuevos` : null,
      badgeColor: 'bg-emerald-500 text-white',
    },
  ];

  const aiToolsNav = [
    {
      name: language === 'es' ? 'Generador IA Multicanal' : 'AI Multichannel Generator',
      href: '/app/content-generator',
      icon: Sparkles,
      badge: '10 Formatos',
      badgeColor: 'bg-violet-500/20 text-violet-300 border border-violet-500/30',
    },
    {
      name: language === 'es' ? 'Configuración & Marca' : 'Settings & Brand',
      href: '/app/settings',
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <aside className="w-72 h-screen bg-white dark:bg-[#070b18] text-slate-800 dark:text-slate-200 flex flex-col shrink-0 border-r border-slate-200 dark:border-indigo-500/20 select-none shadow-sm dark:shadow-none">
      
      {/* Brand Header */}
      <div className="px-6 py-5 border-b border-slate-200 dark:border-indigo-500/20 flex items-center justify-between">
        <BrandLogo variant="full" size="sm" href="/" />
      </div>

      {/* Quick Action Button */}
      <div className="px-5 pt-5 pb-3">
        <Link
          href="/app/properties/new"
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#0066FF] to-[#7B2CBF] hover:opacity-95 text-white rounded-2xl text-xs font-bold tracking-wide transition shadow-lg shadow-violet-950/20 dark:shadow-violet-950/50 active:scale-[0.98]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{language === 'es' ? 'Nueva Propiedad' : 'New Property'}</span>
        </Link>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-4 py-2 space-y-6 overflow-y-auto scrollbar-none">
        
        {/* Section 1 */}
        <div className="space-y-1.5">
          <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
            {language === 'es' ? 'Gestión Comercial' : 'Core Management'}
          </span>
          {mainNav.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/app/dashboard' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={"flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all " + (
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-gradient-to-r dark:from-blue-600/25 dark:to-violet-600/25 dark:text-white dark:border-violet-500/40 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/60'
                )}
              >
                <div className="flex items-center gap-3.5">
                  <Icon className={"w-4 h-4 " + (isActive ? 'text-blue-600 dark:text-cyan-400' : 'text-slate-500 dark:text-slate-400')} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={"text-[10px] px-2 py-0.5 rounded-full font-bold " + (
                    item.badgeColor || (isActive ? 'bg-violet-100 text-violet-700 dark:bg-violet-500/30 dark:text-violet-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300')
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Section 2 */}
        <div className="space-y-1.5">
          <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
            {language === 'es' ? 'Inteligencia Artificial' : 'AI & Systems'}
          </span>
          {aiToolsNav.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/app/dashboard' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={"flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all " + (
                  isActive
                    ? 'bg-violet-50 text-violet-700 border border-violet-200 dark:bg-gradient-to-r dark:from-blue-600/25 dark:to-violet-600/25 dark:text-white dark:border-violet-500/40 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/60'
                )}
              >
                <div className="flex items-center gap-3.5">
                  <Icon className={"w-4 h-4 " + (isActive ? 'text-violet-600 dark:text-violet-400' : 'text-slate-500 dark:text-slate-400')} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={"text-[10px] px-2 py-0.5 rounded-full font-bold " + (
                    item.badgeColor || (isActive ? 'bg-violet-100 text-violet-700 dark:bg-violet-500/30 dark:text-violet-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300')
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

      </nav>

      {/* Language & Theme Controls Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-indigo-500/20 space-y-3">
        
        {/* Language & Theme Bar */}
        <div className="flex items-center justify-between px-2">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-indigo-500/30 p-1 rounded-xl text-[11px] font-bold">
            <button
              onClick={() => setLanguage('es')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                language === 'es' ? 'bg-gradient-to-r from-[#0066FF] to-[#7B2CBF] text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                language === 'en' ? 'bg-gradient-to-r from-[#0066FF] to-[#7B2CBF] text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>

        {/* Public Site Link */}
        <Link
          href="/"
          className="flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl transition"
        >
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>{language === 'es' ? 'Ver Landing Pública' : 'View Public Landing'}</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
        </Link>

      </div>

      {/* User Agency Profile Card */}
      <div className="p-3.5 m-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-indigo-500/30 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 border border-white/20 flex items-center justify-center font-black text-white text-sm shrink-0 overflow-hidden shadow">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            user.name.charAt(0)
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.agencyName}</p>
        </div>
        <Link href="/app/settings" className="text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition" title="Configuración">
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

    </aside>
  );
};

