import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Search, 
  Download, 
  Filter,
  Package,
  Star,
  Clock
} from 'lucide-react';

const HISTORY = [
  { id: 'RUN-441', destination: 'Villa Majorelle', date: 'Yesterday, 14:02', reward: '45.00 DH', rating: 5.0, type: 'Bespoke Bouquet' },
  { id: 'RUN-439', destination: 'Kasbah District', date: 'Oct 11, 09:12', reward: '30.00 DH', rating: 4.8, type: 'Indoor Set' },
  { id: 'RUN-438', destination: 'Agadir Marina', date: 'Oct 10, 18:30', reward: '55.00 DH', rating: 5.0, type: 'Tropical XL' },
  { id: 'RUN-435', destination: 'Industrial Area', date: 'Oct 09, 11:45', reward: '35.00 DH', rating: 4.5, type: 'Maintenance Kit' },
];

export default function DeliveryCompleted() {
  const { isDarkMode } = useOutletContext();

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className={`h-[1px] w-12 ${isDarkMode ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-slate-900'}`} />
             <span className={`text-[10px] font-black uppercase tracking-[0.5em] transition-colors ${isDarkMode ? 'text-emerald-500' : 'text-slate-900'}`}>Mission Archive</span>
          </div>
          <h1 className={`text-4xl md:text-5xl font-serif font-black italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Completed <br />Operations
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
           <div className={`p-8 rounded-3xl border text-center transition-all
             ${isDarkMode ? 'bg-[#141414] border-white/10 text-white' : 'bg-white border-slate-100'}`}>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Lifetime Runs</p>
              <h4 className="text-3xl font-black italic tracking-tighter">1,242</h4>
           </div>
        </div>
      </div>

      <div className={`rounded-[3.5rem] border shadow-2xl overflow-hidden transition-all duration-700
        ${isDarkMode ? 'bg-[#141414] border-white/5 shadow-black' : 'bg-white border-slate-100'}`}>
        <div className={`p-10 border-b flex flex-col md:flex-row md:items-center justify-between gap-6 ${isDarkMode ? 'border-white/5' : 'border-slate-50'}`}>
           <h3 className={`text-2xl font-serif font-black italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Service Records</h3>
           <div className="flex items-center gap-4">
              <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20" size={16} />
                 <input type="text" placeholder="Search mission IDs..." 
                   className={`p-3 pl-12 rounded-xl text-[11px] font-black uppercase tracking-widest outline-none border transition-all
                     ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:bg-white/10' : 'bg-slate-50 border-slate-100'}`} />
              </div>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left whitespace-nowrap">
              <thead>
                 <tr className={`text-[10px] font-black uppercase tracking-[0.2em] border-b transition-colors
                   ${isDarkMode ? 'bg-white/[0.04] border-white/10 text-white/40' : 'bg-slate-50 border-slate-50 text-slate-400'}`}>
                    <th className="px-10 py-6">ID / TYPE</th>
                    <th className="px-10 py-6">DESTINATION</th>
                    <th className="px-10 py-6">COMPLETED</th>
                    <th className="px-10 py-6">EARNING</th>
                    <th className="px-10 py-6 text-center">FIBER RATING</th>
                 </tr>
              </thead>
              <tbody className={`divide-y transition-colors ${isDarkMode ? 'divide-white/5' : 'divide-slate-50'}`}>
                 {HISTORY.map((run, idx) => (
                    <motion.tr 
                      key={run.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`group hover:bg-white/[0.02] transition-colors cursor-pointer`}
                    >
                       <td className="px-10 py-8">
                          <div className="flex flex-col">
                             <span className={`text-sm font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{run.id}</span>
                             <span className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-40">{run.type}</span>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-3">
                             <MapPin size={14} className="text-emerald-500 opacity-40" />
                             <span className={`text-sm font-bold ${isDarkMode ? 'text-white/80' : 'text-slate-600'}`}>{run.destination}</span>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-3">
                             <Calendar size={14} className="opacity-20" />
                             <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{run.date}</span>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <span className={`text-base font-black ${isDarkMode ? 'text-emerald-500' : 'text-slate-900'}`}>{run.reward}</span>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex items-center justify-center gap-1.5">
                             {[...Array(5)].map((_, i) => (
                                <Star key={i} size={10} fill={i < Math.floor(run.rating) ? "currentColor" : "none"} className={i < Math.floor(run.rating) ? "text-yellow-400" : "text-white/10"} />
                             ))}
                          </div>
                       </td>
                    </motion.tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}
