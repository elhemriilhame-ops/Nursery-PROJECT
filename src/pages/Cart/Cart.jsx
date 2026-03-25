import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight, X, Minus, Plus, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  const shipping = 15;
  const total = subtotal + shipping;

  return (
    <div className="pt-24 min-h-screen bg-parchment/10 pb-32">
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
                          <span className="text-lg font-sans text-charcoal/80">${item.price * item.quantity} USD</span>
                       </div>
                     </div>
                   </motion.div>
                 ))}
               </AnimatePresence>
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
                  <span className="font-sans font-medium text-lg leading-none">${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60 uppercase tracking-widest text-[10px] font-bold">Exquisite Shipping</span>
                  <span className="font-sans font-medium text-lg leading-none">${shipping}</span>
                </div>
              </div>

              <div className="pt-10 border-t border-border flex justify-between items-baseline">
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-charcoal">Total Amount</span>
                <span className="text-2xl font-serif text-charcoal leading-none">${total} <span className="text-[10px] font-sans text-charcoal/30 uppercase tracking-widest font-black ml-2">USD</span></span>
              </div>

              <div className="space-y-4 pt-4">
                 <Button className="w-full bg-charcoal text-white hover:bg-[var(--maroon)] h-16 rounded-none uppercase tracking-[0.3em] text-[10px] font-bold shadow-2xl transition-all duration-300 group">
                    <ShieldCheck size={18} className="mr-3 group-hover:scale-110 transition-transform" />
                    Secure Finalization
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
