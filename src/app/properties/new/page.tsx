'use client';

import React from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { PropertyForm } from '@/components/property/PropertyForm';
import { PanelLayout } from '@/components/PanelLayout';
import { useApp } from '@/context/AppContext';

function NewPropertyContent() {
  const { language } = useApp();

  return (
    <>
      <DashboardHeader 
        title={language === 'es' ? 'Crear Nueva Propiedad' : 'Create New Property'}
        subtitle={language === 'es' ? 'Completa la ficha técnica para publicar tu landing y activar el generador IA' : 'Fill in the technical details to publish your landing and enable AI content'}
      />

      <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full">
        <PropertyForm isEditing={false} />
      </div>
    </>
  );
}

export default function NewPropertyPage() {
  return (
    <PanelLayout>
      <NewPropertyContent />
    </PanelLayout>
  );
}
