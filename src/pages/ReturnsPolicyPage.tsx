import React from 'react';
import { BannerHero } from '../components/common/BannerHero';
import {
  RotateCcw,
  CheckCircle,
  HelpCircle,
  MessageSquare,
  Mail,
  ShieldCheck,
  AlertCircle,
  Package,
} from 'lucide-react';

export const ReturnsPolicyPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner matching screenshot `IMG-20261108-WA0018_6a8d9d81.jpg` */}
      <BannerHero
        badge="OUR POLICY"
        title="Return &"
        highlightedText="Refund Policy"
        subtitle="Shop with confidence. We've got you covered with an easy 7-day exchange and refund guarantee."
        rightScript="Your Satisfaction Our Priority"
        image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-14">
        {/* Left 2 Columns: Policy Details */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6">
          {/* 1. Returns Eligibility */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-gray-900">Returns Eligibility</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                You can return items within 7 days of receiving your order, provided the item is unused, unwashed, in its original pristine condition, and with all boutique tags firmly attached.
              </p>
            </div>
          </div>

          {/* 2. Exchanges */}
          <div className="flex items-start gap-4 pt-4 border-t border-gray-100">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-gray-900">Exchanges</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Want a different size, colour or alternative silhouette? No problem! You can exchange eligible items within 7 days, subject to closet stock availability.
              </p>
            </div>
          </div>

          {/* 3. Refunds */}
          <div className="flex items-start gap-4 pt-4 border-t border-gray-100">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-gray-900">Refunds</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Once we receive and inspect your returned item, we will process your refund within 3–7 business days. Refunds are made directly via your original MTN/Airtel Mobile Money account or bank card.
              </p>
            </div>
          </div>

          {/* 4. Non-Returnable */}
          <div className="flex items-start gap-4 pt-4 border-t border-gray-100">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-gray-900">Non-Returnable Items</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                For hygienic reasons, intimate apparel, customized orders and promotional clearance items are not eligible for return or refund. Please check sizing guidelines before ordering.
              </p>
            </div>
          </div>

          {/* 5. How to Initiate */}
          <div className="flex items-start gap-4 pt-4 border-t border-gray-100">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-gray-900">How to Initiate a Return</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Contact our Mukono support team via WhatsApp (+256 778 781601) or email with your order number and reason for return. We will guide you through packaging and courier drop-off.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Support & Important Notes */}
        <div className="space-y-6">
          {/* Need Help Box */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-3">
            <h4 className="text-sm font-extrabold text-gray-900">Need Help?</h4>
            <p className="text-xs text-gray-500">
              Our customer team is here to assist you with hassle-free returns.
            </p>

            <div className="space-y-2 pt-1">
              <a
                href="https://wa.me/256778781601"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
              </a>
              <a
                href="mailto:elviselegantcloset@gmail.com"
                className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-800 rounded-xl font-bold text-xs border border-gray-200 flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 text-[#F97316]" /> Email Support
              </a>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-3">
            <h4 className="text-sm font-extrabold text-gray-900">Important Notes</h4>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Items must be returned within 7 days of delivery.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Products must be unused and in original packaging.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Refunds reflect on your Mobile Money statement in 3–7 days.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Return courier fees apply unless the product is damaged upon arrival.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3 Step Return Process at Bottom matching screenshot */}
      <div className="bg-[#FAF6F0] rounded-3xl p-8 border border-[#F2E5D5] shadow-xs text-center">
        <h3 className="text-lg font-black text-gray-900 mb-1">Our Simple Return Process</h3>
        <p className="text-xs text-gray-500 mb-8">It's easy! Just follow these 3 simple steps:</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white p-5 rounded-2xl shadow-2xs space-y-2">
            <span className="w-7 h-7 rounded-full bg-orange-100 text-[#F97316] font-black text-xs inline-flex items-center justify-center">
              1
            </span>
            <h4 className="text-xs font-bold text-gray-900">Contact Support</h4>
            <p className="text-[11px] text-gray-500">Reach out via WhatsApp or email with your order #</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-2xs space-y-2">
            <span className="w-7 h-7 rounded-full bg-orange-100 text-[#F97316] font-black text-xs inline-flex items-center justify-center">
              2
            </span>
            <h4 className="text-xs font-bold text-gray-900">Return Your Item</h4>
            <p className="text-[11px] text-gray-500">Send package as instructed by dispatch team</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-2xs space-y-2">
            <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-black text-xs inline-flex items-center justify-center">
              3
            </span>
            <h4 className="text-xs font-bold text-gray-900">Get Your Refund</h4>
            <p className="text-[11px] text-gray-500">Receive refund or replacement exchange</p>
          </div>
        </div>
      </div>
    </div>
  );
};
