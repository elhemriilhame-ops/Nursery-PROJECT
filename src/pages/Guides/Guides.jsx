import { Link } from 'react-router-dom';
import { GUIDES } from '@/data/mockData';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Guides() {
  return (
    <div className="pt-24 min-h-screen bg-white pb-32">
      {/* Header */}
      <div className="container mx-auto px-6 py-24 text-center space-y-8 max-w-4xl border-b border-border">
        <div className="space-y-4">
           <span className="text-[10px] uppercase tracking-[0.4em] text-sage font-bold">The Botanists Journal</span>
           <h1 className="text-5xl md:text-7xl">Nurture Your <br />Botanical Haven</h1>
        </div>
        <p className="text-charcoal/60 mx-auto font-sans font-light italic text-xl leading-relaxed max-w-2xl">
          Dive into our wealth of knowledge, from basic plant care to advanced floral arrangement techniques. Crafting a lush sanctuary begins with understanding.
        </p>
      </div>

      {/* Featured Guide (Large) */}
      <div className="container mx-auto px-6 py-16">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="relative group h-[60vh] md:h-[80vh] overflow-hidden flex items-end shadow-2xl"
         >
           <div 
             className="absolute inset-0 bg-cover bg-fixed grayscale-[0.5] group-hover:grayscale-[0.1] transition-all duration-1000 scale-[1.02] group-hover:scale-100" 
             style={{ backgroundImage: 'url("/hero.png")' }}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent opacity-80" />
           
           <div className="relative z-10 p-12 md:p-24 space-y-8 max-w-3xl">
             <div className="space-y-4">
               <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-sage">Editor's Pick</span>
               <h2 className="text-4xl md:text-6xl text-white font-serif leading-tight">Bringing the Mediterranean <br />Wild into your Home</h2>
               <p className="text-white/70 max-w-lg font-sans font-light">
                 Our lead florist, Julian Thorne, shares his journey of sourcing and styling wild wildflowers for modern minimalist interiors.
               </p>
             </div>
             <Button variant="outline" className="rounded-none border-white text-white hover:bg-white hover:text-charcoal px-12 py-8 uppercase tracking-[0.2em] text-[10px] font-bold transition-all duration-500">
               Read The Masterclass
             </Button>
           </div>
         </motion.div>
      </div>

      {/* Guides Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 pt-16">
          {GUIDES.map((guide, idx) => (
             <motion.article 
               key={guide.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="group space-y-8"
             >
               <div className="aspect-[4/5] overflow-hidden relative shadow-lg">
                 <motion.div 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1 }}
                    className="w-full h-full bg-cover bg-center grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                    style={{ backgroundImage: `url("${guide.image}")` }}
                 />
                 <div className="absolute inset-0 border-[20px] border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none" />
               </div>

               <div className="space-y-4">
                 <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-charcoal/40">
                    <span>{guide.date}</span>
                    <span className="text-sage">{guide.author}</span>
                 </div>
                 <h3 className="text-3xl font-serif text-charcoal group-hover:text-sage transition-colors duration-300 leading-snug">
                   {guide.title}
                 </h3>
                 <p className="text-sm text-charcoal/60 leading-relaxed font-sans max-w-xs line-clamp-2">
                   {guide.description}
                 </p>
                 <Link to="#" className="inline-flex items-center space-x-2 text-[10px] uppercase font-bold tracking-widest text-charcoal hover:translate-x-2 transition-transform duration-300">
                   <span>Read Exploration</span>
                   <ArrowRight size={14} />
                 </Link>
               </div>
             </motion.article>
          ))}
        </div>
      </div>

      {/* Newsletter Bottom */}
      <div className="container mx-auto px-6 py-32 mt-32 bg-parchment/30 text-center space-y-12">
         <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl">Join the Botanical Collective</h2>
            <p className="text-charcoal/60 max-w-lg mx-auto uppercase tracking-widest text-[10px] font-semibold">Weekly insights into the world of botanical design</p>
         </div>
         <Button variant="outline" className="border-charcoal px-16 py-8 rounded-none uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-charcoal hover:text-white transition-all">
           Subscribe to the Journal
         </Button>
      </div>
    </div>
  );
}
