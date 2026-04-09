import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Flower2,
  Sprout,
  ShieldCheck,
  LayoutDashboard,
  ShieldAlert,
  Store,
  UserCheck,
  CreditCard,
  Phone,
  MapPin,
  Award,
  Briefcase,
  Sparkles,
  Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    cin: '',
    specialty: '',
    phone: '',
    location: '',
    commercialRegister: '',
    vehicleType: ''
  });
  const [success, setSuccess] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDarkMode } = useTheme();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    // MOCK REGISTER BYPASS
    setTimeout(() => {
      setSuccess(true);
      setFormData({
        name: '', email: '', password: '', role: '',
        cin: '', specialty: '', phone: '', location: '', commercialRegister: '', vehicleType: ''
      });
      setLoading(false);
      setShowRoleModal(false);
    }, 1500);
  };

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    if (formData.role) {
      setShowRoleModal(true);
    }
  };

  return (
    <div className={`min-h-screen grid grid-cols-1 lg:grid-cols-2 transition-colors duration-700 relative
      ${isDarkMode ? 'bg-[#050505]' : 'bg-[#FCFCFB]'}`}>

      {/* Success Modal */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className={`p-12 max-w-sm w-full flex flex-col items-center text-center rounded-[3.5rem] border shadow-2xl relative
                ${isDarkMode ? 'bg-[#141414] border-white/10 text-white' : 'bg-white border-slate-100'}`}
            >
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 relative
                 ${isDarkMode ? 'bg-emerald-500/20 shadow-[0_0_30px_#10b98133]' : 'bg-emerald-50'}`}>
                <UserCheck size={40} className="text-emerald-500 relative z-10" />
              </div>

              <h2 className="text-3xl font-serif font-black italic tracking-tight mb-4 text-emerald-500">Welcome Aboard</h2>
              <p className={`leading-relaxed mb-10 text-sm font-bold ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>
                Your botanical profile is ready.<br />You can now enter the boutique.
              </p>

              <Button onClick={() => navigate('/login')} className={`w-full h-16 rounded-2xl uppercase tracking-[0.3em] text-[10px] font-black shadow-2xl transition-all
                 ${isDarkMode ? 'bg-emerald-500 text-white hover:bg-emerald-400' : 'bg-sage text-white shadow-sage/20'}`}>
                Proceed to Portal
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Details Modal */}
      <AnimatePresence>
        {showRoleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[900] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className={`p-10 max-w-lg w-full rounded-[4rem] shadow-2xl relative max-h-[90vh] overflow-y-auto border transition-all duration-700
                ${isDarkMode ? 'bg-[#141414] border-white/5 text-white' : 'bg-white border-slate-100'}`}
            >
              <h2 className="text-3xl font-serif font-black italic tracking-tighter mb-4 text-center">Complete Setup</h2>
              <p className={`text-center mb-10 text-sm font-serif italic ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>
                Provide a few more identifiers for your <span className="text-emerald-500 font-black uppercase tracking-widest">{formData.role}</span> credentials.
              </p>

              <form onSubmit={handleRegister} className="space-y-8">
                {formData.role === 'customer' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <ModalInput icon={Phone} label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="06..." isDark={isDarkMode} />
                    <ModalInput icon={MapPin} label="Address" name="location" value={formData.location} onChange={handleChange} placeholder="Agadir..." isDark={isDarkMode} />
                  </div>
                )}

                {(formData.role === 'pépiniériste' || formData.role === 'livreur') && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <ModalInput icon={CreditCard} label="National ID (CIN)" name="cin" value={formData.cin} onChange={handleChange} placeholder="AB123..." isDark={isDarkMode} />
                      <ModalInput icon={Phone} label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="06..." isDark={isDarkMode} />
                    </div>

                    {formData.role === 'pépiniériste' ? (
                      <div className="space-y-3 group">
                        <label className={`text-xs font-black uppercase tracking-[0.2em] ml-6 transition-colors ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>Market Specialty</label>
                        <div className="relative">
                          <Briefcase className={`absolute left-6 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-emerald-400' : 'text-sage'}`} size={20} />
                          <select name="specialty" value={formData.specialty} onChange={handleChange} required
                            className={`w-full pl-16 pr-8 py-5 rounded-2xl text-base font-bold outline-none transition-all appearance-none cursor-pointer tracking-wide
                                   ${isDarkMode ? 'bg-white/10 text-white border-none focus:bg-white/20' : 'bg-slate-100 text-slate-900 border-none shadow-inner'}`}>
                            <option value="" disabled className={isDarkMode ? 'bg-zinc-900' : ''}>Focus...</option>
                            <option value="plants" className={isDarkMode ? 'bg-zinc-900' : ''}>Nursery & Plants</option>
                            <option value="flowers" className={isDarkMode ? 'bg-zinc-900' : ''}>Flowers & Bouquets</option>
                            <option value="oils" className={isDarkMode ? 'bg-zinc-900' : ''}>Botanical Extracts</option>
                          </select>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 group">
                        <label className={`text-xs font-black uppercase tracking-[0.2em] ml-6 transition-colors ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>Vessel Type</label>
                        <div className="relative">
                          <Truck className={`absolute left-6 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-emerald-400' : 'text-sage'}`} size={20} />
                          <select name="vehicleType" value={formData.vehicleType || ''} onChange={handleChange} required
                            className={`w-full pl-16 pr-8 py-5 rounded-2xl text-base font-bold outline-none transition-all appearance-none cursor-pointer tracking-wide
                                   ${isDarkMode ? 'bg-white/10 text-white border-none focus:bg-white/20' : 'bg-slate-100 text-slate-900 border-none shadow-inner'}`}>
                            <option value="" disabled className={isDarkMode ? 'bg-zinc-900' : ''}>Select Vessel...</option>
                            <option value="moto" className={isDarkMode ? 'bg-zinc-900' : ''}>Scout (Moto)</option>
                            <option value="car" className={isDarkMode ? 'bg-zinc-900' : ''}>Swift (Car)</option>
                            <option value="van" className={isDarkMode ? 'bg-zinc-900' : ''}>Cargo (Van)</option>
                            <option value="truck" className={isDarkMode ? 'bg-zinc-900' : ''}>Heavy (Truck)</option>
                          </select>
                        </div>
                      </div>
                    )}

                    <ModalInput icon={MapPin} label="City / Operating Zone" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Agadir Center" isDark={isDarkMode} />
                    <ModalInput icon={Award} label="Commercial Register" name="commercialRegister" value={formData.commercialRegister} onChange={handleChange} placeholder="Registration N°..." isDark={isDarkMode} />
                  </div>
                )}

                <div className="flex gap-6 pt-10 border-t border-white/5">
                  <button type="button" onClick={() => setShowRoleModal(false)} className={`px-8 py-4 text-[10px] font-black uppercase tracking-widest transition-colors ${isDarkMode ? 'text-white/20 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>BACK</button>
                  <Button type="submit" disabled={loading} className={`w-full py-6 rounded-2xl h-auto font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all
                     ${isDarkMode ? 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-emerald-500/20' : 'bg-slate-900 text-white hover:bg-sage shadow-slate-900/10'}`}>
                    {loading ? 'PROCESSING...' : 'CREATE ACCOUNT'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Branding Side */}
      <div className="hidden lg:block relative p-12 h-full order-last lg:order-first">
        <div className={`absolute inset-0 rounded-[4rem] m-8 overflow-hidden border transition-all duration-700
           ${isDarkMode ? 'bg-white/5 border-white/5 shadow-black' : 'bg-sage/5 border-slate-100 shadow-slate-100/50'}`}>
          <div className={`absolute top-0 left-0 w-[45rem] h-[45rem] rounded-full -translate-x-1/2 -translate-y-1/2 blur-[100px] transition-colors
              ${isDarkMode ? 'bg-emerald-500/10' : 'bg-sage/10'}`} />
          <div className={`absolute bottom-0 right-0 w-[45rem] h-[45rem] rounded-full translate-x-1/4 translate-y-1/4 blur-[100px] transition-colors
              ${isDarkMode ? 'bg-emerald-500/5' : 'bg-sage/5'}`} />

          <div className="relative h-full flex flex-col items-center justify-center p-24 text-center space-y-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`w-28 h-28 rounded-[2.5rem] shadow-2xl flex items-center justify-center transition-all duration-700
                  ${isDarkMode ? 'bg-[#141414] text-emerald-500 border border-white/5' : 'bg-white text-sage'}`}
            >
              <Sprout size={52} strokeWidth={1.5} />
            </motion.div>

            <div className="space-y-6">
              <h2 className={`text-6xl font-serif font-black italic tracking-tighter leading-[0.9] transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Join the <br /> Nursery.</h2>
              <p className={`max-w-xs mx-auto text-lg font-serif italic transition-colors ${isDarkMode ? 'text-white/40' : 'text-slate-600'}`}>"Share your harvests or discover rare specimens from our curated global network."</p>
            </div>

            <div className="mt-20 space-y-6">
              <RegisterPromise label="HERITAGE PROTECTION" isDark={isDarkMode} />
              <RegisterPromise label="SECURE BOTANICAL TRADE" isDark={isDarkMode} />
              <RegisterPromise label="24/7 ARTISAN SUPPORT" isDark={isDarkMode} />
            </div>
          </div>
        </div>
      </div>

      {/* Primary Form Side */}
      <div className="flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-md space-y-6 relative z-10"
        >
          <div className="space-y-4">
            <div className="space-y-3">
              <h1 className={`text-4xl font-serif font-black italic tracking-tighter leading-none transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Begin your <br /> Journey.</h1>
              <div className={`h-1 w-20 rounded-full ${isDarkMode ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-sage'}`} />
            </div>
            <p className={`font-serif italic text-base ${isDarkMode ? 'text-white/40' : 'text-slate-600'}`}>Welcome to the atelier. Join our community.</p>
          </div>

          <form onSubmit={handleInitialSubmit} className="space-y-6">
            <div className="space-y-4">
              <AuthInput icon={User} label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" isDark={isDarkMode} />
              <AuthInput icon={Mail} label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="email@sunflower.io" isDark={isDarkMode} />
              <AuthInput icon={Lock} label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="••••••••" isDark={isDarkMode} />

              {/* Role Selection */}
              <div className="space-y-2">
                <label className={`text-xs font-black uppercase tracking-[0.2em] ml-6 transition-colors ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>Select Role</label>
                <div className="grid grid-cols-3 gap-4">
                  <RoleButton current={formData.role} role="customer" icon={UserCheck} label="CUSTOMER" onClick={(r) => setFormData({ ...formData, role: r })} isDark={isDarkMode} />
                  <RoleButton current={formData.role} role="pépiniériste" icon={Store} label="ARTISAN" onClick={(r) => setFormData({ ...formData, role: r })} isDark={isDarkMode} />
                  <RoleButton current={formData.role} role="livreur" icon={Truck} label="CARRIER" onClick={(r) => setFormData({ ...formData, role: r })} isDark={isDarkMode} />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !formData.role}
              className={`w-full py-5 rounded-3xl font-black tracking-[0.4em] uppercase text-xs shadow-2xl transition-all flex items-center justify-center gap-4 group active:scale-95
                  ${isDarkMode
                  ? 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-emerald-500/20 shadow-black'
                  : 'bg-slate-900 text-white hover:bg-sage shadow-slate-900/10'}`}
            >
              {loading ? 'PROCESSING...' : 'CREATE ACCOUNT'}
              {(!loading && formData.role) && <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />}
            </button>
          </form>

          <p className={`text-center text-sm font-medium pt-4 transition-colors ${isDarkMode ? 'text-white/30' : 'text-slate-500'}`}>
            Already have an account?{' '}
            <Link to="/login" className={`font-black uppercase tracking-widest text-xs underline underline-offset-8 transition-colors text-emerald-500 hover:text-emerald-400`}>Log In</Link>
          </p>
        </motion.div>

        {/* Background Elements */}
        <div className="absolute top-20 right-20 flex gap-8 opacity-5 pointer-events-none">
          <ShieldCheck size={120} strokeWidth={1} className={isDarkMode ? 'text-white' : 'text-slate-900'} />
          <Sparkles size={100} strokeWidth={1} className={isDarkMode ? 'text-emerald-500' : 'text-sage'} />
        </div>
      </div>
    </div>
  );
};

function AuthInput({ icon: Icon, label, type = "text", name, value, onChange, placeholder, isDark }) {
  return (
    <div className="space-y-2 group">
      <label className={`text-xs font-black uppercase tracking-[0.2em] ml-6 transition-colors
        ${isDark ? 'text-white/70 group-focus-within:text-emerald-400' : 'text-slate-600 group-focus-within:text-sage'}`}>
        {label}
      </label>
      <div className="relative">
        <Icon className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors duration-500
          ${isDark ? 'text-white/40 group-focus-within:text-emerald-400' : 'text-slate-500 group-focus-within:text-sage'}`}
          size={20} strokeWidth={2} />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
          placeholder={placeholder}
          className={`w-full pl-16 pr-8 py-3.5 rounded-2xl border outline-none transition-all font-bold text-base shadow-inner tracking-wide
            ${isDark
              ? 'bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:bg-white/15'
              : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sage/40'}`}
        />
      </div>
    </div>
  );
}

function ModalInput({ icon: Icon, label, name, value, onChange, placeholder, isDark }) {
  return (
    <div className="space-y-3 group">
      <label className={`text-[11px] font-black uppercase tracking-[0.2em] ml-4 transition-colors ${isDark ? 'text-white/70' : 'text-slate-600'}`}>{label}</label>
      <div className="relative">
        <Icon className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-emerald-400' : 'text-sage'}`} size={18} />
        <input name={name} value={value} onChange={onChange} required placeholder={placeholder}
          className={`w-full pl-12 pr-6 py-4 rounded-2xl text-base font-bold border-none outline-none transition-all shadow-inner tracking-wide
            ${isDark ? 'bg-white/10 text-white placeholder:text-white/30 focus:bg-white/20 shadow-black' : 'bg-slate-100 text-slate-900 placeholder:text-slate-500 shadow-slate-200'}`} />
      </div>
    </div>
  );
}

function RoleButton({ current, role, icon: Icon, label, onClick, isDark }) {
  const isActive = current === role;
  return (
    <button
      type="button"
      onClick={() => onClick(role)}
      className={`p-4 rounded-2xl border-2 transition-all group flex flex-col items-center gap-3 relative overflow-hidden
        ${isActive
          ? (isDark ? 'border-emerald-500 bg-emerald-500/10 shadow-emerald-500/20' : 'border-sage bg-sage/5')
          : (isDark ? 'border-white/5 bg-white/[0.02] hover:border-white/20' : 'border-slate-50 bg-white hover:border-sage shadow-sm shadow-slate-100')
        }`}
    >
      <Icon size={24} className={`transition-all ${isActive ? (isDark ? 'text-emerald-500 drop-shadow-[0_0_8px_#10b981]' : 'text-sage') : 'opacity-20 group-hover:opacity-40'}`} />
      <p className={`text-[10px] font-black uppercase tracking-widest leading-none ${isActive ? (isDark ? 'text-white' : 'text-sage') : (isDark ? 'text-white/20' : 'text-slate-400')}`}>{label}</p>
      {isActive && <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${isDark ? 'bg-emerald-500' : 'bg-sage'}`} />}
    </button>
  );
}

function RegisterPromise({ label, isDark }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className={`p-3 rounded-xl transition-all ${isDark ? 'bg-white/5 group-hover:bg-emerald-500/10' : 'bg-white group-hover:bg-sage/10'}`}>
        <ShieldCheck size={18} className={isDark ? 'text-emerald-500' : 'text-sage'} />
      </div>
      <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isDark ? 'text-white/40 group-hover:text-white' : 'text-slate-900'}`}>{label}</span>
    </div>
  );
}

export default Register;
