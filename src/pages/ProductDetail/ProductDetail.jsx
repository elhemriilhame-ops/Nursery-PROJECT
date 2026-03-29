import { useParams, Link } from 'react-router-dom';
import { FLOWERS, PLANTS, OILS } from '@/data/mockData';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  ChevronRight, 
  Heart, 
  Ruler, 
  ShieldCheck, 
  Truck,
  Sun,
  ThermometerSun,
  Waves,
  Droplet,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/shop/ProductCard';
import { useCart } from '@/context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('Standard');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const product = useMemo(() => {
    return [...FLOWERS, ...PLANTS, ...OILS].find(p => p.id === id);
  }, [id]);

  if (!product) return <div className="pt-32 text-center h-screen">Product Not Found.</div>;

  const related = [...FLOWERS, ...PLANTS, ...OILS].filter(p => p.id !== id && p.category === product.category).slice(0, 4);

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-6 py-6 flex items-center space-x-2 text-[10px] uppercase tracking-widest text-charcoal/40 font-bold">
        <Link to="/" className="hover:text-sage transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link to={`/shop/${product.category.toLowerCase()}`} className="hover:text-sage transition-colors">{product.category}</Link>
        <ChevronRight size={12} />
        <span className="text-charcoal">{product.name}</span>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 py-12">
        {/* Gallery */}
        <div className="space-y-6">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8 }}
             className="aspect-[4/5] bg-cover bg-center shadow-2xl relative overflow-hidden group"
             style={{ backgroundImage: `url("${product.image}")` }}
           >
             <div className="absolute inset-0 bg-charcoal/5 group-hover:bg-transparent transition-all duration-500" />
           </motion.div>
           <div className="grid grid-cols-4 gap-4">
             {[1,2,3,4].map((i) => (
               <div key={i} className="aspect-square bg-parchment/30 cursor-pointer hover:opacity-70 transition-opacity border border-border overflow-hidden">
                 <img src={product.image} className="w-full h-full object-cover" />
               </div>
             ))}
           </div>
        </div>

        {/* Product Info */}
        <div className="space-y-12">
          <div className="space-y-6 border-b border-border pb-12">
            <div className="flex justify-between items-baseline">
              <span className="text-[10px] uppercase tracking-[0.4em] text-sage font-bold">{product.category}</span>
              <div className="flex space-x-1 text-sage">
                 {'★'.repeat(5)}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl text-charcoal leading-tight">{product.name}</h1>
            <p className="text-lg font-sans text-charcoal/80">{product.price} DH</p>
            <p className="text-charcoal/60 leading-relaxed max-w-lg font-sans italic text-sm">
               {product.description}
            </p>
          </div>

          {/* Plant Care Advanced Section - MOVED BEFORE SIZE */}
          {product.care && (
            <div className="bg-[#fbfcfa] border border-sage/10 rounded-[2.5rem] p-10 space-y-8 shadow-sm">
                <div className="flex items-center gap-3">
                   <div className="bg-sage/10 p-2 rounded-full">
                      <Info size={16} className="text-sage" />
                   </div>
                   <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-charcoal/40 italic">Botanical Care Guide</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6">
                   <div className="space-y-3 group cursor-default">
                      <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border border-border group-hover:border-sage/30 transition-colors">
                         <Sun size={20} className="text-sage/60 group-hover:text-sage transition-colors" strokeWidth={1.5} />
                      </div>
                      <div className="space-y-1">
                         <p className="text-[9px] font-black uppercase tracking-widest text-charcoal/30">Light</p>
                         <p className="text-xs font-bold text-charcoal/80">{product.care.light}</p>
                      </div>
                   </div>

                   <div className="space-y-3 group cursor-default">
                      <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border border-border group-hover:border-sage/30 transition-colors">
                         <ThermometerSun size={20} className="text-sage/60 group-hover:text-sage transition-colors" strokeWidth={1.5} />
                      </div>
                      <div className="space-y-1">
                         <p className="text-[9px] font-black uppercase tracking-widest text-charcoal/30">Temperature</p>
                         <p className="text-xs font-bold text-charcoal/80">{product.care.temperature}</p>
                      </div>
                   </div>

                   <div className="space-y-3 group cursor-default">
                      <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border border-border group-hover:border-sage/30 transition-colors">
                         <Waves size={20} className="text-sage/60 group-hover:text-sage transition-colors" strokeWidth={1.5} />
                      </div>
                      <div className="space-y-1">
                         <p className="text-[9px] font-black uppercase tracking-widest text-charcoal/30">Humidity</p>
                         <p className="text-xs font-bold text-charcoal/80">{product.care.humidity}</p>
                      </div>
                   </div>

                   <div className="space-y-3 group cursor-default">
                      <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border border-border group-hover:border-sage/30 transition-colors">
                         <Droplet size={20} className="text-sage/60 group-hover:text-sage transition-colors" strokeWidth={1.5} />
                      </div>
                      <div className="space-y-1">
                         <p className="text-[9px] font-black uppercase tracking-widest text-charcoal/30">Watering</p>
                         <p className="text-xs font-bold text-charcoal/80">{product.care.watering}</p>
                      </div>
                   </div>

                   <div className="space-y-3 group cursor-default">
                      <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border border-border group-hover:border-sage/30 transition-colors">
                         <Layers size={20} className="text-sage/60 group-hover:text-sage transition-colors" strokeWidth={1.5} />
                      </div>
                      <div className="space-y-1">
                         <p className="text-[9px] font-black uppercase tracking-widest text-charcoal/30">Soil Type</p>
                         <p className="text-xs font-bold text-charcoal/80">{product.care.soil}</p>
                      </div>
                   </div>

                   <div className="space-y-3 group cursor-default">
                      <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border border-border group-hover:border-sage/30 transition-colors">
                         <Sparkles size={20} className="text-sage/60 group-hover:text-sage transition-colors" strokeWidth={1.5} />
                      </div>
                      <div className="space-y-1">
                         <p className="text-[9px] font-black uppercase tracking-widest text-charcoal/30">Compatibility</p>
                         <p className="text-xs font-bold text-charcoal/80">{product.care.sensitivity}</p>
                      </div>
                   </div>
                </div>
            </div>
          )}

          {/* Size Options */}
          <div className="space-y-6">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest">
               <span>Select Size</span>
               <button className="flex items-center space-x-1 underline hover:text-sage transition-colors">
                  <Ruler size={14} /> <span>Size Guide</span>
               </button>
            </div>
            <div className="flex space-x-4">
              {['Small', 'Standard', 'Deluxe', 'Premium'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-8 py-4 border text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${
                    selectedSize === size 
                      ? 'bg-charcoal text-white border-charcoal' 
                      : 'border-border text-charcoal/60 hover:border-charcoal/30'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and CTA */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center border border-border w-fit px-4 h-16 bg-parchment/10">
               <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="text-xl px-4">-</button>
               <span className="text-lg w-12 text-center font-bold px-4">{quantity}</span>
               <button onClick={() => setQuantity(q => q+1)} className="text-xl px-4">+</button>
            </div>
            <Button
              size="lg"
              onClick={() => addToCart(product, quantity, selectedSize)}
              className="flex-1 bg-charcoal text-white hover:bg-[var(--maroon)] px-12 h-16 rounded-none uppercase tracking-[0.3em] text-[10px] font-bold shadow-2xl transition-all duration-300 transform active:scale-95 group"
            >
              <ShoppingBag size={18} className="mr-3 group-hover:rotate-12 transition-transform" />
              Add to Boutique Basket
            </Button>
            <Button size="icon" variant="outline" className="w-16 h-16 rounded-none border-border group">
               <Heart size={20} className="text-charcoal group-hover:fill-sage group-hover:text-sage transition-all" />
            </Button>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border">
            <div className="flex items-start space-x-4">
               <Truck size={24} className="text-sage mt-1" strokeWidth={1} />
               <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-widest">Careful Delivery</h4>
                  <p className="text-xs text-charcoal/60 mt-2 font-sans">Delivered by our specialized team within 24-48 hours. Guaranteed freshness.</p>
               </div>
            </div>
            <div className="flex items-start space-x-4">
               <ShieldCheck size={24} className="text-sage mt-1" strokeWidth={1} />
               <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-widest">Premium Card Included</h4>
                  <p className="text-xs text-charcoal/60 mt-2 font-sans">Each order includes a hand-written botanical card of your choice.</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* More Info Tabs */}
      <div className="container mx-auto px-6 py-24 mb-32 border-t border-border">
          <div className="max-w-3xl mx-auto space-y-16">
            <div className="text-center space-y-4">
               <h3 className="text-3xl font-serif">A Little More about {product.name}</h3>
               <p className="text-sm text-charcoal/60 leading-relaxed font-sans font-light italic">
                 Everything we source is ethical, sustainable, and chosen for its longevity and aesthetic appeal.
               </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-sm text-charcoal/80 leading-relaxed font-sans">
              <div className="space-y-4">
                <h4 className="font-bold uppercase tracking-widest text-[10px]">Botanical Origin</h4>
                <p>Carefully sourced from our partner farms in the South of France and sustainable nurseries across Europe. We ensure the highest standard of vibrant growth.</p>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold uppercase tracking-widest text-[10px]">Packaging</h4>
                <p>Delivered in specialized, eco-friendly kraft paper and silk ribbon, ensuring minimal environmental impact and maximal unboxing delight.</p>
              </div>
            </div>
          </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
         <div className="container mx-auto px-6 py-32 bg-parchment/20 border-t border-border mt-32">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl">You Might Also Adore</h2>
              <p className="text-[10px] uppercase tracking-[0.4em] text-charcoal/40 font-bold">Complements for your botanical journey</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
               {related.map(p => <ProductCard key={p.id} {...p} />)}
            </div>
         </div>
      )}
    </div>
  );
}
