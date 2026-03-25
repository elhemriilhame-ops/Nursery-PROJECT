import { useParams } from 'react-router-dom';
import { ProductCard } from '@/components/shop/ProductCard';
import { FLOWERS, PLANTS, OILS } from '@/data/mockData';
import { useState, useMemo } from 'react';
import { ChevronDown, Filter, LayoutGrid, List } from 'lucide-react';
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

  const products = useMemo(() => {
    let list = [];
    if (category === 'flowers') list = FLOWERS;
    else if (category === 'plants') list = PLANTS;
    else if (category === 'oils') list = OILS;
    else list = [...FLOWERS, ...PLANTS, ...OILS];

    // Simple sort mock
    if (sortBy === 'Price: Low to High') list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'Price: High to Low') list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [category, sortBy]);

  const categoryTitle = useMemo(() => {
    if (category === 'flowers') return 'Bespoke Bouquets';
    if (category === 'plants') return 'Premium House Plants';
    if (category === 'oils') return 'Botanical Elixirs';
    return 'The Full Boutique';
  }, [category]);

  return (
    <div className="pt-24 min-h-screen bg-parchment/10 mb-32">
      {/* Header */}
      <div className="container mx-auto px-6 py-16 text-center space-y-6">
        <span className="text-[10px] uppercase tracking-[0.4em] text-sage font-bold">Discover</span>
        <h1 className="text-3xl md:text-5xl text-charcoal">{categoryTitle}</h1>
        <p className="text-charcoal/60 max-w-2xl mx-auto font-sans font-light italic text-sm leading-relaxed">
          Hand-picked and curated for the minimalist aesthetic. Elevate your space with our premium botanical selections.
        </p>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="container mx-auto px-6 border-y border-border py-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 sticky top-[73px] bg-white/90 backdrop-blur-md z-30">
        <div className="flex items-center space-x-6 text-[10px] uppercase tracking-widest font-bold text-charcoal/60">
          <button className="flex items-center space-x-2 border-r border-border pr-6 hover:text-charcoal transition-colors">
            <Filter size={14} />
            <span>Filters</span>
          </button>
          <span className="hidden sm:block">{products.length} Products</span>
        </div>

        <div className="flex items-center space-x-8">
          <div className="hidden md:flex space-x-4">
            <LayoutGrid size={18} className="text-charcoal cursor-pointer" />
            <List size={18} className="text-charcoal/30 cursor-pointer" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-[10px] uppercase tracking-widest font-bold flex items-center space-x-2 hover:bg-transparent">
                <span>Sort by: {sortBy}</span>
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-none border-border">
              <DropdownMenuItem onClick={() => setSortBy('Featured')} className="text-[10px] uppercase tracking-widest font-bold cursor-pointer">Featured</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('Price: Low to High')} className="text-[10px] uppercase tracking-widest font-bold cursor-pointer">Price: Low to High</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('Price: High to Low')} className="text-[10px] uppercase tracking-widest font-bold cursor-pointer">Price: High to Low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-6 mt-16 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {products.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}
