import React, { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { 
  TrendingUp, 
  ShoppingBag, 
  Package, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  ArrowRightCircle
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// Animated Counter Component
const AnimatedNumber = ({ value, prefix = "" }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => setCount(Math.floor(latest))
    });
    return () => controls.stop();
  }, [value]);
  return <span>{prefix}{count.toLocaleString()}</span>;
};

const SellerDashboard = () => {
  const { isDarkMode } = useOutletContext();

  const chartData = [
    { name: 'Mon', revenue: 1200 },
    { name: 'Tue', revenue: 1900 },
    { name: 'Wed', revenue: 1500 },
    { name: 'Thu', revenue: 2600 },
    { name: 'Fri', revenue: 2100 },
    { name: 'Sat', revenue: 3800 },
    { name: 'Sun', revenue: 3200 },
  ];

  const stats = [
    { label: 'MY REVENUE', value: 12430, prefix: 'DH ', change: '+18.4%', trendingUp: true, icon: DollarSign, color: '#FACC15' },
    { label: 'MY SALES', value: 412, change: '+5.2%', trendingUp: true, icon: ShoppingBag, color: '#2DD4BF' },
    { label: 'ACTIVE LISTINGS', value: 24, change: '0.0%', trendingUp: true, icon: Package, color: '#F472B6' },
    { label: 'ORDER FULFILLMENT', value: 98, prefix: '', change: '+1.2%', trendingUp: true, icon: CheckCircle2, color: '#A78BFA' },
  ];

  const recentSales = [
    { id: '#SL-9021', customer: 'Yassine K.', product: 'Desert Rose', status: 'Processing', price: '250.00 DH', time: '10m ago' },
    { id: '#SL-9022', customer: 'Meryem A.', product: 'Argan Set', status: 'Shipped', price: '1,200.00 DH', time: '1h ago' },
    { id: '#SL-9023', customer: 'Omar H.', product: 'Climbing Jasmine', status: 'Pending', price: '450.00 DH', time: '3h ago' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-4 rounded-xl border shadow-2xl backdrop-blur-md ${isDarkMode ? 'bg-[#141414] border-white/20' : 'bg-white border-slate-200'}`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white' : 'text-slate-500'}`}>{label}</p>
          <p className="text-sm font-black text-amber-500">Revenue: <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>{payload[0].value} DH</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className={`text-4xl font-serif font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Seller Intelligence</h1>
          <p className={`text-[13px] font-black mt-1 ${isDarkMode ? 'text-[#CBD5E1]' : 'text-slate-500'}`}>Performance analytics for Nourplant Agadir store.</p>
        </div>
        <div className="flex bg-slate-100/50 dark:bg-white/5 p-1 rounded-2xl border dark:border-white/10">
           <button className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isDarkMode ? 'bg-[#1A1A1A] text-amber-400' : 'bg-white text-slate-900 shadow-sm'}`}>WEEKLY</button>
           <button className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>MONTHLY</button>
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
            <div className={`p-4 rounded-2xl w-fit mb-6 transition-transform group-hover:scale-110 ${isDarkMode ? 'bg-white/5' : 'bg-slate-50'}`} style={{ color: stat.color }}>
              <stat.icon size={26} />
            </div>
            <div className="space-y-2">
              <p className={`text-[11px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-[#CBD5E1]' : 'text-slate-400'}`}>{stat.label}</p>
              <div className="flex items-end justify-between">
                <h3 className={`text-3xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  <AnimatedNumber value={stat.value} prefix={stat.prefix} />
                </h3>
                <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${stat.trendingUp ? 'text-emerald-500 bg-emerald-500/10' : 'text-red-500 bg-red-500/10'}`}>
                  {stat.change}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
        className={`p-8 lg:p-10 rounded-[3rem] border shadow-sm relative overflow-hidden ${isDarkMode ? 'bg-[#141414] border-white/10' : 'bg-white border-slate-100'}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 relative z-10">
          <div>
            <h3 className={`text-2xl font-serif font-black italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Revenue Stream</h3>
            <p className={`text-xs mt-1 uppercase font-black tracking-widest ${isDarkMode ? 'text-[#94A3B8]' : 'text-slate-500'}`}>Financial performance over last 7 days</p>
          </div>
        </div>
        <div className="h-[400px] w-full relative z-10 font-bold">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FACC15" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#FACC15" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#ffffff10" : "#00000005"} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: isDarkMode ? '#CBD5E1' : '#64748b' }} dy={15} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: isDarkMode ? '#CBD5E1' : '#64748b' }} dx={-10} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#FACC15', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area type="monotone" dataKey="revenue" stroke="#FACC15" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" animationDuration={2000} dot={{ r: 4, fill: '#FACC15', strokeWidth: 2, stroke: isDarkMode ? '#141414' : '#fff' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
          className={`lg:col-span-2 rounded-[3rem] border shadow-sm overflow-hidden flex flex-col ${isDarkMode ? 'bg-[#141414] border-white/10' : 'bg-white border-slate-100'}`}
        >
          <div className={`p-8 border-b ${isDarkMode ? 'border-white/10' : 'border-slate-50'}`}>
             <h3 className={`text-2xl font-serif font-black italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>My Recent Sales</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className={`text-[10px] font-black uppercase tracking-[0.2em] border-b ${isDarkMode ? 'bg-white/[0.04] text-[#CBD5E1] border-white/5' : 'bg-slate-50/50 text-slate-500 border-slate-50'}`}>
                  <th className="px-10 py-6">Buyer Information</th>
                  <th className="px-10 py-6">Status</th>
                  <th className="px-10 py-6 text-right">Price</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-slate-50'}`}>
                {recentSales.map((order, i) => (
                  <tr key={i} className={`group transition-all ${isDarkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50/70'}`}>
                    <td className="px-10 py-7">
                      <div className="flex flex-col">
                        <span className={`text-sm font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{order.customer}</span>
                        <span className={`text-[10px] font-black uppercase tracking-widest mt-1 opacity-50 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{order.product}</span>
                      </div>
                    </td>
                    <td className="px-10 py-7">
                      <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-dashed transition-all
                        ${order.status === 'Shipped' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-10 py-7 text-right">
                      <span className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{order.price}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
          className={`p-10 rounded-[3rem] shadow-sm relative group border ${isDarkMode ? 'bg-[#141414] text-white border-white/20' : 'bg-white text-slate-900 border-slate-100'}`}
        >
          <h3 className="text-2xl font-serif font-black tracking-tight italic mb-8">Nourplant Pulse</h3>
          <div className="space-y-10">
            {[
              { event: 'Inventory Level', meta: 'Desert Rose low stock', time: 'Just now', icon: AlertCircle, color: 'text-amber-500' },
              { event: 'Payment Settled', meta: 'INV-4029 cleared', time: '1H ago', icon: CheckCircle2, color: 'text-emerald-500' },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start relative overflow-hidden">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${isDarkMode ? 'bg-white/10 border-white/20' : 'bg-slate-50 border-slate-100'}`}>
                   <item.icon size={22} className={item.color} />
                </div>
                <div className="space-y-1 pt-1">
                  <p className="text-sm font-black tracking-wide">{item.event}</p>
                  <p className="text-[11px] font-bold leading-relaxed opacity-70">{item.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SellerDashboard;
