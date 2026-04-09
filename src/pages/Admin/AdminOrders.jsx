import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  MoreVertical,
  ChevronRight,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';

const ORDERS = [
  { id: '#GARD-9021', customer: 'Sophie Lefebvre', date: 'Oct 12, 2024', amount: '450.00 DH', status: 'Shipped', type: 'Bouquet' },
  { id: '#GARD-9022', customer: 'Benoît Morin', date: 'Oct 12, 2024', amount: '1,200.00 DH', status: 'Pending', type: 'Rare Plant' },
  { id: '#GARD-9023', customer: 'Clémence Durand', date: 'Oct 11, 2024', amount: '890.00 DH', status: 'Processing', type: 'Essentials' },
  { id: '#GARD-9024', customer: 'Marc Petit', date: 'Oct 11, 2024', amount: '320.00 DH', status: 'Delivered', type: 'Accessory' },
  { id: '#GARD-9025', customer: 'Julie Martin', date: 'Oct 10, 2024', amount: '150.00 DH', status: 'Canceled', type: 'Gift' },
];

export default function AdminOrders() {
  const { isDarkMode } = useOutletContext();

  return (
    <div className="space-y-12 pb-20">
      {/* Header & Global Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <h1 className={`text-4xl font-serif font-black italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Global Logistics</h1>
          <p className={`text-[11px] font-black uppercase tracking-widest opacity-40`}>Total stream of marketplace transactions</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
           <div className={`relative flex-grow md:flex-initial`}>
              <Search className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? 'text-white/20' : 'text-slate-400'}`} size={18} />
              <input type="text" placeholder="Search orders, IDs..." 
                className={`w-full md:w-80 p-4 pl-14 rounded-2xl text-[13px] font-bold outline-none border transition-all
                  ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:bg-white/10' : 'bg-white border-slate-100'}`} />
           </div>
           <button className={`p-4 rounded-2xl border transition-all
             ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-[#2DD4BF]/20' : 'bg-white border-slate-100 text-slate-900 shadow-sm'}`}>
              <Filter size={20} />
           </button>
           <button className={`flex items-center gap-3 px-8 py-4 bg-[#F43F5E] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-pink-500/20 hover:scale-[1.02] transition-all`}>
              <Download size={16} /> EXPORT LEDGER
           </button>
        </div>
      </div>

      {/* Orders Registry */}
      <div className={`rounded-[3rem] border shadow-2xl overflow-hidden transition-all duration-700
        ${isDarkMode ? 'bg-[#141414] border-white/10 shadow-black' : 'bg-white border-slate-100 shadow-slate-100/50'}`}>
        <div className="overflow-x-auto">
           <table className="w-full text-left whitespace-nowrap">
              <thead>
                 <tr className={`text-[10px] font-black uppercase tracking-[0.2em] border-b transition-colors
                   ${isDarkMode ? 'bg-white/[0.04] border-white/10 text-white/40' : 'bg-slate-50 border-slate-50 text-slate-400'}`}>
                    <th className="px-10 py-6">TRANSACTION ID</th>
                    <th className="px-10 py-6">CONSIGNEE</th>
                    <th className="px-10 py-6">CLASSIFICATION</th>
                    <th className="px-10 py-6">STATUS</th>
                    <th className="px-10 py-6">DATE</th>
                    <th className="px-10 py-6 text-right">FUNDS</th>
                    <th className="px-10 py-6 text-center">ACTIONS</th>
                 </tr>
              </thead>
              <tbody className={`divide-y transition-colors ${isDarkMode ? 'divide-white/10' : 'divide-slate-50'}`}>
                 {ORDERS.map((order, idx) => (
                    <motion.tr 
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`group hover:bg-white/[0.02] transition-all cursor-pointer`}
                    >
                       <td className="px-10 py-8">
                          <span className={`text-sm font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{order.id}</span>
                       </td>
                       <td className="px-10 py-8">
                          <span className={`text-sm font-bold ${isDarkMode ? 'text-white/80' : 'text-slate-600'}`}>{order.customer}</span>
                       </td>
                       <td className="px-10 py-8">
                          <div className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border inline-block
                             ${isDarkMode ? 'bg-white/5 border-white/10 text-white/60' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                             {order.type}
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border border-dashed
                            ${order.status === 'Shipped' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                              order.status === 'Pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                              order.status === 'Processing' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                              order.status === 'Delivered' ? 'bg-white/5 text-emerald-400 border-white/10' :
                              'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                            {order.status}
                          </span>
                       </td>
                       <td className="px-10 py-8">
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{order.date}</span>
                       </td>
                       <td className="px-10 py-8 text-right">
                          <span className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{order.amount}</span>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex items-center justify-center gap-2">
                             <button className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all
                               ${isDarkMode ? 'bg-white/5 text-white hover:bg-[#2DD4BF]/20' : 'bg-slate-50 text-slate-400 hover:bg-slate-900'}`}>
                                <Eye size={16} />
                             </button>
                             <button className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all
                               ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-slate-50 text-slate-400 hover:bg-slate-900'}`}>
                                <MoreVertical size={16} />
                             </button>
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
