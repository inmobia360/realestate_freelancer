import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export interface BrandLogoProps {
  variant?: 'full' | 'compact' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  href?: string;
}

const dimensions = {
  sm: { icon: 'w-8 h-8', wordmark: 'text-lg' },
  md: { icon: 'w-10 h-10', wordmark: 'text-xl sm:text-2xl' },
  lg: { icon: 'w-12 h-12', wordmark: 'text-2xl sm:text-3xl' },
  xl: { icon: 'w-16 h-16', wordmark: 'text-3xl sm:text-4xl' },
};

/** Inmobia 360 logo. The primary lockup intentionally has no descriptor. */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  href = '/',
}) => {
  const { icon, wordmark } = dimensions[size];
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setIsDark(root.classList.contains('dark'));
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  const content = (
    <span className={`inline-flex items-center gap-3 select-none ${className}`}>
      <img
        src="/brand/inmobia360-isotipo-original.png"
        alt=""
        aria-hidden="true"
        className={`${icon} shrink-0 rounded-full object-contain ${isDark ? 'bg-white p-0.5' : ''}`}
        width="64"
        height="64"
      />
      {variant !== 'icon' && (
        <span className={`inline-flex items-baseline whitespace-nowrap font-extrabold leading-none ${wordmark}`}>
          <span className={`${isDark ? 'text-white' : 'text-[#161E2E]'} tracking-[-0.055em]`}>Inmobia</span>
          <span className="ml-[0.18em] text-[#FF8A00] tracking-[-0.04em]">360</span>
        </span>
      )}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label="Inmobia 360 — Inicio" className="inline-flex rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF7900]">
      {content}
    </Link>
  );
};

export const LogoFull: React.FC<Omit<BrandLogoProps, 'variant'>> = (props) => (
  <BrandLogo variant="full" {...props} />
);

export const LogoCompact: React.FC<Omit<BrandLogoProps, 'variant'>> = (props) => (
  <BrandLogo variant="compact" {...props} />
);

export const LogoIcon: React.FC<Omit<BrandLogoProps, 'variant'>> = (props) => (
  <BrandLogo variant="icon" {...props} />
);

export default BrandLogo;
