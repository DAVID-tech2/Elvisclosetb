import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { storeService } from '../services/storeService';
import { BannerHero } from '../components/common/BannerHero';
import {
  Heart,
  Trash2,
  ShoppingBag,
  Star,
  CheckCircle,
  Eye,
  ArrowRight,
} from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, formatUGX } = useStore();
  const allProducts = storeService.getProducts();

  const wishlistedProducts = allProducts.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Signature Banner */}
      <BannerHero
        badge="MY WISHLIST"
        title="My"
        highlightedText="Wishlist"
        subtitle="Save your favourite boutique pieces and shop them whenever you're ready."
        rightScript="Dream It. Save It. Buy It Later."
        image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-14">
        {/* Left 2 Columns: Saved Items Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#F97316] fill-[#F97316]" />
                <h2 className="text-base font-extrabold text-gray-900">
                  {wishlistedProducts.length} Items in Your Wishlist
                </h2>
              </div>

              {wishlistedProducts.length > 0 && (
                <button
                  onClick={() => {
                    wishlist.forEach((id) => toggleWishlist(id));
                  }}
                  className="text-xs font-bold text-gray-400 hover:text-red-600 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear Wishlist
                </button>
              )}
            </div>

            {wishlistedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {wishlistedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    {/* Top Image & badges */}
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        In Stock
                      </span>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-rose-500 flex items-center justify-center hover:bg-white transition-colors"
                        title="Remove from wishlist"
                      >
                        <Heart className="w-4 h-4 fill-rose-500" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-extrabold text-sm text-gray-900 line-clamp-1">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-1 text-amber-500 text-xs mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <span className="font-bold text-gray-900">{product.rating.toFixed(1)}</span>
                          <span className="text-gray-400">({product.reviewsCount} reviews)</span>
                        </div>
                      </div>

                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-black text-[#F97316]">
                          {formatUGX(product.price)}
                        </span>
                        {product.comparePrice && product.comparePrice > product.price && (
                          <span className="text-xs text-gray-400 line-through">
                            {formatUGX(product.comparePrice)}
                          </span>
                        )}
                      </div>

                      {/* 2 Buttons matching screenshot */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <Link
                          to={`/product/${product.id}`}
                          className="py-2.5 px-3 bg-gray-50 hover:bg-gray-100 text-gray-800 rounded-xl text-xs font-bold border border-gray-200 flex items-center justify-center gap-1 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" /> View Details
                        </Link>

                        <button
                          onClick={() => addToCart(product)}
                          className="py-2.5 px-3 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-900">Your wishlist is empty</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Browse our fashion collections and click the heart icon on pieces you love.
                </p>
                <Link
                  to="/shop"
                  className="mt-4 inline-block px-5 py-2.5 bg-[#F97316] text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Explore Shop
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: "Why Save Items?" and "Complete Your Style" promo */}
        <div className="space-y-6">
          {/* Why Save Items? card */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
              <Star className="w-4 h-4 text-[#F97316] fill-[#F97316]" /> Why Save Items?
            </h3>
            <ul className="space-y-3 text-xs text-gray-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Keep track of your favourite fashion pieces and lookbooks.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Get notified when prices drop or items are back in stock.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Shop later at your convenience from any smartphone or tablet.</span>
              </li>
            </ul>
          </div>

          {/* Complete Your Style Promo Card matching screenshot */}
          <div className="bg-[#FAF5EF] rounded-3xl p-6 border border-[#F1E4D4] shadow-xs text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-white mx-auto flex items-center justify-center shadow-xs">
              <ShoppingBag className="w-8 h-8 text-[#F97316]" />
            </div>
            <h4 className="text-base font-black text-gray-900">Complete Your Style</h4>
            <p className="text-xs text-gray-600">
              Turn your wishlist into a fashion statement today with quick nationwide delivery!
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              Start Shopping <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
