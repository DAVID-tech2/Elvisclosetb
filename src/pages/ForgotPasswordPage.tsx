import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BannerHero } from '../components/common/BannerHero';
import {
  Lock,
  Mail,
  Send,
  MessageSquare,
  ShieldCheck,
  Zap,
  Headphones,
  ShoppingBag,
  CheckCircle,
} from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailOrPhone.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner */}
      <BannerHero
        badge="ACCOUNT RECOVERY"
        title="Forgot"
        highlightedText="Password?"
        subtitle="Don't worry! We'll help you get back into your account in just a few quick steps."
        rightScript="Reset. Access. Shop Again."
        image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
      />

      <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xs mb-14 text-center">
        <div className="w-16 h-16 rounded-2xl bg-orange-50 text-[#F97316] flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-black text-gray-900">Reset Your Password</h2>
        <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
          Enter your email address or phone number and we'll send you a reset link or verification code.
        </p>

        {submitted ? (
          <div className="mt-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-center space-y-3">
            <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-sm font-bold text-gray-900">Recovery Instructions Sent</h3>
            <p className="text-xs text-gray-600">
              We've dispatched a recovery link to <span className="font-bold">{emailOrPhone}</span>. Please check your inbox or SMS messages.
            </p>
            <Link
              to="/login"
              className="inline-block mt-3 px-5 py-2 bg-[#F97316] text-white text-xs font-bold rounded-xl"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs text-left">
            <div>
              <label className="block text-gray-700 font-bold mb-1">
                Email address or phone number *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. david@gmail.com or +256 700 123 456"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] focus:bg-white text-gray-900"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" /> Send Reset Link
            </button>

            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <span className="relative bg-white px-3 text-xs text-gray-400 font-bold uppercase">
                OR
              </span>
            </div>

            {/* Need Help WhatsApp Box matching screenshot */}
            <div className="bg-orange-50/70 rounded-2xl p-4 border border-orange-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <Headphones className="w-6 h-6 text-[#F97316] shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Need Help?</h4>
                  <p className="text-[10px] text-gray-500">Contact our support team for assistance.</p>
                </div>
              </div>
              <a
                href="https://wa.me/256778781601"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl font-bold text-xs text-gray-800 flex items-center gap-1.5 shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" /> Chat on WhatsApp
              </a>
            </div>
          </form>
        )}
      </div>

      {/* 4 Feature Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-center gap-3">
          <ShieldCheck className="w-7 h-7 text-gray-900 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-gray-900">Your Security</h4>
            <p className="text-[10px] text-gray-500">Your account is safe with us</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-center gap-3">
          <Zap className="w-7 h-7 text-gray-900 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-gray-900">Quick Recovery</h4>
            <p className="text-[10px] text-gray-500">Get back access fast</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-center gap-3">
          <Headphones className="w-7 h-7 text-gray-900 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-gray-900">24/7 Support</h4>
            <p className="text-[10px] text-gray-500">We're here to help</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-center gap-3">
          <ShoppingBag className="w-7 h-7 text-gray-900 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-gray-900">Shop with Confidence</h4>
            <p className="text-[10px] text-gray-500">Continue shopping worry-free</p>
          </div>
        </div>
      </div>
    </div>
  );
};
