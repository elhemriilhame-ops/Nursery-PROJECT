import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { 
  Package, 
  ShoppingBag, 
  Star, 
  MapPin, 
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const CustomerDashboard = () => {
  const { isDarkMode } = useOutletContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser || storedUser === 'undefined') return;
        const { token } = JSON.parse(storedUser);
        const response = await axios.get('http://localhost:5000/api/orders/myorders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const totalSpent = orders.reduce((acc, curr) => acc + curr.amount, 0);
  const activeOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;

  const stats = [
    { label: 'Active Orders', value: activeOrders.toString(), icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Total Spent', value: `${totalSpent} DH`, icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Reviews Made', value: '0', icon: Star, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Loyalty Points', value: Math.floor(totalSpent / 10).toString(), icon: CheckCircle2, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-10 h-10 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-12">
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "p-8 rounded-[2.5rem] border shadow-sm transition-all duration-500",
              isDarkMode ? "bg-[#0D0D0D] border-white/5" : "bg-white border-slate-100"
            )}
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", stat.bg, stat.color)}>
              <stat.icon size={22} strokeWidth={2} />
            </div>
            <p className="text-[13px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">{stat.label}</p>
            <h3 className={cn("text-2xl font-black tracking-tight", isDarkMode ? "text-white" : "text-slate-900")}>
              {stat.value}
            </h3>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Active Tracking */}
        <div className={cn(
          "p-10 rounded-[3rem] border transition-all",
          isDarkMode ? "bg-[#0D0D0D] border-white/5" : "bg-white border-slate-100 shadow-xl shadow-slate-200/20"
        )}>
          <div className="flex items-center justify-between mb-8">
            <h3 className={cn("text-2xl font-serif font-black italic", isDarkMode ? "text-white" : "text-slate-900")}>On Its Way</h3>
            <Package size={20} className="text-emerald-500" />
          </div>

          <div className="space-y-6">
            {orders.find(o => o.status !== 'Delivered' && o.status !== 'Cancelled') ? (
              <div className={cn(
                "p-6 rounded-3xl border border-dashed flex items-center justify-between",
                isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
              )}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center animate-pulse">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-[15px] font-black tracking-tight">Active Order {orders.find(o => o.status !== 'Delivered' && o.status !== 'Cancelled')?.id}</p>
                    <p className="text-[13px] font-bold opacity-50 uppercase tracking-widest mt-1">Status: {orders.find(o => o.status !== 'Delivered' && o.status !== 'Cancelled')?.status}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="opacity-30" />
              </div>
            ) : (
              <p className="text-sm font-bold opacity-30 text-center py-4 italic">No active shipments.</p>
            )}
          </div>
        </div>

        {/* Saved Addresses / Mini Profile */}
        <div className={cn(
          "p-10 rounded-[3rem] border transition-all",
          isDarkMode ? "bg-[#0D0D0D] border-white/5" : "bg-white border-slate-100"
        )}>
          <div className="flex items-center justify-between mb-8">
            <h3 className={cn("text-2xl font-serif font-black italic", isDarkMode ? "text-white" : "text-slate-900")}>Primary Atelier</h3>
            <MapPin size={20} className="text-blue-500" />
          </div>

          <div className={cn(
            "p-6 rounded-3xl",
            isDarkMode ? "bg-white/[0.02]" : "bg-slate-50"
          )}>
            <p className="text-sm font-bold opacity-70 leading-relaxed">
              Residence Les Jardins, Block B<br />
              Apartment 42, Hivernage<br />
              Marrakech, 40000
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CustomerDashboard;
