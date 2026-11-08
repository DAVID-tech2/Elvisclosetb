import React, { useState } from 'react';
import { Search, Mail, Phone, ShoppingBag, Eye, UserCheck, ShieldCheck } from 'lucide-react';
import { storeService } from '../services/storeService';
import { useStore } from '../context/StoreContext';

interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  joinedDate: string;
  status: 'Active' | 'VIP' | 'New';
  avatar: string;
}

export const AdminCustomers: React.FC = () => {
  const { formatUGX } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  // Sample and dynamic customer list built from orders and seed accounts
  const customers: CustomerRecord[] = [
    {
      id: 'CUST-001',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phone: '+256 700 123 456',
      ordersCount: 4,
      totalSpent: 485000,
      joinedDate: 'Jul 10, 2025',
      status: 'VIP',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'CUST-002',
      name: 'Mary Atieno',
      email: 'mary.atieno@gmail.com',
      phone: '+256 772 987 654',
      ordersCount: 3,
      totalSpent: 380000,
      joinedDate: 'Jul 15, 2025',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'CUST-003',
      name: 'David Mugisha',
      email: 'david.mugisha@gmail.com',
      phone: '+256 773 456 789',
      ordersCount: 2,
      totalSpent: 240000,
      joinedDate: 'Jul 20, 2025',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'CUST-004',
      name: 'Sarah Nakitende',
      email: 'sarah.nakitende@gmail.com',
      phone: '+256 705 654 321',
      ordersCount: 5,
      totalSpent: 620000,
      joinedDate: 'Jun 28, 2025',
      status: 'VIP',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'CUST-005',
      name: 'Brian Okello',
      email: 'brian.okello@gmail.com',
      phone: '+256 701 234 567',
      ordersCount: 1,
      totalSpent: 75000,
      joinedDate: 'Jul 23, 2025',
      status: 'New',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80',
    },
  ];

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Customer Management</h1>
          <p className="text-xs text-gray-500 mt-1">
            View registered customer profiles, purchase records, and Ugandan delivery contacts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs font-bold">
            Total Customers: {customers.length}
          </span>
        </div>
      </div>

      {/* Customer Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Active Buyers</span>
            <div className="text-2xl font-black text-gray-900 mt-1">8,756</div>
            <span className="text-[11px] text-emerald-600 font-bold mt-1 block">↑ 18.2% vs last month</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#F97316] flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">VIP Members</span>
            <div className="text-2xl font-black text-gray-900 mt-1">1,240</div>
            <span className="text-[11px] text-emerald-600 font-bold mt-1 block">Spent &gt; UGX 400,000</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Average Order</span>
            <div className="text-2xl font-black text-gray-900 mt-1">{formatUGX(145000)}</div>
            <span className="text-[11px] text-gray-500 mt-1 block">Per checkout session</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customer by name, email, or Ugandan phone number..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#F97316] focus:bg-white text-gray-900"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4 text-center">Orders</th>
                <th className="py-3 px-4">Total Spent</th>
                <th className="py-3 px-4">Joined Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((cust) => (
                <tr key={cust.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={cust.avatar}
                        alt={cust.name}
                        className="w-9 h-9 rounded-full object-cover border border-gray-200"
                      />
                      <div>
                        <div className="font-bold text-gray-900">{cust.name}</div>
                        <span className="text-[10px] text-gray-400 font-mono">{cust.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 space-y-0.5">
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <Mail className="w-3 h-3 text-gray-400" />
                      <span className="text-[11px]">{cust.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Phone className="w-3 h-3 text-gray-400" />
                      <span className="text-[11px] font-mono">{cust.phone}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-gray-800">
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                      {cust.ordersCount}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    {formatUGX(cust.totalSpent)}
                  </td>
                  <td className="py-3.5 px-4 text-gray-500">{cust.joinedDate}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        cust.status === 'VIP'
                          ? 'bg-purple-100 text-purple-700'
                          : cust.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {cust.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <a
                      href={`https://wa.me/${cust.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg inline-flex items-center justify-center transition-colors"
                      title="Contact on WhatsApp"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
