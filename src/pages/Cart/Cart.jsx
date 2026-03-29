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
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const shipping = 15;
  const total = subtotal + shipping;

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate API call for payment
    setTimeout(() => {
      setIsProcessing(false);
      setIsConfirmed(true);
    }, 2500);
  };

  return (
    <div className="pt-24 min-h-screen bg-parchment/10 pb-32">
      {/* Order Confirmation Modal */}
      <AnimatePresence>
        {isConfirmed && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center bg-parchment/80 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, type: 'spring' }}
              className="bg-white p-12 md:p-16 max-w-lg w-full flex flex-col items-center text-center shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-sage/20 relative"
            >
               <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mb-8 relative">
                 <motion.div 
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ delay: 0.4, type: 'spring' }}
                   className="absolute inset-0 bg-sage rounded-full"
                 />
                 <CheckCircle2 size={32} className="text-white relative z-10" />
               </div>
               
               <h2 className="text-3xl font-serif text-charcoal mb-4">Order Confirmed</h2>
               <p className="text-charcoal/60 leading-relaxed mb-10 text-sm">
                 Thank you for your purchase. Your exquisite botanical selection is being carefully prepared by our artisans. An email receipt has been sent to you.
               </p>
               
               <div className="w-full space-y-4">
                 <div className="flex justify-between items-center py-4 border-b border-border text-sm">
                   <span className="text-charcoal/50 uppercase tracking-widest text-[10px] font-bold">Order Number</span>
                   <span className="font-bold text-charcoal font-sans">#GARD-9042</span>
                 </div>
                 <div className="flex justify-between items-center py-4 border-b border-border text-sm">
                   <span className="text-charcoal/50 uppercase tracking-widest text-[10px] font-bold">Total Paid</span>
                   <span className="font-bold text-charcoal font-sans">{total} DH</span>
                 </div>
               </div>

               <Button onClick={() => setIsConfirmed(false)} className="w-full mt-12 bg-slate-900 text-white hover:bg-sage h-14 rounded-none uppercase tracking-[0.2em] text-[10px] font-bold shadow-xl transition-all duration-500">
                  Return to Boutique
               </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="container mx-auto px-6 py-16 text-center space-y-6">
         <span className="text-[10px] uppercase tracking-[0.4em] text-sage font-bold">Review</span>
         <h1 className="text-3xl md:text-5xl text-charcoal">Botanical Basket</h1>
         <Link to="/shop/all" className="inline-flex items-center space-x-2 text-[10px] uppercase font-bold tracking-widest text-charcoal/40 hover:text-charcoal transition-colors underline underline-offset-8 decoration-sage/30 hover:decoration-sage">
            <ArrowLeft size={14} /> <span>Continue Exploring</span>
         </Link>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-32 py-12">
        {/* Cart List */}
        <div className="lg:col-span-2 space-y-8">
           {items.length === 0 ? (
             <div className="text-center py-24 space-y-8">
               <p className="text-charcoal/60 font-sans italic">Your basket is currently empty.</p>
               <Button asChild variant="outline" className="rounded-none border-charcoal/30 px-12 py-8 uppercase tracking-[0.2em] text-[10px] font-bold">
                  <Link to="/shop/all">Visit our collections</Link>
               </Button>
             </div>
           ) : (
             <div className="space-y-12">
               <AnimatePresence>
                 {items.map((item) => (
                   <motion.div 
                     key={item.id}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: 20 }}
                     className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-10 p-10 bg-white shadow-xl group border border-border"
                   >
                     <div className="w-32 h-40 bg-parchment/30 overflow-hidden relative shadow-lg">
                       <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                     </div>
                     
                     <div className="flex-1 space-y-6 w-full">
                       <div className="flex justify-between items-start">
                         <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-charcoal/40 font-bold">{item.category}</span>
                            <h3 className="text-2xl font-serif text-charcoal">{item.name}</h3>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-sage mt-2">{item.size} Edition</p>
                         </div>
                         <button onClick={() => removeItem(item.id, item.size)} className="text-charcoal/30 hover:text-charcoal transition-colors p-2">
                           <X size={20} />
                         </button>
                       </div>

                       <div className="flex justify-between items-center pt-6 border-t border-border">
                          <div className="flex items-center border border-border bg-parchment/10 h-10 px-2">
                            <button onClick={() => updateQuantity(item.id, item.size, -1)} className="px-3 hover:text-sage transition-colors"><Minus size={14} /></button>
                            <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.size, 1)} className="px-3 hover:text-sage transition-colors"><Plus size={14} /></button>
                          </div>
                          <span className="text-lg font-sans text-charcoal/80">{item.price * item.quantity} DH</span>
                       </div>
                     </div>
                   </motion.div>
                 ))}
               </AnimatePresence>
             </div>
           )}

           {/* Delivery Details Form */}
           {items.length > 0 && (
             <div className="bg-white p-6 sm:p-10 shadow-xl border border-border mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="border-b border-border pb-6 flex items-center justify-between">
                   <h3 className="text-2xl font-serif text-charcoal">Delivery Details</h3>
                   <span className="text-[10px] uppercase font-bold tracking-widest text-sage">Required Info</span>
                </div>
                
                <div className="space-y-6">
                   {/* Personal Message */}
                   <div className="space-y-2 group">
                     <label className="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-widest text-charcoal/60 group-focus-within:text-sage transition-colors">
                        <MessageSquare size={14} className="text-sage" />
                        <span>Add a personal message</span>
                     </label>
                     <textarea rows="2" placeholder="Write your botanical message..." className="w-full bg-[#fbfbfb] border border-border p-4 text-sm focus:outline-none focus:border-sage/40 focus:ring-4 focus:ring-sage/5 transition-all resize-none placeholder:italic placeholder:text-charcoal/30 text-charcoal font-medium" />
                   </div>

                   {/* Grid for Date & Time */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 group">
                        <label className="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-widest text-charcoal/60 group-focus-within:text-sage transition-colors">
                           <Clock size={14} className="text-sage" />
                           <span>Delivery Time Slot</span>
                        </label>
                        <select className="w-full bg-[#fbfbfb] border border-border p-4 text-sm focus:outline-none focus:border-sage/40 focus:ring-4 focus:ring-sage/5 transition-all text-charcoal font-medium cursor-pointer outline-none appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%208l5%205%205-5%22%20fill%3D%22none%22%20stroke%3D%22%238C9B50%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center]">
                           <option>No preference</option>
                           <option>Morning (9:00 - 12:00)</option>
                           <option>Afternoon (14:00 - 18:00)</option>
                        </select>
                      </div>

                      <div className="space-y-2 group">
                        <label className="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-widest text-charcoal/60 group-focus-within:text-sage transition-colors">
                           <Calendar size={14} className="text-sage" />
                           <span>Delivery Date</span>
                        </label>
                        <input type="date" className="w-full bg-[#fbfbfb] border border-border p-4 text-sm focus:outline-none focus:border-sage/40 focus:ring-4 focus:ring-sage/5 transition-all text-charcoal font-medium cursor-pointer outline-none" />
                      </div>
                   </div>

                   {/* Recipient Info */}
                   <div className="space-y-2 group">
                     <label className="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-widest text-charcoal/60 group-focus-within:text-sage transition-colors">
                        <User size={14} className="text-sage" />
                        <span>Full Name And Address Of The Recipient *</span>
                     </label>
                     <textarea rows="2" placeholder="Enter recipient complete details..." className="w-full bg-[#fbfbfb] border border-border p-4 text-sm focus:outline-none focus:border-sage/40 focus:ring-4 focus:ring-sage/5 transition-all resize-none placeholder:italic placeholder:text-charcoal/30 text-charcoal font-medium" />
                   </div>

                   <div className="space-y-2 group">
                     <label className="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-widest text-charcoal/60 group-focus-within:text-sage transition-colors">
                        <Phone size={14} className="text-sage" />
                        <span>Phone Number Of The Recipient *</span>
                     </label>
                     <input type="tel" placeholder="+212 600 000 000" className="w-full bg-[#fbfbfb] border border-border p-4 text-sm focus:outline-none focus:border-sage/40 focus:ring-4 focus:ring-sage/5 transition-all text-charcoal font-medium outline-none placeholder:italic placeholder:text-charcoal/30" />
                   </div>

                   {/* City */}
                   <div className="pt-8 mt-8 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-1">
                         <span className="text-[10px] uppercase font-black tracking-[0.2em] text-charcoal flex items-center gap-2">
                            <MapPin size={16} className="text-sage" /> 
                            The City of Delivery :
                         </span>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                         <div className="w-full sm:w-auto flex items-center justify-center gap-2 bg-sage text-white px-8 py-3.5 shadow-lg shadow-sage/30 border border-sage font-black text-[11px] uppercase tracking-widest leading-none outline-none">
                            <CheckCircle2 size={16} />
                            Agadir
                         </div>
                         <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 border border-border text-charcoal/60 hover:text-charcoal hover:bg-parchment/10 hover:border-charcoal/30 transition-all text-[11px] uppercase tracking-widest font-black leading-none group bg-white shadow-sm outline-none">
                            <MapPin size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                            Change city
                         </button>
                      </div>
                   </div>
                </div>
             </div>
           )}

           {/* Payment Method Form */}
           {items.length > 0 && (
             <div className="bg-white p-6 sm:p-10 shadow-xl border border-border mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                <div className="border-b border-border pb-6 flex items-center justify-between">
                   <h3 className="text-2xl font-serif text-charcoal">Payment Method</h3>
                   <div className="flex gap-2">
                     <span className="text-[10px] uppercase font-bold tracking-widest text-charcoal/40 flex items-center gap-1"><Lock size={12} /> Secure</span>
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="space-y-2 group">
                     <label className="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-widest text-charcoal/60 group-focus-within:text-sage transition-colors">
                        <CreditCard size={14} className="text-sage" />
                        <span>Card Information *</span>
                     </label>
                     <div className="relative">
                       <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-[#fbfbfb] border border-border p-4 pl-12 text-sm focus:outline-none focus:border-sage/40 focus:ring-4 focus:ring-sage/5 transition-all text-charcoal font-medium outline-none placeholder:text-charcoal/20 tracking-widest" />
                       <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20" />
                     </div>
                   </div>

                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2 group">
                        <label className="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-widest text-charcoal/60 group-focus-within:text-sage transition-colors">
                           <span>Expiry Date *</span>
                        </label>
                        <input type="text" placeholder="MM/YY" className="w-full bg-[#fbfbfb] border border-border p-4 text-sm focus:outline-none focus:border-sage/40 focus:ring-4 focus:ring-sage/5 transition-all text-charcoal font-medium outline-none placeholder:text-charcoal/20 tracking-widest" />
                      </div>
                      <div className="space-y-2 group">
                        <label className="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-widest text-charcoal/60 group-focus-within:text-sage transition-colors">
                           <span>CVC *</span>
                        </label>
                        <input type="text" placeholder="123" className="w-full bg-[#fbfbfb] border border-border p-4 text-sm focus:outline-none focus:border-sage/40 focus:ring-4 focus:ring-sage/5 transition-all text-charcoal font-medium outline-none placeholder:text-charcoal/20 tracking-widest" />
                      </div>
                   </div>
                </div>
             </div>
           )}

           {/* Why Us? */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
              <div className="flex items-center space-x-4 p-8 bg-sage/5 border border-sage/10">
                 <Truck size={24} className="text-sage" strokeWidth={1} />
                 <p className="text-[10px] uppercase font-bold tracking-widest leading-relaxed">Artisanal White-Glove Delivery Included</p>
              </div>
              <div className="flex items-center space-x-4 p-8 bg-sage/5 border border-sage/10">
                 <ShieldCheck size={24} className="text-sage" strokeWidth={1} />
                 <p className="text-[10px] uppercase font-bold tracking-widest leading-relaxed">Hand-written Botanical Card Included</p>
              </div>
           </div>
        </div>

        {/* Summary */}
        <div className="space-y-8 h-fit lg:sticky lg:top-[120px]">
           <div className="bg-white p-12 shadow-2xl space-y-10 border border-border">
              <h3 className="text-2xl font-serif text-charcoal border-b border-border pb-6">Order Statement</h3>
              
              <div className="space-y-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-charcoal/60 uppercase tracking-widest text-[10px] font-bold">Subtotal</span>
                  <span className="font-sans font-medium text-lg leading-none">{subtotal} DH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60 uppercase tracking-widest text-[10px] font-bold">Exquisite Shipping</span>
                  <span className="font-sans font-medium text-lg leading-none">{shipping} DH</span>
                </div>
              </div>

              <div className="pt-10 border-t border-border flex justify-between items-baseline">
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-charcoal">Total Amount</span>
                <span className="text-2xl font-serif text-charcoal leading-none">{total} <span className="text-[10px] font-sans text-charcoal/30 uppercase tracking-widest font-black ml-2">DH</span></span>
              </div>

              <div className="space-y-4 pt-4">
                 <Button 
                   onClick={handlePayment}
                   disabled={isProcessing}
                   className="w-full bg-slate-900 text-white hover:bg-sage disabled:bg-slate-900/60 h-16 rounded-none uppercase tracking-[0.3em] text-[10px] font-bold shadow-2xl transition-all duration-500 group relative overflow-hidden"
                 >
                    {isProcessing ? (
                       <span className="flex items-center gap-3"><Loader2 size={18} className="animate-spin" /> Processing Securely...</span>
                    ) : (
                       <span className="flex items-center justify-center"><ShieldCheck size={18} className="mr-3 group-hover:scale-110 transition-transform" /> Secure Finalization</span>
                    )}
                 </Button>
                 <p className="text-[10px] text-center text-charcoal/40 uppercase tracking-widest leading-relaxed font-bold">Tax calculated at checkout if applicable.</p>
              </div>
           </div>

           <div className="bg-parchment/60 p-8 text-center space-y-4 shadow-sm border border-border/50">
              <p className="text-[10px] uppercase tracking-widest text-charcoal/60 font-bold italic">Need Botanical Advice?</p>
              <button className="underline text-charcoal/40 text-[10px] uppercase font-bold tracking-widest hover:text-sage transition-colors">Chat with our Lead Florist</button>
           </div>
        </div>
      </div>
    </div>
  );
}
