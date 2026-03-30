import { motion } from 'framer-motion';
import { HeroSection } from './HeroSection';
import { FeaturedBoutique } from './FeaturedBoutique';
import { CategoryPreview } from './CategoryPreview';
import { PlantGuidesTeaser } from './PlantGuidesTeaser';
import { SellersMap } from '@/components/ui/SellersMap';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <SellersMap />
      
      <div className="container mx-auto px-6 space-y-32 my-32">
        <section>
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl">Curated Botanical Boutique</h2>
            <p className="text-charcoal max-w-lg mx-auto uppercase tracking-widest text-[10px] font-semibold">
              Elegance in every petal and leaf
            </p>
          </div>
          <CategoryPreview />
        </section>

        <section>
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 space-y-4 md:space-y-0">
            <h2 className="text-4xl">Featured Arrivals</h2>
            <p className="text-sm underline cursor-pointer hover:text-sage transition-colors">View All Products</p>
          </div>
          <FeaturedBoutique />
        </section>

        <PlantGuidesTeaser />
      </div>
    </div>
  );
}
