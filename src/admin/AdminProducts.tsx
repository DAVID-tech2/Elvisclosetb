import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package,
  Plus,
  Search,
  Filter,
  Download,
  Edit2,
  Trash2,
  Eye,
  Copy,
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  AlertTriangle,
  Tag,
} from 'lucide-react';
import { storeService } from '../services/storeService';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

export const AdminProducts: React.FC = () => {
  const { formatUGX, showToast } = useStore();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>(() => storeService.getProducts());
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      storeService.deleteProduct(id);
      setProducts(storeService.getProducts());
      showToast(`Deleted "${name}"`, 'info');
    }
  };

  const handleDuplicate = (id: string) => {
    const dup = storeService.duplicateProduct(id);
    if (dup) {
      setProducts(storeService.getProducts());
      showToast(`Duplicated product: ${dup.name}`, 'success');
    }
  };

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesStat =
      selectedStatus === 'All' ||
      (selectedStatus === 'in_stock' && p.stockStatus === 'in_stock') ||
      (selectedStatus === 'low_stock' && p.stockStatus === 'low_stock') ||
      (selectedStatus === 'out_of_stock' && p.stockStatus === 'out_of_stock');
    return matchesSearch && matchesCat && matchesStat;
  });

  const totalInStock = products.filter((p) => p.stockStatus === 'in_stock').length;
  const totalLowStock = products.filter((p) => p.stockStatus === 'low_stock').length;
  const totalOutOfStock = products.filter((p) => p.stockStatus === 'out_of_stock').length;

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((p) => p.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb matching screenshot `file_000000000d588211af8ba304bf8a1768_59c8615e.png` */}
      <div className="text-xs text-gray-500 flex items-center gap-2">
        <Link to="/admin" className="hover:text-[#F97316]">
          Dashboard
        </Link>
        <span>&gt;</span>
        <span className="text-gray-900 font-bold">Products Management</span>
      </div>

      {/* Header with Title + Add New Product Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#F97316] flex items-center justify-center shadow-xs">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              Products Management
            </h1>
            <p className="text-xs text-gray-500">
              Manage your store products, update inventory and keep your catalogue fresh.
            </p>
          </div>
        </div>

        <Link
          to="/admin/products/add"
          className="px-5 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </Link>
      </div>

      {/* 4 Stat Cards from Screenshot */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Products */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-gray-500 font-bold block">Total Products</span>
              <span className="text-xl sm:text-2xl font-black text-gray-900">{products.length}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-2">
            <TrendingUp className="w-3 h-3" /> ↑ 5.7% <span className="text-gray-400 font-normal">vs last month</span>
          </div>
        </div>

        {/* In Stock */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-gray-500 font-bold block">In Stock</span>
              <span className="text-xl sm:text-2xl font-black text-gray-900">{totalInStock}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-2">
            <TrendingUp className="w-3 h-3" /> ↑ 6.2% <span className="text-gray-400 font-normal">vs last month</span>
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-gray-500 font-bold block">Low Stock (≤ 5)</span>
              <span className="text-xl sm:text-2xl font-black text-gray-900">{totalLowStock}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-amber-600 font-bold mt-2">
            <TrendingUp className="w-3 h-3" /> ↑ 2.1% <span className="text-gray-400 font-normal">requires reorder</span>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-gray-500 font-bold block">Out of Stock</span>
              <span className="text-xl sm:text-2xl font-black text-gray-900">{totalOutOfStock}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-rose-600 font-bold mt-2">
            <TrendingDown className="w-3 h-3" /> ↓ 1.3% <span className="text-gray-400 font-normal">improved stocking</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar matching screenshot */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Categories */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-bold text-gray-700 focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Men's Fashion">Men's Fashion</option>
            <option value="Women's Fashion">Women's Fashion</option>
            <option value="Footwear">Footwear / Shoes</option>
            <option value="Accessories">Accessories</option>
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-bold text-gray-700 focus:outline-none"
          >
            <option value="All">All Status</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#F97316] text-gray-900"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedStatus('All');
              setSearch('');
            }}
            className="px-3.5 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl font-bold text-gray-700 flex items-center gap-1.5"
          >
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
          <button
            onClick={() => showToast('Exported catalog to CSV', 'info')}
            className="px-3.5 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl font-bold text-gray-700 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Main Products Table matching screenshot */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[680px]">
            <thead className="bg-gray-50/70 border-b border-gray-100 text-gray-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filtered.length && filtered.length > 0}
                    onChange={toggleSelectAll}
                    className="accent-[#F97316] rounded"
                  />
                </th>
                <th className="py-4 px-2">Product</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Price (UGX)</th>
                <th className="py-4 px-4">Stock</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Added On</th>
                <th className="py-4 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => toggleSelectOne(item.id)}
                      className="accent-[#F97316] rounded"
                    />
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover border border-gray-100 shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                        <span className="text-[11px] text-gray-400 block line-clamp-1">
                          {item.subtitle || item.sku}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-bold">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-900">
                    {formatUGX(item.price).replace('UGX ', '')}
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-700">{item.stockQuantity}</td>
                  <td className="py-3 px-4">
                    {item.stockStatus === 'in_stock' ? (
                      <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> In Stock
                      </span>
                    ) : item.stockStatus === 'low_stock' ? (
                      <span className="inline-flex items-center gap-1.5 text-amber-700 font-bold text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-amber-500" /> Low Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-rose-700 font-bold text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-rose-500" /> Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-[11px]">
                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* Edit */}
                      <button
                        onClick={() => navigate(`/admin/products/add?editId=${item.id}`)}
                        className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Duplicate */}
                      <button
                        onClick={() => handleDuplicate(item.id)}
                        className="p-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                        title="Duplicate Product"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(item.id, item.name)}
                        className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {/* View on Storefront */}
                      <Link
                        to={`/product/${item.id}`}
                        target="_blank"
                        className="p-1.5 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View on Storefront"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination footer matching screenshot */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Showing 1 – {filtered.length} of {products.length} products</span>
          <div className="flex items-center gap-1">
            <span className="w-7 h-7 rounded-lg bg-[#F97316] text-white font-bold flex items-center justify-center">
              1
            </span>
            <span className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold flex items-center justify-center cursor-pointer">
              2
            </span>
            <span className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold flex items-center justify-center cursor-pointer">
              3
            </span>
            <span className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold flex items-center justify-center cursor-pointer">
              4
            </span>
            <span className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold flex items-center justify-center cursor-pointer">
              5
            </span>
            <span>...</span>
            <span className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold flex items-center justify-center cursor-pointer">
              87
            </span>
            <span className="px-2 py-1 bg-gray-50 text-gray-700 rounded-lg font-bold">»</span>
          </div>
        </div>
      </div>
    </div>
  );
};
