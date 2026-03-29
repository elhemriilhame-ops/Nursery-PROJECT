import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  Users, 
  Mail, 
  Calendar, 
  Shield, 
  Search, 
  MoreVertical,
  ArrowRight
} from 'lucide-react';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setCustomers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user && user.token) fetchCustomers();
  }, [user]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-black text-slate-800 tracking-tight">Customer Base</h1>
          <p className="text-xs text-slate-800 mt-1">Full list of registered users on the platform.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-sage/10 text-sage px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-sage/10 flex items-center gap-2 shadow-sm">
            <Users size={16} /> {customers.length} Users
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
           <div className="relative group w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-sage transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search by email..."
                className="pl-12 pr-6 py-3 bg-slate-50 rounded-2xl outline-none focus:ring-4 focus:ring-sage/5 transition-all text-sm w-full"
              />
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-700 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-10 py-6">USER</th>
                <th className="px-10 py-6">ROLE</th>
                <th className="px-10 py-6">REGISTRATION DATE</th>
                <th className="px-10 py-6 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                   <td colSpan="4" className="px-10 py-20 text-center animate-pulse text-slate-700 font-serif text-xl italic">Loading data...</td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-10 py-20 text-center text-slate-700 font-serif text-xl italic">No users found.</td>
                </tr>
              ) : customers.map((customer) => (
                <tr key={customer._id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-sage/5 text-sage font-black flex items-center justify-center border-2 border-sage/10 uppercase group-hover:bg-sage group-hover:text-white transition-all text-sm">
                        {customer.name.charAt(0)}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-black text-slate-800">{customer.name}</span>
                        <span className="text-xs text-slate-800 italic">{customer.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                      customer.role === 'admin' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                      customer.role === 'pépiniériste' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      'bg-slate-50 text-slate-600 border-slate-100'
                    }`}>
                      {customer.role}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-2 text-slate-800 text-xs font-medium">
                      <Calendar size={14} />
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <button className="p-3 bg-slate-50 rounded-xl text-slate-700 hover:bg-white hover:text-sage hover:border-slate-200 border border-transparent transition-all shadow-sm">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Customers;
