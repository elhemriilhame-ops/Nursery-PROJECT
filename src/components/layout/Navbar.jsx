import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Sun, Moon, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useFavorites } from '@/context/FavoritesContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { favorites } = useFavorites();

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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-border border-b py-4'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button
          className={cn("lg:hidden", isScrolled ? "text-foreground" : "text-white")}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className={cn(
          "text-2xl font-serif tracking-tight absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 transition-colors duration-500", 
          isScrolled 
            ? (isDarkMode ? "text-white" : "text-foreground") 
            : "text-white drop-shadow-md"
        )}>
          Sunflowers
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-[10px] uppercase tracking-[0.25em] font-sans font-bold hover:opacity-100 transition-all", 
                isScrolled 
                  ? (isDarkMode ? "text-white/60 hover:text-white" : "text-foreground/70 hover:text-foreground") 
                  : "text-white/80 hover:text-white drop-shadow-md"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 lg:space-x-6">
          <button 
            onClick={toggleDarkMode}
            className={cn("p-2 rounded-full transition-all duration-500", 
              isScrolled 
                ? (isDarkMode ? "text-amber-400 bg-white/5" : "text-foreground bg-slate-100") 
                : "text-white bg-white/10"
            )}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button className={cn("hover:scale-110 transition-transform", isScrolled ? (isDarkMode ? "text-white" : "text-foreground") : "text-white drop-shadow-md")}>
            <Search size={22} strokeWidth={1.5} />
          </button>
          <div className="hidden sm:flex items-center">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end mr-2">
                  <span className={cn("text-[10px] font-bold leading-none tracking-tight", isScrolled ? "text-foreground" : "text-white drop-shadow-md")}>{user.name}</span>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="text-[8px] text-sage font-black uppercase tracking-[0.2em] mt-0.5 hover:underline">Admin Panel</Link>
                  )}
                </div>
                <button
                  onClick={logout}
                  className={cn("hover:text-red-500 transition-colors", isScrolled ? "text-foreground" : "text-white drop-shadow-md")}
                  title="Logout"
                >
                  <User size={22} strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <Link to="/login" className={cn("text-[10px] font-black uppercase tracking-[0.2em] transition-all px-6 py-2.5 rounded-full", isScrolled ? "text-foreground border border-sage/10 hover:text-sage hover:bg-sage/5" : "text-white border border-white/20 hover:bg-white/10 hover:border-white/40 drop-shadow-md")}>
                Sign In
              </Link>
            )}
          </div>
          <Link to="/favorites" className={cn("hover:scale-110 transition-transform relative", isScrolled ? "text-foreground" : "text-white drop-shadow-md")}>
            <Heart size={22} strokeWidth={1.5} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {favorites.length > 9 ? '9+' : favorites.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className={cn("hover:scale-110 transition-transform relative", isScrolled ? "text-foreground" : "text-white drop-shadow-md")}>
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
