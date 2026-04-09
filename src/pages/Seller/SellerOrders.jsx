import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { 
  ShoppingBag, 
  User, 
  MapPin, 
  Calendar, 
  Package, 
  ChevronRight, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Filter,
  ArrowRight,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { SELLER_ORDERS } from '@/data/mockData';

const SellerOrders = () => {
  const { isDarkMode } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const getStatusStyle = (status) => {
    if (isDarkMode) {
      switch (status) {
        case 'Shipped': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]';
        case 'Pending': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
        case 'Delivered': return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
        case 'Processing': return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
        default: return 'bg-white/5 text-white/50 border border-white/10';
      }
    }
    switch (status) {
      case 'Shipped': return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
      case 'Pending': return 'bg-amber-50 text-amber-600 border border-amber-100';
      case 'Delivered': return 'bg-blue-50 text-blue-600 border border-blue-100';
      case 'Processing': return 'bg-rose-50 text-rose-600 border border-rose-100';
      default: return 'bg-slate-50 text-slate-500';
    }
  };

  const filteredOrders = SELLER_ORDERS.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || order.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-12 pb-32">
      {/* Immersive Header */}
      <div className={`p-10 lg:p-14 rounded-[4rem] border transition-all duration-700 relative overflow-hidden
        ${isDarkMode ? 'bg-[#0D0D0D] border-white/5 shadow-2xl' : 'bg-white border-slate-100 shadow-sm'}`}>
        
        {/* Animated Background Gradient */}
        <div className={`absolute top-0 right-0 w-[40rem] h-[40rem] rounded-full -translate-x-1/2 -translate-y-1/2 blur-[120px] transition-colors duration-1000
          ${isDarkMode ? 'bg-emerald-500/10' : 'bg-amber-500/5'}`} />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className={`w-10 h-1 rounded-full ${isDarkMode ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-amber-500 shadow-lg shadow-amber-500/10'}`} />
                <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Transaction Stream</span>
             </div>
             <h1 className={`text-5xl font-serif font-black tracking-tighter italic leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Sales <br/> Ledger.</h1>
             <p className={`text-lg font-serif italic max-w-md ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>"Real-time fulfillment and buyer management for your botanical store."</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
             <div className="grid grid-cols-2 gap-4 w-full sm:w-auto">
                <KPIMini label="LIVE ORDERS" value={filteredOrders.length} isDark={isDarkMode} />
                <KPIMini label="REVENUE" value="4.2k" isDark={isDarkMode} />
             </div>
          </div>
        </div>
      </div>

      {/* Control Strip */}
      <div className={`p-4 rounded-[2.5rem] border transition-all duration-700 flex flex-col md:flex-row gap-6 items-center
        ${isDarkMode ? 'bg-[#0D0D0D] border-white/5 shadow-black/40' : 'bg-white border-slate-100 shadow-sm'}`}>
        
        <div className="relative flex-grow w-full md:w-auto">
          <Search className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? 'text-white/20' : 'text-slate-400'}`} size={20} />
          <input 
            type="text" 
            placeholder="SCAN BY ORDER ID OR BUYER NAME..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-16 pr-8 py-5 border-none rounded-[1.8rem] text-[11px] font-black uppercase tracking-[0.2em] outline-none transition-all
               ${isDarkMode ? 'bg-white/5 text-white placeholder:text-white/10 focus:bg-white/10' : 'bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white shadow-inner'}`}
          />
        </div>

        <div className={`flex p-1.5 rounded-[1.8rem] border self-stretch md:self-center transition-all duration-700
          ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
          {['All', 'Pending', 'Shipped', 'Delivered'].map(status => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`px-8 py-3.5 rounded-[1.4rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500
                ${activeFilter === status 
                   ? (isDarkMode ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-900 text-white shadow-xl shadow-slate-900/10') 
                   : (isDarkMode ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-900')}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className={`rounded-[4rem] border transition-all duration-700 overflow-hidden
        ${isDarkMode ? 'bg-[#0D0D0D] border-white/5 shadow-2xl' : 'bg-white border-slate-100 shadow-sm'}`}>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className={`text-[10px] font-black tracking-[0.3em] uppercase border-b transition-all duration-700
                ${isDarkMode ? 'bg-white/[0.03] text-white/30 border-white/5' : 'bg-slate-50/50 text-slate-400 border-slate-50'}`}>
                <th className="px-12 py-8">Ledger Identity</th>
                <th className="px-12 py-8">Consignee</th>
                <th className="px-12 py-8">Specimen</th>
                <th className="px-12 py-8">Timeline</th>
                <th className="px-12 py-8 text-right">Value</th>
                <th className="px-12 py-8 text-right">Action</th>
              </tr>
            </thead>
            <tbody className={`divide-y transition-colors duration-700 ${isDarkMode ? 'divide-white/5' : 'divide-slate-50'}`}>
              <AnimatePresence>
                {filteredOrders.map((order, i) => (
                  <motion.tr 
                    key={order.id} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`group transition-all duration-500 cursor-pointer ${isDarkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50/70'}`}>
                    <td className="px-12 py-10">
                      <div className="space-y-4">
                         <div className="flex items-center gap-3">
                            <span className={`text-[15px] font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{order.id}</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                         </div>
                         <div className={`w-fit px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${getStatusStyle(order.status)}`}>
                            {order.status === 'Shipped' ? <TrendingUp size={14} /> : order.status === 'Delivered' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                            {order.status}
                         </div>
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      <div className="flex items-center gap-6">
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-700 border
                           ${isDarkMode ? 'bg-white/5 border-white/5 text-white/40' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                            <User size={24} strokeWidth={1.5} />
                         </div>
                         <div className="space-y-1">
                            <p className={`text-[14px] font-black transition-colors group-hover:text-emerald-500 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{order.customer}</p>
                            <div className="flex items-center gap-2">
                               <MapPin size={12} className="opacity-30" />
                               <p className={`text-[10px] font-black uppercase tracking-widest italic opacity-40 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{order.location}</p>
                            </div>
                         </div>
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      <div className="flex items-center gap-4">
                         <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-slate-50'}`}>
                            <Package size={20} className={isDarkMode ? 'text-emerald-500' : 'text-amber-600'} />
                         </div>
                         <div className="flex flex-col">
                            <p className={`text-sm font-bold tracking-tight ${isDarkMode ? 'text-white/80' : 'text-slate-900'}`}>{order.product}</p>
                            <p className={`text-[10px] font-black opacity-30 uppercase tracking-widest mt-1`}>VOLUME: {order.quantity} UNITS</p>
                         </div>
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      <div className="flex items-center gap-3">
                         <Calendar size={18} strokeWidth={1.5} className={isDarkMode ? 'text-emerald-500' : 'text-slate-400'} />
                         <span className={`text-[13px] font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{order.date}</span>
                      </div>
                    </td>
                    <td className="px-12 py-10 text-right">
                       <span className={`text-xl font-serif font-black italic ${isDarkMode ? 'text-emerald-500' : 'text-slate-900'}`}>{order.total}</span>
                    </td>
                    <td className="px-12 py-10 text-right">
                      <button className={`w-14 h-14 rounded-2xl border transition-all duration-500 flex items-center justify-center
                        ${isDarkMode ? 'bg-white/5 border-white/5 text-white/40 hover:text-emerald-500 hover:border-emerald-500/50' : 'bg-slate-50 border-slate-100 text-slate-400 hover:text-slate-900 hover:border-slate-300'}`}>
                         <ArrowRight size={24} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function KPIMini({ label, value, isDark }) {
  return (
    <div className={`px-10 py-6 rounded-[2.5rem] border shadow-2xl transition-all duration-700
      ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100'}`}>
       <p className={`text-[9px] font-black uppercase tracking-[0.3em] mb-2 ${isDark ? 'text-white/20' : 'text-slate-400'}`}>{label}</p>
       <p className={`text-2xl font-serif font-black italic tracking-tighter ${isDark ? 'text-emerald-500' : 'text-slate-900'}`}>{value}</p>
    </div>
  );
}

export default SellerOrders;
