import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import {
  Package, Clock, CheckCircle2, Truck, XCircle,
  AlertTriangle, Send, X
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { cn } from '@/lib/utils';

const MOCK_ORDERS = [
  {
    _id: 'ord-001',
    trackingNumber: '#BOT-9042',
    date: '2026-04-10',
    status: 'Delivered',
    paymentMethod: 'Credit Card',
    total: 465,
    items: [
      { name: 'Rosa Mystica', quantity: 2, price: 180 },
      { name: 'Lavender Essence Oil', quantity: 1, price: 105 },
    ]
  },
  {
    _id: 'ord-002',
    trackingNumber: '#BOT-7821',
    date: '2026-04-05',
    status: 'Shipped',
    paymentMethod: 'Cash on Delivery',
    total: 320,
    items: [
      { name: 'Monstera Deliciosa', quantity: 1, price: 320 },
    ]
  },
];

const statusConfig = {
  Delivered:  { color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: CheckCircle2 },
  Shipped:    { color: 'text-blue-400',    bg: 'bg-blue-400/10',    border: 'border-blue-400/20',    icon: Truck },
  Processing: { color: 'text-amber-400',   bg: 'bg-amber-400/10',   border: 'border-amber-400/20',   icon: Clock },
  Cancelled:  { color: 'text-rose-500',    bg: 'bg-rose-500/10',    border: 'border-rose-500/20',    icon: XCircle },
};

const CustomerOrders = () => {
  const { isDarkMode } = useOutletContext();
  const { user } = useAuth();
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [complaintModal, setComplaintModal] = useState(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const storedUser = localStorage.getItem('user');
      if (!storedUser || storedUser === 'undefined') return;
      const { token } = JSON.parse(storedUser);
      
      const response = await axios.get('http://localhost:5000/api/orders/myorders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const storedUser = localStorage.getItem('user');
      const { token } = JSON.parse(storedUser);
      
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post('http://127.0.0.1:5000/api/reviews', {
        type: 'complaint',
        comment: `[Order ${complaintModal.id}] ${comment}`,
      }, config);
      setSuccessMsg('Submitted successfully.');
      setTimeout(() => setComplaintModal(null), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-6">
        <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
        <p className="font-serif italic text-xl opacity-40">Retrieving your botanical archive...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center text-center py-32 rounded-[3rem] border-2 border-dashed",
        isDarkMode ? "border-white/10 bg-white/[0.02]" : "border-slate-100 bg-slate-50"
      )}>
        <Package size={48} className="opacity-10 mb-6" />
        <h3 className="text-2xl font-serif italic mb-2">No orders yet.</h3>
        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Your collection is waiting to be built.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Complaint Modal */}
      <AnimatePresence>
        {complaintModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className={cn("relative w-full max-w-lg p-12 rounded-[3rem] shadow-2xl border", isDarkMode ? "bg-[#111] border-white/10 text-white" : "bg-white border-slate-100 text-slate-900")}>
              <button onClick={() => setComplaintModal(null)} className="absolute top-7 right-7 w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"><X size={16} /></button>
              <h3 className="text-3xl font-serif italic mb-6">Report Issue.</h3>
              <form onSubmit={handleSubmitComplaint} className="space-y-6">
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} required rows={4} className={cn("w-full p-5 rounded-2xl text-sm font-bold outline-none resize-none transition-colors", isDarkMode ? "bg-white/5 border border-white/10" : "bg-slate-50 border border-slate-200")} />
                <button type="submit" disabled={isSubmitting} className="w-full py-5 rounded-2xl bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest">{isSubmitting ? 'Sending...' : 'Send Complaint'}</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {orders.map((order, idx) => {
        const cfg = statusConfig[order.status] || statusConfig['Processing'];
        const StatusIcon = cfg.icon;
        return (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
              "p-10 rounded-[3rem] border shadow-sm transition-all duration-700 hover:scale-[1.01]",
              isDarkMode ? "bg-[#0d0d0d] border-white/5 text-white" : "bg-white border-slate-100 text-slate-900 shadow-slate-200/50"
            )}
          >
            <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
              <div>
                <p className="text-2xl font-serif font-black italic">{order.id}</p>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mt-1">
                  Order Placed on {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <div className="flex gap-3">
                <span className={cn("flex items-center gap-2 px-4 py-2 rounded-full border text-[9px] font-black uppercase tracking-widest", cfg.color, cfg.bg, cfg.border)}>
                  <StatusIcon size={12} /> {order.status}
                </span>
              </div>
            </div>

            <div className={cn("space-y-3 pb-8 mb-8 border-b", isDarkMode ? "border-white/5" : "border-slate-50")}>
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm font-bold opacity-80">
                  <span>{item.name} ×{item.quantity}</span>
                  <span>{item.price * item.quantity} DH</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 mb-1">Grand Total</p>
                <p className="text-2xl font-serif font-black italic">{order.amount} DH</p>
              </div>
              <button 
                onClick={() => setComplaintModal(order)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3.5 rounded-2xl border text-[9px] font-black uppercase tracking-widest transition-all",
                  isDarkMode ? "border-amber-500/20 text-amber-500 bg-amber-500/5 hover:bg-amber-500/10" : "border-amber-500/20 text-amber-600 bg-amber-50 hover:bg-amber-100"
                )}
              >
                <AlertTriangle size={14} /> File Complaint
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default CustomerOrders;
