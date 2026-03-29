import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const scenes = [
  '/hero_scene1.png', // Nursery plants (Agadir/Amazigh vibe)
  '/hero_scene2.png', // Flowers boutique
  '/hero_scene3.png'  // Essential Oils
];

export function HeroSection() {
  const [currentScene, setCurrentScene] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % scenes.length);
    }, 6000); // Change scene every 6 seconds to simulate video progression
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden bg-charcoal">
      {/* Background Slideshow with Zoom & Crossfade Effect (Virtual Video) */}
      {scenes.map((scene, index) => (
        <motion.div
          key={scene}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: index === currentScene ? 1 : 0,
            scale: index === currentScene ? 1.05 : 1.1
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url("${scene}")` }}
        />
      ))}
      {/* Dark modern overly for clear text reading without a card */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center space-y-10 px-6 max-w-4xl pt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-6 drop-shadow-2xl"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-white/90 py-2 border-b border-white/30">The Premium Experience</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-serif tracking-tight leading-[0.95] drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            The Art of <br />Botanical Living
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="text-white/90 text-base md:text-lg font-sans font-light tracking-wide max-w-xl mx-auto leading-relaxed drop-shadow-md"
        >
          Curated bouquets, rare house plants, and botanical elixirs for the sophisticated interior. Hand-picked for elegance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
        >
          <Button asChild size="lg" className="bg-white text-charcoal hover:bg-[var(--maroon)] hover:text-white px-12 py-8 rounded-none uppercase tracking-[0.2em] text-xs font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all hover:scale-105 active:scale-95 duration-300">
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
