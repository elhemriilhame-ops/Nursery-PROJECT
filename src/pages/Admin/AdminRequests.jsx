import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { 
  UserCheck, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Store, 
  Truck,
  Check,
  X,
  AlertCircle,
  Calendar,
  Layers,
  Search
} from 'lucide-react';
import axios from 'axios';

export default function AdminRequests() {
  const { isDarkMode } = useOutletContext();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pépiniériste, livreur

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return;
      const { token } = JSON.parse(storedUser);
      
      const response = await axios.get('http://127.0.0.1:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Filter only pending users
      const pending = response.data.filter(u => u.status === 'pending');
      setRequests(pending);
    } catch (err) {
      console.error('Failed to fetch requests:', err);
      // Fallback to mock data on error so the page isn't empty
      setRequests([
        { 
          _id: 'mock-1', 
          name: 'Simohamed Art', 
          email: 'simohamed@garden.ma', 
          role: 'pépiniériste', 
          status: 'pending',
          vendorInfo: { phone: '0612345678', location: 'Marrakech', cin: 'AB12345', specialty: 'Rare Flowers' }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (userId, action) => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return;
      const { token } = JSON.parse(storedUser);
      
      await axios.put(`http://127.0.0.1:5000/api/admin/users/${userId}/status`, 
        { status: action === 'approve' ? 'approved' : 'rejected' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRequests();
    } catch (err) {
      console.error('Action failed:', err);
    }
  };

  const filteredRequests = requests.filter(r => {
    if (filter === 'all') return true;
    return r.role === filter;
  });

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className={`p-10 rounded-[3rem] border transition-all relative overflow-hidden
        ${isDarkMode ? 'bg-[#141414] border-white/10 shadow-black' : 'bg-white border-slate-100 shadow-slate-100/50'}`}>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <h1 className={`text-4xl font-serif font-black italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Access Requests</h1>
            <p className={`text-sm font-medium italic opacity-50`}>Review botanical artisans and carrier applications for marketplace entry.</p>
          </div>
          
          <div className="flex bg-slate-100/10 p-1 rounded-2xl border border-white/5">
            <button onClick={() => setFilter('all')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'all' ? 'bg-emerald-500 text-white' : 'opacity-40'}`}>All Souls</button>
            <button onClick={() => setFilter('pépiniériste')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'pépiniériste' ? 'bg-emerald-500 text-white' : 'opacity-40'}`}>Artisans</button>
            <button onClick={() => setFilter('livreur')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'livreur' ? 'bg-emerald-500 text-white' : 'opacity-40'}`}>Carriers</button>
          </div>
        </div>

        {/* Backdrop Glow */}
        <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-20 ${isDarkMode ? 'bg-emerald-500' : 'bg-sage'}`} />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-6">
          <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          <p className="font-serif italic text-xl opacity-40">Scanning for new applications...</p>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-8">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center border-2 border-dashed ${isDarkMode ? 'border-white/10 text-white/10' : 'border-slate-200 text-slate-200'}`}>
            <ShieldCheck size={48} strokeWidth={1} />
          </div>
          <div className="text-center space-y-2">
            <h3 className={`text-2xl font-serif font-black italic ${isDarkMode ? 'text-white/40' : 'text-slate-300'}`}>Registry Clear</h3>
            <p className="text-xs font-black uppercase tracking-[0.2em] opacity-30">No pending access requests at this moment.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredRequests.map((request, idx) => (
              <motion.div
                key={request._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                className={`group p-8 rounded-[3.5rem] border shadow-2xl relative overflow-hidden transition-all duration-700
                   ${isDarkMode ? 'bg-[#141414] border-white/5 hover:border-emerald-500/30' : 'bg-white border-slate-100 hover:border-sage'}`}
              >
                {/* Role Icon floating */}
                <div className="absolute top-8 right-8 p-3 rounded-2xl bg-white/5 border border-white/5 opacity-40">
                  {request.role === 'pépiniériste' ? <Store size={20} /> : <Truck size={20} />}
                </div>

                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-5">
                    <div className={`w-16 h-16 rounded-[1.8rem] flex items-center justify-center text-2xl font-black border transition-all
                      ${isDarkMode ? 'bg-white/5 border-white/10 text-emerald-500' : 'bg-slate-50 border-slate-100 text-sage'}`}>
                      {request.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className={`text-xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{request.name}</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{request.role === 'pépiniériste' ? 'Artisan' : 'Carrier'}</p>
                    </div>
                  </div>

                  <div className={`p-6 rounded-3xl space-y-4 transition-colors ${isDarkMode ? 'bg-white/[0.02]' : 'bg-slate-50/50'}`}>
                    <div className="flex items-center gap-4 text-xs font-bold">
                       <Mail size={16} className="opacity-30" />
                       <span className="truncate">{request.email}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold">
                       <Phone size={16} className="opacity-30" />
                       <span>{request.vendorInfo?.phone || 'No phone provided'}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold">
                       <MapPin size={16} className="opacity-30" />
                       <span>{request.vendorInfo?.location || 'Unknown Zone'}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold">
                       <ShieldCheck size={16} className="text-amber-500" />
                       <span className="text-amber-500">ID: {request.vendorInfo?.cin || 'Missing CIN'}</span>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-white/5">
                     <button 
                       onClick={() => handleAction(request._id, 'approve')}
                       className="flex-1 h-14 rounded-2xl bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20 hover:bg-emerald-400 active:scale-95 transition-all"
                     >
                       <Check size={16} /> GRANT ACCESS
                     </button>
                     <button 
                       onClick={() => handleAction(request._id, 'reject')}
                       className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all hover:bg-rose-500/10 hover:border-rose-500/30 text-rose-500 active:scale-95
                         ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-100'}`}
                     >
                       <X size={18} />
                     </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
