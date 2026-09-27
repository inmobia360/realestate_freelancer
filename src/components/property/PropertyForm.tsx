'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Save, 
  Check, 
  ArrowLeft,
  Info
} from 'lucide-react';
import { Property, PropertyType, OperationType, PropertyStatus, PropertyCondition } from '@/types';
import { AIWritingAdvisor } from '@/components/ui/AIWritingAdvisor';
import { useApp } from '@/context/AppContext';

interface PropertyFormProps {
  initialData?: Property;
  isEditing?: boolean;
}

export const PropertyForm: React.FC<PropertyFormProps> = ({ initialData, isEditing = false }) => {
  const router = useRouter();
  const { addProperty, updateProperty, user, language } = useApp();

  const [title, setTitle] = useState(initialData?.title || '');
  const [propertyType, setPropertyType] = useState<PropertyType>(initialData?.propertyType || 'apartment');
  const [operation, setOperation] = useState<OperationType>(initialData?.operation || 'sale');
  const [country, setCountry] = useState(initialData?.country || 'Spain');
  const [city, setCity] = useState(initialData?.city || 'Madrid');
  const [area, setArea] = useState(initialData?.area || '');
  const [address, setAddress] = useState(initialData?.address || '');
  const [price, setPrice] = useState<number>(initialData?.price || 250000);
  const [currency, setCurrency] = useState<'EUR' | 'USD' | 'GBP'>(initialData?.currency || user.currency || 'EUR');
  const [builtArea, setBuiltArea] = useState<number>(initialData?.builtArea || 95);
  const [bedrooms, setBedrooms] = useState<number>(initialData?.bedrooms || 3);
  const [bathrooms, setBathrooms] = useState<number>(initialData?.bathrooms || 2);
  const [garage, setGarage] = useState<boolean>(initialData?.garage || false);
  const [terrace, setTerrace] = useState<boolean>(initialData?.terrace || false);
  const [condition, setCondition] = useState<PropertyCondition>(initialData?.condition || 'excellent');
  const [description, setDescription] = useState(initialData?.description || '');
  const [targetAudience, setTargetAudience] = useState<Property['targetAudience']>(initialData?.targetAudience || 'families');
  const [contentLanguage, setContentLanguage] = useState<'es' | 'en' | 'both'>(initialData?.contentLanguage || 'es');
  const [status, setStatus] = useState<PropertyStatus>(initialData?.status || 'published');
  
  const [features, setFeatures] = useState<string[]>(
    initialData?.features || ['Ascensor cota cero', 'Calefacción individual', 'Cocina amueblada']
  );
  const [newFeatureInput, setNewFeatureInput] = useState('');

  const [images, setImages] = useState<string[]>(
    initialData?.images || [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80'
    ]
  );
  const [newImageUrl, setNewImageUrl] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAddFeature = () => {
    if (newFeatureInput.trim() && !features.includes(newFeatureInput.trim())) {
      setFeatures([...features, newFeatureInput.trim()]);
      setNewFeatureInput('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleAddImage = () => {
    if (newImageUrl.trim() && !images.includes(newImageUrl.trim())) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const propertyPayload = {
      title,
      slug: initialData?.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      propertyType,
      operation,
      country,
      city,
      area,
      address,
      price: Number(price),
      currency,
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      builtArea: Number(builtArea),
      garage,
      terrace,
      condition,
      description,
      features,
      targetAudience,
      contentLanguage,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80'],
      status,
      published: status === 'published',
    };

    if (isEditing && initialData) {
      updateProperty(initialData.id, propertyPayload);
    } else {
      addProperty(propertyPayload);
    }

    setTimeout(() => {
      setSaving(false);
      router.push('/app/properties');
    }, 400);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'es' ? 'Volver al catálogo' : 'Back to catalog'}</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-orange-700 hover:bg-orange-500 text-white rounded-xl text-sm font-semibold shadow-md shadow-orange-700/20 transition disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? (language === 'es' ? 'Guardando...' : 'Saving...') : isEditing ? (language === 'es' ? 'Guardar Cambios' : 'Save Changes') : (language === 'es' ? 'Crear y Publicar' : 'Create & Publish')}</span>
          </button>
        </div>
      </div>

      {/* 1. Main Info */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-orange-700" />
            <span>{language === 'es' ? '1. Datos Principales del Inmueble' : '1. Core Property Information'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'es' ? 'Información básica para identificación y ficha comercial.' : 'Essential data for listing identification.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {language === 'es' ? 'Título de la Propiedad *' : 'Property Title *'}
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Elegante Piso Reformado con Garaje en Centro"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <AIWritingAdvisor
              text={title}
              onApplyCorrection={(fixed) => setTitle(fixed)}
              language={language}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {language === 'es' ? 'Estado Comercial *' : 'Commercial Status *'}
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as PropertyStatus)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="draft">{language === 'es' ? 'Borrador interno' : 'Internal Draft'}</option>
              <option value="ready">{language === 'es' ? 'Listo para publicar' : 'Ready to Publish'}</option>
              <option value="published">{language === 'es' ? 'Publicado en portales' : 'Published Live'}</option>
              <option value="reserved">{language === 'es' ? 'Reservado / En señal' : 'Reserved'}</option>
              <option value="sold">{language === 'es' ? 'Vendido' : 'Sold'}</option>
              <option value="rented">{language === 'es' ? 'Alquilado' : 'Rented'}</option>
              <option value="archived">{language === 'es' ? 'Archivado' : 'Archived'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {language === 'es' ? 'Tipo de Propiedad *' : 'Property Type *'}
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value as PropertyType)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="apartment">{language === 'es' ? 'Piso / Apartamento' : 'Apartment / Flat'}</option>
              <option value="house">{language === 'es' ? 'Casa / Chalet unifamiliar' : 'House / Detached Home'}</option>
              <option value="country_house">{language === 'es' ? 'Finca rústica / Campo' : 'Country House'}</option>
              <option value="villa">{language === 'es' ? 'Villa de lujo' : 'Luxury Villa'}</option>
              <option value="penthouse">{language === 'es' ? 'Ático dúplex' : 'Penthouse'}</option>
              <option value="commercial">{language === 'es' ? 'Local comercial' : 'Commercial Unit'}</option>
              <option value="office">{language === 'es' ? 'Oficina' : 'Office Space'}</option>
              <option value="land">{language === 'es' ? 'Terreno / Parcela' : 'Plot / Land'}</option>
              <option value="building">{language === 'es' ? 'Edificio en rentabilidad' : 'Full Building'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {language === 'es' ? 'Operación *' : 'Operation *'}
            </label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value as OperationType)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="sale">{language === 'es' ? 'Venta' : 'Sale'}</option>
              <option value="rent">{language === 'es' ? 'Alquiler' : 'Rent'}</option>
              <option value="investment">{language === 'es' ? 'Inversión y Rentabilidad' : 'Investment'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {language === 'es' ? 'Estado de Conservación *' : 'Condition *'}
            </label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value as PropertyCondition)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="new_construction">{language === 'es' ? 'Obra nueva' : 'New Construction'}</option>
              <option value="excellent">{language === 'es' ? 'Excelente estado' : 'Excellent Condition'}</option>
              <option value="good">{language === 'es' ? 'Buen estado' : 'Good Condition'}</option>
              <option value="reformed">{language === 'es' ? 'Reformado recientemente' : 'Renovated'}</option>
              <option value="to_reform">{language === 'es' ? 'A reformar / Oportunidad' : 'To Renovate'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Location & Economics */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-700" />
            <span>{language === 'es' ? '2. Ubicación y Precio' : '2. Location & Price'}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {language === 'es' ? 'País *' : 'Country *'}
            </label>
            <input
              type="text"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {language === 'es' ? 'Ciudad *' : 'City *'}
            </label>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ej: Madrid, Barcelona, Valencia, Sevilla, Canarias"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {language === 'es' ? 'Zona / Barrio *' : 'Area / Neighborhood *'}
            </label>
            <input
              type="text"
              required
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Ej: Salamanca, Eixample, Santa Cruz, Malvarrosa"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {language === 'es' ? 'Dirección (Opcional)' : 'Address (Optional)'}
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Calle y número"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {language === 'es' ? 'Precio *' : 'Price *'}
            </label>
            <div className="relative">
              <input
                type="number"
                required
                min={0}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full pl-3.5 pr-12 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-base focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
              <span className="absolute right-3.5 top-2.5 font-bold text-slate-400">
                {currency === 'EUR' ? '€' : currency === 'USD' ? '$' : '£'}
              </span>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {language === 'es' ? 'Moneda *' : 'Currency *'}
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as 'EUR' | 'USD' | 'GBP')}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="EUR">EUR (€) - Euro</option>
              <option value="USD">USD ($) - Dólar USA</option>
              <option value="GBP">GBP (£) - Libra Esterlina</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Physical Specs */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-orange-700" />
            <span>{language === 'es' ? '3. Dimensiones y Distribución' : '3. Dimensions & Layout'}</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {language === 'es' ? 'Superficie Construida (m²) *' : 'Built Area (m²) *'}
            </label>
            <input
              type="number"
              required
              min={1}
              value={builtArea}
              onChange={(e) => setBuiltArea(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {language === 'es' ? 'Habitaciones *' : 'Bedrooms *'}
            </label>
            <input
              type="number"
              required
              min={0}
              value={bedrooms}
              onChange={(e) => setBedrooms(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {language === 'es' ? 'Baños *' : 'Bathrooms *'}
            </label>
            <input
              type="number"
              required
              min={0}
              value={bathrooms}
              onChange={(e) => setBathrooms(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3 pt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={garage}
                onChange={(e) => setGarage(e.target.checked)}
                className="w-4 h-4 text-orange-700 rounded focus:ring-orange-500"
              />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {language === 'es' ? '¿Garaje?' : 'Garage?'}
              </span>
            </label>
          </div>

          <div className="flex items-center gap-3 pt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={terrace}
                onChange={(e) => setTerrace(e.target.checked)}
                className="w-4 h-4 text-orange-700 rounded focus:ring-orange-500"
              />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {language === 'es' ? '¿Terraza?' : 'Terrace?'}
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* 4. Features & Description */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-700" />
            <span>{language === 'es' ? '4. Características y Descripción Libre' : '4. Features & Free Description'}</span>
          </h2>
          <div className="mt-2 p-3 bg-orange-50 dark:bg-orange-950/30 rounded-xl border border-orange-200 dark:border-orange-700 flex items-start gap-2">
            <Info className="w-4 h-4 text-orange-700 shrink-0 mt-0.5" />
            <p className="text-xs text-orange-700 dark:text-orange-300">
              <strong>Regla IA:</strong> El generador automático utilizará únicamente estos datos verificados. Nunca inventará precios, habitaciones ni características no indicadas aquí.
            </p>
          </div>
        </div>

        {/* Features Tag Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            {language === 'es' ? 'Características Destacadas' : 'Key Highlights / Features'}
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newFeatureInput}
              onChange={(e) => setNewFeatureInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeature(); } }}
              placeholder="Ej: Calefacción por aerotermia, Vistas al mar, Suelo radiante..."
              className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'es' ? 'Añadir' : 'Add'}</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {features.map((feat, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium"
              >
                <span>{feat}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(idx)}
                  className="text-slate-400 hover:text-rose-500 transition"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Free Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            {language === 'es' ? 'Descripción Libre del Agente *' : 'Agent Description *'}
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe los puntos fuertes del inmueble, luminosidad, reforma, entorno, transporte..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none leading-relaxed"
          />
          <AIWritingAdvisor
            text={description}
            onApplyCorrection={(fixed) => setDescription(fixed)}
            language={language}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {language === 'es' ? 'Público Objetivo' : 'Target Audience'}
            </label>
            <select
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value as Property['targetAudience'])}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="families">{language === 'es' ? 'Familias / Residencial' : 'Families / Residential'}</option>
              <option value="investors">{language === 'es' ? 'Inversores (High Yield / Rentabilidad)' : 'Investors (High Yield)'}</option>
              <option value="international_buyers">{language === 'es' ? 'Compradores Internacionales' : 'International Buyers'}</option>
              <option value="students">{language === 'es' ? 'Estudiantes / Alquiler de temporada' : 'Students / Short Term'}</option>
              <option value="first_time_buyers">{language === 'es' ? 'Jóvenes / Primeros compradores' : 'First-time Buyers'}</option>
              <option value="retirees">{language === 'es' ? 'Jubilados / Segunda residencia' : 'Retirees / Vacation Home'}</option>
              <option value="general">{language === 'es' ? 'Público General' : 'General Audience'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {language === 'es' ? 'Idioma del Contenido' : 'Content Language'}
            </label>
            <select
              value={contentLanguage}
              onChange={(e) => setContentLanguage(e.target.value as 'es' | 'en' | 'both')}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="es">Español (ES)</option>
              <option value="en">Inglés (EN)</option>
              <option value="both">Bilingüe (ES + EN)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 5. Photographs */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-orange-700" />
            <span>{language === 'es' ? '5. Fotografías del Inmueble' : '5. Property Photos'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'es' ? 'Añade URLs de imágenes de alta resolución (Unsplash o almacenamiento propio).' : 'Add high-res image URLs.'}
          </p>
        </div>

        <div className="flex gap-2">
          <input
            type="url"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddImage(); } }}
            placeholder="https://images.unsplash.com/photo-..."
            className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddImage}
            className="px-4 py-2 bg-[#111A31] hover:bg-[#1A2740] text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'es' ? 'Añadir Foto' : 'Add Photo'}</span>
          </button>
        </div>

        {/* Gallery Preview Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 group">
              <img src={img} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition"
                title="Eliminar foto"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              {idx === 0 && (
                <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 text-white text-[10px] font-bold rounded">
                  Portada Principal
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button Bar */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          {language === 'es' ? 'Cancelar' : 'Cancel'}
        </button>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-8 py-2.5 bg-orange-700 hover:bg-orange-500 text-white rounded-xl text-sm font-semibold shadow-md shadow-orange-700/20 transition disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? (language === 'es' ? 'Guardando...' : 'Saving...') : isEditing ? (language === 'es' ? 'Guardar Cambios' : 'Save Changes') : (language === 'es' ? 'Crear Propiedad' : 'Create Property')}</span>
        </button>
      </div>
    </form>
  );
};
