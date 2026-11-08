import React from 'react';
import { Instagram } from 'lucide-react';

const INSTAGRAM_SHOTS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80',
];

export const InstagramGallery: React.FC = () => {
  return (
    <section className="mb-14">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Follow Us On Instagram
          </h2>
          <p className="text-xs text-gray-500">Tag @elviselegantcloset to be featured in our boutique gallery</p>
        </div>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white rounded-full text-xs font-bold shadow-xs hover:opacity-90 transition-opacity"
        >
          <Instagram className="w-3.5 h-3.5" /> Follow @elviselegantcloset
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {INSTAGRAM_SHOTS.map((url, idx) => (
          <a
            key={idx}
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-2xs block"
          >
            <img
              src={url}
              alt={`Elvis Closet Look ${idx + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Instagram className="w-6 h-6" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
