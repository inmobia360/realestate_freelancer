import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Inmobia 360',
    short_name: 'Inmobia 360',
    description: 'Tu agencia inmobiliaria en el bolsillo.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#161E2E',
    icons: [
      { src: '/brand/pwa-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/brand/pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/brand/pwa-192-maskable.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/brand/pwa-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
