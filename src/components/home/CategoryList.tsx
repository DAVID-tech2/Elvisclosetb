import React from 'react';
import { Link } from 'react-router-dom';
import { storeService } from '../../services/storeService';

export const CategoryList: React.FC = () => {
  const categories = storeService.getCategories();

  return (
    <section className="mb-14">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Shop By Category
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">Explore our curated boutique departments</p>
        </div>
        <Link
          to="/categories"
          className="text-xs font-bold text-[#F97316] hover:text-[#EA580C] transition-colors"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-4 sm:gap-6 text-center">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/shop?category=${encodeURIComponent(cat.name)}`}
            className="group flex flex-col items-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 p-1 border-2 border-transparent group-hover:border-[#F97316] group-hover:shadow-md transition-all duration-300 overflow-hidden shrink-0">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-xs font-bold text-gray-800 group-hover:text-[#F97316] mt-2.5 transition-colors line-clamp-1">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
