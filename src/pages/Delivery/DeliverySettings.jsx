import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { 
  User, 
  Navigation, 
  Bell, 
  ShieldCheck, 
  Smartphone, 
  Clock,
  ChevronRight,
  Zap,
  Save,
  Trash2,
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DeliverySettings() {
  const { isDarkMode } = useOutletContext();

  const groups = [
    { title: 'Navigator Identity', icon: User, des: 'Personal details and fiber operative alias.' },
    { title: 'Vehicle Registry', icon: Package, des: 'Manage transport types and license scrolls.' },
    { title: 'Operational Radar', icon: Bell, des: 'Notification thresholds and mission whispers.' },
    { title: 'Security Protocol', icon: ShieldCheck, des: 'Vault protection and session rituals.' },
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
           <div className={`h-[1px] w-12 ${isDarkMode ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 'bg-slate-900'}`} />
           <span className={`text-[10px] font-black uppercase tracking-[0.5em] transition-colors ${isDarkMode ? 'text-blue-500' : 'text-slate-900'}`}>Agent Config</span>
        </div>
        <h1 className={`text-4xl md:text-5xl font-serif font-black italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Operational <br />Parameters
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <div className="space-y-6">
            {groups.map((group, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className={`p-8 rounded-[2.5rem] border group cursor-pointer transition-all duration-500
                   ${isDarkMode ? 'bg-[#141414] border-white/5 hover:border-blue-500/30' : 'bg-white border-slate-100 hover:border-blue-600 shadow-xl'}`}
               >
                  <div className="flex items-center gap-6">
                     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110
                       ${isDarkMode ? 'bg-white/5 text-blue-500 group-hover:bg-blue-500 group-hover:text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white'}`}>
                        <group.icon size={26} />
                     </div>
                     <div className="flex-1">
                        <h4 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{group.title}</h4>
                        <p className={`text-[10px] font-black uppercase tracking-widest mt-1 opacity-40`}>{group.des}</p>
                     </div>
                     <ChevronRight size={20} className="opacity-10 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                  </div>
               </motion.div>
            ))}
         </div>

         <motion.div 
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           className={`p-12 rounded-[4rem] border shadow-2xl relative overflow-hidden h-fit
             ${isDarkMode ? 'bg-[#0D0D0D] border-white/5 shadow-black' : 'bg-slate-50 border-slate-100'}`}
         >
            <div className="relative z-10 space-y-10">
               <div className="space-y-2">
                  <h3 className={`text-2xl font-serif font-black italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Agent Protocol</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Identity Sync</p>
               </div>

               <div className="space-y-8">
                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Navigator Alias</label>
                     <input type="text" defaultValue="Rider 7042" 
                       className={`w-full p-5 rounded-2xl text-[13px] font-bold outline-none border transition-all
                         ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500/50' : 'bg-white border-slate-100'}`} />
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Comm Channel (Tel)</label>
                     <input type="tel" defaultValue="+212 6 92 41 42 43" 
                       className={`w-full p-5 rounded-2xl text-[13px] font-bold outline-none border transition-all
                         ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500/50' : 'bg-white border-slate-100'}`} />
                  </div>

                  <div className="pt-8">
                     <Button className={`w-full h-16 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all
                        ${isDarkMode ? 'bg-blue-500 text-white shadow-blue-500/20' : 'bg-slate-900 text-white'}`}>
                        <Save size={16} className="mr-3" /> Commit Archival
                     </Button>
                  </div>
               </div>
            </div>
         </motion.div>
      </div>
    </div>
  );
}
