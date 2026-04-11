import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { 
  Wallet, TrendingUp, TrendingDown, DollarSign, 
  CreditCard, PieChart, Activity, Download
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const mockChartData = [
  { name: 'Jan', revenue: 4000, commission: 800 },
  { name: 'Feb', revenue: 5200, commission: 1040 },
  { name: 'Mar', revenue: 3800, commission: 760 },
  { name: 'Apr', revenue: 6500, commission: 1300 },
  { name: 'May', revenue: 8400, commission: 1680 },
  { name: 'Jun', revenue: 7200, commission: 1440 },
];

const AdminEarnings = () => {
  const { isDarkMode } = useOutletContext();

  const stats = [
    { title: "Total Volume (YTD)", value: "DH 35,100", trend: "+14.5%", icon: Activity, up: true },
    { title: "Platform Commission", value: "DH 7,020", trend: "+14.5%", icon: Wallet, up: true },
    { title: "Seller Payouts", value: "DH 28,080", trend: "+12.2%", icon: CreditCard, up: true },
    { title: "Pending Refunds", value: "DH 1,240", trend: "-2.4%", icon: PieChart, up: false },
  ];

  const recentTransactions = [
    { id: "TRX-8921", seller: "Nourplant", amount: "DH 4,500", date: "Today, 14:30", status: "Completed" },
    { id: "TRX-8920", seller: "Green Oasis", amount: "DH 1,200", date: "Today, 11:15", status: "Processing" },
    { id: "TRX-8919", seller: "Atlas Flora", amount: "DH 3,850", date: "Yesterday", status: "Completed" },
    { id: "TRX-8918", seller: "Desert Bloom", amount: "DH 950", date: "Yesterday", status: "Completed" },
  ];

  return (
    <div className="space-y-8 pb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div>
            <h1 className={cn("text-4xl font-serif font-black italic tracking-tighter", isDarkMode ? "text-white" : "text-slate-900")}>
               Revenue <br/> Operations.
            </h1>
            <p className={cn("text-[10px] font-black uppercase tracking-[0.3em] mt-3", isDarkMode ? "text-emerald-500" : "text-sage")}>
               Financial Overview & Growth
            </p>
         </div>
         <button className={cn(
            "flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all",
            isDarkMode ? "bg-white/5 hover:bg-white/10 text-white" : "bg-white hover:bg-slate-50 text-slate-900 shadow-sm border border-slate-100"
         )}>
            <Download size={16} />
            <span>Export Report</span>
         </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
               "p-6 rounded-[2rem] border relative overflow-hidden group",
               isDarkMode ? "bg-[#111111] border-white/5" : "bg-white border-slate-100 shadow-sm"
            )}
          >
            <div className={cn(
               "absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-20 transition-transform group-hover:scale-150",
               stat.up ? "bg-emerald-500" : "bg-rose-500"
            )} />
            
            <div className="relative z-10">
               <div className="flex justify-between items-start mb-6">
                  <div className={cn(
                     "w-12 h-12 rounded-2xl flex items-center justify-center",
                     isDarkMode ? "bg-white/5 text-white/60" : "bg-slate-50 text-slate-500"
                  )}>
                     <stat.icon size={20} />
                  </div>
                  <span className={cn(
                     "flex items-center gap-1 text-[10px] font-black rounded-lg px-2 py-1",
                     stat.up ? (isDarkMode ? "text-emerald-400 bg-emerald-500/10" : "text-emerald-600 bg-emerald-50") : 
                               (isDarkMode ? "text-rose-400 bg-rose-500/10" : "text-rose-600 bg-rose-50")
                  )}>
                     {stat.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                     {stat.trend}
                  </span>
               </div>
               
               <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-1", isDarkMode ? "text-white/40" : "text-slate-400")}>
                  {stat.title}
               </p>
               <h3 className={cn("text-3xl font-black tracking-tight", isDarkMode ? "text-white" : "text-slate-900")}>
                  {stat.value}
               </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className={cn(
               "lg:col-span-2 p-8 rounded-[2.5rem] border",
               isDarkMode ? "bg-[#111111] border-white/5" : "bg-white border-slate-100 shadow-sm"
            )}
         >
            <div className="mb-8">
               <h3 className={cn("text-xl font-black tracking-tight", isDarkMode ? "text-white" : "text-slate-900")}>Revenue vs Commission</h3>
               <p className={cn("text-[11px] font-black uppercase tracking-[0.2em] mt-2", isDarkMode ? "text-white/40" : "text-slate-400")}>Monthly Performance (2026)</p>
            </div>
            
            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                   <defs>
                     <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor={isDarkMode ? "#10b981" : "#10b981"} stopOpacity={0.3}/>
                       <stop offset="95%" stopColor={isDarkMode ? "#10b981" : "#10b981"} stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: isDarkMode ? '#888' : '#aaa' }} dy={10} />
                   <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: isDarkMode ? '#888' : '#aaa' }} />
                   <Tooltip 
                     contentStyle={{ backgroundColor: isDarkMode ? '#000' : '#fff', borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                     itemStyle={{ fontSize: '12px', fontWeight: '900' }}
                   />
                   <Area type="monotone" dataKey="revenue" stroke={isDarkMode ? "#10b981" : "#10b981"} strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                 </AreaChart>
               </ResponsiveContainer>
            </div>
         </motion.div>

         <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className={cn(
               "p-8 rounded-[2.5rem] border flex flex-col",
               isDarkMode ? "bg-[#111111] border-white/5" : "bg-white border-slate-100 shadow-sm"
            )}
         >
            <div className="mb-6">
               <h3 className={cn("text-xl font-black tracking-tight", isDarkMode ? "text-white" : "text-slate-900")}>Recent Payouts</h3>
               <p className={cn("text-[11px] font-black uppercase tracking-[0.2em] mt-2", isDarkMode ? "text-white/40" : "text-slate-400")}>Latest Seller Transfers</p>
            </div>
            
            <div className="flex-grow space-y-4">
               {recentTransactions.map((trx, idx) => (
                  <div key={idx} className={cn(
                     "p-4 rounded-3xl border flex items-center justify-between",
                     isDarkMode ? "bg-[#1A1A1A] border-white/5" : "bg-slate-50 border-slate-100"
                  )}>
                     <div>
                        <p className={cn("text-[13px] font-black tracking-tight", isDarkMode ? "text-white" : "text-slate-900")}>{trx.seller}</p>
                        <p className={cn("text-[9px] font-black uppercase tracking-widest mt-1", isDarkMode ? "text-white/40" : "text-slate-400")}>{trx.date}</p>
                     </div>
                     <div className="text-right">
                        <p className={cn("text-[13px] font-black", isDarkMode ? "text-emerald-400" : "text-emerald-600")}>{trx.amount}</p>
                        <p className={cn(
                           "text-[8px] font-black uppercase tracking-widest mt-1 px-2 py-0.5 rounded-md inline-block",
                           trx.status === 'Completed' ? (isDarkMode ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-600") : 
                                                        (isDarkMode ? "bg-amber-500/20 text-amber-400" : "bg-amber-100 text-amber-600")
                        )}>
                           {trx.status}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </motion.div>
      </div>
    </div>
  );
};

export default AdminEarnings;
