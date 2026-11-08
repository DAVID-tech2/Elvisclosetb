import React, { useState } from 'react';
import {
  Truck,
  Phone,
  MessageSquare,
  CheckCircle,
  Clock,
  Save,
  AlertCircle,
  MapPin,
} from 'lucide-react';
import { storeService } from '../services/storeService';
import { useStore } from '../context/StoreContext';
import { Order, DeliveryArrangementStatus } from '../types';

export const AdminDelivery: React.FC = () => {
  const { formatUGX, showToast } = useStore();
  const [orders, setOrders] = useState<Order[]>(() => storeService.getOrders());
  const [filter, setFilter] = useState<'All' | DeliveryArrangementStatus>('All');

  // Active editor
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<DeliveryArrangementStatus>('Customer Contacted');
  const [feeInput, setFeeInput] = useState('');
  const [notesInput, setNotesInput] = useState('');

  const filtered = orders.filter((o) => (filter === 'All' ? true : o.deliveryArrangementStatus === filter));

  const startEdit = (ord: Order) => {
    setEditingOrderId(ord.id);
    setSelectedStatus(ord.deliveryArrangementStatus);
    setFeeInput(ord.agreedTransportFee ? ord.agreedTransportFee.toString() : '');
    setNotesInput(ord.internalNotes || '');
  };

  const handleSave = (id: string) => {
    storeService.updateDeliveryArrangementStatus(
      id,
      selectedStatus,
      feeInput ? parseInt(feeInput, 10) : undefined,
      notesInput
    );
    setOrders(storeService.getOrders());
    setEditingOrderId(null);
    showToast('Saved delivery arrangement status & transport fee', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Delivery Arrangements Management
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Coordinate customer transport fees and dispatch separately from product checkout.
        </p>
      </div>

      {/* Critical Business Rule Banner */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-bold">Boutique Delivery Policy:</strong> Customers pay exclusively for clothing products during online checkout. Transport fees are negotiated and agreed upon with the customer via WhatsApp/phone by your support team and recorded below.
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 text-xs font-bold">
        {['All', 'Not Contacted', 'Customer Contacted', 'Fee Agreed', 'Delivery Arranged'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab as any)}
            className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${
              filter === tab
                ? 'bg-[#F97316] text-white shadow-xs'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filtered.map((ord) => {
          const isEditing = editingOrderId === ord.id;

          return (
            <div
              key={ord.id}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4 text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center font-bold">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900">{ord.orderNumber}</h3>
                    <span className="text-[11px] text-gray-500">
                      Paid: <strong className="text-gray-900">{formatUGX(ord.total)}</strong> via {ord.paymentMethod}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                      ord.deliveryArrangementStatus === 'Delivery Arranged'
                        ? 'bg-emerald-100 text-emerald-800'
                        : ord.deliveryArrangementStatus === 'Fee Agreed'
                        ? 'bg-blue-100 text-blue-800'
                        : ord.deliveryArrangementStatus === 'Customer Contacted'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {ord.deliveryArrangementStatus}
                  </span>

                  <a
                    href={`https://wa.me/${ord.customer.phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(
                      `Hello ${ord.customer.fullName}, this is Elvis' Closet support regarding your order ${ord.orderNumber}. We are arranging delivery to ${ord.customer.deliveryAddress}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-[#25D366] text-white font-bold rounded-lg flex items-center gap-1 hover:bg-[#20ba59]"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                  </a>

                  <a
                    href={`tel:${ord.customer.phone}`}
                    className="px-3 py-1.5 bg-gray-100 text-gray-800 font-bold rounded-lg flex items-center gap-1 hover:bg-gray-200"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call
                  </a>
                </div>
              </div>

              {/* Customer Delivery Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-2xl text-[11px]">
                <div>
                  <span className="text-gray-400 block font-bold">Customer:</span>
                  <p className="font-bold text-gray-900 text-xs">{ord.customer.fullName}</p>
                  <p className="text-gray-600">{ord.customer.phone}</p>
                </div>
                <div>
                  <span className="text-gray-400 block font-bold">Destination Address:</span>
                  <p className="text-gray-900 font-medium">{ord.customer.deliveryAddress}</p>
                  <p className="text-gray-600">{ord.customer.city}, {ord.customer.region}</p>
                </div>
                <div>
                  <span className="text-gray-400 block font-bold">Agreed Transport Fee:</span>
                  <p className="text-sm font-black text-[#F97316]">
                    {ord.agreedTransportFee ? formatUGX(ord.agreedTransportFee) : 'Pending agreement'}
                  </p>
                  <p className="text-gray-500 italic mt-0.5">
                    {ord.internalNotes || 'No notes logged yet.'}
                  </p>
                </div>
              </div>

              {/* Editing Form */}
              {isEditing ? (
                <div className="pt-3 border-t border-gray-100 space-y-3 bg-orange-50/40 p-4 rounded-2xl">
                  <h4 className="font-bold text-xs text-gray-900">Update Delivery Status & Transport Fee</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">Status</label>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value as DeliveryArrangementStatus)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl font-bold"
                      >
                        <option value="Not Contacted">Not Contacted</option>
                        <option value="Customer Contacted">Customer Contacted</option>
                        <option value="Fee Agreed">Fee Agreed</option>
                        <option value="Delivery Arranged">Delivery Arranged</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-1">Agreed Fee (UGX)</label>
                      <input
                        type="number"
                        placeholder="e.g. 10000"
                        value={feeInput}
                        onChange={(e) => setFeeInput(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-1">Rider / Delivery Notes</label>
                      <input
                        type="text"
                        placeholder="e.g. Assigned to rider James; pickup at 2PM"
                        value={notesInput}
                        onChange={(e) => setNotesInput(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setEditingOrderId(null)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSave(ord.id)}
                      className="px-5 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Delivery Agreement
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => startEdit(ord)}
                    className="px-4 py-2 bg-gray-50 hover:bg-orange-50 hover:text-[#F97316] border border-gray-200 rounded-xl font-bold text-xs"
                  >
                    Edit Delivery Arrangement
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
