import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Truck,
  LogOut
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const Dashboard = () => {
  const { isDarkMode } = useOutletContext();
  const [timeRange, setTimeRange] = useState('7D');

  const chartData = [
    { name: 'Mon', sales: 4000, revenue: 2400 },
    { name: 'Tue', sales: 3000, revenue: 1398 },
    { name: 'Wed', sales: 2000, revenue: 9800 },
    { name: 'Thu', sales: 2780, revenue: 3908 },
    { name: 'Fri', sales: 1890, revenue: 4800 },
    { name: 'Sat', sales: 2390, revenue: 3800 },
    { name: 'Sun', sales: 3490, revenue: 4300 },
  ];

  const stats = [
    { label: 'Total Revenue', value: 'DH 124,500', change: '+12.5%', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Active Sellers', value: '842', change: '+3.2%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Orders Today', value: '156', change: '+18.4%', icon: ShoppingBag, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'New Growth', value: '24.8%', change: '+4.1%', icon: TrendingUp, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  ];

  const recentActivities = [
    { id: 1, user: 'Ahmed Alami', action: 'New Shop Opening', time: '2 mins ago', type: 'seller' },
    { id: 2, user: 'Sarah Benson', action: 'Bulk Order #8921', time: '15 mins ago', type: 'order' },
    { id: 3, user: 'Logistic Unit 04', action: 'Delivery Completed', time: '45 mins ago', type: 'delivery' },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className={`text-4xl font-serif font-black tracking-tight italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Control Center</h1>
          <p className={`text-[13px] font-black mt-2 uppercase tracking-[0.3em] ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>System Overview & Predictive Analytics</p>
        </div>
        <div className={`flex items-center gap-2 p-1.5 rounded-2xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
          {['24H', '7D', '30D', 'ALL'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black transition-all ${timeRange === range 
                ? (isDarkMode ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white text-slate-900 shadow-sm')
                : (isDarkMode ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900')}`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-8 rounded-[2.5rem] border shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden
              ${isDarkMode ? 'bg-[#0D0D0D] border-white/5' : 'bg-white border-slate-100'}`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 -mr-12 -mt-12 rounded-full blur-[60px] opacity-20 transition-all ${stat.bg}`} />
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${stat.bg} ${stat.color}`}>
              <stat.icon size={26} strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white/30' : 'text-slate-400'}`}>{stat.label}</p>
              <div className="flex items-center justify-between">
                <h3 className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{stat.value}</h3>
                <span className="text-[10px] font-black text-emerald-500">{stat.change}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className={`lg:col-span-2 p-10 rounded-[3rem] border shadow-sm relative overflow-hidden ${isDarkMode ? 'bg-[#0D0D0D] border-white/5' : 'bg-white border-slate-100'}`}
        >
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className={`text-2xl font-serif font-black italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Revenue Performance</h3>
              <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${isDarkMode ? 'text-white/20' : 'text-slate-400'}`}>Cumulative financial growth vectors</p>
            </div>
            <button className={`p-4 rounded-2xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white/40 hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-900'}`}>
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="h-[400px] w-full mt-8 font-bold">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isDarkMode ? "#10b981" : "#4f46e5"} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={isDarkMode ? "#10b981" : "#4f46e5"} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#ffffff05" : "#00000005"} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: isDarkMode ? '#475569' : '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: isDarkMode ? '#475569' : '#64748b' }} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: isDarkMode ? '#0D0D0D' : '#fff', border: 'none', borderRadius: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', fontSize: '12px', fontWeight: '900' }}
                  itemStyle={{ color: isDarkMode ? '#fff' : '#000' }}
                />
                <Area type="monotone" dataKey="sales" stroke={isDarkMode ? "#10b981" : "#4f46e5"} strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Activity Stream */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className={`p-10 rounded-[3rem] border shadow-sm flex flex-col ${isDarkMode ? 'bg-[#0D0D0D] border-white/5' : 'bg-white border-slate-100'}`}
        >
          <div className="flex items-center justify-between mb-10">
            <h3 className={`text-2xl font-serif font-black italic ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Active Stream</h3>
            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'bg-emerald-500/10 text-emerald-500' : 'bg-emerald-50 text-emerald-700'}`}>Live</span>
          </div>
          <div className="space-y-8 flex-grow">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex gap-5 items-start">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                  {activity.type === 'seller' ? <Users size={18} className="text-blue-500" /> : 
                   activity.type === 'order' ? <Package size={18} className="text-amber-500" /> :
                   <Truck size={18} className="text-emerald-500" />}
                </div>
                <div className="min-w-0">
                  <p className={`text-[12px] font-black tracking-tight leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activity.user}</p>
                  <p className={`text-[11px] font-bold mt-1.5 opacity-40 uppercase tracking-widest truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activity.action}</p>
                  <p className={`text-[9px] font-black mt-2 uppercase tracking-widest text-emerald-500`}>{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <button className={`w-full py-5 rounded-[1.8rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 group
              ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10'}`}>
              Access Full Registry
              <ArrowRightCircle className="group-hover:translate-x-1 transition-transform" size={16} />
            </button>
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
