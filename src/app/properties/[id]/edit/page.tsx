import React from 'react';
import { EditPropertyClient } from '@/components/property/EditPropertyClient';
import { INITIAL_PROPERTIES } from '@/lib/mockData';

export function generateStaticParams() {
  return INITIAL_PROPERTIES.map((property) => ({
    id: property.id,
  }));
}

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditPropertyClient id={id} />;
}
