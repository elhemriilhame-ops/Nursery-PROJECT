import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  ArrowUpRight, 
  CreditCard, 
  Download,
  Activity,
  Zap,
  Clock
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Button } from '@/components/ui/button';

const data = [
  { name: 'Mon', earnings: 150 },
  { name: 'Tue', earnings: 320 },
  { name: 'Wed', earnings: 280 },
  { name: 'Thu', earnings: 450 },
  { name: 'Fri', earnings: 380 },
  { name: 'Sat', earnings: 520 },
  { name: 'Sun', earnings: 490 },
];

export default function DeliveryEarnings() {
  const { isDarkMode } = useOutletContext();

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className={`h-[1px] w-12 ${isDarkMode ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-slate-900'}`} />
             <span className={`text-[10px] font-black uppercase tracking-[0.5em] transition-colors ${isDarkMode ? 'text-emerald-500' : 'text-slate-900'}`}>Financial Flows</span>
          </div>
          <h1 className={`text-4xl md:text-5xl font-serif font-black italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Earnings <br />& Fiber Payouts
          </h1>
        </div>
      </div>

      {/* Main Stats Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <motion.div 
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               className={`p-10 rounded-[4rem] border shadow-2xl transition-all duration-700
                 ${isDarkMode ? 'bg-[#141414] border-white/5 shadow-black' : 'bg-white border-slate-100'}`}
            >
               <div className="flex justify-between items-center mb-12">
                  <div>
                     <h3 className={`text-2xl font-serif font-black italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Weekly Growth</h3>
                     <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Operational Performance</p>
                  </div>
                  <div className={`flex p-1.5 rounded-2xl border ${isDarkMode ? 'bg-white/10 border-white/10' : 'bg-slate-50 border-slate-100'}`}>
                     <button className={`px-6 py-2 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all
                        ${isDarkMode ? 'bg-[#1A1A1A] text-emerald-500 shadow-2xl shadow-black' : 'bg-white text-sage shadow-xl shadow-slate-200'}`}>WEEK</button>
                     <button className={`px-6 py-2 rounded-xl text-[9px] font-black tracking-widest uppercase transition-all
                        ${isDarkMode ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>MONTH</button>
                  </div>
               </div>

               <div className="h-[350px] w-full font-serif font-black">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#ffffff10" : "#00000005"} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: isDarkMode ? '#ffffff40' : '#00000040', fontWeight: 900}} dy={15} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: isDarkMode ? '#ffffff40' : '#00000040', fontWeight: 900}} dx={-10} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: isDarkMode ? '#141414' : '#fff', border: 'none', borderRadius: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
                        itemStyle={{ color: '#10b981', fontWeight: 900, textTransform: 'uppercase', fontSize: '10px' }}
                      />
                      <Area type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorEarnings)" />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
            </motion.div>
         </div>

         <div className="space-y-8">
            {[
              { label: 'Available Balance', value: '1,240 DH', icon: DollarSign, color: 'text-emerald-500' },
              { label: 'Pending Fiber', value: '450 DH', icon: Clock, color: 'text-amber-500' },
              { label: 'Total Withdrawn', value: '8,900 DH', icon: TrendingUp, color: 'text-blue-500' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-[2.5rem] border shadow-2xl transition-all duration-700
                   ${isDarkMode ? 'bg-[#141414] border-white/5 shadow-black' : 'bg-white border-slate-100'}`}
              >
                 <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-white/10' : 'bg-slate-50'}`}>
                       <stat.icon size={22} className={stat.color} />
                    </div>
                    <button className={`p-3 rounded-xl border transition-all
                       ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-900'}`}>
                       <ArrowUpRight size={16} />
                    </button>
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">{stat.label}</p>
                 <h4 className="text-3xl font-black italic tracking-tighter">{stat.value}</h4>
              </motion.div>
            ))}

            <Button className={`w-full h-20 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all hover:scale-[1.02]
               ${isDarkMode ? 'bg-white text-black hover:bg-emerald-500 hover:text-white' : 'bg-slate-900 text-white'}`}>
               Initiate Fiber Withdrawal
            </Button>
         </div>
      </div>
    </div>
  );
}
