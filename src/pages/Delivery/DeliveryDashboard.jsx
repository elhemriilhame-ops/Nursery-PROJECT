import React, { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { 
  Navigation, 
  Package, 
  CheckSquare, 
  MapPin, 
  Clock, 
  Calendar,
  Truck,
  ArrowRightCircle,
  MoreVertical,
  Search,
  ChevronRight
} from 'lucide-react';

const DeliveryDashboard = () => {
  const { isDarkMode } = useOutletContext();

  const stats = [
    { label: 'TODAY MISSIONS', value: 8, icon: Navigation, color: '#3B82F6' },
    { label: 'COMPLETED', value: 5, icon: CheckSquare, color: '#2DD4BF' },
    { label: 'PENDING', value: 3, icon: Clock, color: '#FACC15' },
    { label: 'TOTAL KMS', value: 42, icon: MapPin, color: '#A78BFA' },
  ];

  const activeRoutes = [
    { id: 'RT-101', customer: 'Sarah B.', address: 'Hay Mohammadi, Agadir', status: 'In Transit', time: '14:30' },
    { id: 'RT-102', customer: 'Ahmed L.', address: 'Dakhla, Agadir', status: 'Pending', time: '16:00' },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className={`text-4xl font-serif font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Dispatch Console</h1>
          <p className={`text-[13px] font-black mt-1 ${isDarkMode ? 'text-[#CBD5E1]' : 'text-slate-500'}`}>Live tracking and route management for Carrier Unit 04.</p>
        </div>
        <div className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl border transition-all ${isDarkMode ? 'bg-[#141414] border-white/10' : 'bg-white border-slate-100 shadow-sm'}`}>
           <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
           <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>System Online</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className={`group p-8 rounded-[2.5rem] border shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden
              ${isDarkMode ? 'bg-[#141414] border-white/10' : 'bg-white border-slate-100'}`}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: stat.color, boxShadow: `0 0 20px ${stat.color}` }} />
            <div className={`p-4 rounded-2xl w-fit mb-6 transition-transform group-hover:scale-110 ${isDarkMode ? 'bg-white/10' : 'bg-slate-50'}`} style={{ color: stat.color }}>
              <stat.icon size={26} />
            </div>
            <div className="space-y-1">
              <p className={`text-[11px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-[#CBD5E1]' : 'text-slate-400'}`}>{stat.label}</p>
              <h3 className={`text-3xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Map Simulation / Active Routes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
          className={`lg:col-span-2 p-1 rounded-[3rem] border shadow-sm relative overflow-hidden h-[500px]
            ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}
        >
          {/* Mock Map Background */}
          <div className={`absolute inset-0 opacity-20 ${isDarkMode ? 'grayscale' : 'sepia'}`} 
               style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
             <div className="p-4 bg-white dark:bg-[#141414] rounded-3xl shadow-2xl border dark:border-white/10 flex items-center gap-4 relative z-10 animate-bounce">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/40">
                   <Truck size={20} />
                </div>
                <div className="pr-2">
                   <p className={`text-xs font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Current Location</p>
                   <p className={`text-[9px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>En Route to RT-101</p>
                </div>
             </div>
             <p className={`text-[11px] font-black uppercase tracking-[0.3em] opacity-30 mt-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Live Navigation Active</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
          className={`rounded-[3rem] border shadow-sm p-8 flex flex-col ${isDarkMode ? 'bg-[#141414] border-white/10 text-white' : 'bg-white border-slate-100 text-slate-800'}`}
        >
          <h3 className="text-xl font-serif font-black italic mb-8">Next Deliveries</h3>
          <div className="space-y-6">
             {activeRoutes.map((route, i) => (
                <div key={i} className={`p-6 rounded-[2rem] border transition-all hover:scale-[1.02] cursor-pointer
                  ${isDarkMode ? 'bg-white/5 border-white/10 hover:border-blue-500/40' : 'bg-slate-50 border-slate-100 hover:border-sage'}`}>
                   <div className="flex justify-between items-start mb-4">
                      <span className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{route.id}</span>
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest
                        ${route.status === 'In Transit' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'}`}>
                        {route.status}
                      </span>
                   </div>
                   <p className="text-sm font-black mb-1">{route.customer}</p>
                   <div className="flex items-start gap-2 mb-4 opacity-70">
                      <MapPin size={14} className="shrink-0 mt-0.5" />
                      <p className="text-[11px] leading-relaxed font-bold">{route.address}</p>
                   </div>
                   <div className="pt-4 border-t border-white/5 flex items-center gap-2">
                      <Clock size={14} className="text-blue-400" />
                      <span className="text-[10px] font-black opacity-50">ETA: {route.time}</span>
                   </div>
                </div>
             ))}
          </div>
          <button className="mt-auto w-full py-5 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
             OPTIMIZE MY ROUTE
             <Navigation size={14} fill="currentColor" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;
