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
  Zap,
  ExternalLink
} from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { PropertyCard } from '@/components/property/PropertyCard';
import { LeadCard } from '@/components/lead/LeadCard';
import { AIContentModal } from '@/components/content/AIContentModal';
import { PanelLayout } from '@/components/PanelLayout';
import { Property } from '@/types';

function DashboardContent() {
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
        subtitle={language === 'es' ? `Panel de operaciones de ${user.agencyName}` : `Performance dashboard for ${user.agencyName}`}
      />

      <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Published Properties */}
          <div className="bg-white border border-[#DCE4EF] rounded-2xl p-5 shadow-sm hover:border-[#C2410C]/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#334B6B]">
                {language === 'es' ? 'Propiedades Publicadas' : 'Active Properties'}
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#FFF1E6] text-[#111A31] flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#172033]">
                {publishedProps}
              </span>
              <span className="text-xs text-[#64748B]">
                / {totalProps} {language === 'es' ? 'en catálogo' : 'in catalog'}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-[#334B6B]">
              <span className="text-amber-700 font-semibold">{draftProps} borradores</span>
              <span>•</span>
              <span className="text-[#111A31] font-semibold">{readyProps} listas</span>
            </div>
          </div>

          {/* Card 2: Total Leads */}
          <div className="bg-white border border-[#DCE4EF] rounded-2xl p-5 shadow-sm hover:border-[#C2410C]/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#334B6B]">
                {language === 'es' ? 'Leads Recibidos' : 'Leads Captured'}
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Users2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#172033]">
                {totalLeads}
              </span>
              {newLeads > 0 && (
                <span className="px-2 py-0.5 bg-[#C2410C]/15 text-[#C2410C] text-xs font-bold rounded-full">
                  +{newLeads} {language === 'es' ? 'nuevos' : 'new'}
                </span>
              )}
            </div>
            <div className="mt-2 text-xs text-emerald-700 font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Captación activa en landings' : 'Active landing capture'}</span>
            </div>
          </div>

          {/* Card 3: Hot Leads Priority */}
          <div className="bg-white border border-[#FED7AA] rounded-2xl p-5 shadow-sm hover:border-[#C2410C] transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C2410C]">
                {language === 'es' ? 'Leads Prioritarios' : 'Hot Priority Leads'}
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#FED7AA] text-[#C2410C] flex items-center justify-center">
                <Flame className="w-4 h-4 fill-[#C2410C]" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#C2410C]">
                {hotLeads.length}
              </span>
              <span className="text-xs text-[#C2410C] font-bold uppercase">
                Score &gt; 80/100
              </span>
            </div>
            <p className="mt-2 text-xs text-[#334B6B] truncate">
              {language === 'es' ? 'Requieren contacto prioritario' : 'Immediate response needed'}
            </p>
          </div>

          {/* Card 4: Impressions */}
          <div className="bg-white border border-[#DCE4EF] rounded-2xl p-5 shadow-sm hover:border-[#C2410C]/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#334B6B]">
                {language === 'es' ? 'Impactos y Visitas' : 'Landing Impressions'}
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#FFF1E6] text-[#111A31] flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#172033]">
                {totalViews.toLocaleString()}
              </span>
              <span className="text-xs text-[#C2410C] font-semibold">
                {((totalLeads / (totalViews || 1)) * 100).toFixed(1)}% conversión
              </span>
            </div>
            <p className="mt-2 text-xs text-[#334B6B] truncate">
              {language === 'es' ? 'Tráfico en enlaces públicos' : 'Public shared traffic'}
            </p>
          </div>
        </div>

        {/* Quick Actions Strip */}
        <div className="bg-[#111A31] rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#C2410C] fill-[#C2410C]" />
              <h2 className="text-lg font-extrabold text-white">
                {language === 'es' ? 'Acciones Rápidas Inmobia 360' : 'Quick Operations'}
              </h2>
            </div>
            <p className="text-xs text-[#CBD5E1] max-w-xl">
              Publica fichas, genera copys multicanal con IA verificada y comparte las landings con compradores.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/properties/new"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#C2410C] hover:bg-[#9A3412] text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{language === 'es' ? 'Crear Propiedad' : 'New Property'}</span>
            </Link>

            <Link
              href="/content-generator"
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-semibold backdrop-blur-md transition"
            >
              <Sparkles className="w-4 h-4 text-[#C2410C]" />
              <span>{language === 'es' ? 'Generador IA' : 'AI Content Hub'}</span>
            </Link>

            <Link
              href="/leads"
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
                <Flame className="w-5 h-5 text-[#C2410C] fill-[#C2410C]" />
                <h3 className="text-base font-extrabold text-[#172033]">
                  {language === 'es' ? 'Leads Calientes Prioritarios' : 'Priority Hot Leads'}
                </h3>
              </div>
              <Link 
                href="/leads" 
                className="text-xs font-bold text-[#C2410C] hover:underline flex items-center gap-1"
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
              <Building2 className="w-5 h-5 text-[#111A31]" />
              <h3 className="text-base font-extrabold text-[#172033]">
                {language === 'es' ? 'Propiedades Recientes en Cartera' : 'Recent Property Listings'}
              </h3>
            </div>
            <Link 
              href="/properties" 
              className="text-xs font-bold text-[#C2410C] hover:underline flex items-center gap-1"
            >
              <span>{language === 'es' ? 'Ver catálogo completo' : 'View full catalog'}</span>
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

export default function DashboardPage() {
  return (
    <PanelLayout>
      <DashboardContent />
    </PanelLayout>
  );
}
