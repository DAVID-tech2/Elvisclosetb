import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BannerHero } from '../components/common/BannerHero';
import { ProductCard } from '../components/common/ProductCard';
import { storeService } from '../services/storeService';
import { ProductSize } from '../types';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

export const ShopPage: React.FC<{ forcedCollection?: 'men' | 'women' | 'accessories' | 'shoes' }> = ({
  forcedCollection,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || '';
  const urlFilter = searchParams.get('filter') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory || 'all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const allProducts = useMemo(() => storeService.getProducts(), []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // forcedCollection check (for /collections/men, /collections/women, etc.)
      if (forcedCollection && product.collection !== forcedCollection && product.collection !== 'all') {
        return false;
      }

      // URL search term
      if (urlSearch && !product.name.toLowerCase().includes(urlSearch.toLowerCase()) && !product.description.toLowerCase().includes(urlSearch.toLowerCase())) {
        return false;
      }

      // Best seller / new arrivals URL filter
      if (urlFilter === 'bestseller' && !product.isBestSeller) return false;
      if (urlFilter === 'new' && !product.isNewArrival) return false;

      // Category filter
      if (selectedCategory !== 'all') {
        if (!product.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
          return false;
        }
      }

      // Price range filter
      if (selectedPriceRange === '0-50k' && product.price > 50000) return false;
      if (selectedPriceRange === '50k-100k' && (product.price <= 50000 || product.price > 100000)) return false;
      if (selectedPriceRange === '100k-200k' && (product.price <= 100000 || product.price > 200000)) return false;
      if (selectedPriceRange === '200k+' && product.price <= 200000) return false;

      // Size filter
      if (selectedSize !== 'all') {
        if (!product.sizes.includes(selectedSize as ProductSize)) return false;
      }

      // Color filter
      if (selectedColor !== 'all') {
        const hasColor = product.colors.some((c) =>
          c.name.toLowerCase().includes(selectedColor.toLowerCase())
        );
        if (!hasColor) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    allProducts,
    forcedCollection,
    urlSearch,
    urlFilter,
    selectedCategory,
    selectedPriceRange,
    selectedSize,
    selectedColor,
    sortBy,
  ]);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setSelectedSize('all');
    setSelectedColor('all');
    setSortBy('featured');
    setCurrentPage(1);
    setSearchParams({});
  };

  // Dynamic header based on collection or general shop
  const heroConfig = forcedCollection === 'men'
    ? {
        badge: "MEN'S COLLECTION",
        title: "Men's Fashion",
        highlightedText: "Redefined",
        subtitle: "Discover the latest trends in men's fashion at unbeatable prices.",
        rightScript: "Dress Well. Live Better.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      }
    : forcedCollection === 'women'
    ? {
        badge: "WOMEN'S COLLECTION",
        title: "Women's Fashion",
        highlightedText: "Redefined",
        subtitle: "Discover the latest trends in women's fashion and express your unique style.",
        rightScript: "Look Good, Feel Amazing!",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      }
    : {
        badge: "SHOP OUR LATEST COLLECTION",
        title: "Fashion for",
        highlightedText: "Everyone",
        subtitle: "Discover timeless styles for men and women crafted for comfort, confidence and class at unbeatable prices.",
        rightScript: "Dress Well. Live Better.",
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
      };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Signature Ivory Hero Banner */}
      <BannerHero
        badge={heroConfig.badge}
        title={heroConfig.title}
        highlightedText={heroConfig.highlightedText}
        subtitle={heroConfig.subtitle}
        rightScript={heroConfig.rightScript}
        image={heroConfig.image}
      />

      {/* Main Two-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Mobile filter toggle */}
        <div className="lg:hidden w-full flex items-center justify-between pb-2 border-b border-gray-200">
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-800 shadow-xs"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#F97316]" />
            Filters & Refinements
          </button>
          <span className="text-xs text-gray-500 font-medium">
            {filteredProducts.length} Products
          </span>
        </div>

        {/* Left Filter Sidebar */}
        <aside
          className={`w-full lg:w-64 bg-white rounded-2xl p-5 border border-gray-100 shadow-xs space-y-6 ${
            showMobileFilter ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-extrabold text-sm text-gray-900 uppercase tracking-wider">
              Filter Products
            </h3>
            <button
              onClick={resetAllFilters}
              className="text-xs text-gray-400 hover:text-[#F97316] flex items-center gap-1 cursor-pointer"
              title="Reset Filters"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          {/* Filter by Category */}
          <div>
            <h4 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider mb-2.5">
              Categories
            </h4>
            <div className="space-y-1.5 text-xs text-gray-600">
              {[
                { label: 'All Items', value: 'all' },
                { label: "Men's Fashion", value: "Men's" },
                { label: "Women's Fashion", value: "Women's" },
                { label: 'Shoes', value: 'Shoes' },
                { label: 'Accessories', value: 'Accessories' },
                { label: 'Bags', value: 'Bags' },
                { label: 'Watches', value: 'Watches' },
                { label: 'Perfumes', value: 'Perfumes' },
              ].map((item) => (
                <label
                  key={item.value}
                  className="flex items-center gap-2.5 cursor-pointer py-1 hover:text-[#F97316]"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === item.value}
                    onChange={() => {
                      setSelectedCategory(item.value);
                      setCurrentPage(1);
                    }}
                    className="accent-[#F97316] w-3.5 h-3.5"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter by Price Range */}
          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider mb-2.5">
              Price Range (UGX)
            </h4>
            <div className="space-y-1.5 text-xs text-gray-600">
              {[
                { label: 'All Prices', value: 'all' },
                { label: 'UGX 0 - 50,000', value: '0-50k' },
                { label: 'UGX 50,001 - 100,000', value: '50k-100k' },
                { label: 'UGX 100,001 - 200,000', value: '100k-200k' },
                { label: 'UGX 200,001+', value: '200k+' },
              ].map((range) => (
                <label
                  key={range.value}
                  className="flex items-center gap-2.5 cursor-pointer py-1 hover:text-[#F97316]"
                >
                  <input
                    type="radio"
                    name="priceRange"
                    checked={selectedPriceRange === range.value}
                    onChange={() => {
                      setSelectedPriceRange(range.value);
                      setCurrentPage(1);
                    }}
                    className="accent-[#F97316] w-3.5 h-3.5"
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter by Size */}
          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider mb-2.5">
              Size
            </h4>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {['all', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => {
                    setSelectedSize(sz);
                    setCurrentPage(1);
                  }}
                  className={`py-1.5 rounded-lg font-bold text-center border transition-all cursor-pointer ${
                    selectedSize === sz
                      ? 'bg-[#111111] text-white border-black'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {sz === 'all' ? 'All' : sz}
                </button>
              ))}
            </div>
          </div>

          {/* Filter by Color */}
          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider mb-2.5">
              Colour
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'all', label: 'All', color: '#e5e7eb' },
                { name: 'Black', label: 'Black', color: '#111827' },
                { name: 'White', label: 'White', color: '#ffffff' },
                { name: 'Beige', label: 'Beige', color: '#D7C4B7' },
                { name: 'Brown', label: 'Brown', color: '#854D0E' },
                { name: 'Navy', label: 'Navy Blue', color: '#1E3A8A' },
                { name: 'Red', label: 'Red', color: '#DC2626' },
              ].map((col) => (
                <button
                  key={col.name}
                  type="button"
                  onClick={() => {
                    setSelectedColor(col.name);
                    setCurrentPage(1);
                  }}
                  title={col.label}
                  className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                    selectedColor === col.name
                      ? 'scale-115 border-[#F97316] ring-2 ring-orange-200'
                      : 'border-gray-200 hover:scale-105'
                  }`}
                  style={{ backgroundColor: col.color }}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Right Main Product Feed */}
        <main className="flex-1 w-full">
          {/* Top Sort & Count Bar */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-gray-500 font-semibold">
              Showing {(currentPage - 1) * itemsPerPage + 1}–
              {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{' '}
              {filteredProducts.length} products
            </span>

            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-800 py-1.5 px-3 focus:outline-none focus:border-[#F97316]"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rating</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
              <p className="text-gray-500 text-sm font-medium">No fashion products match your selected filters.</p>
              <button
                onClick={resetAllFilters}
                className="mt-4 px-4 py-2 bg-[#F97316] text-white text-xs font-bold rounded-xl"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Pagination Controls matching screenshot: 1, 2, 3, > */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-9 h-9 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                    currentPage === idx + 1
                      ? 'bg-[#F97316] text-white shadow-xs'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              {currentPage < totalPages && (
                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="w-9 h-9 rounded-xl font-bold text-xs bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  &gt;
                </button>
              )}
            </div>
          )}

          {/* Discount Banner at Bottom of Shop Page */}
          <div className="mt-14 bg-[#111111] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-neutral-800">
            <div>
              <span className="text-xs font-black text-[#F97316] uppercase tracking-widest">
                EXCLUSIVE OFFER
              </span>
              <h3 className="text-2xl font-black mt-1">Get 10% OFF on Your First Order</h3>
              <p className="text-xs text-gray-400 mt-1">
                Join our Mukono fashion club and stay updated with the latest trends & flash discounts.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-4 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white w-full sm:w-64 focus:outline-none focus:border-[#F97316]"
              />
              <button className="px-5 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-lg transition-colors shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
