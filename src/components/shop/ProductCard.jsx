import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { useFavorites } from '@/context/FavoritesContext';

export function ProductCard({ id, name, price, image, category, description, featured }) {
  const { addToCart } = useCart();
  const { isDarkMode } = useTheme();
  const { toggleFavorite, isFavorite } = useFavorites();

  const isFav = isFavorite(id);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevents navigating to product detail
    e.stopPropagation();
    toggleFavorite({ id, name, price, image, category, description, featured });
  };

  const handleAddToCart = () => {
    addToCart({ id, name, price, image, category, description });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group relative"
    >
      <div className={`relative overflow-hidden transition-all duration-700 rounded-[2.5rem] border shadow-sm group-hover:shadow-2xl
        ${isDarkMode ? 'bg-[#141414] border-white/5 shadow-black' : 'bg-white border-slate-100 shadow-slate-200/50'}`}>
        
        {/* Featured Badge */}
        {featured && (
          <span className={`absolute top-6 left-6 z-10 text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg
            ${isDarkMode ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-sage text-white'}`}>
             Collector Choice
          </span>
        )}

        {/* Favorite Icon */}
        <button 
          onClick={handleFavoriteClick}
          className={`absolute top-6 right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-sm hover:shadow-lg
            ${isFav 
              ? (isDarkMode ? 'bg-rose-500/20 text-rose-500 opacity-100' : 'bg-rose-50 text-rose-500 opacity-100') 
              : (isDarkMode ? 'bg-white/5 text-white/40 hover:text-rose-500 hover:bg-rose-500/10' : 'bg-white text-slate-400 hover:text-rose-500 hover:bg-rose-50')}`}
        >
           <Heart size={18} className={isFav ? "fill-current" : ""} />
        </button>

        {/* Product Image */}
        <Link to={`/product/${id}`}>
          <div className="overflow-hidden aspect-[4/5]">
            <motion.div
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
              className={`w-full h-full bg-cover bg-center transition-all duration-700
                ${isDarkMode ? 'brightness-90 group-hover:brightness-110' : 'grayscale-[0.1] group-hover:grayscale-0'}`}
              style={{ backgroundImage: `url("${image}")` }}
            />
          </div>
        </Link>

        {/* Action Overlay (Desktop) */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center space-x-4">
           <Button onClick={handleAddToCart} size="icon" className="w-14 h-14 bg-white text-black rounded-3xl hover:bg-emerald-500 hover:text-white transition-all hover:scale-110 active:scale-90">
              <ShoppingBag size={22} />
           </Button>
           <Button asChild size="icon" className="w-14 h-14 bg-white/10 backdrop-blur-xl text-white border border-white/20 rounded-3xl hover:bg-white hover:text-black transition-all hover:scale-110 active:scale-90">
              <Link to={`/product/${id}`}><Eye size={22} /></Link>
           </Button>
        </div>

        {/* Mobile Quick Add (Optional / Peek) */}
        <div className="absolute bottom-0 inset-x-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 lg:hidden">
           <Button onClick={handleAddToCart} className="w-full bg-emerald-500 text-white rounded-2xl py-6 font-black uppercase tracking-widest text-[10px]">
              QUICK ADDD
           </Button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-8 space-y-3 px-4 text-center">
        <div className="space-y-1">
          <span className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors
            ${isDarkMode ? 'text-emerald-500' : 'text-sage'}`}>
            {category}
          </span>
          <h3 className={`text-xl font-serif font-black tracking-tight leading-none group-hover:translate-y-[-2px] transition-all duration-300
            ${isDarkMode ? 'text-white group-hover:text-emerald-400' : 'text-slate-900 group-hover:text-sage'}`}>
            <Link to={`/product/${id}`}>{name}</Link>
          </h3>
        </div>
        <div className="flex items-center justify-center gap-3">
           <div className={`h-[1px] w-4 ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
           <p className={`text-sm font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{price} DH</p>
           <div className={`h-[1px] w-4 ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
        </div>
      </div>
    </motion.div>
  );
}
