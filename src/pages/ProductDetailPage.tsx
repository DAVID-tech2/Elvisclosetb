import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  Check,
} from 'lucide-react';
import { storeService } from '../services/storeService';
import { useStore } from '../context/StoreContext';
import { Product, ProductSize } from '../types';
import { ProductCard } from '../components/common/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, toggleWishlist, isInWishlist, formatUGX } = useStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize>('M');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'shipping'>('description');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!id) return;
    const item = storeService.getProductById(id);
    if (item) {
      setProduct(item);
      setSelectedImageIndex(0);
      setSelectedSize(item.sizes[0] || 'M');
      setSelectedColor(item.colors[0]?.name || '');
      setQuantity(1);

      // Fetch related items in same category or collection
      const related = storeService
        .getProducts()
        .filter((p) => p.id !== item.id && (p.category === item.category || p.collection === item.collection))
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-black text-gray-900">Product Not Found</h2>
        <p className="text-gray-500 mt-2">The item you are looking for is no longer available.</p>
        <Link
          to="/shop"
          className="mt-4 inline-block px-6 py-2.5 bg-[#F97316] text-white font-bold rounded-xl"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5 flex-wrap">
        <Link to="/" className="hover:text-[#F97316]">
          Home
        </Link>
        <span>&gt;</span>
        <Link to="/shop" className="hover:text-[#F97316]">
          Shop
        </Link>
        <span>&gt;</span>
        <Link
          to={`/collections/${product.collection}`}
          className="hover:text-[#F97316] capitalize"
        >
          {product.category}
        </Link>
        <span>&gt;</span>
        <span className="text-gray-900 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Two-Column Detail Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-xs mb-14">
        {/* Left Column: Image Gallery & Zoom */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-100 border border-gray-100 shadow-xs group">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="absolute top-4 left-4 bg-[#F97316] text-white text-xs font-black px-3 py-1 rounded-full shadow-xs">
                SALE
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    selectedImageIndex === idx
                      ? 'border-[#F97316] ring-2 ring-orange-200'
                      : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information & Controls */}
        <div className="space-y-6">
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-[#F97316] bg-orange-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight mt-2">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-3xl font-black text-[#F97316]">
                {formatUGX(product.price)}
              </span>
              {product.comparePrice && product.comparePrice > product.price && (
                <span className="text-lg text-gray-400 line-through">
                  {formatUGX(product.comparePrice)}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-gray-900">{product.rating.toFixed(1)}</span>
              <span>({product.reviewsCount} reviews)</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          {product.colors.length > 0 && (
            <div>
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-2">
                Colour: <span className="text-[#F97316] font-normal">{selectedColor}</span>
              </label>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    title={c.name}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                      selectedColor === c.name
                        ? 'border-[#F97316] ring-2 ring-orange-200 scale-110'
                        : 'border-gray-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {selectedColor === c.name && (
                      <Check className={`w-3.5 h-3.5 ${['#FFFFFF', '#F9FAFB', '#D7C4B7'].includes(c.hex) ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Size: <span className="text-[#F97316] font-normal">{selectedSize}</span>
                </label>
                <Link to="/faq" className="text-[11px] text-gray-400 hover:text-[#F97316] underline">
                  Size Guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-10 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#121212] text-white border-black shadow-xs'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div>
            <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-2">
              Quantity:
            </label>
            <div className="flex items-center w-32 bg-gray-50 border border-gray-200 rounded-xl p-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="flex-1 text-center font-bold text-xs text-gray-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => addToCart(product, selectedSize, selectedColor, quantity)}
              className="flex-1 py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-sm font-extrabold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`px-5 py-3.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                wishlisted
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-600' : ''}`} />
              {wishlisted ? 'Saved' : 'Add to Wishlist'}
            </button>
          </div>

          {/* 3 Pillars from Screenshot */}
          <div className="grid grid-cols-3 gap-2 pt-6 border-t border-gray-100 text-center text-[11px] text-gray-600">
            <div className="flex flex-col items-center gap-1 p-2 bg-gray-50 rounded-xl">
              <Truck className="w-4 h-4 text-[#F97316]" />
              <span className="font-bold text-gray-900">Free Delivery</span>
              <span className="text-[10px] text-gray-400">Across Uganda</span>
            </div>

            <div className="flex flex-col items-center gap-1 p-2 bg-gray-50 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-[#F97316]" />
              <span className="font-bold text-gray-900">Secure Payment</span>
              <span className="text-[10px] text-gray-400">100% Secure</span>
            </div>

            <div className="flex flex-col items-center gap-1 p-2 bg-gray-50 rounded-xl">
              <RotateCcw className="w-4 h-4 text-[#F97316]" />
              <span className="font-bold text-gray-900">Easy Returns</span>
              <span className="text-[10px] text-gray-400">7 Days Return</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description, Reviews, Shipping & Returns */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xs mb-14">
        <div className="flex items-center gap-6 border-b border-gray-100 pb-4 mb-6 text-sm font-bold">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-2 relative cursor-pointer ${
              activeTab === 'description'
                ? 'text-[#F97316] after:absolute after:bottom-[-17px] after:left-0 after:w-full after:h-0.5 after:bg-[#F97316]'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-2 relative cursor-pointer ${
              activeTab === 'reviews'
                ? 'text-[#F97316] after:absolute after:bottom-[-17px] after:left-0 after:w-full after:h-0.5 after:bg-[#F97316]'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Reviews ({product.reviewsCount})
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-2 relative cursor-pointer ${
              activeTab === 'shipping'
                ? 'text-[#F97316] after:absolute after:bottom-[-17px] after:left-0 after:w-full after:h-0.5 after:bg-[#F97316]'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Shipping & Returns
          </button>
        </div>

        {activeTab === 'description' && (
          <div className="text-xs sm:text-sm text-gray-600 space-y-3 leading-relaxed">
            <p>{product.description}</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
              <li>Premium grade material designed for durability and comfort</li>
              <li>Stylish and versatile cut suitable for day or evening wear</li>
              <li>Pre-washed to minimize shrinkage and maintain rich saturation</li>
              <li>Care instructions: Machine wash cold with like colors, air dry recommended</li>
            </ul>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-gray-50 p-6 rounded-2xl">
              <div className="text-center sm:text-left">
                <span className="text-4xl font-black text-gray-900">{product.rating.toFixed(1)}</span>
                <div className="flex text-amber-500 my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-gray-500">Based on {product.reviewsCount} customer ratings</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 border border-gray-100 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-900">Brian K. (Kampala)</span>
                  <span className="text-gray-400">July 15, 2025</span>
                </div>
                <div className="flex text-amber-400 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-gray-600">
                  Amazing quality! Fits perfectly and the material feels expensive. Delivered promptly to Mukono.
                </p>
              </div>

              <div className="p-4 border border-gray-100 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-900">Precious N. (Entebbe)</span>
                  <span className="text-gray-400">July 10, 2025</span>
                </div>
                <div className="flex text-amber-400 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-gray-600">
                  Stylish and affordable. Highly recommend Elvis' Closet for all your fashion needs!
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="text-xs sm:text-sm text-gray-600 space-y-3 leading-relaxed">
            <h4 className="font-bold text-gray-900">Delivery Arrangements:</h4>
            <p>
              In accordance with our boutique policy, transport fees are agreed with our customer service team after payment is completed. Orders are dispatched across Uganda (Kampala, Entebbe, Jinja, Mbarara, and all major districts).
            </p>
            <h4 className="font-bold text-gray-900 mt-4">7-Day Return Guarantee:</h4>
            <p>
              If your clothing doesn't fit or requires exchange, notify us on WhatsApp (+256 778 781601) within 7 days of receiving your package in its original condition.
            </p>
          </div>
        )}
      </div>

      {/* You May Also Like */}
      {relatedProducts.length > 0 && (
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              You May Also Like
            </h2>
            <Link to="/shop" className="text-xs font-bold text-[#F97316] hover:text-[#EA580C]">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
