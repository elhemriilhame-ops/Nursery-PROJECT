import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-charcoal">
        {/* Brand Section */}
        <div className="space-y-6">
          <Link to="/" className="text-3xl font-serif">Sunflowers</Link>
          <p className="text-sm text-charcoal leading-relaxed max-w-xs">
            Bringing the beauty of nature to your doorstep. Our premium selection of flowers, plants, and essential oils is curated for the elegant home.
          </p>
          <div className="flex space-x-4">
            <Instagram size={20} className="hover:text-sage transition-colors cursor-pointer" />
            <Facebook size={20} className="hover:text-sage transition-colors cursor-pointer" />
            <Twitter size={20} className="hover:text-sage transition-colors cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs uppercase font-sans tracking-widest font-semibold mb-6">Explore</h4>
          <ul className="space-y-4 text-sm text-charcoal">
            <li><Link to="/shop/flowers" className="hover:text-sage">Flower Delivery</Link></li>
            <li><Link to="/shop/plants" className="hover:text-sage">House Plants</Link></li>
            <li><Link to="/shop/oils" className="hover:text-sage">Aromatherapy</Link></li>
            <li><Link to="/guides" className="hover:text-sage">Plant Care Guides</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-xs uppercase font-sans tracking-widest font-semibold mb-6">Support</h4>
          <ul className="space-y-4 text-sm text-charcoal">
            <li><Link to="/about" className="hover:text-sage">Our Story</Link></li>
            <li><Link to="/faq" className="hover:text-sage">Shipping & FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-sage">Contact Us</Link></li>
            <li><Link to="/privacy" className="hover:text-sage">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-6">
          <h4 className="text-xs uppercase font-sans tracking-widest font-semibold mb-6">Join our newsletter</h4>
          <p className="text-sm text-charcoal">Subscribe to receive botanical tips and exclusive offers.</p>
          <div className="flex space-x-2">
            <Input type="email" placeholder="Email address" className="bg-parchment/30 border-border focus-visible:ring-sage" />
            <Button variant="outline" className="border-charcoal hover:bg-charcoal hover:text-white">Join</Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-charcoal font-medium">
        <p>© 2026 Sunflowers Nursery. All rights reserved.</p>
        <p>Crafted for elegance & sustainability.</p>
      </div>
    </footer>
  );
}
