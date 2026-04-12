import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ChevronRight,
  AlertCircle,
  Search,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const STEPS = [
  { id: 'Pending', label: 'Order Placed', icon: Clock },
  { id: 'Processing', label: 'Processing', icon: Package },
  { id: 'Shipped', label: 'Shipped', icon: Truck },
  { id: 'Out for Delivery', label: 'Out for Delivery', icon: Truck },
  { id: 'Delivered', label: 'Delivered', icon: CheckCircle2 }
];

const CustomerTracking = () => {
  const { isDarkMode } = useOutletContext();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
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
        if (response.data.length > 0) {
          setSelectedOrder(response.data[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusIndex = (status) => {
    return STEPS.findIndex(step => step.id === status);
  };

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-10 h-10 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
    </div>
  );

  if (orders.length === 0) return (
    <div className={cn(
      "p-20 rounded-[3rem] border-2 border-dashed text-center",
      isDarkMode ? "border-white/10 bg-white/[0.02]" : "border-slate-100 bg-slate-50"
    )}>
      <Package size={48} className="mx-auto mb-6 opacity-20" />
      <h2 className="text-2xl font-serif italic opacity-40">No orders to track yet.</h2>
    </div>
  );

  return (
    <div className="space-y-12 pb-20">
      
      {/* Order Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <p className="text-[13px] font-black uppercase tracking-[0.2em] text-emerald-500">Live Logistics</p>
          <h2 className={cn("text-3xl font-black tracking-tighter", isDarkMode ? "text-white" : "text-slate-900")}>
            Track Shipment
          </h2>
        </div>

        <div className="relative group min-w-[300px]">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" />
          <select 
            value={selectedOrder?._id}
            onChange={(e) => setSelectedOrder(orders.find(o => o._id === e.target.value))}
            className={cn(
              "w-full pl-12 pr-10 py-4 rounded-2xl border-none text-[11px] font-bold outline-none appearance-none cursor-pointer transition-all",
              isDarkMode ? "bg-[#0D0D0D] text-white border-white/5" : "bg-white text-slate-900 border-slate-100 shadow-sm"
            )}
          >
            {orders.map(order => (
              <option key={order._id} value={order._id}>
                {order.id} — {order.amount} DH
              </option>
            ))}
          </select>
          <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 opacity-30" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedOrder && (
          <motion.div
            key={selectedOrder._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-8"
          >
            {/* Timeline Column */}
            <div className={cn(
              "xl:col-span-2 p-10 rounded-[3.5rem] border shadow-2xl relative overflow-hidden",
              isDarkMode ? "bg-[#0D0D0D] border-white/5 shadow-black" : "bg-white border-slate-100 shadow-slate-200/50"
            )}>
              <div className="flex items-center justify-between mb-16">
                <div>
                  <h3 className={cn("text-2xl font-serif font-black italic", isDarkMode ? "text-white" : "text-slate-900")}>Evolution</h3>
                  <p className="text-[13px] font-bold opacity-40 uppercase tracking-widest mt-1">Real-time status updates</p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-black uppercase tracking-[0.2em] opacity-40">Estimated Arrival</p>
                  <p className="text-emerald-500 font-bold">April 15, 2026</p>
                </div>
              </div>

              {/* Steps Layout */}
              <div className="relative px-4">
                {/* Background Line */}
                <div className={cn(
                  "absolute h-full w-[2px] left-[31px] md:left-1/2 top-0 md:-translate-x-1/2",
                  isDarkMode ? "bg-white/5" : "bg-slate-100"
                )} />

                <div className="space-y-12">
                  {STEPS.map((step, index) => {
                    const isCompleted = getStatusIndex(selectedOrder.status) >= index;
                    const isCurrent = step.id === selectedOrder.status;

                    return (
                      <div key={step.id} className="relative flex items-center md:justify-center">
                        {/* Circle Element */}
                        <div className={cn(
                          "w-10 h-10 rounded-2xl flex items-center justify-center z-10 border-4 transition-all duration-700",
                          isCompleted 
                            ? (isDarkMode ? "bg-emerald-500 border-[#0D0D0D] text-white shadow-[0_0_20px_#10b98144]" : "bg-slate-900 border-white text-white shadow-xl")
                            : (isDarkMode ? "bg-[#141414] border-[#0D0D0D] text-white/20" : "bg-slate-100 border-white text-slate-300")
                        )}>
                          <step.icon size={18} />
                        </div>

                        {/* Text (Desktop Left/Right Alternating) */}
                        <div className={cn(
                          "absolute w-[calc(50%-40px)] hidden md:block",
                          index % 2 === 0 ? "right-[calc(50%+30px)] text-right" : "left-[calc(50%+30px)] text-left"
                        )}>
                          <p className={cn(
                            "text-sm font-black uppercase tracking-widest",
                            isCompleted ? (isDarkMode ? "text-white" : "text-slate-900") : "opacity-30"
                          )}>
                            {step.label}
                          </p>
                          {isCurrent && (
                            <p className="text-[12px] font-medium text-emerald-500 italic mt-1 font-serif">In progress...</p>
                          )}
                        </div>

                        {/* Text (Mobile) */}
                        <div className="ml-8 md:hidden">
                          <p className={cn(
                            "text-sm font-black uppercase tracking-widest",
                            isCompleted ? (isDarkMode ? "text-white" : "text-slate-900") : "opacity-30"
                          )}>
                            {step.label}
                          </p>
                          {isCurrent && (
                            <p className="text-[12px] font-medium text-emerald-500 italic mt-1 font-serif">In progress...</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="space-y-8">
              {/* Shipment Info */}
              <div className={cn(
                "p-8 rounded-[3rem] border shadow-sm",
                isDarkMode ? "bg-[#0D0D0D] border-white/5" : "bg-white border-slate-100 shadow-slate-200/20"
              )}>
                <h4 className="text-[13px] font-black uppercase tracking-[0.2em] opacity-40 mb-6">Dispatch Details</h4>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin size={18} className="text-emerald-500 shrink-0 mt-1" />
                    <div>
                      <p className="text-[13px] font-black opacity-30 uppercase tracking-widest mb-1">Shipping Address</p>
                      <p className={cn("text-sm font-bold", isDarkMode ? "text-white/80" : "text-slate-700")}>
                        {selectedOrder.shippingAddress?.street}, {selectedOrder.shippingAddress?.city}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Truck size={18} className="text-blue-500 shrink-0 mt-1" />
                    <div>
                      <p className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1">Carrier Provider</p>
                      <p className={cn("text-sm font-bold", isDarkMode ? "text-white/80" : "text-slate-700")}>Sunflowers Express Premium</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Quick Stats */}
              <div className={cn(
                "p-8 rounded-[3.5rem] bg-emerald-500 shadow-2xl shadow-emerald-500/20 text-white"
              )}>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Package size={22} />
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-black uppercase tracking-[0.2em] opacity-80">Reference</p>
                    <p className="font-bold">{selectedOrder.id}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[13px] font-black uppercase tracking-[0.2em] opacity-60">Total Statement</p>
                  <p className="text-3xl font-serif font-black italic">{selectedOrder.amount} DH</p>
                </div>
                <button className="w-full py-4 bg-black/10 hover:bg-black/20 rounded-2xl mt-8 text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                  Contact Concierge
                </button>
              </div>

              {/* Report Section */}
              <button 
                className={cn(
                  "w-full p-6 rounded-[2rem] border border-dashed flex items-center justify-center gap-3 transition-all",
                  isDarkMode ? "border-white/10 text-white/40 hover:border-rose-500/40 hover:text-rose-500" : "border-slate-200 text-slate-400 hover:border-rose-300 hover:text-rose-500"
                )}
              >
                <AlertCircle size={18} />
                <span className="text-[13px] font-black uppercase tracking-widest">Report Shipment Issue</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerTracking;
