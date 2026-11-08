import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeroCarousel } from '../components/home/HeroCarousel';
import { CollectionsSection } from '../components/home/CollectionsSection';
import { SpecialDealsBanner } from '../components/home/SpecialDealsBanner';
import { CategoryList } from '../components/home/CategoryList';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { TrustedBrands } from '../components/home/TrustedBrands';
import { InstagramGallery } from '../components/home/InstagramGallery';
import { ProductCard } from '../components/common/ProductCard';
import { storeService } from '../services/storeService';
import { Product } from '../types';

export const HomePage: React.FC = () => {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);

  useEffect(() => {
    const all = storeService.getProducts().filter((p) => p.visibility === 'public');
    setBestSellers(all.filter((p) => p.isBestSeller).slice(0, 5));
    setNewArrivals(all.filter((p) => p.isNewArrival).slice(0, 5));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* 5-Slide Hero Carousel */}
      <HeroCarousel />

      {/* 4 Collections Showcase */}
      <CollectionsSection />

      {/* Best Sellers Section */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Best Sellers
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Most loved styles ordered by our customers</p>
          </div>
          <Link
            to="/shop?filter=bestseller"
            className="text-xs font-bold text-[#F97316] hover:text-[#EA580C] transition-colors"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              New Arrivals
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Fresh drops just added to the Mukono closet</p>
          </div>
          <Link
            to="/shop?filter=new"
            className="text-xs font-bold text-[#F97316] hover:text-[#EA580C] transition-colors"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Dynamic Special Deals Banner with Real Countdown */}
      <SpecialDealsBanner />

      {/* Shop By Category */}
      <CategoryList />

      {/* Customer Testimonials */}
      <TestimonialsSection />

      {/* Trusted Brands */}
      <TrustedBrands />

      {/* Instagram Gallery */}
      <InstagramGallery />
    </div>
  );
};
