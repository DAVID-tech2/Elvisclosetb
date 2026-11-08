import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  CheckCircle,
  Calendar,
  Truck,
  Mail,
  Phone,
  MessageSquare,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { storeService } from '../services/storeService';
import { Order } from '../types';
import { useStore } from '../context/StoreContext';

export const OrderSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { formatUGX } = useStore();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      const found = storeService.getOrderById(orderId);
      if (found) {
        setOrder(found);
      }
    }
  }, [orderId]);

  const displayOrderNumber = order ? order.orderNumber : '#EC20250727342';
  const customerEmail = order ? order.customer.email : 'david@gmail.com';
  const totalAmount = order ? order.total : 330000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Hero Banner matching screenshot `IMG-20261108-WA0006_9a9e68a3.jpg` */}
      <div className="relative overflow-hidden bg-[#FFF8F3] border border-[#FDE8D7] rounded-3xl p-6 sm:p-10 mb-8 shadow-xs">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left max-w-xl">
            {/* Green Success Badge */}
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto lg:mx-0 mb-4 shadow-xs">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
              Order Placed <span className="text-[#F97316]">Successfully!</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-600 mt-2 font-medium">
              Thank you for shopping with ELVIS' CLOSET! Your order has been received and verified.
            </p>

            <div className="mt-5">
              <Link
                to={`/order-tracking?orderNumber=${encodeURIComponent(displayOrderNumber)}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-sm"
              >
                Track Your Order <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Fashion Photo & Signature */}
          <div className="relative shrink-0 flex items-center justify-center">
            <div className="w-72 sm:w-84 h-48 sm:h-56 rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                alt="Elvis Closet Order Confirmed"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -top-3 -right-2 bg-white px-4 py-1.5 rounded-2xl shadow-lg border border-orange-100 rotate-3">
              <span className="font-serif italic text-sm font-bold text-gray-800">
                Stay Stylish Always!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Overview Info Cards matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* 1. Order Number */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block">
              Order Number
            </span>
            <span className="text-sm font-black text-gray-900 font-mono">
              {displayOrderNumber}
            </span>
            <span className="text-[11px] text-gray-500 block mt-0.5">
              Verified & Paid via Mobile Money
            </span>
          </div>
        </div>

        {/* 2. Estimated Delivery */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block">
              Estimated Delivery
            </span>
            <span className="text-sm font-black text-gray-900">
              3–7 Business Days
            </span>
            <span className="text-[11px] text-gray-500 block mt-0.5">
              Across Uganda & Districts
            </span>
          </div>
        </div>

        {/* 3. Confirmation Email */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div className="truncate">
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block">
              Receipt & Confirmation
            </span>
            <span className="text-sm font-black text-gray-900 truncate block">
              {customerEmail}
            </span>
            <span className="text-[11px] text-gray-500 block mt-0.5">
              Check inbox for order receipt
            </span>
          </div>
        </div>
      </div>

      {/* 2 Columns: Order Summary + What Happens Next */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Left: Order Summary */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3">
            Order Summary
          </h3>

          <div className="space-y-3">
            {order?.items ? (
              order.items.map((it, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={it.image}
                      alt={it.name}
                      className="w-12 h-12 rounded-xl object-cover border border-gray-100"
                    />
                    <div>
                      <span className="font-bold text-gray-900 block">{it.name}</span>
                      <span className="text-[11px] text-gray-500">
                        {it.size ? `Size: ${it.size} ` : ''}
                        {it.color ? `| Colour: ${it.color} ` : ''}× {it.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900">{formatUGX(it.price * it.quantity)}</span>
                </div>
              ))
            ) : (
              <div className="text-xs text-gray-500 py-2">
                Order details confirmed and logged in your profile.
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-2 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Product Subtotal</span>
              <span className="font-bold text-gray-900">{formatUGX(totalAmount)}</span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-gray-100">
              <span className="text-sm font-black text-gray-900">Total Paid</span>
              <span className="text-xl font-black text-[#F97316]">{formatUGX(totalAmount)}</span>
            </div>
          </div>

          <div className="p-3 bg-orange-50/70 rounded-xl text-[11px] text-gray-700">
            <span className="font-bold text-gray-900 block mb-0.5">Transport Arrangement:</span>
            Our support team will contact you on WhatsApp/Phone to finalize dispatch and agree on the transport fee.
          </div>
        </div>

        {/* Right: What Happens Next? */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-5">
          <h3 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3">
            What Happens Next?
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-orange-100 text-[#F97316] flex items-center justify-center font-black shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Order Processing</h4>
                <p className="text-gray-500 mt-0.5">
                  We'll carefully inspect and package your selected fashion garments from our Mukono closet.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-orange-100 text-[#F97316] flex items-center justify-center font-black shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Transport Fee Agreement</h4>
                <p className="text-gray-500 mt-0.5">
                  Our customer service team will reach out via WhatsApp (+256 778 781601) to agree on transport fee and delivery point.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-black shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Dispatched & Delivered</h4>
                <p className="text-gray-500 mt-0.5">
                  Your parcel is handed to trusted couriers for swift delivery across Uganda.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <Link
              to="/shop"
              className="w-full py-3 bg-[#111111] hover:bg-neutral-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              Continue Shopping →
            </Link>
          </div>
        </div>
      </div>

      {/* Need Help? Footer Bar */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-gray-900 block">Need Help with your Order?</span>
            <span className="text-gray-500">Our Mukono support team is ready to assist you.</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:+256778781601"
            className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-800 rounded-xl font-bold border border-gray-200 flex items-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#F97316]" /> +256 778 781601
          </a>
          <a
            href="https://wa.me/256778781601"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};
