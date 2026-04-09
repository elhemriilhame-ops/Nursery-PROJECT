import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { 
  Navigation, 
  MapPin, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Clock,
  ExternalLink,
  ShieldCheck,
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DeliveryActive() {
  const { isDarkMode } = useOutletContext();

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className={`h-[1px] w-12 ${isDarkMode ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-slate-900'}`} />
             <span className={`text-[10px] font-black uppercase tracking-[0.5em] transition-colors ${isDarkMode ? 'text-emerald-500' : 'text-slate-900'}`}>Current Navigator</span>
          </div>
          <h1 className={`text-4xl md:text-5xl font-serif font-black italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Active <br />Botanical Run
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Main Map/Mission Card */}
         <div className="lg:col-span-2 space-y-8">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className={`p-10 lg:p-14 rounded-[4rem] border shadow-2xl relative overflow-hidden transition-all duration-700
                 ${isDarkMode ? 'bg-[#141414] border-white/5 shadow-black' : 'bg-white border-slate-100'}`}
            >
               <div className="relative z-10 space-y-12">
                  <div className="flex justify-between items-start">
                     <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Currently Transporting</span>
                        <h3 className={`text-3xl font-serif font-black italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>#DEL-7942: The Midnight Orchid</h3>
                     </div>
                     <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center border transition-all
                        ${isDarkMode ? 'bg-white/5 border-white/10 text-emerald-500 shadow-2xl shadow-black' : 'bg-slate-50 border-slate-100 text-sage'}`}>
                        <Package size={28} />
                     </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-12">
                     <div className="flex-1 space-y-10">
                        <div className="relative pl-12 space-y-12 after:absolute after:left-4 after:top-2 after:bottom-2 after:w-[1px] after:bg-white/10 after:border-l after:border-dashed after:border-white/20">
                           <div className="relative">
                              <div className="absolute -left-12 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center z-10">
                                 <div className="w-2 h-2 rounded-full bg-white/40" />
                              </div>
                              <p className="text-[9px] font-black uppercase tracking-widest opacity-30 leading-none mb-1">Pickup Point</p>
                              <h5 className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Agadir Botanical Hub</h5>
                              <p className="text-[11px] font-bold opacity-40 mt-1">Industrial Zone, Lot 42</p>
                           </div>
                           <div className="relative">
                              <div className="absolute -left-12 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center z-10 shadow-xl shadow-emerald-500/30">
                                 <Navigation size={14} className="text-white" />
                              </div>
                              <p className="text-[9px] font-black uppercase tracking-widest opacity-30 leading-none mb-1">Destination</p>
                              <h5 className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Residence Les Orangers</h5>
                              <p className="text-[11px] font-bold opacity-40 mt-1">Avenue des FAR, Block C</p>
                           </div>
                        </div>
                     </div>

                     <div className={`w-full md:w-64 p-8 rounded-[2.5rem] flex flex-col items-center text-center justify-center space-y-4 transition-colors
                        ${isDarkMode ? 'bg-white/5' : 'bg-slate-50'}`}>
                        <div className="relative">
                           <Clock size={48} className="text-emerald-500 opacity-20" />
                           <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-black">7m</span>
                           </div>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Estimated Arrival</p>
                        <h4 className="text-xl font-black text-emerald-500">0.8 KM LEFT</h4>
                     </div>
                  </div>

                  <div className="pt-8 flex flex-wrap gap-6">
                     <Button className={`px-10 h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl transition-all hover:scale-105 active:scale-95
                        ${isDarkMode ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white'}`}>
                        Mark As Arrived
                     </Button>
                     <Button variant="outline" className={`px-10 h-16 rounded-2xl font-black uppercase tracking-widest text-[10px] border-2 transition-all
                        ${isDarkMode ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-100'}`}>
                        Open Map Navigator <ExternalLink size={16} className="ml-2" />
                     </Button>
                  </div>
               </div>
            </motion.div>
         </div>

         {/* Customer Context Sidebar */}
         <div className="space-y-8">
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className={`p-10 rounded-[3rem] border shadow-2xl transition-all duration-700
                 ${isDarkMode ? 'bg-[#141414] border-white/5 shadow-black' : 'bg-white border-slate-100'}`}
            >
               <h4 className={`text-xl font-serif font-black italic mb-8 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Customer Protocol</h4>
               <div className="space-y-8">
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/5">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie" className="w-full h-full object-cover" />
                     </div>
                     <div>
                        <h5 className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Sophie L.</h5>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Verified Recipient</p>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <Button variant="outline" className="w-full h-14 rounded-xl border-white/10 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all">
                        <Phone size={14} className="text-emerald-500" /> Secure Call
                     </Button>
                     <Button variant="outline" className="w-full h-14 rounded-xl border-white/10 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all">
                        <MessageSquare size={14} className="text-emerald-500" /> Encrypted Chat
                     </Button>
                  </div>

                  <div className={`p-6 rounded-2xl border transition-colors ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                     <p className="text-[9px] font-black uppercase tracking-widest opacity-30 mb-2">Artisan Note:</p>
                     <p className={`text-xs font-serif italic italic leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>
                        "Recipient prefers contactless delivery. Please leave by the blue gate and send a photo."
                     </p>
                  </div>
               </div>
            </motion.div>
         </div>
      </div>
    </div>
  );
}
