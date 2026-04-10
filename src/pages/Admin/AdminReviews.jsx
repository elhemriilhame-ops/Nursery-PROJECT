import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, XCircle, MessageSquare, AlertTriangle, RefreshCw } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

export default function AdminReviews() {
  const { isDarkMode } = useOutletContext();
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all | pending | approved | rejected

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      const { data } = await axios.get('http://127.0.0.1:5000/api/reviews/all', config);
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      await axios.put(`http://127.0.0.1:5000/api/reviews/${id}/status`, { status }, config);
      setReviews(prev => prev.map(r => r._id === id ? { ...r, status } : r));
    } catch (error) {
      console.error('Error updating review status:', error);
    }
  };

  const filtered = filter === 'all' ? reviews : reviews.filter(r => r.status === filter);

  const counts = {
    all: reviews.length,
    pending: reviews.filter(r => r.status === 'pending').length,
    approved: reviews.filter(r => r.status === 'approved').length,
    rejected: reviews.filter(r => r.status === 'rejected').length,
  };

  const filterTabs = [
    { key: 'all', label: 'All', color: 'text-white' },
    { key: 'pending', label: 'Pending', color: 'text-amber-400' },
    { key: 'approved', label: 'Approved', color: 'text-emerald-400' },
    { key: 'rejected', label: 'Rejected', color: 'text-rose-400' },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className={`text-4xl font-serif font-black tracking-tight italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Reviews & Complaints
          </h1>
          <p className={`text-[13px] font-black mt-2 uppercase tracking-[0.3em] ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>
            Manage Client Feedback — Approve or Reject
          </p>
        </div>
        <button
          onClick={fetchReviews}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all
            ${isDarkMode ? 'border-white/10 text-white/40 hover:text-white hover:bg-white/5' : 'border-slate-200 text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filterTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`p-6 rounded-[2rem] border text-left transition-all hover:scale-[1.02]
              ${filter === tab.key
                ? isDarkMode ? 'bg-white/10 border-white/20' : 'bg-slate-900 text-white border-slate-900'
                : isDarkMode ? 'bg-[#0D0D0D] border-white/5' : 'bg-white border-slate-100'
              }`}
          >
            <p className={`text-3xl font-black ${filter === tab.key && !isDarkMode ? 'text-white' : isDarkMode ? tab.color : 'text-slate-900'}`}>
              {counts[tab.key]}
            </p>
            <p className={`text-[9px] uppercase tracking-widest font-black mt-1 
              ${filter === tab.key && !isDarkMode ? 'text-white/60' : isDarkMode ? 'text-white/30' : 'text-slate-400'}`}>
              {tab.label}
            </p>
          </button>
        ))}
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className={`text-center py-20 text-[10px] uppercase tracking-widest font-black opacity-50 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Loading Feedback Registry...
        </div>
      ) : filtered.length === 0 ? (
        <div className={`text-center py-20 font-serif italic text-xl opacity-40 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          No feedback in this category.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((review, idx) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className={`p-8 rounded-[2rem] border flex flex-col md:flex-row md:items-start gap-6 transition-all
                ${isDarkMode ? 'bg-[#0D0D0D] border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}
            >
              {/* Left — content */}
              <div className="flex-grow space-y-3">
                <div className="flex items-center gap-4 flex-wrap">
                  {/* Type badge */}
                  <span className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border
                    ${review.type === 'complaint'
                      ? isDarkMode ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-50 text-amber-600 border-amber-200'
                      : isDarkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                    }`}
                  >
                    {review.type === 'complaint' ? <AlertTriangle size={10} /> : <MessageSquare size={10} />}
                    {review.type}
                  </span>

                  {/* Status badge */}
                  <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border
                    ${review.status === 'approved' ? isDarkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                    : review.status === 'rejected' ? isDarkMode ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-rose-50 text-rose-600 border-rose-200'
                    : isDarkMode ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-50 text-amber-600 border-amber-200'}`}
                  >
                    {review.status}
                  </span>

                  {/* Stars (only for reviews) */}
                  {review.type === 'review' && review.rating && (
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'} />
                      ))}
                    </div>
                  )}
                </div>

                <p className={`font-serif italic text-lg leading-relaxed ${isDarkMode ? 'text-white/80' : 'text-slate-700'}`}>
                  "{review.comment}"
                </p>

                <div className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/30' : 'text-slate-400'}`}>
                  {review.userName} — {new Date(review.createdAt).toLocaleDateString('fr-MA', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>

              {/* Right — actions */}
              <div className="flex md:flex-col gap-3 shrink-0">
                {review.status !== 'approved' && (
                  <button
                    onClick={() => updateStatus(review._id, 'approved')}
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all hover:scale-105"
                  >
                    <CheckCircle size={14} /> Approve
                  </button>
                )}
                {review.status !== 'rejected' && (
                  <button
                    onClick={() => updateStatus(review._id, 'rejected')}
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20 text-[9px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all hover:scale-105"
                  >
                    <XCircle size={14} /> Reject
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
