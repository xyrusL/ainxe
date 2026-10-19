import React, { useId } from 'react';

interface AinxeIconProps {
  className?: string;
  size?: number;
}

/**
 * Standalone angular "AX" Cyber-Blade Icon for AINXE Studios
 */
export const AinxeIcon: React.FC<AinxeIconProps> = ({ className = '', size = 42 }) => {
  const uid = useId().replace(/:/g, '');
  const cyanGradId = `ainxe-cyan-${uid}`;
  const magentaGradId = `ainxe-magenta-${uid}`;
  const glowFilterId = `ainxe-glow-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="AINXE Icon"
    >
      <defs>
        <linearGradient id={cyanGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f0ff" />
          <stop offset="100%" stopColor="#0077ff" />
        </linearGradient>
        <linearGradient id={magentaGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff0055" />
          <stop offset="100%" stopColor="#a200ff" />
        </linearGradient>
        <filter id={glowFilterId} x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Chamfered Frame */}
      <polygon
        points="16,6 104,6 114,20 114,98 100,114 16,114 6,100 6,20"
        fill="#060711"
        stroke="#00f0ff"
        strokeWidth="2.5"
        strokeOpacity="0.6"
      />

      {/* Corner HUD Ticks */}
      <polyline points="6,32 6,20 16,6 30,6" stroke="#00f0ff" strokeWidth="3.5" fill="none" />
      <polyline points="114,84 114,98 100,114 86,114" stroke="#ff0055" strokeWidth="3.5" fill="none" />

      {/* Left 'A' Mecha Wing */}
      <path
        d="M14 100 L48 22 H65 L40 76 H60 L54 88 H34 L22 106 Z"
        fill={`url(#${cyanGradId})`}
        filter={`url(#${glowFilterId})`}
      />

      {/* Right 'X' Cross-Slash (Magenta Core + Cyan Blade) */}
      <path
        d="M54 22 H70 L104 96 H88 Z"
        fill={`url(#${magentaGradId})`}
        filter={`url(#${glowFilterId})`}
      />
      <path
        d="M108 14 L50 102 H66 L112 28 Z"
        fill={`url(#${cyanGradId})`}
        filter={`url(#${glowFilterId})`}
      />

      {/* Center Cyber Core Spark */}
      <polygon points="69,50 80,50 74,64 63,64" fill="#fcee0a" />
    </svg>
  );
};

interface AinxeLogoProps {
  className?: string;
  iconSize?: number;
  showSubtitle?: boolean;
}

/**
 * Full AINXE Studios Brand Lockup (AX Cyber-Blade Icon + Vector Wordmark)
 */
export const AinxeLogo: React.FC<AinxeLogoProps> = ({
  className = '',
  iconSize = 42,
  showSubtitle = true,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      <div className="relative transition-transform duration-300 group-hover:scale-105">
        <AinxeIcon size={iconSize} />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center leading-none">
          <span className="font-display font-black text-xl sm:text-2xl tracking-[0.18em] text-white">
            AIN
          </span>
          <span className="font-display font-black text-xl sm:text-2xl tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] via-[#00f0ff] to-[#00f0ff]">
            XE
          </span>
        </div>
        {showSubtitle && (
          <span className="font-mono-tech text-[10px] tracking-[0.34em] text-[#00f0ff] uppercase mt-0.5">
            STUDIOS
          </span>
        )}
      </div>
    </div>
  );
};
