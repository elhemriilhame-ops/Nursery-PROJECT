import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <div className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background with Zoom Effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: 'url("/hero.png")' }}
      >
        <div className="absolute inset-0 bg-charcoal/20 z-10" />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 text-center space-y-12 px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-6"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-white/80 py-2 border-b border-white/20">The Premium Experience</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-serif tracking-tight leading-[0.95]">
            The Art of <br />Botanical Living
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="text-white/80 text-base md:text-lg font-sans font-light tracking-wide max-w-xl mx-auto leading-relaxed"
        >
          Curated bouquets, rare house plants, and botanical elixirs for the sophisticated interior. Hand-picked for elegance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
        >
          <Button asChild size="lg" className="bg-white text-charcoal hover:bg-[var(--maroon)] hover:text-white px-12 py-8 rounded-none uppercase tracking-[0.2em] text-xs font-semibold shadow-2xl transition-all hover:scale-105 active:scale-95 duration-300">
            <Link to="/shop/all">Explore the Boutique</Link>
          </Button>
        </motion.div>
      </div>

      {/* Aesthetic Down Arrow */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-[1px] h-16 bg-white/30" />
      </motion.div>
    </div>
  );
}
