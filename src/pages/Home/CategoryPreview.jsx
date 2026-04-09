import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const CATEGORIES = [
  { name: 'House Plants', slug: 'plants', image: '/plant-1.png' },
  { name: 'Bespoke Bouquets', slug: 'flowers', image: '/flower-1.png' },
  { name: 'Botanical Elixirs', slug: 'oils', image: '/oil-1.png' }
];

export function CategoryPreview() {
  const { isDarkMode } = useTheme();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
      {CATEGORIES.map((cat, idx) => (
        <Link 
          key={cat.slug} 
          to={`/shop/${cat.slug}`} 
          className="group relative h-[75vh] w-full overflow-hidden block rounded-[3rem] border border-transparent hover:border-emerald-500/20 transition-all duration-700 shadow-sm hover:shadow-2xl"
        >
          {/* Image */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000
              ${isDarkMode ? 'brightness-75 grayscale-[0.2] group-hover:brightness-100 group-hover:grayscale-0' : 'grayscale-[0.3] group-hover:grayscale-0'}`}
            style={{ backgroundImage: `url("${cat.image}")` }}
          />

          {/* Depth Overlay */}
          <div className={`absolute inset-0 transition-opacity duration-700 opacity-30 
            ${isDarkMode ? 'bg-gradient-to-b from-[#090909] to-transparent' : 'bg-transparent'}`} />

          {/* Interactive Information Overlay (Hover) */}
          <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 opacity-0 group-hover:opacity-100 z-10 text-white">
             <motion.span 
               initial={{ opacity: 0, x: -10 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] block mb-4"
             >
                Explore The Collection
             </motion.span>
             <h3 className="text-white text-4xl font-serif font-black tracking-tight italic">{cat.name}</h3>
             <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-[1px] bg-white/30" />
                <span className="text-[10px] text-white/60 font-black uppercase tracking-widest">Shop Collection</span>
             </div>
          </div>

          {/* Centered Modern Card (Visible initially) */}
          <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-700 pointer-events-none p-4 z-20">
             <div className={`backdrop-blur-xl p-8 px-12 border text-center rounded-[2rem] shadow-2xl transition-all scale-100 group-hover:scale-110
               ${isDarkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-white/80 border-slate-100 text-slate-900'}`}>
                 <h3 className="text-2xl font-serif font-black tracking-tighter italic">{cat.name}</h3>
                 <div className={`h-[2px] w-12 mx-auto my-3 transition-all group-hover:w-20 ${isDarkMode ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-sage'}`} />
                 <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white/60' : 'text-slate-400'}`}>Discover More</span>
             </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
