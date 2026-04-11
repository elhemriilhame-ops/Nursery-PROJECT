import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowLeft, HeartOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '@/context/FavoritesContext';
import { useTheme } from '@/context/ThemeContext';
import { ProductCard } from '@/components/shop/ProductCard';

export default function MyFavorites() {
  const { favorites } = useFavorites();
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen pt-32 pb-40 transition-colors duration-700 ${isDarkMode ? 'bg-[#090909] text-white' : 'bg-[#FCFCFB] text-slate-900'}`}>
      <div className="container mx-auto px-6 max-w-7xl space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b pb-12 transition-colors border-white/5">
          <div className="space-y-6">
            <Link to="/shop/all" className={`inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-colors ${isDarkMode ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>
              <ArrowLeft size={14} /> Back to Botanicals
            </Link>
            <h1 className="text-5xl md:text-7xl font-serif font-black italic tracking-tighter">My Favorites.</h1>
            <p className={`max-w-md text-sm leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-slate-500'}`}>
              Your curated sanctuary of coveted botanical pieces, handpicked from our collection.
            </p>
          </div>
          
          <div className={`px-6 py-4 rounded-2xl border flex items-center gap-4 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
            <Heart size={20} className={favorites.length > 0 ? "fill-rose-500 text-rose-500" : "text-slate-400"} />
            <div>
              <p className="text-2xl font-black">{favorites.length}</p>
              <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Saved Items</p>
            </div>
          </div>
        </div>

        {/* Content */}
        {favorites.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col items-center justify-center text-center py-32 rounded-[4rem] border-2 border-dashed ${isDarkMode ? 'border-white/5 bg-white/[0.02]' : 'border-slate-100 bg-slate-50'}`}
          >
            <HeartOff size={64} className={`mb-8 ${isDarkMode ? 'text-white/10' : 'text-slate-200'}`} />
            <h2 className="text-3xl font-serif italic mb-4">Your sanctuary is waiting.</h2>
            <p className={`mb-10 max-w-sm ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>
              Explore our boutique and save your favorite pieces to revisit them later.
            </p>
            <Link to="/shop/all" className={`px-10 py-5 rounded-full font-black uppercase tracking-widest text-[10px] transition-all hover:scale-105 ${isDarkMode ? 'bg-emerald-500 text-white hover:bg-emerald-400' : 'bg-slate-900 text-white hover:bg-sage'}`}>
              Discover the Collection
            </Link>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {favorites.map((product) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={product.id}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
