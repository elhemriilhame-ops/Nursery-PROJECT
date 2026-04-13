import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Mail,
  Lock,
  ArrowRight,
  Leaf,
  Flower2,
  ShieldCheck,
  LayoutDashboard,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDarkMode } = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await axios.post('http://127.0.0.1:5000/api/auth/login', { email, password });
      login(data);
      // Clear fields on success before navigating
      setEmail('');
      setPassword('');
      if (data.role === 'admin') navigate('/admin');
      else if (data.role === 'pépiniériste') navigate('/seller');
      else if (data.role === 'livreur') navigate('/delivery');
      else navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
      // Clear fields on failure too
      setEmail('');
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen grid grid-cols-1 lg:grid-cols-2 transition-colors duration-700
      ${isDarkMode ? 'bg-[#050505]' : 'bg-[#FCFCFB]'}`}>

      {/* Visual Experience Side */}
      <div className="hidden lg:block relative p-12 h-full">
        <div className={`absolute inset-0 rounded-[4rem] m-8 overflow-hidden border transition-all duration-700
           ${isDarkMode ? 'bg-white/5 border-white/5 shadow-black' : 'bg-sage/5 border-slate-100 shadow-slate-100/50'}`}>

          {/* Ambient Aura */}
          <div className={`absolute top-0 right-0 w-[45rem] h-[45rem] rounded-full -translate-x-1/2 -translate-y-1/2 blur-[100px] transition-colors
              ${isDarkMode ? 'bg-emerald-500/10' : 'bg-sage/10'}`} />
          <div className={`absolute bottom-0 left-0 w-[45rem] h-[45rem] rounded-full translate-x-1/4 translate-y-1/4 blur-[100px] transition-colors
              ${isDarkMode ? 'bg-emerald-500/5' : 'bg-sage/5'}`} />

          <div className="relative h-full flex flex-col items-center justify-center p-24 text-center space-y-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`w-28 h-28 rounded-[2.5rem] shadow-2xl flex items-center justify-center transition-all duration-700
                  ${isDarkMode ? 'bg-[#141414] text-emerald-500 border border-white/5' : 'bg-white text-sage'}`}
            >
              <Leaf size={52} strokeWidth={1.5} />
            </motion.div>

            <div className="space-y-6">
              <h2 className={`text-6xl font-serif font-black italic tracking-tighter leading-[0.9] transition-colors
                  ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Botanical <br /> Portal.
              </h2>
              <p className={`max-w-xs mx-auto text-lg font-serif italic transition-colors
                  ${isDarkMode ? 'text-white/40' : 'text-slate-600'}`}>
                "Unlock your inventory and discover the season's rarest blooms."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 w-full max-w-sm">
              <StatCard value="4.9/5" label="HARVEST TRUST" isDark={isDarkMode} />
              <StatCard value="24/7" label="CONCIERGE" isDark={isDarkMode} />
            </div>

            {/* Decorative elements */}
            <div className="absolute top-12 left-12 opacity-5">
              <Flower2 size={120} className={isDarkMode ? 'text-white' : 'text-sage'} />
            </div>
          </div>
        </div>
      </div>

      {/* Logic Side */}
      <div className="flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-md space-y-8 relative z-10"
        >
          <div className="space-y-4">
            <Link to="/" className={`inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all group
              ${isDarkMode ? 'text-white/40 hover:text-emerald-500' : 'text-slate-400 hover:text-sage'}`}>
              <ArrowRight size={16} className="rotate-180 group-hover:-translate-x-2 transition-transform" />
              ATELIER ENTRANCE
            </Link>
            <div className="space-y-2">
              <h1 className={`text-4xl font-serif font-black italic tracking-tighter leading-none transition-colors
                 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Welcome <br /> Back.</h1>
              <div className={`h-1 w-16 rounded-full ${isDarkMode ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-sage'}`} />
            </div>
            <p className={`font-serif italic text-base ${isDarkMode ? 'text-white/40' : 'text-slate-600'}`}>Identify yourself to access the boutique.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6" autoComplete="off">
            {/* Hidden dummy inputs to trick browser autofill */}
            <input type="text" style={{ display: 'none' }} />
            <input type="password" style={{ display: 'none' }} />
            <div className="space-y-4">
              <AuthInput
                icon={Mail}
                label="Email Address"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="email@sunflower.io"
                isDark={isDarkMode}
                autoComplete="off"
              />
              <AuthInput
                icon={Lock}
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="••••••••"
                isDark={isDarkMode}
                autoComplete="new-password"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-rose-500/10 text-rose-500 p-5 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-4 border border-rose-500/20"
                >
                  <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_10px_red]" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-3xl font-black tracking-[0.4em] uppercase text-xs shadow-2xl transition-all flex items-center justify-center gap-4 group active:scale-95
                ${isDarkMode
                  ? 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-emerald-500/20'
                  : 'bg-slate-900 text-white hover:bg-sage shadow-slate-900/10'}`}
            >
              {loading ? "AUTHENTICATING..." : "LOG IN"}
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />}
            </button>
          </form>

          <p className={`text-center text-sm font-medium pt-4 transition-colors ${isDarkMode ? 'text-white/30' : 'text-slate-500'}`}>
            Don't have an account?{' '}
            <Link to="/register" className={`font-black uppercase tracking-widest text-xs underline underline-offset-8 transition-colors text-emerald-500 hover:text-emerald-400`}>Sign Up</Link>
          </p>

        </motion.div>

        {/* Floating Icons */}
        <div className="absolute top-20 right-20 flex gap-8 opacity-5 pointer-events-none">
          <ShieldCheck size={100} strokeWidth={1} className={isDarkMode ? 'text-white' : 'text-slate-900'} />
          <Sparkles size={80} strokeWidth={1} className={isDarkMode ? 'text-emerald-500' : 'text-sage'} />
        </div>
      </div>
    </div>
  );
};

function StatCard({ value, label, isDark }) {
  return (
    <div className={`p-8 rounded-[2.5rem] border shadow-2xl transition-all duration-700
      ${isDark ? 'bg-white/5 border-white/5 text-white' : 'bg-white border-slate-100/50 text-slate-900'}`}>
      <p className={`font-serif font-black text-3xl italic tracking-tighter ${isDark ? 'text-emerald-500' : 'text-sage'}`}>{value}</p>
      <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 mt-2">{label}</p>
    </div>
  );
}

function AuthInput({ icon: Icon, label, type, value, onChange, placeholder, isDark, autoComplete }) {
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          placeholder={placeholder}
          autoComplete={autoComplete || 'off'}
          className={`w-full pl-16 pr-8 py-3.5 rounded-2xl border outline-none transition-all font-bold text-base shadow-inner tracking-wide
            ${isDark
              ? 'bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:bg-white/15'
              : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sage/40'}`}
        />
      </div>
    </div>
  );
}

export default Login;
