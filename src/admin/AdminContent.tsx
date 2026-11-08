import React, { useState } from 'react';
import { storeService } from '../services/storeService';
import { useStore } from '../context/StoreContext';
import { BannerSlide, CampaignDeal } from '../types';
import {
  Sliders,
  Save,
  Plus,
  Trash2,
  Eye,
  Calendar,
  Sparkles,
  Check,
  CheckCircle,
} from 'lucide-react';

export const AdminContent: React.FC = () => {
  const { showToast } = useStore();
  const [banners, setBanners] = useState<BannerSlide[]>(() => storeService.getBanners());
  const [campaign, setCampaign] = useState<CampaignDeal>(() => storeService.getCampaign());
  const [activeTab, setActiveTab] = useState<'banners' | 'campaign'>('banners');

  const handleUpdateSlide = (id: string, updates: Partial<BannerSlide>) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  const handleSaveBanners = () => {
    banners.forEach((b) => storeService.saveBanner(b));
    showToast('Saved homepage carousel slides successfully!', 'success');
  };

  const handleSaveCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    storeService.saveCampaign(campaign);
    showToast('Saved promotional campaign and countdown!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Homepage & Content Management
          </h1>
          <p className="text-xs text-gray-500">
            Customize the 5-slide carousel, promotional deals banner and homepage content without editing code.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('banners')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'banners'
                ? 'bg-[#F97316] text-white shadow-xs'
                : 'bg-white border border-gray-200 text-gray-700'
            }`}
          >
            5 Carousel Slides
          </button>
          <button
            onClick={() => setActiveTab('campaign')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'campaign'
                ? 'bg-[#F97316] text-white shadow-xs'
                : 'bg-white border border-gray-200 text-gray-700'
            }`}
          >
            Special Deals Campaign
          </button>
        </div>
      </div>

      {activeTab === 'banners' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
            <span className="text-xs font-bold text-gray-700">
              Configured Carousel Slides ({banners.length} of 5 slides)
            </span>
            <button
              onClick={handleSaveBanners}
              className="px-5 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save All Carousel Changes
            </button>
          </div>

          <div className="space-y-4">
            {banners.map((slide, idx) => (
              <div
                key={slide.id}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4 text-xs"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-orange-100 text-[#F97316] flex items-center justify-center font-black text-xs">
                      {idx + 1}
                    </span>
                    <h3 className="font-extrabold text-sm text-gray-900">
                      Slide {idx + 1}: {slide.title} {slide.highlightedText}
                    </h3>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                    <input
                      type="checkbox"
                      checked={slide.isActive}
                      onChange={(e) => handleUpdateSlide(slide.id, { isActive: e.target.checked })}
                      className="accent-[#F97316] w-4 h-4"
                    />
                    <span>Active in Rotation</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Image Preview & URL */}
                  <div className="md:col-span-4 space-y-2">
                    <div className="aspect-4/3 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                      <img src={slide.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-1">
                        Slide Photograph URL
                      </label>
                      <input
                        type="url"
                        value={slide.image}
                        onChange={(e) => handleUpdateSlide(slide.id, { image: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono"
                      />
                    </div>
                  </div>

                  {/* Text Controls */}
                  <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Badge Tag</label>
                      <input
                        type="text"
                        value={slide.badgeText}
                        onChange={(e) => handleUpdateSlide(slide.id, { badgeText: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Floating Circle Tag</label>
                      <input
                        type="text"
                        value={slide.floatingBadgeText || ''}
                        onChange={(e) => handleUpdateSlide(slide.id, { floatingBadgeText: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Main Heading</label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => handleUpdateSlide(slide.id, { title: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Highlighted Text (Orange)</label>
                      <input
                        type="text"
                        value={slide.highlightedText}
                        onChange={(e) => handleUpdateSlide(slide.id, { highlightedText: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-[#F97316] font-bold"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-gray-700 mb-1">Subtitle</label>
                      <textarea
                        rows={2}
                        value={slide.subtitle}
                        onChange={(e) => handleUpdateSlide(slide.id, { subtitle: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Primary Button Text</label>
                      <input
                        type="text"
                        value={slide.primaryButtonText}
                        onChange={(e) => handleUpdateSlide(slide.id, { primaryButtonText: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Primary Button Link</label>
                      <input
                        type="text"
                        value={slide.primaryButtonLink}
                        onChange={(e) => handleUpdateSlide(slide.id, { primaryButtonLink: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'campaign' && (
        <form onSubmit={handleSaveCampaign} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6 text-xs max-w-2xl">
          <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
            <h3 className="text-base font-extrabold text-gray-900">
              Special Deals Banner & Countdown Timer
            </h3>
            <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700">
              <input
                type="checkbox"
                checked={campaign.isActive}
                onChange={(e) => setCampaign({ ...campaign, isActive: e.target.checked })}
                className="accent-[#F97316] w-4 h-4"
              />
              <span>Campaign Active</span>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Badge Text</label>
              <input
                type="text"
                value={campaign.badge}
                onChange={(e) => setCampaign({ ...campaign, badge: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Campaign Title</label>
              <input
                type="text"
                value={campaign.title}
                onChange={(e) => setCampaign({ ...campaign, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Subtitle</label>
              <textarea
                rows={2}
                value={campaign.subtitle}
                onChange={(e) => setCampaign({ ...campaign, subtitle: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Countdown End Date (ISO / Datetime)
                </label>
                <input
                  type="datetime-local"
                  value={new Date(campaign.endDate).toISOString().slice(0, 16)}
                  onChange={(e) =>
                    setCampaign({ ...campaign, endDate: new Date(e.target.value).toISOString() })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Discount %</label>
                <input
                  type="number"
                  value={campaign.discountPercentage || 25}
                  onChange={(e) =>
                    setCampaign({ ...campaign, discountPercentage: parseInt(e.target.value, 10) })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-700 mb-1">Artwork Photograph URL</label>
                <input
                  type="url"
                  value={campaign.image}
                  onChange={(e) => setCampaign({ ...campaign, image: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Campaign Configuration
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
