import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquareQuote, X, Send, AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

// ─── Shared modal logic ───────────────────────────────────────────────
function FeedbackModal({ mode, isDarkMode, user, onClose }) {
  // mode = 'review' | 'complaint'
  const isComplaint = mode === 'complaint';
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post('http://127.0.0.1:5000/api/reviews', {
        type: mode,
        rating: isComplaint ? undefined : rating,
        comment,
      }, config);
      setSuccessMsg(
        isComplaint
          ? 'Your complaint has been received. Our team will contact you within 24h.'
          : 'Thank you! Your review is pending admin approval and will be published shortly.'
      );
      setComment('');
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm
          ${isDarkMode ? 'bg-black/80' : 'bg-slate-900/40'}`}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className={`relative w-full max-w-lg p-8 md:p-12 rounded-[3rem] shadow-2xl border
            ${isDarkMode ? 'bg-[#0d0d0d] border-white/10 text-white' : 'bg-white border-slate-100 text-slate-900'}`}
        >
          <button
            onClick={onClose}
            className={`absolute top-8 right-8 w-10 h-10 rounded-full flex items-center justify-center transition-colors
              ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200'}`}
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="mb-8">
            <span className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-1 mb-3
              ${isComplaint
                ? isDarkMode ? 'text-amber-400' : 'text-amber-600'
                : isDarkMode ? 'text-emerald-400' : 'text-sage'}`}
            >
              {isComplaint ? <AlertTriangle size={10} /> : <Star size={10} className="fill-current" />}
              {isComplaint ? 'File a Complaint' : 'Write a Review'}
            </span>
            <h3 className="text-3xl font-serif italic">
              {isComplaint ? 'Report an Issue.' : 'Share Your Experience.'}
            </h3>
            <p className={`text-sm mt-2 ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>
              {isComplaint
                ? 'Describe the problem and our team will respond promptly.'
                : 'Your feedback helps us grow our botanical community.'}
            </p>
          </div>

          {successMsg ? (
            <div className="py-10 flex flex-col items-center text-center space-y-6">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center border
                ${isComplaint
                  ? 'bg-amber-500/20 border-amber-500/30 text-amber-500'
                  : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-500'}`}
              >
                <CheckCircle2 size={36} />
              </div>
              <p className="font-serif italic text-xl leading-relaxed">{successMsg}</p>
              <button onClick={onClose} className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all
                ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'}`}>
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="bg-rose-500/10 text-rose-500 p-4 rounded-xl flex items-center gap-3 text-[10px] uppercase font-black tracking-widest border border-rose-500/20">
                  <AlertCircle size={14} /> {errorMsg}
                </div>
              )}

              {/* Rating — only for reviews */}
              {!isComplaint && (
                <div className="space-y-3">
                  <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/60' : 'text-slate-500'}`}>
                    Your Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setRating(star)} className="p-1 transition-transform hover:scale-110">
                        <Star size={28} className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/60' : 'text-slate-500'}`}>
                  {isComplaint ? 'Describe the Issue' : 'Your Message'}
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  rows={4}
                  placeholder={isComplaint
                    ? 'e.g. My order arrived late, or a product was damaged...'
                    : 'Share what you loved about your botanical experience...'}
                  className={`w-full p-4 text-sm outline-none rounded-2xl min-h-[120px] transition-colors resize-none
                    ${isDarkMode
                      ? `bg-white/5 border focus:border-${isComplaint ? 'amber' : 'emerald'}-500 border-white/10`
                      : `bg-slate-50 border border-slate-200 focus:border-${isComplaint ? 'amber' : 'sage'}`}`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !comment.trim()}
                className={`w-full py-5 rounded-2xl font-black tracking-[0.3em] uppercase text-[10px] transition-all flex items-center justify-center gap-3
                  ${isComplaint
                    ? isDarkMode ? 'bg-amber-500 text-black hover:bg-amber-400' : 'bg-amber-500 text-white hover:bg-amber-600'
                    : isDarkMode ? 'bg-emerald-500 text-white hover:bg-emerald-400' : 'bg-slate-900 text-white hover:bg-sage'}
                  ${(isSubmitting || !comment.trim()) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
              >
                {isSubmitting ? 'Submitting...' : isComplaint ? 'Send Complaint' : 'Submit Review'}
                <Send size={14} />
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────
export function StoreReviews() {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(null); // 'review' | 'complaint' | null

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/reviews')
      .then(({ data }) => setReviews(data))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const handleOpen = (mode) => {
    if (!user) { navigate('/login'); return; }
    setOpenModal(mode);
  };

  return (
    <section className="relative py-20 w-full overflow-hidden">

      {/* Modal */}
      {openModal && (
        <FeedbackModal
          mode={openModal}
          isDarkMode={isDarkMode}
          user={user}
          onClose={() => setOpenModal(null)}
        />
      )}

      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <h2 className={`text-4xl md:text-6xl font-serif italic tracking-tighter transition-colors duration-500
          ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Feedback Box.
        </h2>
        <p className={`max-w-lg mx-auto uppercase tracking-[0.3em] text-[10px] font-black transition-colors duration-500
          ${isDarkMode ? 'text-emerald-400' : 'text-sage'}`}>
          The Botanical Experience
        </p>
      </div>

      {/* Two CTA cards — Reviews & Complaints */}
      <div className="max-w-4xl mx-auto px-6 mb-24 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Reviews Card */}
        <div className={`p-10 text-center rounded-[3rem] border shadow-2xl transition-all duration-700 relative overflow-hidden
          ${isDarkMode ? 'bg-[#0a0a0a] border-white/5' : 'bg-slate-50 border-slate-100'}`}>
          {isDarkMode && <div className="absolute inset-0 bg-emerald-500/5 blur-[80px]" />}
          <MessageSquareQuote size={40} className={`mx-auto mb-6 opacity-30 relative z-10 ${isDarkMode ? 'text-emerald-400' : 'text-sage'}`} />
          <h3 className={`text-2xl font-serif italic mb-4 relative z-10 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Share a Review
          </h3>
          <p className={`text-sm mb-8 leading-relaxed relative z-10 ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>
            Loved your experience? Leave a glowing testimonial and help others discover our botanical sanctuary.
          </p>
          <button
            onClick={() => handleOpen('review')}
            className={`relative z-10 px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] transition-all hover:scale-105
              ${isDarkMode ? 'bg-emerald-500 text-white hover:bg-emerald-400' : 'bg-slate-900 text-white hover:bg-sage'}`}
          >
            ⭐ Write a Review
          </button>
        </div>

        {/* Complaints Card */}
        <div className={`p-10 text-center rounded-[3rem] border shadow-2xl transition-all duration-700 relative overflow-hidden
          ${isDarkMode ? 'bg-[#0a0a0a] border-amber-500/10' : 'bg-amber-50 border-amber-100'}`}>
          <AlertTriangle size={40} className={`mx-auto mb-6 relative z-10 ${isDarkMode ? 'text-amber-400 opacity-60' : 'text-amber-500 opacity-50'}`} />
          <h3 className={`text-2xl font-serif italic mb-4 relative z-10 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            File a Complaint
          </h3>
          <p className={`text-sm mb-8 leading-relaxed relative z-10 ${isDarkMode ? 'text-white/40' : 'text-amber-700/70'}`}>
            Encountered a problem with your order or service? Let us know and our team will resolve it promptly.
          </p>
          <button
            onClick={() => handleOpen('complaint')}
            className={`relative z-10 px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] transition-all hover:scale-105
              ${isDarkMode ? 'bg-amber-500 text-black hover:bg-amber-400' : 'bg-amber-500 text-white hover:bg-amber-600'}`}
          >
            🚨 Report an Issue
          </button>
        </div>
      </div>

      {/* ── Separator ── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-10">
          <div className={`h-[1px] flex-grow ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
          <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>
            Curated Client Testimonials
          </span>
          <div className={`h-[1px] flex-grow ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="text-center py-20 opacity-50 uppercase tracking-widest text-[10px] font-black">
            Loading Testimonials...
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20 opacity-50 font-serif italic text-xl">
            Be the first to share your experience from our sanctuary.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`p-8 rounded-[2rem] border transition-colors duration-700 flex flex-col justify-between
                  ${isDarkMode ? 'bg-[#0d0d0d] border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-emerald-500' : 'text-sage'}`}>
                      Verified Purchase
                    </span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'} />
                      ))}
                    </div>
                  </div>
                  <p className={`font-serif italic text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-white/80' : 'text-slate-600'}`}>
                    "{review.comment}"
                  </p>
                </div>
                <div className={`pt-6 border-t font-black uppercase text-[10px] tracking-widest
                  ${isDarkMode ? 'border-white/10 text-white/40' : 'border-slate-100 text-slate-400'}`}>
                  — {review.userName}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
