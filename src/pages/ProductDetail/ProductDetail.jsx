import { useParams, Link } from 'react-router-dom';
import { useProducts } from '@/context/ProductContext';
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
  Info,
  Star,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/shop/ProductCard';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const { products, loading } = useProducts();
  const [selectedSize, setSelectedSize] = useState('Standard');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const product = useMemo(() => {
    return products.find(p => p.id === id);
  }, [id, products]);

  if (loading) return (
    <div className="pt-32 flex justify-center h-screen bg-[#FCFCFB] dark:bg-[#090909]">
      <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
    </div>
  );

  if (!product) return <div className="pt-32 text-center h-screen font-serif text-3xl opacity-40">Specimen Not Found.</div>;

  const related = products.filter(p => p.id !== id && p.category === product.category).slice(0, 4);

  return (
    <div className={`pt-24 min-h-screen transition-colors duration-700 ${isDarkMode ? 'bg-[#090909]' : 'bg-[#FCFCFB]'}`}>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-6 py-8 flex items-center space-x-3 text-[10px] uppercase font-black tracking-[0.2em]">
        <Link to="/" className={`transition-colors ${isDarkMode ? 'text-white/40 hover:text-emerald-500' : 'text-slate-400 hover:text-sage'}`}>Home</Link>
        <ChevronRight size={10} className={isDarkMode ? 'text-white/20' : 'text-slate-300'} />
        <Link to={`/shop/${product.category.toLowerCase()}`} className={`transition-colors ${isDarkMode ? 'text-white/40 hover:text-emerald-500' : 'text-slate-400 hover:text-sage'}`}>{product.category}</Link>
        <ChevronRight size={10} className={isDarkMode ? 'text-white/20' : 'text-slate-300'} />
        <span className={isDarkMode ? 'text-white shadow-emerald-500/10' : 'text-slate-900'}>{product.name}</span>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 py-6">
        {/* Gallery Section */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`aspect-square md:aspect-[4/5] lg:aspect-square bg-cover bg-center rounded-[3.5rem] shadow-2xl relative overflow-hidden group border transition-all duration-700
               ${isDarkMode ? 'border-white/5 shadow-black' : 'border-slate-100 shadow-slate-200'}`}
            style={{ backgroundImage: `url("${product.image}")` }}
          >
            <div className={`absolute inset-0 transition-opacity duration-500 ${isDarkMode ? 'bg-black/20 group-hover:bg-transparent' : 'bg-transparent'}`} />

            {/* Floating Icons */}
            <div className="absolute top-10 right-10 flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <button className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <Share2 size={20} />
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`aspect-square rounded-2xl cursor-pointer hover:scale-105 transition-all border overflow-hidden
                 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                <img src={product.image} className={`w-full h-full object-cover ${isDarkMode ? 'brightness-75' : ''}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-16">
          <div className="space-y-8 relative">
            <div className={`flex justify-between items-center border-b transition-colors pb-8 ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
              <div className="space-y-2">
                <span className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors
                   ${isDarkMode ? 'text-emerald-500' : 'text-sage'}`}>{product.category}</span>
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
              </div>
              <p className={`text-4xl font-serif font-black italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{product.price} DH</p>
            </div>

            <div className="space-y-4">
              <h1 className={`text-4xl md:text-5xl font-serif font-black leading-none tracking-tighter italic transition-colors
                 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {product.name}
              </h1>
              <p className={`text-xl leading-relaxed max-w-lg font-serif italic transition-colors
                 ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>
                "{product.description}"
              </p>
            </div>
          </div>

          {/* Unified Purchase & Care Hub */}
          <div className="space-y-6">
            <div className={`rounded-[2.5rem] p-8 space-y-6 border transition-all duration-700
              ${isDarkMode ? 'bg-[#141414] border-white/5 shadow-2xl shadow-black' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'}`}>
              
              {/* Mini Care Row - Top */}
              {product.care && (
                <div className={`pb-6 border-b transition-colors ${isDarkMode ? 'border-white/5' : 'border-slate-50'}`}>
                   <div className="flex items-center gap-3 mb-6">
                      <div className={`p-2 rounded-xl transition-colors ${isDarkMode ? 'bg-white/5' : 'bg-slate-50'}`}>
                        <Info size={14} className={isDarkMode ? 'text-emerald-500' : 'text-sage'} />
                      </div>
                      <h3 className={`text-[9px] font-black uppercase tracking-[0.3em] italic transition-colors
                           ${isDarkMode ? 'text-white/60' : 'text-slate-500'}`}>Botanical Care Guide</h3>
                   </div>
                   <div className="grid grid-cols-3 gap-6">
                      <CareItem icon={Sun} label="Light" value={product.care.light} color="amber" isDark={isDarkMode} />
                      <CareItem icon={ThermometerSun} label="Temp" value={product.care.temperature} color="orange" isDark={isDarkMode} />
                      <CareItem icon={Waves} label="Humidity" value={product.care.humidity} color="cyan" isDark={isDarkMode} />
                      <CareItem icon={Droplet} label="Water" value={product.care.watering} color="blue" isDark={isDarkMode} />
                      <CareItem icon={Layers} label="Substrate" value={product.care.soil} color="stone" isDark={isDarkMode} />
                      <CareItem icon={Sparkles} label="Social" value={product.care.sensitivity} color="purple" isDark={isDarkMode} />
                   </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                  <span className={isDarkMode ? 'text-white/40' : 'text-slate-400'}>Atelier Selection / Size</span>
                  <button className={`flex items-center space-x-2 transition-colors ${isDarkMode ? 'text-emerald-500 hover:text-white' : 'text-sage hover:text-slate-900'}`}>
                    <Ruler size={12} /> <span>Dimensions Guide</span>
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {['Small', 'Standard', 'Deluxe', 'Premium'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-4 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 border
                        ${selectedSize === size
                          ? (isDarkMode ? 'bg-white text-black border-white' : 'bg-slate-900 text-white border-slate-900')
                          : (isDarkMode ? 'border-white/5 text-white/40 hover:border-white/20' : 'border-slate-100 text-slate-400 hover:border-slate-900')
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                <div className={`flex items-center rounded-2xl px-4 h-16 transition-all border
                  ${isDarkMode ? 'bg-white/5 border-white/5 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'}`}>
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-xl px-2 hover:scale-125 transition-transform">-</button>
                  <span className="text-lg w-10 text-center font-black">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="text-xl px-2 hover:scale-125 transition-transform">+</button>
                </div>
                <Button
                  onClick={() => addToCart(product, quantity, selectedSize)}
                  className={`flex-1 h-16 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all hover:scale-[1.02] active:scale-95 group
                    ${isDarkMode ? 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-emerald-500/20' : 'bg-slate-900 text-white hover:bg-sage shadow-slate-900/10'}`}
                >
                  <ShoppingBag size={18} className="mr-3 group-hover:rotate-12 transition-transform" />
                  Reserve Specimen
                </Button>
                <button className={`w-16 h-16 flex items-center justify-center rounded-2xl border transition-all shrink-0 hover:scale-110
                  ${isDarkMode ? 'bg-white/5 border-white/5 text-white hover:bg-rose-500/10 hover:text-rose-500' : 'bg-white border-slate-100 text-slate-800 hover:text-rose-500'}`}>
                  <Heart size={20} className="transition-all" />
                </button>
              </div>
            </div>
          </div>

          {/* Delivery Promises */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t transition-colors ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
            <PromiseItem icon={Truck} title="Safe Harbor Delivery" desc="Specialized courier protection. Handled with botanical precision." isDark={isDarkMode} />
            <PromiseItem icon={ShieldCheck} title="Heritage Assurance" desc="Includes a handwritten card and sustainable wrapping." isDark={isDarkMode} />
          </div>
        </div>
      </div>

      {/* Narrative Section */}
      <div className={`py-40 border-t transition-colors ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
        <div className="container mx-auto px-6 max-w-4xl space-y-24">
          <div className="text-center space-y-6">
            <h3 className={`text-4xl lg:text-6xl font-serif font-black italic transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>The {product.name} Narrative</h3>
            <p className={`text-xl font-serif leading-relaxed italic transition-colors
                 ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>
              Everything we source is ethical, sustainable, and chosen for its longevity and aesthetic appeal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <NarrativeBlock title="Botanical Origin" content="Carefully sourced from our partner farms in the Atlas foothills and sustainable nurseries. We ensure the highest standard of vibrant growth." isDark={isDarkMode} />
            <NarrativeBlock title="Atelier Packaging" content="Delivered in specialized, eco-friendly kraft paper and silk ribbon, ensuring minimal environmental impact and maximal delight." isDark={isDarkMode} />
          </div>
        </div>
      </div>

      {/* Suggested Specimens */}
      {related.length > 0 && (
        <div className={`py-32 border-t transition-colors ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50/50 border-slate-100'}`}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-24 space-y-4">
              <h2 className={`text-5xl font-serif font-black italic transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Adore More</h2>
              <p className={`text-[10px] font-black uppercase tracking-[0.5em] transition-colors
                  ${isDarkMode ? 'text-emerald-500' : 'text-sage'}`}>Complements for your journey</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {related.map(p => <ProductCard key={p.id} {...p} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CareItem({ icon: Icon, label, value, color, isDark }) {
  const colorMap = {
    amber: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    orange: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    stone: 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20',
    purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  };

  return (
    <div className="space-y-4 group cursor-default">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 shadow-lg
        ${colorMap[color]} ${isDark ? '' : 'bg-opacity-10'}`}>
        <Icon size={24} strokeWidth={2} />
      </div>
      <div className="space-y-1">
        <p className={`text-[11px] font-black uppercase tracking-widest transition-colors ${isDark ? 'text-white/60' : 'text-slate-600'}`}>{label}</p>
        <p className={`text-[13px] font-black tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</p>
      </div>
    </div>
  );
}

function PromiseItem({ icon: Icon, title, desc, isDark }) {
  return (
    <div className="flex items-start gap-5 group">
      <div className={`p-4 rounded-2xl transition-all duration-500 group-hover:bg-emerald-500 group-hover:text-white
         ${isDark ? 'bg-white/5 text-emerald-500 border border-white/5 shadow-2xl shadow-black' : 'bg-slate-50 text-sage'}`}>
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <div className="space-y-2">
        <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h4>
        <p className={`text-xs leading-relaxed transition-colors ${isDark ? 'text-white/40' : 'text-slate-500'}`}>{desc}</p>
      </div>
    </div>
  );
}

function NarrativeBlock({ title, content, isDark }) {
  return (
    <div className="space-y-6 group">
      <h4 className={`text-sm font-black uppercase tracking-[0.4em] transition-colors group-hover:text-emerald-500
        ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h4>
      <p className={`text-lg font-serif italic leading-[1.8] transition-colors
        ${isDark ? 'text-white/70' : 'text-slate-600'}`}>{content}</p>
    </div>
  );
}
