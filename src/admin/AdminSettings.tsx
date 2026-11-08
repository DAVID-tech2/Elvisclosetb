import React, { useState } from 'react';
import { storeService } from '../services/storeService';
import { useStore } from '../context/StoreContext';
import { StoreSettings } from '../types';
import { Settings, Save, ShieldCheck, RefreshCw, Smartphone, Store, Download } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { showToast } = useStore();
  const [settings, setSettings] = useState<StoreSettings>(() => storeService.getSettings());

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    storeService.saveSettings(settings);
    showToast('Saved boutique business and Pesapal settings!', 'success');
  };

  const handleReset = () => {
    if (window.confirm('Reset all catalog data to boutique default photoshoot data?')) {
      storeService.resetToDefaults();
      showToast('Catalog restored to verified defaults', 'info');
      setTimeout(() => window.location.reload(), 800);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Store & Business Settings</h1>
        <p className="text-xs text-gray-500 mt-1">
          Manage boutique contact channels, Pesapal gateway credentials, and store operation status.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Business Contact Channels */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
            <Store className="w-4 h-4 text-[#F97316]" /> Official Boutique Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Business Name</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Location</label>
              <input
                type="text"
                value={settings.location}
                onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Telephone</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">WhatsApp Line</label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-gray-700 font-bold mb-1">Official Email Address</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Pesapal API 3.0 Configuration */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#F97316]" /> Pesapal API 3.0 & Uganda Mobile Money Gateway
          </h3>

          <div className="p-4 bg-orange-50/60 rounded-2xl text-[11px] text-gray-700 leading-relaxed space-y-1">
            <p className="font-bold text-gray-900">Direct STK Push Experience:</p>
            <p>
              When enabled, customers entering their MTN or Airtel phone numbers receive an instant authorization prompt directly on their phone screen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Pesapal Merchant Consumer Key</label>
              <input
                type="text"
                placeholder="Live/Sandbox Consumer Key"
                value={settings.pesapalConsumerKey || 'qkio1BGGY/dHdVbdn0Dpvalid'}
                onChange={(e) => setSettings({ ...settings, pesapalConsumerKey: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-mono text-gray-900"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Pesapal Merchant ID</label>
              <input
                type="text"
                placeholder="Merchant Account Reference"
                value={settings.pesapalMerchantId || 'ELVIS-CLOSET-UG'}
                onChange={(e) => setSettings({ ...settings, pesapalMerchantId: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-mono text-gray-900"
              />
            </div>

            <div className="sm:col-span-2 flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <span className="font-bold text-gray-900 block">Direct Mobile Money STK Push</span>
                <span className="text-[11px] text-gray-500">
                  Allow customers to authorize payments without leaving the website.
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.directPushEnabled}
                onChange={(e) => setSettings({ ...settings, directPushEnabled: e.target.checked })}
                className="accent-[#F97316] w-5 h-5 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Export Project & Source Code */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
            <Download className="w-4 h-4 text-[#F97316]" /> Export & Download Full Source Code
          </h3>

          <p className="text-gray-600 text-xs leading-relaxed">
            Download the complete production-ready source code of <strong>ELVIS' ELEGANT CLOSET</strong>, including all React components, Tailwind CSS styling, TypeScript contracts, boutique photoshoot assets, and payment integrations.
          </p>

          <div className="p-4 bg-amber-50/60 border border-amber-200/70 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="font-extrabold text-gray-900 block text-xs">
                Complete Project Archive (.ZIP)
              </span>
              <span className="text-[11px] text-gray-500 mt-0.5 block">
                Full standalone repository with Vite, React 19, TypeScript, and preloaded boutique media.
              </span>
            </div>

            <a
              href="/elvis-closet-project.zip"
              download="elvis-closet-project.zip"
              className="px-5 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" /> Download ZIP Archive
            </a>
          </div>

          <div className="bg-gray-900 text-gray-200 p-4 rounded-2xl text-[11px] font-mono space-y-1.5 overflow-x-auto">
            <p className="text-gray-400 font-sans font-bold text-xs mb-1">How to run locally on your computer:</p>
            <p><span className="text-amber-400">1.</span> unzip elvis-closet-project.zip -d elvis-closet</p>
            <p><span className="text-amber-400">2.</span> cd elvis-closet</p>
            <p><span className="text-amber-400">3.</span> npm install</p>
            <p><span className="text-amber-400">4.</span> npm run dev</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-600 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Restore Sample Catalog Data
          </button>

          <button
            type="submit"
            className="px-6 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save All Settings
          </button>
        </div>
      </form>
    </div>
  );
};
