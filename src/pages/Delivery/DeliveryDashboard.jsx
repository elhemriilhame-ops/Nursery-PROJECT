import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Navigation, 
  Clock, 
  Package, 
  CheckCircle2, 
  User,
  Radio,
  Eye
} from 'lucide-react';

const DeliveryDashboard = () => {
  const [acceptedOrders, setAcceptedOrders] = useState([]);

  // Mock Available Orders near the driver's location
  const availableOrders = [
    { id: '#ORD-8821', customer: 'Ayoub El Amri', phone: '0600-112233', from: 'OASIS Nursery', location: '12 Avenue Hassan II, Agadir', distance: '2.4 km', time: '10 min', items: 2, pay: '25 DH' },
    { id: '#ORD-8822', customer: 'Maha Khatib', phone: '0611-334455', from: 'Nourplant Seller', location: 'Hay Charaf Sector 8, Agadir', distance: '4.1 km', time: '16 min', items: 5, pay: '40 DH' },
    { id: '#ORD-8823', customer: 'Yassine T.', phone: '0622-667788', from: 'Premium Flowers', location: 'Marina Agadir Bloc C', distance: '1.2 km', time: '5 min', items: 1, pay: '20 DH' },
  ];

  const handleAccept = (order) => {
    setAcceptedOrders([...acceptedOrders, order.id]);
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5 } } };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-8 pb-20 relative">

      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-blue-600 text-white p-6 lg:p-10 rounded-[2.5rem] shadow-xl shadow-blue-500/20 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
         
         <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full mb-2">
               <Radio size={14} className="animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">GPS Sync Active</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-black tracking-tight">Zone: Agadir</h1>
            <p className="text-blue-100 text-sm max-w-md font-medium">Looking for nearby botanical orders. Accept orders below to begin navigation.</p>
         </div>

         <div className="relative z-10 bg-white/10 backdrop-blur border border-white/20 p-5 rounded-3xl flex items-center gap-6 w-full md:w-auto">
            <div className="space-y-1 text-center border-r border-white/20 pr-6">
               <p className="text-[10px] uppercase font-bold tracking-widest text-blue-200">Earned Today</p>
               <p className="font-black text-2xl tracking-tighter">180 DH</p>
            </div>
            <div className="space-y-1 text-center">
               <p className="text-[10px] uppercase font-bold tracking-widest text-blue-200">Completed</p>
               <p className="font-black text-2xl tracking-tighter">6 / 10</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Available Orders List */}
        <motion.div variants={itemVariants} className="lg:col-span-8 space-y-6">
           <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-serif font-black text-slate-800 flex items-center gap-3">
                 <Radio className="text-blue-600" /> Live Radar
              </h2>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{availableOrders.length - acceptedOrders.length} Opportunities</span>
           </div>

           <div className="space-y-4">
              <AnimatePresence>
                 {availableOrders.filter(o => !acceptedOrders.includes(o.id)).map(order => (
                    <motion.div 
                      key={order.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                      className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 group"
                    >
                       <div className="space-y-4 flex-grow">
                          <div className="flex items-start justify-between">
                             <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                                   <Package size={22} />
                                </div>
                                <div>
                                   <h3 className="font-bold text-lg text-slate-800">{order.customer}</h3>
                                   <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase">{order.id} • {order.items} Items</p>
                                </div>
                             </div>
                             <div className="text-right">
                                <p className="font-black text-xl text-emerald-600">{order.pay}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Payout</p>
                             </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
                             <div className="flex items-start gap-3">
                                <MapPin size={16} className="text-slate-400 mt-1" />
                                <div>
                                   <p className="text-xs font-bold text-slate-800 uppercase tracking-widest">To: {order.location}</p>
                                   <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">From: {order.from}</p>
                                </div>
                             </div>
                             <div className="flex items-center gap-3">
                                <Clock size={16} className="text-slate-400" />
                                <span className="text-xs font-bold text-slate-800 uppercase tracking-widest">{order.distance} • ~{order.time}</span>
                             </div>
                             <div className="flex items-center gap-3 md:col-span-2 mt-1">
                                <Phone size={16} className="text-slate-400" />
                                <span className="text-xs font-bold text-slate-800 tracking-widest bg-slate-100 px-3 py-1 rounded-full">{order.phone}</span>
                             </div>
                          </div>
                       </div>
                       
                       <button 
                         onClick={() => handleAccept(order)}
                         className="w-full sm:w-auto px-8 py-5 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 active:scale-95 transition-all text-center shrink-0"
                       >
                         Accept Order
                       </button>
                    </motion.div>
                 ))}
              </AnimatePresence>

              {(availableOrders.length - acceptedOrders.length) === 0 && (
                <div className="p-12 text-center bg-white border border-slate-200 border-dashed rounded-[2rem] text-slate-400 font-bold uppercase tracking-widest">
                   No more orders in your zone nearby.
                </div>
              )}
           </div>
        </motion.div>

        {/* Live Map / Future Feature Widget */}
        <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
           <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-1000">
                 {/* Fake Map Grid Background */}
                 <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                       <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,5"/>
                       </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                 </svg>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                 <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center border border-blue-500/30">
                    <Eye size={28} />
                 </div>
                 <div className="space-y-2">
                    <h3 className="font-serif font-black text-2xl tracking-tight">Live Tracking</h3>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed">
                       When you accept an order, the customer will be able to watch your live location via GPS directly on their checkout page. 
                       <br/><br/>
                       <span className="text-blue-400 font-bold uppercase tracking-widest text-[9px]">Ensuring ultimate transparency.</span>
                    </p>
                 </div>
              </div>
           </div>

           {/* Active accepted orders mini view */}
           <div className="bg-white border text-center border-slate-200 rounded-[2rem] p-6 shadow-sm">
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 mb-4">My Dashboard Log</h4>
               <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 size={24} />
               </div>
               <p className="font-black text-3xl text-slate-800">{acceptedOrders.length}</p>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Orders Accepted Today</p>
           </div>
        </motion.div>

      </div>

    </motion.div>
  );
};

export default DeliveryDashboard;
