import React from 'react';
import { Link } from 'react-router-dom';

const COLLECTIONS = [
  {
    id: 'women',
    title: "Women's Collection",
    link: '/collections/women',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    itemCount: '48 Items',
  },
  {
    id: 'men',
    title: "Men's Collection",
    link: '/collections/men',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    itemCount: '36 Items',
  },
  {
    id: 'accessories',
    title: 'Accessories Collection',
    link: '/collections/accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
    itemCount: '24 Items',
  },
  {
    id: 'shoes',
    title: 'Shoes Collection',
    link: '/collections/shoes',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
    itemCount: '20 Items',
  },
];

export const CollectionsSection: React.FC = () => {
  return (
    <section className="mb-14">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
        {COLLECTIONS.map((col) => (
          <Link
            key={col.id}
            to={col.link}
            className="group relative bg-[#FAF7F2] border border-[#F1E8DC] rounded-xl sm:rounded-2xl p-2.5 sm:p-4 flex items-center justify-between gap-2 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300"
          >
            <div className="z-10 flex flex-col justify-between py-0.5 sm:py-1 min-w-0">
              <div>
                <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  {col.itemCount}
                </span>
                <h3 className="text-xs sm:text-base font-extrabold text-gray-900 group-hover:text-[#F97316] transition-colors mt-0.5 line-clamp-1 sm:line-clamp-none">
                  {col.title}
                </h3>
              </div>

              <span className="text-[10px] sm:text-xs font-bold text-[#F97316] flex items-center gap-1 mt-2 sm:mt-4 group-hover:translate-x-1 transition-transform">
                Shop Now →
              </span>
            </div>

            <div className="relative w-14 h-14 xs:w-16 xs:h-16 sm:w-24 sm:h-24 rounded-lg sm:rounded-xl overflow-hidden shrink-0 border border-white shadow-xs">
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
