import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin } from 'lucide-react';

// Mock sellers data (latitude & longitude for Morocco cities)
const sellers = [
  {
    id: 1,
    name: 'Agadir',
    coordinates: [30.4278, -9.5981], // [lat, lng] for Leaflet
    title: 'Agadir Botanical Elixirs',
    description: 'Specializing in premium Argan oil extraction and exotic coastal succulents. Hand-harvested directly from sustainable Amazigh co-ops. Operating across Souss-Massa region.',
  },
  {
    id: 2,
    name: 'Marrakech',
    coordinates: [31.6295, -8.0083],
    title: 'Marrakech Royal Bloom',
    description: 'Premium red roses and famous traditional botanical perfumes right from the heart of the Red City. Exclusive supplier of luxury riad floral arrangements.',
  },
  {
    id: 3,
    name: 'Casablanca',
    coordinates: [33.5731, -7.5898],
    title: 'Casablanca Flora Hub',
    description: 'Our largest nationwide distribution center providing immediate same-day flower delivery across all of Casablanca, Mohammedia, and Rabat.',
  },
  {
    id: 4,
    name: 'Tangier',
    coordinates: [35.7595, -5.8339],
    title: 'Tangier Northern Greens',
    description: 'Lush Mediterranean indoor plants and elegant coastal floral arrangements tailored for the modern sophisticated interior in Northern Morocco.',
  }
];

// Custom map interaction component to auto-pan when a seller is selected from the side panel
function MapUpdater({ activeCoords }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(activeCoords, 7, { animate: true, duration: 1.5 });
  }, [activeCoords, map]);
  return null;
}

export function SellersMap() {
  const [activeSeller, setActiveSeller] = useState(sellers[0]);

  const createCustomIcon = (isActive) => {
    return L.divIcon({
      className: 'bg-transparent border-0',
      html: `<div style="
        background-color: ${isActive ? '#7C9082' : '#2D3430'}; 
        color: white; 
        border-radius: 50%; 
        width: 40px; 
        height: 40px; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        box-shadow: 0 4px 10px rgba(0,0,0,0.4); 
        border: 2px solid white; 
        transition: all 0.3s ease; 
        transform: ${isActive ? 'scale(1.2) translateY(-5px)' : 'scale(1)'};
        z-index: ${isActive ? 1000 : 1};
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
      </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
  };

  return (
    <div className="w-full bg-parchment dark:bg-background py-24 border-t border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Real Leaflet Map Section (Google Maps Style) */}
          <div className="w-full lg:w-[55%] rounded-3xl overflow-hidden relative shadow-lg h-[450px] md:h-[600px] border border-black/10 dark:border-white/10 group z-10">
            <MapContainer 
              center={[29.5, -6.5]} // Center Morocco
              zoom={5} 
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%', zIndex: 1 }}
            >
              {/* Using standard Google Maps tile layer for identical styling and street details */}
              <TileLayer
                attribution='&copy; Google Maps'
                url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              />
              
              <MapUpdater activeCoords={activeSeller.coordinates} />

              {/* Plotting interactive map markers */}
              {sellers.map((seller) => (
                <Marker
                  key={seller.id}
                  position={seller.coordinates}
                  icon={createCustomIcon(activeSeller.id === seller.id)}
                  eventHandlers={{
                    click: () => setActiveSeller(seller),
                  }}
                />
              ))}
            </MapContainer>
            
            {/* Absolute badge overlay */}
            <div className="absolute bottom-6 left-6 z-[400] bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow text-[10px] text-charcoal uppercase tracking-[0.2em] font-medium border border-black/5">
              Interactive Map
            </div>
          </div>

          {/* Real-time Interactive Description Panel */}
          <div className="w-full lg:w-[45%] space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-serif text-foreground leading-[1.1] tracking-tight uppercase">
                Delivery Across <br/> Morocco
              </h2>
              <p className="text-foreground/70 font-sans text-lg">
                Discover our nationwide network of premium certified botanical sellers directly on the real map.
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-border">
              <div className="flex items-center space-x-4 text-foreground">
                 <div className="w-10 h-10 rounded-full bg-charcoal dark:bg-white text-white dark:text-charcoal flex items-center justify-center transition-colors">
                   <MapPin size={20} />
                 </div>
                 <h3 className="text-2xl font-bold font-serif">{activeSeller.title}</h3>
              </div>
              <p className="text-foreground/80 leading-relaxed font-sans text-base transition-all duration-300 min-h-[100px]">
                {activeSeller.description}
              </p>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-6">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-charcoal dark:bg-white flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white dark:bg-charcoal"></div>
                </div>
                <span className="text-xs uppercase tracking-[0.15em] text-foreground font-semibold cursor-pointer select-none">Same-day Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#EAE8E3] dark:bg-white/20"></div>
                <span className="text-xs uppercase tracking-[0.15em] text-foreground/60 font-medium cursor-pointer select-none">Nationwide Shipping</span>
              </div>
            </div>

            <div className="pt-8 w-full">
              <button className="w-full sm:w-auto uppercase tracking-[0.2em] text-xs font-bold text-white bg-charcoal dark:bg-white dark:text-charcoal px-8 py-4 hover:bg-sage dark:hover:bg-sage dark:hover:text-white transition-colors duration-300 outline-none">
                View Seller Profile
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
