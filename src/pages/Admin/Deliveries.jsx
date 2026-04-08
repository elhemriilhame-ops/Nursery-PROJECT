import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { 
  Truck, 
  User, 
  MapPin, 
  Calendar, 
  Package, 
  ChevronRight, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MoreVertical,
  Filter
} from 'lucide-react';
import { DELIVERIES } from '@/data/mockData';

const Deliveries = () => {
  const { isDarkMode } = useOutletContext();
  
  const activeDrivers = [
    { id: 'DRV-01', name: 'Ahmed M.', status: 'On Route', load: '3 / 5 Orders', location: 'Agadir Center', avatar: 'AM', online: true },
    { id: 'DRV-02', name: 'Khalid B.', status: 'Available', load: '0 / 5 Orders', location: 'Rabat Depot', avatar: 'KB', online: true },
    { id: 'DRV-03', name: 'Youssef T.', status: 'On Route', load: '1 / 5 Orders', location: 'Marrakech Medina', avatar: 'YT', online: true },
    { id: 'DRV-04', name: 'Sara L.', status: 'Break', load: '0 / 5 Orders', location: 'Casablanca Anfa', avatar: 'SL', online: true },
  ];

  const getStatusStyle = (status) => {
    if (isDarkMode) {
      switch (status) {
        case 'In Transit': return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
        case 'Scheduled': return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
        case 'Delivered': return 'bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/20';
        case 'Processing': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
        default: return 'bg-white/5 text-white/50 border border-white/10';
      }
    }
    switch (status) {
      case 'In Transit': return 'bg-blue-100 text-blue-600';
      case 'Scheduled': return 'bg-purple-100 text-purple-600';
      case 'Delivered': return 'bg-green-100 text-green-600';
      case 'Processing': return 'bg-amber-100 text-amber-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'In Transit': return <Truck size={14} />;
      case 'Scheduled': return <Calendar size={14} />;
      case 'Delivered': return <CheckCircle2 size={14} />;
      case 'Processing': return <Clock size={14} />;
      default: return <AlertCircle size={14} />;
    }
  };

  return (
    <div className="space-y-10 pb-10">
      {/* Page Header */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-6 p-10 rounded-[3rem] border shadow-sm transition-all
        ${isDarkMode ? 'bg-[#141414] border-white/10' : 'bg-white border-slate-100'}`}>
        <div className="space-y-1">
          <h1 className={`text-3xl font-serif font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Delivery Logistics</h1>
          <p className={`text-sm font-medium italic ${isDarkMode ? 'text-[#CBD5E1]' : 'text-slate-600'}`}>Monitor and manage all botanical shipments in real-time.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className={`flex items-center gap-2 px-6 py-3 border rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-sm
            ${isDarkMode ? 'bg-white/5 border-white/10 text-[#CBD5E1] hover:bg-white/10 hover:text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-sage'}`}>
            <Filter size={18} />
            <span>Advanced Filters</span>
          </button>
          <button className="flex items-center gap-2 px-7 py-3.5 bg-[#F43F5E] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-pink-500/20 hover:scale-[1.02] active:scale-95 transition-all">
            <Truck size={18} />
            <span>Dispatch New Drive</span>
          </button>
        </div>
      </div>

      {/* Overview Statistics (Compact) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Shipments', value: '124', icon: Package, color: '#F472B6' },
          { label: 'On the road', value: '12', icon: Truck, color: '#60A5FA' },
          { label: 'Next hour', value: '5', icon: Clock, color: '#FACC15' },
          { label: 'Arrived Safe', value: '107', icon: CheckCircle2, color: '#2DD4BF' },
        ].map((stat, i) => (
          <div key={i} className={`p-8 rounded-[2.5rem] border shadow-sm flex items-center gap-6 group hover:scale-[1.02] transition-all duration-500
            ${isDarkMode ? 'bg-[#141414] border-white/10 hover:border-white/20' : 'bg-white border-slate-100 hover:border-sage'}`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isDarkMode ? 'bg-white/5' : 'bg-slate-50'}`} style={{ color: stat.color }}>
               <stat.icon size={28} strokeWidth={2} />
            </div>
            <div>
              <p className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-[#94A3B8]' : 'text-slate-400'}`}>{stat.label}</p>
              <p className={`text-3xl font-serif font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Logged In Delivery Profiles */}
      <div className={`rounded-[3.5rem] p-8 lg:p-12 border shadow-sm relative overflow-hidden transition-all
        ${isDarkMode ? 'bg-[#141414] border-white/10 shadow-2xl shadow-black/40' : 'bg-white border-slate-100 shadow-black/[0.02]'}`}>
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 relative z-10">
            <div>
               <h3 className={`text-2xl font-serif font-black italic ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Active Delivery Profiles</h3>
               <p className={`text-xs mt-1 font-bold ${isDarkMode ? 'text-[#94A3B8]' : 'text-slate-500'}`}>Personnel currently logged into the delivery network.</p>
            </div>
            <div className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl transition-all ${isDarkMode ? 'bg-[#2DD4BF]/10' : 'bg-sage/10'}`}>
               <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${isDarkMode ? 'bg-[#2DD4BF]' : 'bg-sage'}`} />
               <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-[#2DD4BF]' : 'text-sage'}`}>{activeDrivers.length} Online</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {activeDrivers.map((driver, i) => (
               <div key={i} className={`p-8 rounded-[2.5rem] border shadow-sm group transition-all duration-500
                 ${isDarkMode ? 'bg-white/[0.03] border-white/10 hover:bg-white/5 hover:border-[#2DD4BF]/30' : 'bg-slate-50/50 border-slate-100 hover:border-sage'}`}>
                  <div className="flex items-start justify-between mb-6">
                     <div className="relative">
                        <div className={`w-14 h-14 rounded-2xl font-black flex items-center justify-center transition-all duration-500
                          ${isDarkMode ? 'bg-white/10 text-white group-hover:bg-[#2DD4BF] group-hover:text-[#141414]' : 'bg-slate-200 text-slate-900 group-hover:bg-sage group-hover:text-white'}`}>
                           {driver.avatar}
                        </div>
                        {driver.online && (
                           <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 rounded-full transition-all ${isDarkMode ? 'bg-[#2DD4BF] border-[#141414]' : 'bg-emerald-500 border-white'}`} />
                        )}
                     </div>
                     <span className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all ${
                        driver.status === 'Available' ? (isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600') :
                        driver.status === 'Break' ? (isDarkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600') :
                        (isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600')
                     }`}>
                        {driver.status}
                     </span>
                  </div>
                  <div className="space-y-1 mb-6">
                     <h4 className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{driver.name}</h4>
                     <p className={`text-[10px] font-black tracking-widest uppercase opacity-40 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{driver.id}</p>
                  </div>
                  <div className={`space-y-4 pt-6 border-t ${isDarkMode ? 'border-white/5' : 'border-slate-200/60'}`}>
                     <div className={`flex items-center gap-3 text-xs font-bold ${isDarkMode ? 'text-[#CBD5E1]' : 'text-slate-800'}`}>
                        <Truck size={16} className={isDarkMode ? 'text-[#2DD4BF]' : 'text-slate-600'} />
                        {driver.load}
                     </div>
                     <div className={`flex items-center gap-3 text-xs font-bold ${isDarkMode ? 'text-[#CBD5E1]' : 'text-slate-800'}`}>
                        <MapPin size={16} className={isDarkMode ? 'text-[#2DD4BF]' : 'text-slate-600'} />
                        <span className="truncate">{driver.location}</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Main Delivery List / Table */}
      <div className={`rounded-[3.5rem] border shadow-xl overflow-hidden transition-all
        ${isDarkMode ? 'bg-[#141414] border-white/10 shadow-black' : 'bg-white border-slate-100 shadow-black/[0.02]'}`}>
        <div className={`p-10 border-b flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all ${isDarkMode ? 'border-white/5' : 'border-slate-50'}`}>
           <div className="flex items-center gap-4">
             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all
               ${isDarkMode ? 'bg-[#F43F5E] shadow-pink-500/20' : 'bg-slate-800 shadow-slate-200'}`}>
                <Truck size={24} />
             </div>
             <div>
                <h2 className={`text-xl font-serif font-black tracking-tight italic ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Active Deliveries Queue</h2>
                <p className={`text-[10px] font-black uppercase tracking-widest opacity-50 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Manage the transactional flow</p>
             </div>
           </div>

           <div className="relative">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`} size={18} />
              <input 
                type="text" 
                placeholder="Find tracking code or customer..."
                className={`pl-12 pr-6 py-4 border-none rounded-2xl w-full md:w-80 text-sm font-medium outline-none transition-all
                  ${isDarkMode ? 'bg-white/5 text-white placeholder:text-white/40 focus:bg-white/10' : 'bg-slate-50 text-slate-900 focus:bg-slate-100'}`}
              />
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap min-w-[800px]">
            <thead>
              <tr className={`border-b text-[10px] font-black tracking-[0.2em] uppercase transition-all
                ${isDarkMode ? 'bg-white/[0.04] text-[#CBD5E1] border-white/5' : 'bg-[#FCFCFB] text-slate-500 border-slate-50'}`}>
                <th className="px-10 py-6">Tracking & Status</th>
                <th className="px-10 py-6">Customer Information</th>
                <th className="px-10 py-6">Destination Address</th>
                <th className="px-10 py-6">Schedule & Items</th>
                <th className="px-10 py-6 text-right">Payment</th>
                <th className="px-10 py-6 text-right">Options</th>
              </tr>
            </thead>
            <tbody className={`divide-y transition-all ${isDarkMode ? 'divide-white/5' : 'divide-slate-50'}`}>
              {DELIVERIES.map((del) => (
                <tr key={del.id} className={`transition-all group ${isDarkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50/50'}`}>
                  <td className="px-10 py-8">
                    <div className="space-y-3">
                       <span className={`text-[13px] font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{del.id}</span>
                       <div className={`w-fit flex items-center gap-2 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${getStatusStyle(del.status)}`}>
                          {getStatusIcon(del.status)}
                          <span>{del.status}</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all
                         ${isDarkMode ? 'bg-white/5 text-white' : 'bg-slate-100 text-slate-800 group-hover:bg-white'}`}>
                          <User size={20} />
                       </div>
                       <div>
                          <p className={`text-sm font-black transition-colors group-hover:text-[#2DD4BF] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{del.customer}</p>
                          <p className={`text-[10px] font-black uppercase tracking-widest italic opacity-50 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Loyal Bloom Member</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-10 py-8 max-w-[280px]">
                    <div className="flex items-start gap-3">
                       <MapPin size={18} className={`mt-0.5 shrink-0 transition-colors ${isDarkMode ? 'text-[#2DD4BF]' : 'text-slate-400'}`} />
                       <p className={`text-sm font-bold leading-relaxed whitespace-normal ${isDarkMode ? 'text-[#CBD5E1]' : 'text-slate-900'}`}>{del.address}</p>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="space-y-4">
                       <div className="flex items-center gap-3">
                          <Calendar size={16} className={isDarkMode ? 'text-[#2DD4BF]' : 'text-slate-400'} />
                          <span className={`text-[13px] font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{del.date} <span className="opacity-30 mx-2">|</span> <span className="opacity-70">{del.time}</span></span>
                       </div>
                       <div className="flex items-center gap-3">
                          <Package size={16} className={isDarkMode ? 'text-[#2DD4BF]' : 'text-slate-400'} />
                          <span className={`text-[11px] font-bold italic truncate max-w-[200px] ${isDarkMode ? 'text-[#94A3B8]' : 'text-slate-600'}`}>{del.items}</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                     <div className="space-y-1">
                        <p className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{del.total}</p>
                        <p className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-[#2DD4BF]' : 'text-emerald-500'}`}>Paid via Card</p>
                     </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end gap-3">
                       <button className={`p-3 rounded-2xl border transition-all
                         ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-[#2DD4BF]/20 hover:text-[#2DD4BF] hover:border-[#2DD4BF]/40' : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-sage'}`}>
                          <ChevronRight size={22} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`p-10 text-center border-t transition-all ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-[#FCFCFB] border-slate-50'}`}>
           <button className={`text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:scale-105 active:scale-95
             ${isDarkMode ? 'text-[#2DD4BF] hover:text-[#F43F5E]' : 'text-slate-500 hover:text-sage'}`}>
              Load more deliveries history
           </button>
        </div>
      </div>
    </div>
  );
};

export default Deliveries;
