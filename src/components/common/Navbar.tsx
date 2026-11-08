import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Phone,
  ChevronDown,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Package,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const { cartCount, wishlist } = useStore();
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const isActive = (path: string) => location.pathname === path;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchInput.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="w-full bg-white sticky top-0 z-40 border-b border-gray-100 shadow-xs">
      {/* Top Black Announcement Bar */}
      <div className="bg-[#121212] text-gray-200 text-[10px] xs:text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-x-4 gap-y-1 text-center sm:text-left">
          {/* Free Delivery */}
          <div className="flex items-center gap-1.5 text-gray-300">
            <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-medium">Free Delivery in Uganda on Orders Over UGX 100,000</span>
          </div>

          {/* Secure Payments */}
          <div className="hidden md:flex items-center gap-1.5 text-gray-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>100% Secure Payments</span>
          </div>

          {/* Contact / WhatsApp */}
          <div className="flex items-center gap-1 text-gray-300">
            <Phone className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="hidden xs:inline">WhatsApp:</span>
            <a
              href="https://wa.me/256778781601"
              target="_blank"
              rel="noreferrer"
              className="text-amber-400 hover:text-amber-300 font-semibold"
            >
              +256 778 781601
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-[#F97316] focus:outline-none"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <div className="shrink-0">
          <Logo />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-semibold text-gray-700">
          <Link
            to="/"
            className={`transition-colors py-1 relative ${
              isActive('/')
                ? 'text-[#F97316] font-bold after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[2.5px] after:bg-[#F97316] after:rounded-full'
                : 'hover:text-[#F97316]'
            }`}
          >
            Home
          </Link>

          <Link
            to="/shop"
            className={`transition-colors py-1 relative ${
              isActive('/shop')
                ? 'text-[#F97316] font-bold after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[2.5px] after:bg-[#F97316] after:rounded-full'
                : 'hover:text-[#F97316]'
            }`}
          >
            Shop
          </Link>

          {/* Collections Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCollectionsOpen(true)}
            onMouseLeave={() => setCollectionsOpen(false)}
          >
            <button
              className={`flex items-center gap-1 py-1 transition-colors ${
                location.pathname.startsWith('/collections')
                  ? 'text-[#F97316] font-bold'
                  : 'hover:text-[#F97316]'
              }`}
            >
              Collections <ChevronDown className="w-4 h-4" />
            </button>

            {collectionsOpen && (
              <div className="absolute top-full left-0 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <Link
                  to="/collections/women"
                  className="block px-4 py-2 hover:bg-orange-50 hover:text-[#F97316] text-gray-700 text-sm"
                >
                  Women's Collection
                </Link>
                <Link
                  to="/collections/men"
                  className="block px-4 py-2 hover:bg-orange-50 hover:text-[#F97316] text-gray-700 text-sm"
                >
                  Men's Collection
                </Link>
                <Link
                  to="/collections/accessories"
                  className="block px-4 py-2 hover:bg-orange-50 hover:text-[#F97316] text-gray-700 text-sm"
                >
                  Accessories Collection
                </Link>
                <Link
                  to="/collections/shoes"
                  className="block px-4 py-2 hover:bg-orange-50 hover:text-[#F97316] text-gray-700 text-sm"
                >
                  Shoes Collection
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/categories"
            className={`transition-colors py-1 relative ${
              isActive('/categories')
                ? 'text-[#F97316] font-bold after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[2.5px] after:bg-[#F97316] after:rounded-full'
                : 'hover:text-[#F97316]'
            }`}
          >
            Categories
          </Link>

          {/* Pages Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setPagesOpen(true)}
            onMouseLeave={() => setPagesOpen(false)}
          >
            <button
              className={`flex items-center gap-1 py-1 transition-colors ${
                ['/about', '/faq', '/shipping-policy', '/returns-policy', '/order-tracking'].includes(
                  location.pathname
                )
                  ? 'text-[#F97316] font-bold'
                  : 'hover:text-[#F97316]'
              }`}
            >
              Pages <ChevronDown className="w-4 h-4" />
            </button>

            {pagesOpen && (
              <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                <Link
                  to="/about"
                  className="block px-4 py-2 hover:bg-orange-50 hover:text-[#F97316] text-gray-700 text-sm"
                >
                  About Elvis' Closet
                </Link>
                <Link
                  to="/order-tracking"
                  className="block px-4 py-2 hover:bg-orange-50 hover:text-[#F97316] text-gray-700 text-sm"
                >
                  Track Your Order
                </Link>
                <Link
                  to="/shipping-policy"
                  className="block px-4 py-2 hover:bg-orange-50 hover:text-[#F97316] text-gray-700 text-sm"
                >
                  Shipping & Delivery Policy
                </Link>
                <Link
                  to="/returns-policy"
                  className="block px-4 py-2 hover:bg-orange-50 hover:text-[#F97316] text-gray-700 text-sm"
                >
                  Return & Refund Policy
                </Link>
                <Link
                  to="/faq"
                  className="block px-4 py-2 hover:bg-orange-50 hover:text-[#F97316] text-gray-700 text-sm"
                >
                  Frequently Asked Questions
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/blog"
            className={`transition-colors py-1 relative ${
              isActive('/blog')
                ? 'text-[#F97316] font-bold after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[2.5px] after:bg-[#F97316] after:rounded-full'
                : 'hover:text-[#F97316]'
            }`}
          >
            Blog
          </Link>

          <Link
            to="/contact"
            className={`transition-colors py-1 relative ${
              isActive('/contact')
                ? 'text-[#F97316] font-bold after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[2.5px] after:bg-[#F97316] after:rounded-full'
                : 'hover:text-[#F97316]'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Search Input & Action Icons */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="relative hidden sm:block w-48 md:w-60 lg:w-72">
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-[#F97316] focus:bg-white transition-all text-gray-800 placeholder-gray-400"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </form>

          {/* User Account Icon */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="p-2 text-gray-700 hover:text-[#F97316] hover:bg-orange-50 rounded-full transition-colors relative"
              title={user ? user.fullName : 'Account'}
            >
              <User className="w-5 h-5" />
            </button>

            {userDropdownOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                onClick={() => setUserDropdownOpen(false)}
              >
                {user ? (
                  <>
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm font-bold text-gray-900 truncate">{user.fullName}</p>
                      <span className="inline-block px-2 py-0.5 mt-1 text-[10px] uppercase font-bold rounded-full bg-orange-100 text-[#F97316]">
                        {user.role}
                      </span>
                    </div>

                    <Link
                      to="/account"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#F97316]"
                    >
                      <User className="w-4 h-4" /> My Account
                    </Link>

                    <Link
                      to="/order-tracking"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#F97316]"
                    >
                      <Package className="w-4 h-4" /> Track Orders
                    </Link>

                    <Link
                      to="/admin"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-amber-700 font-semibold bg-amber-50/70 hover:bg-amber-100"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
                    </Link>

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left border-t border-gray-100 mt-1"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm font-semibold text-[#F97316] hover:bg-orange-50"
                    >
                      Sign In / Register
                    </Link>
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 border-t border-gray-100"
                    >
                      Admin Portal
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Wishlist Icon */}
          <Link
            to="/wishlist"
            className="p-2 text-gray-700 hover:text-[#F97316] hover:bg-orange-50 rounded-full transition-colors relative"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#F97316] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Shopping Cart Icon */}
          <Link
            to="/cart"
            className="p-2 text-gray-700 hover:text-[#F97316] hover:bg-orange-50 rounded-full transition-colors relative"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-[#F97316] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#F97316]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          <div className="grid grid-cols-2 gap-2 text-sm font-semibold pt-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-orange-50 text-gray-800"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-orange-50 text-gray-800"
            >
              Shop All
            </Link>
            <Link
              to="/collections/women"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-orange-50 text-gray-800"
            >
              Women's Collection
            </Link>
            <Link
              to="/collections/men"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-orange-50 text-gray-800"
            >
              Men's Collection
            </Link>
            <Link
              to="/collections/accessories"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-orange-50 text-gray-800"
            >
              Accessories
            </Link>
            <Link
              to="/collections/shoes"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-orange-50 text-gray-800"
            >
              Shoes
            </Link>
            <Link
              to="/order-tracking"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-orange-50 text-gray-800"
            >
              Track Order
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-orange-50 text-gray-800"
            >
              Contact Us
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="col-span-2 p-2 rounded-lg bg-orange-50 text-[#F97316] text-center font-bold"
            >
              Admin Dashboard →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
