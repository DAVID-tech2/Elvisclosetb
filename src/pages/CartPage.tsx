import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BannerHero } from '../components/common/BannerHero';
import { ProductCard } from '../components/common/ProductCard';
import { storeService } from '../services/storeService';

export const CartPage: React.FC = () => {
  const { cart, cartSubtotal, updateQuantity, removeFromCart, clearCart, formatUGX } = useStore();
  const navigate = useNavigate();
  const recommendedProducts = storeService.getProducts().slice(0, 4);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-orange-50 flex items-center justify-center text-[#F97316] mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-gray-900">Your Shopping Cart is Empty</h2>
        <p className="text-gray-500 text-sm mt-2 max-w-sm mx-auto">
          Explore our premier Ugandan fashion collection and discover your signature pieces.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#F97316] text-white text-sm font-bold rounded-xl shadow-md hover:bg-[#EA580C] transition-colors"
        >
          Start Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Signature Banner */}
      <BannerHero
        badge="REVIEW YOUR SELECTIONS"
        title="Your Shopping"
        highlightedText="Cart"
        subtitle="Review your fashion pieces and proceed directly to payment. Transport is arranged after payment."
        rightScript="Dress Better. Live Better."
        image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-16">
        {/* Left Column: Cart Items Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs">
          {/* Mobile Cart Items List (Clean cards, no table overflow) */}
          <div className="sm:hidden space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-gray-50/70 border border-gray-100 rounded-2xl flex items-center justify-between gap-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover border border-gray-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${item.productId}`}
                    className="font-bold text-gray-900 text-xs hover:text-[#F97316] line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  <div className="text-[10px] text-gray-500 mt-0.5">
                    {item.size && <span>Size: {item.size} </span>}
                    {item.color && <span>| Colour: {item.color}</span>}
                  </div>
                  <div className="text-xs font-bold text-[#F97316] mt-1">
                    {formatUGX(item.price * item.quantity)}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 text-gray-400 hover:text-red-600 rounded-md"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg p-0.5">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-5 h-5 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded"
                    >
                      <Minus className="w-2.5 h-2.5" />
                    </button>
                    <span className="font-bold text-xs text-gray-900 w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-5 h-5 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded"
                    >
                      <Plus className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Cart Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider text-[11px] pb-3">
                  <th className="pb-3 font-semibold">Product</th>
                  <th className="pb-3 font-semibold">Price</th>
                  <th className="pb-3 font-semibold text-center">Quantity</th>
                  <th className="pb-3 font-semibold text-right">Total</th>
                  <th className="pb-3 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-xl object-cover border border-gray-100 shrink-0"
                        />
                        <div>
                          <Link
                            to={`/product/${item.productId}`}
                            className="font-bold text-gray-900 hover:text-[#F97316] line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <div className="text-[11px] text-gray-500 mt-0.5">
                            {item.size && <span>Size: {item.size} </span>}
                            {item.color && <span>| Colour: {item.color}</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 font-bold text-gray-900 whitespace-nowrap">
                      {formatUGX(item.price)}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-1 w-24 mx-auto">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-5 h-5 flex items-center justify-center text-gray-600 hover:bg-white rounded transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-xs text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-5 h-5 flex items-center justify-center text-gray-600 hover:bg-white rounded transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 font-black text-[#F97316] text-right whitespace-nowrap">
                      {formatUGX(item.price * item.quantity)}
                    </td>
                    <td className="py-4 text-center">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-4">
            <button
              onClick={clearCart}
              className="text-xs text-gray-500 hover:text-red-600 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear Cart
            </button>
            <Link
              to="/shop"
              className="text-xs font-bold text-gray-700 hover:text-[#F97316] flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-5">
          <h3 className="text-base font-extrabold text-gray-900 pb-3 border-b border-gray-100">
            Order Summary
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({cart.length} item lines)</span>
              <span className="font-bold text-gray-900">{formatUGX(cartSubtotal)}</span>
            </div>

            {/* CRITICAL BUSINESS RULE: Transport fee is NOT collected here */}
            <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
              <span className="text-sm font-black text-gray-900">Total to Pay</span>
              <span className="text-xl font-black text-[#F97316]">{formatUGX(cartSubtotal)}</span>
            </div>
          </div>

          {/* CRITICAL NOTICE: Exactly as requested in Section 7 & 4 */}
          <div className="p-3 bg-orange-50/70 border border-orange-100 rounded-xl text-[11px] text-gray-700 leading-relaxed">
            <p className="font-medium text-gray-800">
              After your payment is completed, our support team will contact you to arrange delivery and agree on the transport fee.
            </p>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 bg-[#F97316] hover:bg-[#EA580C] text-white text-sm font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Your order is safe and secure. Encrypted payments.</span>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            You May Also Like
          </h2>
          <Link to="/shop" className="text-xs font-bold text-[#F97316] hover:text-[#EA580C]">
            View All Products →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {recommendedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};
