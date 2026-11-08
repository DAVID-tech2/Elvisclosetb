import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Heart,
  Instagram,
  Facebook,
  Youtube,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="w-full bg-[#121212] text-gray-300 mt-16 border-t border-neutral-800">
      {/* Newsletter Subscription Bar */}
      <div className="bg-[#1A1A1A] border-b border-neutral-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Newsletter Heading */}
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#F97316] flex items-center justify-center text-white shrink-0 shadow-md">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">Stay in the Loop</h3>
              <p className="text-xs text-gray-400">
                Get the latest fashion updates, flash sales and exclusive Mukono & Kampala offers.
              </p>
            </div>
          </div>

          {/* Subscription Input Form */}
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col xs:flex-row w-full sm:w-auto items-stretch xs:items-center max-w-md gap-2"
          >
            <div className="relative flex-1">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full sm:w-80 px-4 py-2.5 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-lg transition-colors shadow-sm shrink-0 flex items-center justify-center gap-1.5"
            >
              {subscribed ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Subscribed
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" /> Subscribe
                </>
              )}
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-[#F97316] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-[#F97316] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-[#F97316] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="TikTok"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-[#F97316] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-1 space-y-4">
            <Logo variant="dark" />
            <p className="text-xs text-gray-400 leading-relaxed">
              Mukono's premier fashion boutique delivering contemporary men's & women's fashion, shoes, and luxury accessories across Uganda.
            </p>
            <p className="text-xs text-amber-400 font-serif italic">
              Dress Better. Live Better.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-neutral-800 pb-1">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link to="/" className="hover:text-[#F97316] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#F97316] transition-colors">
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link to="/collections/all" className="hover:text-[#F97316] transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#F97316] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F97316] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#F97316] transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-neutral-800 pb-1">
              Customer Service
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link to="/shipping-policy" className="hover:text-[#F97316] transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns-policy" className="hover:text-[#F97316] transition-colors">
                  Return & Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/order-tracking" className="hover:text-[#F97316] transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#F97316] transition-colors">
                  Size Guide & Care
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F97316] transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-neutral-800 pb-1">
              Account
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link to="/account" className="hover:text-[#F97316] transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-[#F97316] transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-[#F97316] transition-colors">
                  Order History
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-[#F97316] transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#F97316] transition-colors">
                  Login / Register
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                  Administrator Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & Official Payment Methods */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-neutral-800 pb-1">
              Contact Us
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 mb-5">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                <a href="tel:+256778781601" className="hover:text-white">
                  +256 778 781601
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                <a href="mailto:elviselegantcloset@gmail.com" className="hover:text-white break-all">
                  elviselegantcloset@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F97316] shrink-0 mt-0.5" />
                <span>Mukono, Uganda (Jinja Rd)</span>
              </li>
            </ul>

            {/* Payment Method Badges (VISA, Mastercard, MTN Mobile Money, Airtel Money) */}
            <div className="pt-2 border-t border-neutral-800">
              <span className="text-[10px] text-gray-500 block mb-2 font-medium">
                SUPPORTED PAYMENTS
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {/* VISA */}
                <span className="px-2 py-1 bg-white rounded text-[#1A1F71] font-black text-[10px] tracking-tight">
                  VISA
                </span>
                {/* Mastercard */}
                <span className="px-2 py-1 bg-neutral-800 rounded text-red-500 font-bold text-[10px] flex items-center gap-0.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 -ml-1.5 inline-block opacity-80"></span>
                </span>
                {/* MTN Mobile Money */}
                <span className="px-2 py-1 bg-[#FFCC00] text-black font-extrabold text-[10px] rounded">
                  MTN MoMo
                </span>
                {/* Airtel Money */}
                <span className="px-2 py-1 bg-[#ED1C24] text-white font-extrabold text-[10px] rounded">
                  airtel
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-neutral-800 py-4 px-4 sm:px-6 lg:px-8 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p>© 2025 ELVIS' CLOSET. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Shop Smart. Dress Better. <Heart className="w-3 h-3 text-[#F97316] fill-[#F97316]" />
          </p>
        </div>
      </div>
    </footer>
  );
};
