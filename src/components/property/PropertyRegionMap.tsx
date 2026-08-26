'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Building2, 
  ExternalLink, 
  Sparkles, 
  Compass, 
  Layers, 
  Maximize2, 
  TrendingUp, 
  Euro, 
  CheckCircle2, 
  Navigation,
  ArrowRight,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { Property } from '@/types';

interface PropertyRegionMapProps {
  properties: Property[];
  onOpenAIModal?: (property: Property) => void;
  language?: 'es' | 'en';
}

interface RegionHotspot {
  id: string;
  name: string;
  count: number;
  avgCapRate: string;
  avgPriceM2: string;
  topCity: string;
  xPercent: number;
  yPercent: number;
}

export const PropertyRegionMap: React.FC<PropertyRegionMapProps> = ({
  properties,
  onOpenAIModal,
  language = 'es'
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [activePropertyId, setActivePropertyId] = useState<string>(properties[0]?.id || '');
  const [mapStyle, setMapStyle] = useState<'google' | 'ai-dark' | 'heatmap'>('google');

  const regions: RegionHotspot[] = [
    {
      id: 'Madrid',
      name: 'Madrid (Centro & Salamanca)',
      count: properties.filter(p => p.city.includes('Madrid') || p.region === 'Madrid').length,
      avgCapRate: '7.8%',
      avgPriceM2: '5.860 €/m²',
      topCity: 'Madrid',
      xPercent: 50,
      yPercent: 44
    },
    {
      id: 'Barcelona',
      name: 'Barcelona (Cataluña & Eixample)',
      count: properties.filter(p => p.city.includes('Barcelona') || p.region === 'Barcelona').length,
      avgCapRate: '6.9%',
      avgPriceM2: '5.130 €/m²',
      topCity: 'Barcelona',
      xPercent: 82,
      yPercent: 28
    },
    {
      id: 'Valencia',
      name: 'Valencia (Levante & Costa)',
      count: properties.filter(p => p.city.includes('Valencia') || p.region === 'Valencia').length,
      avgCapRate: '8.4%',
      avgPriceM2: '3.920 €/m²',
      topCity: 'Valencia',
      xPercent: 72,
      yPercent: 52
    },
    {
      id: 'Sevilla',
      name: 'Sevilla (Andalucía)',
      count: properties.filter(p => p.city.includes('Sevilla') || p.region === 'Sevilla').length,
      avgCapRate: '8.1%',
      avgPriceM2: '2.810 €/m²',
      topCity: 'Sevilla',
      xPercent: 32,
      yPercent: 78
    },
    {
      id: 'Canarias',
      name: 'Canarias (Tenerife & Adeje)',
      count: properties.filter(p => p.city.includes('Canarias') || p.city.includes('Tenerife') || p.region === 'Canarias').length,
      avgCapRate: '9.2%',
      avgPriceM2: '4.000 €/m²',
      topCity: 'Adeje (Tenerife)',
      xPercent: 18,
      yPercent: 90
    }
  ];

  const displayedProperties = selectedRegion === 'all' 
    ? properties 
    : properties.filter(p => p.region === selectedRegion || p.city.includes(selectedRegion));

  const activeProperty = properties.find(p => p.id === activePropertyId) || displayedProperties[0] || properties[0];

  const getPinPosition = (p: Property) => {
    if (p.region === 'Madrid' || p.city.includes('Madrid')) return { x: 50, y: 44 };
    if (p.region === 'Barcelona' || p.city.includes('Barcelona')) return { x: 82, y: 28 };
    if (p.region === 'Valencia' || p.city.includes('Valencia')) return { x: 72, y: 52 };
    if (p.region === 'Sevilla' || p.city.includes('Sevilla')) return { x: 32, y: 78 };
    if (p.region === 'Canarias' || p.city.includes('Canarias') || p.city.includes('Tenerife')) return { x: 18, y: 90 };
    return { x: 50, y: 50 };
  };

  const getGoogleMapsConfig = () => {
    if (selectedRegion === 'all') {
      return {
        query: encodeURIComponent('España, Madrid, Barcelona, Valencia, Sevilla, Canarias'),
        zoom: 6,
        directQuery: encodeURIComponent('Inmuebles en Madrid, Barcelona, Valencia, Sevilla, Canarias España')
      };
    }

    if (selectedRegion === 'Madrid') {
      return { query: encodeURIComponent('Madrid, España'), zoom: 12, directQuery: encodeURIComponent('Barrio Salamanca, Madrid, España') };
    }
    if (selectedRegion === 'Barcelona') {
      return { query: encodeURIComponent('Barcelona, España'), zoom: 12, directQuery: encodeURIComponent('Eixample, Barcelona, España') };
    }
    if (selectedRegion === 'Valencia') {
      return { query: encodeURIComponent('Valencia, España'), zoom: 13, directQuery: encodeURIComponent('Valencia, España') };
    }
    if (selectedRegion === 'Sevilla') {
      return { query: encodeURIComponent('Sevilla, España'), zoom: 13, directQuery: encodeURIComponent('Sevilla, España') };
    }
    if (selectedRegion === 'Canarias') {
      return { query: encodeURIComponent('Costa Adeje, Tenerife, Canarias, España'), zoom: 11, directQuery: encodeURIComponent('Costa Adeje, Tenerife, España') };
    }

    if (activeProperty) {
      const coords = activeProperty.coordinates;
      if (coords && coords.lat && coords.lng) {
        return { query: `${coords.lat},${coords.lng}`, zoom: 16, directQuery: `${coords.lat},${coords.lng}` };
      }
      return {
        query: encodeURIComponent(`${activeProperty.address}, ${activeProperty.city}, España`),
        zoom: 16,
        directQuery: encodeURIComponent(`${activeProperty.address}, ${activeProperty.city}, España`)
      };
    }

    return { query: encodeURIComponent('España'), zoom: 6, directQuery: encodeURIComponent('España') };
  };

  const mapConfig = getGoogleMapsConfig();
  const googleMapsUrl = `https://maps.google.com/maps?q=${mapConfig.query}&t=m&z=${mapConfig.zoom}&output=embed&iwloc=near`;
  const googleMapsDirectLink = `https://www.google.com/maps/search/?api=1&query=${mapConfig.directQuery}`;

  return (
    <div className="w-full bg-white dark:bg-[#0a0f24] border border-slate-200 dark:border-indigo-500/25 rounded-3xl p-5 sm:p-7 shadow-xl dark:shadow-2xl space-y-6">
      
      {/* Top Header & View Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-indigo-500/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-violet-600/30">
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>{language === 'es' ? 'Mapa Territorial de Inmuebles' : 'Territorial Property Map'}</span>
              <span className="px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300 border border-violet-200 dark:border-violet-500/30">
                IA Geolocation
              </span>
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'es' 
              ? 'Distribución geográfica de tus exclusivas en Madrid, Barcelona, Valencia, Sevilla y Canarias.' 
              : 'Geographic distribution of your properties across Madrid, Barcelona, Valencia, Seville and Canary Islands.'}
          </p>
        </div>

        {/* Region Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedRegion('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              selectedRegion === 'all'
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-lg shadow-violet-600/25'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800/80 dark:hover:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60'
            }`}
          >
            {language === 'es' ? 'Todas las Zonas' : 'All Zones'} ({properties.length})
          </button>
          {regions.map((reg) => (
            <button
              key={reg.id}
              onClick={() => setSelectedRegion(reg.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                selectedRegion === reg.id
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-lg shadow-violet-600/25'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800/80 dark:hover:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60'
              }`}
            >
              {reg.name.split(' ')[0]} ({reg.count})
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Canvas and Side Property Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: Vector Map Canvas */}
        <div className="lg:col-span-8 bg-slate-50 dark:bg-[#060814] border border-slate-200 dark:border-indigo-500/30 rounded-2xl relative min-h-[420px] sm:min-h-[480px] p-6 overflow-hidden flex flex-col justify-between shadow-inner">
          
          {/* Cyber Grid Lines & Ambient Glow */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:28px_28px]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-600/10 dark:bg-violet-600/15 blur-[100px] rounded-full pointer-events-none" />

          {/* Top Map HUD Status */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 backdrop-blur-md text-[11px] text-slate-700 dark:text-slate-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-400 animate-pulse" />
              <span>RADAR DE ACTIVOS: {displayedProperties.length} UBICACIONES LOCALIZADAS</span>
            </div>

            <div className="flex items-center gap-1.5 bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 p-1 rounded-xl text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              <button 
                onClick={() => setMapStyle('google')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${mapStyle === 'google' ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold' : 'hover:text-black dark:hover:text-white'}`}
              >
                <Compass className="w-3 h-3 text-cyan-300" />
                <span>Google Maps</span>
              </button>
              <button 
                onClick={() => setMapStyle('ai-dark')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${mapStyle === 'ai-dark' ? 'bg-violet-600 text-white font-bold' : 'hover:text-black dark:hover:text-white'}`}
              >
                Vector IA
              </button>
              <button 
                onClick={() => setMapStyle('heatmap')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${mapStyle === 'heatmap' ? 'bg-violet-600 text-white font-bold' : 'hover:text-black dark:hover:text-white'}`}
              >
                Cap Rate
              </button>
            </div>
          </div>

          {/* Map Body: Google Maps Embed OR Vector Map */}
          {mapStyle === 'google' ? (
            <div className="relative z-20 w-full h-[320px] rounded-xl overflow-hidden border border-slate-300 dark:border-indigo-500/40 my-3 shadow-xl">
              <iframe
                title="Google Maps Property Geolocation"
                src={googleMapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              <div className="absolute top-2 right-2 z-30">
                <a
                  href={googleMapsDirectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-xl text-[11px] font-bold border border-slate-700 hover:bg-slate-800 transition shadow-lg"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Abrir en Google Maps</span>
                </a>
              </div>
            </div>
          ) : (
            <>
              {/* Abstract Stylized Spain & Island SVG */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 dark:opacity-35">
                <svg viewBox="0 0 800 600" className="w-full h-full text-indigo-400 dark:text-indigo-500 fill-indigo-100 dark:fill-indigo-950/20 stroke-indigo-400 dark:stroke-indigo-500/40 stroke-[1.5]">
                  <polygon points="180,180 280,140 450,130 580,180 680,220 720,290 640,360 600,450 480,510 320,530 220,490 160,380 140,260" />
                  <circle cx="680" cy="320" r="14" />
                  <circle cx="710" cy="300" r="10" />
                  <polygon points="140,490 200,480 210,530 150,540" />
                </svg>
              </div>

              {/* Interactive Property Pins on Map */}
              <div className="relative z-20 w-full h-full min-h-[300px]">
                {properties.map((p) => {
                  const pos = getPinPosition(p);
                  const isSelected = activeProperty?.id === p.id;
                  const isRegionMatch = selectedRegion === 'all' || p.region === selectedRegion || p.city.includes(selectedRegion);

                  return (
                    <div
                      key={p.id}
                      onClick={() => setActivePropertyId(p.id)}
                      style={{
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      className={`absolute transition-all duration-300 cursor-pointer ${
                        isRegionMatch ? 'opacity-100 scale-100' : 'opacity-25 scale-75'
                      }`}
                    >
                      {/* Radar Pulse on Selected Pin */}
                      {isSelected && (
                        <span className="absolute -inset-3 rounded-full bg-violet-500/40 animate-ping pointer-events-none" />
                      )}

                      {/* Pin Badge */}
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black shadow-lg transition-transform hover:scale-110 border ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white border-white/60 shadow-violet-600/50 scale-110 z-30'
                          : 'bg-white dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-indigo-500/40 hover:border-violet-400 z-10'
                      }`}>
                        <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-300' : 'text-blue-600 dark:text-violet-400'}`} />
                        <span>{p.city.split(' ')[0]}</span>
                        <span className="text-[10px] font-mono text-blue-600 dark:text-cyan-300">
                          {p.price > 10000 ? `${Math.round(p.price / 1000)}k€` : `${p.price}€`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Bottom HUD: Regional Metrics */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200 dark:border-indigo-500/20 bg-white/80 dark:bg-slate-950/70 -mx-6 -mb-6 p-4 rounded-b-2xl backdrop-blur-md text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-semibold block">Región Seleccionada:</span>
              <span className="text-slate-900 dark:text-white font-bold">{selectedRegion === 'all' ? 'Nacional (España)' : selectedRegion}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-semibold block">Cap Rate Medio:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">8.1% anual</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-semibold block">Volumen Cartera:</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">€3.88M</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 font-semibold block">Leads Registrados:</span>
              <span className="text-violet-600 dark:text-violet-400 font-bold">45 compradores</span>
            </div>
          </div>

        </div>

        {/* Right: Selected Property Inspector Card */}
        <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-indigo-500/30 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          
          {activeProperty ? (
            <div className="space-y-4">
              
              {/* Property Image Header */}
              <div className="relative h-44 rounded-xl overflow-hidden group">
                <img
                  src={activeProperty.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80'}
                  alt={activeProperty.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-cyan-300 border border-cyan-500/30">
                  {activeProperty.operation === 'sale' ? 'En Venta' : activeProperty.operation === 'rent' ? 'En Alquiler' : 'Inversión'}
                </span>

                <div className="absolute bottom-2.5 left-3 right-3 flex items-baseline justify-between">
                  <span className="text-xl font-black text-white">
                    {activeProperty.price.toLocaleString()} €
                  </span>
                  <span className="text-xs font-bold text-violet-200">
                    {activeProperty.builtArea} m²
                  </span>
                </div>
              </div>

              {/* Details & Copy */}
              <div className="space-y-2 text-left">
                <span className="text-[11px] font-extrabold uppercase text-violet-600 dark:text-violet-400 tracking-wider">
                  {activeProperty.city} · {activeProperty.area}
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                  {activeProperty.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {activeProperty.description}
                </p>
              </div>

              {/* Key Quick Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Dormitorios</span>
                  <span className="font-bold text-slate-900 dark:text-white">{activeProperty.bedrooms} Hab</span>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Baños</span>
                  <span className="font-bold text-slate-900 dark:text-white">{activeProperty.bathrooms} Baños</span>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Garaje</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{activeProperty.garage ? 'Incluido' : 'No'}</span>
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-16 text-slate-500">
              <Building2 className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-xs">Selecciona un inmueble en el mapa</p>
            </div>
          )}

          {/* Action Buttons */}
          {activeProperty && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              {onOpenAIModal && (
                <button
                  onClick={() => onOpenAIModal(activeProperty)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-xs font-bold shadow-lg shadow-violet-600/30 transition cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>Generar Marketing con IA</span>
                </button>
              )}

              <div className="grid grid-cols-2 gap-2">
                <Link
                  href={`/property/${activeProperty.slug}`}
                  target="_blank"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition text-center"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>Ver Landing</span>
                </Link>

                <Link
                  href={`/app/properties/${activeProperty.id}/edit`}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition text-center"
                >
                  <span>Editar Ficha</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};