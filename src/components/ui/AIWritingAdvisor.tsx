'use client';

import React, { useState, useMemo } from 'react';
import { Sparkles, CheckCircle2, AlertCircle, Wand2, ArrowRight } from 'lucide-react';

interface AIWritingAdvisorProps {
  text: string;
  onApplyCorrection: (correctedText: string) => void;
  language?: 'es' | 'en';
  className?: string;
}

interface GrammarSuggestion {
  original: string;
  replacement: string;
  reason: string;
}

export const AIWritingAdvisor: React.FC<AIWritingAdvisorProps> = ({
  text,
  onApplyCorrection,
  language = 'es',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Common Real Estate orthography & style dictionary
  const suggestions: GrammarSuggestion[] = useMemo(() => {
    if (!text || text.length < 4) return [];
    const result: GrammarSuggestion[] = [];

    if (language === 'es') {
      const spanishRules: [RegExp, string, string][] = [
        [/\batico\b/gi, 'ático', 'Falta la tilde ortográfica en la vocal esdrújula.'],
        [/\bduplex\b/gi, 'dúplex', 'Requiere tilde por ser palabra llana terminada en x.'],
        [/\bano\b/gi, 'año', 'Se recomienda corregir por "año" para evitar ambigüedades.'],
        [/\bsalon\b/gi, 'salón', 'Palabra aguda terminada en n requiere tilde.'],
        [/\bjardin\b/gi, 'jardín', 'Palabra aguda terminada en n requiere tilde.'],
        [/\bcalefaccion\b/gi, 'calefacción', 'Palabra aguda terminada en n requiere tilde.'],
        [/\bgarantia\b/gi, 'garantía', 'Contiene hiato acentual (í-a).'],
        [/\bproximo\b/gi, 'próximo', 'Palabra esdrújula requiere tilde.'],
        [/\bubicacion\b/gi, 'ubicación', 'Palabra aguda terminada en n requiere tilde.'],
        [/\bhabitacion\b/gi, 'habitación', 'Palabra aguda terminada en n requiere tilde.'],
        [/\binversion\b/gi, 'inversión', 'Palabra aguda terminada en n requiere tilde.'],
        [/\bbanos\b/gi, 'baños', 'Corrección de carácter "ñ".'],
        [/\bluminoso y acogedor\b/gi, 'con abundante luz natural y acabados de alta gama', 'Sugerencia de estilo: Evita clichés inmobiliarios para aumentar la conversión.'],
        [/\boportunidad unica\b/gi, 'oportunidad exclusiva', 'Sugerencia B2B: Tono más profesional para inversores.']
      ];

      spanishRules.forEach(([regex, replacement, reason]) => {
        if (regex.test(text)) {
          const match = text.match(regex);
          if (match) {
            result.push({ original: match[0], replacement, reason });
          }
        }
      });
    } else {
      const englishRules: [RegExp, string, string][] = [
        [/\bappartment\b/gi, 'apartment', 'Spelling correction.'],
        [/\baccomodation\b/gi, 'accommodation', 'Spelling correction (double c, double m).'],
        [/\bseperate\b/gi, 'separate', 'Spelling correction.'],
        [/\boppurtunity\b/gi, 'opportunity', 'Spelling correction.'],
        [/\bnice and cozy\b/gi, 'bright and exquisitely appointed', 'Style suggestion: enhance commercial appeal.'],
      ];

      englishRules.forEach(([regex, replacement, reason]) => {
        if (regex.test(text)) {
          const match = text.match(regex);
          if (match) {
            result.push({ original: match[0], replacement, reason });
          }
        }
      });
    }

    return result;
  }, [text, language]);

  const handleFixAll = () => {
    let corrected = text;
    suggestions.forEach(s => {
      corrected = corrected.replace(new RegExp(s.original, 'gi'), s.replacement);
    });
    onApplyCorrection(corrected);
  };

  if (!text || text.length < 5) return null;

  return (
    <div className={`mt-2 ${className}`}>
      {suggestions.length === 0 ? (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{language === 'es' ? 'Ortografía y estilo optimizados (ES)' : 'Grammar & copy optimized (EN)'}</span>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/30 text-xs">
            <div className="flex items-center gap-2 text-violet-700 dark:text-violet-300 font-bold">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>
                {language === 'es'
                  ? `Asesor IA: ${suggestions.length} sugerencia(s) de ortografía y estilo`
                  : `AI Advisor: ${suggestions.length} spelling & copy tip(s)`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="text-[11px] underline text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
              >
                {isOpen ? (language === 'es' ? 'Ocultar' : 'Hide') : (language === 'es' ? 'Ver detalles' : 'View tips')}
              </button>

              <button
                type="button"
                onClick={handleFixAll}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold text-[11px] shadow-sm transition cursor-pointer"
              >
                <Wand2 className="w-3 h-3 text-cyan-300" />
                <span>{language === 'es' ? 'Corregir con 1 Clic' : 'Auto-Fix All'}</span>
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2 text-slate-200">
              {suggestions.map((s, idx) => (
                <div key={idx} className="flex items-start justify-between gap-3 pb-2 border-b border-slate-800 last:border-0 last:pb-0">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="line-through text-rose-400 font-mono">{s.original}</span>
                      <ArrowRight className="w-3 h-3 text-slate-500" />
                      <span className="text-cyan-300 font-bold font-mono">{s.replacement}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">{s.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};