'use client';

import React, { useState } from 'react';
import { 
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
import { PanelLayout } from '@/components/PanelLayout';

function SettingsContent() {
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
        title={language === 'es' ? 'Configuración de Agencia y Agente' : 'Agency & Agent Settings'}
        subtitle={language === 'es' ? 'Personaliza tu identidad corporativa, datos de contacto y avisos legales en las landings' : 'Customize corporate identity, contact details, and legal notices on property landings'}
      />

      <div className="p-6 sm:p-8 max-w-5xl mx-auto w-full pb-16">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-[#334B6B] font-semibold">Perfil Profesional Inmobia 360</span>
            </div>
            <div className="flex items-center gap-3">
              {saved && (
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Configuración guardada</span>
                </span>
              )}
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-[#C2410C] hover:bg-[#9A3412] text-white rounded-xl text-sm font-bold shadow-sm transition"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </div>

          {/* 1. Identity */}
          <div className="bg-white border border-[#DCE4EF] rounded-2xl p-6 shadow-sm space-y-6">
            <div className="border-b border-[#DCE4EF] pb-4">
              <h2 className="text-base font-bold text-[#172033] flex items-center gap-2">
                <User className="w-5 h-5 text-[#111A31]" />
                <span>1. Perfil del Agente y Agencia</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5">
                  Nombre del Agente *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE4EF] bg-[#F7F9FC] text-[#172033] text-sm focus:ring-2 focus:ring-[#111A31] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5">
                  Nombre de la Agencia *
                </label>
                <input
                  type="text"
                  required
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE4EF] bg-[#F7F9FC] text-[#172033] text-sm focus:ring-2 focus:ring-[#111A31] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5">
                  Nº Colegiado / Licencia
                </label>
                <input
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="AICAT-94821 / RAICV-1029"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE4EF] bg-[#F7F9FC] text-[#172033] text-sm focus:ring-2 focus:ring-[#111A31] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5">
                  Email de Notificaciones *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE4EF] bg-[#F7F9FC] text-[#172033] text-sm focus:ring-2 focus:ring-[#111A31] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5">
                  Teléfono de Contacto
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE4EF] bg-[#F7F9FC] text-[#172033] text-sm focus:ring-2 focus:ring-[#111A31] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5">
                  WhatsApp Directo
                </label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+34654987321"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE4EF] bg-[#F7F9FC] text-[#172033] text-sm focus:ring-2 focus:ring-[#111A31] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 2. Visual Identity */}
          <div className="bg-white border border-[#DCE4EF] rounded-2xl p-6 shadow-sm space-y-6">
            <div className="border-b border-[#DCE4EF] pb-4">
              <h2 className="text-base font-bold text-[#172033] flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#111A31]" />
                <span>2. Identidad Visual</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5">
                  URL del Logotipo
                </label>
                <input
                  type="url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE4EF] bg-[#F7F9FC] text-[#172033] text-sm focus:ring-2 focus:ring-[#111A31] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5">
                  URL Fotografía del Agente
                </label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE4EF] bg-[#F7F9FC] text-[#172033] text-sm focus:ring-2 focus:ring-[#111A31] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5">
                  Color de Marca
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
                    className="flex-1 px-3 py-2 rounded-xl border border-[#DCE4EF] bg-[#F7F9FC] text-[#172033] text-sm font-mono focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Legal */}
          <div className="bg-white border border-[#DCE4EF] rounded-2xl p-6 shadow-sm space-y-6">
            <div className="border-b border-[#DCE4EF] pb-4">
              <h2 className="text-base font-bold text-[#172033] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#111A31]" />
                <span>3. Textos Legales y Privacidad RGPD</span>
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5">
                  Aviso Legal Editable (Pie de Landings y PDFs)
                </label>
                <textarea
                  rows={3}
                  value={legalNotice}
                  onChange={(e) => setLegalNotice(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#DCE4EF] bg-[#F7F9FC] text-[#172033] text-sm focus:ring-2 focus:ring-[#111A31] focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5">
                  Cláusula de Privacidad y Consentimiento
                </label>
                <textarea
                  rows={3}
                  value={privacyNotice}
                  onChange={(e) => setPrivacyNotice(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#DCE4EF] bg-[#F7F9FC] text-[#172033] text-sm focus:ring-2 focus:ring-[#111A31] focus:outline-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => {
                if (confirm('¿Restablecer datos demo de ejemplo?')) {
                  resetToDemoData();
                }
              }}
              className="text-xs text-[#334B6B] hover:text-[#172033] flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer datos demo por defecto</span>
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3 bg-[#C2410C] hover:bg-[#9A3412] text-white rounded-xl text-sm font-bold shadow-md transition"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Configuración</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default function SettingsPage() {
  return (
    <PanelLayout>
      <SettingsContent />
    </PanelLayout>
  );
}
