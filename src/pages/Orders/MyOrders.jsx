import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package, ArrowLeft, Clock, CheckCircle2, Truck, XCircle,
  AlertTriangle, Send, X, Star, Sparkles
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

// --- Mock order data since we don't have a real orders backend endpoint yet ---
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
  {
    _id: 'ord-003',
    trackingNumber: '#BOT-6654',
    date: '2026-03-28',
    status: 'Processing',
    paymentMethod: 'Credit Card',
    total: 215,
    items: [
      { name: 'Cactus Pack (x3)', quantity: 1, price: 215 },
    ]
  },
];

const statusConfig = {
  Delivered:  { color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: CheckCircle2 },
  Shipped:    { color: 'text-blue-400',    bg: 'bg-blue-400/10',    border: 'border-blue-400/20',    icon: Truck },
  Processing: { color: 'text-amber-400',   bg: 'bg-amber-400/10',   border: 'border-amber-400/20',   icon: Clock },
  Pending:    { color: 'text-slate-400',   bg: 'bg-slate-400/10',   border: 'border-slate-400/20',   icon: Clock },
  Cancelled:  { color: 'text-rose-500',    bg: 'bg-rose-500/10',    border: 'border-rose-500/20',    icon: XCircle },
};

export default function MyOrders() {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [complaintModal, setComplaintModal] = useState(null); // order object | null
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!user) {
    return (
      <div className={`pt-36 min-h-screen flex flex-col items-center justify-center gap-8 text-center px-6 transition-colors
        ${isDarkMode ? 'bg-[#090909] text-white' : 'bg-[#FCFCFB] text-slate-900'}`}>
        <AlertTriangle size={48} className="opacity-30" />
        <p className="font-serif italic text-3xl">You must be logged in to view your orders.</p>
        <button 
          onClick={() => navigate('/login')}
          className="px-10 py-5 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-sage transition-all">
          Log In
        </button>
      </div>
    );
  }

  const openComplaint = (order) => {
    setComplaintModal(order);
    setComment('');
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post('http://127.0.0.1:5000/api/reviews', {
        type: 'complaint',
        comment: `[Order ${complaintModal.trackingNumber}] ${comment}`,
      }, config);
      setSuccessMsg('Your complaint has been submitted. Our team will contact you within 24h.');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`pt-24 min-h-screen transition-colors duration-700 ${isDarkMode ? 'bg-[#090909]' : 'bg-[#FCFCFB]'}`}>

      {/* Complaint Modal */}
      <AnimatePresence>
        {complaintModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className={`relative w-full max-w-lg p-10 md:p-14 rounded-[3rem] shadow-2xl border
                ${isDarkMode ? 'bg-[#111] border-white/10 text-white' : 'bg-white border-slate-100 text-slate-900'}`}
            >
              <button
                onClick={() => setComplaintModal(null)}
                className={`absolute top-7 right-7 w-10 h-10 rounded-full flex items-center justify-center transition-colors
                  ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200'}`}
              >
                <X size={16} />
              </button>

              {successMsg ? (
                <div className="py-8 flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle2 size={36} className="text-emerald-500" />
                  </div>
                  <h3 className="text-3xl font-serif italic">Complaint Received.</h3>
                  <p className={`text-sm font-bold ${isDarkMode ? 'text-white/50' : 'text-slate-500'}`}>{successMsg}</p>
                  <button
                    onClick={() => setComplaintModal(null)}
                    className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all
                      ${isDarkMode ? 'bg-emerald-500 text-white hover:bg-emerald-400' : 'bg-slate-900 text-white hover:bg-sage'}`}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8 space-y-2">
                    <span className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                      <AlertTriangle size={10} className="inline mr-1" />
                      Complaint Form
                    </span>
                    <h3 className="text-3xl font-serif italic">Report an Issue.</h3>
                    <p className={`text-sm font-bold ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>
                      Order <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>{complaintModal.trackingNumber}</strong>
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="mb-6 bg-rose-500/10 text-rose-500 p-4 rounded-2xl text-[10px] uppercase font-black tracking-widest border border-rose-500/20">
                      {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleSubmitComplaint} className="space-y-6">
                    <div className="space-y-3">
                      <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/50' : 'text-slate-500'}`}>
                        Describe Your Issue
                      </label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        placeholder="e.g. My order arrived damaged, or the wrong item was sent..."
                        rows={4}
                        className={`w-full p-5 rounded-2xl text-sm font-bold outline-none resize-none transition-colors
                          ${isDarkMode ? 'bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-amber-400' : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-amber-500'}`}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting || !comment.trim()}
                      className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all
                        ${isDarkMode ? 'bg-amber-500 text-black hover:bg-amber-400' : 'bg-amber-500 text-white hover:bg-amber-600'}
                        ${(isSubmitting || !comment.trim()) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Send Complaint'}
                      <Send size={14} />
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="container mx-auto px-6 py-20 text-center space-y-8">
        <div className="flex items-center justify-center gap-3">
          <Sparkles className={isDarkMode ? 'text-emerald-500' : 'text-sage'} size={18} />
          <span className={`text-[10px] font-black uppercase tracking-[0.5em] ${isDarkMode ? 'text-emerald-500' : 'text-sage'}`}>
            Your Botanical Journey
          </span>
        </div>
        <h1 className={`text-5xl md:text-7xl font-serif font-black italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          My Orders.
        </h1>
        <Link to="/shop/all" className={`inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-colors
          ${isDarkMode ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>
          <ArrowLeft size={16} /> Back to Collection
        </Link>
      </div>

      {/* Orders List */}
      <div className="container mx-auto px-6 pb-40 space-y-8 max-w-4xl">
        {MOCK_ORDERS.map((order, idx) => {
          const cfg = statusConfig[order.status] || statusConfig['Pending'];
          const StatusIcon = cfg.icon;
          return (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-10 rounded-[3rem] border shadow-sm transition-all duration-700
                ${isDarkMode ? 'bg-[#0d0d0d] border-white/5 text-white' : 'bg-white border-slate-100 text-slate-900'}`}
            >
              {/* Order Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                <div className="space-y-1">
                  <p className={`text-2xl font-serif font-black italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {order.trackingNumber}
                  </p>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/30' : 'text-slate-400'}`}>
                    Placed on {new Date(order.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[9px] font-black uppercase tracking-widest ${cfg.color} ${cfg.bg} ${cfg.border}`}>
                    <StatusIcon size={12} /> {order.status}
                  </span>
                  <span className={`px-4 py-2 rounded-full border text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'border-white/10 text-white/40' : 'border-slate-200 text-slate-400'}`}>
                    {order.paymentMethod}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className={`space-y-3 pb-8 mb-8 border-b ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Package size={16} className={`opacity-40 ${isDarkMode ? 'text-white' : 'text-slate-900'}`} />
                      <span className={`text-sm font-bold ${isDarkMode ? 'text-white/70' : 'text-slate-700'}`}>
                        {item.name} <span className="opacity-40">×{item.quantity}</span>
                      </span>
                    </div>
                    <span className={`font-black text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {item.price * item.quantity} DH
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className={`text-[10px] font-black uppercase tracking-widest opacity-40`}>Total</span>
                  <p className="text-2xl font-serif font-black italic">{order.total} DH</p>
                </div>
                <button
                  onClick={() => openComplaint(order)}
                  className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105
                    ${isDarkMode
                      ? 'border-amber-500/30 text-amber-400 bg-amber-500/10 hover:bg-amber-500/20'
                      : 'border-amber-500/40 text-amber-600 bg-amber-50 hover:bg-amber-100'}`}
                >
                  <AlertTriangle size={14} />
                  File a Complaint
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
