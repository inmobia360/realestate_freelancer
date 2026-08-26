'use client';

import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  DollarSign, 
  Clock,
  Sparkles
} from 'lucide-react';
import { Property, InquiryType } from '@/types';
import { useApp } from '@/context/AppContext';

interface LeadCaptureFormProps {
  property: Property;
  onSuccess?: () => void;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ property, onSuccess }) => {
  const { addLead, user } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState<InquiryType>('buy');
  const [message, setMessage] = useState(
    `Hola, me gustaría solicitar más información y consultar disponibilidad de visita para "${property.title}".`
  );
  const [budget, setBudget] = useState<string>(property.price ? property.price.toString() : '');
  const [timeframe, setTimeframe] = useState<'immediate' | '1_3_months' | '3_6_months' | 'exploring'>('immediate');
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      alert('Debes aceptar la política de privacidad para continuar.');
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      addLead({
        propertyId: property.id,
        name,
        email,
        phone,
        inquiryType,
        message,
        budget: budget ? Number(budget) : undefined,
        timeframe,
        consent,
        status: 'new',
      });

      setSubmitting(false);
      setSubmitted(true);
      if (onSuccess) onSuccess();
    }, 400);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl p-8 text-center space-y-4 animate-in zoom-in-95">
        <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            ¡Solicitud Enviada con Éxito!
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1.5 max-w-md mx-auto">
            Muchas gracias <strong>{name}</strong>. El agente <strong>{user.name}</strong> ({user.agencyName}) ha recibido tu consulta y se pondrá en contacto contigo en breve.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            Enviar otra consulta
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Contactar con el Agente
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Respuesta directa en menos de 2 horas laborables.
        </p>
      </div>

      <div className="space-y-3">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Nombre y Apellidos *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Carlos Fernández"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@email.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Teléfono / WhatsApp *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+34 600 000 000"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Inquiry Type & Timeframe */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Tipo de Consulta
            </label>
            <select
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value as InquiryType)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="buy">Comprar la propiedad</option>
              <option value="visit">Solicitar visita presencial</option>
              <option value="invest">Información de inversión / ROI</option>
              <option value="rent">Alquiler</option>
              <option value="sell">Tengo una propiedad similar para vender</option>
              <option value="info">Más información</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Plazo de Operación
            </label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as 'immediate' | '1_3_months' | '3_6_months' | 'exploring')}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="immediate">Inmediato (&lt; 30 días)</option>
              <option value="1_3_months">De 1 a 3 meses</option>
              <option value="3_6_months">De 3 a 6 meses</option>
              <option value="exploring">Fase de estudio / Explorando</option>
            </select>
          </div>
        </div>

        {/* Budget (Optional) */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Presupuesto orientativo (€) - Opcional
          </label>
          <div className="relative">
            <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="250000"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Mensaje o Pregunta
          </label>
          <textarea
            rows={3}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
          />
        </div>

        {/* Consent Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 dark:text-slate-400">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="w-4 h-4 mt-0.5 text-blue-600 rounded focus:ring-blue-500 shrink-0"
            />
            <span>
              Acepto la política de privacidad y autorizo el tratamiento de mis datos de contacto conforme a la normativa RGPD para recibir información sobre esta propiedad.
            </span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-600/25 transition disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        <span>{submitting ? 'Enviando solicitud...' : 'Solicitar Información y Visita'}</span>
      </button>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>Tus datos se encuentran 100% seguros y encriptados.</span>
      </div>
    </form>
  );
};
