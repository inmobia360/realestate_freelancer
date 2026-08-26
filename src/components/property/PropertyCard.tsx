'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building, 
  MapPin, 
  BedDouble, 
  Bath, 
  Maximize2, 
  Eye, 
  Users, 
  Sparkles, 
  Share2, 
  Edit3, 
  Trash2, 
  ExternalLink,
  CheckCircle2,
  Car,
  Sun
} from 'lucide-react';
import { Property, PropertyStatus } from '@/types';
import { useApp } from '@/context/AppContext';
import { ShareModal } from '../ui/ShareModal';

interface PropertyCardProps {
  property: Property;
  onOpenAIModal?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onOpenAIModal }) => {
  const { deleteProperty, updateProperty, language } = useApp();
  const [showShare, setShowShare] = useState(false);

  const statusStyles: Record<PropertyStatus, { label: string; bg: string; text: string }> = {
    draft: { label: language === 'es' ? 'Borrador' : 'Draft', bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-300' },
    ready: { label: language === 'es' ? 'Listo' : 'Ready', bg: 'bg-amber-50 dark:bg-amber-950/40', text: 'text-amber-700 dark:text-amber-400' },
    published: { label: language === 'es' ? 'Publicado' : 'Published', bg: 'bg-emerald-50 dark:bg-emerald-950/40', text: 'text-emerald-700 dark:text-emerald-400' },
    reserved: { label: language === 'es' ? 'Reservado' : 'Reserved', bg: 'bg-purple-50 dark:bg-purple-950/40', text: 'text-purple-700 dark:text-purple-400' },
    sold: { label: language === 'es' ? 'Vendido' : 'Sold', bg: 'bg-blue-50 dark:bg-blue-950/40', text: 'text-blue-700 dark:text-blue-400' },
    rented: { label: language === 'es' ? 'Alquilado' : 'Rented', bg: 'bg-indigo-50 dark:bg-indigo-950/40', text: 'text-indigo-700 dark:text-indigo-400' },
    archived: { label: language === 'es' ? 'Archivado' : 'Archived', bg: 'bg-rose-50 dark:bg-rose-950/40', text: 'text-rose-700 dark:text-rose-400' },
  };

  const currentStatus = statusStyles[property.status] || statusStyles.draft;
  const currencySymbol = property.currency === 'EUR' ? '€' : property.currency === 'USD' ? '$' : '£';

  const handleStatusChange = (newStatus: PropertyStatus) => {
    updateProperty(property.id, { 
      status: newStatus, 
      published: newStatus === 'published' 
    });
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">
        {/* Image & Badges */}
        <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <img
            src={property.images[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80'}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Operation & Status pill */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold uppercase rounded-lg">
              {property.operation === 'sale' ? (language === 'es' ? 'Venta' : 'Sale') : property.operation === 'rent' ? (language === 'es' ? 'Alquiler' : 'Rent') : 'Inversión'}
            </span>
            <span className={`px-2.5 py-1 text-[11px] font-bold rounded-lg ${currentStatus.bg} ${currentStatus.text} border border-current/20 backdrop-blur-md`}>
              {currentStatus.label}
            </span>
          </div>

          {/* Price overlay */}
          <div className="absolute bottom-3 left-3 text-white">
            <span className="text-xl font-extrabold tracking-tight drop-shadow-md">
              {property.price.toLocaleString()} {currencySymbol}
            </span>
          </div>

          {/* Public Landing Link shortcut */}
          <a
            href={`/property/${property.slug}`}
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-3 right-3 p-2 bg-white/90 hover:bg-white text-slate-900 rounded-xl shadow-md transition transform hover:scale-105"
            title={language === 'es' ? 'Ver Landing Pública' : 'View Public Landing'}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Card Body */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug line-clamp-1">
              {property.title}
            </h3>
            <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{property.area}, {property.city} ({property.country})</span>
            </p>
          </div>

          {/* Specs grid */}
          <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5 font-medium">
              <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.builtArea} m²</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <BedDouble className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.bedrooms} {language === 'es' ? 'hab' : 'beds'}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Bath className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.bathrooms} {language === 'es' ? 'baños' : 'baths'}</span>
            </div>
          </div>

          {/* Extras and Performance stats */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              {property.garage && (
                <span className="flex items-center gap-0.5 text-slate-600 dark:text-slate-400" title="Garaje incluido">
                  <Car className="w-3.5 h-3.5" />
                </span>
              )}
              {property.terrace && (
                <span className="flex items-center gap-0.5 text-slate-600 dark:text-slate-400" title="Terraza disponible">
                  <Sun className="w-3.5 h-3.5" />
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1" title="Visitas registradas">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold">{property.viewsCount || 0}</span>
              </span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold" title="Leads captados">
                <Users className="w-3.5 h-3.5" />
                <span>{property.leadsCount || 0}</span>
              </span>
            </div>
          </div>

          {/* Status Selector Dropdown */}
          <div className="pt-1">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              {language === 'es' ? 'Estado Comercial' : 'Commercial Status'}
            </label>
            <select
              value={property.status}
              onChange={(e) => handleStatusChange(e.target.value as PropertyStatus)}
              className="w-full text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="draft">{language === 'es' ? 'Borrador interno' : 'Draft'}</option>
              <option value="ready">{language === 'es' ? 'Listo para publicar' : 'Ready to publish'}</option>
              <option value="published">{language === 'es' ? 'Publicado (Público)' : 'Published'}</option>
              <option value="reserved">{language === 'es' ? 'Reservado / En señal' : 'Reserved'}</option>
              <option value="sold">{language === 'es' ? 'Vendido' : 'Sold'}</option>
              <option value="rented">{language === 'es' ? 'Alquilado' : 'Rented'}</option>
              <option value="archived">{language === 'es' ? 'Archivado' : 'Archived'}</option>
            </select>
          </div>

          {/* Actions toolbar */}
          <div className="pt-2 flex items-center justify-between gap-1.5 border-t border-slate-100 dark:border-slate-800">
            {/* AI Generator Button */}
            <button
              onClick={() => onOpenAIModal && onOpenAIModal(property)}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-sm transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Generar IA' : 'AI Content'}</span>
            </button>

            {/* Share / QR / PDF Modal */}
            <button
              onClick={() => setShowShare(true)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
              title={language === 'es' ? 'Compartir o Exportar' : 'Share or Export'}
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Edit link */}
            <Link
              href={`/app/properties/${property.id}/edit`}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
              title={language === 'es' ? 'Editar' : 'Edit'}
            >
              <Edit3 className="w-4 h-4" />
            </Link>

            {/* Delete button */}
            <button
              onClick={() => {
                if (confirm(language === 'es' ? '¿Eliminar esta propiedad?' : 'Delete this property?')) {
                  deleteProperty(property.id);
                }
              }}
              className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition"
              title={language === 'es' ? 'Eliminar' : 'Delete'}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        property={property}
        isOpen={showShare}
        onClose={() => setShowShare(false)}
      />
    </>
  );
};
