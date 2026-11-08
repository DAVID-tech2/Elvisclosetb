import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { INITIAL_TESTIMONIALS } from '../../services/storeService';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="mb-14">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-[11px] font-black uppercase tracking-widest text-[#F97316] bg-orange-100/70 px-3 py-1 rounded-full">
          COMMUNITY FEEDBACK
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-2">
          What Our Customers Say
        </h2>
        <p className="text-xs text-gray-500 mt-1">Real reviews from our shoppers across Uganda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {INITIAL_TESTIMONIALS.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                "{item.comment}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-5 mt-4 border-t border-gray-100">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover border border-orange-200"
              />
              <div>
                <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1">
                  {item.name}
                  {item.verified && (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 inline-block" />
                  )}
                </h4>
                <p className="text-[10px] text-emerald-600 font-semibold">Verified Buyer</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
