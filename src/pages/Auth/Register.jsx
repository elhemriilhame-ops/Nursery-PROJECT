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
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { useAuth } from '../../context/AuthContext';

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
  const { login } = useAuth(); // Import login from context

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    // MOCK REGISTER BYPASS (While MongoDB is offline)
    setTimeout(() => {
      const mockUser = {
        _id: 'mock-user-' + Date.now(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        token: 'mock-jwt-token',
        // Customer specific data
        ...(formData.role === 'customer' && {
          phone: formData.phone,
          location: formData.location
        }),
        // Seller specific data
        ...(formData.role === 'pépiniériste' && {
          cin: formData.cin,
          specialty: formData.specialty,
          phone: formData.phone,
          location: formData.location,
          commercialRegister: formData.commercialRegister
        }),
        // Delivery specific data
        ...(formData.role === 'livreur' && {
          cin: formData.cin,
          phone: formData.phone,
          location: formData.location,
          vehicleType: formData.vehicleType
        })
      };
      // Instead of logging in right away, we show success and clear form
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
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#FCFCFB] text-charcoal selection:bg-sage/20 selection:text-sage relative">
      <AnimatePresence>
        {success && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, type: 'spring' }}
              className="bg-white p-12 max-w-sm w-full flex flex-col items-center text-center shadow-2xl rounded-[2rem] border border-sage/10 relative"
            >
               <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 relative">
                 <UserCheck size={32} className="text-emerald-500 relative z-10" />
               </div>
               
               <h2 className="text-2xl font-serif font-black text-slate-800 mb-2">Success!</h2>
               <p className="text-slate-900 leading-relaxed mb-8 text-sm">
                 Account Successfully Created.<br/>You can now proceed to login.
               </p>
               
               <Button onClick={() => navigate('/login')} className="w-full bg-sage text-white hover:bg-sage/90 h-14 rounded-2xl font-bold shadow-lg shadow-sage/20 transition-all duration-300">
                  Proceed to Login
               </Button>
               
               <button onClick={() => setSuccess(false)} className="mt-4 text-xs font-bold text-slate-800 hover:text-slate-600 transition-colors uppercase tracking-widest">
                  Close
               </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRoleModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-white p-8 max-w-lg w-full rounded-[2rem] shadow-2xl relative max-h-[90vh] overflow-y-auto border border-sage/10"
            >
               <h2 className="text-2xl font-serif font-black text-slate-800 mb-2 w-full text-center tracking-tight">
                 Almost done!
               </h2>
               <p className="text-center text-slate-500 mb-8 text-sm font-medium">Please provide a few more details to set up your <span className="text-sage font-black uppercase tracking-widest">{formData.role}</span> profile.</p>

               <form onSubmit={handleRegister} className="space-y-6">
                 {formData.role === 'customer' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-900 ml-4">Phone *</label>
                        <div className="relative group">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-sage transition-colors" size={16} />
                          <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="0600000000" className="w-full pl-11 pr-4 py-4 bg-[#fbfbfb] border border-slate-100 rounded-2xl focus:ring-4 focus:ring-sage/5 focus:border-sage/20 outline-none transition-all font-medium text-sm shadow-sm" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-900 ml-4">Main Address *</label>
                        <div className="relative group">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-sage transition-colors" size={16} />
                          <input name="location" value={formData.location} onChange={handleChange} required placeholder="Number, rue, City name..." className="w-full pl-11 pr-4 py-4 bg-[#fbfbfb] border border-slate-100 rounded-2xl focus:ring-4 focus:ring-sage/5 focus:border-sage/20 outline-none transition-all font-medium text-sm shadow-sm" />
                        </div>
                      </div>
                    </div>
                 )}

                 {(formData.role === 'pépiniériste' || formData.role === 'livreur') && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-900 ml-4">CIN *</label>
                          <div className="relative group"><CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-sage transition-colors" size={16} /><input name="cin" value={formData.cin} onChange={handleChange} required placeholder="AB123456" className="w-full pl-11 pr-4 py-4 bg-[#fbfbfb] border border-slate-100 rounded-2xl focus:ring-4 focus:ring-sage/5 focus:border-sage/20 outline-none transition-all font-medium text-sm shadow-sm" /></div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-900 ml-4">Phone *</label>
                          <div className="relative group"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-sage transition-colors" size={16} /><input name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="0600000000" className="w-full pl-11 pr-4 py-4 bg-[#fbfbfb] border border-slate-100 rounded-2xl focus:ring-4 focus:ring-sage/5 focus:border-sage/20 outline-none transition-all font-medium text-sm shadow-sm" /></div>
                        </div>
                      </div>

                      {formData.role === 'pépiniériste' ? (
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-900 ml-4">Specialty Marketplace *</label>
                          <div className="relative group">
                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-sage transition-colors" size={16} />
                            <select name="specialty" value={formData.specialty} onChange={handleChange} required className="w-full pl-11 pr-4 py-4 bg-[#fbfbfb] border border-slate-100 rounded-2xl focus:ring-4 focus:ring-sage/5 focus:border-sage/20 outline-none transition-all font-medium text-sm shadow-sm appearance-none cursor-pointer text-charcoal">
                              <option value="" disabled>Select your specialty...</option><option value="plants">Plants & Nursery</option><option value="flowers">Flowers & Bouquets</option><option value="oils">Botanical Oils & Care</option>
                            </select>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-900 ml-4">Vehicle Type *</label>
                          <div className="relative group">
                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-sage transition-colors" size={16} />
                            <select name="vehicleType" value={formData.vehicleType || ''} onChange={handleChange} required className="w-full pl-11 pr-4 py-4 bg-[#fbfbfb] border border-slate-100 rounded-2xl focus:ring-4 focus:ring-sage/5 focus:border-sage/20 outline-none transition-all font-medium text-sm shadow-sm appearance-none cursor-pointer text-charcoal">
                              <option value="" disabled>Select vehicle...</option><option value="moto">Motorcycle / Scooter</option><option value="car">Car (Hatchback/Sedan)</option><option value="van">Cargo Van</option><option value="truck">Refrigerated Truck</option>
                            </select>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-900 ml-4">Operating Zones (Location) *</label>
                        <div className="relative group"><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-sage transition-colors" size={16} /><input name="location" value={formData.location} onChange={handleChange} required placeholder="e.g. Nursery Agadir Center" className="w-full pl-11 pr-4 py-4 bg-[#fbfbfb] border border-slate-100 rounded-2xl focus:ring-4 focus:ring-sage/5 focus:border-sage/20 outline-none transition-all font-medium text-sm shadow-sm" /></div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-900 ml-4">Commercial Register or License *</label>
                        <div className="relative group"><Award className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-sage transition-colors" size={16} /><input name="commercialRegister" value={formData.commercialRegister} onChange={handleChange} required placeholder="N° Registre de commerce / Patente..." className="w-full pl-11 pr-4 py-4 bg-[#fbfbfb] border border-slate-100 rounded-2xl focus:ring-4 focus:ring-sage/5 focus:border-sage/20 outline-none transition-all font-medium text-sm shadow-sm" /></div>
                      </div>
                    </div>
                 )}

                 <div className="flex gap-4 pt-6 border-t border-slate-100 mt-8">
                   <button type="button" onClick={() => setShowRoleModal(false)} className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Back</button>
                   <Button type="submit" disabled={loading} className="w-full bg-sage text-white hover:bg-sage/90 py-4 h-auto rounded-2xl font-bold text-sm shadow-lg shadow-sage/20 transition-all duration-300">
                     {loading ? 'Processing...' : 'Complete Setup'}
                   </Button>
                 </div>
               </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <h2 className="text-5xl font-serif font-black mb-6 text-slate-800 leading-tight">Join the <br /> nursery.</h2>
            <p className="text-slate-800 max-w-sm text-lg italic tracking-tight">Share your blooms or discover rare plants from around the world.</p>

            <div className="mt-20 flex flex-col items-start gap-4">
              <div className="flex items-center gap-3 text-sm font-bold text-slate-800">
                <ShieldCheck size={20} className="text-sage" /> Your privacy is protected
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-slate-800">
                <ShieldCheck size={20} className="text-sage" /> Secure payments (Stripe)
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-slate-800">
                <ShieldCheck size={20} className="text-sage" /> Customer support available
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
            <h1 className="text-4xl font-serif font-black tracking-tight text-slate-800 leading-tight">Create your <br /> profile.</h1>
            <p className="text-slate-800 font-medium">Welcome! It's time to join us.</p>
          </div>

          <form onSubmit={handleInitialSubmit} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-900 ml-4">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-sage transition-colors" size={18} />
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    placeholder="e.g. John Doe"
                    className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-[1.2rem] focus:ring-4 focus:ring-sage/5 focus:border-sage/20 outline-none transition-all font-medium text-sm shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-900 ml-4">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-sage transition-colors" size={18} />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="new-email"
                    placeholder="your@email.com"
                    className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-[1.2rem] focus:ring-4 focus:ring-sage/5 focus:border-sage/20 outline-none transition-all font-medium text-sm shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-900 ml-4">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-sage transition-colors" size={18} />
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    placeholder="••••••••••••"
                    className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-[1.2rem] focus:ring-4 focus:ring-sage/5 focus:border-sage/20 outline-none transition-all font-medium text-sm shadow-sm"
                  />
                </div>
              </div>

              {/* Role Selection Toggle */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-slate-900 ml-4">Your Role</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'customer' })}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all group ${formData.role === 'customer' ? 'border-sage bg-sage/5 shadow-inner' : 'border-slate-100 bg-white hover:border-sage/20'}`}
                  >
                    <UserCheck size={18} className={formData.role === 'customer' ? 'text-sage' : 'text-slate-700 group-hover:text-sage/40'} />
                    <p className={`text-[9px] font-black uppercase tracking-widest ${formData.role === 'customer' ? 'text-sage' : 'text-slate-800'}`}>Customer</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'pépiniériste' })}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all group ${formData.role === 'pépiniériste' ? 'border-sage bg-sage/5 shadow-inner' : 'border-slate-100 bg-white hover:border-sage/20'}`}
                  >
                    <Store size={18} className={formData.role === 'pépiniériste' ? 'text-sage' : 'text-slate-700 group-hover:text-sage/40'} />
                    <p className={`text-[9px] font-black uppercase tracking-widest ${formData.role === 'pépiniériste' ? 'text-sage' : 'text-slate-800'}`}>Seller</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'livreur' })}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all group ${formData.role === 'livreur' ? 'border-sage bg-sage/5 shadow-inner' : 'border-slate-100 bg-white hover:border-sage/20'}`}
                  >
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={formData.role === 'livreur' ? 'text-sage' : 'text-slate-700 group-hover:text-sage/40'}><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                    <p className={`text-[9px] font-black uppercase tracking-widest ${formData.role === 'livreur' ? 'text-sage' : 'text-slate-800'}`}>Delivery</p>
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

            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={loading || !formData.role} 
                className="w-full bg-sage text-white hover:bg-sage/90 h-14 rounded-2xl font-bold text-sm shadow-lg shadow-sage/20 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Create Account'}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </div>
          </form>

          <p className="text-center text-slate-800 text-sm font-medium pt-4">
            Already a customer?{' '}
            <Link to="/login" className="text-sage font-black hover:underline underline-offset-4 decoration-2">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
