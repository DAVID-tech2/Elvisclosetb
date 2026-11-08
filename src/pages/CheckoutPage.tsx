import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { paymentService } from '../services/paymentService';
import { storeService } from '../services/storeService';
import { MobileMoneyPushModal } from '../components/common/MobileMoneyPushModal';
import { PaymentMethod } from '../types';
import {
  ShieldCheck,
  Truck,
  Headphones,
  RotateCcw,
  ArrowLeft,
  Lock,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, cartSubtotal, clearCart, formatUGX } = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form Fields
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+256 700 123 456');
  const [address, setAddress] = useState(user?.addresses?.[0]?.address || 'Plot 12, Kampala Road');
  const [city, setCity] = useState(user?.addresses?.[0]?.city || 'Kampala');
  const [region, setRegion] = useState(user?.addresses?.[0]?.region || 'Central Region');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('MTN Mobile Money');
  const [momoNumber, setMomoNumber] = useState(user?.phone || '+256 778 781601');

  // Push modal state
  const [isPushModalOpen, setIsPushModalOpen] = useState(false);
  const [activeOrderNumber, setActiveOrderNumber] = useState('');
  const [activeOrderId, setActiveOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Create order in store with initial Pending Payment state
      const createdOrder = storeService.createOrder({
        customer: {
          fullName,
          email,
          phone: paymentMethod.includes('Mobile Money') ? momoNumber : phone,
          deliveryAddress: address,
          city,
          region,
          deliveryNotes,
        },
        items: cart.map((c) => ({
          productId: c.productId,
          name: c.name,
          price: c.price,
          image: c.image,
          quantity: c.quantity,
          size: c.size,
          color: c.color,
        })),
        subtotal: cartSubtotal,
        total: cartSubtotal, // STRICTLY product subtotal!
        paymentMethod,
        paymentStatus: 'Initiating',
        orderStatus: 'Pending Payment',
        deliveryArrangementStatus: 'Not Contacted',
      });

      setActiveOrderId(createdOrder.id);
      setActiveOrderNumber(createdOrder.orderNumber);

      // 2. Initiate Payment
      await paymentService.initiatePayment({
        orderId: createdOrder.id,
        orderNumber: createdOrder.orderNumber,
        amount: cartSubtotal,
        currency: 'UGX',
        phoneNumber: momoNumber,
        provider: paymentMethod,
        customerEmail: email,
        customerName: fullName,
        description: `Order ${createdOrder.orderNumber} from Elvis' Closet`,
      });

      setIsSubmitting(false);

      // 3. Open Mobile Money STK Push prompt modal
      setIsPushModalOpen(true);
    } catch (err) {
      console.error('Order creation failed:', err);
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = (transactionRef: string) => {
    // Update order status to Paid & Processing
    storeService.updateOrderStatus(activeOrderId, 'Processing');
    const order = storeService.getOrderById(activeOrderId);
    if (order) {
      order.paymentStatus = 'Completed';
      order.paymentReference = transactionRef;
    }

    clearCart();
    setIsPushModalOpen(false);

    // Redirect to Order Success receipt page
    navigate(`/order-success?orderId=${activeOrderId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Breadcrumb & Back */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/cart"
          className="text-xs font-bold text-gray-600 hover:text-[#F97316] flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
        </Link>
        <span className="text-xs text-gray-400">Step 2 of 3 — Secure Checkout</span>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Columns: Shipping Info & Payment Selector */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-100 text-[#F97316] flex items-center justify-center text-xs font-black">
                1
              </span>
              Customer Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Muhwana"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] focus:bg-white text-gray-900"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. david@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] focus:bg-white text-gray-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-gray-700 font-bold mb-1">
                  Primary Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+256 700 123 456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] focus:bg-white text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-100 text-[#F97316] flex items-center justify-center text-xs font-black">
                2
              </span>
              Delivery Address (Across Uganda)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-gray-700 font-bold mb-1">
                  Street Address / Plot / Landmark *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Plot 12, Kampala Road or Mukono Town Opposite Shell"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] focus:bg-white text-gray-900"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">City / Town *</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] focus:bg-white text-gray-900 font-medium"
                >
                  <option value="Kampala">Kampala</option>
                  <option value="Mukono">Mukono</option>
                  <option value="Entebbe">Entebbe</option>
                  <option value="Jinja">Jinja</option>
                  <option value="Mbarara">Mbarara</option>
                  <option value="Gulu">Gulu</option>
                  <option value="Wakiso">Wakiso</option>
                  <option value="Other District">Other District (Uganda)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Region *</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] focus:bg-white text-gray-900 font-medium"
                >
                  <option value="Central Region">Central Region</option>
                  <option value="Eastern Region">Eastern Region</option>
                  <option value="Western Region">Western Region</option>
                  <option value="Northern Region">Northern Region</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-gray-700 font-bold mb-1">
                  Delivery Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Special instructions for the dispatch team..."
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] focus:bg-white text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector — MTN / Airtel Push / Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-100 text-[#F97316] flex items-center justify-center text-xs font-black">
                3
              </span>
              Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* MTN Mobile Money */}
              <label
                className={`p-4 rounded-2xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                  paymentMethod === 'MTN Mobile Money'
                    ? 'border-[#FFCC00] bg-amber-50/40 shadow-xs'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 bg-[#FFCC00] text-black font-black text-[11px] rounded">
                    MTN MoMo
                  </span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'MTN Mobile Money'}
                    onChange={() => setPaymentMethod('MTN Mobile Money')}
                    className="accent-[#EAB308]"
                  />
                </div>
                <span className="text-xs font-bold text-gray-900">MTN Mobile Money</span>
                <span className="text-[10px] text-gray-500 mt-0.5">Instant STK Push to Handset</span>
              </label>

              {/* Airtel Money */}
              <label
                className={`p-4 rounded-2xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                  paymentMethod === 'Airtel Money'
                    ? 'border-[#ED1C24] bg-red-50/40 shadow-xs'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 bg-[#ED1C24] text-white font-black text-[11px] rounded">
                    airtel
                  </span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'Airtel Money'}
                    onChange={() => setPaymentMethod('Airtel Money')}
                    className="accent-[#ED1C24]"
                  />
                </div>
                <span className="text-xs font-bold text-gray-900">Airtel Money</span>
                <span className="text-[10px] text-gray-500 mt-0.5">Instant STK Push to Handset</span>
              </label>

              {/* Cards Visa/Mastercard */}
              <label
                className={`p-4 rounded-2xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                  paymentMethod === 'Card (Visa/Mastercard)'
                    ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black tracking-tight text-blue-900">
                    VISA / MC
                  </span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'Card (Visa/Mastercard)'}
                    onChange={() => setPaymentMethod('Card (Visa/Mastercard)')}
                    className="accent-blue-600"
                  />
                </div>
                <span className="text-xs font-bold text-gray-900">Card Payment</span>
                <span className="text-[10px] text-gray-500 mt-0.5">Pesapal Secure Gateway</span>
              </label>
            </div>

            {/* Mobile Money Prompt Phone Number Input */}
            {paymentMethod.includes('Mobile Money') && (
              <div className="pt-3 border-t border-gray-100">
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Mobile Money Phone Number (to receive push prompt) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+256 778 781601 or 0778781601"
                  value={momoNumber}
                  onChange={(e) => setMomoNumber(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] text-gray-900 text-xs font-medium"
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  You will receive an automatic PIN authorization prompt on this handset.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Strict Policy */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-5">
            <h3 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3">
              Order Summary
            </h3>

            {/* Items list preview */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover border border-gray-100 shrink-0"
                    />
                    <div>
                      <p className="font-bold text-gray-900 line-clamp-1">{item.name}</p>
                      <p className="text-[10px] text-gray-400">
                        {item.size ? `Size: ${item.size} ` : ''}
                        {item.color ? `| ${item.color} ` : ''}× {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900 whitespace-nowrap">
                    {formatUGX(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Totals */}
            <div className="space-y-2 pt-4 border-t border-gray-100 text-xs sm:text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Product Subtotal</span>
                <span className="font-bold text-gray-900">{formatUGX(cartSubtotal)}</span>
              </div>

              {/* CRITICAL: Amount to Pay = Product Subtotal Only! */}
              <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
                <span className="text-sm font-black text-gray-900">Amount to Pay</span>
                <span className="text-2xl font-black text-[#F97316]">
                  {formatUGX(cartSubtotal)}
                </span>
              </div>
            </div>

            {/* CRITICAL REQUIRED CUSTOMER SERVICE NOTICE (Sections 7 & 4) */}
            <div className="p-3.5 bg-orange-50/80 border border-orange-100 rounded-xl text-xs text-gray-700 leading-relaxed">
              <p className="font-medium">
                After your payment is completed, our support team will contact you to arrange delivery and agree on the transport fee.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#F97316] hover:bg-[#EA580C] disabled:bg-gray-300 text-white text-sm font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              {isSubmitting ? 'Connecting...' : `Place Order Now (${formatUGX(cartSubtotal)})`}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Payments secured via Pesapal API 3.0</span>
            </div>
          </div>

          {/* 4 Trust Badges */}
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs grid grid-cols-2 gap-3 text-[11px] text-gray-600">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#F97316] shrink-0" />
              <div>
                <p className="font-bold text-gray-900">Free Delivery</p>
                <p className="text-[10px] text-gray-400">Across Uganda</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#F97316] shrink-0" />
              <div>
                <p className="font-bold text-gray-900">Secure Payments</p>
                <p className="text-[10px] text-gray-400">100% Secure</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-[#F97316] shrink-0" />
              <div>
                <p className="font-bold text-gray-900">24/7 Support</p>
                <p className="text-[10px] text-gray-400">We're here to help</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#F97316] shrink-0" />
              <div>
                <p className="font-bold text-gray-900">Easy Returns</p>
                <p className="text-[10px] text-gray-400">7 Days Return</p>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Mobile Money STK Push Waiting Screen Modal */}
      <MobileMoneyPushModal
        isOpen={isPushModalOpen}
        phoneNumber={momoNumber}
        provider={paymentMethod}
        amount={cartSubtotal}
        orderNumber={activeOrderNumber}
        onSuccess={handlePaymentSuccess}
        onCancel={() => setIsPushModalOpen(false)}
      />
    </div>
  );
};
