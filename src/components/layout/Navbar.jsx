import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop All', path: '/shop/all' },
    { name: 'Flowers', path: '/shop/flowers' },
    { name: 'Plants', path: '/shop/plants' },
    { name: 'Essential Oils', path: '/shop/oils' },
    { name: 'Botanical Guides', path: '/guides' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md border-border py-4' 
          : 'bg-transparent border-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-charcoal"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="text-2xl font-serif tracking-tight text-charcoal absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
          Sunflowers
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-charcoal/70 hover:text-charcoal transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 lg:space-x-6">
          <button className="text-charcoal hover:scale-110 transition-transform">
            <Search size={22} strokeWidth={1.5} />
          </button>
          <div className="hidden sm:flex items-center">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end mr-2">
                  <span className="text-[10px] font-bold text-charcoal/80 leading-none tracking-tight">{user.name}</span>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="text-[8px] text-sage font-black uppercase tracking-[0.2em] mt-0.5 hover:underline">Admin Panel</Link>
                  )}
                </div>
                <button 
                  onClick={logout}
                  className="text-charcoal hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <User size={22} strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-[10px] font-black uppercase tracking-[0.2em] text-charcoal/60 hover:text-sage transition-all border border-sage/10 px-6 py-2.5 rounded-full hover:bg-sage/5">
                Connexion
              </Link>
            )}
          </div>
          <Link to="/cart" className="text-charcoal hover:scale-110 transition-transform relative">
            <ShoppingBag size={22} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-sage text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[73px] bg-parchment z-40 p-10 animate-in fade-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-serif text-charcoal"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
