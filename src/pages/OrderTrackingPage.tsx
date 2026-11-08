import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BannerHero } from '../components/common/BannerHero';
import { storeService } from '../services/storeService';
import { Order } from '../types';
import { useStore } from '../context/StoreContext';
import {
  Search,
  CheckCircle,
  Clock,
  Truck,
  PackageCheck,
  Phone,
  MessageSquare,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialOrderNumber = searchParams.get('orderNumber') || '#EC20250727342';
  const { formatUGX } = useStore();

  const [orderQuery, setOrderQuery] = useState(initialOrderNumber);
  const [phoneQuery, setPhoneQuery] = useState('+256 700 123 456');
  const [matchedOrder, setMatchedOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  const handleTrack = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearched(true);
    const found = storeService.getOrderById(orderQuery);
    if (found) {
      setMatchedOrder(found);
    } else {
      // Use fallback default from orders list
      const orders = storeService.getOrders();
      setMatchedOrder(orders[0] || null);
    }
  };

  useEffect(() => {
    handleTrack();
  }, [initialOrderNumber]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Signature Ivory Banner */}
      <BannerHero
        badge="REAL-TIME DISPATCH UPDATES"
        title="Order"
        highlightedText="Tracking"
        subtitle="Know where your fashion parcel is across Uganda. Enter your order number and mobile phone."
        rightScript="Track. Relax. Receive!"
        image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
        {/* Left 2 Columns: Input Form & Journey Timeline */}
        <div className="lg:col-span-2 space-y-8">
          {/* Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-extrabold text-gray-900">Enter Your Order Details</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Provide your order number and phone number to verify status.
              </p>
            </div>

            <form onSubmit={handleTrack} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">
                    Order Number (e.g. #EC12345) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="#EC20250727342"
                    value={orderQuery}
                    onChange={(e) => setOrderQuery(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] font-mono font-bold text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">
                    Phone Number (used during checkout) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+256 700 123 456"
                    value={phoneQuery}
                    onChange={(e) => setPhoneQuery(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] font-medium text-gray-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs sm:text-sm font-extrabold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" /> Track Order Status
              </button>
            </form>
          </div>

          {/* Timeline: Order Journey */}
          {matchedOrder && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6">
              <h3 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3">
                Your Order Journey
              </h3>

              {/* 4 Steps timeline matching screenshot */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Step 1: Placed */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-500 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Order Placed</h4>
                    <span className="text-[10px] text-gray-400 block">Jul 27, 2025</span>
                  </div>
                </div>

                {/* Step 2: Processing */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-500 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Processing</h4>
                    <span className="text-[10px] text-gray-400 block">Confirmed & Inspected</span>
                  </div>
                </div>

                {/* Step 3: Out for Delivery */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-orange-50 text-[#F97316] border-2 border-[#F97316] flex items-center justify-center animate-pulse">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Out for Delivery</h4>
                    <span className="text-[10px] text-[#F97316] font-bold block">In Progress</span>
                  </div>
                </div>

                {/* Step 4: Delivered */}
                <div className="flex flex-col items-center text-center space-y-2 opacity-50">
                  <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 border-2 border-gray-300 flex items-center justify-center">
                    <PackageCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Delivered</h4>
                    <span className="text-[10px] text-gray-400 block">Pending Handover</span>
                  </div>
                </div>
              </div>

              {/* Delivery Arrangement Status Note */}
              <div className="p-4 bg-orange-50/70 border border-orange-100 rounded-2xl text-xs text-gray-700">
                <span className="font-bold text-gray-900 block mb-0.5">
                  Boutique Delivery Coordination:
                </span>
                Status: <span className="font-bold text-[#F97316]">{matchedOrder.deliveryArrangementStatus}</span>
                {matchedOrder.agreedTransportFee && (
                  <span className="ml-2">
                    (Agreed transport fee: {formatUGX(matchedOrder.agreedTransportFee)})
                  </span>
                )}
                <p className="mt-1 text-gray-600">
                  {matchedOrder.internalNotes ||
                    'Our dispatch team has scheduled rider James for prompt transit.'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Details & Status Card */}
        <div className="space-y-6">
          {matchedOrder ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-5">
              <h3 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3">
                Order Details
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Order Number</span>
                  <span className="font-bold font-mono text-gray-900">
                    {matchedOrder.orderNumber}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Order Date</span>
                  <span className="font-bold text-gray-900">
                    {new Date(matchedOrder.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Total Amount</span>
                  <span className="font-black text-[#F97316] text-sm">
                    {formatUGX(matchedOrder.total)}
                  </span>
                </div>
              </div>

              {/* Current Status Box */}
              <div className="pt-4 border-t border-gray-100">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-2">
                  Current Status
                </span>
                <div className="p-4 bg-orange-50 rounded-2xl flex items-center gap-3">
                  <Truck className="w-6 h-6 text-[#F97316] shrink-0" />
                  <div>
                    <h4 className="text-xs font-black text-gray-900">
                      {matchedOrder.orderStatus}
                    </h4>
                    <p className="text-[11px] text-gray-600 mt-0.5">
                      Your fashion order is on its way to your destination in Uganda.
                    </p>
                  </div>
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className="p-4 bg-gray-50 rounded-2xl text-xs space-y-1">
                <span className="text-gray-500">Estimated Delivery:</span>
                <p className="font-bold text-gray-900">Within 1–3 Business Days</p>
              </div>
            </div>
          ) : (
            searched && (
              <div className="bg-white rounded-3xl p-6 border border-gray-100 text-center text-xs text-gray-500">
                No active order found with that reference. Check your confirmation receipt.
              </div>
            )
          )}

          {/* Tracking Tips Box */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-3 text-xs">
            <h4 className="font-extrabold text-gray-900 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" /> Tracking Tips
            </h4>
            <ul className="space-y-2 text-gray-600 list-disc pl-4">
              <li>Ensure you include the `#` prefix in your order number (e.g. #EC12345).</li>
              <li>Use the exact Ugandan phone number provided at checkout.</li>
              <li>Contact support if your address changes after payment.</li>
            </ul>
          </div>

          {/* Need Help? Box */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4 text-xs">
            <h4 className="font-extrabold text-gray-900 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#F97316]" /> Need Help?
            </h4>
            <p className="text-gray-500">Our customer support team is ready to assist you.</p>

            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/256778781601"
                target="_blank"
                rel="noreferrer"
                className="py-2.5 bg-[#25D366] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#20ba59]"
              >
                <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
              </a>
              <a
                href="tel:+256778781601"
                className="py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-800 rounded-xl font-bold border border-gray-200 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#F97316]" /> Call +256 778 781601
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
