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
  LayoutDashboard
} from 'lucide-react';
import { motion } from 'framer-motion';

import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Import login from context

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // MOCK LOGIN BYPASS (While MongoDB is offline)
    if (email === 'admin@sunflower.io') {
      const mockUser = {
        _id: 'mock-admin-id',
        name: 'Admin Sunflower',
        email: 'admin@sunflower.io',
        role: 'admin',
        token: 'mock-jwt-token'
      };
      login(mockUser);
      navigate('/admin');
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { 
        email, 
        password 
      });
      
      login(data);
      
      // Redirect based on role
      if (data.role === 'admin') navigate('/admin');
      else if (data.role === 'pépiniériste') navigate('/seller/dashboard');
      else navigate('/');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#FCFCFB] text-charcoal selection:bg-sage/20 selection:text-sage">
      
      {/* Decorative Visual Side */}
      <div className="hidden lg:block relative p-12 h-full">
         <div className="absolute inset-0 bg-sage/5 rounded-[3rem] m-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-sage/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-sage/5 rounded-full translate-x-1/4 translate-y-1/4 blur-[100px]" />
            
            <div className="relative h-full flex flex-col items-center justify-center p-20 text-center">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }}
                className="w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-sage mb-8"
              >
                <Leaf size={48} />
              </motion.div>
              <h2 className="text-5xl font-serif font-black mb-6 text-slate-800 leading-tight">Your botanical <br/> portal.</h2>
              <p className="text-slate-400 max-w-sm text-lg italic">Log in to manage your inventory or discover our latest blooms.</p>
              
              <div className="mt-20 grid grid-cols-2 gap-6 w-full max-w-md">
                 <div className="p-6 bg-white rounded-[2rem] shadow-sm border border-slate-100/50">
                    <p className="font-serif font-black text-2xl text-sage tracking-tighter">4.9/5</p>
                    <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest mt-1">Satisfaction</p>
                 </div>
                 <div className="p-6 bg-white rounded-[2rem] shadow-sm border border-slate-100/50">
                    <p className="font-serif font-black text-2xl text-sage tracking-tighter">24/7</p>
                    <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest mt-1">Support</p>
                 </div>
              </div>
            </div>
         </div>
      </div>

      {/* Form Side */}
      <div className="flex items-center justify-center p-8 lg:p-24 relative overflow-hidden">
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-md space-y-10"
        >
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 text-sage/60 hover:text-sage text-xs font-black uppercase tracking-widest transition-all group mb-4">
              <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to home
            </Link>
            <h1 className="text-4xl font-serif font-black tracking-tight text-slate-800">It's a pleasure to <br/> see you again.</h1>
            <p className="text-slate-400 font-medium">Enter your credentials to continue your experience.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sage transition-colors" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-[1.5rem] focus:ring-4 focus:ring-sage/5 focus:border-sage/20 outline-none transition-all font-medium text-sm shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sage transition-colors" size={18} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••••••"
                    className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-[1.5rem] focus:ring-4 focus:ring-sage/5 focus:border-sage/20 outline-none transition-all font-medium text-sm shadow-sm"
                  />
                </div>
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold flex items-center gap-3 border border-red-100"
              >
                <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                {error}
              </motion.div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-sage text-white py-5 rounded-[1.5rem] font-bold shadow-xl shadow-sage/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 group"
            >
              {loading ? "Loading..." : "Sign In"}
              {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm font-medium pt-4">
            New to Sunflowers?{' '}
            <Link to="/register" className="text-sage font-black hover:underline underline-offset-4 decoration-2">Create a profile</Link>
          </p>
        </motion.div>

        {/* Floating Accents */}
        <div className="absolute top-10 right-10 flex gap-4 text-slate-100 pointer-events-none">
           <ShieldCheck size={80} strokeWidth={1} className="opacity-10" />
           <Flower2 size={60} strokeWidth={1} className="opacity-5 rotate-12" />
        </div>
      </div>
    </div>
  );
};

export default Login;
