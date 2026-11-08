import React from 'react';
import { BannerHero } from '../components/common/BannerHero';
import {
  Truck,
  MessageSquare,
  Clock,
  Package,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

export const ShippingPolicyPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Signature Banner matching screenshot `IMG-20261108-WA0017_3db00e74.jpg` */}
      <BannerHero
        badge="OUR POLICIES"
        title="Shipping &"
        highlightedText="Delivery Policy"
        subtitle="Fast. Reliable. Across Uganda. Transparent delivery coordinated right after product purchase."
        rightScript="Fast & Safe Delivery"
        image="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80"
      />

      {/* 6 Grid Policy Cards matching screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* 1. Coverage */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-gray-900">Delivery Coverage</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              We deliver across Uganda, including Kampala, Mukono, Entebbe, Jinja, Mbarara, and all major towns and upcountry districts.
            </p>
          </div>
        </div>

        {/* 2. Delivery Fees (CRITICAL ACCORDING TO SPEC) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-200/80 bg-orange-50/20 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#F97316] flex items-center justify-center shrink-0">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-gray-900">Delivery Fees Policy</h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              Delivery fees are negotiated and agreed with our support team after your online order is placed. The final fee depends strictly on your destination location, package weight, and preferred delivery method.
            </p>
          </div>
        </div>

        {/* 3. Delivery Time */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-gray-900">Delivery Time</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Orders are typically dispatched same-day or next-day and delivered within 1–5 business days, depending on your location and carrier transit times.
            </p>
          </div>
        </div>

        {/* 4. Order Tracking */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-gray-900">Order Tracking</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Once your order is dispatched, you'll receive a tracking update via WhatsApp or email so you can monitor your parcel journey in real-time.
            </p>
          </div>
        </div>

        {/* 5. Safe & Secure */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-gray-900">Safe & Secure Delivery</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              We handle every garment with boutique care, using moisture-proof tamper-evident packaging to ensure your items arrive in immaculate condition.
            </p>
          </div>
        </div>

        {/* 6. Delays */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-gray-900">Delivery Delays</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              In rare cases, delays may occur due to severe weather, road works or high holiday volume. Our team proactively keeps you notified via phone call or WhatsApp.
            </p>
          </div>
        </div>
      </div>

      {/* Lower 2 Boxes: Need Help & Our Commitment matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Need Help? */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-3">
          <h3 className="text-base font-extrabold text-gray-900">Need Help?</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Our support team in Mukono is always ready to assist you with any delivery-related questions, transport estimates, or schedule changes.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/256778781601"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              <MessageSquare className="w-4 h-4" /> Chat with Us on WhatsApp
            </a>
          </div>
        </div>

        {/* Our Commitment */}
        <div className="bg-[#FAF5EE] rounded-3xl p-6 sm:p-8 border border-[#F0E2D1] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-gray-900 font-extrabold">
            <CheckCircle className="w-5 h-5 text-[#F97316]" />
            <h3>Our Commitment</h3>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed">
            At ELVIS' CLOSET, we are committed to getting your fashion items to you safely, on time, and with the best service possible.
          </p>
          <p className="font-serif italic font-bold text-sm text-[#F97316]">
            Shop with confidence!
          </p>
        </div>
      </div>
    </div>
  );
};
