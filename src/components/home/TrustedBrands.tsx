import React from 'react';

const BRANDS = [
  { name: 'ZARA', style: 'font-serif font-black tracking-widest text-xl' },
  { name: 'NIKE', style: 'font-sans italic font-black text-2xl tracking-tighter' },
  { name: 'GUCCI', style: 'font-serif tracking-[0.25em] text-lg font-bold' },
  { name: 'PRADA', style: 'font-serif tracking-[0.2em] text-lg font-extrabold' },
  { name: 'ADIDAS', style: 'font-sans font-black tracking-wide text-lg' },
  { name: 'TOMMY HILFIGER', style: 'font-sans tracking-widest text-xs font-bold' },
];

export const TrustedBrands: React.FC = () => {
  return (
    <section className="mb-14 py-8 border-y border-gray-100 bg-white rounded-2xl px-6">
      <div className="text-center mb-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
          Trusted By Top Brands & International Suppliers
        </h3>
      </div>

      <div className="flex flex-wrap items-center justify-around gap-8 opacity-75 hover:opacity-100 transition-opacity">
        {BRANDS.map((brand, idx) => (
          <div
            key={idx}
            className={`text-gray-800 hover:text-[#F97316] transition-colors cursor-default select-none ${brand.style}`}
          >
            {brand.name}
          </div>
        ))}
      </div>
    </section>
  );
};
