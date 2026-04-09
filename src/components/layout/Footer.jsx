import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/context/ThemeContext';

export default function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`pt-32 pb-12 transition-all duration-700
      ${isDarkMode ? 'bg-[#050505] text-white border-t border-white/5' : 'bg-[#55633C] text-white'}`}>
      
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 lg:gap-12 relative z-10">
        {/* Brand Section */}
        <div className="space-y-10 group">
          <div className="space-y-4">
             <Link to="/" className="text-5xl font-serif text-white tracking-tighter drop-shadow-2xl italic font-black">Sunflowers</Link>
             <div className={`h-[1px] w-20 transition-all group-hover:w-40 ${isDarkMode ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-white/40'}`} />
          </div>
          
          <p className={`text-[15px] leading-[1.8] max-w-sm font-serif italic transition-colors
            ${isDarkMode ? 'text-white/60' : 'text-white/90'}`}>
            "Bringing the pure essence of nature directly to your doorstep. Our premium selection is handcrafted for the truly elegant home."
          </p>
          
          <div className="flex space-x-4 pt-4">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
               <div key={i} className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer shadow-xl
                 ${isDarkMode ? 'bg-white/5 hover:bg-emerald-500 hover:text-white border border-white/5' : 'bg-white/20 hover:bg-slate-900 group-hover:scale-110'}`}>
                 <Icon size={20} strokeWidth={1.5} />
               </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-10">
          <h4 className={`text-[10px] uppercase font-black tracking-[0.4em] transition-colors ${isDarkMode ? 'text-emerald-500' : 'text-white/60'}`}>Collections</h4>
          <ul className="space-y-6 text-[11px] font-black uppercase tracking-widest text-white/50">
            {['Flower Delivery', 'House Plants', 'Aromatherapy Oils', 'Expert Care Guides'].map((item, i) => (
               <li key={i}>
                <Link to="#" className="hover:text-white transition-all flex items-center group">
                   <ArrowUpRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                   {item}
                </Link>
               </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-10">
          <h4 className={`text-[10px] uppercase font-black tracking-[0.4em] transition-colors ${isDarkMode ? 'text-emerald-500' : 'text-white/60'}`}>Atelier Support</h4>
          <ul className="space-y-6 text-[11px] font-black uppercase tracking-widest text-white/50">
            {['Our Heritage Story', 'Shipping & Delivery', 'Contact The Atelier', 'Privacy & Terms'].map((item, i) => (
               <li key={i}>
                <Link to="#" className="hover:text-white transition-all flex items-center group">
                   {item}
                </Link>
               </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-10">
          <h4 className={`text-[10px] uppercase font-black tracking-[0.4em] transition-colors ${isDarkMode ? 'text-emerald-500' : 'text-white/60'}`}>The Botanical Club</h4>
          <div className={`p-8 rounded-[2.5rem] border transition-all ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white/10 border-white/20'}`}>
            <p className="text-[13px] text-white/90 font-bold leading-relaxed mb-8">
              Subscribe to receive exclusive harvesting tips and seasonal offers.
            </p>
            <div className="space-y-4">
              <Input 
                type="email" 
                placeholder="Your email address..." 
                className={`border-none px-6 py-7 rounded-2xl text-[11px] font-black outline-none transition-all
                  ${isDarkMode ? 'bg-white/5 text-white placeholder:text-white/20 focus:bg-white/10' : 'bg-white/20 text-white placeholder:text-white/60'}`} 
              />
              <Button className={`w-full py-7 rounded-2xl font-black tracking-[0.3em] uppercase text-[10px] transition-all shadow-2xl active:scale-95
                ${isDarkMode ? 'bg-emerald-500 text-white hover:bg-emerald-400' : 'bg-white text-slate-900 hover:bg-slate-100'}`}>
                Join Atelier
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Line */}
      <div className={`container mx-auto px-6 mt-32 pt-10 border-t flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] gap-6 transition-colors
        ${isDarkMode ? 'border-white/5 text-white/20' : 'border-white/10 text-white/60'}`}>
        <p>© 2026 Sunflowers Botanical Heritage.</p>
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2">
              <ShieldCheck size={14} className={isDarkMode ? 'text-emerald-500' : 'text-white'} />
              <span>Sustainable Harvest Only</span>
           </div>
           <span className="opacity-20">|</span>
           <span>Agadir, Morocco</span>
        </div>
      </div>
    </footer>
  );
}
