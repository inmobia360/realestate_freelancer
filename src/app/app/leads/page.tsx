'use client';

import React, { useState } from 'react';
import { 
  Users2, 
  Flame, 
  Sun, 
  Snowflake, 
  Filter, 
  Search, 
  TrendingUp, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { LeadCard } from '@/components/lead/LeadCard';
import { LeadTemperature, LeadStatus } from '@/types';

export default function LeadsPage() {
  const { leads, properties, language } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [tempFilter, setTempFilter] = useState<'all' | LeadTemperature>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | LeadStatus>('all');

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.propertyName && lead.propertyName.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;
    if (tempFilter !== 'all' && lead.temperature !== tempFilter) return false;
    if (statusFilter !== 'all' && lead.status !== statusFilter) return false;
    return true;
  });

  const hotCount = leads.filter(l => l.temperature === 'hot').length;
  const warmCount = leads.filter(l => l.temperature === 'warm').length;
  const coldCount = leads.filter(l => l.temperature === 'cold').length;
  const avgScore = leads.length > 0 ? Math.round(leads.reduce((acc, l) => acc + l.score, 0) / leads.length) : 0;

  return (
    <>
      <DashboardHeader 
        title={language === 'es' ? 'Centro de Captación de Leads' : 'Leads Intelligence Hub'}
        subtitle={language === 'es' ? 'Clasificación automática con IA, temperatura de compra y acciones recomendadas' : 'AI automated classification, buyer temperature scoring and next recommended actions'}
      />

      <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400">Total Leads</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{leads.length}</div>
            <span className="text-xs text-slate-600 dark:text-slate-400">Captados en landings</span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/40 rounded-2xl p-4 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-rose-500" />
              <span>{language === 'es' ? 'Leads Calientes' : 'Hot Leads'}</span>
            </span>
            <div className="text-2xl font-black text-rose-700 dark:text-rose-400 mt-1">{hotCount}</div>
            <span className="text-xs text-rose-700 dark:text-rose-400 font-semibold">{language === 'es' ? 'Alta Intención / Urgente' : 'Score > 80 / 100'}</span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/40 rounded-2xl p-4 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 fill-amber-500" />
              <span>{language === 'es' ? 'Leads Templados' : 'Warm Leads'}</span>
            </span>
            <div className="text-2xl font-black text-amber-700 dark:text-amber-400 mt-1">{warmCount}</div>
            <span className="text-xs text-amber-700 dark:text-amber-400 font-semibold">{language === 'es' ? 'En Prospección (1-3 meses)' : 'Prospecting (1-3 mos)'}</span>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Puntuación Media IA' : 'Avg AI Score'}</span>
            </span>
            <div className="text-2xl font-black text-blue-700 dark:text-blue-400 mt-1">{avgScore}<span className="text-xs text-slate-500 dark:text-slate-400 font-normal">/100</span></div>
            <span className="text-xs text-slate-600 dark:text-slate-400">{language === 'es' ? 'Calidad de prospectos' : 'Lead quality'}</span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'es' ? 'Buscar por nombre, email, teléfono o propiedad...' : 'Search by name, email, phone or property...'}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Temperature Filter */}
            <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setTempFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${tempFilter === 'all' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'}`}
              >
                {language === 'es' ? `Todos (${leads.length})` : `All (${leads.length})`}
              </button>
              <button
                onClick={() => setTempFilter('hot')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition cursor-pointer ${tempFilter === 'hot' ? 'bg-rose-600 text-white' : 'text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30'}`}
              >
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>{language === 'es' ? `Calientes (${hotCount})` : `Hot (${hotCount})`}</span>
              </button>
              <button
                onClick={() => setTempFilter('warm')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition cursor-pointer ${tempFilter === 'warm' ? 'bg-amber-500 text-white' : 'text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30'}`}
              >
                <Sun className="w-3.5 h-3.5 fill-current" />
                <span>{language === 'es' ? `Templados (${warmCount})` : `Warm (${warmCount})`}</span>
              </button>
              <button
                onClick={() => setTempFilter('cold')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1 transition cursor-pointer ${tempFilter === 'cold' ? 'bg-blue-600 text-white' : 'text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30'}`}
              >
                <Snowflake className="w-3.5 h-3.5" />
                <span>{language === 'es' ? `Fríos (${coldCount})` : `Cold (${coldCount})`}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Leads List */}
        {filteredLeads.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <Users2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {language === 'es' ? 'No hay leads en este filtro' : 'No leads matching this filter'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'es' ? 'Los contactos captados a través del formulario de tus landing pages aparecerán aquí automáticamente.' : 'Leads captured on public property landing pages will appear here.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLeads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
