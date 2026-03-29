import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

export function ProductCard({ id, name, price, image, category, description, featured }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, price, image, category, description });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group"
    >
      <div className="relative overflow-hidden bg-parchment/30">
        {/* Featured Badge */}
        {featured && (
          <span className="absolute top-4 left-4 z-10 bg-sage text-white text-[10px] uppercase tracking-widest px-3 py-1 font-semibold rounded-none">
            Collector Choice
          </span>
        )}

        {/* Product Image */}
        <Link to={`/product/${id}`}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
            className="aspect-[4/5] bg-cover bg-center grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
            style={{ backgroundImage: `url("${image}")` }}
          />
        </Link>

        {/* Hover Overlay Actions */}
        <div className="absolute inset-0 bg-charcoal/5 group-hover:bg-charcoal/20 transition-all duration-500 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-3">
          <Button onClick={handleAddToCart} size="icon" variant="secondary" className="bg-white/90 rounded-none w-12 h-12 shadow-xl hover:bg-white text-charcoal active:scale-95 transition-all">
            <ShoppingBag size={20} />
          </Button>
          <Button asChild size="icon" variant="secondary" className="bg-white/90 rounded-none w-12 h-12 shadow-xl hover:bg-white text-charcoal active:scale-95 transition-all">
            <Link to={`/product/${id}`}><Eye size={20} /></Link>
          </Button>
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-0 inset-x-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <Button onClick={handleAddToCart} className="w-full bg-white text-charcoal border border-charcoal/10 hover:bg-charcoal hover:text-white rounded-none uppercase tracking-[0.2em] text-[10px] font-bold py-6 shadow-2xl">
            Add To Cart
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-8 space-y-4 px-1 text-center">
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-[0.3em] text-charcoal font-bold">{category}</span>
          <h3 className="text-xl font-serif text-charcoal group-hover:text-sage transition-colors duration-300">
            <Link to={`/product/${id}`}>{name}</Link>
          </h3>
        </div>
        <p className="text-sm font-sans text-charcoal tracking-wider">{price} DH</p>
      </div>
    </motion.div>
  );
}

