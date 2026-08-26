import React from 'react';
import { PropertyLandingClient } from '@/components/property/PropertyLandingClient';
import { INITIAL_PROPERTIES } from '@/lib/mockData';

export function generateStaticParams() {
  return INITIAL_PROPERTIES.map((property) => ({
    slug: property.slug,
  }));
}

export default async function PublicPropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PropertyLandingClient slug={slug} />;
}
