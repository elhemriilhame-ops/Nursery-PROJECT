import { useParams } from 'react-router-dom';
import { ProductCard } from '@/components/shop/ProductCard';
import { useProducts } from '@/context/ProductContext';
import { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  Filter, 
  LayoutGrid, 
  List, 
  MapPin, 
  Calendar, 
  ChevronUp, 
  ChevronDown as ChevronDownIcon,
  Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';

export default function Shop() {
  const { category } = useParams();
  const { isDarkMode } = useTheme();
  const [sortBy, setSortBy] = useState('Featured');
  
  // Filter states
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  
  const [isOccasionOpen, setIsOccasionOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);
  
  const [zipCode, setZipCode] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  const occasions = ["New Baby", "Get Well", "Thank You", "Cheer Up", "Birthday", "Weddings", "Big Moments"];
  const priceRanges = [
    { label: "Under 250 DH", min: 0, max: 249 },
    { label: "250 - 500 DH", min: 250, max: 500 },
    { label: "Over 500 DH", min: 501, max: 2000 }
  ];
  const colors = ["White", "Pink", "Red", "Yellow", "Lavender"];

  const { products: allProducts, getFlowers, getPlants, getOils, loading } = useProducts();

  const products = useMemo(() => {
    let list = [];
    if (category === 'flowers') list = getFlowers();
    else if (category === 'plants') list = getPlants();
    else if (category === 'oils') list = getOils();
    else list = [...allProducts];

    // Safety check if list is empty but products exist, fallback to allProducts
    if (list.length === 0 && allProducts.length > 0 && category !== 'all') {
       // list = [...allProducts]; // Only fallback if we explicitly want to see something
    }

    // Category specific filters
    if (category === 'flowers') {
      if (selectedOccasion) {
        list = list.filter(p => p.occasion === selectedOccasion);
      }
      if (selectedColor) {
        list = list.filter(p => p.color === selectedColor);
      }
    }

    // Global filters
    if (selectedPrice) {
      list = list.filter(p => p.price >= selectedPrice.min && p.price <= selectedPrice.max);
    }

    // Sorting logic
    if (sortBy === 'Price: Low to High') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [category, sortBy, selectedOccasion, selectedPrice, selectedColor]);

  const categoryTitle = useMemo(() => {
    if (category === 'flowers') return 'Bespoke Bouquets';
    if (category === 'plants') return 'Premium House Plants';
    if (category === 'oils') return 'Botanical Elixirs';
    return 'The Full Boutique';
  }, [category]);

  return (
    <div className={`pt-24 min-h-screen transition-colors duration-700 ${isDarkMode ? 'bg-[#090909]' : 'bg-[#FCFCFB]'}`}>
      
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      )}
      
      {/* Page Header */}
      <div className="container mx-auto px-6 py-20 text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
           <Sparkles className={isDarkMode ? 'text-emerald-500' : 'text-sage'} size={18} />
           <span className={`text-[10px] font-black uppercase tracking-[0.45em] transition-colors
             ${isDarkMode ? 'text-emerald-500' : 'text-sage'}`}>Discover Collection</span>
        </div>
        <h1 className={`text-4xl md:text-6xl font-serif font-black tracking-tight italic transition-colors
          ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {categoryTitle}
        </h1>
        <p className={`max-w-2xl mx-auto font-serif italic text-lg leading-relaxed transition-colors
          ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>
          Hand-picked and curated for the minimalist aesthetic. Elevate your space with our premium botanical selections.
        </p>
      </div>

      <div className="container mx-auto px-6">
        {category === 'flowers' ? (
          <div className="flex flex-col lg:flex-row gap-16 py-8">
             <aside className="w-full lg:w-80 space-y-10 shrink-0">
                
                {/* Delivery details Card */}
                <div className={`p-8 rounded-[2.5rem] space-y-6 transition-all duration-700 border shadow-2xl
                   ${isDarkMode ? 'bg-[#141414] border-white/5 shadow-black' : 'bg-[#FFF5F7] border-pink-100/50 shadow-pink-100/20'}`}>
                   <h3 className={`text-2xl font-serif font-black tracking-tight italic transition-colors
                     ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Delivery Pulse</h3>
                   <div className="space-y-6">
                      <div className="space-y-2">
                         <label className={`text-[9px] font-black uppercase tracking-[0.2em] ml-1 transition-colors
                           ${isDarkMode ? 'text-emerald-500' : 'text-slate-800'}`}>Target zip code</label>
                         <div className="relative">
                            <MapPin size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-white/40' : 'text-slate-700'}`} />
                            <input 
                              type="text" 
                              value={zipCode}
                              onChange={(e) => setZipCode(e.target.value)}
                              placeholder="Type zip code..."
                              className={`w-full pl-12 pr-6 py-4 rounded-2xl border-none text-[11px] font-bold outline-none transition-all
                                ${isDarkMode ? 'bg-white/5 text-white placeholder:text-white/20 focus:bg-white/10' : 'bg-white text-slate-950 shadow-inner'}`}
                            />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className={`text-[9px] font-black uppercase tracking-[0.2em] ml-1 transition-colors
                           ${isDarkMode ? 'text-emerald-500' : 'text-slate-800'}`}>Mission date</label>
                         <div className="relative">
                            <Calendar size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ${isDarkMode ? 'text-white/40' : 'text-slate-700'}`} />
                            <select 
                              value={deliveryDate}
                              onChange={(e) => setDeliveryDate(e.target.value)}
                              className={`w-full pl-12 pr-10 py-4 rounded-2xl border-none text-[11px] font-bold outline-none appearance-none cursor-pointer transition-all
                                ${isDarkMode ? 'bg-white/5 text-white focus:bg-white/10' : 'bg-white text-slate-950 shadow-inner'}`}
                            >
                               <option value="" className={isDarkMode ? 'bg-zinc-900' : ''}>Select date</option>
                               <option value="today" className={isDarkMode ? 'bg-zinc-900' : ''}>Today (Express)</option>
                               <option value="tomorrow" className={isDarkMode ? 'bg-zinc-900' : ''}>Tomorrow</option>
                               <option value="later" className={isDarkMode ? 'bg-zinc-900' : ''}>Schedule Picking</option>
                            </select>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Filters Section */}
                <div className="space-y-8">
                   <div className="space-y-3">
                      <p className={`text-[10px] font-black uppercase tracking-[0.2em] italic transition-colors
                        ${isDarkMode ? 'text-emerald-400' : 'text-sage'}`}>
                        {products.length} specimens available
                      </p>
                      <button 
                        onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                        className="flex items-center justify-between w-full group py-2"
                      >
                         <h2 className={`text-3xl font-serif font-black tracking-tighter uppercase italic transition-colors
                           ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>FILTERS</h2>
                         <div className={`p-2 rounded-xl transition-all ${isDarkMode ? 'bg-white/5 text-emerald-500' : 'bg-slate-100 text-slate-400'}`}>
                            <ChevronDownIcon size={20} className={`transition-transform duration-500 ${isFiltersVisible ? 'rotate-180' : ''}`} />
                         </div>
                      </button>
                   </div>

                   {isFiltersVisible && (
                     <div className="space-y-8 animate-in slide-in-from-top-4 duration-500 pb-16">
                        {/* Occasion Section */}
                        <div className={`border-t pt-8 transition-colors ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                           <button 
                             onClick={() => setIsOccasionOpen(!isOccasionOpen)}
                             className="w-full flex items-center justify-between group py-1"
                           >
                              <span className={`text-lg font-black tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Occasion</span>
                              {isOccasionOpen ? <ChevronUp size={18} className={isDarkMode ? 'text-emerald-500' : 'text-slate-800'} /> : <ChevronDownIcon size={18} className={isDarkMode ? 'text-emerald-500' : 'text-slate-800'} />}
                           </button>
                           {isOccasionOpen && (
                              <div className="mt-4 flex flex-wrap gap-2">
                                 {occasions.map(occ => (
                                   <button
                                     key={occ}
                                     onClick={() => setSelectedOccasion(selectedOccasion === occ ? null : occ)}
                                     className={`px-5 py-2.5 rounded-2xl text-[10px] font-black border transition-all duration-300 uppercase tracking-widest ${
                                       selectedOccasion === occ 
                                         ? (isDarkMode ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-slate-800 text-white border-slate-800')
                                         : (isDarkMode ? 'bg-white/5 text-white/60 border-white/5 hover:border-emerald-500/40 hover:text-emerald-400' : 'bg-white text-slate-800 border-slate-100')
                                     }`}
                                   >
                                     {occ}
                                   </button>
                                 ))}
                              </div>
                           )}
                        </div>

                        {/* Price Range Section */}
                        <div className={`border-t pt-8 transition-colors ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                           <button 
                             onClick={() => setIsPriceOpen(!isPriceOpen)}
                             className="w-full flex items-center justify-between group py-1"
                           >
                              <span className={`text-lg font-black tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Price Tier</span>
                              {isPriceOpen ? <ChevronUp size={18} className={isDarkMode ? 'text-emerald-500' : 'text-slate-800'} /> : <ChevronDownIcon size={18} className={isDarkMode ? 'text-emerald-500' : 'text-slate-800'} />}
                           </button>
                           {isPriceOpen && (
                              <div className="mt-4 flex flex-wrap gap-2">
                                 {priceRanges.map(range => (
                                   <button
                                     key={range.label}
                                     onClick={() => setSelectedPrice(selectedPrice?.label === range.label ? null : range)}
                                     className={`px-5 py-2.5 rounded-2xl text-[10px] font-black border transition-all duration-300 uppercase tracking-widest ${
                                       selectedPrice?.label === range.label 
                                         ? (isDarkMode ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-slate-800 text-white border-slate-800')
                                         : (isDarkMode ? 'bg-white/5 text-white/60 border-white/5 hover:border-emerald-500/40 hover:text-emerald-400' : 'bg-white text-slate-800 border-slate-100')
                                     }`}
                                   >
                                     {range.label}
                                   </button>
                                 ))}
                              </div>
                           )}
                        </div>

                        {/* Color Palette Section */}
                        <div className={`border-t pt-8 transition-colors ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                           <button 
                             onClick={() => setIsColorOpen(!isColorOpen)}
                             className="w-full flex items-center justify-between group py-1"
                           >
                              <span className={`text-lg font-black tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Chromatics</span>
                              {isColorOpen ? <ChevronUp size={18} className={isDarkMode ? 'text-emerald-500' : 'text-slate-800'} /> : <ChevronDownIcon size={18} className={isDarkMode ? 'text-emerald-500' : 'text-slate-800'} />}
                           </button>
                           {isColorOpen && (
                              <div className="mt-4 grid grid-cols-2 gap-2">
                                 {colors.map(color => (
                                   <button
                                     key={color}
                                     onClick={() => setSelectedColor(selectedColor === color ? null : color)}
                                     className={`px-4 py-3 rounded-2xl text-[10px] font-black border transition-all duration-300 flex items-center gap-3 uppercase tracking-widest ${
                                       selectedColor === color 
                                         ? (isDarkMode ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-slate-800 text-white border-slate-800')
                                         : (isDarkMode ? 'bg-white/5 text-white/60 border-white/5 hover:border-emerald-500/40 hover:text-emerald-400' : 'bg-white text-slate-800 border-slate-100')
                                     }`}
                                   >
                                     <div className={`w-3 h-3 rounded-full border shadow-sm`} style={{ backgroundColor: color.toLowerCase() }} />
                                     {color}
                                   </button>
                                 ))}
                              </div>
                           )}
                        </div>

                        {/* Clear All Button */}
                        {(selectedOccasion || selectedPrice || selectedColor) && (
                          <button 
                            onClick={() => {
                              setSelectedOccasion(null);
                              setSelectedPrice(null);
                              setSelectedColor(null);
                            }}
                            className="w-full py-4 text-[9px] font-black uppercase tracking-[0.3em] text-red-500 hover:text-red-400 transition-all border border-red-500/10 rounded-2xl hover:bg-red-500/5 mt-8"
                          >
                            Reset Laboratory Filters
                          </button>
                        )}
                     </div>
                   )}
                </div>
             </aside>

             <div className="flex-grow">
               {products.length === 0 ? (
                 <div className={`h-[60vh] flex flex-col items-center justify-center space-y-6 border-2 border-dashed rounded-[4rem] transition-all
                   ${isDarkMode ? 'border-white/5 text-white/40 bg-white/[0.02]' : 'border-slate-100 text-slate-700 bg-slate-50'}`}>
                    <Filter size={64} strokeWidth={1} className={isDarkMode ? 'opacity-20' : 'opacity-40'} />
                    <p className="font-serif italic text-2xl tracking-tight">No matching blooms in our current harvest.</p>
                    <button onClick={() => {
                      setSelectedOccasion(null);
                      setSelectedPrice(null);
                      setSelectedColor(null);
                    }} className="text-[10px] font-black uppercase tracking-widest text-emerald-500 underline underline-offset-[12px] hover:text-emerald-400">Return to Origin</button>
                 </div>
               ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-24 pb-32">
                   {products.map((p) => (
                     <ProductCard key={p.id} {...p} />
                   ))}
                 </div>
               )}
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32 pt-12 pb-32">
            {products.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
