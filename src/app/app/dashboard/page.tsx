'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Users2, 
  Sparkles, 
  Flame, 
  ArrowUpRight, 
  PlusCircle, 
  Share2, 
  Eye, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  FileSpreadsheet,
  Zap,
  ExternalLink
} from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { PropertyCard } from '@/components/property/PropertyCard';
import { LeadCard } from '@/components/lead/LeadCard';
import { AIContentModal } from '@/components/content/AIContentModal';
import { Property } from '@/types';

export default function DashboardPage() {
  const { user, properties, leads, language } = useApp();
  const [selectedPropertyForAI, setSelectedPropertyForAI] = useState<Property | null>(null);

  const totalProps = properties.length;
  const publishedProps = properties.filter(p => p.status === 'published').length;
  const draftProps = properties.filter(p => p.status === 'draft').length;
  const readyProps = properties.filter(p => p.status === 'ready').length;

  const totalLeads = leads.length;
  const hotLeads = leads.filter(l => l.temperature === 'hot');
  const newLeads = leads.filter(l => l.status === 'new').length;

  const totalViews = properties.reduce((acc, p) => acc + (p.viewsCount || 0), 0);

  return (
    <>
      <DashboardHeader 
        title={language === 'es' ? `Bienvenido, ${user.name}` : `Welcome back, ${user.name}`}
        subtitle={language === 'es' ? `Panel de control y rendimiento de ${user.agencyName}` : `Performance dashboard for ${user.agencyName}`}
      />

      <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Published Properties */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:border-blue-500/50 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {language === 'es' ? 'Propiedades Publicadas' : 'Active Properties'}
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {publishedProps}
              </span>
              <span className="text-xs text-slate-400">
                / {totalProps} {language === 'es' ? 'en catálogo' : 'in catalog'}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
              <span className="text-amber-600 font-semibold">{draftProps} borradores</span>
              <span>•</span>
              <span className="text-blue-600 font-semibold">{readyProps} listas</span>
            </div>
          </div>

          {/* Card 2: Total Leads Captured */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:border-emerald-500/50 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {language === 'es' ? 'Leads Recibidos' : 'Leads Captured'}
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
                <Users2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {totalLeads}
              </span>
              {newLeads > 0 && (
                <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">
                  +{newLeads} {language === 'es' ? 'nuevos' : 'new'}
                </span>
              )}
            </div>
            <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Captación activa en landings' : 'Active landing capture'}</span>
            </div>
          </div>

          {/* Card 3: Hot Leads Priority */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:border-rose-500/50 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {language === 'es' ? 'Leads Prioritarios' : 'Hot Priority Leads'}
              </span>
              <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 flex items-center justify-center">
                <Flame className="w-4 h-4 fill-rose-600" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {hotLeads.length}
              </span>
              <span className="text-xs text-rose-600 font-bold uppercase">
                Hot Score &gt; 80%
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500 truncate">
              {language === 'es' ? 'Requieren contacto prioritario' : 'Immediate response needed'}
            </p>
          </div>

          {/* Card 4: Total Landing Views */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:border-purple-500/50 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {language === 'es' ? 'Impactos y Visitas' : 'Landing Impressions'}
              </span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {totalViews.toLocaleString()}
              </span>
              <span className="text-xs text-purple-600 font-semibold">
                {((totalLeads / (totalViews || 1)) * 100).toFixed(1)}% {language === 'es' ? 'conversión' : 'CR'}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500 truncate">
              {language === 'es' ? 'Tráfico en enlaces públicos' : 'Public shared traffic'}
            </p>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
              <h2 className="text-lg font-bold text-white">
                {language === 'es' ? 'Acciones Rápidas de Marketing' : 'Quick Marketing Actions'}
              </h2>
            </div>
            <p className="text-xs text-slate-300 max-w-xl">
              {language === 'es' 
                ? 'Publica una nueva ficha, activa el generador multicanal con IA o comparte tus landings comerciales con compradores e inversores.' 
                : 'Create new listings, trigger AI multichannel copy generation or distribute landing links to prospects.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/app/properties/new"
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-blue-600/30"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{language === 'es' ? 'Crear Propiedad' : 'New Property'}</span>
            </Link>

            <Link
              href="/app/content-generator"
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-semibold backdrop-blur-md transition"
            >
              <Sparkles className="w-4 h-4 text-blue-300" />
              <span>{language === 'es' ? 'Generador IA' : 'AI Content Hub'}</span>
            </Link>

            <Link
              href="/app/leads"
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-semibold backdrop-blur-md transition"
            >
              <Users2 className="w-4 h-4 text-emerald-300" />
              <span>{language === 'es' ? 'Ver Leads' : 'View Leads'}</span>
            </Link>
          </div>
        </div>

        {/* Priority Leads Section */}
        {hotLeads.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-rose-500 fill-rose-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {language === 'es' ? 'Leads Calientes Prioritarios (Acción Inmediata)' : 'Priority Hot Leads (Action Required)'}
                </h3>
              </div>
              <Link 
                href="/app/leads" 
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>{language === 'es' ? 'Ver todos los leads' : 'View all leads'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hotLeads.slice(0, 2).map((lead) => (
                <LeadCard key={lead.id} lead={lead} />
              ))}
            </div>
          </div>
        )}

        {/* Featured Properties Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {language === 'es' ? 'Propiedades Recientes en Cartera' : 'Recent Property Listings'}
              </h3>
            </div>
            <Link 
              href="/app/properties" 
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>{language === 'es' ? 'Ver todas las propiedades' : 'View all properties'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.slice(0, 3).map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property}
                onOpenAIModal={(p) => setSelectedPropertyForAI(p)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* AI Modal if opened */}
      {selectedPropertyForAI && (
        <AIContentModal
          property={selectedPropertyForAI}
          isOpen={!!selectedPropertyForAI}
          onClose={() => setSelectedPropertyForAI(null)}
        />
      )}
    </>
  );
}
