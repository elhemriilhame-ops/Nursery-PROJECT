import React from 'react';
import { motion } from 'framer-motion';
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
  Filter
} from 'lucide-react';
import { DELIVERIES } from '@/data/mockData';

const Deliveries = () => {
  const activeDrivers = [
    { id: 'DRV-01', name: 'Ahmed M.', status: 'On Route', load: '3 / 5 Orders', location: 'Agadir Center', avatar: 'AM', online: true },
    { id: 'DRV-02', name: 'Khalid B.', status: 'Available', load: '0 / 5 Orders', location: 'Rabat Depot', avatar: 'KB', online: true },
    { id: 'DRV-03', name: 'Youssef T.', status: 'On Route', load: '1 / 5 Orders', location: 'Marrakech Medina', avatar: 'YT', online: true },
    { id: 'DRV-04', name: 'Sara L.', status: 'Break', load: '0 / 5 Orders', location: 'Casablanca Anfa', avatar: 'SL', online: true },
  ];

  const getStatusStyle = (status) => {
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
      case 'In Transit': return <Truck size={16} />;
      case 'Scheduled': return <Calendar size={16} />;
      case 'Delivered': return <CheckCircle2 size={16} />;
      case 'Processing': return <Clock size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-serif font-black text-slate-800 tracking-tight">Delivery Logistics</h1>
          <p className="text-slate-800 text-sm font-medium italic">Monitor and manage all botanical shipments in real-time.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 text-sm font-bold shadow-sm hover:shadow-md hover:border-sage transition-all">
            <Filter size={18} />
            <span>Advanced Filters</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-2xl text-sm font-bold shadow-lg shadow-slate-200 hover:scale-[1.02] active:scale-95 transition-all">
            <Truck size={18} />
            <span>Dispatch New Drive</span>
          </button>
        </div>
      </div>

      {/* Overview Statistics (Compact) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Shipments', value: '124', icon: Package, color: 'text-slate-800' },
          { label: 'On the road', value: '12', icon: Truck, color: 'text-blue-500' },
          { label: 'Next hour', value: '5', icon: Clock, color: 'text-amber-500' },
          { label: 'Arrived Safe', value: '107', icon: CheckCircle2, color: 'text-green-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 hover:border-sage/20 transition-all">
            <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center ${stat.color} bg-opacity-10`}>
               <stat.icon size={28} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-800">{stat.label}</p>
              <p className="text-2xl font-serif font-black text-slate-800 tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Logged In Delivery Profiles */}
      <div className="bg-white rounded-[2.5rem] p-6 lg:p-10 border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] relative overflow-hidden">
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
               <h3 className="text-2xl font-serif font-black text-slate-800">Active Delivery Profiles</h3>
               <p className="text-xs text-slate-800 mt-1">Personnel currently logged into the delivery network.</p>
            </div>
            <div className="flex items-center gap-2 bg-sage/10 px-4 py-2 rounded-2xl">
               <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-sage">{activeDrivers.length} Online</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeDrivers.map((driver, i) => (
               <div key={i} className="p-6 rounded-3xl border border-slate-100 hover:border-sage/30 hover:shadow-lg hover:shadow-sage/5 transition-all bg-slate-50/50 group">
                  <div className="flex items-start justify-between mb-4">
                     <div className="relative">
                        <div className="w-12 h-12 rounded-2xl bg-slate-200 text-slate-900 font-black flex items-center justify-center group-hover:bg-sage group-hover:text-white transition-colors">
                           {driver.avatar}
                        </div>
                        {driver.online && (
                           <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                        )}
                     </div>
                     <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-xl ${
                        driver.status === 'Available' ? 'bg-emerald-100 text-emerald-600' :
                        driver.status === 'Break' ? 'bg-amber-100 text-amber-600' :
                        'bg-blue-100 text-blue-600'
                     }`}>
                        {driver.status}
                     </span>
                  </div>
                  <div className="space-y-1 mb-4">
                     <h4 className="text-base font-bold text-slate-800">{driver.name}</h4>
                     <p className="text-[10px] text-slate-800 font-bold tracking-widest uppercase">{driver.id}</p>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-slate-200/60">
                     <div className="flex items-center gap-2 text-xs font-medium text-slate-900">
                        <Truck size={14} className="text-slate-800" />
                        {driver.load}
                     </div>
                     <div className="flex items-center gap-2 text-xs font-medium text-slate-900">
                        <MapPin size={14} className="text-slate-800" />
                        <span className="truncate">{driver.location}</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Main Delivery List / Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-black/[0.02] overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-white">
                <Truck size={20} />
             </div>
             <h2 className="text-xl font-serif font-black text-slate-800 tracking-tight">Active Deliveries Queue</h2>
           </div>

           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" size={18} />
              <input 
                type="text" 
                placeholder="Find tracking code or customer..."
                className="pl-12 pr-6 py-3.5 bg-slate-50 border-none rounded-2xl w-full md:w-80 text-sm font-medium focus:ring-4 focus:ring-sage/5 transition-all outline-none"
              />
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap min-w-[800px]">
            <thead className="bg-[#FCFCFB] border-b border-slate-50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black tracking-widest text-slate-800 uppercase">Tracking & Status</th>
                <th className="px-8 py-5 text-[10px] font-black tracking-widest text-slate-800 uppercase">Customer Information</th>
                <th className="px-8 py-5 text-[10px] font-black tracking-widest text-slate-800 uppercase">Destination Address</th>
                <th className="px-8 py-5 text-[10px] font-black tracking-widest text-slate-800 uppercase">Schedule & Items</th>
                <th className="px-8 py-5 text-[10px] font-black tracking-widest text-slate-800 uppercase">Payment</th>
                <th className="px-8 py-5 text-[10px] font-black tracking-widest text-slate-800 uppercase">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {DELIVERIES.map((del) => (
                <tr key={del.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="space-y-3">
                       <span className="text-xs font-black tracking-tighter text-slate-800">{del.id}</span>
                       <div className={`w-fit flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusStyle(del.status)}`}>
                          {getStatusIcon(del.status)}
                          <span>{del.status}</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-white group-hover:shadow-sm transition-all">
                          <User size={18} />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-slate-800 tracking-tight">{del.customer}</p>
                          <p className="text-[10px] text-slate-800 font-bold tracking-widest uppercase italic">Loyal Bloom Member</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 max-w-[280px]">
                    <div className="flex items-start gap-3">
                       <MapPin size={16} className="text-slate-700 mt-0.5 shrink-0" />
                       <p className="text-sm text-slate-900 font-medium leading-relaxed">{del.address}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-3">
                       <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-slate-800" />
                          <span className="text-xs font-bold text-slate-800">{del.date} <span className="text-slate-700 font-medium ml-2">|</span> <span className="text-slate-800 ml-2 font-medium">{del.time}</span></span>
                       </div>
                       <div className="flex items-center gap-2">
                          <Package size={14} className="text-slate-800" />
                          <span className="text-[11px] font-medium text-slate-800 italic truncate max-w-[150px]">{del.items}</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                     <div className="space-y-0.5">
                        <p className="text-sm font-black text-slate-800">{del.total}</p>
                        <p className="text-[9px] font-bold text-green-500 uppercase tracking-widest">Paid via Card</p>
                     </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <button className="p-2.5 rounded-xl hover:bg-slate-200/50 text-slate-800 hover:text-slate-800 transition-all">
                          <ChevronRight size={20} />
                       </button>
                       <button className="p-2.5 rounded-xl hover:bg-slate-200/50 text-slate-800 hover:text-slate-800 transition-all">
                          <MoreVertical size={20} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-8 bg-[#FCFCFB] text-center border-t border-slate-50">
           <button className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700 hover:text-slate-800 transition-all">
              Load more deliveries history
           </button>
        </div>
      </div>
    </div>
  );
};

export default Deliveries;
