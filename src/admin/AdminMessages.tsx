import React, { useState } from 'react';
import { storeService } from '../services/storeService';
import { useStore } from '../context/StoreContext';
import { MessageSquare, Mail, Phone, Clock, CheckCircle } from 'lucide-react';

export const AdminMessages: React.FC = () => {
  const { showToast } = useStore();
  const [messages, setMessages] = useState(() => storeService.getMessages());

  const handleMarkRead = (id: string) => {
    const updated = messages.map((m) => (m.id === id ? { ...m, status: 'read' as const } : m));
    setMessages(updated);
    showToast('Marked message as read', 'info');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Customer Support Messages</h1>
        <p className="text-xs text-gray-500 mt-1">
          Inquiries received through the storefront Contact Us form and WhatsApp helpdesk.
        </p>
      </div>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`bg-white rounded-3xl p-6 border shadow-xs space-y-3 text-xs ${
              msg.status === 'unread' ? 'border-[#F97316]/40 bg-orange-50/10' : 'border-gray-100'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#F97316] flex items-center justify-center font-bold">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-gray-900">{msg.fullName}</h3>
                  <div className="flex items-center gap-3 text-gray-500 text-[11px] mt-0.5">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {msg.email}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {msg.phone}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
                {msg.status === 'unread' ? (
                  <button
                    onClick={() => handleMarkRead(msg.id)}
                    className="px-3 py-1 bg-orange-50 hover:bg-orange-100 text-[#F97316] font-bold rounded-lg cursor-pointer"
                  >
                    Mark as Read
                  </button>
                ) : (
                  <span className="px-2.5 py-0.5 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-bold">
                    Read
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-400">
                Subject: {msg.subject}
              </span>
              <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-2xl">
                "{msg.message}"
              </p>
            </div>

            <div className="flex gap-2 pt-1">
              <a
                href={`https://wa.me/${msg.phone.replace(/[^\d]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-[#25D366] text-white font-bold rounded-xl flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Reply on WhatsApp
              </a>
              <a
                href={`mailto:${msg.email}`}
                className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" /> Reply by Email
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
