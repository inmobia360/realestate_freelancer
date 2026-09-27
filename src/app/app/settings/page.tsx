'use client';

import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Building, 
  Mail, 
  Phone, 
  MessageSquare, 
  Globe, 
  Palette, 
  FileText, 
  Save, 
  CheckCircle2,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { useApp } from '@/context/AppContext';

export default function SettingsPage() {
  const { user, updateUser, resetToDemoData, language } = useApp();

  const [name, setName] = useState(user.name);
  const [agencyName, setAgencyName] = useState(user.agencyName);
  const [licenseNumber, setLicenseNumber] = useState(user.licenseNumber || '');
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [whatsapp, setWhatsapp] = useState(user.whatsapp);
  const [city, setCity] = useState(user.city);
  const [country, setCountry] = useState(user.country);
  const [userLang, setUserLang] = useState<'es' | 'en'>(user.language || 'es');
  const [currency, setCurrency] = useState<'EUR' | 'USD' | 'GBP'>(user.currency || 'EUR');
  const [brandColor, setBrandColor] = useState(user.brandColor || '#C2410C');
  const [logoUrl, setLogoUrl] = useState(user.logoUrl || '');
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || '');
  const [legalNotice, setLegalNotice] = useState(user.legalNotice || '');
  const [privacyNotice, setPrivacyNotice] = useState(user.privacyNotice || '');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      agencyName,
      licenseNumber,
      email,
      phone,
      whatsapp,
      city,
      country,
      language: userLang,
      currency,
      brandColor,
      logoUrl,
      avatarUrl,
      legalNotice,
      privacyNotice,
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <>
      <DashboardHeader 
        title={language === 'es' ? 'Configuración de la Agencia y Agente' : 'Agency & Agent Settings'}
        subtitle={language === 'es' ? 'Personaliza tu identidad corporativa, datos de contacto y avisos legales en las landings' : 'Customize corporate identity, contact details, and legal notices on property landings'}
      />

      <div className="p-6 sm:p-8 max-w-5xl mx-auto w-full pb-16">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header Action Bar */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-medium">Perfil Profesional Inmobiliario</span>
            </div>
            <div className="flex items-center gap-3">
              {saved && (
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{language === 'es' ? 'Configuración guardada' : 'Settings saved'}</span>
                </span>
              )}
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-orange-700 hover:bg-orange-500 text-white rounded-xl text-sm font-semibold shadow-md shadow-orange-700/20 transition"
              >
                <Save className="w-4 h-4" />
                <span>{language === 'es' ? 'Guardar Cambios' : 'Save Changes'}</span>
              </button>
            </div>
          </div>

          {/* 1. Identity & Agent Info */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <User className="w-5 h-5 text-orange-700" />
                <span>{language === 'es' ? '1. Perfil del Agente y Agencia' : '1. Agent & Agency Profile'}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {language === 'es' ? 'Nombre del Agente *' : 'Agent Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {language === 'es' ? 'Nombre de la Agencia *' : 'Agency Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {language === 'es' ? 'Nº Colegiado / Licencia' : 'License / Registration No.'}
                </label>
                <input
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="AICAT-94821 / RAICV-1029"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email de Notificaciones *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Teléfono de Contacto
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  WhatsApp Directo (con prefijo internacional)
                </label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+34654987321"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Ciudad Base
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  País
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 2. Visual Identity & Assets */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-orange-700" />
                <span>{language === 'es' ? '2. Identidad Visual y Marca' : '2. Visual Identity & Branding'}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  URL del Logotipo
                </label>
                <input
                  type="url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  URL de la Fotografía del Agente
                </label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Color Principal de Marca
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0"
                  />
                  <input
                    type="text"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-mono focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Regional Settings & Legal Notice */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-orange-700" />
                <span>{language === 'es' ? '3. Regionalización y Textos Legales' : '3. Regionalization & Legal Compliance'}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Moneda Predeterminada
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as 'EUR' | 'USD' | 'GBP')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="EUR">Euro (€)</option>
                  <option value="USD">Dólar USA ($)</option>
                  <option value="GBP">Libra Esterlina (£)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Idioma Predeterminado
                </label>
                <select
                  value={userLang}
                  onChange={(e) => setUserLang(e.target.value as 'es' | 'en')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Aviso Legal Editable (Pie de Landing y PDFs)
                </label>
                <textarea
                  rows={3}
                  value={legalNotice}
                  onChange={(e) => setLegalNotice(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none leading-relaxed"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Cláusula de Privacidad y Consentimiento RGPD
                </label>
                <textarea
                  rows={3}
                  value={privacyNotice}
                  onChange={(e) => setPrivacyNotice(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => {
                if (confirm(language === 'es' ? '¿Restablecer datos demo de ejemplo?' : 'Reset demo data?')) {
                  resetToDemoData();
                }
              }}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Restablecer datos de prueba por defecto' : 'Reset default test data'}</span>
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3 bg-orange-700 hover:bg-orange-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-700/25 transition"
            >
              <Save className="w-4 h-4" />
              <span>{language === 'es' ? 'Guardar Toda la Configuración' : 'Save All Settings'}</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
