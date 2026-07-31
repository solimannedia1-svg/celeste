import React from 'react';

interface CelesteLogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'dark' | 'light' | 'gold' | 'currentColor';
  strokeWidth?: number;
}

export default function CelesteLogo({ className = "w-16 h-16", showText = false, strokeWidth }: CelesteLogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {/* Emblem SVG matching Celeste Restaurant & Café logo */}
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-full"
      >
        {/* Outer Circular C Frame */}
        <path
          d="M 160 65 A 72 72 0 1 0 160 135"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Wavy Sun Arc Top (inside top half of circle) */}
        <path
          d="M 68 85 Q 75 68 85 75 T 100 68 T 115 75 T 132 85"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 60 98 C 65 72, 135 72, 140 98"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />

        {/* 3 Horizontal Wavy Lines (inside bottom half of circle) */}
        {/* Wave 1 */}
        <path
          d="M 65 116 Q 82 108 100 116 T 135 116"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Wave 2 */}
        <path
          d="M 68 130 Q 84 122 100 130 T 132 130"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Wave 3 */}
        <path
          d="M 74 144 Q 87 137 100 144 T 126 144"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {showText && (
        <div className="mt-2 text-center tracking-widest uppercase">
          <div className="text-xl sm:text-2xl font-serif font-bold text-on-surface tracking-[0.2em] font-serif">
            CÉLESTE
          </div>
          <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs text-on-surface-variant font-medium tracking-[0.25em] mt-0.5">
            <span>ESTD</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 inline-block" />
            <span>2025</span>
          </div>
          <div className="text-[11px] sm:text-xs text-primary font-bold tracking-[0.3em] mt-1">
            RESTAURANT & CAFÉ
          </div>
        </div>
      )}
    </div>
  );
}
