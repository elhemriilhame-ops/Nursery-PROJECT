import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  return (
    <footer className="bg-[#55633C] text-white pt-24 pb-10 border-t border-[#465331] transition-colors duration-300">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
        {/* Brand Section */}
        <div className="space-y-8">
          <Link to="/" className="text-4xl font-serif text-white tracking-tight drop-shadow-sm">Sunflowers</Link>
          <p className="text-sm text-white/90 leading-loose max-w-sm font-sans font-medium">
            Bringing the pure essence of nature directly to your doorstep. Our premium selection of exquisite flowers, indigenous plants, and artisanal essential oils is handcrafted for the truly elegant home.
          </p>
          <div className="flex space-x-5 pt-2">
            <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-charcoal hover:text-white transition-all cursor-pointer">
              <Instagram size={18} />
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-charcoal hover:text-white transition-all cursor-pointer">
              <Facebook size={18} />
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-charcoal hover:text-white transition-all cursor-pointer">
              <Twitter size={18} />
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-[11px] uppercase font-sans tracking-[0.25em] font-bold mb-8 text-[#D4DFB2]">Explore Collection</h4>
          <ul className="space-y-5 text-[15px] font-sans text-white/90 font-medium">
            <li><Link to="/shop/flowers" className="hover:text-[#D4DFB2] hover:pl-2 transition-all flex items-center">Flower Delivery</Link></li>
            <li><Link to="/shop/plants" className="hover:text-[#D4DFB2] hover:pl-2 transition-all flex items-center">House Plants</Link></li>
            <li><Link to="/shop/oils" className="hover:text-[#D4DFB2] hover:pl-2 transition-all flex items-center">Aromatherapy Oils</Link></li>
            <li><Link to="/guides" className="hover:text-[#D4DFB2] hover:pl-2 transition-all flex items-center">Expert Care Guides</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-[11px] uppercase font-sans tracking-[0.25em] font-bold mb-8 text-[#D4DFB2]">Client Support</h4>
          <ul className="space-y-5 text-[15px] font-sans text-white/90 font-medium">
            <li><Link to="/about" className="hover:text-[#D4DFB2] hover:pl-2 transition-all flex items-center">Our Heritage Story</Link></li>
            <li><Link to="/faq" className="hover:text-[#D4DFB2] hover:pl-2 transition-all flex items-center">Shipping & Delivery</Link></li>
            <li><Link to="/contact" className="hover:text-[#D4DFB2] hover:pl-2 transition-all flex items-center">Contact The Atelier</Link></li>
            <li><Link to="/privacy" className="hover:text-[#D4DFB2] hover:pl-2 transition-all flex items-center">Privacy & Terms</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-6">
          <h4 className="text-[11px] uppercase font-sans tracking-[0.25em] font-bold mb-8 text-[#D4DFB2]">Join The Botanical Club</h4>
          <p className="text-[15px] text-white/90 font-medium leading-relaxed font-sans pb-2">
            Subscribe to receive exclusive harvesting tips, VIP insights, and secret seasonal offers.
          </p>
          <div className="flex flex-col space-y-3">
            <Input 
              type="email" 
              placeholder="Enter your email address..." 
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 px-5 py-6 rounded-none focus-visible:ring-1 focus-visible:ring-white transition-all" 
            />
            <Button className="w-full bg-[#D4DFB2] text-[#2D3430] hover:bg-white hover:text-[#2D3430] font-bold tracking-[0.2em] uppercase text-[11px] py-6 rounded-none transition-colors">
              Subscribe Now
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Bottom Line */}
      <div className="container mx-auto px-6 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-white/70 font-semibold gap-4">
        <p>© 2026 Sunflowers Botanical. All Rights Reserved.</p>
        <div className="flex items-center space-x-2">
           <span>Crafted in Agadir for Elegance</span>
           <span className="text-[#D4DFB2] px-2">♦</span>
           <span>Sustainable Harvest</span>
        </div>
      </div>
    </footer>
  );
}
