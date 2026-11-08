import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Truck, ShieldCheck, Headphones } from 'lucide-react';
import { storeService } from '../../services/storeService';
import { BannerSlide } from '../../types';

export const HeroCarousel: React.FC = () => {
  const [slides, setSlides] = useState<BannerSlide[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const banners = storeService.getBanners().filter((b) => b.isActive);
    if (banners.length > 0) {
      setSlides(banners);
    }
  }, []);

  // Auto-rotate every 3 seconds as required
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIdx] || slides[0];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const isBakeInBadge = currentSlide.image.includes('hero_models_summer');

  return (
    <div
      className="relative w-full overflow-hidden bg-[#FAF5EF] rounded-2xl sm:rounded-3xl border border-[#F2E5D5] p-3.5 xs:p-5 sm:p-7 md:p-9 lg:p-11 pb-7 sm:pb-9 shadow-xs mb-8 sm:mb-12 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Side-by-Side 12-Column Grid (Maintains side-by-side layout across ALL screen sizes) */}
      <div className="max-w-7xl mx-auto grid grid-cols-12 items-center gap-2 xs:gap-3 sm:gap-6 md:gap-8 min-h-[200px] xs:min-h-[230px] sm:min-h-[300px] md:min-h-[360px] lg:min-h-[410px]">
        {/* Left Column: Text & CTAs (7 cols on mobile, 6 cols on large screens) */}
        <div
          key={`text-${currentSlide.id}`}
          className="col-span-7 sm:col-span-7 md:col-span-7 lg:col-span-6 z-10 flex flex-col justify-center animate-in fade-in slide-in-from-left-3 duration-400"
        >
          {/* Badge: Bold uppercase collection tag */}
          <span className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-extrabold uppercase tracking-wider text-[#1F2937] block mb-1 sm:mb-2">
            {currentSlide.badgeText || 'SUMMER 2025 COLLECTION'}
          </span>

          {/* Main Title: Generous, readable font size without overflowing */}
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-5xl lg:text-5.5xl font-black text-[#111827] tracking-tight leading-[1.12]">
            {currentSlide.title}{' '}
            <span className="text-[#C68A2C] md:text-[#C68A2C]">
              {currentSlide.highlightedText}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-[11px] xs:text-xs sm:text-sm md:text-base text-gray-600 font-medium leading-snug sm:leading-relaxed mt-1 sm:mt-2.5 line-clamp-2 sm:line-clamp-3">
            {currentSlide.subtitle}
          </p>

          {/* Action Buttons: Side by side */}
          <div className="flex flex-wrap xs:flex-nowrap items-center gap-1.5 xs:gap-2.5 sm:gap-3 mt-2.5 sm:mt-4 md:mt-5">
            <Link
              to={currentSlide.primaryButtonLink}
              className="px-3 py-1.5 xs:px-4 xs:py-2.5 sm:px-6 sm:py-3.5 bg-[#C68A2C] hover:bg-[#B45309] text-white text-xs xs:text-xs sm:text-sm font-extrabold rounded-lg sm:rounded-xl shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>{currentSlide.primaryButtonText}</span>
              <span>→</span>
            </Link>

            {currentSlide.secondaryButtonText && currentSlide.secondaryButtonLink && (
              <Link
                to={currentSlide.secondaryButtonLink}
                className="hidden xxs:inline-flex px-3 py-1.5 xs:px-4 xs:py-2.5 sm:px-5 sm:py-3.5 bg-white/95 hover:bg-white text-gray-900 text-xs xs:text-xs sm:text-sm font-bold rounded-lg sm:rounded-xl border border-[#C68A2C]/30 shadow-2xs transition-colors shrink-0"
              >
                <span>{currentSlide.secondaryButtonText}</span>
              </Link>
            )}
          </div>

          {/* Trust Features Row: Tablet & Desktop */}
          <div className="hidden sm:grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-[#F2E5D5] text-xs text-gray-700">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-gray-900 shrink-0" />
              <div>
                <p className="font-bold text-gray-900 text-[11px] md:text-xs leading-tight">Free Delivery</p>
                <p className="text-[10px] text-gray-500">Across Uganda</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gray-900 shrink-0" />
              <div>
                <p className="font-bold text-gray-900 text-[11px] md:text-xs leading-tight">Secure Payments</p>
                <p className="text-[10px] text-gray-500">Shop with Confidence</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-gray-900 shrink-0" />
              <div>
                <p className="font-bold text-gray-900 text-[11px] md:text-xs leading-tight">24/7 Support</p>
                <p className="text-[10px] text-gray-500">We're here to help</p>
              </div>
            </div>
          </div>

          {/* Trust Features Strip: Mobile (Fits compactly on 1 line without wrapping or vertical bloat) */}
          <div className="flex sm:hidden items-center gap-2 pt-2 mt-2 border-t border-[#F2E5D5] text-[9.5px] font-bold text-gray-800">
            <span className="flex items-center gap-1 shrink-0">
              <Truck className="w-3 h-3 text-gray-900" /> Free Delivery
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-1 shrink-0">
              <ShieldCheck className="w-3 h-3 text-gray-900" /> Secure Pay
            </span>
            <span className="text-gray-300 hidden xxs:inline">•</span>
            <span className="hidden xxs:flex items-center gap-1 shrink-0">
              <Headphones className="w-3 h-3 text-gray-900" /> 24/7
            </span>
          </div>
        </div>

        {/* Right Column: Fashion Visual & Badge (5 cols on mobile, 6 cols on large screens) */}
        <div
          key={`img-${currentSlide.id}`}
          className="col-span-5 sm:col-span-5 md:col-span-5 lg:col-span-6 relative flex items-center justify-end h-full animate-in fade-in zoom-in-95 duration-400"
        >
          {/* Subtle curved sand arch backdrop behind models */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[120%] sm:w-[95%] max-w-[420px] aspect-square rounded-full bg-[#EFE6DC] pointer-events-none -z-0 opacity-80" />

          {/* Models Image Container: stays side-by-side cleanly */}
          <div className="relative z-10 w-full h-[180px] xs:h-[210px] sm:h-[280px] md:h-[340px] lg:h-[390px] flex items-center justify-end">
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="w-full h-full object-contain sm:object-cover object-center sm:object-top drop-shadow-sm rounded-xl sm:rounded-2xl transition-transform duration-500"
            />
          </div>

          {/* Circular Fashion Badge (rendered dynamically for slides that don't already bake it in) */}
          {!isBakeInBadge && (
            <div className="absolute right-0 sm:right-3 top-1/2 -translate-y-1/2 w-14 h-14 xs:w-16 xs:h-16 sm:w-22 sm:h-22 md:w-26 md:h-26 rounded-full bg-[#111111] text-white flex flex-col items-center justify-center text-center p-1 sm:p-2 shadow-xl border border-neutral-700 select-none z-20 pointer-events-none">
              <span className="text-[7.5px] xs:text-[9px] sm:text-[11px] font-black uppercase leading-tight tracking-wider">
                {currentSlide.floatingBadgeText ? (
                  currentSlide.floatingBadgeText.split(' ').map((word, i) => (
                    <span key={i} className="block">
                      {word}
                    </span>
                  ))
                ) : (
                  <>
                    FASHION
                    <br />
                    <span className="text-gray-300">FOR EVERYONE</span>
                  </>
                )}
              </span>
              <svg className="w-4 sm:w-7 h-1 mt-0.5 sm:mt-1 text-[#C68A2C]" viewBox="0 0 40 8" fill="none">
                <path d="M2 2C12 7 28 7 38 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Manual Slide Navigation Controls (hidden on small touch screens so it never covers content) */}
      <button
        onClick={handlePrev}
        className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-sm items-center justify-center transition-transform hover:scale-105 z-20 cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <button
        onClick={handleNext}
        className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-sm items-center justify-center transition-transform hover:scale-105 z-20 cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Dot Indicators matching exact screenshot: active gold pill, inactive dark pills */}
      <div className="absolute bottom-2.5 sm:bottom-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIdx(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentIdx
                ? 'w-6 sm:w-8 h-1.5 sm:h-2 bg-[#C68A2C]'
                : 'w-2 sm:w-2.5 h-1.5 sm:h-2 bg-neutral-800/80 hover:bg-neutral-800'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
