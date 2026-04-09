import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { 
  Users, 
  MapPin, 
  Star, 
  ShieldCheck, 
  TrendingUp, 
  Search, 
  Plus,
  MoreHorizontal,
  ExternalLink,
  Store
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const SELLERS = [
  { id: 'SEL-001', name: 'NourPlant Agadir', location: 'Agadir Hub', rating: 4.9, activeProducts: 24, joinDate: 'Jan 2024', status: 'Verified' },
  { id: 'SEL-002', name: 'Atlas Bloom', location: 'Marrakech Central', rating: 4.7, activeProducts: 18, joinDate: 'Feb 2024', status: 'Verified' },
  { id: 'SEL-003', name: 'Rif Greenery', location: 'Tangier Hub', rating: 4.5, activeProducts: 32, joinDate: 'Mar 2024', status: 'Under Review' },
  { id: 'SEL-004', name: 'Dakhla Oasis', location: 'Southern Post', rating: 4.8, activeProducts: 12, joinDate: 'May 2024', status: 'Verified' },
];

export default function AdminSellers() {
  const { isDarkMode } = useOutletContext();

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <h1 className={`text-4xl font-serif font-black italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Artisan Network</h1>
          <p className={`text-[11px] font-black uppercase tracking-widest opacity-40`}>Management of marketplace botanical providers</p>
        </div>

        <div className="flex items-center gap-4">
           <div className="relative">
              <Search className={`absolute left-5 top-1/2 -translate-y-1/2 opacity-20`} size={18} />
              <input type="text" placeholder="Search artisans..." 
                className={`w-72 p-4 pl-14 rounded-2xl text-[13px] font-bold outline-none border transition-all
                  ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:bg-white/10' : 'bg-white border-slate-100'}`} />
           </div>
           <Button className={`px-8 py-7 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl transition-all hover:scale-105 active:scale-95
             ${isDarkMode ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white'}`}>
              <Plus size={16} className="mr-3" /> Recruit Artisan
           </Button>
        </div>
      </div>

      {/* Sellers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {SELLERS.map((seller, idx) => (
            <motion.div 
              key={seller.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`group p-10 rounded-[3.5rem] border shadow-2xl relative overflow-hidden transition-all duration-700
                ${isDarkMode ? 'bg-[#141414] border-white/5 shadow-black' : 'bg-white border-slate-100 shadow-slate-100/50'}`}
            >
               {/* Decorative Background Icon */}
               <Store size={120} className={`absolute -bottom-10 -right-10 opacity-[0.03] rotate-12 transition-transform group-hover:scale-110 duration-700`} />

               <div className="relative z-10 space-y-8">
                  <div className="flex justify-between items-start">
                     <div className="flex items-center gap-6">
                        <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center border transition-all
                          ${isDarkMode ? 'bg-white/5 border-white/10 text-emerald-500 shadow-black shadow-2xl' : 'bg-slate-50 border-slate-100 text-sage shadow-xl shadow-slate-100'}`}>
                           <Store size={32} />
                        </div>
                        <div>
                           <h3 className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{seller.name}</h3>
                           <div className="flex items-center gap-2 mt-1">
                              <MapPin size={14} className="opacity-40" />
                              <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{seller.location} / {seller.id}</span>
                           </div>
                        </div>
                     </div>
                     <button className={`p-4 rounded-xl border transition-all
                       ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-900'}`}>
                        <MoreHorizontal size={20} />
                     </button>
                  </div>

                  <div className={`grid grid-cols-3 gap-6 p-6 rounded-3xl transition-colors ${isDarkMode ? 'bg-white/[0.02]' : 'bg-slate-50/50'}`}>
                     <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-emerald-500 mb-1">
                           <Star size={12} fill="currentColor" />
                           <span className="text-sm font-black">{seller.rating}</span>
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-widest opacity-30">Rating</p>
                     </div>
                     <div className="text-center border-x border-white/5">
                        <span className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{seller.activeProducts}</span>
                        <p className="text-[9px] font-black uppercase tracking-widest opacity-30">Products</p>
                     </div>
                     <div className="text-center">
                        <span className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{seller.joinDate}</span>
                        <p className="text-[9px] font-black uppercase tracking-widest opacity-30">Joined</p>
                     </div>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                     <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border border-dashed
                       ${seller.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                       <ShieldCheck size={14} /> {seller.status}
                     </span>
                     <button className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all
                       ${isDarkMode ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
                        MANAGE STORE <ExternalLink size={14} />
                     </button>
                  </div>
               </div>
            </motion.div>
         ))}
      </div>
    </div>
  );
}
