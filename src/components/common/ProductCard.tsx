import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const { addToCart, toggleWishlist, isInWishlist, formatUGX } = useStore();
  const wishlisted = isInWishlist(product.id);

  const discountPercent =
    product.comparePrice && product.comparePrice > product.price
      ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
      : null;

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image & Badges */}
      <div className="relative aspect-square w-full bg-neutral-100 overflow-hidden">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0] || 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80'}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-xs z-10 ${
            wishlisted
              ? 'bg-rose-50 text-rose-500'
              : 'bg-white/90 text-gray-600 hover:text-[#F97316] hover:bg-white'
          }`}
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Discount Badge */}
        {discountPercent && (
          <span className="absolute top-3 left-3 bg-[#F97316] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
            -{discountPercent}%
          </span>
        )}

        {/* Stock status indicator */}
        {product.stockStatus === 'low_stock' && (
          <span className="absolute bottom-2 left-2 bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
            Low Stock ({product.stockQuantity})
          </span>
        )}
        {product.stockStatus === 'out_of_stock' && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className={`p-4 flex flex-col flex-1 justify-between ${compact ? 'p-3' : 'p-4'}`}>
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider truncate">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 text-[11px] font-semibold">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-gray-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <Link to={`/product/${product.id}`} className="block group-hover:text-[#F97316] transition-colors">
            <h3 className="text-sm font-bold text-gray-900 line-clamp-1 leading-snug">
              {product.name}
            </h3>
            {product.subtitle && (
              <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                {product.subtitle}
              </p>
            )}
          </Link>
        </div>

        {/* Price & Add to Cart button */}
        <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-extrabold text-[#F97316] tracking-tight">
              {formatUGX(product.price)}
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="text-[11px] text-gray-400 line-through">
                {formatUGX(product.comparePrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            disabled={product.stockStatus === 'out_of_stock'}
            className="px-3 py-2 bg-[#121212] hover:bg-[#F97316] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg transition-all duration-200 flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
