import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { useProducts } from '@/context/ProductContext';
import { BookOpen, Sparkles } from 'lucide-react';

export function PlantGuidesTeaser() {
  const { isDarkMode } = useTheme();
  const { getFeaturedGuides, loading } = useProducts();
  const [imgError, setImgError] = useState(false);
  
  const featuredGuide = getFeaturedGuides()[0] || {
    title: 'Mastering the Art of Greenery',
    description: 'Every plant tells a story. Discover the secrets of light, water, and earth.',
    image: '/plant-1.png'
  };

  const displayImage = imgError ? 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80' : featuredGuide.image;
  return (
    <section className="relative flex flex-col md:flex-row items-center py-32 overflow-visible">
      
      {/* Visual Part */}
      <div className={`w-full md:w-2/3 h-[75vh] relative overflow-hidden group rounded-[3.5rem] shadow-2xl transition-all duration-700
        ${isDarkMode ? 'border-white/5 shadow-black' : 'border-slate-100 shadow-slate-200'}`}>
        <motion.div
           whileHover={{ scale: 1.1 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className={`w-full h-full bg-cover bg-center transition-all duration-1000
             ${isDarkMode ? 'brightness-75 group-hover:brightness-100' : 'grayscale-[0.2] group-hover:grayscale-0'}`}
           style={{ backgroundImage: `url("${displayImage}")` }}
        />
        <img 
          src={featuredGuide.image} 
          onError={() => setImgError(true)} 
          className="hidden" 
          alt="" 
        />
        
        {/* Animated Accent Frames */}
        <div className={`absolute top-12 left-12 w-48 h-48 border-l-2 border-t-2 transition-all duration-500
          ${isDarkMode ? 'border-emerald-500/20 group-hover:border-emerald-500/50' : 'border-sage/20 group-hover:border-sage'}`} />
        
        {/* Floating Interactive Badge (Dark Mode only) */}
        {isDarkMode && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110">
             <Sparkles className="text-emerald-500" size={32} />
          </div>
        )}
      </div>

      {/* Content Part (Overlapping slightly on desktop) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full md:w-1/2 md:-ml-32 z-10 p-12 lg:p-24 rounded-[3.5rem] border shadow-[0_35px_80px_rgba(0,0,0,0.15)] transition-all duration-700
          ${isDarkMode ? 'bg-[#141414] border-white/10 text-white shadow-black' : 'bg-white border-slate-100 text-slate-800'}`}
      >
        <div className="space-y-10 relative">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors ${isDarkMode ? 'text-emerald-500' : 'text-sage'}`}>
                The Botanist's Journal
              </span>
              <BookOpen size={14} className={isDarkMode ? 'text-emerald-500' : 'text-sage'} />
            </div>
            <h2 className={`text-4xl md:text-5xl lg:text-5xl font-serif font-black tracking-tighter leading-[1.1] italic`}>
              {featuredGuide.title}
            </h2>
          </div>
          
          <p className={`leading-relaxed max-w-md font-serif text-lg italic transition-colors
            ${isDarkMode ? 'text-white' : 'text-slate-600'}`}>
            "{featuredGuide.description}"
          </p>
          
          <p className={`leading-relaxed max-w-sm text-sm font-bold transition-colors
            ${isDarkMode ? 'text-white/60' : 'text-slate-500'}`}>
            Our head botanists have compiled a library of essential guides to help you create an indoor sanctuary that thrives. Discover the secrets of light, water, and earth.
          </p>
          
          <div className="pt-6">
            <Link to="/guides">
              <Button className={`group px-12 py-8 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl transition-all hover:scale-105 active:scale-95
                ${isDarkMode 
                  ? 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-emerald-500/20' 
                  : 'bg-slate-900 text-white hover:bg-sage shadow-slate-900/10'}`}>
                 Explore The Archives
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
