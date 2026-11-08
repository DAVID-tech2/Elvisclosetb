import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { BannerHero } from '../components/common/BannerHero';
import { storeService } from '../services/storeService';
import {
  LayoutDashboard,
  Package,
  MapPin,
  Heart,
  User,
  KeyRound,
  LogOut,
  ShoppingBag,
  ExternalLink,
  Edit2,
  Check,
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();
  const { cartCount, wishlist, formatUGX } = useStore();
  const orders = storeService.getOrders();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'addresses' | 'profile' | 'password'>('dashboard');
  const [editingProfile, setEditingProfile] = useState(false);
  const [nameInput, setNameInput] = useState(user?.fullName || 'David Muhwana');
  const [phoneInput, setPhoneInput] = useState(user?.phone || '+256 700 123 456');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ fullName: nameInput, phone: phoneInput });
    setEditingProfile(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner */}
      <BannerHero
        badge="CUSTOMER PORTAL"
        title="My"
        highlightedText="Account"
        subtitle="Manage your orders, saved addresses and preferences all in one place."
        rightScript="Dress Better. Feel Greater."
        image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start mb-14">
        {/* Left Sidebar Menu */}
        <aside className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs space-y-6">
          <div>
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider px-3 mb-2">
              Account Menu
            </h4>
            <nav className="space-y-1 text-xs font-bold">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl transition-colors cursor-pointer text-left ${
                  activeTab === 'dashboard'
                    ? 'bg-[#F97316] text-white shadow-xs'
                    : 'text-gray-700 hover:bg-orange-50 hover:text-[#F97316]'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl transition-colors cursor-pointer text-left ${
                  activeTab === 'orders'
                    ? 'bg-[#F97316] text-white shadow-xs'
                    : 'text-gray-700 hover:bg-orange-50 hover:text-[#F97316]'
                }`}
              >
                <Package className="w-4 h-4" /> My Orders
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl transition-colors cursor-pointer text-left ${
                  activeTab === 'addresses'
                    ? 'bg-[#F97316] text-white shadow-xs'
                    : 'text-gray-700 hover:bg-orange-50 hover:text-[#F97316]'
                }`}
              >
                <MapPin className="w-4 h-4" /> My Addresses
              </button>

              <Link
                to="/wishlist"
                className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-[#F97316] transition-colors"
              >
                <Heart className="w-4 h-4" /> Wishlist ({wishlist.length})
              </Link>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl transition-colors cursor-pointer text-left ${
                  activeTab === 'profile'
                    ? 'bg-[#F97316] text-white shadow-xs'
                    : 'text-gray-700 hover:bg-orange-50 hover:text-[#F97316]'
                }`}
              >
                <User className="w-4 h-4" /> Account Details
              </button>

              <button
                onClick={() => setActiveTab('password')}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl transition-colors cursor-pointer text-left ${
                  activeTab === 'password'
                    ? 'bg-[#F97316] text-white shadow-xs'
                    : 'text-gray-700 hover:bg-orange-50 hover:text-[#F97316]'
                }`}
              >
                <KeyRound className="w-4 h-4" /> Change Password
              </button>

              <button
                onClick={logout}
                className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left pt-2 border-t border-gray-100"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </nav>
          </div>

          {/* Need Help Box */}
          <div className="bg-orange-50/70 rounded-2xl p-4 border border-orange-100 text-xs space-y-2">
            <span className="font-extrabold text-gray-900 block">Need Help?</span>
            <p className="text-gray-600 text-[11px]">Our Mukono support team is here for you.</p>
            <Link
              to="/contact"
              className="font-bold text-[#F97316] hover:text-[#EA580C] text-[11px] block"
            >
              Contact Support →
            </Link>
          </div>
        </aside>

        {/* Right Main Content */}
        <main className="lg:col-span-3 space-y-6">
          {/* Welcome Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-gray-400">Welcome back,</p>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5">
                {user?.fullName || 'David Muhwana'}
              </h2>
              <p className="text-xs text-gray-500">{user?.email || 'david@gmail.com'}</p>
            </div>

            <button
              onClick={() => setEditingProfile(!editingProfile)}
              className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5 text-[#F97316]" /> Edit Profile
            </button>
          </div>

          {/* Edit Profile inline drawer */}
          {editingProfile && (
            <form
              onSubmit={handleSaveProfile}
              className="bg-white rounded-3xl p-6 border border-[#F97316]/30 shadow-sm space-y-4 text-xs animate-in fade-in"
            >
              <h3 className="font-bold text-gray-900 text-sm">Update Profile Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white text-gray-900"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#F97316] text-white font-bold rounded-xl flex items-center gap-1"
                >
                  <Check className="w-4 h-4" /> Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProfile(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* 4 Stat Cards from Screenshot */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
              <span className="text-gray-400 text-xs font-bold block">Total Orders</span>
              <span className="text-2xl font-black text-gray-900 mt-1 block">
                {orders.length}
              </span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
              <span className="text-gray-400 text-xs font-bold block">Cart Items</span>
              <span className="text-2xl font-black text-gray-900 mt-1 block">
                {cartCount}
              </span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
              <span className="text-gray-400 text-xs font-bold block">Wishlist Items</span>
              <span className="text-2xl font-black text-gray-900 mt-1 block">
                {wishlist.length}
              </span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
              <span className="text-gray-400 text-xs font-bold block">Store Credit</span>
              <span className="text-xl font-black text-[#F97316] mt-1 block font-mono">
                UGX 0
              </span>
            </div>
          </div>

          {/* Your Recent Orders Table */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-sm text-gray-900">Your Recent Orders</h3>
              <Link to="/order-tracking" className="text-xs font-bold text-[#F97316] hover:underline">
                View All Orders →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase text-[11px] pb-2">
                    <th className="pb-3">Order #</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Items</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.slice(0, 4).map((ord) => (
                    <tr key={ord.id} className="hover:bg-gray-50/60">
                      <td className="py-3.5 font-bold font-mono text-gray-900">{ord.orderNumber}</td>
                      <td className="py-3.5 text-gray-500">
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 text-gray-700">
                        {ord.items.length} {ord.items.length === 1 ? 'item' : 'items'}
                      </td>
                      <td className="py-3.5 font-bold text-gray-900">{formatUGX(ord.total)}</td>
                      <td className="py-3.5">
                        <span
                          className={`inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                            ord.orderStatus === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-700'
                              : ord.orderStatus === 'Processing'
                              ? 'bg-blue-100 text-blue-700'
                              : ord.orderStatus === 'Out for Delivery'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {ord.orderStatus}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <Link
                          to={`/order-tracking?orderNumber=${encodeURIComponent(ord.orderNumber)}`}
                          className="px-3 py-1 bg-gray-50 hover:bg-orange-50 hover:text-[#F97316] text-gray-700 border border-gray-200 rounded-lg font-bold text-[11px] inline-flex items-center gap-1"
                        >
                          Details <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2 Bottom Cards: Addresses + Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Your Addresses */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <h4 className="font-bold text-xs text-gray-900">Your Default Address</h4>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  Default
                </span>
              </div>
              <p className="text-xs font-bold text-gray-900">David Muhwana</p>
              <p className="text-xs text-gray-600">Plot 12, Kampala Road, Kampala</p>
              <p className="text-xs text-gray-600">Central Region, Uganda</p>
              <p className="text-xs text-gray-600">+256 700 123 456</p>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-3">
              <h4 className="font-bold text-xs text-gray-900 border-b border-gray-100 pb-2">
                Quick Actions
              </h4>
              <div className="space-y-2 text-xs">
                <Link
                  to="/order-tracking"
                  className="w-full flex items-center justify-between p-2.5 bg-gray-50 hover:bg-orange-50 hover:text-[#F97316] rounded-xl font-bold transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#F97316]" /> Track My Order
                  </span>
                  <span>→</span>
                </Link>

                <button
                  onClick={() => setEditingProfile(true)}
                  className="w-full flex items-center justify-between p-2.5 bg-gray-50 hover:bg-orange-50 hover:text-[#F97316] rounded-xl font-bold transition-colors cursor-pointer text-left"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#F97316]" /> Update Profile
                  </span>
                  <span>→</span>
                </button>

                <Link
                  to="/forgot-password"
                  className="w-full flex items-center justify-between p-2.5 bg-gray-50 hover:bg-orange-50 hover:text-[#F97316] rounded-xl font-bold transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-[#F97316]" /> Change Password
                  </span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
