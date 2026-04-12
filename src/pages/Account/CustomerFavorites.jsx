import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartOff } from 'lucide-react';
import { Link, useOutletContext } from 'react-router-dom';
import { useFavorites } from '@/context/FavoritesContext';
import { ProductCard } from '@/components/shop/ProductCard';
import { cn } from '@/lib/utils';

const CustomerFavorites = () => {
  const { favorites } = useFavorites();
  const { isDarkMode } = useOutletContext();

  return (
    <div className="space-y-12">
      {favorites.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "flex flex-col items-center justify-center text-center py-40 rounded-[3rem] border-2 border-dashed",
            isDarkMode ? "border-white/10 bg-white/[0.02]" : "border-slate-100 bg-slate-50"
          )}
        >
          <HeartOff size={48} className={cn("mb-6", isDarkMode ? "text-white/10" : "text-slate-200")} />
          <h2 className="text-3xl font-serif italic mb-4">Your sanctuary is waiting.</h2>
          <Link to="/shop/all" className={cn("px-10 py-5 rounded-full font-black uppercase tracking-widest text-[10px] transition-all hover:scale-105", isDarkMode ? "bg-emerald-500 text-white" : "bg-slate-900 text-white")}>
            Discover Collection
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {favorites.map((product) => (
              <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={product.id}>
                <ProductCard {...product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default CustomerFavorites;
