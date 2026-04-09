import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext, Link } from 'react-router-dom';
import { 
  Navigation, 
  MapPin, 
  Clock, 
  Box, 
  ChevronRight, 
  ArrowRight,
  Sparkles,
  Zap,
  Map as MapIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const MISSIONS = [
  { id: 'DEL-801', origin: 'Agadir Hub', destination: 'Talborjt Quarter', estimate: '12 min', reward: '35 DH', priority: 'High' },
  { id: 'DEL-802', origin: 'Main Nursery', destination: 'Marina District', estimate: '25 min', reward: '50 DH', priority: 'Standard' },
  { id: 'DEL-803', origin: 'Admin Center', destination: 'Inezgane Sector', estimate: '18 min', reward: '40 DH', priority: 'Urgent' },
];

export default function DeliveryAvailable() {
  const { isDarkMode } = useOutletContext();

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className={`h-[1px] w-12 ${isDarkMode ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 'bg-slate-900'}`} />
             <span className={`text-[10px] font-black uppercase tracking-[0.5em] transition-colors ${isDarkMode ? 'text-blue-500' : 'text-slate-900'}`}>Live Radar</span>
          </div>
          <h1 className={`text-4xl md:text-5xl font-serif font-black italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Available <br />Mission Stream
          </h1>
        </div>
        
        <div className={`flex items-center gap-4 px-8 py-5 rounded-3xl border transition-all
          ${isDarkMode ? 'bg-[#141414] border-white/10 text-white' : 'bg-white border-slate-100'}`}>
           <Zap size={24} className="text-yellow-400" />
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40 leading-none mb-1">Status</p>
              <h4 className="text-sm font-black uppercase tracking-widest">Active Search</h4>
           </div>
        </div>
      </div>

      {/* Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {MISSIONS.map((mission, idx) => (
            <motion.div 
              key={mission.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`group p-8 rounded-[3rem] border shadow-2xl relative overflow-hidden transition-all duration-700
                ${isDarkMode ? 'bg-[#141414] border-white/5 shadow-black' : 'bg-white border-slate-100 shadow-slate-200/50'}`}
            >
               {/* Accent Gradient */}
               <div className={`absolute top-0 inset-x-0 h-1 transition-all duration-700 opacity-0 group-hover:opacity-100
                 ${mission.priority === 'Urgent' ? 'bg-rose-500' : mission.priority === 'High' ? 'bg-blue-500' : 'bg-emerald-500'}`} />

               <div className="relative z-10 space-y-8">
                  <div className="flex justify-between items-start">
                     <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border
                       ${isDarkMode ? 'bg-white/5 border-white/10 text-white/60' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                       {mission.id}
                     </span>
                     <div className={`flex items-center gap-2 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest
                       ${mission.priority === 'Urgent' ? 'bg-rose-500/10 text-rose-500' : mission.priority === 'High' ? 'bg-blue-500/10 text-blue-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                        {mission.priority}
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all
                           ${isDarkMode ? 'bg-white/5 border-white/10 text-white/40' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                           <MapPin size={14} />
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Origin</p>
                           <h4 className={`text-sm font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{mission.origin}</h4>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-blue-500 text-white shadow-xl shadow-blue-500/20`}>
                           <Navigation size={14} />
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Goal</p>
                           <h4 className={`text-sm font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{mission.destination}</h4>
                        </div>
                     </div>
                  </div>

                  <div className={`flex items-center justify-between p-6 rounded-3xl transition-colors ${isDarkMode ? 'bg-white/[0.03]' : 'bg-slate-50'}`}>
                     <div>
                        <p className="text-[9px] font-black uppercase tracking-widest opacity-30">Reward</p>
                        <h5 className="text-xl font-black text-emerald-500">{mission.reward}</h5>
                     </div>
                     <div className="text-right">
                        <p className="text-[9px] font-black uppercase tracking-widest opacity-30">Estimate</p>
                        <h5 className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{mission.estimate}</h5>
                     </div>
                  </div>

                  <Button className={`w-full h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl transition-all group-hover:scale-[1.02] active:scale-95
                    ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-400' : 'bg-slate-900 text-white hover:bg-blue-600'}`}>
                     Accept Mission <ArrowRight size={16} className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </Button>
               </div>
            </motion.div>
         ))}
      </div>
    </div>
  );
}
