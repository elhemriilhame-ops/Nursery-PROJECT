import { useParams } from 'react-router-dom';
import { ProductCard } from '@/components/shop/ProductCard';
import { FLOWERS, PLANTS, OILS } from '@/data/mockData';
import { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  Filter, 
  LayoutGrid, 
  List, 
  MapPin, 
  Calendar, 
  ChevronUp, 
  ChevronDown as ChevronDownIcon 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function Shop() {
  const { category } = useParams();
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
    { label: "Under 50 DH", min: 0, max: 49 },
    { label: "50 - 100 DH", min: 50, max: 100 },
    { label: "Over 100 DH", min: 101, max: 1000 }
  ];
  const colors = ["White", "Pink", "Red", "Yellow", "Lavender"];

  const products = useMemo(() => {
    let list = [];
    if (category === 'flowers') list = [...FLOWERS];
    else if (category === 'plants') list = [...PLANTS];
    else if (category === 'oils') list = [...OILS];
    else list = [...FLOWERS, ...PLANTS, ...OILS];

    // Filter by occasion if in flowers category
    if (category === 'flowers') {
      if (selectedOccasion) {
        list = list.filter(p => p.occasion === selectedOccasion);
      }
      if (selectedPrice) {
        list = list.filter(p => p.price >= selectedPrice.min && p.price <= selectedPrice.max);
      }
      if (selectedColor) {
        list = list.filter(p => p.color === selectedColor);
      }
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
    <div className="pt-24 min-h-screen bg-parchment/10 mb-32">
      <div className="container mx-auto px-6 py-16 text-center space-y-6">
        <span className="text-[10px] uppercase tracking-[0.4em] text-sage font-bold">Discover</span>
        <h1 className="text-3xl md:text-5xl text-charcoal">{categoryTitle}</h1>
        <p className="text-charcoal max-w-2xl mx-auto font-sans font-light italic text-sm leading-relaxed">
          Hand-picked and curated for the minimalist aesthetic. Elevate your space with our premium botanical selections.
        </p>
      </div>

      <div className="container mx-auto px-6">
        {category === 'flowers' ? (
          <div className="flex flex-col lg:flex-row gap-12 py-8">
             <aside className="w-full lg:w-72 space-y-8 shrink-0">
                <div className="bg-[#FFF5F7] p-6 rounded-[1.5rem] space-y-4 shadow-sm border border-pink-100/50">
                   <h3 className="text-xl font-serif font-black text-slate-800 tracking-tight">Delivery details</h3>
                   <div className="space-y-4">
                      <div className="space-y-1.5">
                         <label className="text-[9px] font-bold uppercase tracking-widest text-slate-800 ml-1">Delivery zip code</label>
                         <div className="relative">
                            <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-700" />
                            <input 
                              type="text" 
                              value={zipCode}
                              onChange={(e) => setZipCode(e.target.value)}
                              placeholder="Type zip code..."
                              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border-none shadow-inner text-xs focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                            />
                         </div>
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[9px] font-bold uppercase tracking-widest text-slate-800 ml-1">Delivery date</label>
                         <div className="relative cursor-pointer">
                            <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-700 pointer-events-none" />
                            <select 
                              value={deliveryDate}
                              onChange={(e) => setDeliveryDate(e.target.value)}
                              className="w-full pl-10 pr-10 py-3 bg-white rounded-xl border-none shadow-inner text-xs focus:ring-2 focus:ring-pink-200 outline-none appearance-none cursor-pointer"
                            >
                               <option value="">Select date</option>
                               <option value="today">Today</option>
                               <option value="tomorrow">Tomorrow</option>
                               <option value="later">Pick a date</option>
                            </select>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sage italic">{products.length} bouquets found</p>
                      <button 
                        onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                        className="flex items-center justify-between w-full group"
                      >
                         <h2 className="text-2xl font-serif font-black text-slate-800 tracking-tighter uppercase group-hover:text-sage transition-colors">FILTER</h2>
                         <ChevronDownIcon size={24} className={`text-slate-200 transition-transform duration-500 ${isFiltersVisible ? 'rotate-180' : ''}`} />
                      </button>
                   </div>

                   {isFiltersVisible && (
                     <div className="space-y-6 animate-in slide-in-from-top-4 duration-500 pb-10">
                        {/* Occasion Section */}
                        <div className="border-t border-slate-100 pt-6">
                           <button 
                             onClick={() => setIsOccasionOpen(!isOccasionOpen)}
                             className="w-full flex items-center justify-between group py-1"
                           >
                              <span className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-sage transition-colors">Occasion</span>
                              {isOccasionOpen ? <ChevronUp size={18} className="text-slate-800" /> : <ChevronDownIcon size={18} className="text-slate-800" />}
                           </button>
                           {isOccasionOpen && (
                              <div className="mt-4 flex flex-wrap gap-2">
                                 {occasions.map(occ => (
                                   <button
                                     key={occ}
                                     onClick={() => setSelectedOccasion(selectedOccasion === occ ? null : occ)}
                                     className={`px-4 py-2 rounded-full text-[12px] font-bold border transition-all duration-300 ${
                                       selectedOccasion === occ 
                                         ? 'bg-slate-800 text-white border-slate-800 shadow-md scale-105' 
                                         : 'bg-white text-slate-800 border-slate-100 hover:border-sage/40 hover:bg-sage/5 hover:text-sage font-medium'
                                     }`}
                                   >
                                     {occ}
                                   </button>
                                 ))}
                              </div>
                           )}
                        </div>

                        {/* Price Range Section */}
                        <div className="border-t border-slate-100 pt-6">
                           <button 
                             onClick={() => setIsPriceOpen(!isPriceOpen)}
                             className="w-full flex items-center justify-between group py-1"
                           >
                              <span className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-sage transition-colors">Price Range</span>
                              {isPriceOpen ? <ChevronUp size={18} className="text-slate-800" /> : <ChevronDownIcon size={18} className="text-slate-800" />}
                           </button>
                           {isPriceOpen && (
                              <div className="mt-4 flex flex-wrap gap-2">
                                 {priceRanges.map(range => (
                                   <button
                                     key={range.label}
                                     onClick={() => setSelectedPrice(selectedPrice?.label === range.label ? null : range)}
                                     className={`px-4 py-2 rounded-full text-[12px] font-bold border transition-all duration-300 ${
                                       selectedPrice?.label === range.label 
                                         ? 'bg-slate-800 text-white border-slate-800 shadow-md scale-105' 
                                         : 'bg-white text-slate-800 border-slate-100 hover:border-sage/40 hover:bg-sage/5 hover:text-sage font-medium'
                                     }`}
                                   >
                                     {range.label}
                                   </button>
                                 ))}
                              </div>
                           )}
                        </div>

                        {/* Color Palette Section */}
                        <div className="border-t border-slate-100 pt-6">
                           <button 
                             onClick={() => setIsColorOpen(!isColorOpen)}
                             className="w-full flex items-center justify-between group py-1"
                           >
                              <span className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-sage transition-colors">Color Palette</span>
                              {isColorOpen ? <ChevronUp size={18} className="text-slate-800" /> : <ChevronDownIcon size={18} className="text-slate-800" />}
                           </button>
                           {isColorOpen && (
                              <div className="mt-4 flex flex-wrap gap-2">
                                 {colors.map(color => (
                                   <button
                                     key={color}
                                     onClick={() => setSelectedColor(selectedColor === color ? null : color)}
                                     className={`px-4 py-2 rounded-full text-[12px] font-bold border transition-all duration-300 flex items-center gap-2 ${
                                       selectedColor === color 
                                         ? 'bg-slate-800 text-white border-slate-800 shadow-md scale-105' 
                                         : 'bg-white text-slate-800 border-slate-100 hover:border-sage/40 hover:bg-sage/5 hover:text-sage font-medium'
                                     }`}
                                   >
                                     <div className={`w-2 h-2 rounded-full border border-slate-200`} style={{ backgroundColor: color.toLowerCase() }} />
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
                            className="w-full py-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-400 hover:text-red-600 transition-colors border border-red-50 rounded-xl hover:bg-red-50"
                          >
                            Reset Selected Filters
                          </button>
                        )}
                     </div>
                   )}
                </div>
             </aside>

             <div className="flex-grow">
               {products.length === 0 ? (
                 <div className="h-96 flex flex-col items-center justify-center space-y-4 border-2 border-dashed border-slate-100 rounded-[3rem] text-slate-700">
                    <Filter size={48} strokeWidth={1} />
                    <p className="font-serif italic text-xl">No matching blooms found.</p>
                    <button onClick={() => {
                      setSelectedOccasion(null);
                      setSelectedPrice(null);
                      setSelectedColor(null);
                    }} className="text-xs font-black uppercase tracking-widest text-sage underline underline-offset-4">Reset all filters</button>
                 </div>
               ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-20 pb-32">
                   {products.map((p) => (
                     <ProductCard key={p.id} {...p} />
                   ))}
                 </div>
               )}
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 pt-8">
            {products.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
