import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  ChevronRight, 
  CreditCard, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock,
  Sparkles,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

const INVOICES = [
  { id: 'INV-2024-001', date: 'Oct 12, 2024', amount: '1,450.00 DH', status: 'Paid', method: 'Bank Transfer' },
  { id: 'INV-2024-002', date: 'Oct 05, 2024', amount: '890.00 DH', status: 'Paid', method: 'Wallet' },
  { id: 'INV-2024-003', date: 'Sep 28, 2024', amount: '2,100.00 DH', status: 'Pending', method: 'Bank Transfer' },
  { id: 'INV-2024-004', date: 'Sep 21, 2024', amount: '560.00 DH', status: 'Paid', method: 'Bank Transfer' },
  { id: 'INV-2024-005', date: 'Sep 14, 2024', amount: '1,200.00 DH', status: 'Paid', method: 'Bank Transfer' },
];

export default function SellerInvoices() {
  const { isDarkMode } = useOutletContext();

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className={`h-[1px] w-12 ${isDarkMode ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-sage'}`} />
             <span className={`text-[10px] font-black uppercase tracking-[0.5em] transition-colors ${isDarkMode ? 'text-emerald-500' : 'text-sage'}`}>Financial Ledger</span>
          </div>
          <h1 className={`text-4xl md:text-5xl font-serif font-black italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Invoices & <br />Commission Statements
          </h1>
        </div>
        
        <div className={`p-6 rounded-3xl border flex items-center gap-6 transition-all
          ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-100'}`}>
           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-emerald-500/20 text-emerald-500' : 'bg-sage/10 text-sage'}`}>
              <TrendingUp size={24} />
           </div>
           <div>
              <p className={`text-[10px] font-black uppercase tracking-widest opacity-40`}>Total Withdrawable</p>
              <h3 className="text-2xl font-black tracking-tighter">4,280.00 DH</h3>
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Next Payout', value: 'Oct 19, 2024', icon: Clock, color: 'text-blue-500' },
          { label: 'Total Sales', value: '42,900 DH', icon: Sparkles, color: 'text-emerald-500' },
          { label: 'Fees Paid', value: '1,250 DH', icon: CreditCard, color: 'text-rose-500' },
        ].map((stat, i) => (
          <div key={i} className={`p-8 rounded-[2.5rem] border transition-all duration-700
            ${isDarkMode ? 'bg-[#141414] border-white/5 text-white shadow-2xl shadow-black' : 'bg-white border-slate-100'}`}>
             <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-slate-50'}`}>
                   <stat.icon size={22} className={stat.color} />
                </div>
                <ArrowUpRight size={18} className="opacity-20" />
             </div>
             <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">{stat.label}</p>
             <h4 className="text-2xl font-black tracking-tight">{stat.value}</h4>
          </div>
        ))}
      </div>

      {/* Invoices List */}
      <div className={`rounded-[3.5rem] border shadow-2xl overflow-hidden transition-all duration-700
        ${isDarkMode ? 'bg-[#141414] border-white/5 shadow-black' : 'bg-white border-slate-100'}`}>
        <div className={`p-10 border-b flex items-center justify-between ${isDarkMode ? 'border-white/5' : 'border-slate-50'}`}>
           <h3 className={`text-2xl font-serif font-black italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Transaction History</h3>
           <div className={`flex items-center gap-3 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border
             ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-100'}`}>
             <FileText size={14} className="text-emerald-500" /> Export All
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className={`text-[10px] font-black uppercase tracking-[0.2em] border-b transition-colors
                   ${isDarkMode ? 'bg-white/[0.02] border-white/5 text-white/40' : 'bg-slate-50/50 border-slate-50 text-slate-400'}`}>
                    <th className="px-10 py-6">ID / DATE</th>
                    <th className="px-10 py-6">AMOUNT</th>
                    <th className="px-10 py-6">STATUS</th>
                    <th className="px-10 py-6">METHOD</th>
                    <th className="px-10 py-6 text-right">ACTION</th>
                 </tr>
              </thead>
              <tbody className={`divide-y transition-colors ${isDarkMode ? 'divide-white/5' : 'divide-slate-50'}`}>
                 {INVOICES.map((inv, idx) => (
                    <motion.tr 
                      key={inv.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`group hover:bg-white/[0.02] transition-colors cursor-pointer`}
                    >
                       <td className="px-10 py-8">
                          <div className="flex flex-col">
                             <span className={`text-sm font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{inv.id}</span>
                             <span className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-40">{inv.date}</span>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <span className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{inv.amount}</span>
                       </td>
                       <td className="px-10 py-8">
                          <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border border-dashed
                            ${inv.status === 'Paid' 
                               ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                               : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                            {inv.status === 'Paid' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                            {inv.status}
                          </span>
                       </td>
                       <td className="px-10 py-8">
                          <span className={`text-[10px] font-black uppercase tracking-widest opacity-60 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{inv.method}</span>
                       </td>
                       <td className="px-10 py-8 text-right">
                          <button className={`p-4 rounded-2xl border transition-all
                            ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-emerald-500 hover:text-white hover:border-emerald-500' : 'bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-900 hover:text-white'}`}>
                             <Download size={18} />
                          </button>
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
