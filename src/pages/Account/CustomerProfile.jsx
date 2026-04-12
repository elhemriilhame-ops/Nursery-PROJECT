import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  User, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Camera,
  Edit3
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const CustomerProfile = () => {
  const { isDarkMode } = useOutletContext();
  const { user } = useAuth();

  return (
    <div className="max-w-3xl space-y-12">
      
      {/* Identity Card */}
      <div className={cn(
        "p-10 rounded-[3.5rem] border shadow-2xl relative overflow-hidden",
        isDarkMode ? "bg-[#0D0D0D] border-white/5" : "bg-white border-slate-100 shadow-slate-200/50"
      )}>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="relative group">
            <div className={cn(
              "w-32 h-32 rounded-[2.5rem] flex items-center justify-center text-4xl font-black border transition-all",
              isDarkMode ? "bg-white/5 border-white/10 text-emerald-500 shadow-2xl shadow-black" : "bg-slate-50 border-slate-100 text-sage shadow-xl"
            )}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all">
              <Camera size={18} />
            </button>
          </div>

          <div className="text-center md:text-left space-y-2">
            <h2 className={cn("text-3xl font-black tracking-tighter", isDarkMode ? "text-white" : "text-slate-900")}>
              {user?.name || 'Grand Collector'}
            </h2>
            <p className="text-sm font-bold opacity-40 uppercase tracking-widest italic font-serif">Member since April 2026</p>
          </div>
        </div>
      </div>

      {/* Details Form Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { icon: User, label: 'Full Name', value: user?.name || 'N/A' },
          { icon: Mail, label: 'Email Address', value: user?.email || 'N/A' },
          { icon: MapPin, label: 'Default Shipping', value: 'Hivernage, Marrakech' },
          { icon: ShieldCheck, label: 'Account Security', value: 'Verified Member' },
        ].map((field, i) => (
          <div key={i} className={cn(
            "p-8 rounded-[2rem] border transition-all",
            isDarkMode ? "bg-white/[0.02] border-white/5 hover:border-white/10" : "bg-white border-slate-100 hover:border-slate-200 shadow-sm"
          )}>
            <div className="flex items-center justify-between mb-4">
              <field.icon size={18} className="opacity-40" />
              <button className="text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:underline">Edit</button>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 mb-1">{field.label}</p>
            <p className={cn("text-base font-bold", isDarkMode ? "text-white/80" : "text-slate-700")}>{field.value}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default CustomerProfile;
