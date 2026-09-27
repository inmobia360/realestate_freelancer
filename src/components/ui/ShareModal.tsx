'use client';

import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Share2, MessageCircle, Mail, Download, QrCode, FileText, ExternalLink } from 'lucide-react';
import { Property } from '@/types';
import { useApp } from '@/context/AppContext';
import { generateQRCodeDataUrl } from '@/lib/qrGenerator';
import { exportPropertyPDF } from '@/lib/pdfExport';

interface ShareModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ property, isOpen, onClose }) => {
  const { user, language } = useApp();
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [showQR, setShowQR] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://propmarketinghub.demo';
  const publicUrl = `${baseUrl}/property/${property.slug}`;

  useEffect(() => {
    if (isOpen) {
      generateQRCodeDataUrl(publicUrl).then(url => setQrCodeUrl(url));
    }
  }, [isOpen, publicUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      language === 'es'
        ? `¡Hola! Te comparto esta propiedad exclusiva: "${property.title}" (${property.city}): ${publicUrl}`
        : `Hello! Check out this exclusive property: "${property.title}" (${property.city}): ${publicUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(property.title);
    const body = encodeURIComponent(
      language === 'es'
        ? `Hola,\n\nTe comparto la ficha comercial de la propiedad "${property.title}" en ${property.city}.\nPuedes ver fotos, características y contactar aquí:\n${publicUrl}\n\nUn cordial saludo,\n${user.name} | ${user.agencyName}`
        : `Hi,\n\nSharing the listing details for "${property.title}" in ${property.city}.\nView photo gallery and full specs here:\n${publicUrl}\n\nBest regards,\n${user.name} | ${user.agencyName}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const handleExportPDF = () => {
    exportPropertyPDF(property, user);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-orange-700" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === 'es' ? 'Compartir y Exportar Propiedad' : 'Share & Export Property'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Property Info Snippet */}
          <div className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-800/60 rounded-xl">
            {property.images[0] && (
              <img 
                src={property.images[0]} 
                alt={property.title} 
                className="w-14 h-14 object-cover rounded-lg shrink-0"
              />
            )}
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-slate-900 dark:text-white truncate text-sm">
                {property.title}
              </h4>
              <p className="text-xs text-slate-500 truncate">
                {property.city} • {property.price.toLocaleString()} {property.currency === 'EUR' ? '€' : '$'}
              </p>
            </div>
            <a 
              href={`/property/${property.slug}`} 
              target="_blank" 
              rel="noreferrer"
              className="p-2 text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/30 rounded-lg transition"
              title="Abrir landing pública"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Direct Public Link Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              {language === 'es' ? 'Enlace Directo de la Landing' : 'Direct Landing Page URL'}
            </label>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                readOnly 
                value={publicUrl} 
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-800 dark:text-slate-200 select-all"
              />
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-orange-700 hover:bg-orange-700 text-white rounded-xl text-sm font-medium transition shadow-sm shrink-0"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? (language === 'es' ? 'Copiado' : 'Copied') : (language === 'es' ? 'Copiar' : 'Copy')}</span>
              </button>
            </div>
          </div>

          {/* Quick Channels Grid */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center justify-center gap-2.5 px-4 py-3 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-xl text-sm font-semibold transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleEmailShare}
              className="flex items-center justify-center gap-2.5 px-4 py-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950/40 dark:hover:bg-slate-900/40 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold transition"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </button>

            <button
              onClick={() => setShowQR(!showQR)}
              className="flex items-center justify-center gap-2.5 px-4 py-3 bg-orange-50 hover:bg-orange-100 dark:bg-orange-950/40 dark:hover:bg-orange-900/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-700 rounded-xl text-sm font-semibold transition"
            >
              <QrCode className="w-4 h-4" />
              <span>{showQR ? (language === 'es' ? 'Ocultar QR' : 'Hide QR') : (language === 'es' ? 'Código QR' : 'QR Code')}</span>
            </button>

            <button
              onClick={handleExportPDF}
              className="col-span-2 flex items-center justify-center gap-2.5 px-4 py-3.5 bg-[#C2410C] hover:bg-[#9A3412] text-white rounded-xl text-sm font-bold transition shadow-lg shadow-orange-950/30 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-orange-700" />
              <span>{language === 'es' ? 'Exportar Folleto Open House A4 (2 Caras)' : 'Export Open House A4 Brochure (2-Sided)'}</span>
            </button>
          </div>

          {/* QR Code Expansion */}
          {showQR && qrCodeUrl && (
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-center space-y-3 animate-in fade-in">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                {language === 'es' ? 'Escanea para abrir la landing pública al instante:' : 'Scan to open public landing instantly:'}
              </p>
              <div className="flex justify-center">
                <img src={qrCodeUrl} alt="QR Code" className="w-44 h-44 rounded-xl shadow-md border p-1 bg-white" />
              </div>
              <a
                href={qrCodeUrl}
                download={`${property.slug}-qr-code.png`}
                className="inline-flex items-center gap-1.5 text-xs text-orange-700 hover:underline font-semibold"
              >
                <Download className="w-3.5 h-3.5" />
                {language === 'es' ? 'Descargar imagen PNG' : 'Download PNG image'}
              </a>
            </div>
          )}
        </div>

        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-xl transition"
          >
            {language === 'es' ? 'Cerrar' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
