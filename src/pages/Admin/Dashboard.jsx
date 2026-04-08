import React, { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  ChevronRight,
  Calendar,
  Filter,
  Package,
  CheckCircle2,
  Clock,
  AlertCircle,
  Truck
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

const Dashboard = () => {
  const { isDarkMode } = useOutletContext();

  const chartData = [
    { name: 'Mon', sales: 4500, orders: 120 },
    { name: 'Tue', sales: 5200, orders: 145 },
    { name: 'Wed', sales: 4800, orders: 130 },
    { name: 'Thu', sales: 6100, orders: 170 },
    { name: 'Fri', sales: 5900, orders: 155 },
    { name: 'Sat', sales: 7200, orders: 205 },
    { name: 'Sun', sales: 6800, orders: 190 },
  ];

  const stats = [
    { label: 'TOTAL REVENUE', value: 128430, prefix: 'DH ', change: '+14.2%', trendingUp: true, icon: DollarSign, color: '#2DD4BF' },
    { label: 'TOTAL ORDERS', value: 10720, change: '+12.5%', trendingUp: true, icon: ShoppingBag, color: '#F472B6' },
    { label: 'ACTIVE CUSTOMERS', value: 4120, change: '+3.1%', trendingUp: true, icon: Users, color: '#FACC15' },
    { label: 'PENDING & CANCELED', value: 94, change: '-2.4%', trendingUp: false, icon: AlertCircle, color: '#A78BFA' },
  ];

  const recentOrders = [
    { id: '#GARD-9021', customer: 'Sophie Lefebvre', product: 'Tree Peony', status: 'Shipped', price: '450.00 DH', time: '5m ago' },
    { id: '#GARD-9022', customer: 'Benoît Morin', product: 'Bonsai Pine', status: 'Pending', price: '1,200.00 DH', time: '15m ago' },
    { id: '#GARD-9023', customer: 'Clémence Durand', product: 'Hydrangea Set', status: 'Processing', price: '890.00 DH', time: '1h ago' },
    { id: '#GARD-9024', customer: 'Marc Petit', product: 'Monstera XL', status: 'Delivered', price: '320.00 DH', time: '3h ago' },
    { id: '#GARD-9025', customer: 'Julie Martin', product: 'Lavender Bouquet', status: 'Shipped', price: '150.00 DH', time: '5h ago' },
    { id: '#GARD-9026', customer: 'Sarah Miller', product: 'White Orchid', status: 'Processing', price: '500.00 DH', time: 'Yesterday' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-4 rounded-xl border shadow-2xl backdrop-blur-md ${isDarkMode ? 'bg-[#141414] border-white/20' : 'bg-white border-slate-200'}`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white' : 'text-slate-500'}`}>{label}</p>
          <p className="text-sm font-black text-[#2DD4BF]">Sales: <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>{payload[0].value} DH</span></p>
          <p className={`text-[10px] font-bold mt-1 opacity-80 ${isDarkMode ? 'text-white' : 'text-slate-400'}`}>Orders: {payload[1]?.value} units</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Top Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className={`text-4xl font-serif font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Dashboard Overview</h1>
          <p className={`text-[13px] font-black mt-1 ${isDarkMode ? 'text-[#CBD5E1]' : 'text-slate-500'}`}>Real-time metrics and system performance across the nursery marketplace.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className={`flex items-center gap-2 px-6 py-3 border rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-sm
            ${isDarkMode ? 'bg-[#141414] border-white/20 text-white hover:bg-white/10' : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50'}`}>
            <Calendar size={16} className="text-[#2DD4BF]" />
            LAST 7 DAYS
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#F43F5E] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-pink-500/20 hover:brightness-110 active:scale-95 transition-all">
            <Filter size={16} />
            FILTER
          </button>
        </div>
      </div>

      {/* KPI Cards Grid - State-Based Colors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`group p-8 rounded-[2.5rem] border shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden
              ${isDarkMode ? 'bg-[#141414] border-white/10' : 'bg-white border-slate-100'}`}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: stat.color, boxShadow: `0 0 20px ${stat.color}` }} />
            
            <div className={`p-4 rounded-2xl w-fit mb-6 transition-transform duration-500 group-hover:scale-110 ${isDarkMode ? 'bg-white/10' : 'bg-slate-50'}`} style={{ color: stat.color }}>
              <stat.icon size={26} />
            </div>
            
            <div className="space-y-2">
              <p className={`text-[11px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-[#CBD5E1]' : 'text-slate-400'}`}>{stat.label}</p>
              <div className="flex items-end justify-between">
                <h3 className={`text-3xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  <AnimatedNumber value={stat.value} prefix={stat.prefix} />
                </h3>
                <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${stat.trendingUp ? 'text-emerald-500 bg-emerald-500/10' : 'text-red-500 bg-red-500/10'}`}>
                  {stat.trendingUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {stat.change}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Chart Section - State-Based Colors */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className={`p-8 lg:p-10 rounded-[3rem] border shadow-sm relative overflow-hidden ${isDarkMode ? 'bg-[#141414] border-white/10' : 'bg-white border-slate-100'}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 relative z-10">
          <div>
            <h3 className={`text-2xl font-serif font-black italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Transactional Intelligence</h3>
            <p className={`text-xs mt-1 uppercase font-black tracking-widest ${isDarkMode ? 'text-[#94A3B8]' : 'text-slate-500'}`}>Revenue and Order Volume Analysis</p>
          </div>
          <div className={`flex p-1.5 rounded-2xl border ${isDarkMode ? 'bg-white/10 border-white/10' : 'bg-slate-50 border-slate-100'}`}>
             <button className={`px-6 py-2.5 shadow-md dark:shadow-none rounded-xl text-[10px] font-black transition-all uppercase tracking-widest
               ${isDarkMode ? 'bg-[#1A1A1A] text-[#2DD4BF]' : 'bg-white text-sage'}`}>REVENUE</button>
             <button className={`px-6 py-2.5 text-[10px] font-black transition-all uppercase tracking-widest
               ${isDarkMode ? 'text-[#94A3B8] hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>VOLUME</button>
          </div>
        </div>

        <div className="h-[400px] w-full relative z-10 font-bold">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#ffffff20" : "#00000005"} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 900, fill: isDarkMode ? '#CBD5E1' : '#64748b' }}
                dy={15}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 900, fill: isDarkMode ? '#CBD5E1' : '#64748b' }}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#2DD4BF', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area type="monotone" dataKey="sales" stroke="#2DD4BF" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" animationDuration={2000} dot={{ r: 4, fill: '#2DD4BF', strokeWidth: 2, stroke: isDarkMode ? '#141414' : '#fff' }} />
              <Area type="monotone" dataKey="orders" stroke="#F472B6" strokeWidth={2} fill="transparent" animationDuration={2000} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Bottom Grid: Recent Orders and Pulse - State-Based Colors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className={`lg:col-span-2 rounded-[3rem] border shadow-sm overflow-hidden flex flex-col ${isDarkMode ? 'bg-[#141414] border-white/10' : 'bg-white border-slate-100'}`}
        >
          <div className={`p-8 lg:p-10 flex items-center justify-between border-b ${isDarkMode ? 'border-white/10' : 'border-slate-50'}`}>
            <div>
              <h3 className={`text-2xl font-serif font-black italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Recent Orders</h3>
              <p className={`text-[11px] mt-1 uppercase font-black tracking-widest ${isDarkMode ? 'text-[#94A3B8]' : 'text-slate-500'}`}>Live transactional stream</p>
            </div>
            <button className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all
              ${isDarkMode ? 'bg-white/10 text-white hover:bg-[#2DD4BF]/20 hover:text-[#2DD4BF]' : 'bg-slate-50 text-slate-900 hover:bg-sage/10 hover:text-sage'}`}>VIEW ALL</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className={`text-[10px] font-black uppercase tracking-[0.2em] border-b ${isDarkMode ? 'text-[#94A3B8] border-white/10 bg-white/[0.04]' : 'text-slate-400 border-slate-50 bg-slate-50/50'}`}>
                  <th className="px-10 py-6">IDENTITY</th>
                  <th className="px-10 py-6">BOTANICAL</th>
                  <th className="px-10 py-6">STATUS</th>
                  <th className="px-10 py-6 text-right">AMOUNT</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-white/10' : 'divide-slate-50'}`}>
                {recentOrders.map((order, i) => (
                  <tr key={i} className={`group transition-all cursor-pointer ${isDarkMode ? 'hover:bg-white/[0.03]' : 'hover:bg-slate-50/70'}`}>
                    <td className="px-10 py-7">
                      <div className="flex flex-col">
                        <span className={`text-sm font-black tracking-tight group-hover:text-[#2DD4BF] transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{order.customer}</span>
                        <span className={`text-[10px] font-black uppercase tracking-widest mt-1 ${isDarkMode ? 'text-[#94A3B8]' : 'text-slate-400'}`}>{order.id}</span>
                      </div>
                    </td>
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#2DD4BF]" />
                        <span className={`text-xs font-black italic ${isDarkMode ? 'text-[#E2E8F0]' : 'text-slate-600'}`}>{order.product}</span>
                      </div>
                    </td>
                    <td className="px-10 py-7">
                      <span className={`inline-flex px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-dashed transition-all group-hover:border-solid
                        ${order.status === 'Shipped' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' :
                          order.status === 'Pending' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' :
                          order.status === 'Processing' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' :
                          'bg-[#2DD4BF]/10 text-[#2DD4BF] dark:text-[#2DD4BF] border-[#2DD4BF]/20'}`}>
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

        {/* Pulse Sidebar - State-Based Colors */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className={`p-10 rounded-[3rem] shadow-sm overflow-hidden relative group border
            ${isDarkMode ? 'bg-[#141414] text-white border-white/20 shadow-2xl' : 'bg-white text-slate-900 border-slate-100'}`}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2DD4BF]/5 dark:bg-[#2DD4BF]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
          <div className="relative z-10 space-y-8">
            <h3 className="text-2xl font-serif font-black tracking-tight italic">System Pulse</h3>
            <div className="space-y-10">
              {[
                { event: 'Seller Approval', meta: 'Nourplant Agadir', time: 'Just now', icon: CheckCircle2, color: 'text-[#2DD4BF]' },
                { event: 'Inventory Alert', meta: 'Monstera XL low stock', time: '12m ago', icon: AlertCircle, color: 'text-red-500' },
                { event: 'New Logistic Entry', meta: 'Dakhla Express route', time: '4H ago', icon: Truck, color: 'text-blue-500' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start relative overflow-hidden">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${isDarkMode ? 'bg-white/10 border-white/20' : 'bg-slate-50 border-slate-100'}`}>
                     <item.icon size={22} className={item.color} />
                  </div>
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between items-center gap-4">
                      <p className="text-sm font-black tracking-wide">{item.event}</p>
                      <span className={`text-[9px] font-black uppercase tracking-widest opacity-50`}>{item.time}</span>
                    </div>
                    <p className={`text-[11px] font-bold leading-relaxed opacity-70`}>{item.meta}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={`pt-6 border-t ${isDarkMode ? 'border-white/20' : 'border-slate-100'}`}>
              <button className="w-full py-5 bg-[#F43F5E] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-pink-500/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95 group">
                VIEW FULL LOGS
                <ArrowRightCircle className="group-hover:translate-x-1 transition-transform" size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ArrowRightCircle = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16l4-4-4-4" />
    <path d="M8 12h8" />
  </svg>
);

export default Dashboard;
