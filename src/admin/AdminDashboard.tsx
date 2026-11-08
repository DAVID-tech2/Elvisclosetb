import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Users,
  Coins,
  Package,
  TrendingUp,
  ArrowUpRight,
  PlusCircle,
  Eye,
  Percent,
} from 'lucide-react';
import { storeService } from '../services/storeService';
import { useStore } from '../context/StoreContext';

export const AdminDashboard: React.FC = () => {
  const { formatUGX } = useStore();
  const products = storeService.getProducts();
  const orders = storeService.getOrders();
  const [timeframe, setTimeframe] = useState('Last 30 Days');

  return (
    <div className="space-y-6">
      {/* Page Title & Welcome */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Welcome back, Admin! Here's what's happening with your store today.
        </p>
      </div>

      {/* 4 Stat Cards matching screenshot `file_0000000002d48211a79143d58155e916_190545d1.png` */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Orders */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">Total Orders</span>
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-gray-900">1,248</span>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>↑ 12.5%</span>
              <span className="text-gray-400 font-normal">vs last month</span>
            </div>
          </div>

          {/* Mini Sparkline svg */}
          <div className="mt-3 h-8 w-full">
            <svg className="w-full h-full text-orange-400 stroke-current fill-none" viewBox="0 0 100 25">
              <path d="M0,20 Q20,5 40,15 T80,8 T100,2" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">Total Customers</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-gray-900">8,756</span>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>↑ 18.2%</span>
              <span className="text-gray-400 font-normal">vs last month</span>
            </div>
          </div>

          {/* Sparkline svg */}
          <div className="mt-3 h-8 w-full">
            <svg className="w-full h-full text-blue-400 stroke-current fill-none" viewBox="0 0 100 25">
              <path d="M0,22 Q25,18 50,12 T80,6 T100,3" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">Total Revenue</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
              UGX
            </div>
          </div>

          <div className="mt-3">
            <span className="text-xl sm:text-2xl font-black text-gray-900">UGX 45,620,000</span>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>↑ 22.1%</span>
              <span className="text-gray-400 font-normal">vs last month</span>
            </div>
          </div>

          {/* Sparkline svg */}
          <div className="mt-3 h-8 w-full">
            <svg className="w-full h-full text-emerald-400 stroke-current fill-none" viewBox="0 0 100 25">
              <path d="M0,24 Q20,12 40,16 T75,8 T100,2" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">Total Products</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-gray-900">432</span>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>↑ 5.7%</span>
              <span className="text-gray-400 font-normal">active products</span>
            </div>
          </div>

          {/* Sparkline svg */}
          <div className="mt-3 h-8 w-full">
            <svg className="w-full h-full text-purple-400 stroke-current fill-none" viewBox="0 0 100 25">
              <path d="M0,18 Q30,22 60,10 T85,12 T100,5" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Middle Grid: Sales Overview Chart + Recent Orders Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Overview Chart (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" /> Sales Overview
            </h3>

            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-xs font-bold rounded-lg px-2.5 py-1 text-gray-700 focus:outline-none"
            >
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last Year">Last Year</option>
            </select>
          </div>

          {/* Interactive Chart Graphic matching screenshot */}
          <div className="relative pt-4">
            {/* Tooltip dot callout */}
            <div className="absolute top-8 right-16 bg-[#111111] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md z-10 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#F97316]" /> UGX 38,500K
            </div>

            <svg className="w-full h-56" viewBox="0 0 500 200">
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="#f3f4f6" strokeDasharray="3 3" />
              <line x1="40" y1="65" x2="480" y2="65" stroke="#f3f4f6" strokeDasharray="3 3" />
              <line x1="40" y1="110" x2="480" y2="110" stroke="#f3f4f6" strokeDasharray="3 3" />
              <line x1="40" y1="155" x2="480" y2="155" stroke="#f3f4f6" strokeDasharray="3 3" />

              {/* Y Axis labels */}
              <text x="10" y="24" fill="#9ca3af" fontSize="10">40K</text>
              <text x="10" y="69" fill="#9ca3af" fontSize="10">30K</text>
              <text x="10" y="114" fill="#9ca3af" fontSize="10">20K</text>
              <text x="10" y="159" fill="#9ca3af" fontSize="10">10K</text>

              {/* Gradient Area Fill */}
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F97316" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
                </linearGradient>
              </defs>

              <path
                d="M50,150 L95,120 L140,110 L185,135 L230,105 L275,120 L320,80 L365,100 L410,50 L455,75 L455,190 L50,190 Z"
                fill="url(#salesGrad)"
              />

              {/* Main Line */}
              <path
                d="M50,150 L95,120 L140,110 L185,135 L230,105 L275,120 L320,80 L365,100 L410,50 L455,75"
                fill="none"
                stroke="#F97316"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {[
                [50, 150], [95, 120], [140, 110], [185, 135],
                [230, 105], [275, 120], [320, 80], [365, 100],
                [410, 50], [455, 75]
              ].map(([cx, cy], i) => (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r="4"
                  fill="#ffffff"
                  stroke="#F97316"
                  strokeWidth="2.5"
                />
              ))}
            </svg>

            {/* X Axis dates matching screenshot */}
            <div className="flex justify-between px-6 text-[10px] text-gray-400 font-bold -mt-2">
              <span>Jul 1</span>
              <span>Jul 7</span>
              <span>Jul 14</span>
              <span>Jul 21</span>
              <span>Jul 27</span>
            </div>
          </div>
        </div>

        {/* Recent Orders Table (5 Cols) matching screenshot */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-black text-gray-900 flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-gray-700" /> Recent Orders
              </h3>
              <Link to="/admin/orders" className="text-xs font-bold text-[#F97316] hover:underline">
                View All Orders →
              </Link>
            </div>

            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs min-w-[340px]">
                <thead>
                  <tr className="text-gray-400 text-[10px] font-bold uppercase pb-2">
                    <th className="pb-2">#</th>
                    <th className="pb-2">Customer</th>
                    <th className="pb-2">Total</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.slice(0, 5).map((ord) => (
                    <tr key={ord.id} className="hover:bg-gray-50/60">
                      <td className="py-2.5 font-bold font-mono text-gray-900">{ord.orderNumber}</td>
                      <td className="py-2.5 font-medium text-gray-800 truncate max-w-[100px]">
                        {ord.customer.fullName}
                      </td>
                      <td className="py-2.5 font-bold text-gray-900">{formatUGX(ord.total)}</td>
                      <td className="py-2.5">
                        <span
                          className={`inline-block px-2 py-0.5 text-[9px] font-bold rounded-full ${
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
                      <td className="py-2.5 text-right text-gray-400 text-[10px]">
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Quick Actions, Top Selling Products, System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Quick Actions (4 Cols) */}
        <div className="md:col-span-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-gray-900 flex items-center gap-1.5">
            ⚡ Quick Actions
          </h3>

          <div className="grid grid-cols-2 gap-3 text-center">
            <Link
              to="/admin/products/add"
              className="p-4 rounded-xl bg-orange-50/70 hover:bg-orange-100 border border-orange-100 transition-colors flex flex-col items-center justify-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F97316] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <PlusCircle className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-900">Add Product</span>
            </Link>

            <Link
              to="/admin/orders"
              className="p-4 rounded-xl bg-blue-50/70 hover:bg-blue-100 border border-blue-100 transition-colors flex flex-col items-center justify-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-900">Manage Orders</span>
            </Link>

            <Link
              to="/admin/customers"
              className="p-4 rounded-xl bg-emerald-50/70 hover:bg-emerald-100 border border-emerald-100 transition-colors flex flex-col items-center justify-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-900">View Customers</span>
            </Link>

            <Link
              to="/admin/content"
              className="p-4 rounded-xl bg-purple-50/70 hover:bg-purple-100 border border-purple-100 transition-colors flex flex-col items-center justify-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Percent className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-900">Create Coupon</span>
            </Link>
          </div>
        </div>

        {/* Top Selling Products (5 Cols) matching screenshot */}
        <div className="md:col-span-5 bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <h3 className="text-sm font-black text-gray-900 flex items-center gap-1.5">
              🏆 Top Selling Products
            </h3>
            <Link to="/admin/products" className="text-xs font-bold text-[#F97316] hover:underline">
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            {[
              {
                name: "Men's Casual Jacket",
                price: 120000,
                sold: '482 sold',
                image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=200&q=80',
              },
              {
                name: "Elegant Women's Dress",
                price: 95000,
                sold: '367 sold',
                image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=200&q=80',
              },
              {
                name: "Men's Classic Polo",
                price: 185000,
                sold: '327 sold',
                image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=200&q=80',
              },
              {
                name: 'Trendy Sneakers',
                price: 85000,
                sold: '321 sold',
                image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=200&q=80',
              },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-10 h-10 rounded-xl object-cover border border-gray-100 shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 line-clamp-1">{p.name}</h4>
                    <span className="text-[#F97316] font-bold block">{formatUGX(p.price)}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-orange-100 text-[#F97316] font-black text-[10px] rounded-md shrink-0">
                  {p.sold}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Stats (3 Cols) Circular gauges matching screenshot: 98%, 95%, 92% */}
        <div className="md:col-span-3 bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-gray-900 flex items-center gap-1.5">
            ⚙️ System Stats
          </h3>

          <div className="flex justify-around items-center pt-2">
            {/* Site Uptime 98% */}
            <div className="text-center">
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-100 stroke-current"
                    strokeWidth="3.5"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-emerald-500 stroke-current"
                    strokeWidth="3.5"
                    strokeDasharray="98, 100"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-black text-xs text-gray-900">98%</span>
              </div>
              <span className="text-[10px] font-bold text-gray-500 block mt-2">Site Uptime</span>
            </div>

            {/* Order Success 95% */}
            <div className="text-center">
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-100 stroke-current"
                    strokeWidth="3.5"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#F97316] stroke-current"
                    strokeWidth="3.5"
                    strokeDasharray="95, 100"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-black text-xs text-gray-900">95%</span>
              </div>
              <span className="text-[10px] font-bold text-gray-500 block mt-2">Order Success</span>
            </div>

            {/* Customer Satisfaction 92% */}
            <div className="text-center">
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-100 stroke-current"
                    strokeWidth="3.5"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-blue-500 stroke-current"
                    strokeWidth="3.5"
                    strokeDasharray="92, 100"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-black text-xs text-gray-900">92%</span>
              </div>
              <span className="text-[10px] font-bold text-gray-500 block mt-2">Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
