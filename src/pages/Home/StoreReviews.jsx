import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquareQuote, X, Send, AlertCircle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function StoreReviews() {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form State
  const [type, setType] = useState('review');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get('http://127.0.0.1:5000/api/reviews');
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleOpenModal = () => {
    if (!user) {
      navigate('/login');
    } else {
      setIsModalOpen(true);
      setSuccessMsg('');
      setErrorMsg('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post('http://127.0.0.1:5000/api/reviews', { type, rating, comment }, config);
      setSuccessMsg('Your feedback has been submitted successfully and is pending admin approval.');
      setComment('');
      setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-20 w-full overflow-hidden">
      {/* "Our Store" Header */}
      <div className="text-center mb-16 space-y-4">
        <h2 className={`text-4xl md:text-6xl font-serif italic tracking-tighter transition-colors duration-500 
          ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Our Sanctuary.
        </h2>
        <p className={`max-w-lg mx-auto uppercase tracking-[0.3em] text-[10px] font-black transition-colors duration-500
          ${isDarkMode ? 'text-emerald-400' : 'text-sage'}`}>
          The Botanical Experience
        </p>
      </div>

      <div className={`max-w-4xl mx-auto p-12 md:p-20 text-center rounded-[4rem] border shadow-2xl transition-all duration-700 relative overflow-hidden mb-24
        ${isDarkMode ? 'bg-[#0a0a0a] border-white/5' : 'bg-slate-50 border-slate-100'}`}>
        {isDarkMode && <div className="absolute inset-0 bg-emerald-500/5 blur-[100px]" />}
        
        <MessageSquareQuote size={48} className={`mx-auto mb-8 opacity-20 ${isDarkMode ? 'text-white' : 'text-slate-900'}`} />
        
        <p className={`text-xl md:text-3xl font-serif italic leading-relaxed mb-12 relative z-10 
          ${isDarkMode ? 'text-white/80' : 'text-slate-700'}`}>
          "We cultivate more than just plants. We nurture a community of botanical enthusiasts dedicated to the art of natural elegance."
        </p>

        <button 
          onClick={handleOpenModal}
          className={`relative z-10 px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] transition-transform hover:scale-105
            ${isDarkMode ? 'bg-emerald-500 text-white hover:bg-emerald-400' : 'bg-slate-900 text-white hover:bg-sage'}`}
        >
          Share Your Experience
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-10">
          <div className={`h-[1px] flex-grow ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
          <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>
            Curated Client Testimonials
          </span>
          <div className={`h-[1px] flex-grow ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
        </div>

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
                      {review.type === 'complaint' ? 'Feature Feedback' : 'Verified Purchase'}
                    </span>
                    {review.type === 'review' && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'} 
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <p className={`font-serif italic text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-white/80' : 'text-slate-600'}`}>
                    "{review.comment}"
                  </p>
                </div>
                <div className={`pt-6 border-t font-black uppercase text-[10px] tracking-widest ${isDarkMode ? 'border-white/10 text-white/40' : 'border-slate-100 text-slate-400'}`}>
                  — {review.userName}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm
              ${isDarkMode ? 'bg-black/80' : 'bg-slate-900/40'}`}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`relative w-full max-w-lg p-8 md:p-12 rounded-[3rem] shadow-2xl border
                ${isDarkMode ? 'bg-[#0d0d0d] border-white/10 text-white' : 'bg-white border-slate-100 text-slate-900'}`}
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className={`absolute top-8 right-8 w-10 h-10 rounded-full flex items-center justify-center transition-colors
                  ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200'}`}
              >
                <X size={18} />
              </button>

              <h3 className="text-3xl font-serif italic mb-2">Share Feedback.</h3>
              <p className={`text-sm mb-8 ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>
                Your experience helps us nurture our botanical sanctuary.
              </p>

              {successMsg ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 border border-emerald-500/30">
                    <Star className="fill-emerald-500" />
                  </div>
                  <p className="font-serif italic text-xl">{successMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMsg && (
                    <div className="bg-rose-500/10 text-rose-500 p-4 rounded-xl flex items-center gap-3 text-[10px] uppercase font-black tracking-widest border border-rose-500/20">
                      <AlertCircle size={14} />
                      {errorMsg}
                    </div>
                  )}

                  <div className="space-y-3">
                    <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/60' : 'text-slate-500'}`}>
                      Feedback Type
                    </label>
                    <select 
                      value={type} 
                      onChange={(e) => setType(e.target.value)}
                      className={`w-full p-4 text-sm outline-none rounded-2xl transition-colors
                        ${isDarkMode ? 'bg-white/5 border border-white/10 focus:border-emerald-500' : 'bg-slate-50 border border-slate-200 focus:border-sage'}`}
                    >
                      <option value="review">Store Review</option>
                      <option value="complaint">Report Issue / Complaint</option>
                    </select>
                  </div>

                  {type === 'review' && (
                    <div className="space-y-3">
                      <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/60' : 'text-slate-500'}`}>
                        Rating
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="p-1 transition-transform hover:scale-110"
                          >
                            <Star size={24} className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/60' : 'text-slate-500'}`}>
                      Your Message
                    </label>
                    <textarea 
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                      placeholder="Share your thoughts..."
                      className={`w-full p-4 text-sm outline-none rounded-2xl min-h-[120px] transition-colors resize-none
                        ${isDarkMode ? 'bg-white/5 border border-white/10 focus:border-emerald-500' : 'bg-slate-50 border border-slate-200 focus:border-sage'}`}
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-5 rounded-2xl font-black tracking-[0.3em] uppercase text-[10px] transition-all flex items-center justify-center gap-3
                      ${isDarkMode 
                        ? 'bg-emerald-500 text-white hover:bg-emerald-400' 
                        : 'bg-slate-900 text-white hover:bg-sage'}
                      ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                    <Send size={14} />
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
