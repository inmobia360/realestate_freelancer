'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  PlusCircle, 
  Search, 
  Filter, 
  SlidersHorizontal,
  Sparkles,
  LayoutGrid,
  List,
  Map,
  MapPin,
  Eye,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { PropertyCard } from '@/components/property/PropertyCard';
import { PropertyRegionMap } from '@/components/property/PropertyRegionMap';
import { AIContentModal } from '@/components/content/AIContentModal';
import { Property, PropertyStatus, OperationType } from '@/types';

export default function PropertiesPage() {
  const { properties, language } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | OperationType | PropertyStatus>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [selectedPropertyForAI, setSelectedPropertyForAI] = useState<Property | null>(null);

  const filteredProperties = properties.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.area.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'all') return true;
    if (activeFilter === 'sale' || activeFilter === 'rent' || activeFilter === 'investment') {
      return p.operation === activeFilter;
    }
    return p.status === activeFilter;
  });

  return (
    <>
      <DashboardHeader 
        title={language === 'es' ? 'Gestión de Propiedades' : 'Properties Management'}
        subtitle={language === 'es' ? 'Visualiza tu cartera en cuadrícula, lista o mapa territorial interactivo' : 'Manage listings in grid, list or interactive map view'}
      />

      <div className="p-6 sm:p-8 max-w-[1600px] mx-auto w-full space-y-6">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'es' ? 'Buscar en Madrid, Barcelona, Valencia, Sevilla, Canarias...' : 'Search by title, city or region...'}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle (Grid, List, Map) */}
            <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-xl shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                title="Vista Cajetín"
                className={`p-2 rounded-lg transition cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-orange-700 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                title="Vista Lista"
                className={`p-2 rounded-lg transition cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-orange-700 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                title="Vista Mapa Territorial"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  viewMode === 'map'
                    ? 'bg-[#C2410C] text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Map className="w-4 h-4 text-orange-700" />
                <span>Mapa Región</span>
              </button>
            </div>

            <Link
              href="/app/properties/new"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#C2410C] hover:bg-[#9A3412] text-white rounded-xl text-sm font-semibold shadow-lg shadow-orange-700/20 transition shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{language === 'es' ? 'Nueva Propiedad' : 'New Property'}</span>
            </Link>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { key: 'all', label: language === 'es' ? 'Todas' : 'All' },
            { key: 'published', label: language === 'es' ? 'Publicadas' : 'Published' },
            { key: 'sale', label: language === 'es' ? 'En Venta' : 'For Sale' },
            { key: 'rent', label: language === 'es' ? 'En Alquiler' : 'For Rent' },
            { key: 'investment', label: language === 'es' ? 'Inversión' : 'Investment' },
            { key: 'draft', label: language === 'es' ? 'Borradores' : 'Drafts' },
            { key: 'archived', label: language === 'es' ? 'Archivadas' : 'Archived' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key as typeof activeFilter)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeFilter === f.key
                  ? 'bg-orange-700 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Main Content Area based on ViewMode */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {language === 'es' ? 'No se encontraron propiedades' : 'No properties found'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'es' ? 'Prueba cambiando los filtros o registra una nueva propiedad en cartera.' : 'Try adjusting filters or register a new property.'}
              </p>
            </div>
            <Link
              href="/app/properties/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-700 text-white rounded-xl text-xs font-semibold"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{language === 'es' ? 'Crear Propiedad' : 'Create Property'}</span>
            </Link>
          </div>
        ) : (
          <>
            {/* 1. Map View */}
            {viewMode === 'map' && (
              <PropertyRegionMap
                properties={filteredProperties}
                onOpenAIModal={(p) => setSelectedPropertyForAI(p)}
                language={language}
              />
            )}

            {/* 2. Grid View (Cajetín) */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onOpenAIModal={(p) => setSelectedPropertyForAI(p)}
                  />
                ))}
              </div>
            )}

            {/* 3. List View */}
            {viewMode === 'list' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="py-3.5 px-4">Inmueble</th>
                        <th className="py-3.5 px-4">Ubicación</th>
                        <th className="py-3.5 px-4">Operación</th>
                        <th className="py-3.5 px-4">Precio</th>
                        <th className="py-3.5 px-4">Superficie</th>
                        <th className="py-3.5 px-4">Estado</th>
                        <th className="py-3.5 px-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                      {filteredProperties.map((prop) => (
                        <tr key={prop.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={prop.images[0]}
                                alt={prop.title}
                                className="w-12 h-10 rounded-lg object-cover"
                              />
                              <div>
                                <span className="font-bold text-slate-900 dark:text-white block">{prop.title}</span>
                                <span className="text-[11px] text-slate-400">{prop.bedrooms} Hab · {prop.bathrooms} Baños</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                            <span className="font-semibold text-slate-800 dark:text-slate-200 block">{prop.city}</span>
                            <span className="text-[11px] text-slate-400">{prop.area}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300">
                              {prop.operation === 'sale' ? 'Venta' : prop.operation === 'rent' ? 'Alquiler' : 'Inversión'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                            {prop.price.toLocaleString()} €
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                            {prop.builtArea} m²
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                              {prop.status === 'published' ? 'Publicada' : prop.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedPropertyForAI(prop)}
                                className="p-1.5 rounded-lg bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 hover:bg-orange-100 transition cursor-pointer"
                                title="Generar con IA"
                              >
                                <Sparkles className="w-4 h-4" />
                              </button>
                              <Link
                                href={`/property/${prop.slug}`}
                                target="_blank"
                                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-white transition"
                                title="Ver Landing Pública"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              <Link
                                href={`/app/properties/${prop.id}/edit`}
                                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-white transition"
                                title="Editar"
                              >
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* AI Content Modal */}
      {selectedPropertyForAI && (
        <AIContentModal
          property={selectedPropertyForAI}
          isOpen={!!selectedPropertyForAI}
          onClose={() => setSelectedPropertyForAI(null)}
        />
      )}
    </>
  );
}

