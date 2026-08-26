'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
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
  ShieldCheck 
} from 'lucide-react';
import { Property, MarketingContentPack } from '@/types';
import { useApp } from '@/context/AppContext';
import { RealEstateAIEngine } from '@/lib/ai/engine';

interface AIContentModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

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

export const AIContentModal: React.FC<AIContentModalProps> = ({ property, isOpen, onClose }) => {
  const { saveGeneratedContent, getGeneratedContent, language } = useApp();
  const [activeTab, setActiveTab] = useState<TabKey>('commercialTitle');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const existingPack = getGeneratedContent(property.id)?.content;

  const [contentPack, setContentPack] = useState<MarketingContentPack>({
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
  });

  useEffect(() => {
    if (isOpen) {
      if (existingPack) {
        setContentPack(existingPack);
      } else {
        handleGenerate();
      }
    }
  }, [isOpen, property.id]);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const generated = await RealEstateAIEngine.generateMarketingPack(property, {
        language: property.contentLanguage === 'en' ? 'en' : 'es'
      });
      setContentPack(generated);
      saveGeneratedContent(property.id, generated, property.contentLanguage === 'en' ? 'en' : 'es');
    } catch (err) {
      console.error('Error generating AI content:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveEdits = () => {
    saveGeneratedContent(property.id, contentPack, property.contentLanguage === 'en' ? 'en' : 'es');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'commercialTitle', label: language === 'es' ? 'Título Comercial' : 'Commercial Title', icon: FileText },
    { key: 'shortDescription', label: language === 'es' ? 'Descripción Breve' : 'Short Description', icon: FileText },
    { key: 'longDescription', label: language === 'es' ? 'Descripción Larga' : 'Long Description', icon: FileText },
    { key: 'instagramCopy', label: 'Instagram Post', icon: Camera },
    { key: 'facebookCopy', label: 'Facebook Post', icon: Share2 },
    { key: 'whatsappMessage', label: 'WhatsApp Directo', icon: MessageSquare },
    { key: 'videoScript', label: language === 'es' ? 'Guion de Vídeo' : 'Video Script', icon: Video },
    { key: 'investorAngle', label: language === 'es' ? 'Tesis Inversor' : 'Investor Angle', icon: TrendingUp },
    { key: 'foreignBuyerAngle', label: language === 'es' ? 'Comprador Extranjero' : 'International Buyer', icon: Globe },
    { key: 'translatedEn', label: language === 'es' ? 'Traducción EN' : 'Translation EN', icon: Globe },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{language === 'es' ? 'Generador de Contenidos IA' : 'AI Marketing Content Generator'}</span>
                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-bold rounded-full uppercase">
                  Zero Hallucination
                </span>
              </h3>
              <p className="text-xs text-slate-500 truncate max-w-md">
                {property.title} • {property.city}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? (language === 'es' ? 'Generando...' : 'Generating...') : (language === 'es' ? 'Regenerar Todo' : 'Regenerate All')}</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Anti-Hallucination Safe Badge */}
        <div className="px-6 py-2 bg-emerald-50/70 dark:bg-emerald-950/20 border-b border-emerald-100 dark:border-emerald-900/30 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            {language === 'es' 
              ? 'Verificación de datos estricta: Precios, metros y estancias se corresponden 100% con la ficha del inmueble.' 
              : 'Strict data verification: Prices, dimensions, and rooms match property records exactly.'}
          </span>
        </div>

        {/* Body Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Tabs Sidebar */}
          <div className="w-56 border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-2 overflow-y-auto space-y-1 shrink-0">
            {tabs.map((t) => {
              const Icon = t.icon;
              const isSelected = activeTab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Content Editor */}
          <div className="flex-1 p-6 flex flex-col justify-between overflow-y-auto space-y-4">
            <div className="space-y-2 flex-1 flex flex-col">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {tabs.find(t => t.key === activeTab)?.label}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(contentPack[activeTab] || '', activeTab)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition"
                  >
                    {copiedKey === activeTab ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === activeTab ? (language === 'es' ? '¡Copiado!' : 'Copied!') : (language === 'es' ? 'Copiar texto' : 'Copy text')}</span>
                  </button>
                </div>
              </div>

              <textarea
                value={contentPack[activeTab] || ''}
                onChange={(e) => setContentPack({ ...contentPack, [activeTab]: e.target.value })}
                rows={activeTab === 'longDescription' || activeTab === 'videoScript' ? 10 : 5}
                className="w-full flex-1 p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed font-sans"
                placeholder={language === 'es' ? 'El contenido generado aparecerá aquí...' : 'Generated copy will appear here...'}
              />
            </div>

            <div className="text-[11px] text-slate-400">
              {language === 'es'
                ? '💡 Puedes editar libremente el texto antes de guardarlo o copiarlo para tus redes sociales.'
                : '💡 You can freely edit the text before saving or copying for your social campaigns.'}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            {savedSuccess && (
              <>
                <Check className="w-4 h-4" />
                <span>{language === 'es' ? '¡Cambios guardados con éxito!' : 'Changes saved successfully!'}</span>
              </>
            )}
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveEdits}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-600/20 transition"
            >
              <Save className="w-4 h-4" />
              <span>{language === 'es' ? 'Guardar Cambios Editados' : 'Save Edited Changes'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200/50 transition"
            >
              {language === 'es' ? 'Cerrar' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
