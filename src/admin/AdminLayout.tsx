import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  FolderTree,
  Tag,
  Star,
  Truck,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  ExternalLink,
  Bell,
  Search,
  PlusCircle,
  Sliders,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/common/Logo';
import { storeService } from '../services/storeService';

export const AdminLayout: React.FC = () => {
  const { user, logout, switchRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [productSubmenuOpen, setProductSubmenuOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const isPrefixActive = (path: string) => location.pathname.startsWith(path);

  const pendingOrdersCount = storeService
    .getOrders()
    .filter((o) => o.orderStatus === 'Pending Payment' || o.orderStatus === 'Processing').length;

  const unreadMessagesCount = storeService
    .getMessages()
    .filter((m) => m.status === 'unread').length;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex text-[#1F2937]">
      {/* Dark Sidebar matching exact screenshots `file_0000000002d48211a79143d58155e916_190545d1.png` */}
      <aside className="w-64 bg-[#121212] text-gray-300 flex flex-col justify-between shrink-0 border-r border-neutral-800 hidden md:flex">
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-neutral-800">
            <Logo variant="dark" size="sm" />
          </div>

          {/* User Profile Card */}
          <div className="p-4 mx-3 my-3 bg-neutral-900/80 rounded-2xl border border-neutral-800 flex items-center gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                alt="Admin Avatar"
                className="w-10 h-10 rounded-full object-cover border border-amber-500/50"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-neutral-900" />
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-white truncate">Admin</span>
              </div>
              <span className="text-[10px] text-gray-400 block truncate">Super Administrator</span>
              <span className="text-[9px] text-emerald-400 font-bold block mt-0.5">• Online</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1 text-xs font-semibold">
            <Link
              to="/admin"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                isActive('/admin')
                  ? 'bg-[#F97316] text-white font-bold shadow-xs'
                  : 'text-gray-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            {/* Products Management dropdown */}
            <div>
              <button
                type="button"
                onClick={() => setProductSubmenuOpen(!productSubmenuOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                  isPrefixActive('/admin/products')
                    ? 'bg-[#F97316] text-white font-bold'
                    : 'text-gray-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4" />
                  <span>Products Management</span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    productSubmenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {productSubmenuOpen && (
                <div className="pl-9 pr-2 py-1 space-y-1">
                  <Link
                    to="/admin/products"
                    className={`block py-1.5 px-2 rounded-lg text-[11px] transition-colors ${
                      isActive('/admin/products')
                        ? 'text-[#F97316] font-bold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    • View Products
                  </Link>
                  <Link
                    to="/admin/products/add"
                    className={`flex items-center gap-1.5 py-1.5 px-2 rounded-lg text-[11px] transition-colors ${
                      isActive('/admin/products/add')
                        ? 'text-[#F97316] font-bold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <PlusCircle className="w-3 h-3 text-[#F97316]" /> Add Product
                  </Link>
                </div>
              )}
            </div>

            {/* Orders Management */}
            <Link
              to="/admin/orders"
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                isActive('/admin/orders')
                  ? 'bg-[#F97316] text-white font-bold shadow-xs'
                  : 'text-gray-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders Management</span>
              </div>
              {pendingOrdersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center">
                  {pendingOrdersCount}
                </span>
              )}
            </Link>

            {/* Customers */}
            <Link
              to="/admin/customers"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                isActive('/admin/customers')
                  ? 'bg-[#F97316] text-white font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customers</span>
            </Link>

            {/* Categories */}
            <Link
              to="/admin/categories"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                isActive('/admin/categories')
                  ? 'bg-[#F97316] text-white font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <FolderTree className="w-4 h-4" />
              <span>Categories</span>
            </Link>

            {/* Content & Carousel Management */}
            <Link
              to="/admin/content"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                isActive('/admin/content')
                  ? 'bg-[#F97316] text-white font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Homepage & Banners</span>
            </Link>

            {/* Delivery Management (Separate from Payment!) */}
            <Link
              to="/admin/delivery"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                isActive('/admin/delivery')
                  ? 'bg-[#F97316] text-white font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Delivery Management</span>
            </Link>

            {/* Support Messages */}
            <Link
              to="/admin/messages"
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                isActive('/admin/messages')
                  ? 'bg-[#F97316] text-white font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4" />
                <span>Support Messages</span>
              </div>
              {unreadMessagesCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center">
                  {unreadMessagesCount}
                </span>
              )}
            </Link>

            {/* Store Settings */}
            <Link
              to="/admin/settings"
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                isActive('/admin/settings')
                  ? 'bg-[#F97316] text-white font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>

            {/* Logout */}
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors cursor-pointer text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Badge matching screenshot */}
        <div className="p-4 border-t border-neutral-800 text-center space-y-1">
          <div className="text-amber-400 font-serif italic text-xs font-bold tracking-wider">
            👑 ELVIS' CLOSET
          </div>
          <span className="text-[10px] text-gray-500 block">Admin Panel v1.0.0</span>
          <span className="text-[9px] text-gray-600 block">© 2025 ELVIS' CLOSET</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header matching exact screenshot `file_0000000002d48211a79143d58155e916_190545d1.png` */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 sticky top-0 z-30 shadow-xs">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-[#F97316] rounded-lg hover:bg-gray-100"
            aria-label="Toggle admin sidebar"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Search bar */}
          <div className="relative w-60 md:w-96 hidden sm:block">
            <input
              type="text"
              placeholder="Search products, orders, customers..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs focus:outline-none focus:border-[#F97316] focus:bg-white text-gray-900"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Right Header items */}
          <div className="flex items-center gap-2.5 sm:gap-4 ml-auto">
            {/* Store Status Online Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Store Status: Online</span>
            </div>

            {/* Notification Bell */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-black flex items-center justify-center">
                8
              </span>
            </button>

            {/* Date time */}
            <span className="hidden sm:inline-block text-xs text-gray-500 font-medium">
              Jul 27, 2025 - 10:24 AM
            </span>

            {/* User Avatar Circle */}
            <div className="w-8 h-8 rounded-full bg-[#F97316] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              A
            </div>

            {/* View Store button */}
            <Link
              to="/"
              className="px-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>View Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileSidebarOpen && (
          <div className="md:hidden bg-[#121212] text-gray-200 border-b border-neutral-800 p-4 space-y-2 animate-in slide-in-from-top-2">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Admin Navigation
              </span>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav className="space-y-1 text-xs">
              <Link
                to="/admin"
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl ${
                  isActive('/admin') ? 'bg-[#F97316] text-white font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/admin/products"
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl ${
                  isActive('/admin/products') ? 'bg-[#F97316] text-white font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Products Management</span>
              </Link>
              <Link
                to="/admin/orders"
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl ${
                  isActive('/admin/orders') ? 'bg-[#F97316] text-white font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Orders Management</span>
              </Link>
              <Link
                to="/admin/customers"
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl ${
                  isActive('/admin/customers') ? 'bg-[#F97316] text-white font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Customers</span>
              </Link>
              <Link
                to="/admin/content"
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl ${
                  isActive('/admin/content') ? 'bg-[#F97316] text-white font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>Homepage & Banners</span>
              </Link>
              <Link
                to="/admin/delivery"
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl ${
                  isActive('/admin/delivery') ? 'bg-[#F97316] text-white font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>Delivery Management</span>
              </Link>
              <Link
                to="/admin/settings"
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl ${
                  isActive('/admin/settings') ? 'bg-[#F97316] text-white font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
        )}

        {/* Nested Page Routes */}
        <div className="p-6 sm:p-8 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
