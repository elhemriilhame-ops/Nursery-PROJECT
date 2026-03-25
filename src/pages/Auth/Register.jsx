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
  UserCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Import login from context

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // MOCK REGISTER BYPASS (While MongoDB is offline)
    setTimeout(() => {
      const mockUser = {
        _id: 'mock-user-' + Date.now(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        token: 'mock-jwt-token'
      };
      login(mockUser);
      navigate('/');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#FCFCFB] text-charcoal selection:bg-sage/20 selection:text-sage">
      
      {/* Decorative Visual Side */}
      <div className="hidden lg:block relative p-12 h-full order-last lg:order-first">
         <div className="absolute inset-0 bg-sage/5 rounded-[3rem] m-8 overflow-hidden">
            <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-sage/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-sage/5 rounded-full translate-x-1/4 translate-y-1/4 blur-[100px]" />
            
            <div className="relative h-full flex flex-col items-center justify-center p-20 text-center">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }}
                className="w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-sage mb-8"
              >
                <Sprout size={48} />
              </motion.div>
              <h2 className="text-5xl font-serif font-black mb-6 text-slate-800 leading-tight">Rejoignez la <br/> pépinière.</h2>
              <p className="text-slate-400 max-w-sm text-lg italic tracking-tight">Partagez vos floraisons ou découvrez des plantes rares du monde entier.</p>
              
              <div className="mt-20 flex flex-col items-start gap-4">
                 <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
                    <ShieldCheck size={20} className="text-sage" /> Votre vie privée est protégée
                 </div>
                 <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
                    <ShieldCheck size={20} className="text-sage" /> Paiements sécurisés (Stripe)
                 </div>
                 <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
                    <ShieldCheck size={20} className="text-sage" /> Support client disponible
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
          className="w-full max-w-md space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-4xl font-serif font-black tracking-tight text-slate-800 leading-tight">Créez votre <br/> profil.</h1>
            <p className="text-slate-400 font-medium">Bienvenue ! C'est le moment de nous rejoindre.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Nom complet</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sage transition-colors" size={18} />
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="ex: Jean Dupond"
                    className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-[1.2rem] focus:ring-4 focus:ring-sage/5 focus:border-sage/20 outline-none transition-all font-medium text-sm shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sage transition-colors" size={18} />
                  <input 
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="votre@email.com"
                    className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-[1.2rem] focus:ring-4 focus:ring-sage/5 focus:border-sage/20 outline-none transition-all font-medium text-sm shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Mot de Passe</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sage transition-colors" size={18} />
                  <input 
                    name="password"
                    type="password" 
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••••••"
                    className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-[1.2rem] focus:ring-4 focus:ring-sage/5 focus:border-sage/20 outline-none transition-all font-medium text-sm shadow-sm"
                  />
                </div>
              </div>

              {/* Role Selection Toggle */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Votre Rôle</label>
                <div className="grid grid-cols-2 gap-3">
                   <button 
                     type="button" 
                     onClick={() => setFormData({...formData, role: 'customer'})}
                     className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all group ${formData.role === 'customer' ? 'border-sage bg-sage/5 shadow-inner' : 'border-slate-100 bg-white hover:border-sage/20'}`}
                   >
                     <UserCheck size={20} className={formData.role === 'customer' ? 'text-sage' : 'text-slate-300 group-hover:text-sage/40'} />
                     <p className={`text-[10px] font-black uppercase tracking-widest ${formData.role === 'customer' ? 'text-sage' : 'text-slate-400'}`}>Client</p>
                   </button>
                   <button 
                     type="button" 
                     onClick={() => setFormData({...formData, role: 'pépiniériste'})}
                     className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all group ${formData.role === 'pépiniériste' ? 'border-sage bg-sage/5 shadow-inner' : 'border-slate-100 bg-white hover:border-sage/20'}`}
                   >
                     <Store size={20} className={formData.role === 'pépiniériste' ? 'text-sage' : 'text-slate-300 group-hover:text-sage/40'} />
                     <p className={`text-[10px] font-black uppercase tracking-widest ${formData.role === 'pépiniériste' ? 'text-sage' : 'text-slate-400'}`}>Vendeur</p>
                   </button>
                </div>
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold flex items-center gap-3 border border-red-100"
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
              {loading ? "Création en cours..." : "Créer mon Compte"}
              {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm font-medium pt-4">
            Déjà client ?{' '}
            <Link to="/login" className="text-sage font-black hover:underline underline-offset-4 decoration-2">Connectez-vous</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
