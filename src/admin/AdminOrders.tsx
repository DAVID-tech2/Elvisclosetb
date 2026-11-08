import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Download,
  Filter,
  Search,
  CheckCircle,
  Clock,
  Truck,
  RotateCcw,
  Eye,
  Edit,
  Trash2,
  X,
  TrendingUp,
  TrendingDown,
  Phone,
  MapPin,
  Save,
} from 'lucide-react';
import { storeService } from '../services/storeService';
import { useStore } from '../context/StoreContext';
import { Order, OrderStatus, DeliveryArrangementStatus } from '../types';

export const AdminOrders: React.FC = () => {
  const { formatUGX, showToast } = useStore();
  const [orders, setOrders] = useState<Order[]>(() => storeService.getOrders());

  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('All');
  const [selectedDateRange, setSelectedDateRange] = useState('Last 30 Days');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Update modal state
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalType, setModalType] = useState<'view' | 'update' | null>(null);
  const [editStatus, setEditStatus] = useState<OrderStatus>('Processing');
  const [editDeliveryStatus, setEditDeliveryStatus] = useState<DeliveryArrangementStatus>('Not Contacted');
  const [editAgreedFee, setEditAgreedFee] = useState('');
  const [editNotes, setEditNotes] = useState('');

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.phone.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || o.orderStatus === selectedStatus;
    const matchesMethod =
      selectedPaymentMethod === 'All' || o.paymentMethod.includes(selectedPaymentMethod);
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.orderStatus === 'Pending Payment' || o.orderStatus === 'Processing').length;
  const deliveredOrders = orders.filter((o) => o.orderStatus === 'Delivered').length;
  const cancelledOrders = orders.filter((o) => o.orderStatus === 'Cancelled').length;

  const openUpdateModal = (ord: Order) => {
    setSelectedOrder(ord);
    setEditStatus(ord.orderStatus);
    setEditDeliveryStatus(ord.deliveryArrangementStatus);
    setEditAgreedFee(ord.agreedTransportFee ? ord.agreedTransportFee.toString() : '');
    setEditNotes(ord.internalNotes || '');
    setModalType('update');
  };

  const openViewModal = (ord: Order) => {
    setSelectedOrder(ord);
    setModalType('view');
  };

  const handleSaveOrderUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    storeService.updateOrderStatus(selectedOrder.id, editStatus);
    storeService.updateDeliveryArrangementStatus(
      selectedOrder.id,
      editDeliveryStatus,
      editAgreedFee ? parseInt(editAgreedFee, 10) : undefined,
      editNotes
    );

    setOrders(storeService.getOrders());
    showToast(`Updated order ${selectedOrder.orderNumber}`, 'success');
    setModalType(null);
  };

  const handleDelete = (id: string, num: string) => {
    if (window.confirm(`Delete order ${num}?`)) {
      const remaining = orders.filter((o) => o.id !== id);
      setOrders(remaining);
      showToast(`Removed order ${num}`, 'info');
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb matching screenshot `file_0000000031d88211b00c43cf9c918040_b18c10ef.png` */}
      <div className="text-xs text-gray-500 flex items-center gap-2">
        <Link to="/admin" className="hover:text-[#F97316]">
          Dashboard
        </Link>
        <span>&gt;</span>
        <span className="text-gray-900 font-bold">Orders Management</span>
      </div>

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#F97316] flex items-center justify-center shadow-xs">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              Orders Management
            </h1>
            <p className="text-xs text-gray-500">
              View, manage and update customer orders and separate delivery arrangements.
            </p>
          </div>
        </div>

        <button
          onClick={() => showToast('Exported orders CSV', 'info')}
          className="px-5 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" /> Export Orders
        </button>
      </div>

      {/* 4 Stat Cards from Screenshot */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Orders */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-gray-500 font-bold block">Total Orders</span>
              <span className="text-xl sm:text-2xl font-black text-gray-900">{totalOrders}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-2">
            <TrendingUp className="w-3 h-3" /> ↑ 12.5% <span className="text-gray-400 font-normal">vs last month</span>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-gray-500 font-bold block">Pending Orders</span>
              <span className="text-xl sm:text-2xl font-black text-gray-900">{pendingOrders}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-2">
            <TrendingUp className="w-3 h-3" /> ↑ 8.2% <span className="text-gray-400 font-normal">in queue</span>
          </div>
        </div>

        {/* Delivered Orders */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] text-gray-500 font-bold block">Delivered Orders</span>
              <span className="text-xl sm:text-2xl font-black text-gray-900">{deliveredOrders}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-2">
            <TrendingUp className="w-3 h-3" /> ↑ 15.3% <span className="text-gray-400 font-normal">completed</span>
          </div>
        </div>

        {/* Cancelled Orders */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-gray-500 font-bold block">Cancelled Orders</span>
              <span className="text-xl sm:text-2xl font-black text-gray-900">{cancelledOrders}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-rose-600 font-bold mt-2">
            <TrendingDown className="w-3 h-3" /> ↓ 3.1% <span className="text-gray-400 font-normal">decreased</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar matching screenshot */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by order number, customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#F97316] text-gray-900"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Statuses */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-bold text-gray-700 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Pending Payment">Pending Payment</option>
            <option value="Processing">Processing</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* Payment Methods */}
          <select
            value={selectedPaymentMethod}
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-bold text-gray-700 focus:outline-none"
          >
            <option value="All">All Payment Methods</option>
            <option value="MTN">MTN Mobile Money</option>
            <option value="Airtel">Airtel Money</option>
            <option value="Card">VISA / Card Payment</option>
          </select>

          {/* Date range */}
          <select
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-bold text-gray-700 focus:outline-none"
          >
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="All Time">All Time</option>
          </select>

          <button
            onClick={() => {
              setSearch('');
              setSelectedStatus('All');
              setSelectedPaymentMethod('All');
            }}
            className="px-4 py-2 bg-[#F97316] text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Orders Table matching screenshot `file_0000000031d88211b00c43cf9c918040_b18c10ef.png` */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[720px]">
            <thead className="bg-gray-50/70 border-b border-gray-100 text-gray-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredOrders.length && filteredOrders.length > 0}
                    onChange={() => {
                      if (selectedIds.length === filteredOrders.length) setSelectedIds([]);
                      else setSelectedIds(filteredOrders.map((o) => o.id));
                    }}
                    className="accent-[#F97316] rounded"
                  />
                </th>
                <th className="py-4 px-2">#</th>
                <th className="py-4 px-4">Customer</th>
                <th className="py-4 px-4">Items</th>
                <th className="py-4 px-4">Total (UGX)</th>
                <th className="py-4 px-4">Payment Method</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Order Date</th>
                <th className="py-4 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(ord.id)}
                      onChange={() => {
                        setSelectedIds((prev) =>
                          prev.includes(ord.id) ? prev.filter((i) => i !== ord.id) : [...prev, ord.id]
                        );
                      }}
                      className="accent-[#F97316] rounded"
                    />
                  </td>
                  <td className="py-3 px-2 font-bold font-mono text-gray-900">{ord.orderNumber}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-orange-100 text-[#F97316] font-bold flex items-center justify-center shrink-0">
                        {ord.customer.fullName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{ord.customer.fullName}</h4>
                        <span className="text-[10px] text-gray-500 font-medium block">
                          {ord.customer.phone}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      {ord.items[0] && (
                        <img
                          src={ord.items[0].image}
                          alt="Product"
                          className="w-8 h-8 rounded-lg object-cover border border-gray-100"
                        />
                      )}
                      <span className="font-bold text-gray-600 text-[11px]">
                        +{ord.items.length}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-900">
                    {formatUGX(ord.total).replace('UGX ', '')}
                  </td>
                  <td className="py-3 px-4">
                    {ord.paymentMethod.includes('MTN') ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FFCC00]/20 text-neutral-900 font-black text-[10px] rounded-md">
                        <span className="w-2 h-2 rounded-full bg-[#FFCC00]" /> MTN Mobile Money
                      </span>
                    ) : ord.paymentMethod.includes('Airtel') ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-700 font-black text-[10px] rounded-md">
                        <span className="w-2 h-2 rounded-full bg-red-600" /> Airtel Money
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 font-black text-[10px] rounded-md">
                        VISA Card Payment
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                        ord.orderStatus === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-700'
                          : ord.orderStatus === 'Processing'
                          ? 'bg-blue-100 text-blue-700'
                          : ord.orderStatus === 'Out for Delivery'
                          ? 'bg-purple-100 text-purple-700'
                          : ord.orderStatus === 'Cancelled'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {ord.orderStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-[11px]">
                    {new Date(ord.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* View */}
                      <button
                        onClick={() => openViewModal(ord)}
                        className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                        title="View Order Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Update */}
                      <button
                        onClick={() => openUpdateModal(ord)}
                        className="px-2 py-1 bg-orange-50 text-[#F97316] hover:bg-orange-100 rounded-lg font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                        title="Update Status & Delivery"
                      >
                        <Edit className="w-3 h-3" /> Update
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(ord.id, ord.orderNumber)}
                        className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                        title="Delete Order"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination footer matching screenshot */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Showing 1 – {filteredOrders.length} of {orders.length} orders</span>
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
            <span>...</span>
            <span className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold flex items-center justify-center cursor-pointer">
              250
            </span>
            <span className="px-2 py-1 bg-gray-50 text-gray-700 rounded-lg font-bold">»</span>
          </div>
        </div>
      </div>

      {/* View or Update Modal */}
      {modalType && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 text-left relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            {modalType === 'view' ? (
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Order Details
                  </span>
                  <h3 className="text-xl font-black text-gray-900">{selectedOrder.orderNumber}</h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <h4 className="font-bold text-gray-800">Customer</h4>
                    <p className="text-gray-700">{selectedOrder.customer.fullName}</p>
                    <p className="text-gray-500">{selectedOrder.customer.phone} • {selectedOrder.customer.email}</p>
                    <p className="text-gray-500">{selectedOrder.customer.deliveryAddress}, {selectedOrder.customer.city}</p>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <h4 className="font-bold text-gray-800 mb-2">Purchased Items</h4>
                    <div className="space-y-2">
                      {selectedOrder.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded-xl">
                          <div className="flex items-center gap-2">
                            <img src={it.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                            <div>
                              <p className="font-bold text-gray-900">{it.name}</p>
                              <p className="text-[10px] text-gray-400">{it.size || ''} × {it.quantity}</p>
                            </div>
                          </div>
                          <span className="font-bold text-gray-900">{formatUGX(it.price * it.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 space-y-1">
                    <div className="flex justify-between text-gray-600">
                      <span>Product Total</span>
                      <span className="font-bold text-gray-900">{formatUGX(selectedOrder.total)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Payment Status</span>
                      <span className="font-bold text-emerald-600">{selectedOrder.paymentStatus}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Arrangement Status</span>
                      <span className="font-bold text-[#F97316]">{selectedOrder.deliveryArrangementStatus}</span>
                    </div>
                    {selectedOrder.agreedTransportFee && (
                      <div className="flex justify-between text-gray-600">
                        <span>Agreed Transport Fee</span>
                        <span className="font-bold text-gray-900">{formatUGX(selectedOrder.agreedTransportFee)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => openUpdateModal(selectedOrder)}
                  className="w-full mt-4 py-2.5 bg-[#F97316] text-white text-xs font-bold rounded-xl"
                >
                  Edit Status & Delivery Arrangement
                </button>
              </div>
            ) : (
              <form onSubmit={handleSaveOrderUpdate} className="space-y-4 text-xs">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="text-lg font-black text-gray-900">
                    Update Order: {selectedOrder.orderNumber}
                  </h3>
                  <p className="text-gray-500 text-[11px]">
                    Customer: {selectedOrder.customer.fullName} ({selectedOrder.customer.phone})
                  </p>
                </div>

                {/* 1. Order Status */}
                <div>
                  <label className="block font-bold text-gray-800 mb-1">Order Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as OrderStatus)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:outline-none focus:border-[#F97316]"
                  >
                    <option value="Pending Payment">Pending Payment</option>
                    <option value="Paid">Paid</option>
                    <option value="Processing">Processing</option>
                    <option value="Ready for Dispatch">Ready for Dispatch</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>

                {/* 2. Independent Delivery Arrangement Status (Section 6 & 7) */}
                <div>
                  <label className="block font-bold text-gray-800 mb-1">
                    Delivery Arrangement Status (Independent from payment)
                  </label>
                  <select
                    value={editDeliveryStatus}
                    onChange={(e) => setEditDeliveryStatus(e.target.value as DeliveryArrangementStatus)}
                    className="w-full px-4 py-2 bg-orange-50 border border-orange-200 rounded-xl font-bold text-[#F97316] focus:outline-none"
                  >
                    <option value="Not Contacted">Not Contacted</option>
                    <option value="Customer Contacted">Customer Contacted</option>
                    <option value="Fee Agreed">Fee Agreed</option>
                    <option value="Delivery Arranged">Delivery Arranged</option>
                  </select>
                </div>

                {/* 3. Agreed Transport Fee */}
                <div>
                  <label className="block font-bold text-gray-800 mb-1">
                    Agreed Transport Fee (UGX) (agreed with customer)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 10000"
                    value={editAgreedFee}
                    onChange={(e) => setEditAgreedFee(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-bold focus:outline-none focus:border-[#F97316]"
                  />
                </div>

                {/* 4. Internal Notes */}
                <div>
                  <label className="block font-bold text-gray-800 mb-1">
                    Internal Dispatch & Support Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Called customer on WhatsApp; rider James assigned to deliver."
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#F97316]"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Save Status Updates
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
