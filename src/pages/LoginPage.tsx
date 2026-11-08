import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BannerHero } from '../components/common/BannerHero';
import {
  Lock,
  Mail,
  User,
  Phone,
  Eye,
  EyeOff,
  ShieldCheck,
  Zap,
  Tag,
  Headphones,
  CheckCircle,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, register, switchRole } = useAuth();
  const navigate = useNavigate();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('david@gmail.com');
  const [loginPassword, setLoginPassword] = useState('elvis1234');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  const [message, setMessage] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login(loginEmail, loginPassword);
    if (res.success) {
      navigate('/account');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail) return;
    const res = await register(regName, regEmail, regPhone, regPassword);
    if (res.success) {
      setMessage('Account created successfully! Welcome to Elvis Closet.');
      setTimeout(() => navigate('/account'), 1000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Signature Ivory Hero */}
      <BannerHero
        badge="WELCOME BACK!"
        title="Login or"
        highlightedText="Register"
        subtitle="Access your account, track orders and enjoy a personalized boutique shopping experience."
        rightScript="Shop Smart. Shop Better."
        image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
      />

      {message && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          {message}
        </div>
      )}

      {/* Two Column Side-by-Side: Login & Register matching screenshot `IMG-20261108-WA0002_de2704f5.jpg` */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
        {/* Left Column: Login */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#F97316] flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900">Login to Your Account</h2>
                <p className="text-xs text-gray-500">Welcome back! Please sign in to continue.</p>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs mt-6">
              <div>
                <label className="block text-gray-700 font-bold mb-1">
                  Email Address or Phone Number *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Enter your email or phone number"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] focus:bg-white text-gray-900"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Password *</label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] focus:bg-white text-gray-900"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-[#F97316] rounded"
                  />
                  <span>Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="font-bold text-[#F97316] hover:text-[#EA580C]"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl transition-colors shadow-md mt-2 cursor-pointer"
              >
                Login →
              </button>
            </form>

            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <span className="relative bg-white px-3 text-xs text-gray-400 font-bold uppercase">
                OR
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={() => handleLoginSubmit({ preventDefault: () => {} } as React.FormEvent)}
                className="py-2.5 px-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl font-semibold text-gray-700 flex items-center justify-center gap-2 transition-colors"
              >
                <span className="text-[#4285F4] font-bold">G</span> Google
              </button>
              <button
                type="button"
                onClick={() => handleLoginSubmit({ preventDefault: () => {} } as React.FormEvent)}
                className="py-2.5 px-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl font-semibold text-gray-700 flex items-center justify-center gap-2 transition-colors"
              >
                <span className="text-[#1877F2] font-bold">f</span> Facebook
              </button>
            </div>
          </div>

          {/* Quick Demo Switcher */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <span className="text-[11px] text-gray-400 block mb-2 font-medium">Quick Role Switcher for Review:</span>
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={() => switchRole('customer')}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg"
              >
                Customer Role
              </button>
              <button
                type="button"
                onClick={() => {
                  switchRole('admin');
                  navigate('/admin');
                }}
                className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg"
              >
                Super Admin Role →
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Register */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#F97316] flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900">Create a New Account</h2>
                <p className="text-xs text-gray-500">Join ELVIS' CLOSET and enjoy exclusive benefits.</p>
              </div>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs mt-6">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Full Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] focus:bg-white text-gray-900"
                  />
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Email Address *</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] focus:bg-white text-gray-900"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Phone Number *</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="Enter your phone number (e.g. +256 700 123 456)"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] focus:bg-white text-gray-900"
                  />
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">
                  Password (min. 8 characters) *
                </label>
                <div className="relative">
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    required
                    placeholder="Create a strong password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F97316] focus:bg-white text-gray-900"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl transition-colors shadow-md mt-4 cursor-pointer"
              >
                Create Account →
              </button>

              <p className="text-[11px] text-gray-400 text-center leading-relaxed mt-2">
                By creating an account, you agree to our{' '}
                <Link to="/returns-policy" className="underline hover:text-gray-600">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link to="/shipping-policy" className="underline hover:text-gray-600">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* 4 Feature Badges at Bottom matching screenshot */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-center gap-3">
          <ShieldCheck className="w-7 h-7 text-gray-900 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-gray-900">Secure & Private</h4>
            <p className="text-[10px] text-gray-500">Your data is safe with us</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-center gap-3">
          <Zap className="w-7 h-7 text-gray-900 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-gray-900">Fast Checkout</h4>
            <p className="text-[10px] text-gray-500">Shop in just a few clicks</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-center gap-3">
          <Tag className="w-7 h-7 text-gray-900 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-gray-900">Exclusive Offers</h4>
            <p className="text-[10px] text-gray-500">Get special deals & promo codes</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-center gap-3">
          <Headphones className="w-7 h-7 text-gray-900 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-gray-900">24/7 Support</h4>
            <p className="text-[10px] text-gray-500">We're here to help anytime</p>
          </div>
        </div>
      </div>
    </div>
  );
};
