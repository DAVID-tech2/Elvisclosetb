import React from 'react';

interface BannerHeroProps {
  badge: string;
  title: string;
  highlightedText?: string;
  subtitle: string;
  rightScript?: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
}

export const BannerHero: React.FC<BannerHeroProps> = ({
  badge,
  title,
  highlightedText,
  subtitle,
  rightScript = 'Dress Well Live Better.',
  image = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="relative overflow-hidden bg-[#FFF8F3] border border-[#FDE8D7] rounded-3xl p-6 sm:p-8 lg:p-10 mb-8 shadow-xs">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left Content */}
        <div className="flex-1 max-w-xl z-10">
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-[#F97316] bg-orange-100/70 px-3 py-1 rounded-full mb-3">
            {badge}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            {title}{' '}
            {highlightedText && (
              <span className="text-[#F97316] block sm:inline">{highlightedText}</span>
            )}
          </h1>

          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            {subtitle}
          </p>

          {buttonText && buttonLink && (
            <div className="mt-6">
              <a
                href={buttonLink}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
              >
                {buttonText} →
              </a>
            </div>
          )}
        </div>

        {/* Right Model Photo & Script Signature */}
        <div className="relative shrink-0 flex items-center justify-center">
          <div className="relative w-72 sm:w-84 md:w-96 h-48 sm:h-56 rounded-2xl overflow-hidden shadow-md">
            <img
              src={image}
              alt="Elvis Closet Editorial Fashion"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>

          {/* Cursive Signature Pill */}
          {rightScript && (
            <div className="absolute -top-3 -right-2 sm:-right-4 bg-white/95 backdrop-blur-xs px-4 py-2 rounded-2xl shadow-lg border border-orange-100 rotate-3 z-20">
              <span className="font-serif italic text-sm sm:text-base font-bold text-gray-800 tracking-wide">
                {rightScript}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
