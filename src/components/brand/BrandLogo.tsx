import React from 'react';
import Link from 'next/link';

export interface BrandLogoProps {
  variant?: 'full' | 'compact' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  href?: string;
}

const dimensions = {
  sm: { icon: 'h-8 w-8', logo: 'w-28' },
  md: { icon: 'h-10 w-10', logo: 'w-36 sm:w-40' },
  lg: { icon: 'h-12 w-12', logo: 'w-44 sm:w-48' },
  xl: { icon: 'h-16 w-16', logo: 'w-56 sm:w-60' },
};

/** Inmobia 360 logo. The primary lockup intentionally has no descriptor. */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  href = '/',
}) => {
  const { icon, logo } = dimensions[size];
  const content = (
    <span className={`inline-flex shrink-0 select-none ${className}`}>
      {variant === 'icon' ? (
        <>
          <img src="/brand/digital/inmobia360-isotipo-transparent.png" alt="" aria-hidden="true" className={`${icon} dark:hidden`} width="64" height="64" />
          <img src="/brand/digital/inmobia360-isotipo-transparent-dark.png" alt="" aria-hidden="true" className={`${icon} hidden dark:block`} width="64" height="64" />
        </>
      ) : (
        <>
          <img src="/brand/digital/inmobia360-logo-transparent.png" alt="Inmobia 360" className={`${logo} h-auto dark:hidden`} width="1440" height="400" />
          <img src="/brand/digital/inmobia360-logo-transparent-dark.png" alt="Inmobia 360" className={`${logo} hidden h-auto dark:block`} width="1440" height="400" />
        </>
      )}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label="Inmobia 360 — Inicio" className="inline-flex rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C2410C]">
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
