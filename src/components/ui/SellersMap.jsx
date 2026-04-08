import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Star, Clock, ShieldCheck, X, ArrowRight } from 'lucide-react';

// Enhanced mock sellers data with images and ratings
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
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1592150621344-82839b6fc3e2?auto=format&fit=crop&q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=800',
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

// Custom map interaction component to auto-pan when a seller is selected
function MapUpdater({ activeCoords }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(activeCoords, 8, { animate: true, duration: 1.5 });
  }, [activeCoords, map]);
  return null;
}

export function SellersMap() {
  const [activeSeller, setActiveSeller] = useState(sellers[0]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const createCustomIcon = (isActive) => {
    return L.divIcon({
      className: 'bg-transparent border-0',
      html: `<div style="
        background-color: ${isActive ? '#7C9082' : '#2D3430'}; 
        color: white; 
        border-radius: 50%; 
        width: 44px; 
        height: 44px; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        box-shadow: 0 4px 15px rgba(0,0,0,0.5); 
        border: 2px solid white; 
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
        transform: ${isActive ? 'scale(1.3) translateY(-8px)' : 'scale(1)'};
        z-index: ${isActive ? 1000 : 1};
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
      </div>`,
      iconSize: [44, 44],
      iconAnchor: [22, 44],
    });
  };

  return (
    <div className="w-full bg-parchment dark:bg-background py-24 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Map Section */}
          <div className="w-full lg:w-[55%] rounded-[2.5rem] overflow-hidden relative shadow-2xl h-[500px] md:h-[650px] border border-black/5 group z-10">
            <MapContainer 
              center={[31.7917, -7.0926]} 
              zoom={6} 
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%', zIndex: 1 }}
            >
              <TileLayer
                attribution='&copy; Google Maps'
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
            
            <div className="absolute bottom-6 left-6 z-[400] bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow text-[10px] text-charcoal uppercase tracking-[0.2em] font-medium border border-black/5">
              Interactive Map
            </div>
          </div>

          {/* Description & Card Side Section */}
          <div className="w-full lg:w-[45%] lg:sticky lg:top-24 space-y-12">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.4em] text-sage font-black">Trusted Partners</span>
              <h2 className="text-5xl lg:text-7xl font-serif text-foreground leading-[1] tracking-tighter uppercase italic">
                Artisan <br/> <span className="not-italic">Boutiques</span>
              </h2>
              <p className="text-foreground/70 font-sans text-xl max-w-md">
                Connecting you directly with the finest pépiniéristes across the Kingdom.
              </p>
            </div>

            <div className={`transition-all duration-500 ease-out border-l-2 border-sage/20 pl-8 space-y-8 ${isProfileOpen ? 'translate-x-2' : ''}`}>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="px-3 py-1 bg-sage/10 text-sage text-[9px] uppercase tracking-widest font-black rounded-lg">Certified Seller</div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-bold text-foreground">{activeSeller.rating}</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold font-serif text-foreground">{activeSeller.title}</h3>
                <p className="text-foreground/80 leading-relaxed font-sans text-lg italic">
                  "{activeSeller.description}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-foreground/40 uppercase tracking-[0.2em] text-[9px] font-bold">
                    <MapPin size={12} />
                    Location
                  </div>
                  <p className="text-sm font-serif font-bold text-foreground">{activeSeller.location}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-foreground/40 uppercase tracking-[0.2em] text-[9px] font-bold">
                    <ShieldCheck size={12} />
                    Specialty
                  </div>
                  <p className="text-sm font-serif font-bold text-foreground">{activeSeller.specialty}</p>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  onClick={() => setIsProfileOpen(true)}
                  className="group flex items-center space-x-6 text-charcoal dark:text-foreground"
                >
                  <div className="w-16 h-16 rounded-full bg-charcoal dark:bg-white text-white dark:text-charcoal flex items-center justify-center group-hover:bg-sage dark:group-hover:bg-sage dark:group-hover:text-white transition-all duration-500 transform group-hover:scale-110">
                    <ArrowRight size={24} />
                  </div>
                  <span className="uppercase tracking-[0.3em] text-[10px] font-black group-hover:text-sage transition-colors">View Artisan Card</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-over Artisan Card Modal */}
      <div className={`fixed inset-0 z-[1000] flex justify-end transition-all duration-700 ${isProfileOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-700 ${isProfileOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsProfileOpen(false)} />
        
        <div className={`relative w-full max-w-2xl bg-white dark:bg-zinc-900 h-full shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.23, 1, 0.32, 1)] ${isProfileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <button 
            onClick={() => setIsProfileOpen(false)}
            className="absolute top-8 right-8 z-50 w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur flex items-center justify-center text-white transition-all active:scale-90"
          >
            <X size={24} />
          </button>

          <div className="h-full overflow-y-auto no-scrollbar pb-12">
            {/* Hero Image Section */}
            <div className="relative h-[40vh] w-full">
              <img src={activeSeller.image} alt={activeSeller.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 space-y-2">
                 <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="text-white" size={20} />
                    <span className="text-white text-[10px] uppercase tracking-[0.3em] font-black">Certified SunFlowers Partner</span>
                 </div>
                 <h2 className="text-4xl text-white font-serif uppercase tracking-tight leading-none italic">{activeSeller.title}</h2>
              </div>
            </div>

            {/* Info Section */}
            <div className="p-10 space-y-12">
              <div className="flex items-center justify-between border-b border-border pb-8">
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill={i < Math.floor(activeSeller.rating) ? "currentColor" : "none"} strokeWidth={i < Math.floor(activeSeller.rating) ? 0 : 2} />
                    ))}
                  </div>
                  <span className="text-lg font-bold text-white">({activeSeller.reviews} Reviews)</span>
                </div>
                <div className="flex items-center gap-3 text-white/60">
                  <Clock size={18} className="text-white/60" />
                  <span className="text-sm font-semibold uppercase tracking-widest">Responds in {activeSeller.responseTime}</span>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">The Artisan Story</h4>
                <p className="text-xl leading-relaxed font-sans text-white font-medium italic">
                  {activeSeller.description}
                </p>
              </div>

              {/* Dynamic Boutique Catalog Section */}
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                   <h4 className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">Boutique Catalog</h4>
                   <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Swipe to Browse</span>
                </div>

                <div className="flex gap-6 overflow-x-auto no-scrollbar pb-6 -mx-4 px-4 snap-x snap-mandatory">
                  {activeSeller.products.map((product) => (
                    <div key={product.id} className="min-w-[220px] snap-start group/prod">
                       <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-4 shadow-lg border border-border/50">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover/prod:scale-110" />
                          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest text-white">
                            {product.price} DH
                          </div>
                          <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover/prod:opacity-100 transition-opacity flex items-center justify-center">
                             <div className="w-12 h-12 rounded-full bg-white text-charcoal flex items-center justify-center translate-y-4 group-hover/prod:translate-y-0 transition-transform">
                                <ArrowRight size={20} />
                             </div>
                          </div>
                       </div>
                       <h5 className="font-serif text-lg text-white font-bold tracking-tight">{product.name}</h5>
                       <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Limited Edition</p>
                    </div>
                  ))}
                  
                  {/* View All Card */}
                  <div className="min-w-[220px] snap-start flex items-center justify-center border-2 border-dashed border-white/20 rounded-3xl group cursor-pointer hover:border-sage transition-colors">
                     <div className="text-center space-y-3">
                        <div className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                           <ArrowRight size={24} />
                        </div>
                        <span className="block text-[10px] uppercase tracking-[0.2em] font-black text-white">View Full Boutique</span>
                     </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 space-y-8">
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-black">Quick Stats</h4>
                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-1">
                      <div className="text-xs text-white/40 uppercase tracking-widest font-bold">Available Stock</div>
                      <div className="text-2xl font-serif font-bold text-white">450+ Specimens</div>
                   </div>
                   <div className="space-y-1">
                      <div className="text-xs text-white/40 uppercase tracking-widest font-bold">Partner Since</div>
                      <div className="text-2xl font-serif font-bold text-white">2021</div>
                   </div>
                </div>
              </div>

              <div className="pt-4">
                <button className="w-full bg-charcoal dark:bg-white text-white dark:text-charcoal px-12 py-6 uppercase tracking-[0.3em] font-black text-xs hover:bg-sage dark:hover:bg-sage dark:hover:text-white transition-all duration-500 rounded-2xl shadow-2xl flex items-center justify-center gap-4">
                  Shop this Boutique <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
