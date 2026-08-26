'use client';

import React, { useState } from 'react';
import { 
  Flame, 
  Sun, 
  Snowflake, 
  Phone, 
  Mail, 
  MessageSquare, 
  Sparkles, 
  Trash2, 
  Building, 
  Calendar, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Lead, LeadTemperature, LeadStatus } from '@/types';
import { useApp } from '@/context/AppContext';

interface LeadCardProps {
  lead: Lead;
}

export const LeadCard: React.FC<LeadCardProps> = ({ lead }) => {
  const { updateLead, deleteLead, analyzeLeadWithAI, properties, language } = useApp();
  const [analyzing, setAnalyzing] = useState(false);

  const matchedProp = properties.find(p => p.id === lead.propertyId);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      analyzeLeadWithAI(lead.id);
      setAnalyzing(false);
    }, 400);
  };

  const handleStatusChange = (newStatus: LeadStatus) => {
    updateLead(lead.id, { status: newStatus });
  };

  const inquiryLabels: Record<string, string> = {
    buy: 'Compra',
    rent: 'Alquiler',
    invest: 'Inversión',
    sell: 'Venta',
    info: 'Información',
    visit: 'Visita',
  };

  const timeframeLabels: Record<string, string> = {
    immediate: 'Ahora',
    '1_3_months': '1 a 3 meses',
    '3_6_months': '3 a 6 meses',
    exploring: 'Explorando',
  };

  const initials = lead.name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'LE';

  const cleanPhone = lead.phone ? lead.phone.replace(/[^0-9+]/g, '') : '';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-4">
      {/* Header Info */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <span className={`w-2.5 h-2.5 rounded-full ${lead.temperature === 'hot' ? 'bg-rose-500 animate-pulse' : lead.temperature === 'warm' ? 'bg-amber-500' : 'bg-blue-500'}`}></span>
          <span>
            {language === 'es' 
              ? (lead.temperature === 'hot' ? 'Lead Caliente (Alta Intención)' : lead.temperature === 'warm' ? 'Lead Templado (En Maduración)' : 'Lead Frío (Exploratorio)')
              : (lead.temperature === 'hot' ? 'Hot Lead (High Intent)' : lead.temperature === 'warm' ? 'Warm Lead' : 'Cold Lead')}
          </span>
        </div>
        <span className="text-slate-400 text-[11px] font-medium">
          {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {/* Main Row: Avatar + Name + Score */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-violet-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-md">
            {initials}
          </div>
          <div className="min-w-0">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-tight truncate">
              {lead.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {inquiryLabels[lead.inquiryType] || lead.inquiryType} · {matchedProp?.city || 'Madrid'}
            </p>
          </div>
        </div>

        {/* Score */}
        <div className="text-right shrink-0">
          <span className={`text-2xl font-black ${lead.score >= 80 ? 'text-rose-600 dark:text-rose-400' : lead.score >= 50 ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'}`}>
            {lead.score}<span className="text-xs text-slate-400 font-semibold">/100</span>
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${lead.score >= 80 ? 'bg-gradient-to-r from-orange-500 to-rose-600' : lead.score >= 50 ? 'bg-gradient-to-r from-amber-400 to-amber-600' : 'bg-gradient-to-r from-blue-400 to-blue-600'}`}
          style={{ width: `${lead.score}%` }}
        />
      </div>

      {/* Lead Specs Grid */}
      <div className="grid grid-cols-2 gap-4 text-xs pt-1">
        <div>
          <span className="text-[11px] text-[#849089] block font-semibold">Presupuesto</span>
          <span className="font-extrabold text-[#141c19] text-sm">
            {lead.budget ? `${lead.budget.toLocaleString()} €` : 'No especificado'}
          </span>
        </div>
        <div>
          <span className="text-[11px] text-[#849089] block font-semibold">Plazo</span>
          <span className="font-extrabold text-[#141c19] text-sm">
            {lead.timeframe ? (timeframeLabels[lead.timeframe] || lead.timeframe) : 'Flexible'}
          </span>
        </div>
      </div>

      {/* Lead Message Snippet */}
      {lead.message && (
        <p className="text-xs text-[#53605a] bg-[#fbfcf9] p-3 rounded-xl border border-[#eaece4] italic leading-relaxed">
          &quot;{lead.message}&quot;
        </p>
      )}

      {/* Recommended Next Action Box */}
      <div className="p-3.5 bg-[#fbfcf9] border border-[#eaece4] rounded-2xl space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#6e7b75]">
            <span className="text-[#df5433]">✦</span>
            <span>Próxima acción recomendada</span>
          </div>
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="text-[10px] font-bold text-[#df5433] hover:underline disabled:opacity-50"
          >
            {analyzing ? 'Analizando...' : 'Re-analizar con IA'}
          </button>
        </div>
        <p className="text-xs font-bold text-[#141c19]">
          {lead.recommendedAction || 'Llamar en menos de 15 minutos'}
        </p>
      </div>

      {/* Contact & Status Bar */}
      <div className="pt-2 border-t border-[#eaece4] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {cleanPhone && (
            <>
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#f4f5f0] hover:bg-[#eaece4] text-[#141c19] rounded-lg text-xs font-semibold transition"
                title="Llamar"
              >
                <Phone className="w-3.5 h-3.5 text-[#162e26]" />
                <span>{lead.phone}</span>
              </a>
              <a
                href={`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(`Hola ${lead.name}, te contacto desde habita. en relación a tu consulta sobre "${lead.propertyName || 'la propiedad'}".`)}`}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition"
                title="WhatsApp Directo"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </>
          )}

          {lead.email && (
            <a
              href={`mailto:${lead.email}`}
              className="p-1.5 bg-[#f4f5f0] hover:bg-[#eaece4] text-[#53605a] rounded-lg transition"
              title={lead.email}
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={lead.status}
            onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
            className="text-xs font-semibold bg-[#f4f5f0] border border-[#eaece4] rounded-lg px-2 py-1 text-[#141c19] focus:outline-none"
          >
            <option value="new">Nuevo</option>
            <option value="contacted">Contactado</option>
            <option value="qualified">Cualificado</option>
            <option value="negotiating">En Negociación</option>
            <option value="closed">Cerrado</option>
            <option value="discarded">Descartado</option>
          </select>

          <button
            onClick={() => {
              if (confirm('¿Eliminar este lead?')) {
                deleteLead(lead.id);
              }
            }}
            className="p-1.5 text-slate-400 hover:text-rose-600 transition"
            title="Eliminar"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
