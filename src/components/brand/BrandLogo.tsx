'use client';

import React from 'react';
import Link from 'next/link';

export interface BrandLogoProps {
  variant?: 'full' | 'compact' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  href?: string;
  showSubtitle?: boolean;
  subtitleText?: string;
}

/**
 * RealEstate Connect Vector Isotype
 * House with upward growth arrow powered by Brand Gradient (#0066FF -> #7B2CBF)
 */
export const BrandIcon: React.FC<{ className?: string; size?: number | string; idPrefix?: string }> = ({
  className = 'w-10 h-10',
  size,
  idPrefix = 'rc'
}) => {
  const gradientId = `${idPrefix}-brandGradient`;
  const glowId = `${idPrefix}-brandGlow`;

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      style={size ? { width: size, height: size } : undefined}
      role="img"
      aria-label="RealEstate Connect Logo Isotype"
    >
      <title>RealEstate Connect</title>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0066FF" />
          <stop offset="100%" stopColor="#7B2CBF" />
        </linearGradient>
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#7B2CBF" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter={`url(#${glowId})`}>
        {/* Chimney on Left Roof */}
        <path
          d="M20 25.5V36.5L28 30.5V25.5C28 24.67 27.33 24 26.5 24H21.5C20.67 24 20 24.67 20 25.5Z"
          fill={`url(#${gradientId})`}
        />

        {/* House Roof & Outer Wall Structure */}
        {/* Left Roof Eaves */}
        <path
          d="M10 49L41.2 24.8C42.8 23.5 45.2 23.5 46.8 24.8L72 44.5L68 49.5L44 30.8L15 53.2L10 49Z"
          fill={`url(#${gradientId})`}
        />

        {/* Left Wall & Base */}
        <path
          d="M18 48.5V79C18 84 22 88 27 88H73C78 88 82 84 82 79V62H76V79C76 80.7 74.7 82 73 82H27C25.3 82 24 80.7 24 79V53.2L18 48.5Z"
          fill={`url(#${gradientId})`}
        />

        {/* Upward Growth Arrow (Piercing Diagonally Through House) */}
        {/* Growth Line from Lower Left to Peak */}
        <path
          d="M20 73C23 68 28 62 36 60C43 58 48 68 56 68C61 68 67 63 72 56L84 41L78 36L66 50C62 55 58 58 55 58C48 58 43 49 34 50C26 51 21 61 18 69L20 73Z"
          fill={`url(#${gradientId})`}
        />

        {/* Arrowhead & Shaft Top Right */}
        <path
          d="M68 46.5L88.5 24L83 23L96 20L93 33L87.5 27.5L67 50L68 46.5Z"
          fill={`url(#${gradientId})`}
        />
        <polygon
          points="83,23 96,20 93,33 88,27.5 74,42 70,38 84,24"
          fill={`url(#${gradientId})`}
        />
      </g>
    </svg>
  );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  href = '/',
  showSubtitle = true,
  subtitleText = 'HUB & MARKETING PLATFORM'
}) => {
  // Dimensions map
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14'
  };

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
    xl: 'text-2xl sm:text-3xl'
  };

  const subtitleSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px] sm:text-[11px]',
    lg: 'text-xs',
    xl: 'text-sm'
  };

  const content = (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Isotype */}
      <BrandIcon className={`${iconSizes[size]} transition-transform duration-300 group-hover:scale-105`} />

      {/* Typography Block */}
      {variant !== 'icon' && (
        <div className="flex flex-col justify-center text-left leading-none">
          <div className={`font-black tracking-tight uppercase text-[#0A192F] dark:text-[#F8FAFC] ${titleSizes[size]}`}>
            <span>REALESTATE</span>{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#7B2CBF] bg-clip-text text-transparent">
              CONNECT
            </span>
          </div>

          {(variant === 'full' || showSubtitle) && (
            <span
              className={`font-semibold tracking-wider uppercase text-[#64748B] dark:text-[#94A3B8] mt-1 ${subtitleSizes[size]}`}
            >
              {subtitleText}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label="RealEstate Connect - Inicio" className="focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
};

// Aliases for component specifications
export const LogoFull: React.FC<Omit<BrandLogoProps, 'variant'>> = (props) => (
  <BrandLogo variant="full" {...props} />
);

export const LogoCompact: React.FC<Omit<BrandLogoProps, 'variant'>> = (props) => (
  <BrandLogo variant="compact" showSubtitle={false} {...props} />
);

export const LogoIcon: React.FC<Omit<BrandLogoProps, 'variant'>> = (props) => (
  <BrandLogo variant="icon" {...props} />
);

export default BrandLogo;