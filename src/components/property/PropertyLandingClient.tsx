'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  BedDouble, 
  Bath, 
  Maximize2, 
  Car, 
  Sun, 
  Share2, 
  FileText, 
  MessageSquare, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { AppProvider, useApp } from '@/context/AppContext';
import { LeadCaptureForm } from '@/components/lead/LeadCaptureForm';
import { ShareModal } from '@/components/ui/ShareModal';
import { exportPropertyPDF } from '@/lib/pdfExport';

export function PropertyLandingInner({ slug }: { slug: string }) {
  const { properties, user, getPropertyBySlug } = useApp();

  const property = getPropertyBySlug(slug) || properties.find(p => p.slug === slug || p.id === slug);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen bg-[#111A31] text-white flex flex-col items-center justify-center p-6 text-center">
        <Building2 className="w-16 h-16 text-[#C2410C] mb-4" />
        <h1 className="text-2xl font-bold">Propiedad no disponible o en revisión</h1>
        <p className="text-[#CBD5E1] mt-2 max-w-md">
          El inmueble que buscas no está publicado en este momento o el enlace es incorrecto.
        </p>
        <Link 
          href="/" 
          className="mt-6 px-6 py-2.5 bg-[#C2410C] hover:bg-[#9A3412] rounded-xl font-bold text-sm transition"
        >
          Volver a la página principal
        </Link>
      </div>
    );
  }

  const currencySymbol = property.currency === 'EUR' ? '€' : property.currency === 'USD' ? '$' : '£';
  const cleanWhatsApp = user.whatsapp.replace(/[^0-9+]/g, '');
  const opBadge = property.operation === 'sale' ? 'En Venta' : property.operation === 'rent' ? 'En Alquiler' : 'Oportunidad Inversión';

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#172033] font-sans">
      <header className="sticky top-0 z-40 bg-[#F7F9FC]/90 backdrop-blur-md border-b border-[#DCE4EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#111A31] flex items-center justify-center text-white font-black text-sm shadow-sm">
              H
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base text-[#172033] block leading-tight">
                {user.agencyName}
              </span>
              <span className="text-[10px] text-[#334B6B]">
                {user.licenseNumber || 'Agencia Inmobiliaria'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-[#DCE4EF] hover:bg-[#FFF1E6] text-[#172033] rounded-xl text-xs font-bold transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Compartir</span>
            </button>

            <button
              onClick={() => exportPropertyPDF(property, user)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#111A31] hover:bg-[#111A31] text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Dossier PDF</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-[#111A31] text-white text-xs font-extrabold rounded-lg uppercase tracking-wide">
                {opBadge}
              </span>
              <span className="px-3 py-1 bg-white border border-[#DCE4EF] text-[#172033] text-xs font-bold rounded-lg capitalize">
                {property.propertyType.replace('_', ' ')}
              </span>
              <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-lg">
                Estado: {property.condition.replace('_', ' ')}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#172033] tracking-tight leading-tight">
              {property.title}
            </h1>

            <p className="flex items-center gap-1.5 text-sm sm:text-base text-[#334B6B]">
              <MapPin className="w-4 h-4 text-[#C2410C] shrink-0" />
              <span>{property.address ? `${property.address}, ` : ''}{property.area}, {property.city} ({property.country})</span>
            </p>
          </div>

          <div className="text-left md:text-right bg-white border border-[#DCE4EF] p-4 sm:p-5 rounded-2xl shadow-sm shrink-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">
              Precio de Referencia
            </span>
            <div className="text-3xl sm:text-4xl font-black text-[#C2410C] leading-none mt-1">
              {property.price.toLocaleString()} {currencySymbol}
            </div>
            {property.operation === 'rent' && (
              <span className="text-xs text-[#64748B] mt-1 block">/ mes</span>
            )}
          </div>
        </div>

        {/* Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-xl bg-[#111A31]">
            <img
              src={property.images[activeImageIdx] || property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover transition duration-300"
            />

            {property.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIdx((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveImageIdx((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/70 backdrop-blur-md text-white text-xs font-bold rounded-xl">
              {activeImageIdx + 1} / {property.images.length}
            </div>
          </div>

          {property.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                    activeImageIdx === idx ? 'border-[#C2410C] shadow-md scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-[#DCE4EF] rounded-2xl p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFF1E6] text-[#111A31] flex items-center justify-center">
                  <Maximize2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase font-bold block">Superficie</span>
                  <span className="text-base font-black text-[#172033]">{property.builtArea} m²</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFF1E6] text-[#111A31] flex items-center justify-center">
                  <BedDouble className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase font-bold block">Dormitorios</span>
                  <span className="text-base font-black text-[#172033]">{property.bedrooms}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFF1E6] text-[#111A31] flex items-center justify-center">
                  <Bath className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase font-bold block">Baños</span>
                  <span className="text-base font-black text-[#172033]">{property.bathrooms}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFF1E6] text-[#111A31] flex items-center justify-center">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase font-bold block">Garaje</span>
                  <span className="text-base font-black text-[#172033]">{property.garage ? 'Sí' : 'No'}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#DCE4EF] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-[#172033]">
                Descripción Detallada
              </h2>
              <div className="text-[#334B6B] text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {property.description}
              </div>
            </div>

            <div className="bg-white border border-[#DCE4EF] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-[#172033]">
                Características y Equipamiento
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F7F9FC] border border-[#DCE4EF]">
                    <CheckCircle2 className="w-4 h-4 text-[#C2410C] shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-[#172033]">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#111A31] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 overflow-hidden shrink-0 flex items-center justify-center text-xl font-black">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user.name.charAt(0)
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{user.name}</h3>
                  <p className="text-xs text-[#CBD5E1] font-bold">{user.agencyName}</p>
                  <p className="text-xs text-[#64748B] mt-1">{user.licenseNumber || 'Agente Inmobiliario Profesional'}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${cleanWhatsApp}`}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{user.phone}</span>
                </a>
                <a
                  href={`https://api.whatsapp.com/send?phone=${cleanWhatsApp}&text=${encodeURIComponent(`Hola ${user.name}, estoy interesado en recibir información sobre "${property.title}" (${property.city}).`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#C2410C] hover:bg-[#9A3412] text-white rounded-xl text-xs font-extrabold transition shadow-md"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Directo</span>
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="sticky top-24">
              <LeadCaptureForm property={property} />

              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#172033] block">¿Prefieres chatear?</span>
                    <span className="text-[11px] text-[#334B6B]">Respuesta directa</span>
                  </div>
                </div>
                <a
                  href={`https://api.whatsapp.com/send?phone=${cleanWhatsApp}&text=${encodeURIComponent(`Hola, quisiera consultar por la propiedad "${property.title}".`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition"
                >
                  Abrir Chat
                </a>
              </div>
            </div>
          </div>
        </div>

        <footer className="pt-12 pb-8 border-t border-[#DCE4EF] text-xs text-[#64748B] space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} {user.agencyName}.</p>
            <div className="flex items-center gap-2 text-[#64748B]">
              <ShieldCheck className="w-4 h-4 text-[#111A31]" />
              <span>{user.legalNotice || 'Cumplimiento con la normativa legal vigente.'}</span>
            </div>
          </div>
          <p className="text-[11px] text-[#64748B]">
            {user.privacyNotice || 'Tratamiento de datos conforme a la normativa de privacidad.'}
          </p>
        </footer>
      </main>

      <ShareModal
        property={property}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </div>
  );
}

export function PropertyLandingClient({ slug }: { slug: string }) {
  return (
    <AppProvider>
      <PropertyLandingInner slug={slug} />
    </AppProvider>
  );
}
