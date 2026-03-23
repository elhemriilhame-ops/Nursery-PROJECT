import { ProductCard } from '@/components/shop/ProductCard';
import { FLOWERS, PLANTS, OILS } from '@/data/mockData';

export function FeaturedBoutique() {
  // Take featured items or first of each
  const featured = [
    ...FLOWERS.filter(f => f.featured).slice(0, 1),
    ...PLANTS.filter(p => p.featured).slice(0, 1),
    ...OILS.filter(o => o.featured).slice(0, 1),
    ...FLOWERS.slice(2, 3), // just some variety
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
      {featured.map((product) => (
        <ProductCard 
          key={product.id}
          {...product}
        />
      ))}
    </div>
  );
}
