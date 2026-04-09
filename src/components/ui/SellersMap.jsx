import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Star, Clock, ShieldCheck, X, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const sellers = [
  {
    id: 1,
    name: 'Agadir',
    coordinates: [30.4278, -9.5981],
    title: 'Agadir Botanical Oasis',
    description: 'Specializing in endemic succulents and citrus trees from the Souss-Massa region. Our co-op supports over 50 local Amazigh families.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 128,
    responseTime: '< 2 hours',
    location: 'Souss-Massa Region',
    specialty: 'Argan & Succulents',
    products: [
      { id: 'ap1', name: 'Desert Rose Succulent', price: 180, image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e5f?auto=format&fit=crop&q=80&w=300' },
      { id: 'ap2', name: 'Pure Argan Elixir', price: 250, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=300' },
      { id: 'ap3', name: 'Agadir Citrus Sapling', price: 320, image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&q=80&w=300' }
    ]
  },
  {
    id: 2,
    name: 'Marrakech',
    coordinates: [31.6295, -8.0083],
    title: 'Marrakech Royal Blooms',
    description: 'Bespoke floral arrangements for luxury Riads and events. Famous for our Midnight Blush roses and traditional scent extraction.',
    image: '/seller-marrakech.jpg',
    rating: 4.8,
    reviews: 256,
    responseTime: '< 1 hour',
    location: 'Medina, Marrakech',
    specialty: 'Royal Roses',
    products: [
      { id: 'mp1', name: 'Atlas Rose Bouquet', price: 450, image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=300' },
      { id: 'mp2', name: 'Jasmine Fragrance Oil', price: 195, image: 'https://images.unsplash.com/photo-1616949755610-8c9fad0fd98c?auto=format&fit=crop&q=80&w=300' },
      { id: 'mp3', name: 'Velvet Peony Box', price: 580, image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=300' }
    ]
  },
  {
    id: 3,
    name: 'Casablanca',
    coordinates: [33.5731, -7.5898],
    title: 'CasaGreen Atelier',
    description: 'The largest selection of rare tropical indoor plants in Morocco. Our modern nursery serves the entire Atlantic coast.',
    image: '/seller-casablanca.jpg',
    rating: 5.0,
    reviews: 89,
    responseTime: '< 30 mins',
    location: 'Anfa, Casablanca',
    specialty: 'Tropical Rare Finds',
    products: [
      { id: 'cp1', name: 'Giant Monstera Deliciosa', price: 650, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=300' },
      { id: 'cp2', name: 'Fiddle Leaf Fig Premium', price: 850, image: 'https://images.unsplash.com/photo-1597072689227-8882273e8f6a?auto=format&fit=crop&q=80&w=300' },
      { id: 'cp3', name: 'Modern Clay Pot Set', price: 420, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d445?auto=format&fit=crop&q=80&w=300' }
    ]
  },
  {
    id: 4,
    name: 'Tangier',
    coordinates: [35.7595, -5.8339],
    title: 'Tangier Coastal Nursery',
    description: 'Elevated Mediterranean landscape design and coastal-hardy plants. Serving the Strait since 2012.',
    image: '/seller-tangier.jpg',
    rating: 4.7,
    reviews: 142,
    responseTime: '< 4 hours',
    location: 'Marshan, Tangier',
    specialty: 'Mediterranean Herbs',
    products: [
      { id: 'tp1', name: 'Organic Rosemary Bush', price: 120, image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&q=80&w=300' },
      { id: 'tp2', name: 'Blue Lavender Bundle', price: 150, image: 'https://images.unsplash.com/photo-1595908129746-57ca1a63dd4d?auto=format&fit=crop&q=80&w=300' },
      { id: 'tp3', name: 'Terracotta Herb Trio', price: 290, image: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=300' }
    ]
  }
];

function MapUpdater({ activeCoords }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(activeCoords, 8, { animate: true, duration: 2 });
  }, [activeCoords, map]);
  return null;
}

export function SellersMap() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [activeSeller, setActiveSeller] = useState(sellers[0]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const scrollRef = useRef(null);

  const scrollCatalogue = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const themeColors = {
    accent: isDarkMode ? '#10b981' : '#7C9082',
    bg: isDarkMode ? '#090909' : '#FCFCFB',
    card: isDarkMode ? '#141414' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#141414'
  };

  const createCustomIcon = (isActive) => {
    return L.divIcon({
      className: 'bg-transparent border-0',
      html: `<div style="
        background-color: ${isActive ? themeColors.accent : '#2D3430'}; 
        color: white; 
        border-radius: 12px; 
        width: 48px; 
        height: 48px; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        box-shadow: 0 10px 30px rgba(0,0,0,0.5); 
        border: 2px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'white'}; 
        transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1); 
        transform: ${isActive ? 'scale(1.2) rotate(45deg)' : 'scale(1)'};
        z-index: ${isActive ? 1000 : 1};
      ">
        <div style="transform: rotate(${isActive ? '-45deg' : '0deg'}); transition: transform 0.6s;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
      </div>`,
      iconSize: [48, 48],
      iconAnchor: [24, 48],
    });
  };

  return (
    <div className={`w-full py-32 relative overflow-hidden transition-colors duration-700 ${isDarkMode ? 'bg-[#090909]' : 'bg-[#FCFCFB]'}`}>
      
      {/* Decorative background elements */}
      {isDarkMode && (
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      )}

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-stretch">
          
          {/* Map Container */}
          <div className={`w-full lg:w-[60%] rounded-[3.5rem] overflow-hidden relative shadow-2xl h-[550px] md:h-[700px] border transition-all duration-700
            ${isDarkMode ? 'border-white/5 shadow-black' : 'border-slate-100 shadow-slate-200/50'}`}>
            <MapContainer 
              center={[31.7917, -7.0926]} 
              zoom={6} 
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%', zIndex: 1, filter: isDarkMode ? 'invert(100%) hue-rotate(180deg) brightness(85%) contrast(110%)' : 'none' }}
            >
              <TileLayer
                attribution='&copy; Google'
                url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              />
              <MapUpdater activeCoords={activeSeller.coordinates} />
              {sellers.map((seller) => (
                <Marker
                  key={seller.id}
                  position={seller.coordinates}
                  icon={createCustomIcon(activeSeller.id === seller.id)}
                  eventHandlers={{
                    click: () => {
                      setActiveSeller(seller);
                      setIsProfileOpen(true);
                    },
                  }}
                />
              ))}
            </MapContainer>
            
            <div className={`absolute bottom-8 left-8 z-[400] backdrop-blur-xl px-6 py-3 rounded-2xl shadow-2xl text-[10px] uppercase tracking-[0.3em] font-black border transition-all
              ${isDarkMode ? 'bg-black/60 border-white/10 text-emerald-400' : 'bg-white/90 border-slate-100 text-slate-900'}`}>
              Interactive Radar
            </div>
          </div>

          {/* Seller Details Side */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center space-y-12 py-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <Sparkles className={isDarkMode ? 'text-emerald-500' : 'text-sage'} size={18} />
                 <span className={`text-[10px] uppercase tracking-[0.4em] font-black transition-colors ${isDarkMode ? 'text-emerald-500' : 'text-sage'}`}>
                    Trusted Artisans
                 </span>
              </div>
              <h2 className={`text-6xl lg:text-8xl font-serif leading-[0.85] tracking-tighter uppercase italic transition-colors
                ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Artisan <br/> <span className="not-italic opacity-80">Network</span>
              </h2>
              <p className={`font-sans text-xl leading-relaxed max-w-sm transition-colors
                ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>
                We bridge the gap between historic nurseries and modern botanical collectors.
              </p>
            </div>

            <motion.div 
              key={activeSeller.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-10 rounded-[3rem] border shadow-2xl space-y-8 transition-all duration-700 relative overflow-hidden group/card
                ${isDarkMode ? 'bg-[#141414] border-white/10 text-white shadow-black' : 'bg-white border-slate-100 text-slate-800'}`}
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover/card:opacity-10 transition-opacity">
                 <MapPin size={120} />
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                   <div className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all
                     ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-sage/10 text-sage border-sage/20'}`}>
                      Diamond Tier
                   </div>
                   <div className="flex items-center gap-1.5 text-amber-500">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm font-black">{activeSeller.rating}</span>
                   </div>
                </div>
                <h3 className="text-4xl font-black font-serif tracking-tighter italic">{activeSeller.title}</h3>
                <p className={`text-lg leading-relaxed font-serif italic transition-colors
                  ${isDarkMode ? 'text-white/80' : 'text-slate-600'}`}>
                  "{activeSeller.description}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 relative z-10">
                <div className="space-y-1">
                  <p className={`text-[10px] uppercase tracking-widest font-black opacity-30 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Location</p>
                  <p className="text-sm font-black tracking-tight">{activeSeller.location}</p>
                </div>
                <div className="space-y-1">
                  <p className={`text-[10px] uppercase tracking-widest font-black opacity-30 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Main Craft</p>
                  <p className="text-sm font-black tracking-tight">{activeSeller.specialty}</p>
                </div>
              </div>

              <div className="pt-6 relative z-10">
                <button 
                  onClick={() => setIsProfileOpen(true)}
                  className={`w-full py-6 rounded-2xl flex items-center justify-center gap-4 transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-xl
                    ${isDarkMode ? 'bg-white text-black shadow-white/5' : 'bg-slate-900 text-white shadow-slate-900/10'}`}
                >
                  <span className="uppercase tracking-[0.3em] text-[10px] font-black">Open Artisan Profile</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide-over Profile */}
      <AnimatePresence>
        {isProfileOpen && (
          <div className="fixed inset-0 z-[1000] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            />
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className={`relative w-full max-w-2xl h-full shadow-2xl overflow-hidden border-l transition-colors duration-700
                ${isDarkMode ? 'bg-[#0D0D0D] border-white/5' : 'bg-white border-slate-100'}`}
            >
              <button 
                onClick={() => setIsProfileOpen(false)}
                className={`absolute top-10 right-10 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all bg-black/20 hover:bg-black/40 text-white backdrop-blur-xl`}
              >
                <X size={24} />
              </button>

                <div className="h-full overflow-y-auto no-scrollbar flex flex-col pt-20">
                  {/* Hero Image Section */}
                  <div className="relative h-[45vh] w-full shrink-0">
                    <img src={activeSeller.image} alt={activeSeller.title} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${isDarkMode ? 'from-[#0D0D0D]' : 'from-white'}`} />
                    <div className="absolute bottom-12 left-12 space-y-3">
                       <div className="flex items-center gap-3">
                          <ShieldCheck className="text-emerald-500" size={20} />
                          <span className="text-white text-[10px] uppercase tracking-[0.4em] font-black drop-shadow-lg">Elite Partner</span>
                       </div>
                       <h2 className="text-5xl text-white font-serif font-black tracking-tight leading-none italic drop-shadow-2xl">{activeSeller.title}</h2>
                    </div>
                  </div>

                  {/* Identity & Bio Section */}
                  <div className="p-12 lg:p-16 space-y-16">
                    <div className={`flex items-center justify-between border-b pb-12 transition-colors ${isDarkMode ? 'border-white/5' : 'border-slate-50'}`}>
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-1 text-amber-500">
                          {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>IDENTIFIED ARTISAN • {activeSeller.reviews}+ REVIEWS</span>
                      </div>
                      <div className="flex flex-col items-end gap-2 text-right">
                        <Clock size={20} className={isDarkMode ? 'text-emerald-500' : 'text-sage'} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/60' : 'text-slate-500'}`}>FAST RESPONDER</span>
                      </div>
                    </div>

                    <div className="space-y-6 max-w-2xl">
                       <h4 className={`text-[10px] uppercase font-black tracking-[0.4em] ${isDarkMode ? 'text-emerald-500' : 'text-sage'}`}>Identity Profile</h4>
                       <p className={`text-2xl font-serif italic leading-relaxed ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activeSeller.description}</p>
                    </div>

                    {/* Horizontal Product Catalogue */}
                    <div className="space-y-10">
                       <div className="flex items-center justify-between">
                          <h4 className={`text-[10px] uppercase font-black tracking-[0.4em] opacity-40 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Boutique Catalogue</h4>
                          <div className="flex items-center gap-4">
                             <div className={`h-[1px] w-24 ${isDarkMode ? 'bg-white/10' : 'bg-slate-100'}`} />
                             <span className="text-[9px] font-black uppercase tracking-widest opacity-20 italic">Swipe to browse</span>
                          </div>
                       </div>

                       <div className="relative group/catalog">
                          {/* Navigation Arrows (Flish) */}
                          <button 
                            onClick={() => scrollCatalogue('left')}
                            className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/10 text-white backdrop-blur-xl opacity-0 group-hover/catalog:opacity-100 transition-all duration-300 -translate-x-4 group-hover/catalog:translate-x-0"
                          >
                            <ChevronRight className="rotate-180" size={24} />
                          </button>
                          
                          <button 
                            onClick={() => scrollCatalogue('right')}
                            className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/10 text-white backdrop-blur-xl opacity-0 group-hover/catalog:opacity-100 transition-all duration-300 translate-x-4 group-hover/catalog:translate-x-0"
                          >
                            <ChevronRight size={24} />
                          </button>

                          <div 
                            ref={scrollRef}
                            className="flex gap-6 overflow-x-auto no-scrollbar pb-10 scroll-smooth"
                          >
                            {activeSeller.products.map((product) => (
                              <div key={product.id} className="min-w-[280px] space-y-6 group">
                                <div className={`aspect-square rounded-[2rem] overflow-hidden border transition-all duration-700 ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-slate-100 bg-slate-50 shadow-sm'}`}>
                                   <img src={product.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                </div>
                                <div className="space-y-1 pr-4">
                                   <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Selection</p>
                                   <h5 className={`text-lg font-serif italic font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{product.name}</h5>
                                   <p className="text-sm font-black text-amber-500">{product.price} DH</p>
                                </div>
                              </div>
                            ))}
                          </div>
                       </div>
                    </div>

                    <div className="pt-10">
                      <button 
                        onClick={() => {
                          setIsProfileOpen(false);
                          navigate('/shop/all');
                        }}
                        className={`w-full py-8 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 active:scale-95 shadow-2xl
                        ${isDarkMode ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-slate-900 text-white shadow-slate-900/10'}`}>
                        Enter Boutique Atelier <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
