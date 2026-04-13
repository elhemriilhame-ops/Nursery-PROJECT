import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useProducts } from '@/context/ProductContext';
import { ArrowLeft, Clock, User, Bookmark, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function GuideDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);

  const { guides } = useProducts();

  useEffect(() => {
    const fetchGuide = async () => {
      // 1. Try local context first (fixes mock IDs like 'g1')
      const localGuide = guides.find(g => g.id === id || g._id === id);
      if (localGuide) {
        setGuide(localGuide);
        setLoading(false);
        return;
      }

      // 2. Only fetch from API if not in context
      try {
        const { data } = await axios.get(`http://localhost:5000/api/guides/${id}`);
        setGuide(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching guide:', error);
        setLoading(false);
      }
    };
    fetchGuide();
  }, [id, guides]);

  if (loading) {
    return (
      <div className={`min-h-screen pt-40 pb-20 flex items-center justify-center font-sans uppercase tracking-widest text-[10px] font-black
        ${isDarkMode ? 'bg-[#050505] text-white/50' : 'bg-[#FCFCFB] text-slate-400'}`}>
        Loading Manuscript...
      </div>
    );
  }

  if (!guide) {
    return (
      <div className={`min-h-screen pt-40 pb-20 flex flex-col items-center justify-center font-sans
        ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-[#FCFCFB] text-slate-900'}`}>
        <h2 className="text-4xl font-serif italic mb-6">Archive Destroyed</h2>
        <button onClick={() => navigate('/guides')} className="border-b border-current pb-1 uppercase tracking-widest text-xs font-black">
          Return to Library
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-32 pb-20 transition-colors duration-700 font-sans ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-[#FCFCFB] text-slate-900'}`}>
      <main className="container mx-auto px-6 max-w-4xl">
        <button 
          onClick={() => navigate('/guides')}
          className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] mb-12 hover:translate-x-[-8px] transition-transform
            ${isDarkMode ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
        >
          <ArrowLeft size={16} /> Returns to Library
        </button>

        <article className="space-y-12">
          {/* Header */}
          <header className="space-y-8 text-center max-w-3xl mx-auto">
            <div className={`text-[10px] uppercase font-black tracking-[0.4em] mb-4 ${isDarkMode ? 'text-emerald-500' : 'text-sage'}`}>
              {guide.category} • The Botanist Registry
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-black italic tracking-tighter leading-[0.9]">
              {guide.title}
            </h1>
            <p className={`text-xl md:text-2xl font-serif italic leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>
              "{guide.description}"
            </p>
            
            <div className={`flex flex-wrap items-center justify-center gap-6 pt-8 border-t ${isDarkMode ? 'border-white/10' : 'border-slate-100'}`}>
              <div className="flex items-center gap-2">
                <User size={16} className={isDarkMode ? 'text-emerald-500' : 'text-sage'} />
                <span className="text-[10px] font-black uppercase tracking-widest">{guide.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className={isDarkMode ? 'text-emerald-500' : 'text-sage'} />
                <span className="text-[10px] font-black uppercase tracking-widest">{guide.date}</span>
              </div>
            </div>
          </header>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`w-full aspect-video md:aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl border ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}
          >
            <img src={guide.image} alt={guide.title} className="w-full h-full object-cover" />
          </motion.div>

          {/* Content */}
          <div className={`max-w-3xl mx-auto prose prose-xl dark:prose-invert 
            [&_h1]:text-3xl md:[&_h1]:text-4xl [&_h1]:font-black [&_h1]:tracking-tight [&_h1]:mb-12
            [&_h2]:text-xl md:[&_h2]:text-3xl [&_h2]:font-black [&_h2]:tracking-tight [&_h2]:mt-16 [&_h2]:mb-8 [&_h2]:border-b-2 [&_h2]:pb-4
            [&_h3]:text-lg md:[&_h3]:text-xl [&_h3]:font-black [&_h3]:mt-12 [&_h3]:mb-4
            [&_p]:leading-snug [&_p]:text-lg md:[&_p]:text-xl [&_p]:mb-10 [&_p]:font-medium
            [&_li]:leading-snug [&_li]:text-lg md:[&_li]:text-xl [&_li]:mb-4
            prose-img:rounded-[2.5rem]
            ${isDarkMode ? '[&_h1]:text-white [&_h2]:text-emerald-400 [&_h3]:text-emerald-500 [&_p]:text-white/80' : '[&_h1]:text-slate-900 [&_h2]:text-emerald-700 [&_h3]:text-emerald-800 [&_p]:text-slate-700'}`}>
            <ReactMarkdown>{guide.content}</ReactMarkdown>
          </div>

          {/* Footer Actions */}
          <div className={`max-w-2xl mx-auto pt-12 border-t flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-slate-100'}`}>
            <button className={`w-12 h-12 rounded-full flex items-center justify-center border transition-colors ${isDarkMode ? 'border-white/10 hover:bg-white/5 text-white' : 'border-slate-200 hover:bg-slate-50 text-slate-900'}`}>
              <Bookmark size={20} />
            </button>
            <button className={`w-12 h-12 rounded-full flex items-center justify-center border transition-colors ${isDarkMode ? 'border-white/10 hover:bg-white/5 text-white' : 'border-slate-200 hover:bg-slate-50 text-slate-900'}`}>
              <Share2 size={20} />
            </button>
          </div>
        </article>
      </main>
    </div>
  );
}
