import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  ChevronRight, 
  X, 
  Minus, 
  Plus, 
  Truck, 
  ShieldCheck, 
  ArrowLeft,
  MessageSquare,
  Clock,
  Calendar,
  User,
  Phone,
  MapPin,
  CheckCircle2,
  CreditCard,
  Lock,
  Loader2,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const { isDarkMode } = useTheme();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const shipping = 15;
  const total = subtotal + shipping;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsConfirmed(true);
    }, 2500);
  };

  return (
    <div className={`pt-24 min-h-screen transition-colors duration-700 ${isDarkMode ? 'bg-[#090909]' : 'bg-[#FCFCFB]'}`}>
      
      {/* Order Confirmation Modal */}
      <AnimatePresence>
        {isConfirmed && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className={`p-12 md:p-16 max-w-lg w-full flex flex-col items-center text-center rounded-[3.5rem] border shadow-2xl relative
                ${isDarkMode ? 'bg-[#141414] border-white/10 text-white' : 'bg-white border-slate-100'}`}
            >
               <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-10 relative
                 ${isDarkMode ? 'bg-emerald-500/20' : 'bg-sage/10'}`}>
                 <motion.div 
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-emerald-500 shadow-[0_0_30px_#10b981]' : 'bg-sage'}`}
                 />
                 <CheckCircle2 size={40} className="text-white relative z-10" />
               </div>
               
               <h2 className="text-4xl font-serif font-black italic tracking-tight mb-4">Mission Success</h2>
               <p className={`leading-relaxed mb-10 text-sm font-bold ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>
                 Everything is set. Your exquisite botanical selection is being carefully prepared by our artisans.
               </p>
               
               <div className={`w-full space-y-4 p-8 rounded-3xl ${isDarkMode ? 'bg-white/5' : 'bg-slate-50'}`}>
                 <div className="flex justify-between items-center py-4 border-b border-white/5">
                   <span className="opacity-40 uppercase tracking-widest text-[9px] font-black">Tracking Number</span>
                   <span className="font-black">#BOT-9042</span>
                 </div>
                 <div className="flex justify-between items-center py-4">
                   <span className="opacity-40 uppercase tracking-widest text-[9px] font-black">Total Debited</span>
                   <span className="font-black text-lg">{total} DH</span>
                 </div>
               </div>

               <Button onClick={() => setIsConfirmed(false)} className={`w-full mt-12 h-16 rounded-2xl uppercase tracking-[0.3em] text-[10px] font-black shadow-2xl transition-all
                 ${isDarkMode ? 'bg-emerald-500 text-white hover:bg-emerald-400' : 'bg-slate-900 text-white hover:bg-sage'}`}>
                  Explore Fresh Harvests
               </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="container mx-auto px-6 py-20 text-center space-y-8">
         <div className="flex items-center justify-center gap-3">
            <Sparkles className={isDarkMode ? 'text-emerald-500' : 'text-sage'} size={18} />
            <span className={`text-[10px] font-black uppercase tracking-[0.5em] transition-colors ${isDarkMode ? 'text-emerald-500' : 'text-sage'}`}>Botanical Basket</span>
         </div>
         <h1 className={`text-4xl md:text-7xl font-serif font-black italic tracking-tighter transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>My Selection</h1>
         <Link to="/shop/all" className={`inline-flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest transition-colors ${isDarkMode ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
            <ArrowLeft size={16} /> <span>Return to Collection</span>
         </Link>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 py-12 pb-40">
        
        {/* Left Column: Cart Items & Forms */}
        <div className="lg:col-span-2 space-y-12">
           {items.length === 0 ? (
             <div className={`text-center py-32 rounded-[4rem] border-2 border-dashed transition-all
               ${isDarkMode ? 'bg-white/[0.02] border-white/5 text-white/60' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                <ShoppingBag size={64} className="mx-auto mb-8 opacity-20" />
                <p className="font-serif italic text-2xl mb-10">Your basket is currently empty.</p>
                <Button asChild className={`rounded-2xl px-12 py-8 uppercase tracking-[0.3em] text-[10px] font-black
                   ${isDarkMode ? 'bg-emerald-500 text-white hover:bg-emerald-400' : 'bg-slate-900 text-white hover:bg-sage'}`}>
                   <Link to="/shop/all">Visit our collections</Link>
                </Button>
             </div>
           ) : (
             <div className="space-y-8">
               <AnimatePresence>
                 {items.map((item) => (
                   <motion.div 
                     key={item.id}
                     layout
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.95 }}
                     className={`flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-12 p-8 rounded-[3.5rem] border shadow-2xl transition-all duration-700
                       ${isDarkMode ? 'bg-[#141414] border-white/5 shadow-black' : 'bg-white border-slate-100 shadow-slate-100/50'}`}
                   >
                     <div className="w-40 h-52 shrink-0 rounded-[2.5rem] overflow-hidden relative shadow-xl">
                       <img src={item.image} className={`w-full h-full object-cover transition-transform duration-1000 ${isDarkMode ? 'brightness-75' : ''}`} />
                     </div>
                     
                     <div className="flex-1 space-y-8 w-full">
                       <div className="flex justify-between items-start">
                          <div className="space-y-2">
                             <span className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors
                               ${isDarkMode ? 'text-emerald-500' : 'text-sage'}`}>{item.category}</span>
                             <h3 className={`text-3xl font-serif font-black italic tracking-tighter transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.name}</h3>
                             <p className={`text-[10px] font-black uppercase tracking-widest opacity-60 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.size} EDITION</p>
                          </div>
                          <button onClick={() => removeItem(item.id, item.size)} className={`p-3 rounded-2xl transition-all
                            ${isDarkMode ? 'bg-white/5 text-white/20 hover:text-rose-500 hover:bg-rose-500/10 shadow-black' : 'bg-slate-50 text-slate-300 hover:text-rose-500 shadow-sm shadow-slate-200'}`}>
                            <X size={20} />
                          </button>
                       </div>

                       <div className={`flex justify-between items-center pt-8 border-t transition-colors ${isDarkMode ? 'border-white/5' : 'border-slate-50'}`}>
                          <div className={`flex items-center rounded-2xl h-14 px-4 border
                            ${isDarkMode ? 'bg-white/5 border-white/5 text-white shadow-black' : 'bg-slate-50 border-slate-100 shadow-sm shadow-slate-200'}`}>
                             <button onClick={() => updateQuantity(item.id, item.size, -1)} className="px-3 hover:scale-125 transition-transform"><Minus size={14} /></button>
                             <span className="w-10 text-center font-black text-lg">{item.quantity}</span>
                             <button onClick={() => updateQuantity(item.id, item.size, 1)} className="px-3 hover:scale-125 transition-transform"><Plus size={14} /></button>
                          </div>
                          <span className={`text-2xl font-serif font-black italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.price * item.quantity} DH</span>
                       </div>
                     </div>
                   </motion.div>
                 ))}
               </AnimatePresence>
             </div>
           )}

           {/* Forms Section */}
           {items.length > 0 && (
             <div className="space-y-8">
               {/* Delivery Details */}
               <div className={`p-10 sm:p-14 rounded-[4rem] border shadow-2xl transition-all duration-700
                 ${isDarkMode ? 'bg-[#141414] border-white/5 shadow-black text-white' : 'bg-white border-slate-100 text-slate-900'}`}>
                  <div className="flex items-center justify-between mb-12 border-b transition-colors pb-8 border-white/5">
                     <h3 className="text-3xl font-serif font-black italic tracking-tighter">Delivery Details</h3>
                     <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-emerald-500' : 'text-sage'}`}>REQUIRED INFORMATION</span>
                  </div>
                  
                  <div className="space-y-10">
                     <FormRow icon={MessageSquare} label="Botanical Message" isDark={isDarkMode}>
                        <textarea rows="2" placeholder="Write your personalized message..." 
                          className={`w-full p-5 rounded-2xl text-[13px] font-bold outline-none transition-all resize-none
                            ${isDarkMode ? 'bg-white/5 text-white placeholder:text-white/20 focus:bg-white/10' : 'bg-slate-50 text-slate-950 placeholder:italic'}`} />
                     </FormRow>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <FormRow icon={Clock} label="Target Slot" isDark={isDarkMode}>
                           <select className={`w-full p-5 rounded-2xl text-[13px] font-bold outline-none cursor-pointer appearance-none transition-all
                             ${isDarkMode ? 'bg-white/5 text-white focus:bg-white/10' : 'bg-slate-50 text-slate-950 shadow-inner appearance-none bg-[url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%208l5%205%205-5%22%20fill%3D%22none%22%20stroke%3D%22%238C9B50%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E")] bg-no-repeat bg-[position:right_1.5rem_center]'}`}>
                              <option className={isDarkMode ? 'bg-zinc-900' : ''}>No preference</option>
                              <option className={isDarkMode ? 'bg-zinc-900' : ''}>Morning (9:00 - 12:00)</option>
                              <option className={isDarkMode ? 'bg-zinc-900' : ''}>Afternoon (14:00 - 18:00)</option>
                           </select>
                        </FormRow>
                        <FormRow icon={Calendar} label="Mission Date" isDark={isDarkMode}>
                           <input type="date" className={`w-full p-5 rounded-2xl text-[13px] font-bold outline-none cursor-pointer transition-all
                             ${isDarkMode ? 'bg-white/5 text-white focus:bg-white/10' : 'bg-slate-50 text-slate-950 shadow-inner'}`} />
                        </FormRow>
                     </div>

                     <FormRow icon={User} label="Recipient Identity & Address" isDark={isDarkMode}>
                        <textarea rows="2" placeholder="Full name and complete building details..." 
                          className={`w-full p-5 rounded-2xl text-[13px] font-bold outline-none transition-all resize-none
                            ${isDarkMode ? 'bg-white/5 text-white placeholder:text-white/20 focus:bg-white/10' : 'bg-slate-50 text-slate-950 placeholder:italic'}`} />
                     </FormRow>

                     <FormRow icon={Phone} label="Direct Contact Number" isDark={isDarkMode}>
                        <input type="tel" placeholder="+212 600 000 000" 
                          className={`w-full p-5 rounded-2xl text-[13px] font-bold outline-none transition-all
                            ${isDarkMode ? 'bg-white/5 text-white placeholder:text-white/20 focus:bg-white/10' : 'bg-slate-50 text-slate-950 placeholder:italic'}`} />
                     </FormRow>

                     <div className={`pt-12 mt-12 border-t flex flex-col md:flex-row md:items-center justify-between gap-8 transition-colors ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                        <div className="flex items-center gap-4">
                           <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-slate-50'}`}>
                              <MapPin size={24} className={isDarkMode ? 'text-emerald-500' : 'text-sage'} />
                           </div>
                           <span className="text-sm font-black uppercase tracking-[0.2em] opacity-40">Delivery HUB :</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className={`px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest leading-none shadow-xl
                             ${isDarkMode ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-sage text-white shadow-sage/20'}`}>
                              AGADIR
                           </div>
                           <button className={`px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest leading-none border transition-all
                             ${isDarkMode ? 'bg-white/5 border-white/5 text-white hover:bg-white/10' : 'bg-white border-slate-100 text-slate-900 shadow-xl shadow-slate-100 hover:border-slate-900'}`}>
                              CHANGE
                           </button>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Payment Method */}
               <div className={`p-10 sm:p-14 rounded-[4rem] border shadow-2xl transition-all duration-700
                 ${isDarkMode ? 'bg-[#141414] border-white/5 shadow-black text-white' : 'bg-white border-slate-100 text-slate-900'}`}>
                  <div className="flex items-center justify-between mb-12 border-b transition-colors pb-8 border-white/5">
                     <h3 className="text-3xl font-serif font-black italic tracking-tighter">Secure Checkout</h3>
                     <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">
                        <Lock size={12} strokeWidth={3} /> TLS SECURED
                     </div>
                  </div>

                  <div className="space-y-10">
                     <FormRow icon={CreditCard} label="Card Information" isDark={isDarkMode}>
                        <div className="relative">
                          <input type="text" placeholder="0000 0000 0000 0000" 
                            className={`w-full p-5 pl-14 rounded-2xl text-[14px] font-black outline-none tracking-[0.3em] transition-all
                              ${isDarkMode ? 'bg-white/5 text-white placeholder:text-white/20 focus:bg-white/10' : 'bg-slate-50 text-slate-950 placeholder:text-slate-200'}`} />
                          <CreditCard size={20} className="absolute left-5 top-1/2 -translate-y-1/2 opacity-20" />
                        </div>
                     </FormRow>

                     <div className="grid grid-cols-2 gap-10">
                        <FormRow label="Expiry" isDark={isDarkMode}>
                           <input type="text" placeholder="MM/YY" 
                              className={`w-full p-5 rounded-2xl text-[14px] font-black outline-none tracking-[0.3em] transition-all text-center
                                ${isDarkMode ? 'bg-white/5 text-white placeholder:text-white/20 focus:bg-white/10' : 'bg-slate-50 text-slate-950 placeholder:text-slate-200'}`} />
                        </FormRow>
                        <FormRow label="CVC" isDark={isDarkMode}>
                           <input type="text" placeholder="***" 
                              className={`w-full p-5 rounded-2xl text-[14px] font-black outline-none tracking-[0.3em] transition-all text-center
                                ${isDarkMode ? 'bg-white/5 text-white placeholder:text-white/20 focus:bg-white/10' : 'bg-slate-50 text-slate-950 placeholder:text-slate-200'}`} />
                        </FormRow>
                     </div>
                  </div>
               </div>
            </div>
           )}
        </div>

        {/* Right Column: Order Summary */}
        <aside className="space-y-10 h-fit lg:sticky lg:top-[120px]">
           <div className={`p-12 rounded-[4rem] border shadow-2xl space-y-12 transition-all duration-700
             ${isDarkMode ? 'bg-[#141414] border-white/5 shadow-black text-white' : 'bg-white border-slate-100 text-slate-900/90'}`}>
              <div className="border-b transition-colors pb-8 border-white/5">
                <h3 className="text-3xl font-serif font-black italic tracking-tighter">Order Statement</h3>
              </div>
              
              <div className="space-y-8">
                <SummaryItem label="SUBTOTAL" value={`${subtotal} DH`} isDark={isDarkMode} />
                <SummaryItem label="EXQUISITE HANDLING" value={`${shipping} DH`} isDark={isDarkMode} />
                
                <div className={`pt-10 border-t flex flex-col items-end transition-colors ${isDarkMode ? 'border-white/10' : 'border-slate-100'}`}>
                  <span className={`text-[10px] font-black uppercase tracking-[0.5em] mb-3 ${isDarkMode ? 'text-white/60' : 'opacity-40'}`}>GRAND TOTAL</span>
                  <div className="flex items-baseline gap-4">
                    <span className="text-5xl font-serif font-black italic tracking-tighter">{total}</span>
                    <span className="text-sm font-black uppercase tracking-widest opacity-20">DH</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-6">
                 <Button 
                   onClick={handlePayment}
                   disabled={isProcessing || items.length === 0}
                   className={`w-full h-20 rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all hover:scale-[1.02] active:scale-95 group relative overflow-hidden
                     ${isDarkMode 
                        ? 'bg-emerald-500 text-white hover:bg-emerald-400 disabled:bg-white/5 shadow-emerald-500/20' 
                        : 'bg-slate-900 text-white hover:bg-sage disabled:bg-slate-200 shadow-slate-900/10'}`}
                 >
                    {isProcessing ? (
                       <span className="flex items-center gap-4"><Loader2 size={18} className="animate-spin" /> EXECUTING TRANSACTION...</span>
                    ) : (
                       <span className="flex items-center justify-center"><ShieldCheck size={20} className="mr-4 group-hover:scale-110 transition-transform" /> FINALIZE PURCHASE</span>
                    )}
                 </Button>
                 <p className={`text-[9px] text-center uppercase tracking-[0.2em] font-black ${isDarkMode ? 'text-white/50' : 'opacity-30'}`}>Secure botanical trade protected by SunFlowers</p>
              </div>
           </div>

           <div className={`p-10 rounded-[3rem] border transition-all text-center space-y-6
             ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex items-center justify-center gap-3">
                 <Clock size={16} className={isDarkMode ? 'text-emerald-500' : 'text-sage'} />
                 <p className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Need Expert Advice?</p>
              </div>
              <button className={`text-[10px] uppercase font-black tracking-widest underline underline-offset-8 transition-colors
                ${isDarkMode ? 'text-emerald-500 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Chat with our Lead Florist</button>
           </div>
        </aside>
      </div>
    </div>
  );
}

function FormRow({ icon: Icon, label, children, isDark }) {
  return (
    <div className="space-y-4 group">
      <label className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] transition-colors
        ${isDark ? 'group-focus-within:text-emerald-500 text-white/60' : 'group-focus-within:text-sage text-slate-400'}`}>
         {Icon && <Icon size={14} className={isDark ? 'text-emerald-500' : 'text-sage'} />}
         <span>{label}</span>
      </label>
      {children}
    </div>
  );
}

function SummaryItem({ label, value, isDark }) {
  return (
    <div className="flex justify-between items-center group">
      <span className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${isDark ? 'text-white/60 group-hover:text-emerald-500' : 'text-slate-400 group-hover:text-sage'}`}>{label}</span>
      <span className={`text-xl font-serif font-black italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</span>
    </div>
  );
}
