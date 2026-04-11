import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { 
  Truck, 
  User, 
  MapPin, 
  Calendar, 
  Package, 
  ChevronRight, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MoreVertical,
  Filter,
  Check,
  X,
  ShieldCheck
} from 'lucide-react';
import { DELIVERIES } from '@/data/mockData';
import axios from 'axios';

const Deliveries = () => {
  const { isDarkMode } = useOutletContext();
  const [personnel, setPersonnel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('monitoring'); // monitoring, approvals
  const navigate = useNavigate();

  const fetchPersonnel = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return;
      const { token } = JSON.parse(storedUser);
      
      const response = await axios.get('http://127.0.0.1:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPersonnel(response.data.filter(u => u.role === 'livreur'));
    } catch (err) {
      console.error('Failed to fetch delivery personnel:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonnel();
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
      fetchPersonnel();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };
  
  const pendingPersonnel = personnel.filter(p => p.status === 'pending');

  const getStatusStyle = (status) => {
    if (isDarkMode) {
      switch (status) {
        case 'In Transit': return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
        case 'Scheduled': return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
        case 'Delivered': return 'bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/20';
        case 'Processing': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
        default: return 'bg-white/5 text-white/50 border border-white/10';
      }
    }
    switch (status) {
      case 'In Transit': return 'bg-blue-100 text-blue-600';
      case 'Scheduled': return 'bg-purple-100 text-purple-600';
      case 'Delivered': return 'bg-green-100 text-green-600';
      case 'Processing': return 'bg-amber-100 text-amber-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'In Transit': return <Truck size={14} />;
      case 'Scheduled': return <Calendar size={14} />;
      case 'Delivered': return <CheckCircle2 size={14} />;
      case 'Processing': return <Clock size={14} />;
      default: return <AlertCircle size={14} />;
    }
  };

  return (
    <div className="space-y-10 pb-10">
      {/* Page Header */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-6 p-10 rounded-[3rem] border shadow-sm transition-all
        ${isDarkMode ? 'bg-[#141414] border-white/10' : 'bg-white border-slate-100'}`}>
        <div className="space-y-1">
          <h1 className={`text-3xl font-serif font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Delivery Logistics</h1>
          <p className={`text-sm font-medium italic ${isDarkMode ? 'text-[#CBD5E1]' : 'text-slate-600'}`}>Monitor and manage all botanical shipments in real-time.</p>
        </div>

        <div className="flex items-center gap-4">
           {/* Tab Switcher */}
           <div className={`flex p-1 rounded-2xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-100/50 border-slate-100'}`}>
              <button onClick={() => setActiveTab('monitoring')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'monitoring' ? (isDarkMode ? 'bg-[#2DD4BF] text-[#141414]' : 'bg-slate-900 text-white') : 'opacity-40 hover:opacity-100'}`}>Monitoring</button>
              <button onClick={() => setActiveTab('approvals')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === 'approvals' ? (isDarkMode ? 'bg-[#F43F5E] text-white' : 'bg-[#F43F5E] text-white') : 'opacity-40 hover:opacity-100'}`}>
                Approvals
                {pendingPersonnel.length > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-[8px] flex items-center justify-center border-2 border-[#141414]">{pendingPersonnel.length}</span>}
              </button>
           </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'monitoring' ? (
          <motion.div key="mon" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
            {/* Overview Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Shipments', value: '124', icon: Package, color: '#F472B6' },
                { label: 'On the road', value: '12', icon: Truck, color: '#60A5FA' },
                { label: 'Next hour', value: '5', icon: Clock, color: '#FACC15' },
                { label: 'Arrived Safe', value: '107', icon: CheckCircle2, color: '#2DD4BF' },
              ].map((stat, i) => (
                <div key={i} className={`p-8 rounded-[2.5rem] border shadow-sm flex items-center gap-6 group hover:scale-[1.02] transition-all duration-500
                  ${isDarkMode ? 'bg-[#141414] border-white/10 hover:border-white/20' : 'bg-white border-slate-100 hover:border-sage'}`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isDarkMode ? 'bg-white/5' : 'bg-slate-50'}`} style={{ color: stat.color }}>
                     <stat.icon size={28} strokeWidth={2} />
                  </div>
                  <div>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-[#94A3B8]' : 'text-slate-400'}`}>{stat.label}</p>
                    <p className={`text-3xl font-serif font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Delivery Queue Table */}
            <div className={`rounded-[3.5rem] border shadow-xl overflow-hidden transition-all
              ${isDarkMode ? 'bg-[#141414] border-white/10 shadow-black' : 'bg-white border-slate-100 shadow-black/[0.02]'}`}>
               <div className={`p-10 border-b flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all ${isDarkMode ? 'border-white/5' : 'border-slate-50'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all
                      ${isDarkMode ? 'bg-[#F43F5E] shadow-pink-500/20' : 'bg-slate-800 shadow-slate-200'}`}>
                       <Truck size={24} />
                    </div>
                    <div>
                       <h2 className={`text-xl font-serif font-black tracking-tight italic ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Active Deliveries Queue</h2>
                       <p className={`text-[10px] font-black uppercase tracking-widest opacity-50 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Manage the transactional flow</p>
                    </div>
                  </div>
               </div>

               <div className="overflow-x-auto">
                 <table className="w-full text-left whitespace-nowrap min-w-[800px]">
                   <thead>
                     <tr className={`border-b text-[10px] font-black tracking-[0.2em] uppercase transition-all
                       ${isDarkMode ? 'bg-white/[0.04] text-[#CBD5E1] border-white/5' : 'bg-[#FCFCFB] text-slate-500 border-slate-50'}`}>
                       <th className="px-10 py-6">Tracking & Status</th>
                       <th className="px-10 py-6">Customer Information</th>
                       <th className="px-10 py-6">Destination Address</th>
                       <th className="px-10 py-6 text-right">Payment</th>
                       <th className="px-10 py-6 text-right">Options</th>
                     </tr>
                   </thead>
                   <tbody className={`divide-y transition-all ${isDarkMode ? 'divide-white/5' : 'divide-slate-50'}`}>
                     {DELIVERIES.map((del) => (
                       <tr key={del.id} className={`transition-all group ${isDarkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50/50'}`}>
                         <td className="px-10 py-8">
                           <div className="space-y-3">
                              <span className={`text-[13px] font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{del.id}</span>
                              <div className={`w-fit flex items-center gap-2 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${getStatusStyle(del.status)}`}>
                                 {getStatusIcon(del.status)}
                                 <span>{del.status}</span>
                              </div>
                           </div>
                         </td>
                         <td className="px-10 py-8">
                           <div className="flex items-center gap-5">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isDarkMode ? 'bg-white/5 text-white' : 'bg-slate-100 text-slate-800'}`}>
                                 <User size={20} />
                              </div>
                              <div>
                                 <p className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{del.customer}</p>
                              </div>
                           </div>
                         </td>
                         <td className="px-10 py-8">
                           <div className="flex items-start gap-3">
                              <MapPin size={18} className={`mt-0.5 shrink-0 transition-colors ${isDarkMode ? 'text-[#2DD4BF]' : 'text-slate-400'}`} />
                              <p className={`text-sm font-bold leading-relaxed whitespace-normal ${isDarkMode ? 'text-[#CBD5E1]' : 'text-slate-900'}`}>{del.address}</p>
                           </div>
                         </td>
                         <td className="px-10 py-8 text-right font-black">{del.total}</td>
                         <td className="px-10 py-8 text-right">
                           <button className={`p-3 rounded-2xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50'}`}>
                              <ChevronRight size={22} />
                           </button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="app" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full py-20 text-center opacity-40 italic font-serif text-2xl">Detecting personnel...</div>
            ) : personnel.length === 0 ? (
              <div className="col-span-full py-20 text-center opacity-40 italic font-serif text-2xl">No delivery applications found.</div>
            ) : (
              personnel.map((p, idx) => (
                <motion.div key={p._id} layout className={`p-10 rounded-[3.5rem] border shadow-2xl relative overflow-hidden transition-all duration-700 ${isDarkMode ? 'bg-[#141414] border-white/5 shadow-black' : 'bg-white border-slate-100 shadow-slate-100/50'}`}>
                  <div className="relative z-10 space-y-8">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center border ${isDarkMode ? 'bg-white/5 border-white/10 text-[#2DD4BF]' : 'bg-slate-50 border-slate-100 text-sage'}`}>
                          <Truck size={28} />
                        </div>
                        <div>
                          <h3 className={`text-xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{p.name}</h3>
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{p._id?.slice(-6) || 'New Carrier'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`p-6 rounded-3xl space-y-3 transition-colors ${isDarkMode ? 'bg-white/[0.02]' : 'bg-slate-50/50'}`}>
                       <div className="flex justify-between items-center text-[10px]">
                         <span className="font-black uppercase tracking-widest opacity-40">Contact</span>
                         <span className="font-bold">{p.vendorInfo?.phone || 'N/A'}</span>
                       </div>
                       <div className="flex justify-between items-center text-[10px]">
                         <span className="font-black uppercase tracking-widest opacity-40">National ID</span>
                         <span className="font-bold">{p.vendorInfo?.cin || 'N/A'}</span>
                       </div>
                       <div className="flex justify-between items-center text-[10px]">
                         <span className="font-black uppercase tracking-widest opacity-40">Vessel</span>
                         <span className="font-black text-[#F43F5E] uppercase">{p.vendorInfo?.vehicleType || 'Any'}</span>
                       </div>
                       <div className="pt-2 border-t border-white/5">
                         <p className="text-[12px] font-bold truncate">{p.email}</p>
                       </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                       <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border border-dashed transition-all
                         ${p.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                           p.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)] animate-pulse' : 
                           'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                         {p.status === 'approved' ? 'Active' : p.status === 'pending' ? 'Under Review' : 'Rejected'}
                       </span>

                       {p.status === 'pending' && (
                         <div className="flex items-center gap-3">
                           <button onClick={() => handleStatusUpdate(p._id, 'approved')} className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-emerald-500/20"><Check size={18} /></button>
                           <button onClick={() => handleStatusUpdate(p._id, 'rejected')} className="w-10 h-10 rounded-xl border border-rose-500/50 text-rose-500 flex items-center justify-center hover:bg-rose-500/10 transition-all"><X size={18} /></button>
                         </div>
                       )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Deliveries;
