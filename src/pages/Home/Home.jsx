import { motion } from 'framer-motion';
import { HeroSection } from './HeroSection';
import { FeaturedBoutique } from './FeaturedBoutique';
import { CategoryPreview } from './CategoryPreview';
import { PlantGuidesTeaser } from './PlantGuidesTeaser';
import { StoreReviews } from './StoreReviews';
import { SellersMap } from '@/components/ui/SellersMap';
import { useTheme } from '@/context/ThemeContext';

export default function Home() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`flex flex-col w-full transition-colors duration-700 ${isDarkMode ? 'bg-[#090909]' : 'bg-[#FCFCFB]'}`}>
      <HeroSection />
      
      <div className={`${isDarkMode ? 'bg-[#0D0D0D]' : 'bg-transparent'} transition-colors duration-700`}>
        <SellersMap />
      </div>
      
      <div className="container mx-auto px-6 space-y-32 my-32">
        <section>
          <div className="text-center mb-16 space-y-4">
            <h2 className={`text-4xl md:text-5xl font-serif tracking-tight transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
               Curated Botanical Boutique
            </h2>
            <p className={`max-w-lg mx-auto uppercase tracking-[0.3em] text-[10px] font-black transition-colors duration-500
              ${isDarkMode ? 'text-emerald-400' : 'text-sage'}`}>
              Elegance in every petal and leaf
            </p>
          </div>
          <CategoryPreview />
        </section>

        <section>
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 space-y-4 md:space-y-0">
            <h2 className={`text-4xl font-serif tracking-tight transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Featured Arrivals
            </h2>
            <p className={`text-[11px] font-black uppercase tracking-widest underline cursor-pointer transition-all
              ${isDarkMode ? 'text-emerald-500 hover:text-white' : 'text-slate-500 hover:text-sage'}`}>
              View All Products
            </p>
          </div>
          <FeaturedBoutique />
        </section>

        <section>
          <StoreReviews />
        </section>

        <PlantGuidesTeaser />
      </div>
    </div>
  );
}
