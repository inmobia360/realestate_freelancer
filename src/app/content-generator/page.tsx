'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Building2, 
  Copy, 
  Check, 
  Save, 
  RotateCw, 
  Globe, 
  Camera, 
  Share2, 
  MessageSquare, 
  Video, 
  TrendingUp, 
  FileText, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { RealEstateAIEngine } from '@/lib/ai/engine';
import { PanelLayout } from '@/components/PanelLayout';
import { MarketingContentPack } from '@/types';

type TabKey = 
  | 'commercialTitle'
  | 'shortDescription'
  | 'longDescription'
  | 'instagramCopy'
  | 'facebookCopy'
  | 'whatsappMessage'
  | 'videoScript'
  | 'investorAngle'
  | 'foreignBuyerAngle'
  | 'translatedEn';

function ContentGeneratorContent() {
  const { properties, getGeneratedContent, saveGeneratedContent, language } = useApp();
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(properties[0]?.id || '');
  const [activeTab, setActiveTab] = useState<TabKey>('commercialTitle');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const selectedProperty = properties.find(p => p.id === selectedPropertyId) || properties[0];
  const existingRecord = selectedProperty ? getGeneratedContent(selectedProperty.id) : undefined;

  const [currentPack, setCurrentPack] = useState<MarketingContentPack>(
    existingRecord?.content || {
      commercialTitle: '',
      shortDescription: '',
      longDescription: '',
      instagramCopy: '',
      facebookCopy: '',
      whatsappMessage: '',
      videoScript: '',
      investorAngle: '',
      foreignBuyerAngle: '',
      translatedEn: '',
      translatedEs: '',
    }
  );

  const handlePropertyChange = (propId: string) => {
    setSelectedPropertyId(propId);
    const targetProp = properties.find(p => p.id === propId);
    const existing = targetProp ? getGeneratedContent(targetProp.id) : undefined;
    if (existing) {
      setCurrentPack(existing.content);
    } else if (targetProp) {
      triggerGenerate(targetProp);
    }
  };

  const triggerGenerate = async (targetProp = selectedProperty) => {
    if (!targetProp) return;
    setIsGenerating(true);
    try {
      const generated = await RealEstateAIEngine.generateMarketingPack(targetProp, {
        language: targetProp.contentLanguage === 'en' ? 'en' : 'es'
      });
      setCurrentPack(generated);
      saveGeneratedContent(targetProp.id, generated, targetProp.contentLanguage === 'en' ? 'en' : 'es');
    } catch (e) {
      console.error('Error generating AI pack:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSave = () => {
    if (!selectedProperty) return;
    saveGeneratedContent(selectedProperty.id, currentPack, selectedProperty.contentLanguage === 'en' ? 'en' : 'es');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'commercialTitle', label: language === 'es' ? 'Título Comercial' : 'Commercial Title', icon: FileText },
    { key: 'shortDescription', label: language === 'es' ? 'Descripción Breve' : 'Short Description', icon: FileText },
    { key: 'longDescription', label: language === 'es' ? 'Descripción Larga' : 'Long Description', icon: FileText },
    { key: 'instagramCopy', label: 'Instagram Post', icon: Camera },
    { key: 'facebookCopy', label: 'Facebook Post', icon: Share2 },
    { key: 'whatsappMessage', label: 'WhatsApp Mensaje', icon: MessageSquare },
    { key: 'videoScript', label: language === 'es' ? 'Guion de Vídeo' : 'Video Script', icon: Video },
    { key: 'investorAngle', label: language === 'es' ? 'Tesis Inversor' : 'Investor Angle', icon: TrendingUp },
    { key: 'foreignBuyerAngle', label: language === 'es' ? 'Comprador Extranjero' : 'International Buyer', icon: Globe },
    { key: 'translatedEn', label: language === 'es' ? 'Traducción EN' : 'Translation EN', icon: Globe },
  ];

  return (
    <>
      <DashboardHeader 
        title={language === 'es' ? 'Estudio de Contenidos IA' : 'AI Marketing Content Studio'}
        subtitle={language === 'es' ? 'Generación omnicanal automatizada para portales, redes sociales, vídeos y WhatsApp' : 'Multichannel automated copywriting for portals, social media, video scripts and WhatsApp'}
      />

      <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 max-w-xl">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              {language === 'es' ? 'Seleccionar Propiedad' : 'Select Property'}
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <select
                value={selectedPropertyId}
                onChange={(e) => handlePropertyChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} — ({p.city} • {p.price.toLocaleString()} €)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => triggerGenerate()}
              disabled={isGenerating || !selectedProperty}
              className="flex items-center gap-2 px-5 py-2.5 bg-orange-700 hover:bg-orange-500 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-700/20 transition disabled:opacity-50"
            >
              <RotateCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? (language === 'es' ? 'Generando Pack IA...' : 'Generating...') : (language === 'es' ? 'Regenerar Todo el Pack' : 'Regenerate Content Pack')}</span>
            </button>
          </div>
        </div>

        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 rounded-2xl flex items-center justify-between gap-3 text-xs text-emerald-800 dark:text-emerald-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold">Garantía Zero Hallucination:</span> La IA genera copys únicamente a partir de los datos verificados del inmueble.
            </div>
          </div>
          {savedSuccess && (
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <Check className="w-4 h-4" /> Guardado
            </span>
          )}
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[500px]">
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-3 space-y-1 shrink-0">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Formatos Comerciales
            </div>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition ${
                    isSelected
                      ? 'bg-orange-700 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{tab.label}</span>
                  </div>
                  <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                </button>
              );
            })}
          </div>

          <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3 flex-1 flex flex-col">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {tabs.find(t => t.key === activeTab)?.label}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Texto optimizado para alta tasa de conversión comercial.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(currentPack[activeTab] || '', activeTab)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold transition"
                  >
                    {copiedKey === activeTab ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === activeTab ? '¡Copiado!' : 'Copiar'}</span>
                  </button>

                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1.5 px-4 py-2 bg-orange-700 hover:bg-orange-500 text-white rounded-xl text-xs font-semibold shadow-sm transition"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Guardar Cambios</span>
                  </button>
                </div>
              </div>

              <textarea
                value={currentPack[activeTab] || ''}
                onChange={(e) => setCurrentPack({ ...currentPack, [activeTab]: e.target.value })}
                rows={12}
                className="w-full flex-1 p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none leading-relaxed font-sans"
                placeholder="Generando contenido con IA..."
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>{currentPack[activeTab]?.length || 0} caracteres</span>
              <span>{currentPack[activeTab]?.split(/\s+/).filter(Boolean).length || 0} palabras</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ContentGeneratorPage() {
  return (
    <PanelLayout>
      <ContentGeneratorContent />
    </PanelLayout>
  );
}
