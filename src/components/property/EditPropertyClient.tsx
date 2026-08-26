'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from '@/components/DashboardHeader';
import { PropertyForm } from '@/components/property/PropertyForm';
import { PanelLayout } from '@/components/PanelLayout';
import { useApp } from '@/context/AppContext';
import { Building2 } from 'lucide-react';

function EditPropertyInner({ id }: { id: string }) {
  const router = useRouter();
  const { properties, language } = useApp();

  const property = properties.find(p => p.id === id || p.slug === id);

  if (!property) {
    return (
      <>
        <DashboardHeader title={language === 'es' ? 'Propiedad no encontrada' : 'Property not found'} />
        <div className="p-8 max-w-lg mx-auto text-center space-y-4">
          <Building2 className="w-12 h-12 text-[#849089] mx-auto" />
          <p className="text-sm text-[#6e7b75]">
            {language === 'es' ? 'No se pudo localizar el inmueble solicitado.' : 'The requested property could not be found.'}
          </p>
          <button
            onClick={() => router.push('/properties')}
            className="px-4 py-2 bg-[#df5433] text-white rounded-xl text-xs font-bold"
          >
            {language === 'es' ? 'Volver a Propiedades' : 'Back to Properties'}
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <DashboardHeader 
        title={language === 'es' ? `Editar: ${property.title}` : `Edit: ${property.title}`}
        subtitle={language === 'es' ? 'Modifica los campos del inmueble y actualiza en tiempo real su landing pública' : 'Update property parameters and sync your public landing in real time'}
      />

      <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full">
        <PropertyForm initialData={property} isEditing={true} />
      </div>
    </>
  );
}

export function EditPropertyClient({ id }: { id: string }) {
  return (
    <PanelLayout>
      <EditPropertyInner id={id} />
    </PanelLayout>
  );
}
