import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { name: 'House Plants', slug: 'plants', image: '/plant-1.png' },
  { name: 'Bespoke Bouquets', slug: 'flowers', image: '/flower-1.png' },
  { name: 'Botanical Elixirs', slug: 'oils', image: '/oil-1.png' }
];

export function CategoryPreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full p-4 md:p-8">
      {CATEGORIES.map((cat, idx) => (
        <Link 
          key={cat.slug} 
          to={`/shop/${cat.slug}`} 
          className="group relative h-[70vh] w-full overflow-hidden block"
        >
          {/* Image */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000"
            style={{ backgroundImage: `url("${cat.image}")` }}
          />

          {/* Overlay and Label */}
          <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-charcoal/60 to-transparent transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
             <span className="text-white text-[10px] uppercase tracking-[0.4em] font-medium block mb-2 opacity-80">Explore The</span>
             <h3 className="text-white text-3xl font-serif">{cat.name}</h3>
          </div>

          {/* Centered Minimal Label (visible when NOT hovered) */}
          <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-500 pointer-events-none p-4">
             <div className="bg-white/80 backdrop-blur-sm p-6 px-10 border border-charcoal/5 text-center">
                 <h3 className="text-xl font-serif text-charcoal">{cat.name}</h3>
                 <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mt-1 block">Discover</span>
             </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
