import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storeService } from '../../services/storeService';
import { CampaignDeal } from '../../types';

export const SpecialDealsBanner: React.FC = () => {
  const [campaign, setCampaign] = useState<CampaignDeal | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    mins: 36,
    secs: 58,
  });

  useEffect(() => {
    const data = storeService.getCampaign();
    setCampaign(data);

    const targetTime = new Date(data.endDate).getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, targetTime - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, mins, secs });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!campaign || !campaign.isActive) return null;

  return (
    <section className="mb-14 overflow-hidden rounded-3xl bg-[#111111] text-white p-6 sm:p-10 lg:p-12 relative border border-neutral-800 shadow-xl">
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Column Text */}
        <div className="max-w-xl text-center lg:text-left space-y-4">
          <span className="inline-block text-[11px] font-black uppercase tracking-widest text-[#F97316] bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
            {campaign.badge || 'LIMITED TIME OFFER'}
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {campaign.title}
          </h2>

          <p className="text-sm sm:text-base text-gray-400">
            {campaign.subtitle}
          </p>

          <div className="pt-2">
            <Link
              to={campaign.buttonLink || '/shop?sale=true'}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs sm:text-sm font-extrabold rounded-xl transition-all shadow-md hover:shadow-orange-900/50"
            >
              {campaign.buttonText || 'Shop The Sale'} →
            </Link>
          </div>
        </div>

        {/* Center / Right Column: Product Showcase & Real Countdown */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Product showcase image */}
          <div className="relative w-48 sm:w-56 h-48 rounded-2xl overflow-hidden border border-neutral-800 shadow-lg bg-neutral-900 shrink-0">
            <img
              src={campaign.image}
              alt="Special Deals Showcase"
              className="w-full h-full object-cover"
            />
            {campaign.discountPercentage && (
              <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                SAVE {campaign.discountPercentage}%
              </span>
            )}
          </div>

          {/* 4 Countdown Boxes matching screenshot: [02 Days] [14 Hours] [36 Mins] [58 Secs] */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
            <div className="bg-[#1A1A1A] border border-neutral-800 rounded-xl p-2 sm:p-3 min-w-[56px] sm:min-w-[72px] shadow-inner">
              <span className="block text-2xl sm:text-3xl font-black text-white font-mono">
                {campaign.isActive ? timeLeft.days.toString().padStart(2, '0') : '00'}
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                Days
              </span>
            </div>

            <div className="bg-[#1A1A1A] border border-neutral-800 rounded-xl p-2 sm:p-3 min-w-[56px] sm:min-w-[72px] shadow-inner">
              <span className="block text-2xl sm:text-3xl font-black text-white font-mono">
                {campaign.isActive ? timeLeft.hours.toString().padStart(2, '0') : '00'}
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                Hours
              </span>
            </div>

            <div className="bg-[#1A1A1A] border border-neutral-800 rounded-xl p-2 sm:p-3 min-w-[56px] sm:min-w-[72px] shadow-inner">
              <span className="block text-2xl sm:text-3xl font-black text-white font-mono">
                {campaign.isActive ? timeLeft.mins.toString().padStart(2, '0') : '00'}
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                Mins
              </span>
            </div>

            <div className="bg-[#1A1A1A] border border-neutral-800 rounded-xl p-2 sm:p-3 min-w-[56px] sm:min-w-[72px] shadow-inner">
              <span className="block text-2xl sm:text-3xl font-black text-[#F97316] font-mono">
                {campaign.isActive ? timeLeft.secs.toString().padStart(2, '0') : '00'}
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                Secs
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
