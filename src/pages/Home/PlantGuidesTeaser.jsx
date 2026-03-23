import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function PlantGuidesTeaser() {
  return (
    <section className="relative flex flex-col md:flex-row items-center py-24">
      {/* Visual Part */}
      <div className="w-full md:w-2/3 h-[70vh] relative overflow-hidden group">
        <motion.div
           whileHover={{ scale: 1.05 }}
           transition={{ duration: 1.5 }}
           className="w-full h-full bg-cover bg-center grayscale-[0.2] group-hover:grayscale-0 transition-all"
           style={{ backgroundImage: 'url("/plant-1.png")' }}
        />
        {/* Subtle texture or accent */}
        <div className="absolute top-10 left-10 w-40 h-40 border-l border-t border-white/30 pointer-events-none" />
      </div>

      {/* Content Part (Overlapping slightly on desktop) */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full md:w-1/2 md:-ml-24 z-10 bg-white p-12 lg:p-20 shadow-2xl border border-border"
      >
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-sage">The Botanist's Journal</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight">Mastering the Art of <br />Greenery</h2>
          </div>
          
          <p className="text-charcoal/60 leading-relaxed max-w-md font-sans font-light italic">
            "Every plant tells a story. From the way it reaches for the sun to the delicate patterns on its leaves."
          </p>
          
          <p className="text-charcoal/70 leading-relaxed max-w-md font-sans">
            Our head botanists have compiled a library of essential guides to help you create an indoor sanctuary that thrives. Discover the secrets of light, water, and earth.
          </p>
          
          <Button variant="outline" className="rounded-none border-charcoal/30 px-10 py-8 uppercase tracking-[0.2em] text-[10px] hover:bg-charcoal hover:text-white transition-all duration-500">
             Read the Guides
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
