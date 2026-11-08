import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <div className="w-24 h-24 mx-auto rounded-3xl bg-orange-50 text-[#F97316] flex items-center justify-center mb-6 shadow-xs">
        <ShoppingBag className="w-12 h-12" />
      </div>
      <span className="text-xs font-black uppercase tracking-widest text-[#F97316] bg-orange-100/70 px-3 py-1 rounded-full">
        404 ERROR
      </span>
      <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight mt-3">
        Page Not Found
      </h1>
      <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-md mx-auto">
        The boutique fashion page or product look you were looking for doesn't exist or has moved.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Homepage
        </Link>
        <Link
          to="/shop"
          className="px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-colors"
        >
          Browse All Products
        </Link>
      </div>
    </div>
  );
};
