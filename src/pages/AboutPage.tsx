import React from 'react';
import { BannerHero } from '../components/common/BannerHero';
import {
  Compass,
  Target,
  Gem,
  Truck,
  ShieldCheck,
  Headphones,
  Tag,
} from 'lucide-react';

const TEAM_MEMBERS = [
  {
    name: 'David Muhwana',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Sarah Nakato',
    role: 'Head of Fashion',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Michael Ssekitto',
    role: 'Operations Lead',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Grace Namulondo',
    role: 'Customer Relations',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
  },
];

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Signature Banner */}
      <BannerHero
        badge="ABOUT US"
        title="About"
        highlightedText="ELVIS' CLOSET"
        subtitle="Fashion. Style. You. — More than just a store, we are Uganda's contemporary fashion destination."
        rightScript="Dress Better. Live Better."
        image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
      />

      {/* Story & Mission Section matching screenshot `IMG-20261108-WA0013_28895022.jpg` */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left Physical Boutique Photo */}
        <div className="lg:col-span-4 rounded-3xl overflow-hidden shadow-md border border-gray-100 bg-neutral-900 aspect-4/5">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
            alt="Elvis Closet Boutique Storefront"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Center Story */}
        <div className="lg:col-span-5 space-y-4 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#F97316] bg-orange-100/70 px-3 py-1 rounded-full">
            Our Story
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Redefining Fashion in Uganda
          </h2>
          <div className="text-xs sm:text-sm text-gray-600 space-y-3 leading-relaxed">
            <p>
              <strong className="text-gray-900">ELVIS' CLOSET</strong> was born from a simple idea — to make stylish, high-quality fashion accessible to everyone in Uganda. We noticed that many people, especially young and fashion-forward individuals, struggled to find trendy, affordable and reliable fashion pieces. So, we decided to change that.
            </p>
            <p>
              Today, ELVIS' CLOSET is a trusted online fashion store, offering the latest trends for men and women, with seamless shopping, secure Mobile Money payments and fast nationwide delivery from Mukono across all major cities and districts.
            </p>
          </div>
        </div>

        {/* Right Mission / Vision / Values Cards */}
        <div className="lg:col-span-3 space-y-3">
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-gray-900">Our Mission</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                To inspire confidence through stylish and affordable fashion.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-gray-900">Our Vision</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                To become Uganda's leading online fashion and lifestyle brand.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
              <Gem className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-gray-900">Our Values</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Style, Quality, Customer Satisfaction and Uncompromising Trust.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us: 4 Pillars */}
      <section className="mb-16">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#F97316] bg-orange-100/70 px-3 py-1 rounded-full">
            Why Choose Us
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-2">
            Shop with Confidence
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            At ELVIS' CLOSET, we go the extra mile to give you the best fashion shopping experience.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center mx-auto">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-extrabold text-gray-900">Fast Delivery</h4>
            <p className="text-[11px] text-gray-500">Across Uganda</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-extrabold text-gray-900">Secure Payments</h4>
            <p className="text-[11px] text-gray-500">Mobile Money & Cards</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center mx-auto">
              <Headphones className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-extrabold text-gray-900">Dedicated Support</h4>
            <p className="text-[11px] text-gray-500">Call & WhatsApp</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center mx-auto">
              <Tag className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-extrabold text-gray-900">Trendy & Affordable</h4>
            <p className="text-[11px] text-gray-500">Unbeatable Prices</p>
          </div>
        </div>
      </section>

      {/* The People Behind ELVIS' CLOSET (Team Members from Screenshot) */}
      <section className="mb-14">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#F97316] bg-orange-100/70 px-3 py-1 rounded-full">
            Our Team
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-2">
            The People Behind ELVIS' CLOSET
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            A passionate team dedicated to bringing you the best in fashion.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs text-center group hover:shadow-md transition-all"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mx-auto mb-3 border-2 border-orange-200 group-hover:scale-105 transition-transform">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900">{member.name}</h4>
              <p className="text-[11px] text-gray-500 font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
