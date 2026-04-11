import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { 
  Users, 
  MapPin, 
  Star, 
  ShieldCheck, 
  TrendingUp, 
  Search, 
  Plus,
  MoreHorizontal,
  ExternalLink,
  Store,
  Check,
  X,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function AdminSellers() {
  const { isDarkMode } = useOutletContext();
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved

  const fetchSellers = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return;
      const { token } = JSON.parse(storedUser);
      
      const response = await axios.get('http://127.0.0.1:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Filter only sellers (pépiniériste)
      setSellers(response.data.filter(u => u.role === 'pépiniériste'));
    } catch (err) {
      console.error('Failed to fetch sellers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const handleStatusUpdate = async (userId, newStatus) => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return;
      const { token } = JSON.parse(storedUser);
      
      await axios.put(`http://127.0.0.1:5000/api/admin/users/${userId}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchSellers(); // Refresh list
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const filteredSellers = sellers.filter(s => {
    if (filter === 'all') return true;
    return s.status === filter;
  });

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <h1 className={`text-4xl font-serif font-black italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Artisan Network</h1>
          <p className={`text-[11px] font-black uppercase tracking-widest opacity-40`}>Management of marketplace botanical providers</p>
        </div>

        <div className="flex items-center gap-4">
           {/* Filter Tabs */}
           <div className={`flex p-1 rounded-2xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-100/50 border-slate-100'}`}>
              {['all', 'approved', 'pending', 'rejected'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                    ${filter === f 
                      ? (isDarkMode ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-900 text-white shadow-lg')
                      : (isDarkMode ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-900')}`}
                >
                  {f}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* Sellers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <AnimatePresence mode='popLayout'>
           {loading ? (
             <div className="col-span-full py-20 text-center opacity-40 italic font-serif text-2xl">Detecting artisans...</div>
           ) : filteredSellers.length === 0 ? (
             <div className="col-span-full py-20 text-center opacity-40 italic font-serif text-2xl">No artisans found in this category.</div>
           ) : (
             filteredSellers.map((seller, idx) => (
                <motion.div 
                  key={seller._id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className={`group p-10 rounded-[3.5rem] border shadow-2xl relative overflow-hidden transition-all duration-700
                    ${isDarkMode ? 'bg-[#141414] border-white/5 shadow-black' : 'bg-white border-slate-100 shadow-slate-100/50'}`}
                >
                   {/* Decorative Background Icon */}
                   <Store size={120} className={`absolute -bottom-10 -right-10 opacity-[0.03] rotate-12 transition-transform group-hover:scale-110 duration-700`} />
    
                   <div className="relative z-10 space-y-8">
                      <div className="flex justify-between items-start">
                         <div className="flex items-center gap-6">
                            <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center border transition-all
                              ${isDarkMode ? 'bg-white/5 border-white/10 text-emerald-500 shadow-black shadow-2xl' : 'bg-slate-50 border-slate-100 text-sage shadow-xl shadow-slate-100'}`}>
                               <Store size={32} />
                            </div>
                            <div>
                               <h3 className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{seller.name}</h3>
                               <div className="flex items-center gap-2 mt-1">
                                  <MapPin size={14} className="opacity-40" />
                                  <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{seller.vendorInfo?.location || 'Unspecified Zone'} / {seller._id.slice(-6)}</span>
                               </div>
                            </div>
                         </div>
                      </div>
    
                      <div className={`p-6 rounded-3xl space-y-3 transition-colors ${isDarkMode ? 'bg-white/[0.02]' : 'bg-slate-50/50'}`}>
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="font-black uppercase tracking-widest opacity-30">Contact</span>
                          <span className="font-bold">{seller.vendorInfo?.phone || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="font-black uppercase tracking-widest opacity-30">Identity (CIN)</span>
                          <span className="font-bold">{seller.vendorInfo?.cin || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="font-black uppercase tracking-widest opacity-30">Specialty</span>
                          <span className="font-black text-emerald-500 uppercase tracking-tighter">{seller.vendorInfo?.specialty || 'General'}</span>
                        </div>
                        <div className="pt-2 border-t border-white/5">
                          <p className={`text-[10px] font-black uppercase tracking-widest opacity-30 mb-1`}>Credential</p>
                          <p className={`text-[12px] font-bold truncate ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>{seller.email}</p>
                        </div>
                      </div>
    
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-4">
                         <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border border-dashed transition-all
                           ${seller.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 
                             seller.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                             'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                           {seller.status === 'approved' ? <ShieldCheck size={14} /> : seller.status === 'pending' ? <AlertCircle size={14} /> : <X size={14} />}
                           {seller.status === 'approved' ? 'Verified Artisan' : seller.status === 'pending' ? 'Under Review' : 'Access Revoked'}
                         </span>
                         
                         {seller.status === 'pending' && (
                           <div className="flex items-center gap-3">
                             <button 
                               onClick={() => handleStatusUpdate(seller._id, 'approved')}
                               className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-500/20 hover:scale-110 active:scale-95 transition-all"
                             >
                               <Check size={20} />
                             </button>
                             <button 
                               onClick={() => handleStatusUpdate(seller._id, 'rejected')}
                               className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all hover:scale-110 active:scale-95
                                 ${isDarkMode ? 'bg-white/5 border-white/10 text-rose-500 hover:bg-rose-500/10' : 'bg-white border-slate-100 text-rose-500 hover:bg-rose-50'}`}
                             >
                               <X size={20} />
                             </button>
                           </div>
                         )}
                         
                         {seller.status === 'approved' && (
                           <button className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all
                             ${isDarkMode ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
                              MANAGE STORE <ExternalLink size={14} />
                           </button>
                         )}
                      </div>
                   </div>
                </motion.div>
             ))
           )}
         </AnimatePresence>
      </div>
    </div>
  );
}
