import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { 
  Settings, 
  ShieldAlert, 
  Database, 
  Globe, 
  Zap, 
  Cloud, 
  Lock, 
  BellRing,
  Smartphone,
  ChevronRight,
  Server,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminSettings() {
  const { isDarkMode } = useOutletContext();

  const configGroups = [
    { title: 'Core Mechanics', icon: Zap, label: 'Performance & Latency' },
    { title: 'Security Protocol', icon: ShieldAlert, label: 'Bypass & Guardrails' },
    { title: 'Data Archival', icon: Database, label: 'Cold/Hot Synchronization' },
    { title: 'Neural Notifications', icon: BellRing, label: 'System Announcements' },
    { title: 'Marketplace Reach', icon: Globe, label: 'Localization & Currency' },
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
           <div className={`h-[1px] w-12 ${isDarkMode ? 'bg-[#F43F5E] shadow-[0_0_10px_#F43F5E]' : 'bg-slate-900'}`} />
           <span className={`text-[10px] font-black uppercase tracking-[0.5em] transition-colors ${isDarkMode ? 'text-[#F43F5E]' : 'text-slate-900'}`}>System Governance</span>
        </div>
        <h1 className={`text-4xl md:text-5xl font-serif font-black italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Infrastructure <br />Architectures
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Sidebar Nav */}
         <div className="lg:col-span-1 space-y-6">
            {configGroups.map((group, idx) => (
               <motion.div 
                 key={group.title}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: idx * 0.05 }}
                 className={`p-6 rounded-3xl border group cursor-pointer transition-all hover:translate-x-3
                   ${isDarkMode ? 'bg-[#141414] border-white/5 hover:border-emerald-500/30' : 'bg-white border-slate-100 hover:border-sage shadow-sm hover:shadow-xl'}`}
               >
                  <div className="flex items-center gap-5">
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all 
                        ${isDarkMode ? 'bg-white/5 text-white/40 group-hover:bg-[#F43F5E] group-hover:text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white'}`}>
                        <group.icon size={22} />
                     </div>
                     <div className="flex-1">
                        <h4 className={`text-sm font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{group.title}</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{group.label}</p>
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>

         {/* Content Area */}
         <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-10 lg:p-14 rounded-[4rem] border shadow-2xl relative overflow-hidden transition-all duration-700
                ${isDarkMode ? 'bg-[#0D0D0D] border-white/5 shadow-black' : 'bg-slate-50 border-slate-100'}`}
            >
               <div className="space-y-12 relative z-10">
                  <div className="flex justify-between items-start">
                     <div className="space-y-2">
                        <h3 className={`text-3xl font-serif font-black italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Operational Status</h3>
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">System Nominal</span>
                        </div>
                     </div>
                     <div className={`p-5 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-white shadow-xl'}`}>
                        <Activity size={24} className="text-[#F43F5E]" />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                     <div className="space-y-6">
                        <div className="space-y-3">
                           <p className="text-[10px] font-black uppercase tracking-widest opacity-40">System Access Code</p>
                           <input type="password" value="XXXXXXXXXXXX" readOnly
                              className={`w-full p-4 rounded-xl border transition-all text-sm font-black tracking-widest
                                ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-100'}`} />
                        </div>
                        <div className="space-y-3">
                           <p className="text-[10px] font-black uppercase tracking-widest opacity-40">API Endpoint Protocol</p>
                           <select className={`w-full p-4 rounded-xl border transition-all text-sm font-black
                                ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-100'}`}>
                              <option>v3.4 PRODUCTION (STABLE)</option>
                              <option>v4.0 ALPHA (TESTING)</option>
                           </select>
                        </div>
                     </div>
                     
                     <div className="space-y-8">
                        {['Maintenance Tunnel', 'Third-Party Sync', 'Automated Curation'].map((toggle, i) => (
                           <div key={i} className="flex items-center justify-between">
                              <span className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>{toggle}</span>
                              <div className={`w-12 h-6 rounded-full relative p-1 transition-all cursor-pointer
                                ${isDarkMode ? 'bg-emerald-500/20 bg-opacity-100' : 'bg-slate-200'}`}>
                                 <div className={`w-4 h-4 rounded-full shadow-lg transition-transform translate-x-6
                                   ${isDarkMode ? 'bg-emerald-500 shadow-emerald-500/50' : 'bg-white'}`} />
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="pt-10 flex flex-col md:flex-row gap-6">
                     <Button className={`flex-grow h-16 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all hover:scale-[1.02]
                       ${isDarkMode ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-slate-900 text-white'}`}>
                        Synchronize Instance
                     </Button>
                     <Button variant="outline" className={`flex-grow h-16 rounded-2xl font-black uppercase tracking-widest text-[10px] border-2 transition-all
                       ${isDarkMode ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-100 text-slate-900 hover:border-slate-900'}`}>
                        Emergency Reboot
                     </Button>
                  </div>
               </div>
            </motion.div>

            {/* Sub Info Area */}
            <div className="grid grid-cols-2 gap-8">
               <div className={`p-8 rounded-[2.5rem] border shadow-xl ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="flex items-center gap-4 mb-4">
                     <Server size={20} className="text-blue-500" />
                     <h5 className="text-[10px] font-black uppercase tracking-widest">Storage Status</h5>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                     <div className="bg-blue-500 h-full w-[64%]" />
                  </div>
                  <p className="text-[9px] font-black uppercase tracking-widest mt-4 opacity-40">64.2 GB / 100 GB Archival Space</p>
               </div>
               <div className={`p-8 rounded-[2.5rem] border shadow-xl ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="flex items-center gap-4 mb-4">
                     <Cloud size={20} className="text-emerald-500" />
                     <h5 className="text-[10px] font-black uppercase tracking-widest">Backups Synchronized</h5>
                  </div>
                  <p className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Success (4m ago)</p>
                  <p className="text-[9px] font-black uppercase tracking-widest mt-4 opacity-40 text-emerald-500">Auto-Registry Secure</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
