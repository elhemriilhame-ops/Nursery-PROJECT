import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  MoreHorizontal,
  ChevronRight,
  Leaf,
  Flower2,
  Sprout,
  Store,
  Clock,
  ArrowRightCircle,
  PlusSquare,
  Truck,
  MapPin,
  CheckCircle2,
  UserCheck,
  X,
  AlertCircle
} from 'lucide-react';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSellerApproved, setIsSellerApproved] = useState(false);
  const [productType, setProductType] = useState('flowers'); // default
  
  const handleClose = () => {
    setIsModalOpen(false);
  };
  const stats = [
    { label: 'Revenue', value: '45,290 DH', change: '+12.5%', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Active Orders', value: '1,248', change: '+5.2%', icon: ShoppingBag, color: 'text-sage', bg: 'bg-sage/10' },
    { label: 'New Customers', value: '3,845', change: '+3.1%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Sellers', value: '42', change: '+0.8%', icon: Store, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const recentOrders = [
    { id: '#GARD-9021', customer: 'Sophie Lefebvre', product: 'Tree Peony', status: 'Shipped', amount: '65.00 DH', seller: 'Provence Garden' },
    { id: '#GARD-9022', customer: 'Benoît Morin', product: 'Cactus Cierge XL', status: 'Pending', amount: '120.00 DH', seller: 'Desert Bloom' },
    { id: '#GARD-9023', customer: 'Clémence Durand', product: 'Hydrangea Set of 3', status: 'Processing', amount: '48.50 DH', seller: 'Flower Country' },
    { id: '#GARD-9024', customer: 'Marc Petit', product: 'Bonsai Ficus Retusa', status: 'Delivered', amount: '89.00 DH', seller: 'Nature Atelier' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
      className="space-y-10 pb-20 relative"
    >
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
               <div className="sticky top-0 bg-white/90 backdrop-blur pb-4 pt-8 px-8 border-b border-slate-100 flex items-center justify-between z-10">
                 <div>
                   <h2 className="text-2xl font-serif font-black text-slate-800">Add New Product</h2>
                   <p className="text-slate-500 text-xs mt-1">Fill out the details below. Fields dynamically adjust based on category.</p>
                 </div>
                 <button onClick={handleClose} className="p-3 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors">
                   <X size={20} />
                 </button>
               </div>

               <div className="p-8 space-y-6">
                 {/* Main Details */}
                 <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-sage border-b border-slate-100 pb-2">Core Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600">Product Name *</label>
                        <input type="text" placeholder="e.g. Signature Monstera" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-sage/20 outline-none text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600">Price (DH) *</label>
                        <input type="number" placeholder="120" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-sage/20 outline-none text-sm" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600">Product Type *</label>
                        <select 
                          value={productType}
                          onChange={(e) => setProductType(e.target.value)}
                          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-sage/20 outline-none text-sm"
                        >
                           <option value="flowers">Flowers & Bouquets</option>
                           <option value="plants">Indoor Plants & Trees</option>
                           <option value="oils">Essential Oils</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600">Image URL</label>
                        <input type="text" placeholder="/assets/image.png" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-sage/20 outline-none text-sm" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600">Description</label>
                      <textarea rows="3" placeholder="A delicate arrangement of premium..." className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-sage/20 outline-none text-sm resize-none" />
                    </div>
                 </div>

                 {/* Conditional Fields: Flowers */}
                 {productType === 'flowers' && (
                   <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-sage border-b border-slate-100 pb-2">Flower Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-600">Occasion</label>
                          <input type="text" placeholder="e.g. Weddings, Birthday" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-600">Primary Color</label>
                          <input type="text" placeholder="e.g. White, Pink" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm" />
                        </div>
                      </div>
                   </motion.div>
                 )}

                 {/* Conditional Fields: Plants */}
                 {productType === 'plants' && (
                   <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-sage border-b border-slate-100 pb-2">Care Instructions</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-600">Light</label>
                          <input type="text" placeholder="Bright indirect light" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-600">Temperature</label>
                          <input type="text" placeholder="18°C - 24°C" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-600">Humidity</label>
                          <input type="text" placeholder="High (60%+)" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-600">Watering</label>
                          <input type="text" placeholder="Once every 10 days" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-600">Soil</label>
                          <input type="text" placeholder="Peat-based potting mix" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-600">Sensitivity</label>
                          <input type="text" placeholder="Toxic to pets" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm" />
                        </div>
                      </div>
                   </motion.div>
                 )}

                 <div className="pt-6 border-t border-slate-100 flex gap-4 justify-end">
                    <button onClick={handleClose} className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
                    <button onClick={handleClose} className="px-8 py-4 bg-sage text-white rounded-2xl text-xs font-bold uppercase tracking-widest shadow-xl shadow-sage/20 hover:bg-sage/90">Publish Product</button>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Seller Approval Alert */}
      {!isSellerApproved && (
        <motion.div variants={itemVariants} className="bg-amber-50 border border-amber-200 p-6 lg:p-8 rounded-[2rem] flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2" />
           <div className="flex items-start sm:items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
                 <AlertCircle size={24} className="text-amber-600" />
              </div>
              <div>
                 <h4 className="text-xl font-serif font-black text-amber-900 tracking-tight">Pending Approval: Nourplant</h4>
                 <p className="text-sm font-medium text-amber-800">New seller profile created. They are requesting access to manage 'Plants' catalog on the marketplace.</p>
                 <p className="text-[10px] font-black uppercase tracking-widest text-amber-600/70 mt-1">ID: SL-4922 • Location: Agadir</p>
              </div>
           </div>
           <div className="flex items-center gap-3 relative z-10 w-full sm:w-auto">
             <button className="flex-1 sm:flex-none px-6 py-3 rounded-2xl bg-white border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-widest hover:bg-amber-100 transition-colors">Reject</button>
             <button onClick={() => setIsSellerApproved(true)} className="flex-1 sm:flex-none px-6 py-3 rounded-2xl bg-amber-600 shadow-lg shadow-amber-600/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-amber-700 transition-colors">Approve Profile</button>
           </div>
        </motion.div>
      )}

      {/* Dynamic Welcome & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-sage/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-sage/10 transition-colors duration-700" />
         
         <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-sage animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-sage/80 opacity-60">System Online</span>
          </div>
          <h1 className="text-4xl font-serif font-black text-slate-800 tracking-tight">Welcome, Admin.</h1>
          <p className="text-slate-800 text-sm mt-1 max-w-sm">The centralized dashboard to manage your sales and the nursery community.</p>
        </div>

        <div className="flex items-center gap-4 relative z-10">
          <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl text-sm font-bold hover:shadow-lg hover:border-slate-300 transition-all flex items-center gap-2">
            <ArrowRightCircle size={18} />
            Export CSV
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-sage text-white rounded-2xl text-sm font-bold shadow-xl shadow-sage/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <PlusSquare size={18} />
            New Product
          </button>
        </div>
      </div>

      {/* Stats Quick-Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            variants={itemVariants}
            className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] group hover:shadow-xl hover:shadow-sage/10 transition-all duration-500 relative overflow-hidden"
          >
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} w-fit group-hover:scale-110 transition-transform duration-500 mb-6 relative z-10`}>
              <stat.icon size={26} />
            </div>
            <div className="relative z-10 flex flex-col gap-1">
              <span className="text-slate-800 text-xs font-bold uppercase tracking-widest">{stat.label}</span>
              <div className="flex items-end gap-3">
                <h3 className="text-3xl font-black text-slate-800 tracking-tighter">{stat.value}</h3>
                <span className="flex items-center gap-1 text-emerald-500 text-[10px] font-black mb-1.5 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {stat.change}
                  <ArrowUpRight size={10} />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Performance Section */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-2 p-6 lg:p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] relative"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
            <div>
              <h3 className="text-2xl font-serif font-black text-slate-800">Quarterly Performance</h3>
              <p className="text-xs text-slate-800 mt-1">Analysis of revenue generated from validated orders.</p>
            </div>
            <div className="flex bg-slate-50 p-1.5 rounded-2xl gap-2">
              <button className="px-5 py-2 hover:bg-white hover:shadow-md rounded-xl text-xs font-bold text-slate-800 hover:text-sage transition-all">Sellers</button>
              <button className="px-5 py-2 bg-white shadow-md rounded-xl text-xs font-bold text-sage">Revenue</button>
            </div>
          </div>
          
          <div className="h-72 flex items-end justify-between px-4 gap-6">
             {[30, 50, 45, 80, 75, 45, 95, 85, 40, 65, 80, 35].map((h, i) => (
               <div key={i} className="flex-grow flex flex-col items-center group relative h-full justify-end">
                 <div className="absolute -top-10 bg-slate-800 text-white text-[10px] px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none mb-2 font-bold shadow-xl translate-y-3 group-hover:translate-y-0">
                    {h * 153} DH
                 </div>
                 <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05, duration: 1.2, ease: 'circOut' }}
                  className={`w-full rounded-t-2xl transition-all duration-300 relative ${i === 6 ? 'bg-sage shadow-2xl shadow-sage/40 hover:brightness-110' : 'bg-slate-100 group-hover:bg-sage/10'}`}
                 >
                    {i === 6 && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-sage rounded-full shadow-lg" />}
                 </motion.div>
               </div>
             ))}
          </div>
          <div className="flex justify-between mt-8 text-[11px] font-black text-slate-700 uppercase tracking-widest px-4 border-t border-slate-50 pt-6">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </motion.div>

        {/* Categories Distribution */}
        <motion.div 
          variants={itemVariants}
          className="p-6 lg:p-10 bg-slate-900 rounded-[2.5rem] text-white shadow-3xl shadow-black/20 relative overflow-hidden group border border-slate-100/10"
        >
           <div className="absolute top-0 right-0 w-64 h-64 bg-sage/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[80px] pointer-events-none" />
           
           <div className="flex items-center justify-between mb-8 z-10 relative">
             <h3 className="text-2xl font-serif font-black">Global Stock</h3>
             <div className="p-2 bg-white/5 rounded-xl text-white/40">
                <Clock size={16} />
             </div>
           </div>

           <div className="mt-8 space-y-8 relative z-10">
              <div className="space-y-4">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                  <span className="flex items-center gap-3 text-white/50">
                    <Flower2 size={16} className="text-sage" /> Seasonal Flowers
                  </span>
                  <span className="text-sage">842 Units</span>
                </div>
                <div className="h-4 bg-white/5 rounded-2xl overflow-hidden p-1">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '84%' }}
                    transition={{ duration: 1.8, ease: 'circOut' }}
                    className="h-full bg-sage rounded-xl shadow-[0_0_15px_rgba(138,154,91,0.5)]" 
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                  <span className="flex items-center gap-3 text-white/40">
                    <Leaf size={16} className="text-emerald-400" /> Indoor Plants
                  </span>
                  <span className="text-emerald-400">1,200 Units</span>
                </div>
                <div className="h-4 bg-white/5 rounded-2xl overflow-hidden p-1">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '92%' }}
                    transition={{ duration: 1.8, ease: 'circOut' }}
                    className="h-full bg-emerald-400 rounded-xl" 
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                  <span className="flex items-center gap-3 text-white/30">
                    <Sprout size={16} className="text-amber-400" /> Other Products
                  </span>
                  <span className="text-amber-400">22% Low Stock</span>
                </div>
                <div className="h-4 bg-white/5 rounded-2xl overflow-hidden p-1">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '22%' }}
                    transition={{ duration: 1.8, ease: 'circOut' }}
                    className="h-full bg-amber-400 rounded-xl shadow-[0_0_15px_rgba(251,191,36,0.3)]" 
                  />
                </div>
              </div>
           </div>

           <button className="mt-12 w-full py-5 bg-white text-slate-900 rounded-[1.5rem] text-sm font-black transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-sage/20 hover:-translate-y-1 active:scale-95 group">
              Inventory Audit
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
           </button>
        </motion.div>
      </div>

      {/* Recentes Activity Table */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] overflow-hidden"
      >
        <div className="p-6 lg:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-50">
          <div>
            <h3 className="text-2xl font-serif font-black text-slate-800">Latest Orders</h3>
            <p className="text-xs text-slate-800 mt-1">Real-time monitoring of sales flow.</p>
          </div>
          <button className="px-6 py-2.5 bg-slate-50 text-slate-800 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-sage/10 hover:text-sage transition-all">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50 text-slate-800 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-10 py-6">ORDER ID</th>
                <th className="px-10 py-6">CUSTOMER</th>
                <th className="px-10 py-6"> PRODUCT</th>
                <th className="px-10 py-6">STATUS</th>
                <th className="px-10 py-6"> AMOUNT</th>
                <th className="px-10 py-6"> ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentOrders.map((order, i) => (
                <tr key={i} className="hover:bg-slate-50/70 transition-colors group cursor-pointer">
                  <td className="px-10 py-6 text-sm font-black text-slate-800 tracking-tighter">{order.id}</td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-sage/5 text-sage text-xs font-black flex items-center justify-center border-2 border-sage/10 uppercase group-hover:bg-sage group-hover:text-white group-hover:border-sage transition-all">
                        {order.customer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm text-slate-800 font-bold">{order.customer}</span>
                        <span className="text-[10px] text-slate-700 font-bold uppercase tracking-wider">{order.seller}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-sm text-slate-800 font-medium italic">{order.product}</td>
                  <td className="px-10 py-6">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] border ${
                      order.status === 'Shipped' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      order.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      order.status === 'Processing' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                      'bg-slate-50 text-slate-600 border-slate-100'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-sm font-black text-slate-800">{order.amount}</td>
                  <td className="px-10 py-6">
                    <button className="p-3 hover:bg-white bg-slate-50 border border-transparent hover:border-slate-100 rounded-xl transition-all text-slate-800 hover:text-sage shadow-sm">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
