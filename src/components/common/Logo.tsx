import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  size = 'md',
  showSubtitle = true,
}) => {
  const isDark = variant === 'dark';

  return (
    <Link to="/" className="flex items-center gap-2.5 group select-none">
      <div className="relative flex items-center justify-center">
        {/* Official Gold Crown EC Monogram Logo Asset */}
        <img
          src="/assets/aistudio/IMG-20260930-WA0006_2__133255d6.jpg"
          alt="Elvis' Closet Crown Logo"
          className={`rounded-full object-cover shadow-sm transition-transform group-hover:scale-105 border ${
            isDark ? 'border-amber-500/40' : 'border-amber-400/30'
          } ${
            size === 'sm' ? 'w-7 h-7 sm:w-8 sm:h-8' : size === 'lg' ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-8 h-8 sm:w-10 sm:h-10'
          }`}
        />
      </div>

      <div className="flex flex-col">
        <span
          className={`font-extrabold tracking-tight font-serif uppercase ${
            isDark ? 'text-white' : 'text-[#111827]'
          } ${size === 'sm' ? 'text-xs sm:text-sm' : size === 'lg' ? 'text-xl sm:text-2xl' : 'text-sm xs:text-base sm:text-xl'}`}
        >
          ELVIS' <span className="text-[#F97316]">CLOSET</span>
        </span>
        {showSubtitle && (
          <span
            className={`text-[7px] xs:text-[8px] sm:text-[9px] font-semibold tracking-wider sm:tracking-widest uppercase -mt-0.5 whitespace-nowrap ${
              isDark ? 'text-amber-400' : 'text-[#F97316]'
            }`}
          >
            — FASHION • STYLE • YOU —
          </span>
        )}
      </div>
    </Link>
  );
};
