import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  DollarSign, 
  ArrowUpRight, 
  MoreHorizontal,
  PlusSquare,
  Package,
  TrendingDown,
  X,
  Store,
  Clock
} from 'lucide-react';

const SellerDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productType, setProductType] = useState('flowers');

  const stats = [
    { label: 'My Revenue', value: '12,450 DH', change: '+8.5%', icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Active Orders', value: '45', change: '+12%', icon: ShoppingBag, color: 'text-sage', bg: 'bg-sage/10' },
    { label: 'Platform Fee (8%)', value: '-996 DH', change: '-2.1%', icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Total Products', value: '18', change: 'Steady', icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
  ];

  const myProducts = [
    { id: '#PROD-101', name: 'Desert Rose Cactus', category: 'Plants', price: '120 DH', stock: '24', status: 'Active' },
    { id: '#PROD-102', name: 'Lavender Bundle', category: 'Flowers', price: '45 DH', stock: '8', status: 'Low Stock' },
    { id: '#PROD-103', name: 'Pure Argan Oil', category: 'Oils', price: '180 DH', stock: '0', status: 'Out of Stock' },
    { id: '#PROD-104', name: 'Orchid Dream', category: 'Flowers', price: '250 DH', stock: '12', status: 'Active' },
  ];

  const recentOrders = [
    { id: '#ORD-8821', customer: 'Ayoub El Amri', items: 'Desert Rose Cactus × 1', amount: '120 DH', status: 'Processing' },
    { id: '#ORD-8822', customer: 'Maha Khatib', items: 'Lavender Bundle × 3', amount: '135 DH', status: 'Shipped' },
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6 } } };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-10 pb-20 relative">
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
               <div className="sticky top-0 bg-white/90 backdrop-blur pb-4 pt-8 px-8 border-b border-slate-100 flex items-center justify-between z-10">
                 <div>
                   <h2 className="text-2xl font-serif font-black text-slate-800">Add New Product</h2>
                   <p className="text-slate-500 text-xs mt-1">This product will be linked to your seller account.</p>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors"><X size={20} /></button>
               </div>

               <div className="p-8 space-y-6">
                 <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-amber-600 border-b border-slate-100 pb-2">Core Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600">Product Name *</label>
                        <input type="text" placeholder="e.g. Signature Monstera" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-amber-600/20 outline-none text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600">Price (DH) *</label>
                        <input type="number" placeholder="120" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-amber-600/20 outline-none text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600">Product Type *</label>
                        <select 
                          value={productType}
                          onChange={(e) => setProductType(e.target.value)}
                          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-amber-600/20 outline-none text-sm"
                        >
                           <option value="flowers">Flowers & Bouquets</option>
                           <option value="plants">Indoor Plants & Trees</option>
                           <option value="oils">Essential Oils</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600">Image URL</label>
                        <input type="text" placeholder="/assets/image.png" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-amber-600/20 outline-none text-sm" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600">Description</label>
                      <textarea rows="3" placeholder="A delicate arrangement of premium..." className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-amber-600/20 outline-none text-sm resize-none" />
                    </div>
                 </div>

                 {productType === 'flowers' && (
                   <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                 {productType === 'plants' && (
                   <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2"><label className="text-xs font-bold text-slate-600">Light</label><input type="text" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm" /></div>
                        <div className="space-y-2"><label className="text-xs font-bold text-slate-600">Temperature</label><input type="text" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm" /></div>
                      </div>
                   </motion.div>
                 )}

                 <div className="pt-6 border-t border-slate-100 flex gap-4 justify-end">
                    <button onClick={() => setIsModalOpen(false)} className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
                    <button onClick={() => setIsModalOpen(false)} className="px-8 py-4 bg-amber-600 text-white rounded-2xl text-xs font-bold uppercase tracking-widest shadow-xl shadow-amber-600/20 hover:bg-amber-700">Add Product</button>
                 </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-600/10 transition-colors duration-700" />
         <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600/80 opacity-60">Store Active</span>
          </div>
          <h1 className="text-4xl font-serif font-black text-slate-800 tracking-tight">Seller Hub</h1>
          <p className="text-slate-800 text-sm mt-1 max-w-sm">Manage your inventory, track orders, and monitor your earnings.</p>
        </div>
        <div className="flex items-center gap-4 relative z-10">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-amber-600 text-white rounded-2xl text-sm font-bold shadow-xl shadow-amber-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <PlusSquare size={18} />
            New Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div key={i} variants={itemVariants} className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] group hover:shadow-xl hover:shadow-amber-600/10 transition-all duration-500 overflow-hidden text-left">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} w-fit group-hover:scale-110 transition-transform duration-500 mb-6`}>
              <stat.icon size={26} />
            </div>
            <span className="text-slate-800 text-xs font-bold uppercase tracking-widest">{stat.label}</span>
            <div className="flex items-end gap-3 mt-1">
              <h3 className="text-3xl font-black text-slate-800 tracking-tighter">{stat.value}</h3>
              <span className={`text-[10px] font-black mb-1.5 px-2 py-0.5 rounded-full ${stat.change.includes('-') ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 lg:p-8 border-b border-slate-50 flex items-center justify-between">
               <h3 className="text-xl font-serif font-black text-slate-800">My Products</h3>
               <button className="text-[10px] font-black uppercase text-amber-600 hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto flex-grow">
               <table className="w-full text-left whitespace-nowrap min-w-[500px]">
                  <thead>
                     <tr className="bg-slate-50/50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <th className="px-6 py-4">Item</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {myProducts.map((p, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-all">
                           <td className="px-6 py-4">
                              <p className="font-bold text-slate-800 text-sm">{p.name}</p>
                              <p className="text-[10px] text-slate-500 uppercase font-black">{p.id} • {p.category}</p>
                           </td>
                           <td className="px-6 py-4 font-bold text-slate-800 text-sm">{p.price}</td>
                           <td className="px-6 py-4">
                              <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${p.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : p.status === 'Low Stock' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-500'}`}>{p.status}</span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </motion.div>

         <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 lg:p-8 border-b border-slate-50 flex items-center justify-between">
               <h3 className="text-xl font-serif font-black text-slate-800">Recent Order Fulfillment</h3>
               <button className="text-[10px] font-black uppercase text-amber-600 hover:underline">Manage Orders</button>
            </div>
            <div className="overflow-x-auto flex-grow">
               <table className="w-full text-left whitespace-nowrap min-w-[500px]">
                  <thead>
                     <tr className="bg-slate-50/50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <th className="px-6 py-4">Order & Customer</th>
                        <th className="px-6 py-4">My Items</th>
                        <th className="px-6 py-4">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {recentOrders.map((o, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-all">
                           <td className="px-6 py-4">
                              <p className="font-bold text-slate-800 text-sm">{o.customer}</p>
                              <p className="text-[10px] text-slate-500 uppercase font-black">{o.id}</p>
                           </td>
                           <td className="px-6 py-4 text-xs font-medium text-slate-800 italic">{o.items}</td>
                           <td className="px-6 py-4">
                              <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${o.status === 'Shipped' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>{o.status}</span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </motion.div>
      </div>
    </motion.div>
  );
};

export default SellerDashboard;
