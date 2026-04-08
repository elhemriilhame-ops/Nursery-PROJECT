import React from 'react';
import { motion } from 'framer-motion';
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
  Filter
} from 'lucide-react';
import { SELLER_ORDERS } from '@/data/mockData';

const SellerOrders = () => {
  const { isDarkMode } = useOutletContext();

  const getStatusStyle = (status) => {
    if (isDarkMode) {
      switch (status) {
        case 'Shipped': return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
        case 'Pending': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
        case 'Delivered': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
        case 'Processing': return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
        default: return 'bg-white/5 text-white/50 border border-white/10';
      }
    }
    switch (status) {
      case 'Shipped': return 'bg-blue-100 text-blue-600';
      case 'Pending': return 'bg-amber-100 text-amber-600';
      case 'Delivered': return 'bg-emerald-100 text-emerald-600';
      case 'Processing': return 'bg-purple-100 text-purple-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="space-y-10 pb-10">
      {/* Page Header */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-6 p-10 rounded-[3rem] border shadow-sm transition-all
        ${isDarkMode ? 'bg-[#141414] border-white/10' : 'bg-white border-slate-100'}`}>
        <div className="space-y-1">
          <h1 className={`text-3xl font-serif font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Order Fulfillment</h1>
          <p className={`text-sm font-bold italic ${isDarkMode ? 'text-[#CBD5E1]' : 'text-slate-600'}`}>Track and manage customer botanical purchases.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className={`flex items-center gap-2 px-6 py-3 border rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-sm
            ${isDarkMode ? 'bg-white/5 border-white/10 text-[#CBD5E1] hover:bg-white/10 hover:text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-amber-600'}`}>
            <Filter size={18} />
            <span>Filter Orders</span>
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className={`rounded-[3.5rem] border shadow-xl overflow-hidden transition-all
        ${isDarkMode ? 'bg-[#141414] border-white/10 shadow-black' : 'bg-white border-slate-100 shadow-black/[0.02]'}`}>
        <div className={`p-10 border-b flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all ${isDarkMode ? 'border-white/5' : 'border-slate-50'}`}>
           <div className="flex items-center gap-4">
             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all
               ${isDarkMode ? 'bg-amber-500 shadow-amber-500/20' : 'bg-slate-800 shadow-slate-200'}`}>
                <ShoppingBag size={24} />
             </div>
             <div>
                <h2 className={`text-xl font-serif font-black tracking-tight italic ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Merchant Sales Queue</h2>
                <p className={`text-[10px] font-black uppercase tracking-widest opacity-50 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Real-time order processing</p>
             </div>
           </div>

           <div className="relative">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`} size={18} />
              <input 
                type="text" 
                placeholder="Search by Order ID or Buyer..."
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
                <th className="px-10 py-6">Order ID & Status</th>
                <th className="px-10 py-6">Merchant Buyer</th>
                <th className="px-10 py-6">Botanical Item</th>
                <th className="px-10 py-6">Mission Date</th>
                <th className="px-10 py-6 text-right">Total</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y transition-all ${isDarkMode ? 'divide-white/5' : 'divide-slate-50'}`}>
              {SELLER_ORDERS.map((order) => (
                <tr key={order.id} className={`transition-all group ${isDarkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50/50'}`}>
                  <td className="px-10 py-8">
                    <div className="space-y-3">
                       <span className={`text-[13px] font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{order.id}</span>
                       <div className={`w-fit flex items-center gap-2 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${getStatusStyle(order.status)}`}>
                          {order.status === 'Shipped' ? <Package size={14} /> : order.status === 'Delivered' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                          <span>{order.status}</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all
                         ${isDarkMode ? 'bg-white/5 text-white' : 'bg-slate-100 text-slate-800'}`}>
                          <User size={20} />
                       </div>
                       <div>
                          <p className={`text-sm font-black transition-colors group-hover:text-amber-500 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{order.customer}</p>
                          <p className={`text-[10px] font-black uppercase tracking-widest italic opacity-50 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{order.location}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-3">
                       <Package size={18} className={`shrink-0 transition-colors ${isDarkMode ? 'text-amber-400' : 'text-slate-400'}`} />
                       <div className="flex flex-col">
                          <p className={`text-sm font-bold ${isDarkMode ? 'text-[#CBD5E1]' : 'text-slate-900'}`}>{order.product}</p>
                          <p className={`text-[10px] font-black opacity-40 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>QTY: {order.quantity}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-3">
                       <Calendar size={16} className={isDarkMode ? 'text-amber-400' : 'text-slate-400'} />
                       <span className={`text-[13px] font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{order.date}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                     <p className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{order.total}</p>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end gap-3">
                       <button className={`p-3 rounded-2xl border transition-all
                         ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-amber-400/20 hover:text-amber-400 hover:border-amber-400/40' : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-amber-600'}`}>
                          <ChevronRight size={22} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerOrders;
