import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, Sparkles, Share2, Bookmark, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { useProducts } from '@/context/ProductContext';
import { StoreReviews } from '../Home/StoreReviews';

export default function Guides() {
  const { isDarkMode } = useTheme();
  const { guides, loading, error } = useProducts();
  const [filter, setFilter] = useState('All');
  const [imgErrors, setImgErrors] = useState({});

  const handleImgError = (id) => {
    setImgErrors(prev => ({ ...prev, [id]: true }));
  };

  const filteredGuides = filter === 'All' ? guides : guides.filter(g => g.category === filter);

  return (
    <div className={`min-h-screen transition-colors duration-700 font-sans ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-[#FCFCFB] text-slate-900'}`}>
      
      {/* Editorial Header */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        {/* Decorative Aura */}
        {isDarkMode && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] bg-emerald-500/10 blur-[120px] rounded-full" />
        )}
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center space-y-12">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3"
            >
              <div className={`h-[1px] w-12 ${isDarkMode ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-sage'}`} />
              <span className={`text-[10px] font-black uppercase tracking-[0.5em] transition-colors ${isDarkMode ? 'text-emerald-500' : 'text-sage'}`}>The Botanist Registry</span>
              <div className={`h-[1px] w-12 ${isDarkMode ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-sage'}`} />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-8xl lg:text-9xl font-serif font-black tracking-tighter italic leading-[0.85] uppercase"
            >
              Nurture <br /> <span className="not-italic opacity-80">Insight.</span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`max-w-2xl mx-auto text-xl font-serif italic transition-colors leading-relaxed
              ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}
          >
            "Archive of rare techniques and botanical philosophies for the modern sanctuary. Curated by our lead artisans."
          </motion.p>
        </div>
      </section>

      {/* Hero Masterclass Section */}
      <section className="container mx-auto px-6 py-20 max-w-7xl">
         <motion.div 
           initial={{ opacity: 0, scale: 0.98 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
           className={`relative h-[80vh] rounded-[4rem] overflow-hidden group shadow-2xl border transition-all duration-700
             ${isDarkMode ? 'border-white/5 shadow-black' : 'border-slate-100 shadow-slate-200'}`}
         >
           <div 
             className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-100 group-hover:scale-110
               ${isDarkMode ? 'brightness-75 group-hover:brightness-100' : 'grayscale-[0.2] group-hover:grayscale-0'}`} 
             style={{ backgroundImage: 'url("/hero.png")' }}
           />
           
           {/* Deep Gradient Overlays */}
           <div className={`absolute inset-0 transition-opacity duration-700
             ${isDarkMode ? 'bg-gradient-to-r from-black via-black/40 to-transparent' : 'bg-gradient-to-r from-white via-white/40 to-transparent'}`} />
           
           <div className="absolute inset-x-0 bottom-0 p-12 lg:p-24 z-10 flex flex-col md:flex-row md:items-end justify-between gap-12">
             <div className="space-y-10 max-w-3xl">
               <div className="space-y-6">
                 <div className="flex items-center gap-4">
                    <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest backdrop-blur-3xl border
                       ${isDarkMode ? 'bg-emerald-500 text-white border-emerald-500/30' : 'bg-slate-900 text-white border-slate-900/30'}`}>
                       Featured Masterclass
                    </span>
                    <div className="flex items-center gap-2 text-white/40">
                       <Clock size={14} />
                       <span className="text-[10px] font-black uppercase tracking-widest">12 Min Read</span>
                    </div>
                 </div>
                 <h2 className={`text-4xl md:text-7xl font-serif font-black leading-[0.9] italic tracking-tighter drop-shadow-2xl
                   ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                   Mediterranean <br />Wild in the Home.
                 </h2>
                 <p className={`max-w-xl font-serif text-xl italic leading-relaxed drop-shadow-md transition-colors
                   ${isDarkMode ? 'text-white/80' : 'text-slate-700'}`}>
                   "Julian Thorne shares an immersive journey of sourcing and styling wild blossoms for modern interiors."
                 </p>
               </div>
               
               <Button className={`group px-14 py-8 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all hover:scale-105 active:scale-95
                 ${isDarkMode 
                   ? 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-emerald-500/20' 
                   : 'bg-slate-900 text-white hover:bg-emerald-600 shadow-slate-900/10'}`}>
                 Read The Chronicle
                 <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
               </Button>
             </div>
           </div>
         </motion.div>
      </section>

      {/* Editorial Grid Section */}
      <section className="container mx-auto px-6 py-32 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-20">
           <div className="space-y-2">
              <h2 className={`text-4xl font-serif font-black italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Technical Library.</h2>
              <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-emerald-500' : 'text-slate-400'}`}>Deep Dives & Guides</p>
           </div>
           
           <div className={`flex items-center gap-6 pb-4 border-b transition-colors
             ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
              {['All', 'Growth', 'Aesthetics', 'Heritage'].map(f => (
                 <button key={f} onClick={() => setFilter(f)} className={`text-[10px] font-black uppercase tracking-widest transition-colors
                   ${filter === f 
                      ? (isDarkMode ? 'text-emerald-500' : 'text-slate-900') 
                      : (isDarkMode ? 'text-white/20 hover:text-white' : 'text-slate-400 hover:text-slate-900')}`}>
                    {f}
                 </button>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20">
          {loading ? (
             <div className="col-span-full py-20 text-center opacity-50 uppercase tracking-widest text-[10px] font-black">
               Loading Botanical Archive...
             </div>
           ) : error || (filteredGuides && filteredGuides.length === 0) ? (
             <div className="col-span-full py-20 flex flex-col items-center justify-center space-y-4 text-center">
               <p className="text-sm font-black uppercase tracking-[0.2em] text-rose-500">Registry Connection Failed</p>
               <p className={`font-serif italic text-xl ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>
                 {error || "The botanical database is currently unreachable. Make sure the backend server is running on port 5000."}
               </p>
             </div>
           ) : filteredGuides.map((guide, idx) => (
             <motion.article 
               key={guide.id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1, duration: 0.8 }}
               className="group flex flex-col h-full"
             >
               <div className={`relative aspect-[4/5] rounded-[3.5rem] overflow-hidden border mb-10 transition-all duration-700
                 ${isDarkMode ? 'border-white/5 shadow-2xl shadow-black' : 'border-slate-100 shadow-sm'}`}>
                 <motion.img 
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
                    src={guide.image} 
                    alt={guide.title}
                    className="w-full h-full object-cover grayscale-[0.2] brightness-90 group-hover:grayscale-0 group-hover:brightness-105"
                 />
                 
                 {/* Floating Badges */}
                 <div className="absolute top-8 left-8 flex flex-col gap-3">
                    <span className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-3xl border border-white/20 text-white transition-transform group-hover:scale-110">
                       <Bookmark size={16} />
                    </span>
                 </div>
                 
                 {/* Glass Action Overlay */}
                 <div className="absolute inset-x-8 bottom-8 p-3 rounded-[2.5rem] bg-black/40 backdrop-blur-2xl border border-white/10 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center justify-between">
                    <div className="flex items-center gap-3 pl-4">
                       <User size={14} className="text-emerald-500" />
                       <span className="text-white text-[9px] font-black uppercase tracking-widest">{guide.author}</span>
                    </div>
                    <Link to={`/guides/${guide.id}`} className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center hover:scale-110 transition-transform">
                       <ArrowRight size={20} />
                    </Link>
                 </div>
               </div>

               <div className="space-y-6 flex-grow">
                 <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] py-1 border-b transition-colors
                      ${isDarkMode ? 'text-white/20 border-white/5 group-hover:text-emerald-500 group-hover:border-emerald-500/50' : 'text-slate-400 border-slate-100 group-hover:text-slate-900 group-hover:border-slate-900'}`}>
                      {guide.date}
                    </span>
                 </div>
                 <Link to={`/guides/${guide.id}`}>
                   <h3 className={`text-3xl font-serif font-black italic tracking-tighter leading-snug group-hover:translate-x-3 transition-transform duration-500
                     ${isDarkMode ? 'text-white hover:text-emerald-400' : 'text-slate-900 hover:text-emerald-700'}`}>
                     {guide.title}
                   </h3>
                 </Link>
                 <p className={`text-base font-serif italic leading-relaxed line-clamp-2 transition-colors
                   ${isDarkMode ? 'text-white/40 group-hover:text-white/60' : 'text-slate-500 group-hover:text-slate-700'}`}>
                   "{guide.description}"
                 </p>
               </div>
             </motion.article>
          ))}
        </div>
      </section>

      {/* Immersive Newsletter Section */}
      <section className="container mx-auto px-6 py-40 max-w-7xl">
         <div className={`relative p-16 lg:p-24 rounded-[5rem] overflow-hidden text-center space-y-12 border transition-all duration-700
           ${isDarkMode ? 'bg-[#0D0D0D] border-white/5 shadow-2xl' : 'bg-slate-50 border-slate-100'}`}>
            
            {/* Background Aura */}
            {isDarkMode && (
              <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] pointer-events-none" />
            )}

            <div className="space-y-6 relative z-10">
               <motion.div 
                 whileInView={{ scale: [0.9, 1.1, 1] }}
                 className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center border transition-all
                   ${isDarkMode ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-slate-900 text-white'}`}
               >
                  <BookOpen size={32} />
               </motion.div>
               <h2 className={`text-5xl md:text-7vw font-serif font-black italic tracking-tighter uppercase leading-none
                 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                 Join the <br /> <span className="opacity-40">Collective.</span>
               </h2>
               <p className={`max-w-md mx-auto text-lg font-serif italic transition-colors
                 ${isDarkMode ? 'text-white/30' : 'text-slate-500'}`}>
                 Receive weekly chronicles on botanical architecture and artisan secrets directly to your sanctuary.
               </p>
            </div>

            <div className="relative z-10 max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
               <input 
                 type="email" 
                 placeholder="your.email@botany.com"
                 className={`flex-grow px-8 py-6 rounded-[2rem] text-sm font-black outline-none transition-all
                   ${isDarkMode ? 'bg-white/5 text-white placeholder:text-white/10 focus:bg-white/10' : 'bg-white text-slate-900 shadow-sm'}`}
               />
               <Button className={`group px-10 py-6 rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl transition-all hover:scale-105
                 ${isDarkMode 
                   ? 'bg-emerald-500 text-white' 
                   : 'bg-slate-900 text-white'}`}>
                 Subscribe
               </Button>
            </div>
         </div>
      </section>

      <StoreReviews />
    </div>
  );
}
